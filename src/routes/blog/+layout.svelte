<script lang="ts">
  import { blogLayout } from "../../constants/blog-page";
</script>

<div class="min-h-full bg-zinc-900 text-zinc-100 p-8">
  <div class="max-w-7xl mx-auto">
    <div class="mb-12">
      <h1 class="text-4xl font-mono font-bold text-emerald-500">
        {blogLayout.title}
      </h1>
      <p class="mt-2 text-zinc-400">{blogLayout.description}</p>
    </div>

    <div class="space-y-8">
      <slot />
    </div>
  </div>
</div>
