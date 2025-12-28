<script lang="ts">
  export let title: string = "";
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";
</script>


<section>
  <h2 class="text-3xl uppercase tracking-[0.4em] {$theme.text.muted} text-center">
    {title}
  </h2>
  <div class="mt-2 h-1 w-full rounded-full {$theme.gradient.divider}" />
</section>
