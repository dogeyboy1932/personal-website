<!--
  /more section: travel.

  Two halves, because the README conflates two different things in one table
  cell: a life PATH (born India, raised NJ, college Illinois, semester
  Singapore, now Chicago) and a LIST of countries visited.

  Countries are FX:flowing-menu in GRID mode: the compact cell layout that
  fixed the page length, with the hover-marquee behaviour restored per cell.
  ("i think the current setup for the countries is good. Each cell can be a
  flow menu.")

  The descriptions in more.ts are placeholders the user intends to rewrite
  ("For now have dummy descriptions. I have to fix that myself.") — they are
  only surfaced in the hover panel, so replacing them touches no markup.

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

<div class="space-y-4">
  <!-- ===== Life path stepper ===== -->
  <div class="flex flex-wrap items-stretch gap-1.5">
    {#each path as stop, i}
      <div class="flex items-center gap-1.5">
        <div
          class="rounded-lg border {$theme.border.default} {$theme.bg.secondary} px-3 py-2 text-center"
        >
          <div class="text-sm font-semibold leading-tight {$theme.text.secondary}">{stop.place}</div>
          <div class="meta-label text-[9px] {$theme.accent.orange.text}">
            {stop.note}
          </div>
        </div>
        {#if i < path.length - 1}
          <span aria-hidden="true" class="{$theme.text.dim}">&rarr;</span>
        {/if}
      </div>
    {/each}
  </div>

  <!-- ===== Countries ===== -->
  <!-- FX:flowing-menu (grid mode) -->
  <FlowingMenu items={rows} columns={7} rowHeight="4.1rem" marquee={11} />
  <!-- /FX:flowing-menu -->
</div>
