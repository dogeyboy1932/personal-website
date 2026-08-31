import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTechColor(tech: string, index: number, techColors: string[]) {
  const hash = (tech.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + index) % techColors.length;
  return techColors[hash];
}

export function getTechColors(techs: string[], techColors: string[]): string[] {
  if (!techColors.length) return techs.map(() => '');

  const out: string[] = [];
  for (let i = 0; i < techs.length; i++) {
    let colour = getTechColor(techs[i], i, techColors);

    if (i > 0 && colour === out[i - 1]) {
      const start = techColors.indexOf(colour);
      for (let step = 1; step <= techColors.length; step++) {
        const candidate = techColors[(start + step) % techColors.length];
        if (candidate !== out[i - 1]) {
          colour = candidate;
          break;
        }
      }
    }

    out.push(colour);
  }
  return out;
}

/** SSR-safe prefers-reduced-motion check. Was reimplemented in 10 files with four
    different spellings; call this instead. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false)
  );
}

/** Copy text to the clipboard. Resolves false when the API is unavailable or blocked
    (insecure context, denied permission) so callers can leave the value on screen. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** Fisher-Yates, on a copy. */
export function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Pointer position relative to an element's top-left, in CSS pixels. */
export function pointerOffset(event: { clientX: number; clientY: number }, host: HTMLElement) {
  const rect = host.getBoundingClientRect();
  /* clientX and rect are both viewport px, so their difference is a viewport
     distance — callers compare it against local coordinates, so divide. */
  const zoom = pageZoom();
  return { x: (event.clientX - rect.left) / zoom, y: (event.clientY - rect.top) / zoom };
}

/** Far enough outside any layout that distance checks treat the pointer as absent. */
export const POINTER_AWAY = -9999;

/** Coalesces repeated calls into one callback per animation frame. */
export function rafCoalesce(run: () => void) {
  let frame = 0;
  return {
    schedule() {
      if (frame || typeof window === "undefined") return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        run();
      });
    },
    cancel() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    },
  };
}

/** Sizes a canvas for the device pixel ratio and returns its scaled 2D context.
    CAVEAT: dpr is capped at 2 — beyond that the fill cost outweighs the sharpness. */
/** The document is `zoom`ed at >=1280px (--page-zoom in styles.css). Inside that
    zoom a canvas draws in LOCAL css units while the viewport — window.innerWidth,
    getBoundingClientRect(), and every pointer event's clientX — is reported in
    ZOOMED pixels. Mixing the two makes a canvas 25% too large, and makes anything
    drawn at a pointer position drift further off the further the cursor is from
    the top-left corner. Divide viewport measurements by this before handing them
    to sizeCanvas or drawing with them. */
export function pageZoom() {
  const z = Number(getComputedStyle(document.documentElement).zoom);
  return Number.isFinite(z) && z > 0 ? z : 1;
}

export function sizeCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d");
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

/** Theme-aware accent triple for the shared `warm`/`cool` keywords; any other
    value is passed through as an explicit "r, g, b" string. */
export function accentRgb(color: string, isDark: boolean): string {
  if (color === "warm") return isDark ? "251, 191, 36" : "217, 119, 6";
  if (color === "cool") return isDark ? "129, 140, 248" : "79, 70, 229";
  return color;
}

/** Icon CDNs render a monochrome mark in whatever colour the URL asks for, so
    for those a theme swap is a URL swap. Three shapes appear in the data:

      …/pydantic/E92063            a fixed brand colour; no placeholder, no swap
      …/expo/{ink}                 a mark that IS black — takes the theme's ink
      …/{theme:light|dark}         anything that must differ between the two

    The {theme:…} halves are substituted verbatim, so they can be a colour
    (`{theme:150458|FFCA00}`) or a whole path segment — Neo4j swaps the icon
    itself, because its real logo has a black circle that no recolouring can
    rescue on a black ground.

    Both CDNs take a bare hex, which is why one placeholder serves them:
    simpleicons puts it in the path, iconify in a query param whose `#` is
    already encoded (`?color=%23{ink}`). See the LOGOS note in
    constants/skills.ts for which shape a given mark should use. */
const INK_LIGHT = '292524';
const INK_DARK = 'e2e8f0';

export function logoSrc(url: string, isDark: boolean) {
  return url
    .replace('{ink}', isDark ? INK_DARK : INK_LIGHT)
    .replace(/\{theme:([^|{}]*)\|([^|{}]*)\}/, (_, light, dark) => (isDark ? dark : light));
}
