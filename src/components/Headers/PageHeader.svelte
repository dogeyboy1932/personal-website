<script lang="ts">
  export let title: string = "";
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";
</script>


<!-- Trimmed: "Can we make the top section a little less in height so we can see
     the what I ran part a little upper?" -->
<section>
  <h2 class="font-display text-2xl uppercase tracking-[0.35em] {$theme.text.muted} text-center">
    {title}
  </h2>
  <div class="mt-1.5 h-0.5 w-full rounded-full {$theme.gradient.divider}" />
</section>
