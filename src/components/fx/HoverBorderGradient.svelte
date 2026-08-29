<!--
  FX: hover-border-gradient
  Source: https://ui.aceternity.com/components/hover-border-gradient (React) — reimplemented in Svelte

  A button whose border is a bright arc sweeping around the perimeter. The arc
  runs slowly at rest and accelerates + brightens on hover.

  Used by: src/routes/+page.svelte ("See full stack")

  Renders as <a> when `href` is set, otherwise <button>, so it stays a real
  link with real keyboard and middle-click behaviour instead of a div with a
  click handler.

  Tunables:
    href       when set, renders an anchor
    duration   seconds per full revolution at rest   default 4
    hoverBoost revolution speed multiplier on hover  default 2.5
    thickness  border width, px                      default 1.5
    radius     corner radius CSS value               default "0.75rem"
    color      "warm" | "cool" | any CSS color       default "warm"

  Implementation: a conic-gradient rotated by an animated @property angle,
  masked to the border ring (same exclude-composite trick as FX:border-glow).
  Browsers without @property support fall back to a static ring rather than a
  broken one — the rotation is the enhancement, the border is the baseline.
-->
<script lang="ts">
  import { darkModeStore } from "../../lib/stores";

  export let href: string | undefined = undefined;
  export let duration = 4;
  export let hoverBoost = 2.5;
  export let thickness = 1.5;
  export let radius = "0.75rem";
  export let color: "warm" | "cool" | string = "warm";
  let klass = "";
  export { klass as class };

  $: isDark = $darkModeStore;
  $: rgb =
    color === "warm"
      ? isDark
        ? "251, 191, 36"
        : "217, 119, 6"
      : color === "cool"
      ? isDark
        ? "129, 140, 248"
        : "79, 70, 229"
      : color;

  $: styleVars =
    `--hbg-duration:${duration}s; --hbg-hover-duration:${duration / hoverBoost}s; ` +
    `--hbg-thickness:${thickness}px; --hbg-radius:${radius}; --hbg-rgb:${rgb};`;
</script>

<svelte:element
  this={href ? "a" : "button"}
  {href}
  class="fx-hover-border-gradient {klass}"
  style={styleVars}
  {...$$restProps}
>
  <span class="fx-hbg-ring" aria-hidden="true" />
  <span class="fx-hbg-label"><slot /></span>
</svelte:element>

<style>
  /* Registering the angle as a typed custom property is what makes the conic
     gradient rotatable — plain CSS variables are not interpolatable. */
  @property --hbg-angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }

  .fx-hover-border-gradient {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--hbg-radius);
    isolation: isolate;
    cursor: pointer;
  }

  .fx-hbg-ring {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: var(--hbg-thickness);
    pointer-events: none;

    /* Bright arc plus a dim remainder, so the border is always visible and the
       arc reads as a highlight travelling around it. */
    background: conic-gradient(
      from var(--hbg-angle),
      rgba(var(--hbg-rgb), 0) 0deg,
      rgba(var(--hbg-rgb), 0.15) 40deg,
      rgba(var(--hbg-rgb), 1) 90deg,
      rgba(var(--hbg-rgb), 0.15) 140deg,
      rgba(var(--hbg-rgb), 0) 200deg,
      rgba(var(--hbg-rgb), 0) 360deg
    );

    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;

    animation: fx-hbg-spin var(--hbg-duration) linear infinite;
    transition: filter 250ms ease;
  }

  .fx-hover-border-gradient:hover .fx-hbg-ring,
  .fx-hover-border-gradient:focus-visible .fx-hbg-ring {
    animation-duration: var(--hbg-hover-duration);
    filter: brightness(1.5) drop-shadow(0 0 6px rgba(var(--hbg-rgb), 0.55));
  }

  .fx-hbg-label {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
  }

  @keyframes fx-hbg-spin {
    to {
      --hbg-angle: 360deg;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-hbg-ring {
      animation: none;
      /* Static ring rather than an invisible one. */
      background: linear-gradient(
        120deg,
        rgba(var(--hbg-rgb), 0.9),
        rgba(var(--hbg-rgb), 0.25)
      );
    }
  }
</style>
