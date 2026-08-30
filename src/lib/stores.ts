import { writable, derived, get } from 'svelte/store';

export const darkModeStore = writable(true);

// Screen width store
export const screenWidth = writable(0);

/**
 * Physical screen width, used to derive the mobile threshold.
 *
 * Requested as a proportion rather than a pixel value: "when window size is
 * less than 40% width, then shift to mobile mode." So the switch tracks how
 * much of the DISPLAY the window occupies, not an absolute size — dragging a
 * window to a third of a 27" monitor and to a third of a laptop both feel the
 * same, which a fixed px breakpoint can't express.
 *
 * Clamped: 40% of a very small screen would put the threshold below phone
 * width, and 40% of an ultrawide would collapse a perfectly usable window.
 */
export const displayWidth = writable(1920);

// Derived breakpoint stores
/** 40% of the display, clamped to a sane pixel band. See displayWidth. */
export const MOBILE_FRACTION = 0.4;
const MOBILE_MIN = 520;
const MOBILE_MAX = 900;

export const breakpoints = derived(
  [screenWidth, displayWidth],
  ([$width, $display]) => {
    const threshold = Math.min(
      MOBILE_MAX,
      Math.max(MOBILE_MIN, $display * MOBILE_FRACTION)
    );

    return {
      isMobile: $width < threshold,
      isTablet: $width >= threshold && $width < threshold * 1.35,
      isDesktop: $width >= threshold,
      isLarge: $width >= threshold * 1.6,

      /** Exposed so a layout can explain itself while debugging. */
      mobileThreshold: threshold,

      // Responsive values
      itemsPerSection: $width < threshold ? 1 : $width < threshold * 1.5 ? 2 : 3,
    };
  }
);

