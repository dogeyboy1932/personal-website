<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";
  import LinkPreview from "../LinkPreview.svelte";

  export let href: string;
  export let logo: string | undefined;
  export let title: string;
  export let isExternal = false;
  export let index: number = 0;
</script>

{#if isExternal}
  <LinkPreview
    href={href}
    label={title}
    className="group inline-flex items-center justify-center rounded-2xl border {$theme.border.tertiary} {$theme.bg.secondary} p-2 transition-all {$theme.hover.scale} {$theme.accent.indigo.hover.border} {$theme.accent.indigo.hover.bg}"
  >
    {#if logo}
      <div class="h-6 w-6">
        <img src={logo} alt={title} class="h-full w-full object-contain group-hover:opacity-100 transition-all" />
      </div>
    {/if}
  </LinkPreview>
{:else}
  <a
    {href}
    class="group flex items-center justify-center rounded-2xl border {$theme.border.tertiary} {$theme.bg.secondary} p-2 transition-all {$theme.hover.scale} {$theme.accent.indigo.hover.border} {$theme.accent.indigo.hover.bg}"
    in:fly={{ y: 18, delay: index * 80 }}
  >
    {#if logo}
      <div class="h-6 w-6">
        <img src={logo} alt={title} class="h-full w-full object-contain group-hover:opacity-100 transition-all" />
      </div>
    {/if}
  </a>
{/if}
