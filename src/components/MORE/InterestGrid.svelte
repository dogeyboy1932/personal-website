<script lang="ts">
  import { theme } from "../../constants/_theme";
  import { OptionWheel, FlipCard } from "../Creative";
  import type { Interest } from "../../types";

  export let interests: Interest[] = [];

  let active = 0;

    /* CAVEAT: cards own their flip state and are wrapped in {#key active}. */
</script>

<OptionWheel
  items={interests}
  bind:active
  orientation="vertical"
  visible={2}
  spreadX={94}
  dip={14}
  cardWidth={324}
  cardHeight={148}
  trackHeight={424}
  label="Interests"
  hint="Click to flip"
  let:item
  let:index
  let:isActive
>
    <!-- FX:flip-card — click, not hover. — CAVEAT: bg is theme.bg.flipCard, near-opaque. -->
  {#key active}
  <FlipCard class="h-[148px]" trigger="click" duration={480}>
    <div
      slot="front"
      class="flex h-full flex-row items-center justify-start gap-3 rounded-xl border {isActive
        ? $theme.accent.cyan.hover.border
        : $theme.accent.cyan.border} {$theme.bg.flipCard} px-4 text-left shadow-lg"
    >
      <span class="text-5xl leading-none">{item.emoji}</span>
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
      <p class="text-base leading-snug {$theme.text.secondary}">{item.detail}</p>
    </div>
  </FlipCard>
  {/key}
</OptionWheel>
