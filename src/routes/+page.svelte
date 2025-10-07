<script lang="ts">
  import { SectionHeader } from "../components/Headers";
  import { MetaTags } from "svelte-meta-tags";
  import { experiences } from "../constants/pages";
  import { projectsData } from "../constants/portfolio";
  import { skillsData } from "../constants/pages";
  import { fade, fly } from "svelte/transition";
  import {
    home,
    homeFocusAreas,
    homeHero,
    homeNavigationCards,
    homeQuickLinks,
    lastUpdated
  } from "../constants/home";
  import { site } from "../constants/site";
  import { sections } from "../constants/sections";

const featuredExperiences = experiences.slice(0, 2);
  const featuredProjects = projectsData.projects.slice(0, 2);
  const featuredSkills = skillsData.skills
    .flatMap((group) => group.items)
    .slice(0, 10);
</script>

<MetaTags
  title={site.title}
  description={site.description}
/>



<section>
  
  <div class="flex flex-row justify-between text-xs uppercase mb-5">
    <div class="tracking-[0.45em] text-emerald-500"> {homeHero.tagline} </div>
    <div class="tracking-[0.20em] text-slate-500/80">{lastUpdated}</div>
  </div>

  <section class="mb-3 space-y-10">
    
    <div class="space-y-10">
      <div
        class="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]"
      >
        <div class="space-y-1 flex flex-col" in:fly={{ x: -24, duration: 400 }}>
              
          <!-- Option 1: Dark slate with white pop -->
          <div class="mb-3 rounded-xl border border-slate-700/30 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 text-center">
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

          <!-- Option 3: Dark with subtle emerald edge glow -->
          <!-- <div class="mb-4 rounded-xl border border-emerald-400/20 bg-gradient-to-r from-black via-zinc-950 to-black p-4 text-center shadow-lg shadow-emerald-500/5">
            <h1 class="mb-1 text-6xl font-extrabold text-white leading-tight drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">
              {homeHero.fullName}
            </h1>
            <p class="text-sm text-slate-300/90">{homeHero.title}</p>
          </div> -->

          <div class="rounded-md p-4 shadow-md dark:bg-slate-900 flex-1">
            <p class="text-3xl text-slate-700 dark:text-slate-300">
              {homeHero.summary}
            </p>
          </div>
        </div>


        <figure class="relative flex flex-col" in:fly={{ x: 24, duration: 400 }}>
          <div
            class="aspect-square overflow-hidden rounded-xl border border-emerald-400/40 bg-slate-200/70 shadow-xl ring-1 ring-emerald-500/20 dark:bg-slate-800"
          >
            <img
              src={homeHero.image.src}
              alt={homeHero.image.alt}
              class="h-full w-full object-cover transition duration-700 ease-out hover:scale-105"
              loading="lazy"
            />
          </div>

            <figcaption
            class="py-2 px-3 bg-slate-300 mt-3 text-center text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-900 rounded-sm"
          >
            {homeHero.image.caption}
          </figcaption>
        </figure>

      </div>
    </div>
  </section>


  <section class="space-y-10">
    <div class="grid gap-3 md:grid-cols-3">
      {#each homeFocusAreas as focus, index}
        <div
          class="rounded-2xl border border-emerald-500/20 bg-white/70 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:bg-slate-500/60"
          in:fly={{ y: 20, delay: index * 120 + 150, duration: 400 }}
        >
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {focus.title}
          </h2>
          <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
            {focus.description}
          </p>
        </div>
      {/each}
    </div>
  </section>



  <section class="space-y-6">
    <SectionHeader id="highlights" title={sections.highlights} />
    <div class="grid gap-6 lg:grid-cols-2">
      <div
        class="rounded-2xl border border-emerald-500/20 bg-white/80 p-6 shadow-lg dark:bg-slate-900/70"
        in:fade
      >
        <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {home.experience.title}
        </h3>
        <div class="mt-4 space-y-4">
          {#each featuredExperiences as experience, index}
            <div
              class="rounded-xl border border-emerald-400/20 bg-slate-50/70 p-4 dark:bg-slate-800/70"
              in:fly={{ y: 16, delay: index * 120 }}
            >
              <p
                class="text-sm font-semibold text-emerald-500 uppercase tracking-[0.35em]"
              >
                {experience.company}
              </p>
              <p
                class="mt-2 text-base font-medium text-slate-900 dark:text-slate-100"
              >
                {experience.role}
              </p>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {experience.description}
              </p>
            </div>
          {/each}
        </div>
        <a
          href="/experience"
          class="mt-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400 hover:text-emerald-200"
          >{home.experience.viewFullTimeline}</a
        >
      </div>

      <div
        class="rounded-2xl border border-emerald-500/20 bg-white/80 p-6 shadow-lg dark:bg-slate-900/70"
        in:fade={{ delay: 120 }}
      >
        <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {home.projects.title}
        </h3>
        <div class="mt-4 space-y-4">
          {#each featuredProjects as project, index}
            <div
              class="rounded-xl border border-emerald-400/20 bg-slate-50/70 p-4 dark:bg-slate-800/70"
              in:fly={{ y: 16, delay: index * 120 }}
            >
              <p
                class="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-500"
              >
                {project.title}
              </p>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {project.description}
              </p>
              <a
                href={project.githubLink ?? "#"}
                target={project.githubLink ? "_blank" : undefined}
                rel={project.githubLink ? "noopener noreferrer" : undefined}
                class="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300 hover:text-emerald-100"
              >
                {sections.openProject}
              </a>
            </div>
          {/each}
        </div>
        <a
          href="/portfolio"
          class="mt-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400 hover:text-emerald-200"
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
          class="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-white/80 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900/70"
          in:fly={{ y: 18, delay: index * 100 + 100 }}
        >
          <div
            class="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl transition group-hover:translate-x-3"
          />
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {card.title}
          </h3>
          <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
            {card.description}
          </p>
          <span
            class="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300 group-hover:text-emerald-100"
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
          class="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200"
          in:fly={{ y: 12, delay: index * 80 }}
        >
          {skill.name}
        </span>
      {/each}
    </div>

    <div class="flex justify-center w-full">
      <a
        href="/portfolio"
        class="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-red-200 hover:text-emerald-100 transition"
      >
        {home.skills.seeCompleteStack}
      </a>
    </div>
  </section>
</section>
