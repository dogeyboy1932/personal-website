<script lang="ts">
  import { fly } from "svelte/transition";

  export let href: string;
  export let title: string;
  export let description: string;
  export let cta: string;
  export let index: number = 0;
</script>

<a
  {href}
  class="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-3 sm:p-4 md:p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl hover:border-slate-700 flex flex-col"
  in:fly={{ y: 18, delay: index * 100 + 100 }}
>
  <!-- Glow effect -->
  <div class="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-indigo-500/10 blur-[60px] transition group-hover:translate-x-3" />
  
  <h4 class="text-base sm:text-lg md:text-xl font-display font-bold text-white">
    {title}
  </h4>
  
  <p class="mt-2 md:mt-3 text-sm sm:text-base md:text-lg text-slate-400 flex-1">
    {description}
  </p>
  
  <span class="mt-auto pt-3 md:pt-4 inline-flex text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
    {cta} →
  </span>
</a>
