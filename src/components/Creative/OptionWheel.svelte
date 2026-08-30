<!-- FX: option-wheel — options fan along an arc, one in focus, neighbours dimming. — Rotate with
     the arrows, arrow keys, a drag, or by clicking a neighbour. -->
<script lang="ts">

  type Item = $$Generic;

  export let items: Item[] = [];
  export let active = 0;
  export let visible = 3;
  export let spreadX = 132;
  export let dip = 16;
  export let cardWidth = 150;
  export let label = "Options";
  /** Shown beside the counter in the right-hand pocket. */
  export let hint = "";
    /** "horizontal" fans left-to-right; "vertical" stacks top-to-bottom with the arc bulging sideways. */
  export let orientation: "horizontal" | "vertical" = "horizontal";
    /** In vertical mode this MUST cover the whole fan — cardHeight + 2 * visible * spreadX — or the
     outer cards spill out of the track and collide with the controls beneath it. */
  export let trackHeight = 190;
  /** Card height; only needed to centre slots in vertical mode. */
  export let cardHeight = 120;

  $: count = items.length;

    /* CAVEAT: must be a reactive statement, not a function called from the template. */
  $: offsets = items.map((_, index) => {
    const n = items.length;
    if (!n) return 0;
    let d = index - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  });

  const step = (dir: number) => {
    if (!count) return;
    active = (active + dir + count) % count;
  };

  /* No tabindex: role="group" is not interactive. Keydown bubbles from the
     buttons inside, so arrow keys work whenever focus is in the wheel. */
  function onKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  }

  /* ---- drag to spin --------------------------------------------------
     CAVEAT: capture is taken lazily, on the first move past DRAG_THRESHOLD.
     While a pointer is captured the browser dispatches the CLICK at the
     capturing element, so capturing on pointerdown ate every click and the
     cards stopped flipping. */
  const DRAG_THRESHOLD = 6;

  let pointerDown = false;
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let startActive = 0;
  let capturedOn: HTMLElement | null = null;

  function onPointerDown(event: PointerEvent) {
    pointerDown = true;
    dragging = false;
    startX = event.clientX;
    startY = event.clientY;
    startActive = active;
    // Deliberately NO setPointerCapture here — see the note above.
  }

  function onPointerMove(event: PointerEvent) {
    if (!pointerDown || !count) return;

    const delta =
      orientation === "vertical" ? startY - event.clientY : startX - event.clientX;

    if (!dragging) {
      if (Math.abs(delta) < DRAG_THRESHOLD) return;
      dragging = true;
      const el = event.currentTarget as HTMLElement;
      el?.setPointerCapture?.(event.pointerId);
      capturedOn = el;
    }

    // One card per step of travel, so the wheel tracks the pointer 1:1.
    const moved = Math.round(delta / spreadX);
    active = ((startActive + moved) % count + count) % count;
  }

  function endDrag(event?: PointerEvent) {
    if (capturedOn && event) {
      try {
        capturedOn.releasePointerCapture(event.pointerId);
      } catch {
        /* already released, or a pointer id the element never held */
      }
    }
    capturedOn = null;
    pointerDown = false;
    dragging = false;
  }

  /* ---- scroll to rotate ----------------------------------------------
     CAVEAT: bound to the TRACK, which does not move. Wheel gestures are
     LATCHED — the browser picks a target when the gesture starts. Binding to
     the cards let them animate out from under the cursor, handing the rest of
     the gesture to the document and scrolling the page. */
    /* Px of accumulated scroll per step. 28 spun the wheel several cards for one flick of a trackpad;
     85 is roughly one notch of a mouse wheel (deltaY 100) or a deliberate trackpad swipe. */
  const WHEEL_THRESHOLD = 85;
  let wheelAcc = 0;

  function onWheel(event: WheelEvent) {
    if (!count) return;
    event.preventDefault();
    wheelAcc += event.deltaY;
    while (Math.abs(wheelAcc) >= WHEEL_THRESHOLD) {
      step(wheelAcc > 0 ? 1 : -1);
      wheelAcc -= Math.sign(wheelAcc) * WHEEL_THRESHOLD;
    }
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  class="fx-option-wheel"
  style="--ow-card: {cardWidth}px; --ow-card-h: {cardHeight}px;"
  role="group"
  aria-label={label}
  on:keydown={onKeydown}
>
    <!-- Scroll and drag are bound HERE. -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="fx-ow-track"
    class:is-dragging={dragging}
    class:is-vertical={orientation === "vertical"}
    style="height: {trackHeight}px;"
    on:wheel|nonpassive={onWheel}
    on:pointerdown={onPointerDown}
    on:pointermove={onPointerMove}
    on:pointerup={endDrag}
    on:pointerleave={endDrag}
    on:pointercancel={endDrag}
  >
    {#each items as item, i}
      {@const offset = offsets[i] ?? 0}
      {@const shown = Math.abs(offset) <= visible}
      <div
        class="fx-ow-slot"
        class:is-hidden={!shown}
        class:is-active={offset === 0}
        style="
          --ow-x: {orientation === 'vertical' ? Math.abs(offset) * dip : offset * spreadX}px;
          --ow-y: {orientation === 'vertical' ? offset * spreadX : Math.abs(offset) * dip}px;
          --ow-scale: {Math.max(0.6, 1 - Math.abs(offset) * 0.15)};
          --ow-rot: {orientation === 'vertical' ? 0 : offset * 6}deg;
          --ow-fade: {offset === 0 ? 1 : Math.max(0.25, 1 - Math.abs(offset) * 0.28)};
          z-index: {100 - Math.abs(offset)};
        "
      >
        <!-- Neighbours are a shortcut to that option; the centre card is left
             alone so the slot's own click can't fight the card's flip. -->
        {#if offset !== 0 && shown}
          <button
            type="button"
            class="fx-ow-jump"
            on:click={() => (active = i)}
            aria-label="Show option {i + 1}"
          />
        {/if}
        <slot {item} index={i} isActive={offset === 0} />
      </div>
    {/each}
  </div>

    <!-- Counter and hint sit in the empty pocket to the RIGHT of the fan, not under it. -->
  <div class="fx-ow-aside">
    <span class="fx-ow-count">{count ? active + 1 : 0} / {count}</span>
    {#if hint}
      <span class="fx-ow-hint">{hint}</span>
    {/if}
  </div>
</div>

<style>
    /* A flex ROW: the fan on the left, the counter/hint pocket on the right. */
  .fx-option-wheel {
    position: relative;
    display: flex;
    align-items: center;
    /* Right-aligned, so the fan sits as far right in its column as the pocket
       allows. ("move option wheel closer to the right") */
    justify-content: flex-end;
    gap: 0.5rem;
    outline: none;
    touch-action: pan-y;
    user-select: none;
        /* The fanned neighbours sit up to ~3 card-widths either side of centre and pushed 113px of
       horizontal scroll onto the page. */
    overflow: hidden;
  }

    /* FLUID, capped at the nominal card width. */
  .fx-ow-track {
    position: relative;
    cursor: grab;
    /* Still the scroll-capture region, and deliberately NOT the cards, which
       move — see the note on onWheel. */
    flex: 1 1 auto;
    min-width: 0;
    max-width: var(--ow-card);
  }

  .is-dragging {
    cursor: grabbing;
  }

  /* Vertical: slots are centred on BOTH axes, since the step now runs down the
     Y axis and the arc bulges on X. */
  .is-vertical .fx-ow-slot {
    top: 50%;
    margin-top: calc(var(--ow-card-h, 120px) / -2);
  }

  /* Sized by the track's own edges rather than by --ow-card, so the cards
     follow the track when it is narrower than a nominal card. */
  .fx-ow-slot {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: translate3d(var(--ow-x), var(--ow-y), 0) scale(var(--ow-scale))
      rotate(var(--ow-rot));
    opacity: var(--ow-fade);
    transition:
      transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 300ms ease;
  }

  /* Kept in the DOM but inert, so the wheel's contents stay one stable list and
     items don't remount as they rotate through the window. */
  .is-hidden {
    opacity: 0;
    pointer-events: none;
  }

  /* Covers a neighbour card so clicking it rotates the wheel instead of
     flipping a card the reader isn't looking at. */
  .fx-ow-jump {
    position: absolute;
    inset: 0;
    z-index: 5;
    cursor: pointer;
    background: transparent;
    border: 0;
  }

  /* The right-hand pocket. min-width is what guarantees the hint never wraps
     or clips no matter how wide the cards get. */
  .fx-ow-aside {
    display: flex;
        /* 0 0 auto, not 1 1 auto: the pocket takes only what the text needs so the leftover goes to
       pushing the fan rightward, rather than the pocket absorbing it. */
    flex: 0 0 auto;
        /* 6rem, down from 7rem. */
    min-width: 6rem;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.45rem;
    text-align: right;
    pointer-events: none;
  }

  /* Bigger, on request: "Make the text right of the wheel bigger...its hard to
     see." */
  .fx-ow-count {
    font-size: 1.9rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: rgb(var(--brand));
  }

  /* Same colour as the counter, on request. */
  /* One line, never wrapped. ("Click to flip should be in one row...no wraps
     should occur.") */
  .fx-ow-hint {
    font-size: 0.74rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgb(var(--brand));
    opacity: 0.8;
    white-space: nowrap;
    line-height: 1.3;
  }

    /* Mobile step-down. */
  @media (max-width: 520px) {
    .fx-ow-track {
      max-width: 200px;
    }

    .fx-ow-aside {
      min-width: 0;
    }

        /* The hint is nowrap by requirement, so its own width is part of the row's min-content. */
    .fx-ow-hint {
      font-size: 0.6rem;
      letter-spacing: 0.06em;
    }

    .fx-ow-count {
      font-size: 1.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-ow-slot {
      transition: none;
    }
  }
</style>