// Dark theme colors (the source of truth)
export const darkTheme = {
  // Tech stack colors - for dark theme (light, vibrant)
  techColors: [
    "text-sky-300",
    "text-blue-300",
    "text-blue-400",
    "text-indigo-300",
    "text-indigo-400",
    "text-violet-300",
    "text-violet-400",
    "text-purple-300",
    "text-slate-200",
    "text-slate-300",
  ],
  // Background colors
  bg: {
    body: 'bg-slate-950',
    // FX:side-rays — was 'bg-black'; translucent so MatrixRain glimmers behind
    // the content. Raised from /65 once this panel's backdrop-blur was removed
    // for performance: that blur used to soften the rain into a wash, so at the
    // same alpha without it, crisp scrolling glyphs came through behind body text.
    page: 'bg-black/90',
    card: 'bg-slate-950/80',
    cardSolid: 'bg-slate-950',
    cardHover: 'bg-slate-900/90',
    cardElevated: 'bg-slate-900/80',
    secondary: 'bg-indigo-950/50',
    navbar: 'bg-black/90',
    overlay: 'bg-blue-400/10',
    black: 'bg-black',
    backdrop: 'bg-slate-950/90',
  },
  
  // Text colors
  text: {
    primary: 'text-slate-200',
    secondary: 'text-slate-100',
    muted: 'text-slate-300',
    subtle: 'text-slate-400',
    dim: 'text-slate-500',
    white: 'text-white',
  },
  
  // Border colors
  border: {
    default: 'border-blue-400/15',
    secondary: 'border-indigo-400/25',
    tertiary: 'border-slate-700',
    accent: 'border-violet-500/20',
    light: 'border-slate-300/15',
    hover: 'border-blue-400/60',
    divider: 'border-blue-400/25',
  },
  
  // Status colors (for project cards)
  status: {
    completed: {
      border: 'border-sky-400/30',
      bg: 'bg-sky-400/10',
      text: 'text-sky-300',
    },
    inProgress: {
      border: 'border-violet-400/30',
      bg: 'bg-violet-400/10',
      text: 'text-violet-300',
    },
  },

// Filter colors
  filter: {
    active: {
      bg: 'bg-gradient-to-r from-sky-400 to-blue-500',
      text: 'text-slate-950',
      border: 'border-sky-300',
    },
    inactive: {
      hoverBg: 'hover:bg-violet-500/15',
      hoverText: 'hover:text-slate-100',
      hoverBorder: 'hover:border-violet-400/50',
    },
  },

  // Navigation link colors
  nav: {
    active: 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-blue-500/25',
    inactive: 'text-slate-400 hover:text-white hover:bg-blue-500/10',
    logoHover: 'group-hover:text-sky-300',
  },

  // Glow effects
  glow: {
    primary: 'bg-blue-500/10',
    secondary: 'bg-violet-500/10',
  },
  
  // CTA (call to action) link colors
  cta: {
    text: 'text-slate-400',
    hover: 'group-hover:text-white',
  },
  
  // Lichess card specific colors
  lichess: {
    rating: 'bg-gradient-to-r from-emerald-300 via-cyan-200 to-emerald-200',
    perfType: 'text-emerald-300/70',
    link: 'text-emerald-300 hover:text-emerald-100',
    error: 'text-rose-300',
    loading: 'text-emerald-300/70',
  },
  
  // Card color themes (for experience cards, etc.)
  /*
    Five genuinely separate hues, in the SAME order as the light-theme table
    below (orange, rose, teal, violet, sky) so a given card keeps its identity
    when the theme is toggled.

    Previously all five dark variants were sky/blue/violet/purple/slate, which
    made them near-indistinguishable — updates.txt: "Find more contrasting
    colors for the card spec." The light table was already well spread; only
    this one needed the work.

    Titles resolve to white at the last stop so the company name stays legible
    whatever the hue.
  */
  /*
    ONE NARROW RAMP: cyan -> indigo. No pink, no violet, no wide hue jumps.

    "Rainbow means we are alternating and having so much disparity. I want
    somethng a little more consistent. Don't use pinkish colors either"

    History, because this is the third table here:
      1. amber / rose / teal / violet / sky — five unrelated hues.
      2. cyan / azure / indigo / violet / magenta — one arc of the neon
         spectrum, which fixed the "unrelated" half but still spanned ~180deg of
         hue and ended in fuchsia. Still read as alternating, and the pink was
         called out by name.
      3. HERE: cyan-300 through indigo-500, about 60deg of hue total. Adjacent
         cards differ by roughly one step, so the column reads as a gradient
         down the page rather than as five choices.

    The stop-to-stop distance IS the disparity, so it is the thing to shrink —
    picking prettier individual colours was never going to fix it.
  */
  cardThemes: [
    { accent: 'from-cyan-300 via-cyan-400 to-sky-400', border: 'border-cyan-400/30 hover:shadow-cyan-500/20', badge: 'bg-cyan-400/10 border-cyan-300/30 text-cyan-200', title: 'from-cyan-200 via-cyan-100 to-white', role: 'text-cyan-300', divider: 'border-cyan-400/20', glow: 'from-cyan-500/10' },
    { accent: 'from-cyan-400 via-sky-400 to-sky-500', border: 'border-sky-400/30 hover:shadow-sky-500/20', badge: 'bg-sky-400/10 border-sky-300/30 text-sky-200', title: 'from-sky-200 via-cyan-100 to-white', role: 'text-sky-300', divider: 'border-sky-400/20', glow: 'from-sky-500/10' },
    { accent: 'from-sky-400 via-blue-400 to-blue-500', border: 'border-blue-400/30 hover:shadow-blue-500/20', badge: 'bg-blue-400/10 border-blue-300/30 text-blue-200', title: 'from-blue-200 via-sky-100 to-white', role: 'text-blue-300', divider: 'border-blue-400/20', glow: 'from-blue-500/10' },
    { accent: 'from-blue-400 via-blue-500 to-indigo-500', border: 'border-blue-500/30 hover:shadow-blue-600/20', badge: 'bg-blue-500/10 border-blue-400/30 text-blue-200', title: 'from-blue-200 via-blue-100 to-white', role: 'text-blue-300', divider: 'border-blue-500/20', glow: 'from-blue-600/10' },
    { accent: 'from-blue-500 via-indigo-500 to-indigo-600', border: 'border-indigo-400/30 hover:shadow-indigo-500/20', badge: 'bg-indigo-400/10 border-indigo-300/30 text-indigo-200', title: 'from-indigo-200 via-blue-100 to-white', role: 'text-indigo-300', divider: 'border-indigo-400/20', glow: 'from-indigo-500/10' },
  ],
  
  // Accent colors
  accent: {
    violet: {
      border: 'border-violet-500/30',
      bg: 'bg-violet-950/50',
      text: 'text-violet-400',
      textMuted: 'text-violet-300/80',
      glow: 'bg-violet-500/20',
      hover: {
        border: 'hover:border-violet-500/50',
        bg: 'hover:bg-violet-400/30',
      },
    },
    pink: {
      border: 'border-pink-500/30',
      bg: 'bg-pink-950/40',
      text: 'text-pink-400',
      textLight: 'text-pink-100',
      textMuted: 'text-pink-300',
      badge: 'bg-pink-500/20',
      hover: {
        border: 'hover:border-pink-500/50',
      },
    },
    cyan: {
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-950/40',
      text: 'text-cyan-400',
      textLight: 'text-cyan-100',
      textMuted: 'text-cyan-300/70',
      glow: 'bg-cyan-400/10',
      hover: {
        border: 'hover:border-cyan-500/50',
        bg: 'hover:bg-cyan-400/20',
        glow: 'hover:bg-cyan-400/20',
      },
    },
    emerald: {
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-950/50',
      bgVia: 'via-emerald-950/30',
      text: 'text-emerald-100',
      textMuted: 'text-emerald-300/70',
      glow: 'bg-emerald-500/20',
      hover: {
        border: 'hover:border-emerald-500/50',
        text: 'hover:text-emerald-100',
        bg: 'hover:bg-emerald-400/30',
      },
    },
    indigo: {
      bg: 'bg-slate-950/90',
      border: 'border-blue-400/25',
      borderThin: 'border-blue-300/15',
      text: 'text-sky-300',
      textLight: 'text-blue-200',
      textDark: 'text-slate-950',
      glow: 'shadow-blue-950/50',
      shadow: 'shadow-blue-950/50',
      hover: {
        border: 'hover:border-sky-400/60',
        bg: 'hover:bg-blue-500/10',
        bgDark: 'hover:bg-indigo-950',
        text: 'hover:text-sky-100',
      },
    },
    orange: {
      text: 'text-orange-400',
      via: 'via-orange-300',
      // Added for FX:gooey-nav and the /more honors shelf: this ramp only had
      // `text` and `via`, so `accent.orange.bg` resolved to undefined and the
      // class silently vanished.
      bg: 'bg-orange-500/15',
      border: 'border-orange-400/30',
      textMuted: 'text-orange-300/80',
      /** Opaque fill — the gooey blob needs solid alpha for the filter to bite. */
      solid: 'bg-amber-500',
    },
    yellow: {
      border: 'border-amber-500/30',
      bg: 'bg-amber-50/50',
      text: 'text-amber-300',
      textMuted: 'text-amber-400/80',
      glow: 'bg-amber-400/20',
      from: 'from-amber-600',
      to: 'to-yellow-600',
      hover: {
        border: 'hover:border-amber-400/60',
        bg: 'hover:bg-amber-400/30',
        text: 'hover:text-amber-200',
      },
    },
    blue: {
      from: 'from-blue-600/40',
    },
    purple: {
      from: 'from-purple-500',
      shadow: 'shadow-purple-500/25',
    },
  },

  sectionHeader: 'text-slate-200',
  
  // Carousel controls
  carousel: {
    arrow: {
      bg: 'bg-slate-950/80',
      border: 'border-blue-400/30',
      hoverBg: 'hover:bg-blue-500/15',
      hoverBorder: 'hover:border-sky-400/70',
      icon: 'text-sky-200',
    },
    dot: {
      active: 'bg-sky-400',
      inactive: 'bg-slate-700',
      hover: 'hover:bg-violet-400',
    },
  },
  
  // Gradient backgrounds
  gradient: {
    primary: 'bg-gradient-to-br from-slate-900 via-violet-950/30 to-slate-900',
    secondary: 'bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-900',
    violet: 'bg-gradient-to-br from-violet-950/50 via-slate-900/70 to-slate-900/70',
    pink: 'bg-gradient-to-br from-pink-950/40 via-slate-900/70 to-slate-900/70',
    cyan: 'bg-gradient-to-br from-cyan-950/40 via-slate-900/70 to-slate-900/70',
    emerald: 'bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-800',
    button: 'bg-gradient-to-r from-blue-600/40 to-slate-400/40',
    divider: 'bg-gradient-to-r from-yellow-800 via-orange-300 to-yellow-800',
    sectionLine: 'bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500',
    overlay: 'bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10',
    yellow: 'bg-gradient-to-br from-amber-900/60 via-yellow-950/40 to-amber-950/60',
  },
  
  // Hover effects
  hover: {
    scale: 'hover:scale-110',
    scaleSmall: 'hover:scale-105',
    translateUp: 'hover:-translate-y-1',
    translateUpMedium: 'hover:-translate-y-2',
    shadow: 'hover:shadow-xl',
    shadowLarge: 'hover:shadow-2xl',
    bgSecondary: 'hover:bg-slate-500/20',
  }
};




