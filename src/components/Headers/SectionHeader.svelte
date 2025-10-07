<script lang="ts">
  export let id: string = "";
  export let title: string = "";
  import { fly } from "svelte/transition";
</script>

<div class="px-2 pb-2 mt-10">
  <h2 id={id} class="text-2xl font-bold tracking-wide text-emerald-400 inline-block">
    <span in:fly={{ y: -8, duration: 350 }}>{title}</span>
  </h2>
  <div class="mt-2 h-1 w-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 opacity-60" />
</div>
