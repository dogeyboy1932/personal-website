<script lang="ts">
  export let id: string = "";
  export let title: string = "";
  export let customColor: string = "";
  import { fly } from "svelte/transition";
</script>

<div class="px-2 pb-2 mt-7 mb-6">
  <h2 id={id} class={`mt-8 uppercase tracking-[0.1em] text-2xl font-bold text-${customColor || 'slate-200'} inline-block`}>
    <span in:fly={{ y: -8, duration: 350 }}>{title}</span>
  </h2>
  
  <hr class="mt-2 h-1 w-full rounded-full bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 border-0" />
</div>
