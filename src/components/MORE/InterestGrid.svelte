<!--
  /more section: interests.

  A FX:drift-wall of 12 compact tiles. Chosen over option-wheel and
  infinite-spiral (the other two candidates) because it is the only one that
  keeps every item visible at once — the brief was to compact the page "without
  cutting out information altogether", and the other two show one item at a
  time.

  Front face is emoji + name so the whole set stays scannable; the detail
  appears on the tile itself on hover, which removes the flip-card's fixed
  height requirement and lets the wall pack much tighter.

  Data: more.interests in src/constants/more.ts
-->
<script lang="ts">
  import { theme } from "../../lib/stores";
  import { DriftWall } from "../fx";
  import type { Interest } from "../../types";

  export let interests: Interest[] = [];
</script>

<!-- FX:drift-wall -->
<!-- travel/tilt kept small: at 18px the tiles sat visibly off each other
     and the wall read as misaligned rather than parallaxed. -->
<DriftWall items={interests} columns={6} travel={9} tilt={3} let:item>
  <div
    class="group relative flex h-[86px] cursor-default flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border {$theme.accent.cyan.border} {$theme.bg.secondary} px-2 text-center"
  >
    <span class="text-2xl leading-none transition-transform duration-300 group-hover:-translate-y-6">
      {item.emoji}
    </span>
    <span
      class="text-[11px] font-semibold leading-tight {$theme.text.secondary} transition-transform duration-300 group-hover:-translate-y-6"
    >
      {item.name}
    </span>

    <!-- Detail rises over the tile on hover. Absolute, so it costs no height
         when idle — that is what lets the wall be this dense. -->
    <span
      class="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden bg-slate-950/95 px-2 text-center text-[9px] leading-tight {$theme.text.secondary} opacity-0 transition-opacity duration-200 group-hover:opacity-100"
    >
      <span class="line-clamp-5">{item.detail}</span>
    </span>
  </div>
</DriftWall>
<!-- /FX:drift-wall -->
