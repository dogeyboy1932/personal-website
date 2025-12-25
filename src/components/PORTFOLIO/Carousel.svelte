<script lang="ts" generics="T extends SvelteComponent">
  import type { EmblaCarouselConfig } from "../../types";
  import { cn } from "../../lib/utils";
  import type { EmblaCarouselType } from "embla-carousel";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import { ArrowLeft, ArrowRight } from "lucide-svelte";
  import type { ComponentProps, ComponentType, SvelteComponent } from "svelte";
  import { breakpoints } from "../../lib/stores";

  export let componentProps: ComponentProps<T>[] = [];
  export let component: ComponentType<T>;
  export let config: EmblaCarouselConfig = {
    options: { loop: true, axis: "x" },
    plugins: [],
  };
  export let carouselItemClass = "";
  export let carouselItemsClass = "";
  
  // Get responsive items per section from store
  $: itemsPerSection = $breakpoints.itemsPerSection;

  let api: EmblaCarouselType | undefined;
  let canScrollNext = componentProps.length > 0;
  let canScrollPrev = false;
  let scrollNext = () => {};
  let scrollPrev = () => {};

  let currentCount = 0;

  const onInit = (event: CustomEvent<EmblaCarouselType>) => {
    api = event.detail;

    api.on("reInit", onSelect);
    api.on("select", onSelect);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      api?.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      api?.scrollNext();
    }
  };

  const onSelect = (api?: EmblaCarouselType) => {
    if (!api) {
      return;
    }
    canScrollPrev = api.canScrollPrev();
    canScrollNext = api.canScrollNext();
    currentCount = api.selectedScrollSnap() + 1;
  };

  const onNext = () => {
    if (!api) return;
    const nextIndex = Math.min(
      (currentSection) * itemsPerSection,
      componentProps.length - 1
    );
    api.scrollTo(nextIndex);
  };

  const onPrev = () => {
    if (!api) return;
    const prevIndex = Math.max(
      (currentSection - 2) * itemsPerSection,
      0
    );
    api.scrollTo(prevIndex);
  };

  $: {
    if (api) {
      canScrollNext = api.canScrollNext();
      canScrollPrev = api.canScrollPrev();
      scrollNext = api.scrollNext;
      scrollPrev = api.scrollPrev;

      currentCount = api.selectedScrollSnap() + 1;
    }
  }

  // Calculate number of sections (pages) based on items per section
  $: totalSections = Math.ceil(componentProps.length / itemsPerSection);
  $: currentSection = Math.ceil(currentCount / itemsPerSection);
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  class="relative"
  role="region"
  aria-roledescription="carousel"
  on:keydown={onKeyDown}
>
  <!-- Main carousel with side arrows -->
  <div class="flex items-center gap-2">
    

    <!-- Carousel content -->
    <div
      class="overflow-hidden flex-1"
      use:emblaCarouselSvelte={config}
      on:emblaInit={onInit}
    >
      <div
        class={cn(
          "flex",
          config?.options.axis === "x" ? "-ml-4" : "-mt-4 flex-col",
          carouselItemsClass
        )}
      >
        {#each componentProps as props}
          <div
            role="group"
            aria-roledescription="slide"
            class={cn(
              "min-w-0 shrink-0 grow-0 basis-full",
              config?.options.axis === "x" ? "pl-4" : "pt-4",
              carouselItemClass
            )}
          >
            <svelte:component this={component} {...props} />
          </div>
        {/each}
      </div>
    </div>

   
   
  </div>




  <div class="flex flex-row gap-6 items-center justify-center mt-5">

   <!-- Left Arrow -->
    <button
      class={cn(
        "flex items-center justify-center h-10 w-10 p-0 border border-slate-700 rounded-full bg-slate-800/50 border-violet-800 hover:bg-violet-500/20 hover:border-violet-500 transition-all shrink-0",
        config?.options.axis === "x" ? "" : "rotate-90"
      )}
      disabled={!canScrollPrev}
      on:click={onPrev}
    >
      <ArrowLeft class="w-5 h-5 text-slate-300" />
      <span class="sr-only">Previous slide</span>
      </button>


  <!-- Indicator bubbles for sections -->
  <div class="flex justify-center gap-2 py-4">
    {#each Array(totalSections) as _, i}
      <button
        class={cn(
          "w-3 h-3 rounded-full transition-all duration-300",
          currentSection === i + 1
            ? "bg-purple-400 scale-110"
            : "bg-slate-600 hover:bg-slate-200/70"
        )}
        on:click={() => api?.scrollTo(i * itemsPerSection)}
        aria-label={`Go to section ${i + 1}`}
      />
    {/each}
  </div>

   <!-- Right Arrow -->
    <button
      class={cn(
        "flex items-center justify-center h-10 w-10 p-0 border border-slate-700 rounded-full bg-slate-800/50 border-violet-800 hover:bg-violet-500/20 hover:border-violet-500 transition-all shrink-0",
        config?.options.axis === "x" ? "" : "rotate-90"
      )}
      disabled={!canScrollNext}
      on:click={onNext}
    >
      <ArrowRight class="w-5 h-5 text-slate-300" />
      <span class="sr-only">Next slide</span>
    </button>

  </div>
</div>
