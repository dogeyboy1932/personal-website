import { derived, writable } from 'svelte/store';

/** Tailwind class strings, one set per theme.
 *
 *  This is the class-name half of the palette; the other half lives in
 *  the TOKENS section of src/styles.css as custom properties, bridged by ./_tokens.ts.
 *  Rule of thumb: reach for a class here when markup picks the colour, and for a
 *  token when canvas or inline SVG needs a concrete colour string.
 *
 *  `lightTheme` is typed as `Theme`, so a key added to one theme and forgotten in
 *  the other is a compile error rather than a runtime `undefined` in a class list.
 *  Keep the two in the same order — they are read side by side.
 */

export const darkModeStore = writable(true);

const darkTheme = {
  techColors: [
    'text-cyan-300',
    'text-emerald-300',
    'text-amber-300',
    'text-violet-300',
    'text-sky-400',
    'text-lime-300',
    'text-orange-300',
    'text-teal-300',
    'text-indigo-300',
    'text-yellow-300',
  ],

  bg: {
    page: 'bg-black/90',
    /* CAVEAT: `card` and `navbar` carry a border and shadow too — the light theme
       needs them and the dark theme does not, so they ride along here rather than
       forcing every call site to branch. */
    card: 'bg-slate-950/80',
    cardSolid: 'bg-slate-950',
    cardHover: 'bg-slate-900/90',
    cardElevated: 'bg-slate-900/80',
    cardMuted: 'bg-slate-900/70',
    flipCard: 'bg-slate-950/[0.985]',
    panel: 'bg-slate-950/90',
    secondary: 'bg-indigo-950/50',
    navbar: 'bg-black/90',
    backdrop: 'bg-slate-950/90',
    /* Hueless chip fill, for badges that must not take the accent. Each theme
       uses its own neutral family — slate here, warm stone in light — so the
       chip vanishes into whichever ground it is drawn on. */
    neutral: 'bg-slate-400/10',
  },

  text: {
    primary: 'text-slate-200',
    secondary: 'text-slate-100',
    muted: 'text-slate-300',
    subtle: 'text-slate-400',
    dim: 'text-slate-500',
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
    /* The gold placement badge on /more. Reads as a medal, so it stays gold in
       both themes rather than following the palette. */
    rank: {
      box: 'border-amber-300 bg-amber-400',
      event: 'text-amber-900/80',
      placement: 'text-amber-950',
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

  gradient: {
    primary: 'bg-gradient-to-br from-slate-900 via-violet-950/30 to-slate-900',
    divider: 'bg-gradient-to-r from-yellow-800 via-orange-300 to-yellow-800',
    sectionLine: 'bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500',
    yellow: 'bg-gradient-to-br from-amber-900/60 via-yellow-950/40 to-amber-950/60',
  },

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

  hover: {
    scale: 'hover:scale-110',
    scaleSmall: 'hover:scale-105',
    translateUpMedium: 'hover:-translate-y-2',
    shadowLarge: 'hover:shadow-2xl',
    bgSecondary: 'hover:bg-slate-500/20',
  },

  sectionHeader: 'text-slate-200',

  /* Card palettes, indexed by position — the cycle is the point, so entries are
     one line each to keep the ramp readable top to bottom. */
  experienceThemes: [
    { accent: 'from-white via-slate-200 to-slate-400', border: 'border-slate-300/30 hover:shadow-slate-300/20', badge: 'bg-slate-200/10 border-slate-300/30 text-slate-100', title: 'from-white via-slate-100 to-white', role: 'text-slate-200', divider: 'border-slate-400/25', glow: 'from-slate-200/10' },
    { accent: 'from-slate-100 via-slate-300 to-slate-500', border: 'border-slate-400/30 hover:shadow-slate-400/20', badge: 'bg-slate-300/10 border-slate-400/30 text-slate-100', title: 'from-slate-50 via-white to-slate-200', role: 'text-slate-300', divider: 'border-slate-400/25', glow: 'from-slate-300/10' },
    { accent: 'from-slate-200 via-slate-400 to-slate-600', border: 'border-slate-400/30 hover:shadow-slate-400/20', badge: 'bg-slate-300/10 border-slate-400/30 text-slate-200', title: 'from-white via-slate-200 to-slate-100', role: 'text-slate-300', divider: 'border-slate-500/25', glow: 'from-slate-400/10' },
    { accent: 'from-slate-300 via-slate-500 to-slate-700', border: 'border-slate-500/30 hover:shadow-slate-500/20', badge: 'bg-slate-400/10 border-slate-500/30 text-slate-200', title: 'from-slate-100 via-white to-slate-300', role: 'text-slate-400', divider: 'border-slate-500/25', glow: 'from-slate-500/10' },
    { accent: 'from-slate-200 via-slate-300 to-slate-500', border: 'border-slate-300/30 hover:shadow-slate-300/20', badge: 'bg-slate-200/10 border-slate-300/30 text-slate-100', title: 'from-white via-slate-100 to-slate-200', role: 'text-slate-300', divider: 'border-slate-400/25', glow: 'from-slate-200/10' },
  ],
};

export type Theme = typeof darkTheme;

/** The light half. Four families, and nothing outside them:
 *
 *    ground   white / stone-50    the page and every surface on it
 *    ink      stone-500…950       warm greys; grey without the office-blue cast
 *    accent   orange-600/700      terracotta, the one colour that means "this"
 *    seconds  amber (honey) and teal — pops, never structure
 *
 *  Colour is rationed on purpose. It marks ONE thing per surface: the accent
 *  rule on a card, or the hue of a tech name. Fills stay hueless — a coloured
 *  chip under coloured text is what made the stacks look dirty.
 *
 *  The ground is white and stays white: tinted surfaces dulled the accents and
 *  fought the ink. Colour arrives as a translucent wash OVER white — `/10` on an
 *  accent rather than a `-50` fill — which is why it stays clean at any density.
 *  Neutrals are stone, not slate: on white the warmth is barely perceptible, but
 *  it is what keeps the greys from reading corporate.
 *
 *  Every text value below clears 4.5:1 on white except `dim`, which is
 *  decorative only. CAVEAT: amber-600 and lighter are ~3:1 — never text.
 */
const lightTheme: Theme = {
  /* Same ten hues as dark, in the same order, so a badge keeps its identity
     across a theme toggle — getTechColor hashes to an index, not to a colour. */
  techColors: [
    'text-cyan-700',
    'text-emerald-700',
    'text-amber-700',
    'text-violet-700',
    'text-sky-700',
    'text-lime-700',
    'text-orange-700',
    'text-teal-700',
    'text-indigo-700',
    'text-yellow-700',
  ],

  bg: {
    page: 'bg-white/90',
    card: 'bg-white border border-stone-200 shadow-md',
    cardSolid: 'bg-white',
    /* CAVEAT: not a hover state — ProjectCard uses it as the letterbox behind
       the screenshot and as the icon-chip fill, both of which sit under ink. */
    cardHover: 'bg-stone-100',
    cardElevated: 'bg-stone-50',
    cardMuted: 'bg-stone-50/70',
    flipCard: 'bg-white/[0.985]',
    panel: 'bg-white/95',
    secondary: 'bg-stone-100/70',
    navbar: 'bg-white/95 border-b border-stone-200 shadow-sm',
    backdrop: 'bg-white/98',
    neutral: 'bg-stone-500/10',
  },

  text: {
    primary: 'text-stone-800',
    secondary: 'text-stone-900',
    muted: 'text-stone-700',
    subtle: 'text-stone-600',
    dim: 'text-stone-500',
    strong: 'text-stone-950',
  },

  border: {
    default: 'border-stone-300',
    tertiary: 'border-stone-200',
    accent: 'border-orange-600',
    light: 'border-stone-200',
    hover: 'border-orange-600',
    divider: 'border-stone-300',
  },

  status: {
    completed: {
      border: 'border-emerald-600',
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
    },
    /* Honey rather than orange: in-progress is a status, and it must not be
       mistaken for the terracotta accent. */
    inProgress: {
      border: 'border-amber-500',
      bg: 'bg-amber-50',
      text: 'text-amber-800',
    },
    rank: {
      box: 'border-amber-300 bg-amber-400',
      event: 'text-amber-900/80',
      placement: 'text-amber-950',
    },
  },

  filter: {
    active: {
      bg: 'bg-orange-700',
      text: 'text-white',
    },
  },

  nav: {
    inactive: 'text-stone-600 hover:text-stone-900 hover:bg-orange-500/10',
  },

  lichess: {
    rating: 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500',
    perfType: 'text-emerald-800',
    link: 'text-emerald-700 hover:text-emerald-900',
    error: 'text-rose-700',
    loading: 'text-emerald-700',
  },

  accent: {
    cyan: {
      border: 'border-teal-600/40',
      text: 'text-teal-700',
      hover: {
        border: 'hover:border-teal-600',
      },
    },
    indigo: {
      bg: 'bg-white',
      border: 'border-stone-300',
      text: 'text-orange-700',
      glow: 'shadow-orange-200/60',
      hover: {
        border: 'hover:border-orange-600',
        bg: 'hover:bg-orange-500/10',
      },
    },
    orange: {
      text: 'text-orange-700',
    },
    yellow: {
      border: 'border-amber-400',
      text: 'text-amber-800',
      glow: 'bg-amber-300/40',
      hover: {
        border: 'hover:border-amber-500',
        bg: 'hover:bg-amber-400/15',
      },
    },
    purple: {
      shadow: 'shadow-violet-300/40',
    },
  },

  gradient: {
    primary: 'bg-gradient-to-br from-white via-stone-50 to-white',
    divider: 'bg-gradient-to-r from-orange-600 via-amber-500 to-teal-600',
    sectionLine: 'bg-gradient-to-r from-orange-600 to-amber-500',
    yellow: 'bg-gradient-to-br from-amber-50 via-white to-stone-50',
  },

  carousel: {
    arrow: {
      bg: 'bg-white',
      border: 'border-stone-300',
      hoverBg: 'hover:bg-orange-500/10',
      hoverBorder: 'hover:border-orange-600',
      icon: 'text-stone-700',
    },
    dot: {
      active: 'bg-orange-600',
      inactive: 'bg-stone-300',
      hover: 'hover:bg-amber-500',
    },
  },

  hover: {
    scale: 'hover:scale-110',
    scaleSmall: 'hover:scale-105',
    translateUpMedium: 'hover:-translate-y-3',
    shadowLarge: 'hover:shadow-2xl',
    bgSecondary: 'hover:bg-stone-100',
  },

  sectionHeader: 'text-stone-900',

  /* Neutral by design, like the dark ramp — the credentials should not compete
     with the work below them. Stone, not slate: warm greys on white. */
  experienceThemes: [
    { accent: 'from-stone-400 via-stone-500 to-stone-700', border: 'border-stone-300 hover:shadow-xl hover:shadow-stone-300/40', badge: 'bg-stone-100 border-stone-300 text-stone-800', title: 'from-stone-900 via-stone-700 to-stone-900', role: 'text-stone-600', divider: 'border-stone-200', glow: 'from-stone-200' },
    { accent: 'from-stone-500 via-stone-600 to-stone-800', border: 'border-stone-400 hover:shadow-xl hover:shadow-stone-400/40', badge: 'bg-stone-100 border-stone-400 text-stone-900', title: 'from-stone-900 via-stone-800 to-stone-900', role: 'text-stone-700', divider: 'border-stone-300', glow: 'from-stone-300' },
    { accent: 'from-stone-400 via-stone-600 to-stone-800', border: 'border-stone-300 hover:shadow-xl hover:shadow-stone-300/40', badge: 'bg-stone-100 border-stone-300 text-stone-800', title: 'from-stone-800 via-stone-900 to-stone-800', role: 'text-stone-600', divider: 'border-stone-200', glow: 'from-stone-200' },
    { accent: 'from-stone-500 via-stone-700 to-stone-900', border: 'border-stone-400 hover:shadow-xl hover:shadow-stone-400/40', badge: 'bg-stone-100 border-stone-400 text-stone-900', title: 'from-stone-900 via-stone-700 to-stone-900', role: 'text-stone-700', divider: 'border-stone-300', glow: 'from-stone-300' },
    { accent: 'from-stone-300 via-stone-500 to-stone-700', border: 'border-stone-300 hover:shadow-xl hover:shadow-stone-300/40', badge: 'bg-stone-100 border-stone-300 text-stone-800', title: 'from-stone-800 via-stone-900 to-stone-700', role: 'text-stone-600', divider: 'border-stone-200', glow: 'from-stone-200' },
  ],
};



// [HARDCODED]
/** Per-index accent ramp for the /more leadership cards. Theme-independent — these
    read on both grounds — so unlike experienceThemes it is a single list. */
export const leadershipAccents = [
  { bar: 'from-orange-500 via-orange-400 to-orange-500', edge: 'hover:border-orange-400/60', rule: 'decoration-orange-400/60 hover:decoration-orange-300', icon: 'text-orange-400/70' },
  { bar: 'from-red-800 via-red-700 to-red-800', edge: 'hover:border-red-400/60', rule: 'decoration-red-400/60 hover:decoration-red-300', icon: 'text-red-400/70' },
  { bar: 'from-sky-300 via-blue-500 to-indigo-600', edge: 'hover:border-blue-400/60', rule: 'decoration-blue-400/60 hover:decoration-blue-300', icon: 'text-blue-400/70' },
];

/** The frame every inlined document gets. Presentation rather than content, so
    it lives here and not beside the resume's url — and it is one size in both
    themes, which is why it sits outside the two palettes. */
export const embedFrame = 'h-[900px] w-full';

/** Icon colours for the toggle itself — it draws the theme it switches *to*, so it
    cannot read from `theme` like everything else. */
export const themeToggle = {
  sun: 'text-amber-500',
  moon: 'text-stone-800',
};

export const theme = derived(darkModeStore, ($isDarkMode) => ($isDarkMode ? darkTheme : lightTheme));



// export const techColors = [
//   "text-blue-300",
//   "text-blue-400",
//   "text-cyan-300",
//   "text-cyan-400",
//   "text-teal-300",
//   "text-emerald-300",
//   "text-emerald-400",
//   "text-green-300",
//   "text-green-400",
//   "text-lime-300",
//   "text-yellow-300",
//   "text-yellow-400",
//   "text-amber-300",
//   "text-orange-300",
//   "text-orange-400",
//   "text-red-300",
//   "text-rose-300",
//   "text-pink-300",
//   "text-pink-400",
//   "text-purple-300",
//   "text-purple-400",
//   "text-violet-300",
//   "text-violet-400",
//   "text-indigo-300",
//   "text-indigo-400",
//   "text-sky-300",
//   "text-slate-300",
//   "text-slate-400",
// ] as const;

// export const complexityClasses = {
//   Beginner: "text-slate-400 bg-slate-500/10 border border-slate-500/20",
//   Intermediate: "text-amber-300 bg-amber-500/10 border border-amber-400/20",
//   Advanced: "text-rose-300 bg-rose-500/10 border border-rose-400/20",
// } as const;
