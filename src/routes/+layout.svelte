<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  import MatrixRain from "../lib/MatrixRain.svelte";
  import CursorParticles from "../lib/CursorParticles.svelte";
  import { NavigationBar } from "../components/NAVIGATIONBAR";
  import { screenWidth, displayWidth, theme } from "../lib/stores";
  import { lastUpdated } from "../constants";

  import "@fontsource/plus-jakarta-sans";
  import "../styles.css";

  onMount(() => {
    const sync = () => displayWidth.set(window.screen?.width || window.innerWidth);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  });
</script>

<svelte:window bind:innerWidth={$screenWidth} />

<MatrixRain />
<CursorParticles />

<div class="relative min-h-screen">
  <NavigationBar />

  <main class="relative z-10 w-full px-4 font-sans md:px-8">
    <!-- No backdrop-blur here: the panel is viewport-sized and MatrixRain animates behind it, so the
         blur could never be cached and was re-computed across the whole page every frame. -->
    <div
      class="mx-auto max-w-[1600px] rounded-b-xl border p-3 shadow-2xl {$theme.border.default} {$theme.bg.page} {$theme.border.light}"
      in:fly={{ y: 6, duration: 350 }}
    >
      <div in:fade={{ duration: 250 }}>
        <slot />
      </div>

      <footer class="mt-10 flex flex-row justify-between text-[10px] uppercase {$theme.text.muted}">
        <span class="tracking-[0.2em]">© 2025 Akhil Gogineni. All rights reserved.</span>
        <span class="tracking-[0.3em]">Last updated: {lastUpdated}</span>
      </footer>
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
