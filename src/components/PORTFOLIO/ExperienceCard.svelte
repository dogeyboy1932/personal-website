<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";
  import type { Experience } from "../../types";

  export let experience: Experience;
  export let index: number = 0;

  // Use theme-aware card themes from the store
  $: cardTheme = $theme.cardThemes[index % $theme.cardThemes.length];
</script>

<div 
  class="group relative overflow-hidden rounded-2xl border {cardTheme.border} {$theme.bg.card} backdrop-blur-sm shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col"
  in:fly={{ y: 18, delay: index * 100 }}
>
  <!-- Left accent bar with unique color -->
  <div class="absolute left-0 top-0 h-full w-1 bg-gradient-to-b {cardTheme.accent}" />
  
  <div class="p-6 pl-5 space-y-4 flex-1 flex flex-col">
    <!-- Duration badge - top right corner style -->
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-1">
        <h3 class="text-2xl font-bold bg-gradient-to-r {cardTheme.title} bg-clip-text text-transparent">
          {experience.company}
        </h3>
        <p class="text-md font-medium {cardTheme.role}">
          {experience.role}
        </p>
      </div>
      
      <span class="shrink-0 rounded-lg {cardTheme.badge} border px-3 py-1.5 text-xs font-bold tracking-wide">
        {experience.duration}
      </span>
    </div>

    <!-- Summary with subtle separator -->
    <div class="pt-2 border-t {cardTheme.divider}">
      <p class="{$theme.text.secondary} leading-relaxed">
        {experience.summary}
      </p>
    </div>
  </div>
  
  <!-- Bottom glow on hover -->
  <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t {cardTheme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
</div>
