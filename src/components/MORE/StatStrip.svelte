<script lang="ts">
  import { countUp } from "../../lib/actions/countUp";
  import { theme } from "../../lib/stores";
  import type { MoreStat } from "../../types";

  export let stats: MoreStat[] = [];

  let shown: number[] = stats.map(() => 0);

  $: values = stats.map((s) => s.value);
</script>

<div
  class="flex w-full divide-x {$theme.border.light} py-2"
  use:countUp={{ values, onUpdate: (v) => (shown = v) }}
>
  {#each stats as stat, i}
    <div class="flex flex-1 flex-col items-center justify-center px-2">
      <span class="font-display text-3xl font-extrabold tracking-tight text-lede sm:text-4xl">
        {shown[i] ?? 0}{stat.suffix ?? ""}
      </span>
      <span class="meta-label mt-1 text-[10px] {$theme.text.muted} sm:text-xs">{stat.label}</span>
    </div>
  {/each}
</div>
