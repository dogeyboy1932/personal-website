<script lang="ts">
  import { fly } from "svelte/transition";

  export let title: string;
  export let description: string;
  export let index: number = 0;
</script>

<div
  class="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-violet-950/30 to-slate-900 shadow-xl transition-all duration-300 hover:border-slate-600 hover:-translate-y-2 hover:shadow-2xl p-6"
  in:fly={{ y: 20, delay: index * 100 }}
>
  <div class="relative">
    <!-- Title -->
    <h4 class="text-2xl font-extrabold text-white mb-4 tracking-tight">
      {title}
    </h4>
    
    <!-- Description -->
    <p class="text-base text-slate-300 leading-relaxed font-light">
      {description}
    </p>
  </div>
</div>
