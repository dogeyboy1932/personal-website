import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { darkModeStore } from "./stores";

/** Live view of src/styles/tokens.css, for canvas and inline SVG — they need a concrete colour
   string where CSS can just read the custom property.
   CAVEAT: re-reads on the frame AFTER a theme change. */

const NAMES = [
  "brand",
  "brand-strong",
  "brand-deep",
  "brand-soft",
  "warm",
  "warm-strong",
  "warm-deep",
  "particles",
  "cursor",
  "rays",
  "rain",
  "rain-tail",
  "nav-pill",
  "nav-pill-label",
  "halo-1",
  "halo-2",
  "halo-3",
  "halo-silver-1",
  "halo-silver-2",
  "halo-silver-3",
  "ok",
  "bad",
] as const;

export type TokenName = (typeof NAMES)[number];

/** Dark values mirroring :root, for SSR. */
const FALLBACK: Record<string, string> = {
  brand: "34, 211, 238",
  "brand-strong": "103, 232, 249",
  "brand-deep": "8, 145, 178",
  "brand-soft": "165, 243, 252",
  warm: "251, 191, 36",
  "warm-strong": "253, 230, 138",
  "warm-deep": "217, 119, 6",
  particles: "255, 255, 255",
  cursor: "226, 232, 240",
  rays: "34, 211, 238",
  rain: "34, 211, 238",
  "rain-tail": "14, 116, 144",
  "nav-pill": "255, 255, 255",
  "nav-pill-label": "11, 11, 15",
  "halo-1": "34, 211, 238",
  "halo-2": "99, 102, 241",
  "halo-3": "168, 85, 247",
  "halo-silver-1": "241, 245, 249",
  "halo-silver-2": "203, 213, 225",
  "halo-silver-3": "148, 163, 184",
  ok: "52, 211, 153",
  bad: "251, 113, 133",
};

function snapshot(): Record<string, string> {
  if (!browser) return { ...FALLBACK };
  const cs = getComputedStyle(document.documentElement);
  const out: Record<string, string> = {};
  for (const name of NAMES) {
    const raw = cs.getPropertyValue(`--${name}`).trim();
    // space-separated channels -> comma-separated for canvas
    out[name] = raw ? raw.split(/\s+/).join(", ") : FALLBACK[name];
  }
  return out;
}

export const tokens = writable<Record<string, string>>(
  browser ? snapshot() : { ...FALLBACK }
);

if (browser) {
  /* CAVEAT: rAF, not a microtask — the `dark` class is set by another subscriber
     to this same store and subscription order is not guaranteed. */
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
