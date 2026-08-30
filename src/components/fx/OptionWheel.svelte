<!--
  FX: option-wheel
  Source: https://reactbits.dev/components/option-wheel (React) — reimplemented in Svelte

  Options fan along an arc, one in focus at the front, neighbours falling away
  to either side and dimming with distance. Rotate with the arrows, the arrow
  keys, a drag, or by clicking any visible neighbour.

  Used by: src/components/MORE/InterestGrid.svelte

  Only a WINDOW of the wheel is rendered (`visible` either side of centre)
  rather than the full circle. A literal wheel is as tall as its diameter,
  which is the opposite of the goal here — this keeps the footprint to roughly
  one card plus the arc's dip.

  Tunables:
    items      any[]; rendered through the default slot with let:item
    active     bound; index in focus
    visible    neighbours drawn each side of centre    default 3
    spreadX    px between adjacent cards along the arc default 132
    dip        px the arc drops per step from centre   default 16
    cardWidth  px                                       default 150

  Slot props: item, index, isActive.

  Wrapping is deliberate on the SHORT way round, so stepping from the last item
  to the first slides one place rather than unwinding the whole set.
-->
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
  /**
   * "horizontal" fans left-to-right; "vertical" stacks top-to-bottom with the
   * arc bulging sideways. Vertical suits a narrow column beside other content.
   */
  export let orientation: "horizontal" | "vertical" = "horizontal";
  /**
   * Track height. In vertical mode this MUST cover the whole fan —
   * cardHeight + 2 * visible * spreadX — or the outer cards spill out of the
   * track and collide with the controls beneath it.
   */
  export let trackHeight = 190;
  /** Card height; only needed to centre slots in vertical mode. */
  export let cardHeight = 120;

  $: count = items.length;

  /**
   * Signed distance from `active` for every item, taking the short way around
   * the wheel.
   *
   * This MUST be a reactive statement, not a function called from the template.
   * It was `{@const offset = offsetOf(i)}` calling a plain function that closed
   * over `active`; Svelte only tracks the identifiers it can see in the
   * expression, so it never knew the const depended on `active` and never
   * recomputed it. The counter and the active-card border updated (those read
   * `active` directly) while every card transform stayed frozen — the wheel
   * highlighted a new card without moving.
   *
   * Referencing `active` and `items` here is what makes the dependency visible.
   */
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

  /*
   * No tabindex on the wrapper: a role="group" is not interactive, so giving it
   * a tab stop is an a11y error. The prev/next buttons inside are already
   * focusable and keydown bubbles from them, so arrow keys work whenever focus
   * is anywhere in the wheel.
   */
  function onKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  }

  /* ---- drag to spin ---------------------------------------------------- */
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let startActive = 0;

  function onPointerDown(event: PointerEvent) {
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    startActive = active;
    /* The handlers live on the CARDS now, so a drag that wanders off the card
       would otherwise stop getting events. Capturing keeps them coming until
       pointerup, wherever the pointer ends up. */
    (event.currentTarget as HTMLElement)?.setPointerCapture?.(event.pointerId);
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging || !count) return;
    // One card per step of travel, so the wheel tracks the pointer 1:1.
    const delta =
      orientation === "vertical" ? startY - event.clientY : startX - event.clientX;
    const moved = Math.round(delta / spreadX);
    active = ((startActive + moved) % count + count) % count;
  }

  const endDrag = () => (dragging = false);

  /* ---- scroll to rotate ------------------------------------------------
     Bound to each visible CARD, not to the track and not to the wrapper.

     Two earlier versions widened and then narrowed the capture BOX and still
     leaked: the track is card-width but full fan height, and the outer cards
     are scaled down to 0.6, so up to ~55px either side of them was bare track
     that still swallowed the page scroll. ("when my cursor doesn't touch a
     card on the wheel, I should not scroll.")

     A card's own hit area is its transformed box, so binding here makes the
     capture region exactly the pixels the cursor can see. Off-window cards are
     pointer-events:none, so they never capture.

     Deltas accumulate against a threshold so a trackpad's many small events
     don't spin it wildly; preventDefault stops the page moving underneath.  */
  const WHEEL_THRESHOLD = 28;
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
  <!--
    The track is just the fan's box now. It carries NO scroll or drag handlers
    — see the note on onWheel: those are on the individual cards, so bare track
    beside a scaled-down card no longer eats the page scroll.
  -->
  <div
    class="fx-ow-track"
    class:is-dragging={dragging}
    class:is-vertical={orientation === "vertical"}
    style="height: {trackHeight}px;"
  >
    {#each items as item, i}
      {@const offset = offsets[i] ?? 0}
      {@const shown = Math.abs(offset) <= visible}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="fx-ow-slot"
        class:is-hidden={!shown}
        class:is-active={offset === 0}
        on:wheel|nonpassive={onWheel}
        on:pointerdown={onPointerDown}
        on:pointermove={onPointerMove}
        on:pointerup={endDrag}
        on:pointercancel={endDrag}
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

  <!--
    Counter and hint sit in the empty pocket to the RIGHT of the fan, not under
    it. ("put the x/11 to the right of the wheel (it can be absolute mounted).
    There is empty space to the right of the wheel and the text can fit into
    that pocket.") Absolute, so they cost no height — which is also what stops
    the section growing when the type gets bigger.
  -->
  <div class="fx-ow-aside">
    <span class="fx-ow-count">{count ? active + 1 : 0} / {count}</span>
    {#if hint}
      <span class="fx-ow-hint">{hint}</span>
    {/if}
  </div>
</div>

<style>
  /*
    A flex ROW: the fan on the left, the counter/hint pocket on the right.

    The aside used to be position:absolute against a centred track, which left
    it whatever slack happened to remain beside the cards — so making the
    counter legible and making the cards bigger were in direct competition, and
    the hint clipped. As a real flex item it gets a declared minimum and the
    cards take the rest.
  */
  .fx-option-wheel {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    outline: none;
    touch-action: pan-y;
    user-select: none;
    /* The fanned neighbours sit up to ~3 card-widths either side of centre and
       pushed 113px of horizontal scroll onto the page. They are already faded
       at that distance, so clipping them is invisible — and cheaper than
       narrowing the fan, which would flatten the arc. */
    overflow: hidden;
  }

  .fx-ow-track {
    position: relative;
    /* No cursor here — the track is inert. Grab lives on the cards. */
    width: var(--ow-card);
    flex: 0 0 auto;
  }

  .fx-ow-slot {
    cursor: grab;
  }

  .is-dragging .fx-ow-slot {
    cursor: grabbing;
  }

  /* Vertical: slots are centred on BOTH axes, since the step now runs down the
     Y axis and the arc bulges on X. */
  .is-vertical .fx-ow-slot {
    top: 50%;
    margin-top: calc(var(--ow-card-h, 120px) / -2);
  }

  .fx-ow-slot {
    position: absolute;
    top: 0;
    left: 50%;
    width: var(--ow-card);
    margin-left: calc(var(--ow-card) / -2);
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
    flex: 1 1 auto;
    min-width: 7.25rem;
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

  @media (prefers-reduced-motion: reduce) {
    .fx-ow-slot {
      transition: none;
    }
  }
</style>
