<!--
  FX: gooey-nav
  Source: https://reactbits.dev/components/gooey-nav (React) — reimplemented in Svelte

  The active nav item sits inside a liquid blob that stretches and snaps to
  whichever item you select, and clicking flings a few droplets that get pulled
  back in. The "gooey" part is an SVG filter — a heavy blur followed by a
  contrast crank on the alpha channel, which turns overlapping soft edges into
  one merged hard edge. That is the whole trick; without it this is just a
  sliding rectangle.

  Used by: src/components/NavigationBar/NavigationBar.svelte

  Tunables:
    items       [{ href, label, icon }]
    current     active pathname
    particles   droplets flung per click     default 8
    blur        goo filter blur radius       default 6
    duration    ms for the blob to travel    default 520

  The blob is measured from the live DOM (offsetLeft/offsetWidth of the active
  link) rather than computed from index, so it stays correct with variable
  label widths, font swaps and wrapping. A ResizeObserver re-measures on
  layout change.

  Accessibility: the blob layer is inert decoration (aria-hidden,
  pointer-events:none) sitting UNDER real anchors — the links keep their own
  focus, hover and middle-click behaviour. Under prefers-reduced-motion the
  blob jumps instead of gliding and no droplets spawn.
-->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import type { ComponentType } from "svelte";
  import { theme, darkModeStore } from "../../lib/stores";

  export let items: readonly { href: string; label: string; icon: ComponentType }[] = [];
  export let current = "/";
  export let particles = 8;
  export let blur = 6;
  export let duration = 520;

  /** Unique per instance: two components sharing a filter id would collide. */
  const filterId = `fx-goo-${Math.random().toString(36).slice(2, 9)}`;

  let container: HTMLDivElement;
  let refs: HTMLAnchorElement[] = [];
  let observer: ResizeObserver | null = null;

  let blob = { x: 0, y: 0, w: 0, h: 0 };
  let measured = false;

  interface Droplet {
    id: number;
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
  }
  let droplets: Droplet[] = [];
  let dropletId = 0;

  /**
   * SvelteKit serves these routes with a trailing slash ("/portfolio/"), while
   * navItems declares them without ("/portfolio"). Comparing raw strings makes
   * activeIndex -1 on every page but "/", which left the blob stranded on
   * whichever item it last measured. Normalise both sides.
   */
  const normalize = (path: string) =>
    path.length > 1 ? path.replace(/\/+$/, "") : path;

  $: activeIndex = items.findIndex(
    (item) => normalize(item.href) === normalize(current)
  );
  $: isActive = (href: string) => normalize(href) === normalize(current);

  const reduced = () =>
    browser && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  /*
    The pill inverts with the theme. "White tabs" is right on the dark navbar
    (bg-black/90), but the light navbar is bg-white/95 — a white pill there
    would be invisible, so it goes near-black and the label flips with it.
  */
  $: pillFill = $darkModeStore ? "#ffffff" : "#111827";
  $: pillLabel = $darkModeStore ? "#0b0b0f" : "#f8fafc";

  function measure() {
    // Unknown route (activeIndex -1): retire the blob rather than leaving it
    // parked under whatever item it happened to measure last.
    if (activeIndex < 0) {
      measured = false;
      return;
    }
    const el = refs[activeIndex];
    if (!el || !container) return;
    blob = {
      x: el.offsetLeft,
      y: el.offsetTop,
      w: el.offsetWidth,
      h: el.offsetHeight,
    };
    measured = true;
  }

  // Re-measure whenever the active item changes or the refs land.
  $: if (browser && (activeIndex < 0 || refs[activeIndex])) measure();

  function burst(index: number) {
    if (reduced()) return;
    const el = refs[index];
    if (!el) return;

    const cx = el.offsetLeft + el.offsetWidth / 2;
    const cy = el.offsetTop + el.offsetHeight / 2;

    const made: Droplet[] = Array.from({ length: particles }, (_, i) => {
      const angle = (Math.PI * 2 * i) / particles + Math.random() * 0.5;
      const distance = 26 + Math.random() * 26;
      return {
        id: dropletId++,
        x: cx,
        y: cy,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size: 5 + Math.random() * 7,
      };
    });

    droplets = [...droplets, ...made];
    const ids = new Set(made.map((d) => d.id));
    // Outlive the CSS animation, then drop them so the list can't grow.
    setTimeout(() => {
      droplets = droplets.filter((d) => !ids.has(d.id));
    }, 700);
  }

  onMount(() => {
    if (!browser) return;
    measure();
    observer = new ResizeObserver(measure);
    observer.observe(container);
    refs.forEach((r) => r && observer?.observe(r));
  });

  onDestroy(() => observer?.disconnect());
