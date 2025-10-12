<script lang="ts">
    import { SectionHeader } from "../../components/Headers";
  import { Button } from "../../components/Button";
  import { Carousel } from "../../components/Carousel/";
  import { ProjectCard } from "../../components/Carousel";
  import autoplay from "embla-carousel-autoplay";
  import {
    projectCardSummaries,
    projectShowcaseItems,
    projectsHero,
  } from "../../constants/portfolio";
  import { projects } from "../../constants/portfolio";
  import { skillsData, techColors, complexityClasses, experiences } from "../../constants/pages";
  import { sections } from "../../constants/sections";
  import HeroGlow from "../../lib/HeroGlow.svelte";
  import { labels } from "../../constants/labels";
  import { fade, fly } from "svelte/transition";


  let activeProject = 0;
  $: showcaseProject =
    projectShowcaseItems[activeProject] ?? projectShowcaseItems[0];



  function getTechColor(tech: string) {
    return techColors[tech] ?? "text-slate-400";
  }

  function openLink(url?: string) {
    if (!url) return;
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener");
    }
  }
</script>



<section class="space-y-2">
  <section
    class="justify-center items-center mb-8"
  >
    <div class="space-y-6 items-center justify-center" in:fly={{ x: -18, duration: 400 }}>
      <h2 class="text-3xl uppercase tracking-[0.4em] text-slate-300 text-center">
        {projectsHero.tagline}
      </h2>
      <div class="mt-2 h-1 w-full rounded-full bg-gradient-to-r from-slate-300 via-cyan-400 to-slate-300 opacity-60" />

      <p class="text-lg text-slate-600 dark:text-slate-300">
        {projectsHero.description}
      </p>
    </div>
  </section>


  <section> 
    <SectionHeader id="gallery" title={sections.prof_experiences} customColor="purple-400" />
    <div class="one-grid">
      {#each experiences as item, i}
        <div class="content-card" in:fade={{ delay: i * 200, duration: 500 }}>
          <div class="p-6">
            <div class="section-header">
              <span class="title">{item.company}</span>
              <span class="time-badge">{item.role}</span>
            </div>
            <div class="label-header mt-2 mb-4">{item.duration}</div>
            <p class="description">{item.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </section>



  <section>
    <SectionHeader id="gallery" title={sections.projectGallery} />
    <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3" in:fade>
      {#each projectCardSummaries as project, index}
        <div
          class="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-white/80 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900/70"
          in:fly={{ y: 18, delay: index * 90 }}
        >
          <div class="relative h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
            <div
              class="absolute top-4 left-4 flex gap-2 opacity-0 transition group-hover:opacity-100"
            >
              {#if project.demo}
                <button
                  on:click={() => openLink(project.demo)}
                  class="rounded-lg border border-emerald-400/40 bg-white/80 p-2 text-emerald-400 hover:border-emerald-300"
                >
                  ↗
                </button>
              {/if}
              {#if project.github}
                <button
                  on:click={() => openLink(project.github)}
                  class="rounded-lg border border-emerald-400/40 bg-white/80 p-2 text-slate-600 hover:border-emerald-300"
                >
                  GH
                </button>
              {/if}
            </div>
          </div>

          <div class="space-y-4 p-6">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3
                  class="text-xl font-semibold text-slate-900 transition group-hover:text-emerald-300 dark:text-slate-100"
                >
                  {project.title}
                </h3>
                <p class="text-xs uppercase tracking-[0.35em] text-slate-500">
                  {project.category}
                </p>
              </div>
              
              
              <div class="flex flex-col items-end gap-2">
                <span
                  class={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] ${
                    complexityClasses[project.complexity]
                  }`}
                >
                  {project.complexity}
                </span>
              
                <span
                  class={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] border ${
                    project.status === "Production"
                      ? "border-emerald-400 bg-emerald-500/10 text-emerald-200"
                      : "border-amber-400 bg-amber-500/10 text-amber-200"
                  }`}
                >
                  {project.status}
                </span>
              </div>

            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              {project.description}
            </p>
            <div class="flex flex-wrap gap-2">
              {#each project.technologies.slice(0, 4) as tech}
                <span
                  class={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] border border-emerald-400/30 bg-emerald-500/10 ${getTechColor(
                    tech
                  )}`}
                >
                  {tech}
                </span>
              {/each}
              {#if project.technologies.length > 4}
                <span
                  class="rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] border border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                >
                  +{project.technologies.length - 4} more
                </span>
              {/if}
            </div>

          </div>
        </div>
      {/each}
    </div>
  </section>


  <section>
    <SectionHeader id="skills" title={sections.skills} />
    <div class="grid gap-3 md:grid-cols-2">
      {#each skillsData.skills as category}
        <div class="rounded-2xl border border-emerald-500/20 bg-white/80 p-6 shadow-lg dark:bg-slate-900/70" in:fly={{ y: 16 }}>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{category.category}</h3>
          
          <div class="mt-4 grid gap-2 grid-cols-1 min-[400px]:grid-cols-2">
            {#each category.items as skill}
              <div class="flex items-center gap-3 rounded-md border border-emerald-400/20 bg-slate-50/60 p-3 dark:bg-slate-800/60 min-w-0">
                {#if skill.logoUrl}
                  <img src={skill.logoUrl} alt={skill.name} class="h-8 w-8 rounded flex-shrink-0" />
                {/if}

                <div class="min-w-0 flex-1">
                  <div class="text-slate-200 font-semibold truncate">{skill.name}</div>
                  <!-- <div class="text-xs text-slate-500">Proficiency: {skill.proficiency} • {skill.status}</div> -->
                </div>
              </div>
            {/each}
          </div>

        </div>
      {/each}
    </div>
  </section>


</section>
