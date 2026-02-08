import { writable, derived, get } from 'svelte/store';

export const darkModeStore = writable(true);

// Screen width store
export const screenWidth = writable(0);

// Derived breakpoint stores
export const breakpoints = derived(screenWidth, ($width) => ({
  isMobile: $width < 500,
  isTablet: $width >= 500 && $width < 1000,
  isDesktop: $width >= 1000,
  isLarge: $width >= 1200,
  
  // Responsive values
  itemsPerSection: $width < 700 ? 1 : $width < 1000 ? 2 : 3,
}));

// Dark theme colors (the source of truth)
export const darkTheme = {
  // Tech stack colors - for dark theme (light, vibrant)
  techColors: [
    "text-blue-300",
    "text-blue-400",
    "text-cyan-300",
    "text-cyan-400",
    "text-teal-300",
    "text-emerald-300",
    "text-emerald-400",
    "text-green-300",
    "text-green-400",
    "text-lime-300",
    "text-yellow-300",
    "text-yellow-400",
    "text-amber-300",
    "text-orange-300",
    "text-orange-400",
    "text-red-300",
    "text-rose-300",
    "text-pink-300",
    "text-pink-400",
    "text-purple-300",
    "text-purple-400",
    "text-violet-300",
    "text-violet-400",
    "text-indigo-300",
    "text-indigo-400",
    "text-sky-300",
    "text-slate-300",
    "text-slate-400",
  ],
  // Background colors
  bg: {
    body: 'bg-slate-950',
    page: 'bg-black',
    card: 'bg-slate-900/70',
    cardSolid: 'bg-slate-900',
    cardHover: 'bg-slate-800/60',
    cardElevated: 'bg-slate-600/80',
    secondary: 'bg-slate-800/50',
    navbar: 'bg-slate-950/95',
    overlay: 'bg-slate-500/10',
    black: 'bg-black',
    backdrop: 'bg-slate-900/80',
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
    default: 'border-slate-500/20',
    secondary: 'border-slate-500/30',
    tertiary: 'border-slate-700',
    accent: 'border-slate-800',
    light: 'border-slate-400/20',
    hover: 'border-slate-600',
    divider: 'border-slate-500/50',
  },
  
  // Status colors (for project cards)
  status: {
    completed: {
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
    },
    inProgress: {
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
    },
  },
  
// Filter colors
  filter: {
    active: {
      bg: 'bg-white',
      text: 'text-indigo-950',
      border: 'border-white',
    },
    inactive: {
      hoverBg: 'hover:bg-indigo-900',
      hoverText: 'hover:text-indigo-100',
      hoverBorder: 'hover:border-indigo-700',
    },
  },
  
  // Navigation link colors
  nav: {
    active: 'bg-violet-600 text-white shadow-md shadow-purple-500/25',
    inactive: 'text-slate-400 hover:text-white hover:bg-slate-800/60',
    logoHover: 'group-hover:text-slate-300',
  },
  
  // Glow effects
  glow: {
    primary: 'bg-indigo-500/10',
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
  cardThemes: [
    { accent: 'from-cyan-400 via-teal-400 to-emerald-400', border: 'border-cyan-500/20 hover:shadow-cyan-500/20', badge: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300', title: 'from-cyan-300 via-teal-200 to-white', role: 'text-teal-400', divider: 'border-cyan-500/10', glow: 'from-cyan-500/10' },
    { accent: 'from-orange-400 via-amber-400 to-yellow-400', border: 'border-orange-500/20 hover:shadow-orange-500/20', badge: 'bg-orange-500/15 border-orange-400/30 text-orange-300', title: 'from-orange-300 via-amber-200 to-white', role: 'text-orange-400', divider: 'border-orange-500/10', glow: 'from-orange-500/10' },
    { accent: 'from-purple-400 via-violet-400 to-fuchsia-400', border: 'border-purple-500/20 hover:shadow-purple-500/20', badge: 'bg-purple-500/15 border-purple-400/30 text-purple-300', title: 'from-purple-300 via-violet-200 to-white', role: 'text-purple-400', divider: 'border-purple-500/10', glow: 'from-purple-500/10' },
    { accent: 'from-slate-400 via-gray-400 to-zinc-400', border: 'border-slate-500/20 hover:shadow-slate-500/20', badge: 'bg-slate-500/15 border-slate-400/30 text-slate-300', title: 'from-slate-300 via-gray-200 to-white', role: 'text-slate-400', divider: 'border-slate-500/10', glow: 'from-slate-500/10' },
    { accent: 'from-blue-400 via-indigo-400 to-sky-400', border: 'border-blue-500/20 hover:shadow-blue-500/20', badge: 'bg-blue-500/15 border-blue-400/30 text-blue-300', title: 'from-blue-300 via-indigo-200 to-white', role: 'text-indigo-400', divider: 'border-blue-500/10', glow: 'from-blue-500/10' },
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
      bg: 'bg-indigo-950',
      border: 'border-indigo-800/60',
      borderThin: 'border-indigo-400/20',
      text: 'text-indigo-400',
      textLight: 'text-indigo-300',
      textDark: 'text-indigo-950',
      glow: 'shadow-indigo-900/30',
      shadow: 'shadow-indigo-900/30',
      hover: {
        border: 'hover:border-indigo-500',
        bg: 'hover:bg-indigo-500/10',
        bgDark: 'hover:bg-indigo-900',
        text: 'hover:text-indigo-100',
      },
    },
    orange: {
      text: 'text-orange-400',
      via: 'via-orange-300',
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
      bg: 'bg-slate-800/50',
      border: 'border-violet-800',
      hoverBg: 'hover:bg-violet-500/20',
      hoverBorder: 'hover:border-violet-500',
      icon: 'text-slate-300',
    },
    dot: {
      active: 'bg-purple-400',
      inactive: 'bg-slate-600',
      hover: 'hover:bg-slate-400',
    },
  },
  
  // Gradient backgrounds
  gradient: {
    primary: 'bg-gradient-to-br from-slate-900 via-violet-950/30 to-slate-900',
    secondary: 'bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900',
    violet: 'bg-gradient-to-br from-violet-950/50 via-slate-900/70 to-slate-900/70',
    pink: 'bg-gradient-to-br from-pink-950/40 via-slate-900/70 to-slate-900/70',
    cyan: 'bg-gradient-to-br from-cyan-950/40 via-slate-900/70 to-slate-900/70',
    emerald: 'bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-800',
    button: 'bg-gradient-to-r from-blue-600/40 to-slate-400/40',
    divider: 'bg-gradient-to-r from-yellow-800 via-orange-300 to-yellow-800',
    sectionLine: 'bg-gradient-to-r from-purple-500 to-cyan-500',
    overlay: 'bg-gradient-to-br from-slate-500/10 via-transparent to-cyan-500/10',
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
    page: 'bg-white',                                           // Clean white for content
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
  cardThemes: [
    { accent: 'from-orange-500 via-amber-500 to-yellow-500', border: 'border-orange-400 hover:shadow-xl hover:shadow-orange-300/40', badge: 'bg-orange-100 border-orange-400 text-orange-900', title: 'from-orange-800 via-amber-700 to-yellow-700', role: 'text-orange-800', divider: 'border-orange-300', glow: 'from-orange-200' },
    { accent: 'from-rose-500 via-pink-500 to-red-500', border: 'border-rose-400 hover:shadow-xl hover:shadow-rose-300/40', badge: 'bg-rose-100 border-rose-400 text-rose-900', title: 'from-rose-800 via-pink-700 to-red-700', role: 'text-rose-800', divider: 'border-rose-300', glow: 'from-rose-200' },
    { accent: 'from-teal-500 via-emerald-500 to-green-500', border: 'border-teal-400 hover:shadow-xl hover:shadow-teal-300/40', badge: 'bg-teal-100 border-teal-400 text-teal-900', title: 'from-teal-800 via-emerald-700 to-green-700', role: 'text-teal-800', divider: 'border-teal-300', glow: 'from-teal-200' },
    { accent: 'from-violet-500 via-purple-500 to-indigo-500', border: 'border-violet-400 hover:shadow-xl hover:shadow-violet-300/40', badge: 'bg-violet-100 border-violet-400 text-violet-900', title: 'from-violet-800 via-purple-700 to-indigo-700', role: 'text-violet-800', divider: 'border-violet-300', glow: 'from-violet-200' },
    { accent: 'from-sky-500 via-blue-500 to-indigo-500', border: 'border-sky-400 hover:shadow-xl hover:shadow-sky-300/40', badge: 'bg-sky-100 border-sky-400 text-sky-900', title: 'from-sky-800 via-blue-700 to-indigo-700', role: 'text-sky-800', divider: 'border-sky-300', glow: 'from-sky-200' },
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