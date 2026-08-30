<!-- FX: drift-wall — A dense wall of tiles that drifts with the pointer.
     PERFORMANCE Pointer movement writes exactly two CSS custom properties on the wall, inside a
     rAF, and every tile derives its transform from those. -->
<script lang="ts">
  import { onDestroy } from "svelte";
  import { browser } from "$app/environment";

  type Item = $$Generic;

  export let items: Item[] = [];
  export let columns = 6;
  export let travel = 16;
  export let tilt = 4;
  let klass = "";
  export { klass as class };

  let wall: HTMLDivElement;
  let frame = 0;
  /** Normalised pointer offset from the wall centre, -1..1 on both axes. */
  let pending: { x: number; y: number } | null = null;

  const reduced = () =>
    browser && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  function onMove(event: PointerEvent) {
    if (!wall || reduced()) return;
    const r = wall.getBoundingClientRect();
    pending = {
      x: ((event.clientX - r.left) / r.width - 0.5) * 2,
      y: ((event.clientY - r.top) / r.height - 0.5) * 2,
    };
    schedule();
  }

  function onLeave() {
    pending = { x: 0, y: 0 };
    schedule();
  }

  /** Coalesce many pointer events into one style write per frame. */
  function schedule() {
    if (frame || !browser) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (!pending || !wall) return;
      wall.style.setProperty("--dw-x", String(pending.x));
      wall.style.setProperty("--dw-y", String(pending.y));
    });
  }

  onDestroy(() => {
    if (browser && frame) cancelAnimationFrame(frame);
  });

    /** Per-tile depth, derived from the index rather than randomly so the server and client agree. */
  const depthOf = (i: number) => 0.35 + ((i * 37) % 66) / 100;
</script>

<div
  bind:this={wall}
  class="fx-drift-wall {klass}"
  style="--dw-cols: {columns}; --dw-travel: {travel}px; --dw-tilt: {tilt}deg;"
  on:pointermove={onMove}
  on:pointerleave={onLeave}
>
  {#each items as item, i}
    <div class="fx-dw-tile" style="--dw-depth: {depthOf(i)};">
      <slot {item} index={i} />
    </div>
  {/each}
</div>

<style>
  .fx-drift-wall {
    display: grid;
    grid-template-columns: repeat(var(--dw-cols), minmax(0, 1fr));
    gap: 0.35rem;
    /* Perspective on the wall so the per-tile tilt has somewhere to happen. */
    perspective: 900px;
  }

  .fx-dw-tile {
    /* --dw-x/--dw-y are written once per frame on the wall; each tile scales
       them by its own depth. Transform only, so this stays on the compositor. */
    transform: translate3d(
        calc(var(--dw-x, 0) * var(--dw-depth) * var(--dw-travel) * -1),
        calc(var(--dw-y, 0) * var(--dw-depth) * var(--dw-travel) * -1),
        0
      )
      rotateY(calc(var(--dw-x, 0) * var(--dw-tilt) * var(--dw-depth)))
      rotateX(calc(var(--dw-y, 0) * var(--dw-tilt) * var(--dw-depth) * -1));
    transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
        /* Deliberately NOT transform-style: preserve-3d. */
  }

  /* The hovered tile comes forward and stops drifting, so it is easy to read. */
  .fx-dw-tile:hover,
  .fx-dw-tile:focus-within {
    transform: translate3d(0, -4px, 0) scale(1.06);
    z-index: 2;
  }

  /* Column count is a prop, but it can't survive every width — these floors
     stop tiles collapsing to unreadable slivers on narrow screens. */
  @media (max-width: 1100px) {
    .fx-drift-wall {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
  }

  @media (max-width: 700px) {
    .fx-drift-wall {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media (max-width: 480px) {
    .fx-drift-wall {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-dw-tile {
      transform: none;
      transition: none;
    }
  }
</style>
