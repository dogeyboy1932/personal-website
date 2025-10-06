<script lang="ts">
  import MatrixRain from "../animations/MatrixRain.svelte";
  import NavigationBar from "../sections/NavigationBar.svelte";
  import "../styles/mainpage.css";
  import "../styles.css";
  import { fade } from "svelte/transition";
</script>

<MatrixRain />

<div class="min-h-screen relative">
  <div
    class="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10"
  />
  <NavigationBar />
  <main
    class="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-10 pt-20 pb-24"
  >
    <div
      class="rounded-3xl border border-emerald-500/20 bg-slate-200/70 p-6 shadow-2xl backdrop-blur dark:border-emerald-500/30 dark:bg-slate-900/80"
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
