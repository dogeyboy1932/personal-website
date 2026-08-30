<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";

  // FX:quote-carousel — was a single `quote`/`voice` pair
  import { QuoteCarousel } from "../fx";

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

  <!-- Quote caption -->
  <!-- FX:quote-carousel — autoplaying, shuffled on load -->
  <figcaption class="mt-2">
    <QuoteCarousel {quotes} interval={7000} shuffle />
  </figcaption>
  <!-- /FX:quote-carousel -->
</figure>
