<script lang="ts">
  import { theme } from "../../lib/stores";
  
  export let categories: string[];
  export let selectedCategory: string;
</script>

<div class="mb-8 flex justify-center">
  <div class="inline-flex flex-wrap gap-3 justify-center {$theme.accent.indigo.bg} border-[1.6px] {$theme.accent.indigo.border} rounded-xl p-2 shadow-2xl {$theme.accent.indigo.glow}">
  {#each categories as category}
    <button
      on:click={() => selectedCategory = category}
      class={`rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-200 border-[1.6px] ${
        selectedCategory === category
          ? `${$theme.filter.active.bg} ${$theme.filter.active.text} ${$theme.filter.active.border} shadow-lg scale-105`
          : `bg-transparent ${$theme.accent.indigo.text} border-transparent ${$theme.filter.inactive.hoverBg} ${$theme.filter.inactive.hoverText} ${$theme.filter.inactive.hoverBorder}`
      }`}
    >
      {category}
    </button>
  {/each}
</div>
</div>
