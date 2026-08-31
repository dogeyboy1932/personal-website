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
          Token-backed colours. Defined in the TOKENS section of
          src/styles.css as space-separated RGB channels, which is what makes
          <alpha-value> work — so `text-brand`, `bg-brand/10` and
          `border-brand/30` all come from one custom property. Recolour the
          site by editing that file, not here.
        */
        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          strong: "rgb(var(--brand-strong) / <alpha-value>)",
        },
        warm: {
          DEFAULT: "rgb(var(--warm) / <alpha-value>)",
          deep: "rgb(var(--warm-deep) / <alpha-value>)",
        },
        /* The /more one-liner + scorecard figures. Its own token so that pair
           can be recoloured without touching brand or warm. */
        lede: "rgb(var(--lede) / <alpha-value>)",

        /* Only these two HSL vars survive; the rest of the shadcn set had no
           consumer once the .cyberpunk-* classes went. Site colour is
           token-backed above and in src/styles.css. */
        border: "hsl(var(--border))",
        foreground: "hsl(var(--foreground))",
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
        // "I want a better font...less robotic. More casual." Nunito: rounded
        // terminals and a high x-height, which is what reads as friendly rather
        // than corporate. Same reason Fredoka won the navbar. Used on the
        // clubs and leadership blocks via `font-casual`; NOT site-wide, because
        // Inter still carries the long-form copy better.
        casual: ["Nunito", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  corePlugins: {
    preflight: true,
  },
};
