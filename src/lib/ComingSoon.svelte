<!-- Shared placeholder for routes that exist but have no content yet (/pictures, /writings). -->
<script lang="ts">
  import { theme } from "../lib/stores";

  export let blurb: string;
  export let note: string = "";
</script>

<div
  class="relative overflow-hidden rounded-2xl border {$theme.border.default} {$theme.bg.card} p-10 text-center"
>
  <p class="meta-label text-[11px] {$theme.accent.orange.text}">Coming soon</p>

  <p class="mx-auto mt-4 max-w-xl text-lg leading-relaxed {$theme.text.secondary}">
    {blurb}
  </p>

  {#if note}
    <p class="mx-auto mt-3 max-w-xl text-xs {$theme.text.dim}">{note}</p>
  {/if}

  <slot />
</div>
