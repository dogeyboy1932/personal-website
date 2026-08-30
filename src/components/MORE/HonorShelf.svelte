<!--
  /more section: honors.

  The README renders these as five identical shields. That flattens a real
  distinction: four are competition placements, one (Eagle Scout) is a rank
  earned over years. Rendering them in one row implies they're the same kind
  of thing, so the rank is pulled out and framed separately.

  Data: more.honors in src/constants/more.ts (see the `kind` discriminator)
-->
<script lang="ts">
  import { fly } from "svelte/transition";
  import { Trophy, Medal } from "lucide-svelte";
  import { theme } from "../../lib/stores";
  import type { Honor } from "../../types";

  export let honors: Honor[] = [];

  $: competitions = honors.filter((h) => h.kind === "competition");
  $: ranks = honors.filter((h) => h.kind === "rank");
</script>

<div class="grid gap-4 lg:grid-cols-[2fr_1fr]">
  <!-- ===== Competition placements ===== -->
  <div class="rounded-2xl border {$theme.accent.orange.border} {$theme.bg.card} p-5">
    <div class="mb-4 flex items-center gap-2">
      <Trophy class="h-4 w-4 {$theme.accent.orange.text}" />
      <h4 class="text-[11px] uppercase tracking-[0.3em] {$theme.text.muted}">Hackathons</h4>
    </div>

    <ul class="space-y-3">
      {#each competitions as honor, i}
        <li
          class="flex items-baseline gap-3 border-b {$theme.border.light} pb-3 last:border-0 last:pb-0"
          in:fly={{ x: -10, delay: i * 70, duration: 320 }}
        >
          <span
            class="flex-shrink-0 rounded-md {$theme.accent.orange.bg} px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] {$theme.accent.orange.text}"
          >
            {honor.placement}
          </span>
          <span class="min-w-0">
            <span class="font-semibold {$theme.text.secondary}">{honor.event}</span>
            {#if honor.detail}
              <span class="block text-xs {$theme.text.dim}">{honor.detail}</span>
            {/if}
          </span>
        </li>
      {/each}
    </ul>
  </div>

  <!-- ===== Ranks — not competitions, so not in the list above ===== -->
  {#each ranks as rank}
    <div
      class="flex flex-col justify-center rounded-2xl border {$theme.accent.yellow.border} {$theme.gradient.violet} p-5 text-center"
      in:fly={{ y: 16, delay: 120, duration: 380 }}
    >
      <Medal class="mx-auto h-7 w-7 {$theme.accent.yellow.text}" />
      <div class="mt-2 font-display text-xl font-bold {$theme.text.primary}">{rank.placement}</div>
      <div class="text-xs {$theme.text.muted}">{rank.event}</div>
      {#if rank.detail}
        <div class="mt-1 text-[11px] {$theme.text.dim}">{rank.detail}</div>
      {/if}
    </div>
  {/each}
</div>
