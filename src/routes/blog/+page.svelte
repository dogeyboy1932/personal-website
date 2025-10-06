<script lang="ts">
  import { blog } from "../../constants/blog-page";
</script>

<div class="space-y-8">
  <h1 class="text-4xl font-semibold text-slate-900 dark:text-slate-100">
    {">>> TECH_INSIGHTS.EXE"}
  </h1>

  <div class="space-y-6">
    {#each blog.posts as post}
      <article
        class="border-l-2 border-emerald-500/40 pl-4 transition hover:border-emerald-400"
      >
        <h2
          class="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2"
        >
          {post.title}
        </h2>
        <p class="text-slate-600 dark:text-slate-400 mb-2">
          {post.description}
        </p>
        <div
          class="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-500"
        >
          <span>Posted: {post.date}</span>
          <span>Read time: 5 min</span>
        </div>
      </article>
    {/each}
  </div>
</div>
