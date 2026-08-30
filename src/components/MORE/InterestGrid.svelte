<!--
  /more section: interests.

  FX:option-wheel of FX:flip-card. Options fan along an arc with one in focus;
  clicking the focused card flips it to the detail.

  Replaces the drift wall on request ("I think drift wall takes up so much
  space... Each option can be a card that we can click to flip. I don't like
  the hover message idea...and wanna keep flip cards.") — so the shared hover
  caption is gone and the flip is back, on CLICK rather than hover.

  Only a window of the wheel is drawn, not the full circle: a literal wheel is
  as tall as its diameter, which would undo the compaction this is for.

  Data: more.interests in src/constants/more.ts
-->
<script lang="ts">
  import { theme } from "../../lib/stores";
  import { OptionWheel, FlipCard } from "../Creative";
  import type { Interest } from "../../types";

  export let interests: Interest[] = [];

  let active = 0;

  /* CAVEAT: cards own their flip state and are wrapped in {#key active}.
     Binding `flipped` into a shared object here put Svelte in an update loop
     that hung the page. */
</script>

<!-- Vertical, because it sits in a narrow right-hand column beside the
     countries. ("Make the option wheel verticle and keep it to the right
     side.") spreadX is the per-step distance along whichever axis is active.

     visible=2 shows five cards. ("Option while should have bigger hieight and
     more visible non-selected rows (5 maybe)")

     trackHeight MUST be >= cardHeight + 2*visible*spreadX, here
     148 + 2*2*94 = 524. Get it wrong and the outer cards spill past the track
     onto whatever sits below.

     Scaled UP on request — "The cards are actually a bit too small. Enlarge the
     whole wheel component." The column around it got NARROWER at the same time
     ("reduce the width of the right section overall"), which only works because
     the counter/hint pocket is now a declared flex column rather than whatever
     slack was left beside a centred track.

     spreadX (94) is deliberately LESS than cardHeight (148): the cards overlap
     by 54px, which both reads as a stack and leaves no bare gap between them
     for a scroll to fall through.

     CARD WIDTH IS COUPLED TO THE HINT TEXT. The fan and the counter/hint pocket
     share one flex row inside a fixed-width column, and the pocket is
     flex:0 0 auto — it sizes to its text and never shrinks. cardWidth 324 is
     what is left after the current hint ("Click to flip", 96px) plus the 8px
     gap. Lengthening that string takes the difference straight out of the
     cards: the wheel would exceed the column and be silently clipped by
     .fx-option-wheel's overflow:hidden rather than erroring. Change both
     together.

     ENLARGED AGAIN ("make the card bigger on option wheel"), 296x126 -> 324x148.
     The width came from two places, both measured rather than guessed: 21px of
     unused slack in the column, and 16px the counter/hint pocket was reserving
     above the hint's actual 96px scrollWidth. Height is free — at 524 the track
     is still shorter than the 555px left column, so the section does not grow
     and the two halves stay level. -->
<OptionWheel
  items={interests}
  bind:active
  orientation="vertical"
  visible={2}
  spreadX={94}
  dip={14}
  cardWidth={324}
  cardHeight={148}
  trackHeight={524}
  label="Interests"
  hint="Click to flip"
  let:item
  let:index
  let:isActive
>
  <!-- FX:flip-card — click, not hover.
       CAVEAT: bg is theme.bg.flipCard, near-opaque. The card sits on four other
       cards plus an animating canvas, so residual transparency compounds. And
       Tailwind's opacity scale steps by 5 — /92 and /98 emit NO CSS at all. -->
  {#key active}
  <FlipCard class="h-[148px]" trigger="click" duration={480}>
    <div
      slot="front"
      class="flex h-full flex-row items-center justify-start gap-3 rounded-xl border {isActive
        ? $theme.accent.cyan.hover.border
        : $theme.accent.cyan.border} {$theme.bg.flipCard} px-4 text-left shadow-lg"
    >
      <span class="text-5xl leading-none">{item.emoji}</span>
      <!-- No per-card "click to flip": it now lives once, beside the counter.
           ("Instead of click to flip on every card. Put click to flip on the
           right too. smae color text.") -->
      <span class="min-w-0">
        <span class="block text-xl font-semibold leading-tight {$theme.text.secondary}">
          {item.name}
        </span>
      </span>
    </div>

    <div
      slot="back"
      class="flex h-full flex-col justify-center rounded-xl border {$theme.accent.cyan.hover.border} {$theme.bg.flipCard} px-4 text-left shadow-lg"
    >
      <!-- Detail only, no repeated title. ("remove the title and leave just the
           description on the flip card once its flipped") The front face was
           still showing the name a moment earlier and the wheel counter has not
           moved, so the reader already knows which card this is — the label was
           costing a line and a half of the card's height to say nothing new. -->
      <p class="text-base leading-snug {$theme.text.secondary}">{item.detail}</p>
    </div>
  </FlipCard>
  {/key}
  <!-- /Creative:flip-card -->
</OptionWheel>
