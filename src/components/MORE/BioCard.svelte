<script lang="ts">
  import { fly } from "svelte/transition";
  import { Sparkles } from "lucide-svelte";

  export let subtitle: string;
  export let bio: string;
</script>

<div 
  class="p-5 group relative overflow-hidden rounded-2xl border border-slate-500/20 bg-slate-900/70"
  in:fly={{ y: 20, duration: 400 }}
>
  <!-- Glow effect -->
  <div class="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-slate-500/10 blur-3xl transition group-hover:translate-x-3" />
  
  <div class="relative">
    <div class="flex items-center gap-2 mb-4">
      <Sparkles class="w-5 h-5 text-slate-400" />
      <p class="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">{subtitle}</p>
    </div>
    
    <div class="text-lg leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
      {bio}
    </div>
  </div>
</div>
