import adapter from "@sveltejs/adapter-auto";
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
        "*" only crawls outward from pages that are actually linked. /pictures
        and /writings are deliberately absent from the navbar (updates.txt:
        "leave the route outside the navbar but still active"), so nothing
        links to them and the crawler would never find them — they'd 404 on the
        built site. Listing them explicitly is what keeps them live.
      */
      entries: ["*", "/pictures", "/writings"],
    },
  },
};

export default config;
