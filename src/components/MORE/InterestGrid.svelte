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
  import { OptionWheel, FlipCard } from "../fx";
  import type { Interest } from "../../types";

  export let interests: Interest[] = [];

  let active = 0;

  /*
    Each FlipCard owns its own flipped state — deliberately no two-way binding
    from here.

    The first attempt kept a `flipped` record in this component and did
    bind:flipped={flipped[index]} with a reactive reset on `active`. Twelve
    cards writing back into one object, while a reactive statement reassigned
    that same object, put Svelte into an update loop that hung the page.

    Cards are wrapped in {#key active} instead: rotating the wheel remounts
    them, which resets any flip, with no shared mutable state to loop through.
  */
</script>

<!-- Vertical, because it sits in a narrow right-hand column beside the
     countries. ("Make the option wheel verticle and keep it to the right
     side.") spreadX is the per-step distance along whichever axis is active.

     visible=2 shows five cards. ("Option while should have bigger hieight and
     more visible non-selected rows (5 maybe)")

     trackHeight MUST be >= cardHeight + 2*visible*spreadX, here
     118 + 2*2*92 = 486. Get it wrong and the outer cards spill past the track
     onto whatever sits below. -->
<OptionWheel
  items={interests}
  bind:active
  orientation="vertical"
  visible={2}
  spreadX={92}
  dip={16}
  cardWidth={340}
  cardHeight={118}
  trackHeight={486}
  label="Interests"
  let:item
  let:index
  let:isActive
>
  <!-- FX:flip-card — click, not hover -->
  {#key active}
  <FlipCard class="h-[116px]" trigger="click" duration={480}>
    <div
      slot="front"
      class="flex h-full flex-row items-center justify-start gap-3 rounded-xl border {isActive
        ? $theme.accent.cyan.hover.border
        : $theme.accent.cyan.border} {$theme.bg.secondary} px-4 text-left shadow-lg"
    >
      <span class="text-3xl leading-none">{item.emoji}</span>
      <span class="min-w-0">
        <span class="block text-base font-semibold leading-tight {$theme.text.secondary}">
          {item.name}
        </span>
        {#if isActive}
          <span class="meta-label mt-0.5 block text-[8px] {$theme.accent.cyan.text}">
            Click to flip
          </span>
        {/if}
      </span>
    </div>

    <div
      slot="back"
      class="flex h-full flex-col justify-center rounded-xl border {$theme.accent.cyan.hover.border} {$theme.bg.cardElevated} px-4 text-left shadow-lg"
    >
      <span class="meta-label text-[8px] {$theme.accent.cyan.text}">{item.name}</span>
      <p class="mt-1 text-xs leading-snug {$theme.text.secondary}">{item.detail}</p>
    </div>
  </FlipCard>
  {/key}
  <!-- /FX:flip-card -->
</OptionWheel>
