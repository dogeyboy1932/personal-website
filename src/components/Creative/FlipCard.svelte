<!-- FX: flip-card — A card that rotates on its Y axis to reveal a back face. -->
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

    /* focus-visible is scoped to the hoverable variant too: with trigger="click" the card must only
     turn on an actual click, or tabbing through a wheel of them flips each one in passing. */
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
