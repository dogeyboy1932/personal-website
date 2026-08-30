<!--
  FX: shiny-text
  Source: https://reactbits.dev/text-animations/shiny-text
      and https://reactbits.dev/text-animations/gradient-text  (React) — reimplemented in Svelte

  The brief listed both as alternatives ("shiny-text OR gradient-text") for the
  navbar name, so this is one component with a `variant` switch instead of two
  files — flip the prop to compare them, no revert needed.

  Used by: src/components/NavigationBar/NavigationBar.svelte

  Tunables:
    variant   "shine"    dim base text with a specular highlight sweeping across
              "gradient" animated multi-stop gradient fill
              "both"     gradient fill WITH the sweeping highlight riding over it
    speed     seconds per sweep / gradient cycle       default 4
    disabled  render as plain text (kills the animation, keeps layout)

  Implementation note: both the ramp and the highlight are stacked as two
  background-image layers on a single element, all clipped with
  background-clip:text. A ::after overlay would need the string duplicated into
  an attribute to have glyphs to clip against — this avoids that entirely.

  Colors come off the theme's warm accent ramp so it matches the animated logo,
  and both light and dark are defined. Respects prefers-reduced-motion.
-->
<script lang="ts">
  import { darkModeStore } from "../../lib/stores";

  export let variant: "shine" | "gradient" | "both" = "both";
  export let speed = 4;
  export let disabled = false;
  /** Extra classes for the text itself (sizing, tracking, weight). */
  let klass = "";
  export { klass as class };

  $: isDark = $darkModeStore;

  /*
    Silver, not amber. ("My name in the navbar should be more white/silvery not
    yelow/ambery") The logo beside it is already amber; the name echoing it made
    the whole left side one colour.
  */
  /*
    CONTRAST between stops is what makes a gradient legible, and this ramp had
    almost none: #f8fafc, #cbd5e1, #ffffff, #e2e8f0 span roughly 92%-100%
    lightness, so the sweep was a barely-visible shimmer on an already-white
    word. ("make my name in the navbar more obvious gradient. It's a bit hard to
    see the contrast in gradient.")

    Still silver — the earlier note "my name in the navbar should be more
    white/silvery not yelow/ambery" stands — but the dark stops now drop to
    slate-500/600, roughly 45% lightness. Same hue family, ~50 points of
    lightness travel instead of ~8.
  */
  $: ramp = isDark
    ? "#64748b, #f1f5f9, #ffffff, #94a3b8, #64748b"
    : "#cbd5e1, #334155, #0f172a, #475569, #cbd5e1";

  $: shineColor = isDark ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.9)";
  $: baseColor = isDark ? "#e2e8f0" : "#334155";

  $: useGradient = variant === "gradient" || variant === "both";
  $: useShine = variant === "shine" || variant === "both";

  // Layer 1 (top) = the moving highlight, or nothing when shine is off.
  $: shineLayer = useShine
    ? `linear-gradient(110deg, transparent 25%, ${shineColor} 45%, ${shineColor} 55%, transparent 75%)`
    : "linear-gradient(transparent, transparent)";

  // Layer 2 (bottom) = the color the glyphs actually read as.
  $: fillLayer = useGradient
    ? `linear-gradient(110deg, ${ramp})`
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
    background-position: 180% 50%, 0% 50%;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: fx-shiny var(--fx-speed) linear infinite;
  }

  /*
    Percentage background-position aligns image edge to box edge, so with
    no-repeat the usable travel is 0%..100% regardless of background-size.
    The fill layer must stay inside that range — push it negative and the
    layer paints nothing, leaving the glyphs fully transparent. The ramp's
    first and last stops are the same color, so 0% -> 100% loops seamlessly.

    The shine layer is deliberately the exception: it starts and ends outside
    the range so the highlight enters from off-glyph, crosses, and exits. It
    is the top layer and mostly transparent, so where it paints nothing the
    fill layer below still shows through.
  */
  @keyframes fx-shiny {
    0% {
      background-position: 180% 50%, 0% 50%;
    }
    100% {
      background-position: -80% 50%, 100% 50%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .is-animated {
      animation: none;
      /* Park the highlight off-glyph and show the ramp at a fixed offset. */
      background-position: 180% 50%, 50% 50%;
    }
  }
</style>
