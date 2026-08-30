<!-- FX: shiny-text — The brief listed both as alternatives for the navbar name, so this is one
     component with a `variant` switch instead of two files — flip the prop to compare them, no
     revert needed. -->
<script lang="ts">
  import { darkModeStore } from "../../lib/stores";

  export let variant: "shine" | "gradient" | "both" = "both";
  export let speed = 4;
  export let disabled = false;
  /** Extra classes for the text itself (sizing, tracking, weight). */
  let klass = "";
  export { klass as class };

  $: isDark = $darkModeStore;

    /* Silver, not amber. */
    /* Two corrections in sequence, both from the navbar name. */
    /* The LIGHT ramp used to be "#cbd5e1, #334155, #0f172a, #475569, #cbd5e1" — its first and last
     stops are slate-300, effectively invisible on the cream navbar, so the first half of "VENKAT"
     simply vanished. */
  $: ramp = isDark
    ? "#cbd5e1, #ffffff, #e2e8f0, #ffffff, #cbd5e1"
    : "#57534e, #1c1917, #44403c, #1c1917, #57534e";

    /* THE HIGHLIGHT INVERTS WITH THE THEME, and this was the actual cause of the vanishing "VENKAT" —
     not the ramp underneath it. */
  $: shineColor = isDark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.55)";
  $: baseColor = isDark ? "#e2e8f0" : "#334155";

  $: useGradient = variant === "gradient" || variant === "both";
  $: useShine = variant === "shine" || variant === "both";

  // Layer 1 (top) = the moving highlight, or nothing when shine is off.
    /* 90deg, not 110deg: at 110 the band is raked, so it crosses the top of the word before the
     bottom and the highlight appears to travel diagonally. */
  $: shineLayer = useShine
    ? `linear-gradient(90deg, transparent 30%, ${shineColor} 47%, ${shineColor} 53%, transparent 70%)`
    : "linear-gradient(transparent, transparent)";

  // Layer 2 (bottom) = the color the glyphs actually read as.
  $: fillLayer = useGradient
    ? `linear-gradient(90deg, ${ramp})`
    : `linear-gradient(${baseColor}, ${baseColor})`;
</script>

<span
  class="fx-shiny-text {klass}"
  class:is-animated={!disabled}
  style="--fx-speed:{speed}s; --fx-shine-layer:{shineLayer}; --fx-fill-layer:{fillLayer}; --fx-base:{baseColor};"
><slot /></span>

<style>
  .fx-shiny-text {
    display: inline-block;
    color: var(--fx-base);
  }

  .is-animated {
    background-image: var(--fx-shine-layer), var(--fx-fill-layer);
    background-size: 220% 100%, 300% 100%;
    /* Highlight parked off the LEFT edge; see the keyframes note. */
    background-position: -80% 50%, 0% 50%;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: fx-shiny var(--fx-speed) linear infinite;
  }

    /* Percentage background-position interpolates from the image's left edge toward the box's right
     edge, so an INCREASING percentage moves the layer rightward. */
  @keyframes fx-shiny {
    0% {
      background-position: -80% 50%, 0% 50%;
    }
    100% {
      background-position: 180% 50%, 100% 50%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .is-animated {
      animation: none;
      /* Park the highlight off-glyph and show the ramp at a fixed offset. */
      background-position: -80% 50%, 50% 50%;
    }
  }
</style>
