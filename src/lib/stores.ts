import { writable, derived } from 'svelte/store';

export const darkModeStore = writable(true);

export const screenWidth = writable(0);

export const displayWidth = writable(1920);

const MOBILE_FRACTION = 0.4;
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
      itemsPerSection: $width < threshold ? 1 : $width < threshold * 1.5 ? 2 : 3,
    };
  }
);

const darkTheme = {
  techColors: [
    "text-cyan-300",
    "text-emerald-300",
    "text-amber-300",
    "text-violet-300",
    "text-sky-400",
    "text-lime-300",
    "text-orange-300",
    "text-teal-300",
    "text-indigo-300",
    "text-yellow-300",
  ],
  bg: {
    // for performance: that blur used to soften the rain into a wash, so at the
    page: 'bg-black/90',
    card: 'bg-slate-950/80',
    cardSolid: 'bg-slate-950',
    cardHover: 'bg-slate-900/90',
    cardElevated: 'bg-slate-900/80',
    flipCard: 'bg-slate-950/[0.985]',
    cardMuted: 'bg-slate-900/70',
    panel: 'bg-slate-950/90',
    secondary: 'bg-indigo-950/50',
    navbar: 'bg-black/90',
    overlay: 'bg-blue-400/10',
    backdrop: 'bg-slate-950/90',
  },
  
  text: {
    primary: 'text-slate-200',
    secondary: 'text-slate-100',
    muted: 'text-slate-300',
    subtle: 'text-slate-400',
    dim: 'text-slate-500',
    white: 'text-white',
    /* text.white is 'text-white' in BOTH themes, so it cannot inverse. */
    strong: 'text-slate-50',
  },
  
  border: {
    default: 'border-blue-400/15',
    tertiary: 'border-slate-700',
    accent: 'border-violet-500/20',
    light: 'border-slate-300/15',
    hover: 'border-blue-400/60',
    divider: 'border-blue-400/25',
  },
  
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

  filter: {
    active: {
      bg: 'bg-gradient-to-r from-sky-400 to-blue-500',
      text: 'text-slate-950',
    },
  },

  nav: {
    inactive: 'text-slate-400 hover:text-white hover:bg-blue-500/10',
  },

  
  
  lichess: {
    rating: 'bg-gradient-to-r from-emerald-300 via-cyan-200 to-emerald-200',
    perfType: 'text-emerald-300/70',
    link: 'text-emerald-300 hover:text-emerald-100',
    error: 'text-rose-300',
    loading: 'text-emerald-300/70',
  },
  
  experienceThemes: [
    { accent: 'from-white via-slate-200 to-slate-400', border: 'border-slate-300/30 hover:shadow-slate-300/20', badge: 'bg-slate-200/10 border-slate-300/30 text-slate-100', title: 'from-white via-slate-100 to-white', role: 'text-slate-200', divider: 'border-slate-400/25', glow: 'from-slate-200/10' },
    { accent: 'from-slate-100 via-slate-300 to-slate-500', border: 'border-slate-400/30 hover:shadow-slate-400/20', badge: 'bg-slate-300/10 border-slate-400/30 text-slate-100', title: 'from-slate-50 via-white to-slate-200', role: 'text-slate-300', divider: 'border-slate-400/25', glow: 'from-slate-300/10' },
    { accent: 'from-slate-200 via-slate-400 to-slate-600', border: 'border-slate-400/30 hover:shadow-slate-400/20', badge: 'bg-slate-300/10 border-slate-400/30 text-slate-200', title: 'from-white via-slate-200 to-slate-100', role: 'text-slate-300', divider: 'border-slate-500/25', glow: 'from-slate-400/10' },
    { accent: 'from-slate-300 via-slate-500 to-slate-700', border: 'border-slate-500/30 hover:shadow-slate-500/20', badge: 'bg-slate-400/10 border-slate-500/30 text-slate-200', title: 'from-slate-100 via-white to-slate-300', role: 'text-slate-400', divider: 'border-slate-500/25', glow: 'from-slate-500/10' },
    { accent: 'from-slate-200 via-slate-300 to-slate-500', border: 'border-slate-300/30 hover:shadow-slate-300/20', badge: 'bg-slate-200/10 border-slate-300/30 text-slate-100', title: 'from-white via-slate-100 to-slate-200', role: 'text-slate-300', divider: 'border-slate-400/25', glow: 'from-slate-200/10' },
  ],

  cardThemes: [
    { accent: 'from-cyan-300 via-cyan-400 to-sky-400', border: 'border-cyan-400/30 hover:shadow-cyan-500/20', badge: 'bg-cyan-400/10 border-cyan-300/30 text-cyan-200', title: 'from-cyan-200 via-cyan-100 to-white', role: 'text-cyan-300', divider: 'border-cyan-400/20', glow: 'from-cyan-500/10' },
    { accent: 'from-cyan-400 via-sky-400 to-sky-500', border: 'border-sky-400/30 hover:shadow-sky-500/20', badge: 'bg-sky-400/10 border-sky-300/30 text-sky-200', title: 'from-sky-200 via-cyan-100 to-white', role: 'text-sky-300', divider: 'border-sky-400/20', glow: 'from-sky-500/10' },
    { accent: 'from-sky-400 via-blue-400 to-blue-500', border: 'border-blue-400/30 hover:shadow-blue-500/20', badge: 'bg-blue-400/10 border-blue-300/30 text-blue-200', title: 'from-blue-200 via-sky-100 to-white', role: 'text-blue-300', divider: 'border-blue-400/20', glow: 'from-blue-500/10' },
    { accent: 'from-blue-400 via-blue-500 to-indigo-500', border: 'border-blue-500/30 hover:shadow-blue-600/20', badge: 'bg-blue-500/10 border-blue-400/30 text-blue-200', title: 'from-blue-200 via-blue-100 to-white', role: 'text-blue-300', divider: 'border-blue-500/20', glow: 'from-blue-600/10' },
    { accent: 'from-blue-500 via-indigo-500 to-indigo-600', border: 'border-indigo-400/30 hover:shadow-indigo-500/20', badge: 'bg-indigo-400/10 border-indigo-300/30 text-indigo-200', title: 'from-indigo-200 via-blue-100 to-white', role: 'text-indigo-300', divider: 'border-indigo-400/20', glow: 'from-indigo-500/10' },
  ],
  
  accent: {
    cyan: {
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      hover: {
        border: 'hover:border-cyan-500/50',
      },
    },
    indigo: {
      bg: 'bg-slate-950/90',
      border: 'border-blue-400/25',
      text: 'text-yellow-500',
      glow: 'shadow-blue-950/50',
      hover: {
        border: 'hover:border-sky-400/60',
        bg: 'hover:bg-blue-500/10',
      },
    },
    orange: {
      text: 'text-orange-400',
      bg: 'bg-orange-500/15',
      border: 'border-orange-400/30',
    },
    yellow: {
      border: 'border-amber-500/30',
      text: 'text-amber-300',
      glow: 'bg-amber-400/20',
      hover: {
        border: 'hover:border-amber-400/60',
        bg: 'hover:bg-amber-400/30',
      },
    },
    purple: {
      shadow: 'shadow-purple-500/25',
    },
  },

  sectionHeader: 'text-slate-200',
  
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
  
  gradient: {
    primary: 'bg-gradient-to-br from-slate-900 via-violet-950/30 to-slate-900',
    divider: 'bg-gradient-to-r from-yellow-800 via-orange-300 to-yellow-800',
    sectionLine: 'bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500',
    yellow: 'bg-gradient-to-br from-amber-900/60 via-yellow-950/40 to-amber-950/60',
  },
  
  hover: {
    scale: 'hover:scale-110',
    scaleSmall: 'hover:scale-105',
    translateUpMedium: 'hover:-translate-y-2',
    shadowLarge: 'hover:shadow-2xl',
    bgSecondary: 'hover:bg-slate-500/20',
  }
};

