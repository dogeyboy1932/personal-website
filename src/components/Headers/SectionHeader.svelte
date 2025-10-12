<script lang="ts">
  export let id: string = "";
  export let title: string = "";
  export let customColor: string = "";
  import { fly } from "svelte/transition";
</script>

<div class="px-2 pb-2 mt-7 mb-2">
  <h2 id={id} class={`text-2xl font-bold tracking-wide text-${customColor || 'emerald-400'} inline-block`}>
    <span in:fly={{ y: -8, duration: 350 }}>{title}</span>
  </h2>
  
  <hr class="mt-2 h-1 w-full rounded-full opacity-60 bg-white border-0" />
</div>
