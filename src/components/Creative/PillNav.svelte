<!--
  FX: pill-nav
  Source: https://reactbits.dev/components/pill-nav (React) — reimplemented in Svelte

  Pill buttons where a circular fill swells up from the bottom edge on hover
  while the label rolls over to its inverted twin. The active pill sits in the
  filled state permanently.

  Used by: src/components/PORTFOLIO/CategoryFilter.svelte (project categories)

  Tunables:
    items       string[] of labels
    selected    bound; the active label
    ariaLabel   accessible name for the group

  Keeps CategoryFilter's existing `bind:selectedCategory` contract, so the
  portfolio page is unchanged.

  The label is rendered twice — once in the resting color, once in the
  on-fill color — and the pair is translated as a unit so the swap lands
  exactly as the fill arrives. A single label doing a color transition reads
  as a fade; the roll is what makes it feel like the fill is carrying it.

  Colors come from the theme's filter/accent ramps, so light and dark both
  work without a second palette here.
-->
<script lang="ts">
  import { theme } from "../../lib/stores";

  export let items: string[] = [];
  export let selected: string;
  export let ariaLabel = "Filter";
</script>

<div
  class="fx-pill-nav inline-flex flex-wrap gap-2 justify-center {$theme.accent.indigo.bg} border-[1.6px] {$theme.accent.indigo.border} rounded-xl p-2 shadow-2xl {$theme.accent.indigo.glow}"
  role="group"
  aria-label={ariaLabel}
>
  {#each items as item}
    <button
      type="button"
      class="fx-pill {selected === item ? 'is-active' : ''} {$theme.accent.indigo.text}"
      aria-pressed={selected === item}
      on:click={() => (selected = item)}
    >
      <!-- The swelling circle. Sized past the pill's own width so its curve
           reads as a rising tide rather than a growing dot. -->
      <span class="fx-pill-fill {$theme.filter.active.bg}" aria-hidden="true" />

      <span class="fx-pill-roll">
        <span class="fx-pill-face">{item}</span>
        <span class="fx-pill-face fx-pill-face-alt {$theme.filter.active.text}">{item}</span>
      </span>
    </button>
  {/each}
</div>

<style>
  .fx-pill {
    font-family: "Chivo", "Space Grotesk", Inter, sans-serif;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    line-height: 1.25rem;
    background: transparent;
    border: 1.6px solid transparent;
    cursor: pointer;
    transition: border-color 250ms ease, transform 250ms ease;
  }

  .fx-pill-fill {
    position: absolute;
    left: 50%;
    bottom: 0;
    z-index: -1;
    /* Wider than the pill so the circle's edge stays flat-ish as it rises. */
    width: 150%;
    aspect-ratio: 1 / 1;
    border-radius: 9999px;
    transform: translate(-50%, 78%) scale(0.35);
    opacity: 0;
    transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease;
  }

  .fx-pill:hover .fx-pill-fill,
  .fx-pill:focus-visible .fx-pill-fill,
  .fx-pill.is-active .fx-pill-fill {
    transform: translate(-50%, 26%) scale(1);
    opacity: 1;
  }

  /*
    Two stacked copies of the label. The viewport is one line tall and the pair
    slides up by exactly one line, so the resting face exits as the inverted
    face arrives.
  */
  .fx-pill-roll {
    display: block;
    position: relative;
    height: 1.25rem;
    overflow: hidden;
  }

  .fx-pill-face {
    display: block;
    height: 1.25rem;
    transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
    transform: translateY(0);
  }

  .fx-pill:hover .fx-pill-face,
  .fx-pill:focus-visible .fx-pill-face,
  .fx-pill.is-active .fx-pill-face {
    transform: translateY(-1.25rem);
  }

  .fx-pill.is-active {
    transform: scale(1.04);
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-pill,
    .fx-pill-fill,
    .fx-pill-face {
      transition: none;
    }
  }
</style>
