<script lang="ts">
  import { fly } from "svelte/transition";

  export let href: string;
  export let logo: string | undefined;
  export let title: string;
  export let index: number = 0;
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  class="group flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/50 p-2 transition-all hover:scale-110 hover:border-indigo-500 hover:bg-indigo-500/10"
  in:fly={{ y: 18, delay: index * 80 }}
>
  {#if logo}
    <div class="h-6 w-6">
      <img src={logo} alt={title} class="h-full w-full object-contain group-hover:opacity-100 transition-all" />
    </div>
  {/if}
</a>
