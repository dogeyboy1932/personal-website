<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  import MatrixRain from "../lib/MatrixRain.svelte";
  import CursorParticles from "../lib/CursorParticles.svelte";

  import { NavigationBar } from "../components/NAVIGATIONBAR";
  
  import { screenWidth, displayWidth } from "../constants/_stores";
  import { theme } from "../constants/_theme";
  
  import { home } from "../constants";

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
      class="mx-auto max-w-[1600px] rounded-b-xl border px-3 shadow-2xl {$theme.border.default} {$theme.bg.page} {$theme.border.light}"
      in:fly={{ y: 6, duration: 350 }}
    >
      <div in:fade={{ duration: 250 }}>
        <slot />
      </div>

      <footer class="mt-10 flex flex-row justify-between text-[10px] uppercase {$theme.text.muted}">
        <span class="tracking-[0.2em]">© 2026 Akhil Gogineni. All rights reserved.</span>
        <span class="tracking-[0.3em]">Last updated: {home.lastUpdated}</span>
      </footer>
    </div>
  </main>
</div>
