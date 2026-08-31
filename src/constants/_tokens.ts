import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { darkModeStore } from './_theme';

/** Live view of the TOKENS section of src/styles.css, for canvas and inline SVG — they need a concrete
    colour string where CSS can just read the custom property. Anything that can use
    `var(--name)` directly should; this store is the escape hatch, not the default.
    CAVEAT: re-reads on the frame AFTER a theme change. */

/** Every token this store bridges — a subset of styles.css, since a token only needs
    to appear here if JS reads it. `Record<TokenName, string>` keeps FALLBACK in step
    with this list; the match against styles.css is on you. */
const NAMES = [
  'warm',
  'particles',
  'cursor',
  'rays',
  'rain',
  'rain-tail',
  'nav-pill',
  'nav-pill-label',
  'ink',
  'shine',
  'shine-base',
  'shine-mid',
  'rain-fade',
  'halo-1',
  'halo-2',
  'halo-3',
  'halo-silver-1',
  'halo-silver-2',
  'halo-silver-3',
] as const;

export type TokenName = (typeof NAMES)[number];

/** Dark-theme values, used during SSR and if a custom property ever fails to resolve. */
const FALLBACK: Record<TokenName, string> = {
  warm: '251, 191, 36',
  particles: '255, 255, 255',
  cursor: '226, 232, 240',
  rays: '34, 211, 238',
  rain: '34, 211, 238',
  'rain-tail': '14, 116, 144',
  'nav-pill': '255, 255, 255',
  'nav-pill-label': '11, 11, 15',
  ink: '255, 255, 255',
  shine: '255, 255, 255',
  'shine-base': '226, 232, 240',
  'shine-mid': '203, 213, 225',
  'rain-fade': '0, 0, 0',
  'halo-1': '34, 211, 238',
  'halo-2': '99, 102, 241',
  'halo-3': '168, 85, 247',
  'halo-silver-1': '241, 245, 249',
  'halo-silver-2': '203, 213, 225',
  'halo-silver-3': '148, 163, 184',
};

export type Tokens = Record<TokenName, string>;

function snapshot(): Tokens {
  if (!browser) return { ...FALLBACK };
  const cs = getComputedStyle(document.documentElement);
  const out = {} as Tokens;
  for (const name of NAMES) {
    const raw = cs.getPropertyValue(`--${name}`).trim();
    out[name] = raw ? raw.split(/\s+/).join(', ') : FALLBACK[name];
  }
  return out;
}

export const tokens = writable<Tokens>(browser ? snapshot() : { ...FALLBACK });

if (browser) {
  /* CAVEAT: rAF, not a microtask — the `dark` class is set by another subscriber
     to this same store and subscription order is not guaranteed. */
  darkModeStore.subscribe(() => {
    requestAnimationFrame(() => tokens.set(snapshot()));
  });
}

/** "r, g, b" — for composing into `rgb(... / alpha)`. */
export const channels = (t: Tokens, name: TokenName) => t[name] ?? FALLBACK[name];

/** A ready-to-assign `rgb(...)` colour. */
export const css = (t: Tokens, name: TokenName) => `rgb(${channels(t, name)})`;
