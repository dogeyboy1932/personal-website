// adapter-netlify (not adapter-auto): the Lichess challenge endpoint needs a
// real server function to hold LICHESS_TOKEN, which adapter-auto cannot
// guarantee. Pinned to v2 — v6 requires SvelteKit 2 and this project is on 1.30.
import adapter from "@sveltejs/adapter-netlify";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    prerender: {
      /*
        NOTE: this is currently INERT. Nothing sets `export const prerender =
        true` and SvelteKit 1's default is false, so every page is rendered on
        demand by the Netlify function and no HTML is emitted at build time.
        Verified: `find build -name '*.html'` returns nothing.

        The entries are listed anyway because `"*"` only crawls outward from
        LINKED pages. /pictures and /writings are deliberately absent from the
        navbar (updates.txt: "leave the route outside the navbar but still
        active"), so nothing links to them and a crawl would never reach them.
        The moment prerendering is switched on, these two would silently drop
        out of the build without this line.
      */
      entries: ["*", "/pictures", "/writings"],
    },
  },
};

export default config;
