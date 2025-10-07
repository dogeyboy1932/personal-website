<script lang="ts">
  import { labels } from "../../constants/labels";
  export let title = "Untitled";
  export let description = "";
  export let image = "/api/placeholder/800/400";
  export let technologies = [] as string[];
  export let demo: string | undefined = undefined;
  export let github: string | undefined = undefined;
  export let status = "Prototype";
</script>

<div class="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-white/80 shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900/70">
  <div class="relative h-48 overflow-hidden">
    <img src={image} alt={title} class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
    <div class="absolute top-4 right-4">
      <span class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] border border-emerald-400 bg-emerald-500/10 text-emerald-200">{status}</span>
    </div>
  </div>
  <div class="space-y-4 p-6">
    <div class="flex items-start justify-between gap-3">
      <div>
        <h3 class="text-xl font-semibold text-slate-900 transition group-hover:text-emerald-300 dark:text-slate-100">{title}</h3>
        <p class="text-xs uppercase tracking-[0.35em] text-slate-500">{labels.projectType}</p>
      </div>
    </div>
    <p class="text-sm text-slate-600 dark:text-slate-300">{description}</p>
    <div class="flex flex-wrap gap-2">
      {#each technologies.slice(0,4) as tech}
        <span class="rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] border border-emerald-400/30 bg-emerald-500/10 text-emerald-200">{tech}</span>
      {/each}
      {#if technologies.length > 4}
        <span class="rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] border border-emerald-400/30 bg-emerald-500/10 text-emerald-200">+{technologies.length - 4} more</span>
      {/if}
    </div>
    <div class="flex gap-3 mt-3">
      {#if demo}
        <a href={demo} target="_blank" rel="noopener" class="inline-flex items-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-black hover:bg-emerald-400">{labels.liveDemo}</a>
      {/if}
      {#if github}
        <a href={github} target="_blank" rel="noopener" class="inline-flex items-center rounded-md border border-emerald-400/60 px-3 py-2 text-sm font-semibold text-emerald-200 hover:border-emerald-300">{labels.viewCode}</a>
      {/if}
    </div>
  </div>
</div>
