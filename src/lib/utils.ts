import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { writable } from "svelte/store";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTechColor(tech: string, index: number, techColors: string[]) {
  const hash = (tech.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + index) % techColors.length;
  return techColors[hash];
}

/**
 * Colours for a whole badge row, guaranteeing no two ADJACENT badges match.
 *
 * ("In stack two of the SAME color can never be side by side")
 *
 * getTechColor hashes each name independently, so nothing stopped two
 * neighbours landing on the same entry — and with ten colours and rows of five,
 * a collision somewhere on the page is close to certain rather than unlucky.
 * Per-badge hashing cannot fix this: avoiding a neighbour is a property of the
 * SEQUENCE, so the sequence has to be what gets coloured.
 *
 * Each badge keeps its hashed colour when that colour differs from the one
 * before it, so most badges are unchanged and a given tech stays visually
 * stable. On a clash it steps forward through the palette to the next entry
 * that clears the previous badge — the smallest move that satisfies the rule.
 *
 * Returns [] for an empty palette rather than looping forever.
 */
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