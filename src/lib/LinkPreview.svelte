<script lang="ts">
  import { browser } from "$app/environment";

  export let href: string;
  export let label: string;
  export let className = "";

  const previewWidth = 240;
  const previewHeight = 168;

  let trigger: HTMLAnchorElement;
  let isOpen = false;
  let imageFailed = false;
  let previewX = 0;
  let previewY = 0;
  let closeTimeout: ReturnType<typeof setTimeout>;

  $: previewImage = `https://api.microlink.io/?url=${encodeURIComponent(href)}&screenshot=true&meta=false&embed=screenshot.url&colorScheme=dark&viewport.deviceScaleFactor=1&viewport.width=640&viewport.height=420`;
  $: previewStyle = `left: ${previewX}px; top: ${previewY}px;`;

  function updatePosition() {
    if (!browser || !trigger) return;

    const bounds = trigger.getBoundingClientRect();
    const maxX = Math.max(16, window.innerWidth - previewWidth - 16);
    previewX = Math.min(Math.max(16, bounds.left + bounds.width / 2 - previewWidth / 2), maxX);
    const opensAbove = bounds.top > previewHeight + 20;
    previewY = opensAbove
      ? bounds.top - previewHeight - 14
      : Math.min(bounds.bottom + 14, Math.max(16, window.innerHeight - previewHeight - 16));
  }

  function openPreview() {
    clearTimeout(closeTimeout);
    imageFailed = false;
    updatePosition();
    isOpen = true;
  }

  function closePreview() {
    clearTimeout(closeTimeout);
    closeTimeout = setTimeout(() => {
      isOpen = false;
    }, 120);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      isOpen = false;
      trigger.blur();
    }
  }
</script>

<svelte:window on:resize={() => isOpen && updatePosition()} on:scroll={() => isOpen && updatePosition()} />

<a
  bind:this={trigger}
  href={href}
  target="_blank"
  rel="noopener noreferrer"
  class={className}
  data-state={isOpen ? "open" : "closed"}
  on:mouseenter={openPreview}
  on:mouseleave={closePreview}
  on:focus={openPreview}
  on:blur={closePreview}
  on:keydown={handleKeyDown}
>
  <slot />
</a>

<div
  class={`pointer-events-none fixed z-[100] w-60 overflow-hidden rounded-xl border border-yellow-300/40 bg-slate-950/95 shadow-xl shadow-black/40 transition-all duration-200 motion-reduce:transition-none ${
    isOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-1 opacity-0"
  }`}
  style={previewStyle}
  aria-hidden={!isOpen}
>
  {#if isOpen}
    {#if imageFailed}
      <div class="flex h-[150px] items-center justify-center bg-yellow-300/5 px-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
        Preview unavailable
      </div>
    {:else}
      <img
        src={previewImage}
        alt={`${label} website preview`}
        class="block h-[150px] w-full object-cover"
        on:error={() => (imageFailed = true)}
      />
    {/if}
        <!-- Full bleed: the card has no padding and the image carries no radius or border of its own,
         so the screenshot reaches the card's edge on all four sides. -->
  {/if}
</div>
