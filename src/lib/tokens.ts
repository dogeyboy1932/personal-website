import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { darkModeStore } from "./stores";

/**
 * Live view of the colour tokens defined in src/styles/tokens.css.
 *
 * WHY THIS EXISTS
 * ---------------
 * CSS can read a custom property directly; canvas and inline SVG cannot. Those
 * effects need a concrete colour string, which means calling getComputedStyle.
 *
 * Doing that inline in each component was subtly broken. Components resolved
 * their tokens during init, but the `dark` class is applied by ThemeToggle in
 * onMount — so a component could read the LIGHT palette on a dark page and,
 * because its reactive dependency (`$darkModeStore`) never changed afterwards,
 * never correct itself. That is exactly how the navbar pill came out dark in
 * dark mode.
 *
 * This store re-reads every token on the frame AFTER a theme change, which is
 * past whatever order the class-toggling subscriber happens to run in.
 *
 * Values are returned as both:
 *   `channels` — "34, 211, 238", for canvas rgba() composition
 *   `css`      — "rgb(34 211 238)", for direct assignment
 */

const NAMES = [
  "brand",
  "brand-strong",
  "brand-deep",
  "brand-soft",
  "warm",
  "warm-strong",
  "warm-deep",
  "particles",
  "rays",
  "rain",
  "rain-tail",
  "nav-pill",
  "nav-pill-label",
  "halo-1",
  "halo-2",
  "halo-3",
  "ok",
  "bad",
] as const;

export type TokenName = (typeof NAMES)[number];

/** Dark-theme values, mirroring :root in tokens.css. Used during SSR. */
const FALLBACK: Record<string, string> = {
  brand: "34, 211, 238",
  "brand-strong": "103, 232, 249",
  "brand-deep": "8, 145, 178",
  "brand-soft": "165, 243, 252",
  warm: "251, 191, 36",
  "warm-strong": "253, 230, 138",
  "warm-deep": "217, 119, 6",
  particles: "34, 211, 238",
  rays: "34, 211, 238",
  rain: "34, 211, 238",
  "rain-tail": "14, 116, 144",
  "nav-pill": "255, 255, 255",
  "nav-pill-label": "11, 11, 15",
  "halo-1": "34, 211, 238",
  "halo-2": "99, 102, 241",
  "halo-3": "168, 85, 247",
  ok: "52, 211, 153",
  bad: "251, 113, 133",
};

function snapshot(): Record<string, string> {
  if (!browser) return { ...FALLBACK };
  const cs = getComputedStyle(document.documentElement);
  const out: Record<string, string> = {};
  for (const name of NAMES) {
    const raw = cs.getPropertyValue(`--${name}`).trim();
    // Tokens are space-separated channels; canvas wants commas.
    out[name] = raw ? raw.split(/\s+/).join(", ") : FALLBACK[name];
  }
  return out;
}

export const tokens = writable<Record<string, string>>(
  browser ? snapshot() : { ...FALLBACK }
);

if (browser) {
  // rAF, not a microtask: the `dark` class is applied by another subscriber to
  // this same store, and subscription order is not guaranteed. A frame is
  // comfortably after the class lands.
  darkModeStore.subscribe(() => {
    requestAnimationFrame(() => tokens.set(snapshot()));
  });
}

/** "34, 211, 238" — for building rgba() strings in canvas code. */
export const channels = (t: Record<string, string>, name: TokenName) =>
  t[name] ?? FALLBACK[name];

/** "rgb(34, 211, 238)" — for direct colour assignment. */
export const css = (t: Record<string, string>, name: TokenName) =>
  `rgb(${t[name] ?? FALLBACK[name]})`;
