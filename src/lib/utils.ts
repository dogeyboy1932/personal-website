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
