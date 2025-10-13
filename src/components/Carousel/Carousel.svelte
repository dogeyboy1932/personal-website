<script lang="ts" generics="T extends SvelteComponent">
  import { Button } from "../Button";
  import type { EmblaCarouselConfig } from "../../types/";
  import { cn } from "../../lib/utils";
  import type { EmblaCarouselType } from "embla-carousel";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import { ArrowLeft, ArrowRight } from "lucide-svelte";
  import type { ComponentProps, ComponentType, SvelteComponent } from "svelte";

  export let componentProps: ComponentProps<T>[] = [];
  export let component: ComponentType<T>;
  export let config: EmblaCarouselConfig = {
    options: { loop: true, axis: "x" },
    plugins: [],
  };
  export let carouselItemClass = "";
  export let carouselItemsClass = "";

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
    scrollNext();
    onSelect();
  };

  const onPrev = () => {
    scrollPrev();
    onSelect();
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
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  class="relative"
  role="region"
  aria-roledescription="carousel"
  on:keydown={onKeyDown}
>
  <div
    class="overflow-hidden"
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
  <div class="flex justify-between py-2">
    <Button
      variant="ghost"
      class={cn(
        " h-8 w-8 p-0 border-none",
        config?.options.axis === "x" ? "" : "rotate-90"
      )}
      disabled={!canScrollPrev}
      on:click={onPrev}
    >
      <ArrowLeft class="w-4 h-4" />
      <span class="sr-only">Previous slide</span>
    </Button>
    <span class="h-auto py-2 text-sm text-muted-foreground">
      {currentCount} out of {componentProps.length}
    </span>
    <Button
      variant="ghost"
      class={cn(
        " h-8 w-8 p-0 border-none",
        config?.options.axis === "x" ? "" : "rotate-90"
      )}
      disabled={!canScrollNext}
      on:click={onNext}
    >
      <ArrowRight class="w-4 h-4" />
      <span class="sr-only">Next slide</span>
    </Button>
  </div>
</div>
