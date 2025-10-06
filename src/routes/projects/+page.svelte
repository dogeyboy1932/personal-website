<script lang="ts">
  import { SectionHeader } from "../../components/Headers";
  import { Button } from "../../components/Button";
  import {
    projectCardSummaries,
    projectPlaybookSteps,
    projectShowcaseIntro,
    projectShowcaseItems,
    projectsHero,
  } from "../../constants/projects-showcase";
  import { projects } from "../../constants/projects";
  import { fade, fly } from "svelte/transition";

  const projectHighlights = projectShowcaseItems.slice(0, 3);

  let activeProject = 0;
  $: showcaseProject =
    projectShowcaseItems[activeProject] ?? projectShowcaseItems[0];

  const complexityClasses = {
    Beginner: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
    Intermediate: "text-amber-300 bg-amber-500/10 border border-amber-400/20",
    Advanced: "text-rose-300 bg-rose-500/10 border border-rose-400/20",
  } as const;

  const techColors: Record<string, string> = {
    React: "text-blue-300",
    TensorFlow: "text-orange-300",
    Python: "text-yellow-300",
    WebGL: "text-cyan-300",
    "Node.js": "text-emerald-300",
    "D3.js": "text-pink-300",
    TypeScript: "text-blue-400",
    WebAssembly: "text-purple-300",
    Redis: "text-red-300",
    Go: "text-cyan-200",
    WebSocket: "text-sky-300",
    PostgreSQL: "text-blue-500",
    Docker: "text-blue-200",
    Kubernetes: "text-indigo-300",
  };

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

