<script lang="ts" generics="T">
  import { prefersReducedMotion, rafCoalesce, shuffle as shuffleItems } from "../../lib/utils";
  import { onMount, onDestroy } from "svelte";
  import { theme } from "../../constants/_theme";

  export let items: T[] = [];
  export let interval = 7000;
  export let shuffle = true;
  export let pauseOnHover = true;
  let klass = "";
  export { klass as class };

  /* Scrolls rather than drags: the track is a plain scroll-snap container, so a
     trackpad swipe, a shift+wheel, a touch flick and the scrollbar all work by
     themselves. Autoplay and the dots drive it through the SAME scroll the user
     would make, which is why `selected` is just read back off scrollLeft rather
     than tracked alongside it.

     Circular, and native scrolling cannot loop — so the set is rendered THREE
     times and the viewport lives in the middle copy. Whenever scrolling settles
     outside that copy we jump a whole set-width back into it, instantly and
     without smoothing. The copies are identical, so there is nothing on screen
     to betray the jump: run off either end and the next slide is already there. */
  let track: HTMLDivElement;
  let selected = 0;
  let timer: ReturnType<typeof setInterval> | undefined;
  let settle: ReturnType<typeof setTimeout> | undefined;
  let paused = false;
  let reducedMotion = false;

  let ordered: T[] = items;

  $: count = ordered.length;
  $: loop = count > 1;
  $: slides = loop ? [...ordered, ...ordered, ...ordered] : ordered;

  /* Width of one full set — the exact distance a wrap has to travel. */
  function setWidth() {
    return (track?.clientWidth ?? 0) * count;
  }

  const syncSelected = rafCoalesce(() => {
    if (!track) return;
    const perSlide = track.clientWidth || 1;
    const index = Math.round(track.scrollLeft / perSlide);
    selected = loop ? ((index % count) + count) % count : Math.max(0, Math.min(count - 1, index));
  });

  /* Only once the scroll has STOPPED. Moving scrollLeft mid-gesture would fight
     the user's momentum, and mid-animation it would cancel the smooth scroll. */
  function onScroll() {
    syncSelected.schedule();
    if (!loop) return;
    if (settle) clearTimeout(settle);
    settle = setTimeout(recenter, 120);
  }

  function recenter() {
    const span = setWidth();
    if (!track || !span) return;
    const x = track.scrollLeft;
    if (x < span * 0.5) track.scrollLeft = x + span;
    else if (x >= span * 1.5) track.scrollLeft = x - span;
  }

  function jumpToMiddle() {
    if (!track || !loop) return;
    track.scrollLeft = setWidth() + selected * track.clientWidth;
  }

  onMount(() => {
    if (shuffle && items.length > 1) ordered = shuffleItems(items);
    reducedMotion = prefersReducedMotion();
    /* After the tripled track has been laid out, not before. */
    requestAnimationFrame(jumpToMiddle);
    if (!reducedMotion) start();
    window.addEventListener("resize", jumpToMiddle);
  });

  onDestroy(() => {
    stop();
    syncSelected.cancel();
    if (settle) clearTimeout(settle);
    if (typeof window !== "undefined") window.removeEventListener("resize", jumpToMiddle);
  });

  function start() {
    stop();
    if (!loop) return;
    timer = setInterval(() => {
      if (!paused) advance();
    }, interval);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = undefined;
  }

  /* Always forward by one, never back to zero: the middle copy has a slide in
     both directions, so wrapping needs no special case here. */
  function advance() {
    track?.scrollBy({ left: track.clientWidth, behavior: reducedMotion ? "auto" : "smooth" });
  }

  /* A dot press is a deliberate choice — restart the clock so the slide it
     selects gets a full interval rather than whatever was left of the last. */
  function pick(index: number) {
    if (!track) return;
    const perSlide = track.clientWidth;
    const target = loop ? setWidth() + index * perSlide : index * perSlide;
    track.scrollTo({ left: target, behavior: reducedMotion ? "auto" : "smooth" });
    start();
  }
</script>

<div
  class="fx-quote-carousel {klass} relative"
  on:pointerenter={() => pauseOnHover && (paused = true)}
  on:pointerleave={() => (paused = false)}
>
  <div
    bind:this={track}
    class="fx-track flex snap-x snap-mandatory items-stretch overflow-x-auto overscroll-x-contain"
    on:scroll={onScroll}
  >
    {#each slides as item, i}
      <div class="min-w-0 shrink-0 grow-0 basis-full snap-start">
        <slot {item} index={i % count} isActive={selected === i % count} />
      </div>
    {/each}
  </div>

  {#if loop}
    <div class="mt-3 flex justify-center gap-1.5">
      {#each ordered as _, i}
        <button
          type="button"
          class="h-1.5 rounded-full transition-all duration-300 {selected === i
            ? `w-5 ${$theme.carousel.dot.active}`
            : `w-1.5 ${$theme.carousel.dot.inactive} ${$theme.carousel.dot.hover}`}"
          on:click={() => pick(i)}
          aria-label={`Show item ${i + 1}`}
          aria-current={selected === i}
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  /* The dots ARE the position indicator, so the bar underneath would be a second
     one — and a horizontal scrollbar under a card reads as an overflow bug. */
  .fx-track {
    scrollbar-width: none;
  }

  .fx-track::-webkit-scrollbar {
    display: none;
  }
</style>
