<script lang="ts">
  import { theme } from "../../constants/_theme";

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
      class="fx-pill font-display {selected === item ? 'is-active' : ''} {$theme.accent.indigo.text}"
      aria-pressed={selected === item}
      on:click={() => (selected = item)}
    >
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
