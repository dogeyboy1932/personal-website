<!--
  /more section: interests.

  Twelve flip cards. Front carries the emoji and name so the whole set is
  scannable at a glance; the back carries the sentence. That split is the
  "minimal amount of context" the brief asked for — you can read the grid in
  three seconds, or stop on any one card for the detail.

  Travel is deliberately NOT in here; it has its own section with the
  flowing-menu treatment.

  Data: more.interests in src/constants/more.ts
  Uses: FX:flip-card
-->
<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";
  import { FlipCard } from "../fx";
  import type { Interest } from "../../types";

  export let interests: Interest[] = [];
</script>

<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
  {#each interests as item, i}
    <!-- Fixed height: both faces of a flip card must share a box, and the
         details vary from "Yes." to two full lines. -->
    <div class="h-[132px]" in:fly={{ y: 14, delay: i * 45, duration: 350 }}>
      <!-- FX:flip-card -->
      <FlipCard class="h-full">
        <div
          slot="front"
          class="flex h-full flex-col justify-center gap-2 rounded-xl border {$theme.accent.cyan.border} {$theme.bg.secondary} p-4"
        >
          <span class="text-3xl leading-none">{item.emoji}</span>
          <span class="font-semibold {$theme.text.secondary}">{item.name}</span>
          <span class="text-[10px] uppercase tracking-[0.2em] {$theme.accent.cyan.textMuted}">
            Flip
          </span>
        </div>

        <div
          slot="back"
          class="flex h-full flex-col justify-center rounded-xl border {$theme.accent.cyan.hover.border} {$theme.bg.cardElevated} p-4"
        >
          <span class="text-xs font-semibold uppercase tracking-[0.2em] {$theme.accent.cyan.text}">
            {item.name}
          </span>
          <p class="mt-2 text-sm leading-snug {$theme.text.secondary}">{item.detail}</p>
        </div>
      </FlipCard>
      <!-- /FX:flip-card -->
    </div>
  {/each}
</div>
