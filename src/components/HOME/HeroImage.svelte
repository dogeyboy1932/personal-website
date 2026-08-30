<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";

  // FX:quote-carousel — was a single `quote`/`voice` pair
  import { QuoteCarousel } from "../Creative";

  export let src: string;
  export let alt: string;
  export let quotes: { quote: string; voice: string }[] = [];
</script>

<figure class="group relative flex w-full min-w-0 max-w-full flex-col mx-auto" in:fly={{ x: -24, duration: 400 }}>
  <!-- Image container -->
  <div class="relative overflow-hidden rounded-xl border {$theme.border.accent} {$theme.bg.cardSolid} shadow-2xl">
    <img
      {src}
      {alt}
      class="h-full w-full max-w-full object-cover transition duration-1000 group-hover:scale-105 group-hover:rotate-1"
      loading="lazy"
    />
  </div>

  <!-- FX:quote-carousel — autoplaying, shuffled on load. The carousel owns the
       timing; the quote markup and the card chrome are ours. -->
  <figcaption class="mt-2">
    <QuoteCarousel
      items={quotes}
      interval={7000}
      shuffle
      class="rounded-2xl border p-4 shadow-lg backdrop-blur-md {$theme.border.accent} {$theme.bg.backdrop}"
      let:item
    >
      <blockquote class="flex h-full flex-col justify-between">
        <p class="text-md italic leading-snug {$theme.text.primary}">{item.quote}</p>
        <p
          class="mt-3 text-right text-sm font-bold uppercase tracking-widest {$theme.accent.indigo.text}"
        >
          {item.voice}
        </p>
      </blockquote>
    </QuoteCarousel>
  </figcaption>
  <!-- /FX:quote-carousel -->
</figure>
