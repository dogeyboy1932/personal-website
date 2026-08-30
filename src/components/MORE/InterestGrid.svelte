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

<div class="grid gap-2.5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {#each interests as item, i}
    <!-- Fixed height: both faces of a flip card must share a box, and the
         details vary from "Yes." to two full lines. Tightened from 132px and
         widened to 4 columns — this grid was about a third of the page. -->
    <div class="h-[104px]" in:fly={{ y: 14, delay: i * 45, duration: 350 }}>
      <!-- FX:flip-card -->
      <FlipCard class="h-full">
        <div
          slot="front"
          class="flex h-full flex-col justify-center gap-1 rounded-xl border {$theme.accent.cyan.border} {$theme.bg.secondary} px-3 py-2"
        >
          <span class="text-2xl leading-none">{item.emoji}</span>
          <span class="text-sm font-semibold leading-tight {$theme.text.secondary}">{item.name}</span>
        </div>

        <div
          slot="back"
          class="flex h-full flex-col justify-center rounded-xl border {$theme.accent.cyan.hover.border} {$theme.bg.cardElevated} px-3 py-2"
        >
          <p class="text-[11px] leading-snug {$theme.text.secondary}">{item.detail}</p>
        </div>
      </FlipCard>
      <!-- /FX:flip-card -->
    </div>
  {/each}
</div>
