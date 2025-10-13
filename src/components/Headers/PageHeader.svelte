<script lang="ts">
  export let title: string = "";
  import { fly } from "svelte/transition";
</script>


<section>
  <h2 class="text-3xl uppercase tracking-[0.4em] text-slate-300 text-center">
    {title}
  </h2>
  <div class="mt-2 h-1 w-full rounded-full bg-gradient-to-r from-yellow-800 via-orange-300 to-yellow-800 " />
</section>
