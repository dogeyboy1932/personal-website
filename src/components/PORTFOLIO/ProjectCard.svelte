<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";
  import TechBadge from "./TechBadge.svelte";
  import { getTechColors } from "../../lib/utils";
  import type { Project } from "../../types";
  import { BackgroundGradient } from "../Creative";

  export let project: Project;
  export let index: number = 0;

  $: shownTech = project.technologies.slice(0, 7);
  $: techColorList = getTechColors(shownTech, $theme.techColors);

</script>

<BackgroundGradient class="h-full" radius="0.75rem" palette="aurora" spread={3} idle={0.3}>
<div
  class="group relative overflow-hidden rounded-xl border {$theme.border.default} {$theme.bg.card} shadow-lg transition hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full"
  in:fly={{ y: 18, delay: index * 50 }}
>

  <div class="relative h-48 overflow-hidden {$theme.bg.cardHover}">
    <img
      src={project.image}
      alt={project.title}
      class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      loading="lazy"
    />
    
    <div
      class="absolute top-2 left-2 flex gap-2 opacity-50 transition group-hover:opacity-100"
    >
      {#if project.demo}
        <a href={project.demo} target="_blank" rel="noopener noreferrer" class="inline-flex rounded-lg border {$theme.border.light} {$theme.bg.cardHover} p-2 {$theme.text.muted} hover:{$theme.border.hover}">
          <img src="https://api.iconify.design/mdi:open-in-new.svg?color=%23cbd5e1" alt="Demo" class="h-4 w-4" />
        </a>
      {/if}

      {#if project.github}
        <a href={project.github} target="_blank" rel="noopener noreferrer" class="inline-flex rounded-lg border {$theme.border.light} {$theme.bg.cardHover} p-2 {$theme.text.dim} hover:{$theme.border.hover}">
          <img src="https://imgs.search.brave.com/w5LFW4ei3PC6DUOkw2jcpG1OVDzoYhDqENlECFBWUg8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8y/LzI0L0dpdGh1Yl9s/b2dvX3N2Zy5zdmc" alt="GitHub" class="h-4 w-4" />
        </a>
      {/if}
    </div>
  </div>

  <div class="p-5 flex flex-col ">
    <div class="flex items-start justify-between gap-3 min-h-[5rem] mb-2">
      <div class="">
        <h3
          class="text-2xl font-semibold {$theme.text.secondary} transition"
        >
          {project.title}
        </h3>
        
        <p class="text-sm uppercase tracking-[0.35em] {$theme.text.muted} mt-1">
          {project.category.join(", ")}
        </p>
      </div>
      
      <div class="flex flex-col items-end gap-2 flex-shrink-0">
        <span
          class="rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.25em] {$theme.bg.secondary} {$theme.text.primary}"
        >
          {project.duration}
        </span>
      
        <span
          class={`rounded px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] border ${
            project.status === "Completed"
              ? `${$theme.status.completed.border} ${$theme.status.completed.bg} ${$theme.status.completed.text}`
              : `${$theme.status.inProgress.border} ${$theme.status.inProgress.bg} ${$theme.status.inProgress.text}`
          }`}
        >
          {project.status}
        </span>
      </div>
    </div>

    
    <div class="min-h-[7.5rem] mb-2">
      <p class="text-sm {$theme.text.secondary} line-clamp-5 font-sans">
        {project.description}
      </p>
    </div>

    <div class="mt-auto min-h-[4rem]">
      <div class="flex flex-wrap gap-2">
        {#each shownTech as tech, techIndex}
          <TechBadge {tech} index={techIndex} color={techColorList[techIndex]} />
        {/each}
        {#if project.technologies.length > 7}
          <span
            class="rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] border {$theme.border.light} {$theme.bg.overlay} {$theme.text.primary}"
          >
            +{project.technologies.length - 7} more
          </span>
        {/if}
      </div>
    </div>
  </div>
</div>
</BackgroundGradient>
