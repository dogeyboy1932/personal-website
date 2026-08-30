import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /*
          Token-backed colours. Defined in src/styles/tokens.css as space-
          separated RGB channels, which is what makes <alpha-value> work — so
          `text-brand`, `bg-brand/10` and `border-brand/30` all come from one
          custom property. Recolour the site by editing that file, not here.
        */
        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          strong: "rgb(var(--brand-strong) / <alpha-value>)",
          deep: "rgb(var(--brand-deep) / <alpha-value>)",
          soft: "rgb(var(--brand-soft) / <alpha-value>)",
        },
        warm: {
          DEFAULT: "rgb(var(--warm) / <alpha-value>)",
          strong: "rgb(var(--warm-strong) / <alpha-value>)",
          deep: "rgb(var(--warm-deep) / <alpha-value>)",
        },
        /* The /more one-liner + scorecard figures. Its own token so that pair
           can be recoloured without touching brand or warm. */
        lede: "rgb(var(--lede) / <alpha-value>)",
        ok: "rgb(var(--ok) / <alpha-value>)",
        bad: "rgb(var(--bad) / <alpha-value>)",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cyberpunk theme colors
        cyber: {
          primary: "#00ff9f",
          secondary: "#00b8ff",
          accent: "#ff00ff",
          danger: "#ff0055",
          warning: "#ffb300",
          dark: "#0a0a0a",
          light: "#f0f0f0",
          gray: {
            100: "#f5f5f5",
            200: "#e5e5e5",
            300: "#d4d4d4",
            400: "#a3a3a3",
            500: "#737373",
            600: "#525252",
            700: "#404040",
            800: "#262626",
            900: "#171717",
          },
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "Monaco", "monospace"],
        // NAVBAR ONLY. "the font for the navbar options is a little more
        // robotic...make it more 'comicy'. Just the navbar." Kept as its own
        // family rather than folded into `display` so it cannot leak elsewhere.
        nav: ["Fredoka", "Chivo", "Inter", "sans-serif"],
        // Chivo is the display face everywhere structural — headings, section
        // labels, nav, badges, stat numbers — via `font-display`. Body copy
        // stays Inter: Chivo is a display grotesque and long paragraphs get
        // noticeably harder to read in it.
        // Chivo picked from the /fonts-lab sampler: highest contrast of the
        // candidates at hero size. Space Grotesk stays as the first fallback so
        // the layout doesn't shift if Chivo fails to load.
        display: ["Chivo", "Space Grotesk", "Inter", "sans-serif"],
        cyber: ["Space Grotesk", "Inter", "sans-serif"],
        // "I want a better font...less robotic. More casual." Nunito: rounded
        // terminals and a high x-height, which is what reads as friendly rather
        // than corporate. Same reason Fredoka won the navbar. Used on the
        // clubs and leadership blocks via `font-casual`; NOT site-wide, because
        // Inter still carries the long-form copy better.
        casual: ["Nunito", "Plus Jakarta Sans", "Inter", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "text-shimmer": {
          "0%": {
            "background-position": "0% 50%",
          },
          "100%": {
            "background-position": "100% 50%",
          },
        },
        "cyber-glitch": {
          "0%, 100%": { transform: "translate(0)" },
          "33%": { transform: "translate(-5px, 2px)" },
          "66%": { transform: "translate(5px, -2px)" },
        },
        "neon-pulse": {
          "0%, 100%": {
            textShadow: "0 0 5px #00ff9f, 0 0 10px #00ff9f, 0 0 20px #00ff9f",
          },
          "50%": {
            textShadow: "0 0 10px #00ff9f, 0 0 20px #00ff9f, 0 0 40px #00ff9f",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: "gradient 8s ease infinite",
        "text-shimmer": "text-shimmer 2s linear infinite",
        "cyber-glitch": "cyber-glitch 2s infinite",
        "neon-pulse": "neon-pulse 2s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  corePlugins: {
    preflight: true,
  },
};
