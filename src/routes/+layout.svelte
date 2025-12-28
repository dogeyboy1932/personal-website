<script lang="ts">
  import MatrixRain from "../lib/MatrixRain.svelte";
  import { NavigationBar } from "../components/NavigationBar";

  import "@fontsource/plus-jakarta-sans";
  import "../styles.css";
  import { fade, fly } from "svelte/transition";

  import { lastUpdated } from "../constants/";
  import { screenWidth, theme } from "../lib/stores";

  export const fonts = {
    primary: "font-sans", // Inter for body text
    secondary: "font-display", // Space Grotesk for headings
    fun: "font-mono", // JetBrains Mono for code/accents
    options: [
      { id: "inter", label: "Inter (clean)", class: "font-sans" },
      { id: "display", label: "Space Grotesk (display)", class: "font-display" },
      { id: "mono", label: "JetBrains Mono (coder)", class: "font-mono" },
    ],
  };

</script>

<svelte:window bind:innerWidth={$screenWidth} />

<MatrixRain />

<div class="min-h-screen relative">
  <div
    class="pointer-events-none absolute inset-0"
  />
    <NavigationBar />
    <main
      class={`relative z-10 w-full px-4 md:px-8 ${fonts.primary}`}
    >
      <div in:fly={{ y: 6, duration: 350 }}
        class="max-w-[1600px] mx-auto rounded-b-xl border {$theme.border.default} {$theme.bg.page} p-3 shadow-2xl backdrop-blur {$theme.border.light}"
      >
        <div in:fade={{ duration: 250 }}>
          <slot />
        </div>
        <div class="flex flex-row justify-between text-[10px] uppercase {$theme.text.muted} mt-10">
          <span class="tracking-[0.2em]">© 2025 Akhil Gogineni. All rights reserved.</span>
          <span class="tracking-[0.3em]">Last updated: {lastUpdated}</span>
        </div>
      </div>
    </main>
  </div>

<style lang="postcss">
  :global(html.dark body) {
    @apply bg-slate-950;
  }
  :global(html:not(.dark) body) {
    @apply bg-amber-50;
  }
  :global(body) {
    @apply transition-colors duration-300;
  }
</style>
