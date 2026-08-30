<!--
  FX: flip-card
  Source: https://animate-ui.com/docs/components/community/flip-card (React) — reimplemented in Svelte

  A card that rotates on its Y axis to reveal a back face. Routed here per the
  brief's instruction that flip-cards suit "information stuff" — the front stays
  scannable, the detail is on demand, which is exactly the "minimal amount of
  context" the /more page was asked for.

  Used by: src/components/MORE/InterestGrid.svelte

  Tunables:
    duration  ms of the flip                          default 550
    trigger   "hover" | "click" | "both"              default "both"
    flipped   bound; force the state from outside

  Accessibility: the card is a real <button> so it is tabbable and flips on
  Enter/Space, and the back face is aria-hidden while it faces away so screen
  readers don't read both sides at once. Touch devices get no hover, hence
  "both" as the default trigger.

  `transform-style: preserve-3d` with `backface-visibility: hidden` on each
  face is what makes this one element rather than a crossfade of two.
-->
<script lang="ts">
  export let duration = 550;
  export let trigger: "hover" | "click" | "both" = "both";
  export let flipped = false;
  let klass = "";
  export { klass as class };

  $: hoverable = trigger === "hover" || trigger === "both";
  $: clickable = trigger === "click" || trigger === "both";

  function toggle() {
    if (clickable) flipped = !flipped;
  }
</script>

<button
  type="button"
  class="fx-flip-card {klass}"
  class:is-flipped={flipped}
  class:is-hoverable={hoverable}
  style="--fc-duration: {duration}ms;"
  aria-pressed={flipped}
  on:click={toggle}
>
  <span class="fx-fc-inner">
    <span class="fx-fc-face fx-fc-front" aria-hidden={flipped}>
      <slot name="front" />
    </span>
    <span class="fx-fc-face fx-fc-back" aria-hidden={!flipped}>
      <slot name="back" />
    </span>
  </span>
</button>

<style>
  .fx-flip-card {
    display: block;
    width: 100%;
    /* Perspective on the outer element, rotation on the inner one — putting
       both on the same element flattens the 3D. */
    perspective: 1200px;
    background: none;
    border: 0;
    padding: 0;
    text-align: left;
    cursor: pointer;
  }

  .fx-fc-inner {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform var(--fc-duration) cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* focus-visible is scoped to the hoverable variant too: with trigger="click"
     the card must only turn on an actual click, or tabbing through a wheel of
     them flips each one in passing. */
  .fx-flip-card.is-flipped .fx-fc-inner,
  .fx-flip-card.is-hoverable:hover .fx-fc-inner,
  .fx-flip-card.is-hoverable:focus-visible .fx-fc-inner {
    transform: rotateY(180deg);
  }

  .fx-fc-face {
    display: block;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    height: 100%;
    width: 100%;
  }

  /* The back is stacked on the front and pre-rotated, so the inner element's
     180deg turn brings it to face the viewer. */
  .fx-fc-back {
    position: absolute;
    inset: 0;
    transform: rotateY(180deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-fc-inner {
      transition: none;
    }
  }
</style>
