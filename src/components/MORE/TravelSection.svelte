<!-- /more section: travel. -->
<script lang="ts">
  import { theme } from "../../lib/stores";
  import { FlowingMenu } from "../Creative";
  import type { TravelStop, TravelCountry } from "../../types";

  export let path: TravelStop[] = [];
  export let countries: TravelCountry[] = [];
    /** The page places the life-path stepper and the country grid in different cells: the path stays
     full width, the countries take the left half beside the interests wheel. */
  export let show: "all" | "path" | "countries" = "all";

  // Scales the whole row down so it never wraps — see the action's note.
  import { fitRow } from "../../lib/actions/fitRow";
  /** Columns for the country grid; fewer when it sits in a half-width cell. */
  export let columns = 7;

  $: rows = countries.map((c) => ({
    key: c.name,
    label: c.name,
    note: c.note,
    badge: c.flag,
  }));
</script>

<div class="space-y-4">
  {#if show !== "countries"}
  <!-- ===== Life path stepper ===== -->
  <!-- Uniform fixed-width stops; use:fitRow scales the whole row to fit so it
       never wraps. CAVEAT: whitespace-nowrap on the note is load-bearing — a
       wrapped note would make one box a line taller and break the uniformity. -->
  <div class="travel-fit flex items-start justify-center" use:fitRow>
    <div class="travel-row flex w-max flex-nowrap items-stretch justify-center gap-2">
    {#each path as stop, i}
      {#if i > 0}
        <span aria-hidden="true" class="travel-arrow self-center text-xl {$theme.text.dim}"
          >&rarr;</span
        >
      {/if}
      <div
        class="travel-stop flex h-full w-[8.25rem] flex-col items-center justify-center rounded-xl border {$theme.border.default} {$theme.bg.secondary} px-2.5 py-2.5 text-center transition-colors duration-300 hover:border-warm/50"
      >
        <div class="text-base font-semibold leading-tight {$theme.text.secondary}">
          {stop.place}
        </div>
        <!-- tracking-[0.1em] overrides meta-label's 0.18em: utilities are
             emitted after the components layer, so the tighter value wins. -->
        <div
          class="travel-note meta-label mt-0.5 whitespace-nowrap text-[10px] tracking-[0.1em] {$theme.accent.orange.text}"
        >
          {stop.note}
        </div>
      </div>
    {/each}
    </div>
  </div>

  {/if}

  {#if show !== "path"}
  <!-- ===== Countries ===== -->
  <!-- FX:flowing-menu (grid mode) -->
  <FlowingMenu items={rows} {columns} rowHeight="4.1rem" marquee={11} />
  <!-- /Creative:flowing-menu -->
  {/if}
</div>

<style>
</style>
