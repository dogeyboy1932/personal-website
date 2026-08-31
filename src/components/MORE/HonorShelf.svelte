<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../constants/_theme";
  import type { Honor } from "../../types";

  export let honors: Honor[] = [];
  let klass = "";
  export { klass as class };
</script>

<div class="rounded-2xl border {$theme.border.default} {$theme.bg.card} p-5 {klass}">
  <div class="mb-3 flex items-center gap-2">
    <span class="text-base leading-none" aria-hidden="true">🏆</span>
    <h4 class="meta-label-strong text-xs sm:text-[0.8rem] {$theme.text.secondary}">Other Wins</h4>
  </div>

  <div class="flex flex-wrap gap-2">
    {#each honors as honor, i}
      <div
        class="flex items-center gap-2 rounded-lg border px-3 py-2 {honor.kind === 'rank'
          ? $theme.status.rank.box
          : `${$theme.border.light} ${$theme.bg.secondary}`}"
        in:fly={{ y: 10, delay: i * 50, duration: 300 }}
        title={honor.detail ?? ""}
      >

        <span class="leading-tight">
          <span
            class="meta-label block text-[9px] {honor.kind === 'rank'
              ? $theme.status.rank.event
              : $theme.text.dim}"
          >
            {honor.event}
          </span>
          <span
            class="meta-label text-[10px] font-semibold {honor.kind === 'rank'
              ? $theme.status.rank.placement
              : $theme.text.secondary}"
          >
            {honor.placement}
          </span>
        </span>
      </div>
    {/each}
  </div>
</div>
