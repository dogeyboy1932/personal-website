<script lang="ts">
  import { SectionHeader } from "../components/Headers";
  import { MetaTags } from "svelte-meta-tags";
  import { experiences } from "../constants/experiences";
  import { fade, fly } from "svelte/transition";
  import {
    home,
    homeFocusAreas,
    homeHero,
    homeNavigationCards,
    links,
    lastUpdated,
    sections,
    site,
    skillsData,
    projectsData
  } from "../constants";


const featuredExperiences = experiences.slice(0, 2);
  const featuredProjects = projectsData.slice(0, 2);
  const featuredSkills = skillsData.skills
    .flatMap((group) => group.items)
    .slice(0, 15);
</script>

<MetaTags
  title={site.title}
  description={site.description}
/>



<section>
  
  <div class="flex flex-row justify-end text-xs uppercase mb-3">
    <div class="tracking-[0.20em] text-slate-300/80">Last updated: {lastUpdated}</div>
  </div>

  <section class="mb-3">
    <!-- Option 1: Dark slate with white pop -->
        <div class="mb-2 rounded-xl border border-slate-700/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 text-center">
          <h1 class="mb-1 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-white to-slate-300 leading-tight">
          {homeHero.fullName}
          </h1>
          <p class="text-sm text-slate-300/80">{homeHero.title}</p>
        </div>

        <!-- Option 2: Charcoal with silver gradient -->
        <!-- <div class="mb-4 rounded-xl border border-zinc-700/20 bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950 p-4 text-center">
          <h1 class="mb-1 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300 leading-tight">
          {homeHero.fullName}
          </h1>
          <p class="text-sm text-zinc-300/90">{homeHero.title}</p>
        </div> -->

        <!-- Option 3: Dark with subtle slate edge glow -->
        <!-- <div class="mb-4 rounded-xl border border-slate-400/20 bg-gradient-to-r from-black via-zinc-950 to-black p-4 text-center shadow-lg shadow-slate-500/5">
          <h1 class="mb-1 text-6xl font-extrabold text-white leading-tight drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">
          {homeHero.fullName}
          </h1>
          <p class="text-sm text-slate-300/90">{homeHero.title}</p>
        </div> -->

    <div class="grid gap-2 items-center flex flex-row grid grid-cols-1 md:grid-cols-2 h-30">
      <figure class="relative flex flex-col" in:fly={{ x: 24, duration: 400 }}>
        <div
          class="aspect-square overflow-hidden rounded-xl border border-slate-400/40 bg-slate-800 shadow-xl ring-1 ring-slate-500/20"
        >
          <img
            src={homeHero.image.src}
            alt={homeHero.image.alt}
            class="object-cover transition duration-700 ease-out hover:scale-105"
            loading="lazy"
          />
        </div>

        <figcaption
          class="py-2 px-2 from-blue-800 to-purple-800 bg-gradient-to-r italic mt-2 uppercase text-sm text-slate-200 rounded-lg border border-slate-700/30 shadow-md"
        >
          <div class="flex justify-between items-center gap-2 whitespace-pre-line tracking-wide p-1">
          <span>{homeHero.quote}</span>
          </div>

          <div class="gap-2 tracking-wide text-[13px] text-right">
          <span>{homeHero.voice}</span>
          </div>
        </figcaption>
      </figure>

      <div class="space-y-1 flex flex-col h-full w-full">
        <div class="rounded-xl border border-slate-700/30 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-xl flex-1 flex justify-start items-center whitespace-pre-line min-w-0 overflow-hidden">
            <p class="text-2xl text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 via-purple-300 to-blue-400 text-left w-full min-w-0 break-words leading-[1.15] font-semibold">
              {homeHero.summary}
            </p>
        </div>
      </div>

    </div>
  </section>


  <section class="space-y-10">
    <div class="grid gap-2 md:grid-cols-3">
      {#each homeFocusAreas as focus, index}
        <div
          class="rounded-sm border border-yellow-500 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          in:fly={{ y: 20, delay: index * 120 + 150, duration: 400 }}
        >
            <h1 class="text-2xl font-semibold text-slate-100 italic">
            {focus.title}
            </h1>
            <p class="mt-3 text-lg text-slate-300">
            {focus.description}
            </p>
        </div>
      {/each}
    </div>
  </section>


   <section class="space-y-2">
    <div class="italic">
      <SectionHeader id="links" title="Let's Connect 🤝" customColor="teal-300" />
    </div>

    <div class="grid gap-6 grid-cols-3" in:fade>
      {#each links as link, index}
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          class="group relative overflow-hidden rounded-2xl border border-slate-500/20 bg-slate-900/70 p-3 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          in:fly={{ y: 18, delay: index * 80 }}
        >
          <div class="relative flex flex-row items-center gap-3 justify-center">
            {#if link.logo}
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 p-2 transition group-hover:scale-110">
                <img src={link.logo} alt={link.title} class="h-full w-full object-contain" />
              </div>
            {/if}

            <p class="text-sm font-semibold uppercase tracking-[0.15em] text-slate-300">{link.platform}</p>
          </div>
        </a>
      {/each}
    </div>
  </section>



  <section class="space-y-6">
    <SectionHeader id="highlights" title={sections.highlights} />
    
    <div class="grid gap-6 lg:grid-cols-2">
      <div
        class="rounded-2xl border border-slate-500/20 bg-slate-900/70 p-6 shadow-lg flex flex-col"
        in:fade
      >
        <h3 class="text-lg font-semibold text-slate-100">
          {home.experience.title}
        </h3>
        
        <div class="mt-4 space-y-4 flex-1 grid grid-rows-2">
          {#each featuredExperiences as experience, index}
          <div
            class="flex flex-col rounded-xl border border-slate-400/20 bg-gray-800 p-4 min-h-[180px]"
            in:fly={{ y: 16, delay: index * 120 }}
          >

          
            <p class="text font-semibold text-blue-300 uppercase tracking-[0.25em]" >
              {experience.company}
            </p>

            <p class="text-sm uppercase mt-1 text-base font-medium text-slate-300">
              {experience.role}
            </p>

            <div class="mt-2 h-0.5 w-5/6 mx-auto bg-gradient-to-r from-zinc-500 via-zinc-300 to-zinc-500" />


            <p class="mt-2 text text-slate-300 flex-1">
              {experience.summary}
            </p>
          </div>
          {/each}
        </div>

        <a
          href="/portfolio"
          class="mt-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.35em] text-slate-400 hover:text-slate-200"
          >{home.experience.viewFullTimeline}</a
        >
      </div>




      <div
        class="rounded-2xl border border-slate-500/20 bg-slate-900/70 p-6 shadow-lg flex flex-col"
        in:fade={{ delay: 120 }}
      >
        <h3 class="text-lg font-semibold text-slate-100">
          {home.projects.title}
        </h3>

        <div class="mt-4 space-y-4 flex-1 grid grid-rows-2">
          {#each featuredProjects as project, index}
            <div
              class="flex flex-col rounded-xl border border-slate-400/20 bg-gray-800 p-4 min-h-[180px]"
              in:fly={{ y: 16, delay: index * 120 }}
            >
              <p class=" text font-semibold uppercase tracking-[0.15em] text-green-400" >
                {project.title}
              </p>
              
              <p class="mt-2 text text-slate-300 flex-1">
                {project.description}
              </p>
              
              <a
                href={project.github ?? "#"}
                target={project.github ? "_blank" : undefined}
                rel={project.github ? "noopener noreferrer" : undefined}
                class="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.35em] text-slate-300 hover:text-slate-100"
              >
                {sections.openProject}
              </a>
              
            </div>
          {/each}
        </div>

        <a
          href="/portfolio"
          class="mt-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.35em] text-slate-400 hover:text-slate-200"
          >{home.projects.browseFullGallery}</a
        >
      </div>

    </div>
  </section>





  <section class="space-y-6">
    <SectionHeader id="navigation" title={sections.navigation} />
    <div class="grid gap-6 md:grid-cols-2" in:fade>
      {#each homeNavigationCards as card, index}
        <a
          href={card.href}
          class="group relative overflow-hidden rounded-2xl border border-slate-500/20 bg-slate-900/70 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
          in:fly={{ y: 18, delay: index * 100 + 100 }}
        >
          <div
            class="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-slate-500/10 blur-3xl transition group-hover:translate-x-3"
          />
          <h3 class="text-lg font-semibold text-slate-100">
            {card.title}
          </h3>
          <p class="mt-3 text text-slate-300">
            {card.description}
          </p>
          <span
            class="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.35em] text-slate-300 group-hover:text-slate-100"
            >{card.cta} →</span
          >
        </a>
      {/each}
    </div>
  </section>




  <section class="space-y-6">
    <SectionHeader id="toolkit" title={sections.toolkit} />
    <div class="flex flex-wrap gap-3" in:fade>
      {#each featuredSkills as skill, index}
        <span
          class="rounded-full border border-slate-400/40 bg-slate-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200"
          in:fly={{ y: 12, delay: index * 80 }}
        >
          {skill.name}
        </span>
      {/each}
    </div>

    <div class="flex justify-center w-full">
      <a
        href="/portfolio"
        class="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-red-200 hover:text-slate-100 transition"
      >
        {home.skills.seeCompleteStack}
      </a>
    </div>
  </section>
</section>
