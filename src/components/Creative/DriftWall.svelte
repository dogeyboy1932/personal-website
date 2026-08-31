<!-- FX: drift-wall — A dense wall of tiles that drifts with the pointer.
     PERFORMANCE Pointer movement writes exactly two CSS custom properties on the wall, inside a
     rAF, and every tile derives its transform from those. -->
<script lang="ts">
  import { prefersReducedMotion } from "../../lib/utils";
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
  let pending: { x: number; y: number } | null = null;

  function onMove(event: PointerEvent) {
    if (!wall || prefersReducedMotion()) return;
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
    perspective: 900px;
  }

  .fx-dw-tile {
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

  .fx-dw-tile:hover,
  .fx-dw-tile:focus-within {
    transform: translate3d(0, -4px, 0) scale(1.06);
    z-index: 2;
  }

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
