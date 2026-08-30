<!--
  FX: border-glow
  Source: https://reactbits.dev/components/border-glow (React) — reimplemented in Svelte

  A light that rides the card's border ring, following the cursor. Drop it as
  the first child of any `position: relative` rounded container and it lights
  that container's edge — it does not wrap or restructure the card, so removing
  the two lines at the call site restores the original look exactly.

  Used by: src/components/HOME/FocusCard.svelte ("Mainly Focused On")

  Tunables:
    size       diameter of the travelling light, px        default 260
    thickness  border ring width, px                       default 1.5
    color      "warm" | "cool" | any CSS color             default "warm"
    intensity  peak opacity of the ring                    default 0.9
    idle       ring opacity when the pointer is elsewhere  default 0.12
    radius     corner radius; defaults to inheriting the parent's

  The ring is a full-box radial gradient masked down to just the border using
  two mask layers composited with `exclude` — the standard trick, and the only
  way to get a gradient border that still lets the card's own background show.

  Pointer tracking is attached to the parent element rather than to this
  overlay, because the overlay is pointer-events:none (it must not eat clicks
  on the card's own links).
-->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { darkModeStore } from "../../lib/stores";

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
  $: rgb =
    color === "warm"
      ? isDark
        ? "251, 191, 36"
        : "217, 119, 6"
      : color === "cool"
      ? isDark
        ? "96, 165, 250"
        : "37, 99, 235"
      : color;

  function onMove(event: PointerEvent) {
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    mx = `${event.clientX - rect.left}px`;
    my = `${event.clientY - rect.top}px`;
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

    /* Punch out the interior so only the border ring paints: one mask covers
       the content box, one covers the whole border box, and `exclude` leaves
       the difference — the ring. */
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
