import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { writable } from 'svelte/store';

export const darkModeStore = writable(true);

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
