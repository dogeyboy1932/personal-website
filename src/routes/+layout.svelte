<script lang="ts">
  import MatrixRain from "../lib/MatrixRain.svelte";
  import { NavigationBar } from "../components/NavigationBar";
  import { fonts } from "../constants/fonts";

  import "../styles.css";
  import { fade, fly } from "svelte/transition";
</script>

<MatrixRain />

<div class="min-h-screen relative">
  <div
    class="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10"
  />
  <NavigationBar />
  <main
    class={`relative z-10 mx-auto w-[85%] sm:w-[98%] max-w-[1400px] px-6 sm:px-10 pt-5 pb-24 ${fonts.primary}`}
  >
    <div in:fly={{ y: 8, duration: 350 }}
      class="rounded-xl border border-emerald-500/20 bg-slate-200/70 p-6 shadow-2xl backdrop-blur dark:border-emerald-500/30 dark:bg-slate-800/80"
    >
      <div in:fade={{ duration: 250 }}>
        <slot />
      </div>
    </div>
  </main>
</div>

<style lang="postcss">
  :global(body) {
    @apply bg-slate-100 dark:bg-slate-950;
  }
</style>
