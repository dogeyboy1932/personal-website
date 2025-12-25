import { writable, derived } from 'svelte/store';

// Screen width store
export const screenWidth = writable(0);

// Derived breakpoint stores
export const breakpoints = derived(screenWidth, ($width) => ({
  isMobile: $width < 600,
  isTablet: $width >= 600 && $width < 1000,
  isDesktop: $width >= 1000,
  isLarge: $width >= 1200,
  
  // Responsive values
  itemsPerSection: $width < 600 ? 1 : $width < 1200 ? 2 : 3,
}));
