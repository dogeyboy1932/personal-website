<!-- FX: side-rays — volumetric light blades fanning across a section. — CAVEAT: `overlay` puts this
     at z-index 30, ON TOP of content. -->
<script lang="ts">
  import { browser } from "$app/environment";
  import { darkModeStore } from "../../lib/stores";
  import { tokens, channels } from "../../lib/tokens";

  export let side: "left" | "right" | "both" = "left";
  export let count = 9;
  export let opacity = 0.42;
  export let speed = 12;
  export let spread = 72;
    /** Multiplier on every blade's width. */
  export let widthScale = 1;
  export let hue: "warm" | "cool" = "warm";
    /** Paint the rays ABOVE the page content instead of behind it. */
  export let overlay = false;
  let klass = "";
  export { klass as class };

  $: isDark = $darkModeStore;

  /* Colour from tokens: --rays for the brand hue, --warm for the logo hue. */
  $: rayColor = channels($tokens, hue === "warm" ? "warm" : "rays");

  // Light mode needs less punch — the page ground is amber-50, not black.
  $: peak = isDark ? opacity : opacity * 0.45;

  const sides = (s: typeof side) => (s === "both" ? ["left", "right"] : [s]);

    /* Overlay mode composites over live content, so each extra blade costs real frames — unlike the
     behind-content case, where the static backdrop is cached.
     Capped at 4; the original 9 measured a ~30fps drop on the landing page. */
  $: effectiveCount = overlay ? Math.min(count, 4) : count;

    /** Blades fan out across `spread` degrees, centred on the edge's diagonal. */
  /* NOTE: reads `widthScale` and `speed`, so any reactive statement calling it
     re-runs when those change. */
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
        /* Match whatever rounding the host has. */
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

  /* Anchor point the blades rotate around: just off the top corner, so the fan
     sweeps down and across the hero the way a window light would. */
    /* Origin sits inboard of the edge so the fan reads as light crossing the section rather than a
     stain in the corner — but not so far in that it lands mid-page. */
  .fx-rays-origin {
    position: absolute;
    top: 18%;
    left: 18%;
    width: 0;
    height: 0;
  }
  /* Right-mounted fan sits close to the edge. At 18% inboard the origin fell
     behind the hero photo, which is opaque, and the rays were invisible. */
  .fx-rays-origin.from-right {
    left: auto;
    right: 3%;
  }

  .fx-ray {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--ray-width);
    /* Long enough to cross the section at any angle. */
    height: 190vh;
        /* Base rotation is a variable so one keyframe set serves both edges — hardcoding it here would
       be overridden by the animation's transform. */
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

  /* Mirror the fan when it originates from the right edge. */
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
