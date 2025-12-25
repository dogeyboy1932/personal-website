<script lang="ts">
  export let categories: string[];
  export let selectedCategory: string;
</script>

<div class="mb-8 flex justify-center">
  <div class="inline-flex flex-wrap gap-3 justify-center bg-indigo-950 border-[1.6px] border-indigo-800/60 rounded-xl p-2 shadow-2xl shadow-indigo-900/30">
  {#each categories as category}
    <button
      on:click={() => selectedCategory = category}
      class={`rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-200 border-[1.6px] ${
        selectedCategory === category
          ? "bg-white text-indigo-950 border-white shadow-lg scale-105"
          : "bg-transparent text-indigo-300 border-transparent hover:bg-indigo-900 hover:text-indigo-100 hover:border-indigo-700"
      }`}
    >
      {category}
    </button>
  {/each}
</div>
</div>
