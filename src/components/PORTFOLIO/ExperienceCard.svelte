<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";
  import type { Experience } from "../../types";
  import { TechBadge } from ".";
  import { getTechColors } from "../../lib/utils";
  import { BackgroundGradient } from "../Creative";

  export let experience: Experience;
  export let index: number = 0;

  let skillMax = 8;

  $: cardTheme = $theme.experienceThemes[index % $theme.experienceThemes.length];

  /* Coloured as a SEQUENCE, not per badge: adjacent badges must never match.
     ("In stack two of the SAME color can never be side by side") */
  $: shownSkills = experience.skills.slice(0, skillMax);
  $: skillColors = getTechColors(shownSkills, $theme.techColors);
</script>

<BackgroundGradient class="h-full" radius="1rem" palette="silver" spread={3} idle={0.28}>
<div 
  class="group relative overflow-hidden rounded-2xl border {cardTheme.border} {$theme.bg.card} shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full"
  in:fly={{ y: 18, delay: index * 100 }}
>
  <div class="absolute left-0 top-0 h-full w-1 bg-gradient-to-b {cardTheme.accent}" />
  
  <div class="p-5 pl-6 space-y-5 flex-1 flex flex-col">
    <div class="flex items-start justify-between gap-4 ">
      <div class="min-w-0 space-y-1">
        <h3 class="text-2xl font-bold bg-gradient-to-r {cardTheme.title} bg-clip-text text-transparent">
          {experience.company}
        </h3>
        <p class="text-md font-medium {cardTheme.role}">
          {experience.role}
        </p>
      </div>
      
      <span
        class="shrink-0 rounded-sm border border-brand/40 bg-brand/10 px-3 py-1.5 text-xs font-bold tracking-wide text-brand-strong"
      >
        {experience.duration}
      </span>
    </div>

    <div class="h-[5.5rem] pt-2 border-t {cardTheme.divider}">
      <p class="{$theme.text.secondary} text-md leading-relaxed line-clamp-3">
        {experience.summary}
      </p>
    </div>

    <div class="mt-auto min-h-[3rem]">
      <div class="flex flex-wrap gap-2">
                <!-- COLOUR IS BACK on the stack, deliberately. -->
        {#each shownSkills as tech, techIndex}
          <TechBadge {tech} index={techIndex} color={skillColors[techIndex]} />
        {/each}
        {#if experience.skills.length > skillMax}
          <span
            class="rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] border {$theme.border.light} bg-slate-400/10 {$theme.text.primary}"
          >
            +{experience.skills.length - skillMax} more
          </span>
        {/if}
      </div>
    </div>
  </div>
  
  <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t {cardTheme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
</div>
</BackgroundGradient>
