<script lang="ts">
  import SectionHeader from "../components/Divs/SectionHeader.svelte";
  import { MetaTags } from "svelte-meta-tags";
  import { experiences } from "../constants/pages";
  import { projectsData } from "../constants/projects";
  import { skillsData } from "../constants/pages";
  import { fade, fly } from "svelte/transition";
  import {
    home,
    homeFocusAreas,
    homeHero,
    homeNavigationCards,
    homeQuickLinks,
  } from "../constants/home";

  const featuredExperiences = experiences.slice(0, 2);
  const featuredProjects = projectsData.projects.slice(0, 2);
  const featuredSkills = skillsData.skills
    .flatMap((group) => group.items)
    .slice(0, 8);
</script>

<MetaTags
  title="Akhil Gogineni — Portfolio"
  description="Discover Akhil Gogineni’s projects, experience, and passions across engineering and economics."
/>

<section class="space-y-12">
  <section class="space-y-10">
    <div
      class="grid items-center gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]"
    >
      <div class="space-y-6" in:fly={{ x: -24, duration: 400 }}>
        <p class="text-xs uppercase tracking-[0.45em] text-emerald-500">
          {homeHero.tagline}
        </p>
        <h1
          class="text-4xl sm:text-5xl font-semibold leading-tight text-slate-900 dark:text-slate-100"
        >
          {homeHero.title}
        </h1>
        <p class="text-lg text-slate-700 dark:text-slate-300">
          {homeHero.summary}
        </p>
        <div class="flex flex-wrap gap-3">
          {#each homeQuickLinks as link, i}
            <a
              href={link.href}
              class={`inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.35em] transition ${
                i === 0
                  ? "border-emerald-500 bg-emerald-500 text-black hover:bg-emerald-400"
                  : "border-emerald-400/60 text-emerald-300 hover:border-emerald-300"
              }`}
              in:fade={{ delay: i * 120 + 200, duration: 350 }}
            >
              {link.label}
            </a>
          {/each}
        </div>
      </div>

      <figure class="relative" in:fly={{ x: 24, duration: 400 }}>
        <div
          class="aspect-square overflow-hidden rounded-3xl border border-emerald-400/40 bg-slate-200/70 shadow-xl ring-1 ring-emerald-500/20 dark:bg-slate-800"
        >
          <img
            src={homeHero.image.src}
            alt={homeHero.image.alt}
            class="h-full w-full object-cover transition duration-700 ease-out hover:scale-105"
            loading="lazy"
          />
        </div>
        <figcaption
          class="mt-3 text-center text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400"
        >
          {homeHero.image.caption}
        </figcaption>
      </figure>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      {#each homeFocusAreas as focus, index}
        <div
          class="rounded-2xl border border-emerald-500/20 bg-white/70 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900/60"
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
    <SectionHeader id="highlights" title="Highlights" />
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
                Open project ↗
              </a>
            </div>
          {/each}
        </div>
        <a
          href="/projects"
          class="mt-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.35em] text-emerald-400 hover:text-emerald-200"
          >{home.projects.browseFullGallery}</a
        >
      </div>
    </div>
  </section>

  <section class="space-y-6">
    <SectionHeader id="navigation" title="Navigate" />
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
    <SectionHeader id="toolkit" title="Toolkit" />
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
    <a
      href="/skills"
      class="inline-flex text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300 hover:text-emerald-100"
      >{home.skills.seeCompleteStack}</a
    >
  </section>
</section>
