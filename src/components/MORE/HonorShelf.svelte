<!-- /more section: honors. -->
<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";
  import type { Honor } from "../../types";

  export let honors: Honor[] = [];
  /** Extra classes; the page passes flex-1 so this box absorbs column slack. */
  let klass = "";
  export { klass as class };
</script>

<div class="rounded-2xl border {$theme.border.default} {$theme.bg.card} p-5 {klass}">
  <div class="mb-3 flex items-center gap-2">
    <span class="text-base leading-none" aria-hidden="true">🏆</span>
    <!-- .meta-label-strong: shared with "Also around campus" and the hero. -->
    <h4 class="meta-label-strong text-xs sm:text-[0.8rem] {$theme.text.secondary}">Other Wins</h4>
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
                <!-- {#if honor.kind === "rank"} <FleurDeLisIcon class="h-4 w-4 flex-shrink-0
             text-amber-900" /> {/if} -->

        <span class="leading-tight">
          <span
            class="meta-label block text-[9px] {honor.kind === 'rank'
              ? 'text-amber-900/80'
              : $theme.text.dim}"
          >
            {honor.event}
          </span>
          <span
            class="meta-label text-[10px] font-semibold {honor.kind === 'rank'
              ? 'text-amber-950'
              : $theme.text.secondary}"
          >
            {honor.placement}
          </span>
        </span>
      </div>
    {/each}
  </div>
</div>
