<!--
  /more section: honors.

  COMPACT form. Previously a two-column block: a list of hackathon placements
  plus a separate framed Eagle Scout panel. That framing was doing a job — it
  kept a multi-year rank from reading as another weekend hackathon result — but
  it cost a lot of height. ("Honors could be more compact.")

  The distinction survives as a badge style rather than a whole panel: ranks get
  the medal glyph and a solid amber chip, placements get a trophy on the dark
  surface. Same claim, one row instead of two columns.

  The rank chip's colours are literal rather than from the theme's yellow ramp:
  accent.yellow.bg is a LIGHT amber (bg-amber-50/50) even in dark mode, so the
  muted text used on the dark chips vanished on it.

  Data: more.honors in src/constants/more.ts (see the `kind` discriminator)
-->
<script lang="ts">
  import { fly } from "svelte/transition";
  import { Trophy, Medal } from "lucide-svelte";
  import { theme } from "../../lib/stores";
  import type { Honor } from "../../types";

  export let honors: Honor[] = [];
</script>

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
        <Medal class="h-4 w-4 flex-shrink-0 text-amber-900" />
      {:else}
        <Trophy class="h-4 w-4 flex-shrink-0 {$theme.accent.orange.text}" />
      {/if}

      <!-- Rank chips sit on accent.yellow.bg, which is a LIGHT amber even in
           dark mode, so the muted slate used on the dark placement chips
           disappears on them. Each variant carries its own text colours. -->
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
