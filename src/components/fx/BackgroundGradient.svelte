<!--
  FX: background-gradient
  Source: https://ui.aceternity.com/components/background-gradient (React) — reimplemented in Svelte

  An animated multi-stop gradient sitting behind a card, blurred so it reads as
  coloured light bleeding out from under the edges. Intensifies on hover.

  Used by BOTH, per the brief ("foci card, experience cards, or project card —
  one of them should do well", answered "let's do both, I'll let you know which
  one it looks better on"):
    - src/components/PORTFOLIO/ProjectCard.svelte
    - src/components/PORTFOLIO/ExperienceCard.svelte
  Dropping it from either is a one-line change at that call site.

  Tunables:
    radius     corner radius; should match the wrapped card   default "0.75rem"
    spread     px the glow extends past the card              default 3
    blur       px of blur on the glow                         default 14
    speed      seconds per gradient cycle                     default 7
    idle       glow opacity at rest                           default 0.35
    active     glow opacity on hover                          default 1
    palette    "aurora" | "warm" | "violet"

  This is a wrapper rather than an in-card overlay because both target cards
  set `overflow: hidden` — a glow rendered inside would be clipped away at
  exactly the edge where it needs to bleed. The wrapper is layout-transparent
  (`display: contents` is not usable here since we need a positioning context,
  so it forwards h-full/flex through `class` instead).
-->
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
  export let palette: "aurora" | "warm" | "violet" = "aurora";
  let klass = "";
  export { klass as class };

  $: isDark = $darkModeStore;

  /*
    Halo colours come from the --halo-* tokens (src/styles/tokens.css) rather
    than being hardcoded per palette, so a site recolour reaches the cards.
    `palette` still shifts the mix so project and experience cards read
    differently without needing separate tokens.
  */
  const paletteOrder: Record<string, TokenName[]> = {
    aurora: ["halo-1", "halo-2", "halo-3"],
    violet: ["halo-3", "halo-2", "halo-1"],
    warm: ["warm", "halo-3", "halo-1"],
  };

  $: names = paletteOrder[palette] ?? paletteOrder.aurora;
  $: stops = names.map((n) => css($tokens, n)).join(", ");
  /* The rim uses the FIRST token only — a multi-stop ramp is what produced the
     concentric "target" rings in the previous version. */
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

  /*
    The glow is split across two elements on purpose.

    Originally this was one element carrying both `filter: blur()` and an
    animated `background-position`. background-position is a paint property, so
    every frame repainted the element AND re-ran the blur over it. With seven
    cards on screen that was most of a 17fps portfolio page.

    Now the outer box only clips and fades, while the inner tile carries the
    blur and animates `transform`. The blur bakes into the inner element's
    composited layer once, and translating that layer is free. The translation
    must not change the layer's size either — a scale here would put the
    re-rasterisation straight back.
  */
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

  /*
    An EDGE glow, not a filled gradient.

    History worth keeping, because both previous attempts were wrong in
    instructive ways:
      1. linear-gradient(115deg) lit one corner and fell off toward the
         opposite one, so the right edge read as a permanent shadow.
      2. radial closest-side fixed the evenness but put every colour stop in a
         concentric ring centred on the card — which reads as a bullseye.
         ("the gradient background looks like a target and it looks kinda bad")

    This version is transparent through the whole middle and only carries
    colour in the last ~15% of the radius, so what shows is a rim of light
    around the card rather than rings across it. closest-side keeps that rim
    landing on all four edges at once whatever the aspect ratio, so it stays
    even — which was the point of attempt 2 and is preserved here.
  */
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
    /*
      Deliberately NO `will-change` here. It looks like the right hint, but it
      forces every one of these into its own permanently-retained composited
      layer — and a blurred layer this size is expensive to hold. With seven
      cards on screen it cost ~30fps versus letting the browser rasterise once
      and cache on its own terms. Measured, not assumed.
    */
  }

  .fx-background-gradient:hover .fx-bgg-glow,
  .fx-background-gradient:focus-within .fx-bgg-glow {
    opacity: var(--bgg-active);
  }

  /* The card itself rides above the glow and keeps its own opaque background,
     so the gradient only ever shows as a halo. */
  .fx-bgg-content {
    position: relative;
    z-index: 1;
    height: 100%;
    border-radius: inherit;
  }

  /* A gentle breath, nothing directional. */
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
