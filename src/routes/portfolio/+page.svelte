<script lang="ts">
  import { Badge } from "../../components/Badge";
  import { portfolio } from "../../constants/portfolio-page";
</script>

<div class="space-y-8">
  <h1 class="text-4xl font-semibold text-slate-900 dark:text-slate-100">
    {">>> PORTFOLIO_MATRIX.SYS"}
  </h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each portfolio.projects as project}
      <div
        class="group rounded-2xl border border-emerald-500/20 bg-white/80 p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900/70"
      >
        <div class="relative mb-4 overflow-hidden rounded">
          <img
            src="/api/placeholder/400/200"
            alt={project.title}
            class="h-48 w-full rounded object-cover transition-transform group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>
        <h2
          class="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2"
        >
          {project.title}
        </h2>
        <p class="text-slate-600 dark:text-slate-400 mb-4">
          {project.description}
        </p>
        <div class="mb-4 flex flex-wrap gap-2">
          {#each project.technologies as tech}
            <Badge
              variant="outline"
              class="border-emerald-400/60 text-emerald-300"
              >{tech}</Badge
            >
          {/each}
        </div>
        <a
          href="#"
          class="font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center"
        >
          {"View Project "}
          <span class="ml-1 transition-transform group-hover:translate-x-1"
            >→</span
          >
        </a>
      </div>
    {/each}
  </div>
</div>