<section class="space-y-12">
  <section
    class="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
  >
    <div class="space-y-6" in:fly={{ x: -18, duration: 400 }}>
      <p class="text-xs uppercase tracking-[0.45em] text-emerald-500">
        {projectsHero.tagline}
      </p>
      <h1 class="text-4xl font-semibold text-slate-900 dark:text-slate-100">
        {projectsHero.title}
      </h1>
      <p class="text-base text-slate-600 dark:text-slate-300">
        {projectsHero.description}
      </p>
      <div class="grid gap-4 sm:grid-cols-3" in:fade>
        {#each projectHighlights as highlight, index}
          <div
            class="rounded-2xl border border-emerald-500/30 bg-white/70 p-4 text-sm shadow-lg dark:bg-slate-900/70"
            in:fly={{ y: 18, delay: index * 120 }}
          >
            <!-- <p class="text-xs uppercase tracking-[0.35em] text-emerald-400">{highlight.metrics.performance}</p> -->
            <p class="mt-2 font-semibold text-slate-900 dark:text-slate-100">
              {highlight.title}
            </p>
            <p class="mt-2 text-xs text-slate-600 dark:text-slate-300">
              {highlight.description}
            </p>
          </div>
        {/each}
      </div>
    </div>

    <figure class="relative" in:fly={{ x: 18, duration: 400 }}>
      <div
        class="aspect-[4/3] overflow-hidden rounded-3xl border border-emerald-400/40 bg-slate-900/70 shadow-2xl"
      >
        <img
          src={projectsHero.image.src}
          alt={projectsHero.image.alt}
          class="h-full w-full object-cover opacity-90"
          loading="lazy"
        />
      </div>
      <figcaption
        class="mt-3 text-center text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400"
      >
        {projectsHero.image.caption}
      </figcaption>
    </figure>
  </section>

  <section class="space-y-10">
    <div class="text-center space-y-4" in:fade>
      <div
        class="inline-flex items-center space-x-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300"
      >
        <span>{projectShowcaseIntro.tagline}</span>
      </div>
      <h2 class="text-4xl font-semibold text-slate-900 dark:text-slate-100">
        {projectShowcaseIntro.title}
      </h2>
      <p class="mx-auto max-w-2xl text-sm text-slate-600 dark:text-slate-300">
        {projectShowcaseIntro.subtitle}
      </p>
    </div>

    <div class="flex flex-wrap justify-center gap-2" in:fade={{ delay: 120 }}>
      {#each projectShowcaseItems as project, index}
        <button
          on:click={() => (activeProject = index)}
          class={`rounded-lg border px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition ${
            activeProject === index
              ? "border-emerald-500 bg-emerald-500 text-black"
              : "border-emerald-400/30 bg-white/10 text-emerald-200 hover:border-emerald-300/60"
          }`}
        >
          {project.title}
        </button>
      {/each}
    </div>

    <div
      class="overflow-hidden rounded-3xl border border-emerald-500/20 bg-white/70 shadow-2xl backdrop-blur dark:bg-slate-900/70"
      in:fade
    >
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="relative overflow-hidden">
          <img
            src={showcaseProject.image}
            alt={showcaseProject.title}
            class="h-80 w-full object-cover transition duration-700 ease-out lg:h-full"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"
          />
          <div class="absolute top-4 left-4">
            <span
              class={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] border ${
                showcaseProject.status === "Production"
                  ? "border-emerald-400 bg-emerald-500/10 text-emerald-200"
                  : "border-amber-400 bg-amber-500/10 text-amber-200"
              }`}
            >
              {showcaseProject.status}
            </span>
          </div>
          <div class="absolute top-4 right-4">
            <span
              class="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200"
            >
              {showcaseProject.category}
            </span>
          </div>
        </div>

        <div class="space-y-6 p-8 lg:p-12">
          <h3 class="text-3xl font-semibold text-slate-900 dark:text-slate-100">
            {showcaseProject.title}
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            {showcaseProject.description}
          </p>

          <div class="space-y-3">
            <h4
              class="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300"
            >
              {projects.techStack}
            </h4>
            <div class="flex flex-wrap gap-2">
              {#each showcaseProject.technologies as tech, index}
                <span
                  class={`rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold ${getTechColor(
                    tech
                  )}`}
                >
                  {tech}
                </span>
              {/each}
            </div>
          </div>

          <!-- <div class="grid gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:grid-cols-3">
						<div class="text-center">
							<p class="text-lg font-semibold text-emerald-300">{showcaseProject.metrics.performance}</p>
							<p class="text-xs uppercase tracking-[0.35em] text-slate-400">{projects.performance}</p>
						</div>
						<div class="text-center">
							<p class="text-lg font-semibold text-cyan-300">{showcaseProject.metrics.users}</p>
							<p class="text-xs uppercase tracking-[0.35em] text-slate-400">{projects.activeUsers}</p>
						</div>
						<div class="text-center">
							<p class="text-lg font-semibold text-emerald-200">{showcaseProject.metrics.processing}</p>
							<p class="text-xs uppercase tracking-[0.35em] text-slate-400">{projects.processing}</p>
						</div>
					</div> -->

          <div class="flex flex-col gap-3 sm:flex-row">
            <Button
              on:click={() => openLink(showcaseProject.demo)}
              class="bg-emerald-500 text-black hover:bg-emerald-400"
            >
              Live demo
            </Button>
            <Button
              variant="outline"
              on:click={() => openLink(showcaseProject.github)}
              class="border-emerald-400/60 text-emerald-200 hover:border-emerald-300 hover:text-emerald-100"
            >
              View code
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center space-x-2" in:fade={{ delay: 60 }}>
      {#each projectShowcaseItems as _, index}
        <button
          on:click={() => (activeProject = index)}
          class={`h-2.5 w-2.5 rounded-full transition ${
            activeProject === index
              ? "bg-emerald-400 scale-110"
              : "bg-emerald-400/40 hover:bg-emerald-400/60"
          }`}
        />
      {/each}
    </div>

    <div class="text-center" in:fade={{ delay: 80 }}>
      <Button
        variant="outline"
        on:click={() =>
          typeof window !== "undefined"
            ? (window.location.href = "/portfolio")
            : null}
        class="border-emerald-400/60 text-emerald-200 hover:border-emerald-300 hover:text-emerald-100"
      >
        View all projects
      </Button>
    </div>
  </section>

  <SectionHeader id="gallery" title="Project gallery" />
  <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3" in:fade>
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
            class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"
          />
          <div class="absolute top-4 right-4">
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
            <span
              class={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] ${
                complexityClasses[project.complexity]
              }`}
            >
              {project.complexity}
            </span>
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
          <!-- <div class="grid grid-cols-3 gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center text-xs uppercase tracking-[0.35em] text-slate-400">
						<div>
							<p class="text-sm font-semibold text-emerald-300">{project.metrics.performance}</p>
							<span>{projects.performance}</span>
						</div>
						<div>
							<p class="text-sm font-semibold text-cyan-300">{project.metrics.users}</p>
							<span>{projects.activeUsers}</span>
						</div>
						<div>
							<p class="text-sm font-semibold text-emerald-200">{project.metrics.processing}</p>
							<span>{projects.processing}</span>
						</div>
					</div> -->
        </div>
      </div>
    {/each}
  </div>

  <section class="space-y-6" in:fade>
    <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
      {projects.projectPlaybook}
    </h2>
    <div class="grid gap-6 md:grid-cols-2">
      {#each projectPlaybookSteps as step, index}
        <div
          class="rounded-2xl border border-emerald-500/20 bg-white/80 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900/60"
          in:fly={{ y: 18, delay: index * 100 }}
        >
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {step.step}
          </h3>
          <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
            {step.description}
          </p>
        </div>
      {/each}
    </div>
  </section>
</section>
