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
    UNIFORM BOXES. ("make the 'where I've been' section a little wider and more
    elegant. All boxes same size and text a little bigger and arrow a little
    bigger")

    The boxes used to size to their content, so "India" was roughly half the
    width of "Singapore" and the row read as a ragged strip rather than as a
    sequence of equal steps. A fixed w-36 makes every stop the same size, which
    is both the "same size" ask and most of the "more elegant" one — a stepper
    reads as a stepper when the steps match.

    THE ROW MUST STAY ON ONE LINE. The column gives it 833px, and five equal
    boxes plus four arrows plus gaps have to fit inside that. At the obvious
    w-36 (144px, set by "semester at NUS" at meta-label's 0.18em tracking) the
    row needed 864px and Chicago wrapped to a second line — uniform boxes, but
    a broken stepper.

    The width is driven by the widest NOTE, not by any place name, so that is
    where the space was found: tracking 0.18em -> 0.1em and px-3 -> px-2.5 take
    the widest note from 119px to ~110px and the box to 132px. Total 804px,
    inside the budget with room to spare.

    whitespace-nowrap on the note is a hard guarantee, not decoration — if it
    ever wrapped, that one box would grow a line taller than the rest and the
    uniformity this was all for would silently break.

    Any future change to a note string, the font size or the tracking has to be
    re-checked against the 833px budget.

    BUDGET SHRINKS WITH THE VIEWPORT. The left column is 1.85fr of the page, so
    at 1280px it is 746px, not 833, and the full-size row (804px) wrapped there
    — 1280 is an ordinary laptop width, not an edge case. The scoped media query
    below steps the boxes and gaps down under 1400px so the chain stays on one
    line at 1280. Below ~1150 it wraps, which is fine: uniform boxes wrap into
    an orderly 3+2 rather than the ragged strip this replaced.
  -->
  <div class="travel-row flex flex-wrap items-stretch justify-center gap-2">
    {#each path as stop, i}
      <div class="travel-group flex items-stretch gap-2">
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
        {#if i < path.length - 1}
          <!-- self-center rather than sitting on the flex baseline, so the
               arrow tracks the box's middle now that boxes are taller. -->
          <span aria-hidden="true" class="self-center text-xl {$theme.text.dim}">&rarr;</span>
        {/if}
      </div>
    {/each}
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
    Step-down for the life-path stepper below 1400px.

    The row's budget is the left grid column, 1.85fr of the page. MEASURED, not
    estimated — my arithmetic was 40px optimistic and put the cutoff in the
    wrong place on the first try:

      viewport   budget    full-size chain (804px)   stepped chain (728px)
      1536       895       fits                      fits
      1440       833       fits                      fits
      1400       801       wraps by 3px              fits
      1366       767       wraps                     fits
      1280       681       wraps                     wraps

    So the cutoff is 1439px, not 1399px. Below ~1300 the chain cannot stay on
    one line with legible text — fitting 681px would need ~108px boxes and an
    8px note — so it wraps there, which is fine: uniform boxes wrap into an
    orderly 3+2 rather than the ragged strip this replaced.

    A media query rather than Tailwind breakpoint prefixes because the threshold
    comes from the layout's own arithmetic and lands between the default stops:
    `xl` is 1280 (already too narrow) and `2xl` is 1536 (would leave 1280-1535
    broken).

    Note tracking and size come down together, because the box width is driven
    by the widest NOTE ("semester at NUS") rather than by any place name — so
    that string is the only thing that can be traded for width.
  */
  @media (max-width: 1439px) {
    .travel-stop {
      width: 7.5rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

    .travel-note {
      font-size: 9px;
      letter-spacing: 0.06em;
    }

    .travel-row,
    .travel-group {
      gap: 0.375rem;
    }
  }
</style>
