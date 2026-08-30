<!--
  FX: quote-carousel — a single-slide carousel that advances on a timer and can
  shuffle its order once per load. Content comes from the default slot, so this
  owns the BEHAVIOUR and the caller owns the markup.

    <QuoteCarousel items={quotes} let:item>
      <blockquote>{item.quote}</blockquote>
    </QuoteCarousel>

  Slot props: item, index, isActive.

  CAVEAT: autoplay is a plain interval, not embla-carousel-autoplay. The
  installed plugin (8.0.0-rc23) is a different release candidate from the core
  (8.0.0-rc18) and the plugin API moved between them.

  Tunables: items, interval, shuffle, pauseOnHover, class
-->
<script lang="ts" generics="T">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import type { EmblaCarouselType } from "embla-carousel";
  import { theme } from "../../lib/stores";

  export let items: T[] = [];
  export let interval = 7000;
  export let shuffle = true;
  export let pauseOnHover = true;
  /** Chrome is the caller's — pass border/background here. */
  let klass = "";
  export { klass as class };

  let api: EmblaCarouselType | undefined;
  let selected = 0;
  let timer: ReturnType<typeof setInterval> | undefined;
  let paused = false;

  /* Shuffled once at mount, not reactively — a reactive shuffle would reorder
     mid-view on any store update. */
  let ordered: T[] = items;

  const reducedMotion = () =>
    browser && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  onMount(() => {
    if (shuffle && items.length > 1) {
      const copy = [...items];
      // Fisher-Yates.
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      ordered = copy;
    }
    if (!reducedMotion()) start();
  });

  onDestroy(() => stop());

  function start() {
    stop();
    if (ordered.length < 2) return;
    timer = setInterval(() => {
      if (!paused) api?.scrollNext();
    }, interval);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = undefined;
  }

  function onInit(event: CustomEvent<EmblaCarouselType>) {
    api = event.detail;
    const sync = () => (selected = api?.selectedScrollSnap() ?? 0);
    api.on("select", sync);
    api.on("reInit", sync);
    sync();
  }

  function goTo(index: number) {
    api?.scrollTo(index);
    // Restart the clock so a manual pick gets a full dwell, not the remainder.
    start();
  }
</script>

<div
  class="fx-quote-carousel {klass} relative"
  on:pointerenter={() => pauseOnHover && (paused = true)}
  on:pointerleave={() => (paused = false)}
>
  <div
    class="overflow-hidden"
    use:emblaCarouselSvelte={{ options: { loop: true, align: "start" }, plugins: [] }}
    on:emblaInit={onInit}
  >
    <!-- items-stretch keeps every slide the height of the tallest quote, so
         the card doesn't resize as it cycles. -->
    <div class="flex items-stretch">
      {#each ordered as item, i}
        <div class="min-w-0 shrink-0 grow-0 basis-full">
          <slot {item} index={i} isActive={selected === i} />
        </div>
      {/each}
    </div>
  </div>

  {#if ordered.length > 1}
    <div class="mt-3 flex justify-center gap-1.5">
      {#each ordered as _, i}
        <button
          type="button"
          class="h-1.5 rounded-full transition-all duration-300 {selected === i
            ? `w-5 ${$theme.carousel.dot.active}`
            : `w-1.5 ${$theme.carousel.dot.inactive} ${$theme.carousel.dot.hover}`}"
          on:click={() => goTo(i)}
          aria-label={`Show item ${i + 1}`}
          aria-current={selected === i}
        />
      {/each}
    </div>
  {/if}
</div>
