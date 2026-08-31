import { derived, writable } from 'svelte/store';

/** Viewport state. Theme state lives in ./_theme.ts. */

/** Window width, bound by +layout.svelte. */
export const screenWidth = writable(0);

/** Physical screen width, so the mobile threshold scales with the display rather
    than being a fixed pixel count. */
export const displayWidth = writable(1920);

const MOBILE_FRACTION = 0.4;
const MOBILE_MIN = 520;
const MOBILE_MAX = 900;

export const breakpoints = derived([screenWidth, displayWidth], ([$width, $display]) => {
  const threshold = Math.min(MOBILE_MAX, Math.max(MOBILE_MIN, $display * MOBILE_FRACTION));

  return {
    isMobile: $width < threshold,
    isTablet: $width >= threshold && $width < threshold * 1.35,
    isDesktop: $width >= threshold,
    itemsPerSection: $width < threshold ? 1 : $width < threshold * 1.5 ? 2 : 3,
  };
});
