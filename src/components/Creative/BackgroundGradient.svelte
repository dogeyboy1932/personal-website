<script lang="ts">
  import { browser } from "$app/environment";
  import { darkModeStore } from "../../lib/stores";
  import { tokens, css, type TokenName } from "../../lib/tokens";

  export let radius = "0.75rem";
  export let spread = 3;
  export let blur = 14;
  export let speed = 7;
  export let idle = 0.35;
  export let active = 1;
  export let palette: "aurora" | "warm" | "violet" | "silver" = "aurora";
  let klass = "";
  export { klass as class };

  $: isDark = $darkModeStore;

  const paletteOrder: Record<string, TokenName[]> = {
    aurora: ["halo-1", "halo-2", "halo-3"],
    violet: ["halo-3", "halo-2", "halo-1"],
    warm: ["warm", "halo-3", "halo-1"],
        /* For cards that must read as white/silver — the halo is the widest-reaching colour on a card,
       so a silver card inside an aurora or violet halo still reads as tinted. */
    silver: ["halo-silver-1", "halo-silver-2", "halo-silver-3"],
  };

  $: names = paletteOrder[palette] ?? paletteOrder.aurora;
  $: stops = names.map((n) => css($tokens, n)).join(", ");
  $: edge = css($tokens, names[0]);
</script>

<div
  class="fx-background-gradient {klass}"
  style="
    --bgg-radius: {radius};
    --bgg-spread: {spread}px;
    --bgg-blur: {blur}px;
    --bgg-speed: {speed}s;
    --bgg-idle: {idle};
    --bgg-active: {active};
    --bgg-stops: {stops};
    --bgg-edge: {edge};
  "
>
  <span class="fx-bgg-glow" aria-hidden="true"><span class="fx-bgg-drift" /></span>
  <div class="fx-bgg-content"><slot /></div>
</div>

<style>
  .fx-background-gradient {
    position: relative;
    border-radius: var(--bgg-radius);
  }

  .fx-bgg-glow {
    position: absolute;
    inset: calc(var(--bgg-spread) * -1);
    z-index: 0;
    border-radius: calc(var(--bgg-radius) + var(--bgg-spread));
    overflow: hidden;
    opacity: var(--bgg-idle);
    transition: opacity 350ms ease;
    pointer-events: none;
  }

  .fx-bgg-drift {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      ellipse closest-side at 50% 50%,
      transparent 0%,
      transparent 72%,
      var(--bgg-edge) 100%
    );
    filter: blur(var(--bgg-blur));
    /* Opacity only. Opacity is composited, so the baked blur is never
       re-rasterised; anything that changed the layer's SIZE would be. */
    animation: fx-bgg-drift var(--bgg-speed) ease-in-out infinite;
        /* Deliberately NO `will-change` here.
       With seven cards on screen it cost ~30fps versus letting the browser rasterise once and cache
       on its own terms. */
  }

  .fx-background-gradient:hover .fx-bgg-glow,
  .fx-background-gradient:focus-within .fx-bgg-glow {
    opacity: var(--bgg-active);
  }

  .fx-bgg-content {
    position: relative;
    z-index: 1;
    height: 100%;
    border-radius: inherit;
  }

  @keyframes fx-bgg-drift {
    0%,
    100% {
      opacity: 0.85;
    }
    50% {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-bgg-glow {
      transition: none;
    }
    .fx-bgg-drift {
      animation: none;
    }
  }
</style>
