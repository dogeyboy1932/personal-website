<script lang="ts">
  export let id: string = "";
  export let title: string = "";
  export let customColor: string = "";
  import { fly } from "svelte/transition";
</script>

<div class="py-2 mt-4 mb-2">
  <h2 id={id} class={`uppercase tracking-[0.15em] text-lg font-semibold text-${customColor || 'slate-200'} inline-flex items-center gap-3`}>
    <span class="w-8 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></span>
    <span in:fly={{ y: -8, duration: 350 }}>{title}</span>
  </h2>
</div>
