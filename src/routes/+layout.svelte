<script lang="ts">
  import MatrixRain from "../lib/MatrixRain.svelte";
  import { NavigationBar } from "../components/NavigationBar";

  import "../styles.css";
  import { fade, fly } from "svelte/transition";

  export const fonts = {
    primary: "font-cyber", // primary display (futuristic)
    secondary: "font-sans", // body copy
    fun: "font-mono", // playful/monospace for accents
    options: [
      { id: "cyber", label: "Orbitron (futuristic)", class: "font-cyber" },
      { id: "inter", label: "Inter (clean)", class: "font-sans" },
      { id: "mono", label: "JetBrains Mono (coder)", class: "font-mono" },
      { id: "fun", label: "Orbitron + Mono (display)", class: "font-cyber font-mono" },
    ],
  };

</script>

<MatrixRain />

<div class="min-h-screen relative">
  <div
    class="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-500/10 via-transparent to-cyan-500/10"
  />
    <NavigationBar />
    <main
      class={`relative z-10 w-full px-4 md:px-8 ${fonts.primary}`}
    >
      <div in:fly={{ y: 6, duration: 350 }}
        class="max-w-[1400px] mx-auto rounded-b-xl border border-slate-500/20 bg-black p-4 shadow-2xl backdrop-blur border-slate-500/30"
      >
        <div in:fade={{ duration: 250 }}>
          <slot />
        </div>
      </div>
    </main>
  </div>

<style lang="postcss">
  :global(body) {
    @apply bg-slate-950;
  }
</style>
