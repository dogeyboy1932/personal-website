<!-- FX: hover-border-gradient — a bright arc sweeping the border, faster on hover. — Renders as <a>
     when `href` is set, otherwise <button>. -->
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

  /* Feeds the shared .fx-arc effect. --hbg-radius stays local because the
     component's own layout rule uses it. */
  $: styleVars =
    `--fx-arc-duration:${duration}s; --fx-arc-hover-duration:${duration / hoverBoost}s; ` +
    `--fx-arc-thickness:${thickness}px; --hbg-radius:${radius}; ` +
    `--fx-arc-rgb:${rgb.split(",").map((c) => c.trim()).join(" ")};`;
</script>

<svelte:element
  this={href ? "a" : "button"}
  {href}
  class="fx-hover-border-gradient fx-arc fx-arc-reactive {klass}"
  style={styleVars}
  {...$$restProps}
>
  
  <span class="fx-hbg-label"><slot /></span>
</svelte:element>

<style>
  /* Arc lives in src/styles/effects.css. Only layout is component-specific. */
  .fx-hover-border-gradient {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--hbg-radius);
    cursor: pointer;
  }

  .fx-hbg-label {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
  }
</style>
