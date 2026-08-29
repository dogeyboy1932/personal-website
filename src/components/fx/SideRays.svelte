<!--
  FX: side-rays
  Source: https://reactbits.dev/backgrounds/side-rays (React) — reimplemented in Svelte

  Volumetric light rays fanning in from one edge, drifting and breathing. Pure
  CSS: a stack of skewed, blurred gradient blades with staggered animations, so
  there is no canvas and no rAF competing with MatrixRain's loop.

  Used by: src/routes/+page.svelte (landing hero)

  Per the brief, this pairs with a reduced MatrixRain opacity — the rays sit in
  front, and the rain reads as "a faint glimmer" behind them rather than a
  competing full-strength layer. That opacity lives on the canvas in
  src/lib/MatrixRain.svelte, tagged FX:side-rays.

  Tunables:
    side       "left" | "right" | "both"    which edge the rays fan from  default "left"
    count      number of blades              default 7
    opacity    peak blade opacity            default 0.5
    speed      seconds per drift cycle       default 12
    spread     degrees of fan across blades  default 42
    hue        "warm" (amber, matches logo) | "cool" (blue, matches rain)

  Purely decorative: aria-hidden, pointer-events:none, sits behind content.
  Fades out entirely under prefers-reduced-motion rather than sitting static.
-->
<script lang="ts">
  import { darkModeStore } from "../../lib/stores";

  export let side: "left" | "right" | "both" = "left";
  export let count = 7;
  export let opacity = 0.5;
  export let speed = 12;
  export let spread = 42;
  export let hue: "warm" | "cool" = "warm";
  let klass = "";
  export { klass as class };

  $: isDark = $darkModeStore;

  // Warm matches the logo/name ramp; cool matches the matrix rain underneath.
  $: rayColor =
    hue === "warm"
      ? isDark
        ? "255, 176, 60"
        : "217, 119, 6"
      : isDark
      ? "56, 160, 255"
      : "37, 99, 235";

  // Light mode needs less punch — the page ground is amber-50, not black.
  $: peak = isDark ? opacity : opacity * 0.45;

  const sides = (s: typeof side) => (s === "both" ? ["left", "right"] : [s]);

  /**
   * Blades fan out across `spread` degrees, centred on the edge's diagonal.
   * Each gets its own width, delay and duration so the group never pulses in
   * lockstep.
   */
  function blades(n: number, deg: number) {
    return Array.from({ length: n }, (_, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      return {
        angle: -deg / 2 + t * deg,
        width: 4 + ((i * 37) % 9),          // 4-12vw, deterministic so SSR matches
        delay: -((i * 1.7) % speed),        // negative = already mid-cycle on load
        duration: speed + ((i * 3) % 7),
        strength: 0.45 + ((i * 13) % 55) / 100,
      };
    });
  }
</script>

<div class="fx-side-rays {klass}" aria-hidden="true">
  {#each sides(side) as edge}
    <div class="fx-rays-origin" class:from-right={edge === "right"}>
      {#each blades(count, spread) as blade}
        <span
          class="fx-ray"
          style="
            --ray-angle: {blade.angle}deg;
            --ray-width: {blade.width}vw;
            --ray-delay: {blade.delay}s;
            --ray-duration: {blade.duration}s;
            --ray-opacity: {peak * blade.strength};
            --ray-color: {rayColor};
          "
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  .fx-side-rays {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  /* Anchor point the blades rotate around: just off the top corner, so the fan
     sweeps down and across the hero the way a window light would. */
  .fx-rays-origin {
    position: absolute;
    top: -12%;
    left: -6%;
    width: 0;
    height: 0;
  }
  .fx-rays-origin.from-right {
    left: auto;
    right: -6%;
  }

  .fx-ray {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--ray-width);
    /* Long enough to cross the section at any angle. */
    height: 190vh;
    /* Base rotation is a variable so one keyframe set serves both edges —
       hardcoding it here would be overridden by the animation's transform. */
    --ray-base: 150deg;
    transform-origin: 50% 0;
    transform: rotate(calc(var(--ray-base) + var(--ray-angle)));
    background: linear-gradient(
      to bottom,
      rgba(var(--ray-color), var(--ray-opacity)) 0%,
      rgba(var(--ray-color), calc(var(--ray-opacity) * 0.45)) 35%,
      rgba(var(--ray-color), 0) 78%
    );
    filter: blur(28px);
    opacity: 0;
    animation: fx-ray-drift var(--ray-duration) ease-in-out var(--ray-delay) infinite;
    will-change: opacity, transform;
  }

  /* Mirror the fan when it originates from the right edge. */
  .from-right .fx-ray {
    --ray-base: 210deg;
  }

  @keyframes fx-ray-drift {
    0%,
    100% {
      opacity: 0.25;
      transform: rotate(calc(var(--ray-base) + var(--ray-angle))) scaleX(0.9);
    }
    50% {
      opacity: 1;
      transform: rotate(calc(var(--ray-base) + var(--ray-angle) + 4deg)) scaleX(1.15);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-side-rays {
      display: none;
    }
  }
</style>
