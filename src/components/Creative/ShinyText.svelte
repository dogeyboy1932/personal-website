<script lang="ts">
  import { tokens, channels, css } from "../../constants/_tokens";

  export let variant: "shine" | "gradient" | "both" = "both";
  export let speed = 4;
  export let disabled = false;
  let klass = "";
  export { klass as class };

  /* Five stops, mid -> peak -> mid -> peak -> mid, so the ramp reads as metal
     rather than a single sweep. All three colours flip with the theme in styles.css. */
  $: ramp = [
    css($tokens, "shine-mid"),
    css($tokens, "shine"),
    css($tokens, "shine-base"),
    css($tokens, "shine"),
    css($tokens, "shine-mid"),
  ].join(", ");

  $: shineColor = `rgba(${channels($tokens, "shine")}, 0.95)`;
  $: baseColor = css($tokens, "shine-base");

  $: useGradient = variant === "gradient" || variant === "both";
  $: useShine = variant === "shine" || variant === "both";

  $: shineLayer = useShine
    ? `linear-gradient(90deg, transparent 30%, ${shineColor} 47%, ${shineColor} 53%, transparent 70%)`
    : "linear-gradient(transparent, transparent)";

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
    background-position: -80% 50%, 0% 50%;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: fx-shiny var(--fx-speed) linear infinite;
  }

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
      background-position: -80% 50%, 50% 50%;
    }
  }
</style>
