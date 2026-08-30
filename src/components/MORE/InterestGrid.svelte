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

<OptionWheel
  items={interests}
  bind:active
  visible={3}
  spreadX={128}
  dip={14}
  cardWidth={152}
  label="Interests"
  let:item
  let:index
  let:isActive
>
  <!-- FX:flip-card — click, not hover -->
  {#key active}
  <FlipCard class="h-[150px]" trigger="click" duration={480}>
    <div
      slot="front"
      class="flex h-full flex-col items-center justify-center gap-2 rounded-xl border {isActive
        ? $theme.accent.cyan.hover.border
        : $theme.accent.cyan.border} {$theme.bg.secondary} px-3 text-center shadow-lg"
    >
      <span class="text-3xl leading-none">{item.emoji}</span>
      <span class="text-xs font-semibold leading-tight {$theme.text.secondary}">
        {item.name}
      </span>
      {#if isActive}
        <span class="meta-label text-[8px] {$theme.accent.cyan.text}">Click to flip</span>
      {/if}
    </div>

    <div
      slot="back"
      class="flex h-full flex-col justify-center rounded-xl border {$theme.accent.cyan.hover.border} {$theme.bg.cardElevated} px-3 text-left shadow-lg"
    >
      <span class="meta-label text-[8px] {$theme.accent.cyan.text}">{item.name}</span>
      <p class="mt-1.5 text-[10px] leading-snug {$theme.text.secondary}">{item.detail}</p>
    </div>
  </FlipCard>
  {/key}
  <!-- /FX:flip-card -->
</OptionWheel>
