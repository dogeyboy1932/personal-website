<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import type { ComponentType } from "svelte";
  import { theme, darkModeStore } from "../../lib/stores";
  import { tokens, css } from "../../lib/tokens";

  export let items: readonly { href: string; label: string; icon: ComponentType }[] = [];
  export let current = "/";
  export let particles = 16;
  export let blur = 6;
  export let duration = 520;

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

  const normalize = (path: string) =>
    path.length > 1 ? path.replace(/\/+$/, "") : path;

  $: activeIndex = items.findIndex(
    (item) => normalize(item.href) === normalize(current)
  );
  $: isActive = (href: string) => normalize(href) === normalize(current);

  const reduced = () =>
    browser && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  $: pillFill = css($tokens, "nav-pill");
  $: pillLabel = css($tokens, "nav-pill-label");

  function measure() {
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
    const rx = el.offsetWidth / 2;
    const ry = el.offsetHeight / 2;

    const ARC_START = -0.11 * Math.PI; // just above horizontal-right
    const ARC_SWEEP = 1.22 * Math.PI; // through down, round to horizontal-left
    const made: Droplet[] = Array.from({ length: particles }, (_, i) => {
      const t = particles === 1 ? 0.5 : i / (particles - 1);
      const angle = ARC_START + t * ARC_SWEEP + (Math.random() - 0.5) * 0.25;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const distance = 14 + Math.random() * 20;
      return {
        id: dropletId++,
        x: cx + cos * (rx + 2),
        y: cy + sin * (ry + 2),
        dx: cos * distance,
        dy: sin * distance,
        size: 2.5 + Math.random() * 3,
      };
    });

    droplets = [...droplets, ...made];
    const ids = new Set(made.map((d) => d.id));
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

<svg class="fx-goo-defs" aria-hidden="true" focusable="false">
  <defs>
    <filter id={filterId}>
      <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="soft" />
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
    margin-left: -3px;
    margin-top: -3px;
    animation: fx-goo-fling 620ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  /* Born on the pill's rim, so they travel outward and fade where they land
     rather than being reeled back to a centre they never came from. */
  @keyframes fx-goo-fling {
    0% {
      transform: translate(0, 0) scale(0.35);
      opacity: 0.9;
    }
    45% {
      transform: translate(calc(var(--goo-dx) * 0.7), calc(var(--goo-dy) * 0.7)) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(var(--goo-dx), var(--goo-dy)) scale(0.35);
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
    font-family: "Fredoka", "Chivo", Inter, sans-serif;
    font-weight: 500;
    letter-spacing: 0.02em;
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
