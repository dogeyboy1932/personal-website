<script lang="ts">
  import { fly } from "svelte/transition";
  import TechBadge from "./TechBadge.svelte";
  import type { Project } from "../../types";

  export let project: Project;
  export let index: number = 0;

  function openLink(url?: string) {
    if (!url) return;
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener");
    }
  }
</script>

<div
  class="group relative overflow-hidden rounded-2xl border border-slate-500/20 bg-slate-900/70 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl flex flex-col"
  in:fly={{ y: 18, delay: index * 50 }}
>

  <div class="relative h-48 overflow-hidden bg-slate-800">
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
        <button
          on:click={() => openLink(project.demo)}
          class="rounded-lg border border-slate-400/40 bg-slate-800/80 p-2 text-slate-400 hover:border-slate-300"
        >
          <img src="https://api.iconify.design/mdi:open-in-new.svg?color=%23cbd5e1" alt="Demo" class="h-4 w-4" />
        </button>
      {/if}

      {#if project.github}
        <button
          on:click={() => openLink(project.github)}
          class="rounded-lg border border-slate-400/40 bg-slate-800/80 p-2 text-slate-600 hover:border-slate-300"
        >
          <img src="https://imgs.search.brave.com/w5LFW4ei3PC6DUOkw2jcpG1OVDzoYhDqENlECFBWUg8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8y/LzI0L0dpdGh1Yl9s/b2dvX3N2Zy5zdmc" alt="GitHub" class="h-4 w-4" />
        </button>
      {/if}
    </div>
  </div>


  <div class="p-5 flex flex-col">
    <!-- Block 1: Title, Duration, Status - Fixed Height -->
    <div class="flex items-start justify-between gap-3 h-20 mb-4">
      <div>
        <h3
          class="text-2xl font-semibold text-slate-300 transition"
        >
          {project.title}
        </h3>
        <p class="text-sm uppercase tracking-[0.35em] text-slate-500">
          {project.category}
        </p>
      </div>
      
      <div class="flex flex-col items-end gap-2">
        <span
          class="rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.25em] bg-slate-500/10 text-slate-200"
        >
          {project.duration}
        </span>
      
        <span
          class={`rounded px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] border ${
            project.status === "Completed"
              ? "border-green-400 bg-green-500/10 text-green-500"
              : "border-blue-400 bg-blue-500/10 text-blue-400"
          }`}
        >
          {project.status}
        </span>
      </div>
    </div>

    <!-- Block 2: Description - Fixed Height -->
    <div class="h-20 mb-3">
      <p class="text-sm text-slate-300 line-clamp-4 font-sans">
        {project.description}
      </p>
    </div>

    <!-- Block 3: Tech Badges - Fixed Height -->
    <div class="h-20">
      <div class="flex flex-wrap gap-2">
        {#each project.technologies.slice(0, 7) as tech, techIndex}
          <TechBadge {tech} index={techIndex} />
        {/each}
        {#if project.technologies.length > 7}
          <span
            class="rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] border border-slate-400/30 bg-slate-500/10 text-slate-200"
          >
            +{project.technologies.length - 7} more
          </span>
        {/if}
      </div>
    </div>
  </div>
</div>