const lightTheme = {
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
    "text-orange-600",
    "text-amber-600",
    "text-yellow-700",
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
  bg: {
    page: 'bg-white/90',                                        // Clean white for content
    card: 'bg-white border border-amber-200/80 shadow-md',      // Clean cards with warm border
    cardSolid: 'bg-white',
    cardHover: 'bg-amber-900',                                   // Warm hover state
    cardElevated: 'bg-amber-100/80',
    flipCard: 'bg-white/[0.985]',
    cardMuted: 'bg-amber-50',
    panel: 'bg-amber-50/95',
    secondary: 'bg-amber-100/50',                               // Secondary backgrounds
    navbar: 'bg-white/95 border-b border-amber-200 shadow-sm',  // Clean navbar
    overlay: 'bg-amber-100',                      // High contrast badge
    backdrop: 'bg-white/98',
  },
  
  text: {
    primary: 'text-amber-950',                                  // Rich dark brown for main text
    secondary: 'text-amber-900',                                // Dark brown for headings
    muted: 'text-amber-800',                                    // Medium brown
    subtle: 'text-amber-700',                                   // Subtle brown
    dim: 'text-amber-600',                                      // Lighter brown
    white: 'text-white',                                        // White text for dark backgrounds
    strong: 'text-amber-950',                                   // Darkest brown — inverse of dark's slate-50
  },
  
  border: {
    default: 'border-amber-300',                                // Default warm border
    tertiary: 'border-amber-200',
    accent: 'border-orange-500',
    light: 'border-amber-200',
    hover: 'border-amber-500',
    divider: 'border-amber-300',
  },
  
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
  
  filter: {
    active: {
      bg: 'bg-amber-900',
      text: 'text-amber-50',
    },
  },
  
  nav: {
    inactive: 'text-amber-800 hover:text-amber-950 hover:bg-amber-100',
  },
  
  
  
  lichess: {
    rating: 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400',
    perfType: 'text-emerald-800',
    link: 'text-emerald-700 hover:text-emerald-900',
    error: 'text-rose-700',
    loading: 'text-emerald-700',
  },
  
  experienceThemes: [
    { accent: 'from-slate-500 via-slate-600 to-slate-800', border: 'border-slate-400 hover:shadow-xl hover:shadow-slate-300/40', badge: 'bg-slate-100 border-slate-400 text-slate-900', title: 'from-slate-900 via-slate-700 to-slate-900', role: 'text-slate-700', divider: 'border-slate-300', glow: 'from-slate-200' },
    { accent: 'from-slate-600 via-slate-700 to-slate-900', border: 'border-slate-500 hover:shadow-xl hover:shadow-slate-400/40', badge: 'bg-slate-100 border-slate-500 text-slate-900', title: 'from-slate-900 via-slate-800 to-slate-900', role: 'text-slate-700', divider: 'border-slate-300', glow: 'from-slate-200' },
    { accent: 'from-slate-400 via-slate-600 to-slate-800', border: 'border-slate-400 hover:shadow-xl hover:shadow-slate-300/40', badge: 'bg-slate-100 border-slate-400 text-slate-900', title: 'from-slate-800 via-slate-900 to-slate-800', role: 'text-slate-600', divider: 'border-slate-300', glow: 'from-slate-200' },
    { accent: 'from-slate-500 via-slate-700 to-slate-900', border: 'border-slate-500 hover:shadow-xl hover:shadow-slate-400/40', badge: 'bg-slate-100 border-slate-500 text-slate-900', title: 'from-slate-900 via-slate-700 to-slate-900', role: 'text-slate-700', divider: 'border-slate-400', glow: 'from-slate-300' },
    { accent: 'from-slate-400 via-slate-500 to-slate-700', border: 'border-slate-400 hover:shadow-xl hover:shadow-slate-300/40', badge: 'bg-slate-100 border-slate-400 text-slate-900', title: 'from-slate-800 via-slate-900 to-slate-700', role: 'text-slate-600', divider: 'border-slate-300', glow: 'from-slate-200' },
  ],

  cardThemes: [
    { accent: 'from-cyan-500 via-cyan-600 to-sky-600', border: 'border-cyan-400 hover:shadow-xl hover:shadow-cyan-300/40', badge: 'bg-cyan-100 border-cyan-400 text-cyan-900', title: 'from-cyan-800 via-cyan-700 to-sky-700', role: 'text-cyan-800', divider: 'border-cyan-300', glow: 'from-cyan-200' },
    { accent: 'from-cyan-600 via-sky-600 to-sky-700', border: 'border-sky-400 hover:shadow-xl hover:shadow-sky-300/40', badge: 'bg-sky-100 border-sky-400 text-sky-900', title: 'from-sky-800 via-cyan-700 to-sky-700', role: 'text-sky-800', divider: 'border-sky-300', glow: 'from-sky-200' },
    { accent: 'from-sky-600 via-blue-600 to-blue-700', border: 'border-blue-400 hover:shadow-xl hover:shadow-blue-300/40', badge: 'bg-blue-100 border-blue-400 text-blue-900', title: 'from-blue-800 via-sky-700 to-blue-700', role: 'text-blue-800', divider: 'border-blue-300', glow: 'from-blue-200' },
    { accent: 'from-blue-600 via-blue-700 to-indigo-700', border: 'border-blue-500 hover:shadow-xl hover:shadow-blue-400/40', badge: 'bg-blue-100 border-blue-500 text-blue-900', title: 'from-blue-800 via-blue-700 to-indigo-700', role: 'text-blue-900', divider: 'border-blue-400', glow: 'from-blue-200' },
    { accent: 'from-blue-700 via-indigo-600 to-indigo-700', border: 'border-indigo-400 hover:shadow-xl hover:shadow-indigo-300/40', badge: 'bg-indigo-100 border-indigo-400 text-indigo-900', title: 'from-indigo-800 via-blue-700 to-indigo-700', role: 'text-indigo-800', divider: 'border-indigo-300', glow: 'from-indigo-200' },
  ],

  accent: {
    cyan: {
      border: 'border-teal-400',
      text: 'text-teal-800',
      hover: {
        border: 'hover:border-teal-500',
      },
    },
    indigo: {
      bg: 'bg-amber-100',
      border: 'border-amber-400',
      text: 'text-amber-900',
      glow: 'shadow-amber-300/50',
      hover: {
        border: 'hover:border-amber-500',
        bg: 'hover:bg-amber-200',
      },
    },
    orange: {
      text: 'text-orange-700',
      bg: 'bg-orange-100',
      border: 'border-orange-400/50',
    },
    yellow: {
      border: 'border-amber-400',
      text: 'text-amber-800',
      glow: 'bg-amber-300/40',
      hover: {
        border: 'hover:border-amber-500',
        bg: 'hover:bg-amber-200/60',
      },
    },
    purple: {
      shadow: 'shadow-violet-400/40',
    },
  },
  
  gradient: {
    primary: 'bg-gradient-to-br from-amber-50 via-orange-50/40 to-amber-100',
    divider: 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500',
    sectionLine: 'bg-gradient-to-r from-orange-500 to-rose-500',
    yellow: 'bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-50',
  },
  
  sectionHeader: 'text-amber-900',
  
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
  
  hover: {
    scale: 'hover:scale-110',
    scaleSmall: 'hover:scale-105',
    translateUpMedium: 'hover:-translate-y-3',
    shadowLarge: 'hover:shadow-2xl',
    bgSecondary: 'hover:bg-amber-100',
  }
};

export const themeToggle = {
  sun: 'text-amber-600',
  moon: 'text-black',
}

export const theme = derived(darkModeStore, ($isDarkMode) => $isDarkMode ? darkTheme : lightTheme);
