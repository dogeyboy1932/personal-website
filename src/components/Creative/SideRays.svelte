<!-- FX: side-rays — volumetric light blades fanning across a section. — CAVEAT: `overlay` puts this
     at z-index 30, ON TOP of content. -->
<script lang="ts">
  import { darkModeStore } from "../../constants/_theme";
  import { tokens, channels } from "../../constants/_tokens";

  export let side: "left" | "right" | "both" = "left";
  export let count = 9;
  export let opacity = 0.42;
  export let speed = 12;
  export let spread = 72;
  export let widthScale = 1;
  export let hue: "warm" | "cool" = "warm";
  export let overlay = false;
  let klass = "";
  export { klass as class };

  $: isDark = $darkModeStore;

  $: rayColor = channels($tokens, hue === "warm" ? "warm" : "rays");

  $: peak = isDark ? opacity : opacity * 0.45;

  const sides = (s: typeof side) => (s === "both" ? ["left", "right"] : [s]);

    /* Overlay mode composites over live content, so each extra blade costs real frames — unlike the
     behind-content case, where the static backdrop is cached.
     Capped at 4; the original 9 measured a ~30fps drop on the landing page. */
  $: effectiveCount = overlay ? Math.min(count, 4) : count;

  function blades(n: number, deg: number) {
    return Array.from({ length: n }, (_, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      return {
        angle: -deg / 2 + t * deg,
        width: (5 + ((i * 37) % 55) / 10) * widthScale, // 5-10.5vw * scale, deterministic so SSR matches
        delay: -((i * 1.7) % speed),        // negative = already mid-cycle on load
        duration: speed + ((i * 3) % 7),
        strength: 0.45 + ((i * 13) % 55) / 100,
      };
    });
  }
</script>

<div class="fx-side-rays {klass}" class:is-overlay={overlay} aria-hidden="true">
  {#each sides(side) as edge}
    <div class="fx-rays-origin" class:from-right={edge === "right"}>
      {#each blades(effectiveCount, spread) as blade}
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
    border-radius: inherit;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

    /* Above the content.
     As an OVERLAY over two live canvases, a blend mode forces the whole stack to be re-blended
     every frame: measured 19fps with it, 57 without. */
  .is-overlay {
    z-index: 30;
  }

  .fx-rays-origin {
    position: absolute;
    top: 18%;
    left: 18%;
    width: 0;
    height: 0;
  }
  .fx-rays-origin.from-right {
    left: auto;
    right: 3%;
  }

  .fx-ray {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--ray-width);
    height: 190vh;
    --ray-base: 82deg;
    transform-origin: 50% 0;
    transform: rotate(calc(var(--ray-base) + var(--ray-angle)));
    background: linear-gradient(
      to bottom,
      rgba(var(--ray-color), calc(var(--ray-opacity) * 0.7)) 0%,
      rgba(var(--ray-color), var(--ray-opacity)) 18%,
      rgba(var(--ray-color), calc(var(--ray-opacity) * 0.6)) 55%,
      rgba(var(--ray-color), 0) 95%
    );
    filter: blur(13px);
    opacity: 0;
    animation: fx-ray-drift var(--ray-duration) ease-in-out var(--ray-delay) infinite;
    will-change: opacity;
  }

  .from-right .fx-ray {
    --ray-base: 82deg;
  }

    /* Deliberately animates ONLY opacity and rotation. */
  @keyframes fx-ray-drift {
    0%,
    100% {
      opacity: 0.4;
      transform: rotate(calc(var(--ray-base) + var(--ray-angle)));
    }
    50% {
      opacity: 1;
      transform: rotate(calc(var(--ray-base) + var(--ray-angle) + 6deg));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-side-rays {
      display: none;
    }
  }
</style>
