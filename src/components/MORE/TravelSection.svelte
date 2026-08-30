<!--
  /more section: travel.

  Two halves, because the README conflates two different things in one table
  cell: a life PATH (born India, raised NJ, college Illinois, semester
  Singapore, now Chicago) and a LIST of countries visited.

  STATUS: interim. The countries were FX:flowing-menu rows — one full-width row
  each, which was a large part of why this page ran long. They are a compact
  grid for now, and the per-country notes are parked (the data is still in
  more.ts, only the rendering is commented out). Flagged by the user as
  "a bit of a problem ... let's talk further on this later", so this is
  deliberately the small version, not the final design.

  FlowingMenu is left in src/components/fx/ and is currently unused; restoring
  the row treatment is swapping the grid below back for it.

  Data: more.travel in src/constants/more.ts
-->
<script lang="ts">
  import { theme } from "../../lib/stores";
  import type { TravelStop, TravelCountry } from "../../types";

  export let path: TravelStop[] = [];
  export let countries: TravelCountry[] = [];
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
  <div class="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
    {#each countries as country}
      <div
        class="flex flex-col items-center gap-1 rounded-lg border {$theme.border.light} {$theme.bg.secondary} px-2 py-2.5 text-center"
        title={country.note}
      >
        <span class="text-xl leading-none">{country.flag}</span>
        <span class="text-[11px] leading-tight {$theme.text.secondary}">{country.name}</span>
        <!-- Note deliberately not rendered for now — see the header comment.
             {country.note} -->
      </div>
    {/each}
  </div>
</div>
