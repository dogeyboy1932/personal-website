<!--
  /more section: travel.

  Two halves, because the README conflates two different things in one table
  cell: a life PATH (born India, raised NJ, college Illinois, semester
  Singapore, now Chicago) and a LIST of countries visited.

  - The path is a horizontal stepper. It's the through-line the whole section
    hangs on, so it goes first and reads left to right.
  - The countries are FX:flowing-menu rows, per the brief's explicit routing.

  Data: more.travel in src/constants/more.ts
-->
<script lang="ts">
  import { theme } from "../../lib/stores";
  import { FlowingMenu } from "../fx";
  import type { TravelStop, TravelCountry } from "../../types";

  export let path: TravelStop[] = [];
  export let countries: TravelCountry[] = [];

  $: rows = countries.map((c) => ({
    key: c.name,
    label: c.name,
    note: c.note,
    badge: c.flag,
  }));
</script>

<div class="space-y-6">
  <!-- ===== Life path stepper ===== -->
  <div class="flex flex-wrap items-stretch gap-2">
    {#each path as stop, i}
      <div class="flex items-center gap-2">
        <div
          class="rounded-xl border {$theme.border.default} {$theme.bg.secondary} px-4 py-3 text-center"
        >
          <div class="font-semibold {$theme.text.secondary}">{stop.place}</div>
          <div class="text-[10px] uppercase tracking-[0.22em] {$theme.accent.orange.text}">
            {stop.note}
          </div>
        </div>
        {#if i < path.length - 1}
          <span aria-hidden="true" class="{$theme.text.dim} text-lg">→</span>
        {/if}
      </div>
    {/each}
  </div>

  <!-- ===== Countries ===== -->
  <div>
    <h4 class="mb-2 text-[11px] uppercase tracking-[0.3em] {$theme.text.muted}">
      Seven countries so far
    </h4>
    <!-- FX:flowing-menu -->
    <FlowingMenu items={rows} rowHeight="4.25rem" marquee={14} />
    <!-- /FX:flowing-menu -->
  </div>
</div>
