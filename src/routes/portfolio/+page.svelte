<script lang="ts">
  import { Badge } from "../../components/Badge";
  import { portfolio } from "../../constants/portfolio-page";
</script>

<div class="space-y-8">
  <div
    class="relative bg-black border-2 border-yellow-400 rounded-lg p-6 shadow-xl overflow-hidden"
  >
    <div
      class="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-yellow-500/5 to-yellow-400/10 animate-pulse"
    />

    <h1 class="text-3xl font-bold text-yellow-400 mb-6 relative z-10">
      {">>> PORTFOLIO_MATRIX.SYS"}
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
      {#each portfolio.projects as project}
        <div
          class="bg-black border border-yellow-400/50 rounded-lg p-4 hover:border-yellow-400 transition-colors group"
        >
          <div class="relative overflow-hidden rounded mb-4">
            <img
              src="/api/placeholder/400/200"
              alt={project.title}
              class="w-full h-48 object-cover rounded transition-transform group-hover:scale-105"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <h2 class="text-xl font-bold text-yellow-400 mb-2">
            {project.title}
          </h2>
          <p class="text-yellow-400/80 mb-4">{project.description}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            {#each project.technologies as tech}
              <Badge variant="outline" class="border-yellow-400 text-yellow-400"
                >{tech}</Badge
              >
            {/each}
          </div>
          <a
            href="#"
            class="text-yellow-400 hover:text-yellow-300 font-medium inline-flex items-center"
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
</div>
