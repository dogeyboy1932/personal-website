<script lang="ts">
  import { accentRgb, pointerOffset } from "../../lib/utils";
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { darkModeStore } from "../../constants/_theme";

  export let size = 260;
  export let thickness = 1.5;
  export let color: "warm" | "cool" | string = "warm";
  export let intensity = 0.9;
  export let idle = 0.12;
  export let radius = "inherit";

  let el: HTMLDivElement;
  let parent: HTMLElement | null = null;
  let mx = "50%";
  let my = "50%";
  let active = false;

  $: isDark = $darkModeStore;
  $: rgb = accentRgb(color, isDark);

  function onMove(event: PointerEvent) {
    if (!parent) return;
    /* These become CSS lengths INSIDE the zoomed page, so they have to be
       local units, not the viewport px clientX reports. */
    const { x, y } = pointerOffset(event, parent);
    mx = `${x}px`;
    my = `${y}px`;
    active = true;
  }

  function onLeave() {
    active = false;
  }

  onMount(() => {
    if (!browser) return;
    parent = el.parentElement;
    if (!parent) return;
    parent.addEventListener("pointermove", onMove, { passive: true });
    parent.addEventListener("pointerleave", onLeave);
  });

  onDestroy(() => {
    if (!browser || !parent) return;
    parent.removeEventListener("pointermove", onMove);
    parent.removeEventListener("pointerleave", onLeave);
  });
</script>

<div
  bind:this={el}
  class="fx-border-glow"
  class:is-active={active}
  aria-hidden="true"
  style="
    --bg-mx: {mx};
    --bg-my: {my};
    --bg-size: {size}px;
    --bg-thickness: {thickness}px;
    --bg-rgb: {rgb};
    --bg-intensity: {intensity};
    --bg-idle: {idle};
    --bg-radius: {radius};
  "
/>

<style>
  .fx-border-glow {
    position: absolute;
    inset: 0;
    border-radius: var(--bg-radius);
    padding: var(--bg-thickness);
    pointer-events: none;
    opacity: var(--bg-idle);
    transition: opacity 300ms ease;

    background: radial-gradient(
      var(--bg-size) circle at var(--bg-mx) var(--bg-my),
      rgba(var(--bg-rgb), 1) 0%,
      rgba(var(--bg-rgb), 0.5) 35%,
      rgba(var(--bg-rgb), 0) 70%
    );

    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
  }

  .is-active {
    opacity: var(--bg-intensity);
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-border-glow {
      transition: none;
    }
  }
</style>
