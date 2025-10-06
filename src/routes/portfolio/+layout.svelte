<script lang="ts">
  import { portfolioLayout } from "../../constants/portfolio-page";
</script>

<div class="min-h-full bg-zinc-900 text-zinc-100 p-8">
  <div class="max-w-7xl mx-auto">
    <div class="mb-12">
      <h1 class="text-4xl font-mono font-bold text-emerald-500">
        {portfolioLayout.title}
      </h1>
      <p class="mt-2 text-zinc-400">{portfolioLayout.description}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <slot />
    </div>
  </div>
</div>
