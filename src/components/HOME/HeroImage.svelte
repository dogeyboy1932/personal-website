<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";

  

  export let src: string;
  export let alt: string;
</script>

<div class="relative overflow-hidden rounded-xl border {$theme.border.accent} {$theme.bg.cardSolid} shadow-2xl">
  <img
    {src}
    {alt}
    class="h-full w-full max-w-full object-cover transition duration-1000 group-hover:scale-105 group-hover:rotate-1"
    loading="lazy"
  />
</div>
