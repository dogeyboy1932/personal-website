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

  Implementation: the shared `.fx-arc` / `.fx-arc-reactive` classes from
  src/styles/effects.css, tuned through --fx-arc-* custom properties. This
  component owns no arc CSS of its own any more — it used to, and ShareButton
  carried a near-identical second copy.
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
  /*
    The arc itself is NOT here. It is `.fx-arc` / `.fx-arc-reactive` in
    src/styles/effects.css, applied to the host element above and tuned through
    the --fx-arc-* custom properties set in `styleVars`.

    This component used to carry its own copy — @property --hbg-angle, the
    conic gradient, the double mask, @keyframes fx-hbg-spin — and ShareButton
    carried a second, near-identical copy. What is left here is only what is
    genuinely specific to this component: it is a link/button, so it needs
    layout and a label above the ring.
  */
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
