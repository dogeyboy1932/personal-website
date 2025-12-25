<script lang="ts">
  import { fly } from "svelte/transition";
  import type { Experience } from "../../types";

  export let experience: Experience;
  export let index: number = 0;

  // Different color themes for each card
  const colorThemes = [
    { accent: 'from-cyan-400 via-teal-400 to-emerald-400', border: 'border-cyan-500/20 hover:shadow-cyan-500/20', badge: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300', title: 'from-cyan-300 via-teal-200 to-white', role: 'text-teal-400', divider: 'border-cyan-500/10', glow: 'from-cyan-500/10' },
    { accent: 'from-orange-400 via-amber-400 to-yellow-400', border: 'border-orange-500/20 hover:shadow-orange-500/20', badge: 'bg-orange-500/15 border-orange-400/30 text-orange-300', title: 'from-orange-300 via-amber-200 to-white', role: 'text-orange-400', divider: 'border-orange-500/10', glow: 'from-orange-500/10' },
    { accent: 'from-purple-400 via-violet-400 to-fuchsia-400', border: 'border-purple-500/20 hover:shadow-purple-500/20', badge: 'bg-purple-500/15 border-purple-400/30 text-purple-300', title: 'from-purple-300 via-violet-200 to-white', role: 'text-purple-400', divider: 'border-purple-500/10', glow: 'from-purple-500/10' },
    { accent: 'from-slate-400 via-gray-400 to-zinc-400', border: 'border-slate-500/20 hover:shadow-slate-500/20', badge: 'bg-slate-500/15 border-slate-400/30 text-slate-300', title: 'from-slate-300 via-gray-200 to-white', role: 'text-slate-400', divider: 'border-slate-500/10', glow: 'from-slate-500/10' },
    { accent: 'from-blue-400 via-indigo-400 to-sky-400', border: 'border-blue-500/20 hover:shadow-blue-500/20', badge: 'bg-blue-500/15 border-blue-400/30 text-blue-300', title: 'from-blue-300 via-indigo-200 to-white', role: 'text-indigo-400', divider: 'border-blue-500/10', glow: 'from-blue-500/10' },
  ];

  $: theme = colorThemes[index % colorThemes.length];
</script>

<div 
  class="group relative overflow-hidden rounded-2xl border {theme.border} bg-slate-900/90 backdrop-blur-sm shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col"
  in:fly={{ y: 18, delay: index * 100 }}
>
  <!-- Left accent bar with unique color -->
  <div class="absolute left-0 top-0 h-full w-1 bg-gradient-to-b {theme.accent}" />
  
  <div class="p-6 pl-5 space-y-4 flex-1 flex flex-col">
    <!-- Duration badge - top right corner style -->
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-1">
        <h3 class="text-2xl font-bold bg-gradient-to-r {theme.title} bg-clip-text text-transparent">
          {experience.company}
        </h3>
        <p class="text-md font-medium {theme.role}">
          {experience.role}
        </p>
      </div>
      
      <span class="shrink-0 rounded-lg {theme.badge} border px-3 py-1.5 text-xs font-bold tracking-wide">
        {experience.duration}
      </span>
    </div>

    <!-- Summary with subtle separator -->
    <div class="pt-2 border-t {theme.divider}">
      <p class="text-slate-300 leading-relaxed">
        {experience.summary}
      </p>
    </div>
  </div>
  
  <!-- Bottom glow on hover -->
  <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t {theme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
</div>
