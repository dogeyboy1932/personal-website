<script lang="ts">
  import { SectionHeader } from "../../components/Headers";
  import { sections, experiences, skillsData, techColors, projectsHero, projectsData } from "../../constants";
  import { fade, fly } from "svelte/transition";
  import PageHeader from "../../components/Headers/PageHeader.svelte";


  let activeProject = 0;
  $: showcaseProject = projectsData[activeProject] ?? projectsData[0];

  // Project filtering
  let selectedCategory = "All";
  $: categories = ["All", ...new Set(projectsData.map(p => p.category))];
  $: filteredProjects = selectedCategory === "All" 
    ? projectsData 
    : projectsData.filter(p => p.category === selectedCategory);


  function getTechColor(tech: string, index: number) {
    // Use tech string and index to deterministically pick a color
    const hash = (tech.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + index) % techColors.length;
    return techColors[hash];
  }

  function openLink(url?: string) {
    if (!url) return;
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener");
    }
  }
</script>



<section>
  <section class="justify-center items-center">
    <PageHeader title={projectsHero.tagline} />

    <div class="mt-6 flex flex-col items-center justify-center text-center" in:fly={{ x: -18, duration: 400 }}>

      <h2 class="w-2/3 text-2xl text-slate-300">
        {projectsHero.description}
      </h2>
    </div>
  </section>


  <section> 
    <SectionHeader id="gallery" title={sections.prof_experiences} />
    <div class="grid gap-4 md:grid-cols-2">
      {#each experiences as item, i}
        <div 
          class="p-3 group relative overflow-hidden rounded-2xl border border-slate-500/20 bg-slate-900/70 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl flex flex-col"
          in:fly={{ y: 18, delay: i * 100 }}
        >
          <div class="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500" />
          
          <div class="py-4 px-2 ml-2 space-y-4 flex-1 flex flex-col">
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-2xl font-semibold text-slate-300 transition underline">
                {item.company}
              </h3>
              
              <span class="rounded-full border border-yellow-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-500 whitespace-nowrap">
                {item.duration}
              </span>
            </div>

            <p class="text font-medium text-blue-500 uppercase tracking-[0.25em]">
              {item.role}
            </p>

            <div class="h-0.5 w-full bg-gradient-to-r from-red-500 via-orange-300 to-yellow-500" />
            
            <p class="text-md text-slate-300 leading-relaxed flex-1">
              {item.summary}
            </p>
          </div>
        </div>

      {/each}
    </div>
  </section>



  <section>
    <SectionHeader id="gallery" title={sections.projectGallery} />

    <div class="mb-8 flex flex-wrap gap-3 justify-center">
      {#each categories as category}
        <button
          on:click={() => selectedCategory = category}
          class={`rounded-lg px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition-all ${
            selectedCategory === category
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
              : "border border-slate-500/40 bg-slate-800/60 text-slate-300 hover:border-slate-400 hover:bg-slate-800"
          }`}
        >
          {category}
        </button>
      {/each}
    </div>

    <!-- Projects Grid -->
    <div class="grid gap-6 grid-cols-2 ">
      {#each filteredProjects as project, i}
        <div
          class="group relative overflow-hidden rounded-2xl border border-slate-500/20 bg-slate-900/70 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
          in:fly={{ y: 18, delay: i * 50 }}
        >
          <div class="relative h-48 overflow-hidden bg-slate-800">
            <img
              src={project.image}
              alt={project.title}
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
            <div
              class="absolute top-4 right-4 flex gap-2 opacity-0 transition group-hover:opacity-100"
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

          <div class="space-y-4 p-6">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3
                  class="text-xl font-semibold text-slate-900 transition group-hover:text-slate-300 dark:text-slate-100"
                >
                  {project.title}
                </h3>
                <p class="text-xs uppercase tracking-[0.35em] text-slate-500">
                  {project.category}
                </p>
              </div>
              
              
              <div class="flex flex-col items-end gap-2">
                <span
                  class={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.25em] bg-slate-500/10 text-slate-200`}
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
            <p class="text-sm text-slate-300">
              {project.description}
            </p>
            <div class="flex flex-wrap gap-2">
              {#each project.technologies.slice(0, 7) as tech, techIndex}
                <span
                  class={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] border border-slate-400/30 bg-slate-500/10 ${getTechColor(
                    tech,
                    techIndex
                  )}`}
                >
                  {tech}
                </span>
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
      {/each}
    </div>
  </section>


  <section>
    <SectionHeader id="skills" title={sections.skills} />
    <div class="grid gap-3 md:grid-cols-2">
      {#each skillsData.skills as category}
        <div class="rounded-2xl border border-slate-500/20 bg-slate-900/70 p-6 shadow-lg" in:fly={{ y: 16 }}>
          <h2 class="uppercase text-lg font-semibold text-amber-300">{category.category}</h2>
          
          <div class="mt-4 grid gap-2 grid-cols-1 min-[400px]:grid-cols-2">
            {#each category.items as skill}
              <div class="flex items-center gap-3 rounded-md border border-slate-400/20 bg-slate-800/60 p-3 min-w-0">
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
