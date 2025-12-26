<script lang="ts">
  import { fly } from "svelte/transition";

  export let fact: string;
  export let index: number;
</script>

<li 
  class="flex items-start gap-3 text-sm text-slate-200"
  in:fly={{ x: -10, delay: 200 + index * 80, duration: 300 }}
>
  <span class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-pink-500/20 text-xs font-semibold text-pink-300">
    {index + 1}
  </span>
  <span class="pt-0.5">{fact}</span>
</li>
