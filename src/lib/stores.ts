import { writable, derived } from 'svelte/store';

// Screen width store
export const screenWidth = writable(0);

// Derived breakpoint stores
export const breakpoints = derived(screenWidth, ($width) => ({
  isMobile: $width < 700,
  isTablet: $width >= 700 && $width < 1000,
  isDesktop: $width >= 1000,
  isLarge: $width >= 1200,
  
  // Responsive values
  itemsPerSection: $width < 700 ? 1 : $width < 1000 ? 2 : 3,
}));
