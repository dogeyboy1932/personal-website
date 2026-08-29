<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";

  export let href: string;
  export let logo: string | undefined;
  export let title: string;
  export let index: number = 0;
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  class="group flex items-center justify-center rounded-2xl border {$theme.border.tertiary} {$theme.bg.secondary} p-2 transition-all {$theme.hover.scale} {$theme.accent.indigo.hover.border} {$theme.accent.indigo.hover.bg}"
  in:fly={{ y: 18, delay: index * 80 }}
>
  {#if logo}
    <div class="h-6 w-6">
      <img src={logo} alt={title} class="h-full w-full object-contain group-hover:opacity-100 transition-all" />
    </div>
  {/if}
</a>
