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
  /**
   * The page places the life-path stepper and the country grid in different
   * cells: the path stays full width, the countries take the left half beside
   * the interests wheel. ("The countries should take up the left side")
   */
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
  <!-- justify-center so the stepper sits under the centred heading rather than
       hugging the left edge. ("The left side should be centered.") -->
  <!--
    UNIFORM BOXES ON ONE LINE, ALWAYS.
    ("make the 'where I've been' section a little wider and more elegant. All
    boxes same size and text a little bigger and arrow a little bigger", then
    "smaller window means the whole row shrinks proportionally")

    Every stop is the same fixed width, so the row reads as equal steps rather
    than the ragged strip it started as — "India" used to be half the width of
    "Singapore".

    It used to fight a width budget: five boxes plus four arrows need 804px and
    the column only gives 681px at 1280, so it wrapped and left a connector
    arrow dangling at a line end. That was patched twice, with a media-query
    step-down and then a measured arrow-hiding action. Both are gone — use:fitRow
    scales the single line to whatever width exists, so there is no budget to
    exceed and no wrap to clean up after.

    whitespace-nowrap on the note still matters: without it a long note could
    wrap INSIDE its box and make that one box a line taller than the rest,
    which breaks the uniformity all of this is for.
  -->
  <!--
    The wrapper is the measuring box; the row inside is scaled to fit it.
    flex-nowrap + w-max means the row keeps its natural single-line width and
    use:fitRow shrinks the whole thing — boxes, type, gaps, arrows — by one
    factor. ("smaller window means the whole row shrinks proportionally")
  -->
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
  <!-- /FX:flowing-menu -->
  {/if}
</div>

<style>
  /*
    NO SIZE MEDIA QUERY HERE ANY MORE.

    There used to be a step-down below 1439px that shrank the boxes, the note
    type and the gaps so the row could stay on one line a bit longer, and it
    still wrapped below ~1300px. use:fitRow replaces both behaviours with one
    continuous scale, so a discrete jump would only fight it — and the whole
    point of the note ("smaller window means the whole row shrinks
    proportionally") is that there is no jump.
  */
</style>
