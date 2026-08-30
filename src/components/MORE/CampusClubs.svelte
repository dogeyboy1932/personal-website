<!--
  /more: everything else, as chips. The companion to LeadershipRoles.

  Data: clubs in src/constants/
-->
<script lang="ts">
  import { fly } from "svelte/transition";
  import { Users } from "lucide-svelte";
  import { theme } from "../../lib/stores";
  import type { Club } from "../../types";

  export let clubs: Club[] = [];
  /** Names already spotlighted as roles, so they do not repeat here. */
  export let exclude: string[] = [];

  $: skip = new Set(exclude);
  $: rest = clubs.filter((c) => !skip.has(c.name));
</script>

<div class="rounded-2xl border {$theme.border.default} {$theme.bg.card} p-5">
  <div class="mb-3 flex items-center gap-2">
    <Users class="h-4 w-4 {$theme.text.muted}" />
    <!-- .meta-label-strong: shared with Honors and the hero's MCS line. -->
    <h4 class="meta-label-strong text-xs sm:text-[0.8rem] {$theme.text.secondary}">
      Also around campus
    </h4>
  </div>

  <div class="flex flex-wrap gap-2">
    {#each rest as club, i}
      <span
        class="inline-flex items-baseline gap-1.5 rounded-full border {$theme.border.light} {$theme.bg.cardMuted} px-3.5 py-1.5 font-casual text-sm font-semibold {$theme.text.secondary}"
        in:fly={{ y: 8, delay: 200 + i * 25, duration: 280 }}
      >
        {club.name}
        {#if club.tagline}
          <span class="text-[0.8rem] font-medium {$theme.text.subtle}">({club.tagline})</span>
        {/if}
      </span>
    {/each}
  </div>
</div>
