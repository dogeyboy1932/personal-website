<script lang="ts">
  import { blog } from "../../constants/blog-page";
</script>

<div class="space-y-8">
  <div
    class="relative bg-black border-2 border-yellow-400 rounded-lg p-6 shadow-xl overflow-hidden"
  >
    <div
      class="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-yellow-500/5 to-yellow-400/10 animate-pulse"
    />

    <h1 class="text-3xl font-bold text-yellow-400 mb-6 relative z-10">
      {">>> TECH_INSIGHTS.EXE"}
    </h1>

    <div class="space-y-6 relative z-10">
      {#each blog.posts as post}
        <article
          class="border-l-2 border-yellow-400 pl-4 hover:border-yellow-300 transition-colors"
        >
          <h2 class="text-xl font-bold text-yellow-400 mb-2">{post.title}</h2>
          <p class="text-yellow-400/80 mb-2">{post.description}</p>
          <div class="flex items-center space-x-4 text-sm text-yellow-400/60">
            <span>Posted: {post.date}</span>
            <span>Read time: 5 min</span>
          </div>
        </article>
      {/each}
    </div>
  </div>
</div>
