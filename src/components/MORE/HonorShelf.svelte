<!--
  /more section: honors.

  Boxed to match the "Also around campus" panel it sits beneath, so the two
  read as a pair rather than one framed and one loose. ("The honors section
  should be boxed like Also Around campus. Have an emoji for honors.")

  Per-pill trophy icons are gone — with five pills in a row they were five
  repetitions of the same glyph carrying no information. The placement label
  above each event already says what kind of result it was.

  Eagle Scout keeps a mark, because it is the one entry that is NOT a
  competition result: a fleur-de-lis, the Boy Scouts emblem, rather than a
  generic medal.

  Data: more.honors in src/constants/more.ts (see the `kind` discriminator)
-->
<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";
  import FleurDeLisIcon from "../icons/FleurDeLisIcon.svelte";
  import type { Honor } from "../../types";

  export let honors: Honor[] = [];
</script>

<div class="rounded-2xl border {$theme.border.default} {$theme.bg.card} p-5">
  <div class="mb-3 flex items-center gap-2">
    <span class="text-base leading-none" aria-hidden="true">🏆</span>
    <!-- .meta-label-strong: shared with "Also around campus" and the hero. -->
    <h4 class="meta-label-strong text-xs sm:text-[0.8rem] {$theme.text.secondary}">Honors</h4>
  </div>

  <div class="flex flex-wrap gap-2">
    {#each honors as honor, i}
      <div
        class="flex items-center gap-2 rounded-lg border px-3 py-2 {honor.kind === 'rank'
          ? 'border-amber-300 bg-amber-400'
          : `${$theme.border.light} ${$theme.bg.secondary}`}"
        in:fly={{ y: 10, delay: i * 50, duration: 300 }}
        title={honor.detail ?? ""}
      >
        {#if honor.kind === "rank"}
          <FleurDeLisIcon class="h-4 w-4 flex-shrink-0 text-amber-900" />
        {/if}

        <span class="leading-tight">
          <span
            class="meta-label block text-[9px] {honor.kind === 'rank'
              ? 'text-amber-900/80'
              : $theme.text.dim}"
          >
            {honor.placement}
          </span>
          <span
            class="text-xs font-semibold {honor.kind === 'rank'
              ? 'text-amber-950'
              : $theme.text.secondary}"
          >
            {honor.event}
          </span>
        </span>
      </div>
    {/each}
  </div>
</div>
