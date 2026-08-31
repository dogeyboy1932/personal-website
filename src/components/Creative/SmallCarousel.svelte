<script lang="ts" generics="T">
  import { prefersReducedMotion, shuffle as shuffleItems } from "../../lib/utils";
  import { onMount, onDestroy } from "svelte";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import type { EmblaCarouselType } from "embla-carousel";
  import { theme } from "../../constants/_theme";

  export let items: T[] = [];
  export let interval = 7000;
  export let shuffle = true;
  export let pauseOnHover = true;
  let klass = "";
  export { klass as class };

  let api: EmblaCarouselType | undefined;
  let selected = 0;
  let timer: ReturnType<typeof setInterval> | undefined;
  let paused = false;

  let ordered: T[] = items;

  onMount(() => {
    if (shuffle && items.length > 1) ordered = shuffleItems(items);
    if (!prefersReducedMotion()) start();
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
