<!--
  Shared placeholder for routes that exist but have no content yet
  (/pictures, /writings).

  These are deliberately kept OUT of navItems — updates.txt asked for the
  routes to sit outside the navbar while still being live — so this needs to
  read as "intentionally empty", not as a broken page someone stumbled into.

  Slot renders below the note, for pages that want to preview their structure.
-->
<script lang="ts">
  import { theme } from "../lib/stores";

  export let blurb: string;
  export let note: string = "";
</script>

<div
  class="relative overflow-hidden rounded-2xl border {$theme.border.default} {$theme.bg.card} p-10 text-center"
>
  <p class="text-[11px] uppercase tracking-[0.4em] text-brand">Coming soon</p>

  <p class="mx-auto mt-4 max-w-xl text-lg leading-relaxed {$theme.text.secondary}">
    {blurb}
  </p>

  {#if note}
    <p class="mx-auto mt-3 max-w-xl text-xs {$theme.text.dim}">{note}</p>
  {/if}

  <slot />
</div>
