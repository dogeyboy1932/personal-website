<!--
  /more section: interests.

  A FX:drift-wall of 12 compact tiles in ONE row, with a shared caption beneath
  it rather than a per-tile popover.

  Why a shared caption: the tiles are ~100px wide, so the detail cannot live
  inside one (it clipped and collided with the label). A popover above the tile
  was readable but 224px wide, which pushed the first and last tiles' popovers
  past the page container and produced 13-25px of horizontal page scroll
  depending on width. Anchoring the text in a fixed strip under the wall solves
  both: nothing overflows, nothing is clipped, and it reads at any breakpoint.

  Costs ~34px of height, against 180px for the original two-row grid.

  Chosen over option-wheel and infinite-spiral (the other two candidates)
  because it is the only one that keeps all 12 visible at once — the brief was
  to compact the page "without cutting out information altogether".

  Data: more.interests in src/constants/more.ts
-->
<script lang="ts">
  import { theme } from "../../lib/stores";
  import { DriftWall } from "../fx";
  import type { Interest } from "../../types";

  export let interests: Interest[] = [];

  /** Interest under the pointer; null shows the resting hint. */
  let active: Interest | null = null;
</script>

<div on:pointerleave={() => (active = null)}>
  <!-- FX:drift-wall -->
  <!-- travel/tilt kept small: at 18px the tiles sat visibly off each other and
       the wall read as misaligned rather than parallaxed. -->
  <DriftWall items={interests} columns={12} travel={7} tilt={3} let:item>
    <div
      class="group flex h-[74px] cursor-default flex-col items-center justify-center gap-0.5 overflow-hidden rounded-lg border {$theme.accent.cyan.border} {$theme.bg.secondary} px-1 text-center transition-colors"
      on:pointerenter={() => (active = item)}
      on:focusin={() => (active = item)}
      role="listitem"
    >
      <span class="text-lg leading-none">{item.emoji}</span>
      <span class="text-[9px] font-semibold leading-[1.15] {$theme.text.secondary}">
        {item.name}
      </span>
    </div>
  </DriftWall>
  <!-- /FX:drift-wall -->

  <!-- Fixed height so the wall never shifts as the caption changes. -->
  <p
    class="mt-2 flex min-h-[2.1rem] items-start text-[11px] leading-snug {$theme.text.dim}"
    aria-live="polite"
  >
    {#if active}
      <span class="{$theme.accent.cyan.text} mr-2 font-semibold">{active.name}</span>
      <span class="{$theme.text.secondary}">{active.detail}</span>
    {:else}
      <span>Hover any of them for the detail.</span>
    {/if}
  </p>
</div>
