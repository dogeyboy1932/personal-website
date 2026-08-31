<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";
  import type { SkillCategory } from "../../types";

  export let category: SkillCategory;
  export let index = 0;

  $: accent = $theme.cardThemes[index % $theme.cardThemes.length];
</script>

<div
  class="group relative overflow-hidden rounded-sm border {$theme.border.default} {accent.border} {$theme.bg.card} p-4 shadow-lg transition-shadow"
  in:fly={{ y: 16, delay: index * 60 }}
>
  <span
    class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r {accent.accent}"
    aria-hidden="true"
  />

  <h2 class="bg-gradient-to-r {accent.title} bg-clip-text text-lg font-semibold uppercase text-transparent">
    {category.category}
  </h2>

  <div class="mt-4 flex flex-wrap gap-2">
    {#each category.items as skill}
      <div
        class="flex items-center gap-2 rounded-sm border {$theme.border.light} {$theme.bg.cardElevated} px-2.5 py-2 transition-colors {accent.border}"
      >
        {#if skill.logoUrl}
          <img src={skill.logoUrl} alt={skill.name} class="h-6 w-6 flex-shrink-0 rounded" />
        {/if}
        <span class="whitespace-nowrap text-sm font-semibold {$theme.text.primary}">
          {skill.name}
        </span>
      </div>
    {/each}
  </div>
</div>