// Light theme colors - WARM COFFEE THEME with excellent contrast
export const lightTheme = {
  // Tech stack colors - for coffee theme (darker, high contrast)
  techColors: [
    "text-blue-600",
    "text-blue-700",
    "text-cyan-600",
    "text-cyan-700",
    "text-teal-600",
    "text-emerald-600",
    "text-emerald-700",
    "text-green-600",
    "text-green-700",
    "text-lime-600",
    "text-red-600",
    "text-rose-600",
    "text-pink-600",
    "text-pink-700",
    "text-purple-600",
    "text-purple-700",
    "text-violet-600",
    "text-violet-700",
    "text-indigo-600",
    "text-indigo-700",
    "text-sky-600",
    "text-slate-600",
    "text-slate-700",
  ],
  // Background colors - warm cream base with rich coffee tones
  bg: {
    body: 'bg-amber-50',                                        // Warm cream base
    // FX:side-rays — was 'bg-white'; translucent so MatrixRain glimmers behind the content
    page: 'bg-white/90',                                        // Clean white for content
    card: 'bg-white border border-amber-200/80 shadow-md',      // Clean cards with warm border
    cardSolid: 'bg-white',
    cardHover: 'bg-amber-900',                                   // Warm hover state
    cardElevated: 'bg-amber-100/80',
    secondary: 'bg-amber-100/50',                               // Secondary backgrounds
    navbar: 'bg-white/95 border-b border-amber-200 shadow-sm',  // Clean navbar
    overlay: 'bg-amber-100',                      // High contrast badge
    black: 'bg-amber-950',
    backdrop: 'bg-white/98',
  },
  
  // Text colors - rich browns for excellent readability
  text: {
    primary: 'text-amber-950',                                  // Rich dark brown for main text
    secondary: 'text-amber-900',                                // Dark brown for headings
    muted: 'text-amber-800',                                    // Medium brown
    subtle: 'text-amber-700',                                   // Subtle brown
    dim: 'text-amber-600',                                      // Lighter brown
    white: 'text-white',                                        // White text for dark backgrounds
  },
  
  // Border colors - warm amber tones
  border: {
    default: 'border-amber-300',                                // Default warm border
    secondary: 'border-amber-400',
    tertiary: 'border-amber-200',
    accent: 'border-orange-500',
    light: 'border-amber-200',
    hover: 'border-amber-500',
    divider: 'border-amber-300',
  },
  
  // Status colors - warm but clear
  status: {
    completed: {
      border: 'border-emerald-600',
      bg: 'bg-emerald-100',
      text: 'text-emerald-800',
    },
    inProgress: {
      border: 'border-orange-500',
      bg: 'bg-orange-100',
      text: 'text-orange-800',
    },
  },
  
  // Filter colors - rich coffee brown
  filter: {
    active: {
      bg: 'bg-amber-900',
      text: 'text-amber-50',
      border: 'border-amber-950',
    },
    inactive: {
      hoverBg: 'hover:bg-amber-100',
      hoverText: 'hover:text-amber-950',
      hoverBorder: 'hover:border-amber-500',
    },
  },
  
  // Navigation link colors
  nav: {
    active: 'bg-amber-900 text-amber-50 shadow-md shadow-amber-400/40',
    inactive: 'text-amber-800 hover:text-amber-950 hover:bg-amber-100',
    logoHover: 'group-hover:text-orange-600',
  },
  
  // Glow effects - warm and subtle
  glow: {
    primary: 'bg-orange-200/40',
    secondary: 'bg-amber-200/40',
  },
  
  // CTA (call to action) link colors
  cta: {
    text: 'text-amber-700',
    hover: 'group-hover:text-amber-950',
  },
  
  // Lichess card specific colors
  lichess: {
    rating: 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400',
    perfType: 'text-emerald-800',
    link: 'text-emerald-700 hover:text-emerald-900',
    error: 'text-rose-700',
    loading: 'text-emerald-700',
  },
  
  // Card color themes - warm, rich palette with high contrast
  /* Same narrow cyan -> indigo ramp as the dark table, darkened for cream. */
  cardThemes: [
    { accent: 'from-cyan-500 via-cyan-600 to-sky-600', border: 'border-cyan-400 hover:shadow-xl hover:shadow-cyan-300/40', badge: 'bg-cyan-100 border-cyan-400 text-cyan-900', title: 'from-cyan-800 via-cyan-700 to-sky-700', role: 'text-cyan-800', divider: 'border-cyan-300', glow: 'from-cyan-200' },
    { accent: 'from-cyan-600 via-sky-600 to-sky-700', border: 'border-sky-400 hover:shadow-xl hover:shadow-sky-300/40', badge: 'bg-sky-100 border-sky-400 text-sky-900', title: 'from-sky-800 via-cyan-700 to-sky-700', role: 'text-sky-800', divider: 'border-sky-300', glow: 'from-sky-200' },
    { accent: 'from-sky-600 via-blue-600 to-blue-700', border: 'border-blue-400 hover:shadow-xl hover:shadow-blue-300/40', badge: 'bg-blue-100 border-blue-400 text-blue-900', title: 'from-blue-800 via-sky-700 to-blue-700', role: 'text-blue-800', divider: 'border-blue-300', glow: 'from-blue-200' },
    { accent: 'from-blue-600 via-blue-700 to-indigo-700', border: 'border-blue-500 hover:shadow-xl hover:shadow-blue-400/40', badge: 'bg-blue-100 border-blue-500 text-blue-900', title: 'from-blue-800 via-blue-700 to-indigo-700', role: 'text-blue-900', divider: 'border-blue-400', glow: 'from-blue-200' },
    { accent: 'from-blue-700 via-indigo-600 to-indigo-700', border: 'border-indigo-400 hover:shadow-xl hover:shadow-indigo-300/40', badge: 'bg-indigo-100 border-indigo-400 text-indigo-900', title: 'from-indigo-800 via-blue-700 to-indigo-700', role: 'text-indigo-800', divider: 'border-indigo-300', glow: 'from-indigo-200' },
  ],

  // Accent colors - warm coffee tones with high contrast
  accent: {
    violet: {
      border: 'border-orange-400',
      bg: 'bg-orange-50',
      text: 'text-orange-800',
      textMuted: 'text-orange-700',
      glow: 'bg-orange-200/50',
      hover: {
        border: 'hover:border-orange-500',
        bg: 'hover:bg-orange-100',
      },
    },
    pink: {
      border: 'border-rose-400',
      bg: 'bg-rose-50',
      text: 'text-rose-800',
      textLight: 'text-rose-700',
      textMuted: 'text-rose-700',
      badge: 'bg-rose-100',
      hover: {
        border: 'hover:border-rose-500',
      },
    },
    cyan: {
      border: 'border-teal-400',
      bg: 'bg-teal-50',
      text: 'text-teal-800',
      textLight: 'text-teal-700',
      textMuted: 'text-teal-700',
      glow: 'bg-teal-200/50',
      hover: {
        border: 'hover:border-teal-500',
        bg: 'hover:bg-teal-100',
        glow: 'hover:bg-teal-200',
      },
    },
    emerald: {
      border: 'border-emerald-400',
      bg: 'bg-emerald-50',
      bgVia: 'via-emerald-100',
      text: 'text-emerald-800',
      textMuted: 'text-emerald-700',
      glow: 'bg-emerald-200/50',
      hover: {
        border: 'hover:border-emerald-500',
        text: 'hover:text-emerald-900',
        bg: 'hover:bg-emerald-100',
      },
    },
    indigo: {
      bg: 'bg-amber-100',
      border: 'border-amber-400',
      borderThin: 'border-amber-300',
      text: 'text-amber-900',
      textLight: 'text-amber-800',
      textDark: 'text-amber-50',
      glow: 'shadow-amber-300/50',
      shadow: 'shadow-amber-400/40',
      hover: {
        border: 'hover:border-amber-500',
        bg: 'hover:bg-amber-200',
        bgDark: 'hover:bg-amber-300',
        text: 'hover:text-amber-950',
      },
    },
    orange: {
      text: 'text-orange-700',
      via: 'via-orange-500',
      // See the dark-theme note above.
      bg: 'bg-orange-100',
      border: 'border-orange-400/50',
      textMuted: 'text-orange-600',
      /** Opaque fill — the gooey blob needs solid alpha for the filter to bite. */
      solid: 'bg-amber-500',
    },
    yellow: {
      border: 'border-amber-400',
      bg: 'bg-gradient-to-br from-amber-50 to-yellow-50',
      text: 'text-amber-800',
      textMuted: 'text-amber-700',
      glow: 'bg-amber-300/40',
      from: 'from-amber-500',
      to: 'to-yellow-500',
      hover: {
        border: 'hover:border-amber-500',
        bg: 'hover:bg-amber-200/60',
        text: 'hover:text-amber-900',
      },
    },
    blue: {
      from: 'from-sky-500',
    },
    purple: {
      from: 'from-violet-500',
      shadow: 'shadow-violet-400/40',
    },
  },
  
  // Gradient backgrounds - warm and inviting
  gradient: {
    primary: 'bg-gradient-to-br from-amber-50 via-orange-50/40 to-amber-100',
    secondary: 'bg-gradient-to-br from-white via-amber-50 to-orange-50/30',
    violet: 'bg-gradient-to-br from-orange-100/60 via-amber-50 to-white',
    pink: 'bg-gradient-to-br from-rose-100/60 via-amber-50 to-white',
    cyan: 'bg-gradient-to-br from-teal-100/60 via-amber-50 to-white',
    emerald: 'bg-gradient-to-br from-emerald-100/60 via-amber-50 to-white',
    button: 'bg-gradient-to-r from-amber-700 via-amber-800 to-amber-700',
    divider: 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500',
    sectionLine: 'bg-gradient-to-r from-orange-500 to-rose-500',
    overlay: 'bg-gradient-to-br from-orange-200/30 via-transparent to-amber-200/30',
    yellow: 'bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-50',
  },
  
  sectionHeader: 'text-amber-900',
  
  // Carousel controls - warm and clear
  carousel: {
    arrow: {
      bg: 'bg-white',
      border: 'border-amber-300',
      hoverBg: 'hover:bg-amber-100',
      hoverBorder: 'hover:border-amber-500',
      icon: 'text-amber-800',
    },
    dot: {
      active: 'bg-orange-500',
      inactive: 'bg-amber-300',
      hover: 'hover:bg-amber-400',
    },
  },
  
  // Hover effects
  hover: {
    scale: 'hover:scale-110',
    scaleSmall: 'hover:scale-105',
    translateUp: 'hover:-translate-y-1',
    translateUpMedium: 'hover:-translate-y-3',
    shadow: 'hover:shadow-xl',
    shadowLarge: 'hover:shadow-2xl',
    bgSecondary: 'hover:bg-amber-100',
  }
};

export const themeToggle = {
  sun: 'text-amber-600',
  moon: 'text-black',
}


// Theme store - derived from darkModeStore to automatically switch themes
export const theme = derived(darkModeStore, ($isDarkMode) => $isDarkMode ? darkTheme : lightTheme);
