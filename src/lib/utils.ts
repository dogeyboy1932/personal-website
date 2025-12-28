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