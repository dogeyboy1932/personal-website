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
  import { darkModeStore } from "../../lib/stores";

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

  // Each palette is a closed loop (first stop repeated last) so the 0%->100%
  // background-position animation has no visible seam.
  $: stops =
    palette === "warm"
      ? isDark
        ? "#f59e0b, #fb7185, #fbbf24, #f97316, #f59e0b"
        : "#d97706, #e11d48, #ca8a04, #ea580c, #d97706"
      : palette === "violet"
      ? isDark
        ? "#a855f7, #6366f1, #d946ef, #7c3aed, #a855f7"
        : "#7c3aed, #4f46e5, #c026d3, #6d28d9, #7c3aed"
      : isDark
      ? "#38bdf8, #a855f7, #22d3ee, #6366f1, #38bdf8"
      : "#0284c7, #7c3aed, #0891b2, #4f46e5, #0284c7";
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
  "
>
  <span class="fx-bgg-glow" aria-hidden="true" />
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
    background-image: linear-gradient(115deg, var(--bgg-stops));
    background-size: 300% 300%;
    filter: blur(var(--bgg-blur));
    opacity: var(--bgg-idle);
    transition: opacity 350ms ease;
    animation: fx-bgg-drift var(--bgg-speed) linear infinite;
    pointer-events: none;
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

  @keyframes fx-bgg-drift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-bgg-glow {
      animation: none;
      transition: none;
    }
  }
</style>
