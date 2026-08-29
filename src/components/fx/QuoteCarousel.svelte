<!--
  FX: quote-carousel
  Source: https://reactbits.dev/components/carousel (React) — reimplemented in Svelte

  Brief: "Let's have more than one quote. Use this carousel to scroll. And then
  periodically it should shuffle on its own without manual movement."

  So there are two distinct behaviours, and they are not the same thing:
    - autoplay: advances to the next quote on a timer (the "without manual
      movement" part)
    - shuffle: randomises the ORDER once per page load, so the sequence isn't
      identical on every visit

  Used by: src/components/HOME/HeroImage.svelte

  Tunables:
    quotes      [{ quote, voice }]
    interval    ms between automatic advances       default 7000
    shuffle     randomise order on mount            default true
    pauseOnHover                                    default true

  Built on the embla-carousel-svelte already in the project rather than pulling
  a new dependency. Autoplay is a plain interval instead of the
  embla-carousel-autoplay plugin: the installed plugin (8.0.0-rc23) is a
  different release candidate from the core (8.0.0-rc18) and the plugin API
  moved between those RCs.

  All slides render at the same height (the tallest quote) so the card doesn't
  jump as it cycles.
-->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import type { EmblaCarouselType } from "embla-carousel";
  import { theme } from "../../lib/stores";

  export let quotes: { quote: string; voice: string }[] = [];
  export let interval = 7000;
  export let shuffle = true;
  export let pauseOnHover = true;
  // Root is a plain <div>: <figcaption> is only valid as a direct child of
  // <figure>, and Svelte cannot verify that across a component boundary, so
  // the figcaption stays in HeroImage and this renders inside it.
  let klass = "";
  export { klass as class };

  let api: EmblaCarouselType | undefined;
  let selected = 0;
  let timer: ReturnType<typeof setInterval> | undefined;
  let paused = false;

  // Shuffled once, at mount — not reactively, or every store update would
  // reorder the quotes mid-view.
  let ordered: { quote: string; voice: string }[] = quotes;

  const reducedMotion = () =>
    browser && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  onMount(() => {
    if (shuffle && quotes.length > 1) {
      const copy = [...quotes];
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
  class="fx-quote-carousel {klass} relative p-4 rounded-2xl border {$theme.border.accent} {$theme.bg.backdrop} backdrop-blur-md shadow-lg"
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
      {#each ordered as item}
        <div class="min-w-0 shrink-0 grow-0 basis-full">
          <blockquote class="flex h-full flex-col justify-between">
            <p class="text-md italic {$theme.text.primary} leading-snug">{item.quote}</p>
            <p
              class="mt-3 text-sm {$theme.accent.indigo.text} font-bold uppercase tracking-widest text-right"
            >
              {item.voice}
            </p>
          </blockquote>
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
          aria-label={`Show quote ${i + 1}`}
          aria-current={selected === i}
        />
      {/each}
    </div>
  {/if}
</div>