</script>

<!-- The filter itself. Zero-sized and hidden; only its id is used. -->
<svg class="fx-goo-defs" aria-hidden="true" focusable="false">
  <defs>
    <filter id={filterId}>
      <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="soft" />
      <!-- Crank alpha contrast: soft overlapping edges snap into one shape. -->
      <feColorMatrix
        in="soft"
        mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
        result="goo"
      />
      <feBlend in="SourceGraphic" in2="goo" />
    </filter>
  </defs>
</svg>

<div
  class="fx-gooey-nav"
  bind:this={container}
  style="--goo-fill: {pillFill}; --goo-label: {pillLabel};"
>
  <!-- Decoration only: sits under the links and never takes pointer events. -->
  <div
    class="fx-goo-layer"
    style="filter: url(#{filterId});"
    aria-hidden="true"
  >
    {#if measured}
      <span
        class="fx-goo-blob fx-goo-fill"
        class:is-instant={reduced()}
        style="
          transform: translate({blob.x}px, {blob.y}px);
          width: {blob.w}px;
          height: {blob.h}px;
          --goo-duration: {duration}ms;
        "
      />
    {/if}

    {#each droplets as drop (drop.id)}
      <span
        class="fx-goo-droplet fx-goo-fill"
        style="
          left: {drop.x}px;
          top: {drop.y}px;
          width: {drop.size}px;
          height: {drop.size}px;
          --goo-dx: {drop.dx}px;
          --goo-dy: {drop.dy}px;
        "
      />
    {/each}
  </div>

  <div class="fx-goo-items">
    {#each items as item, i}
      <a
        bind:this={refs[i]}
        href={item.href}
        class="fx-goo-item {isActive(item.href) ? 'fx-goo-item-active' : $theme.nav.inactive}"
        aria-current={isActive(item.href) ? "page" : undefined}
        on:click={() => burst(i)}
      >
        <span>{item.label}</span>
        <svelte:component this={item.icon} class="w-4 h-4" />
      </a>
    {/each}
  </div>
</div>

<style>
  /*
    Blob and droplets are white (updates.txt: "Make the navbar tabs white
    instead of yellow pilled"). They share one class so the burst can never
    drift out of sync with the pill it comes from.

    The active label has to flip with it: it was theme.text.white, which would
    have rendered white-on-white and made the current tab unreadable.
  */
  .fx-goo-fill {
    background-color: var(--goo-fill);
  }

  .fx-goo-item-active {
    color: var(--goo-label);
    font-weight: 600;
  }

  .fx-goo-defs {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .fx-gooey-nav {
    position: relative;
    display: inline-block;
  }

  .fx-goo-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .fx-goo-blob {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 9999px;
    transition:
      transform var(--goo-duration) cubic-bezier(0.34, 1.4, 0.5, 1),
      width var(--goo-duration) cubic-bezier(0.34, 1.4, 0.5, 1),
      height var(--goo-duration) ease;
  }

  .fx-goo-blob.is-instant {
    transition: none;
  }

  .fx-goo-droplet {
    position: absolute;
    border-radius: 9999px;
    /* Centred on its spawn point, then flung outward and reeled back. */
    margin-left: -3px;
    margin-top: -3px;
    animation: fx-goo-fling 620ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes fx-goo-fling {
    0% {
      transform: translate(0, 0) scale(0.4);
      opacity: 1;
    }
    55% {
      transform: translate(var(--goo-dx), var(--goo-dy)) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(0, 0) scale(0.2);
      opacity: 0;
    }
  }

  .fx-goo-items {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem;
  }

  .fx-goo-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.85rem;
    border-radius: 9999px;
    font-size: 0.95rem;
    letter-spacing: 0.01em;
    text-decoration: none;
    transition: color 300ms ease;
  }

  /* On narrow screens the four items wrapped to two rows, which pushed the
     theme toggle onto a third. Tightening padding and gap fits them on one. */
  @media (max-width: 640px) {
    .fx-goo-items {
      gap: 0.15rem;
    }
    .fx-goo-item {
      padding: 0.4rem 0.55rem;
      font-size: 0.82rem;
      gap: 0.3rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-goo-blob,
    .fx-goo-item {
      transition: none;
    }
  }
</style>
