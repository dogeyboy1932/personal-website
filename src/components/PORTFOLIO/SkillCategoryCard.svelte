<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";
  import type { SkillCategory } from "../../types";

  export let category: SkillCategory;
</script>

<div class="{$theme.bg.card} rounded-2xl border {$theme.border.default} p-6 shadow-lg" in:fly={{ y: 16 }}>
  <h2 class="uppercase text-lg font-semibold {$theme.text.primary}">{category.category}</h2>
  
  <div class="mt-4 grid gap-2 sm:grid-cols-1 md:grid-cols-2">
    {#each category.items as skill}
      <div class="flex items-center gap-3 rounded-md border {$theme.border.light} {$theme.bg.cardElevated} p-3 min-w-0">
        {#if skill.logoUrl}
          <img src={skill.logoUrl} alt={skill.name} class="h-8 w-8 rounded flex-shrink-0" />
        {/if}

        <div class="min-w-0 flex-1">
          <div class="{$theme.text.primary} font-semibold truncate">{skill.name}</div>
        </div>
      </div>
    {/each}
  </div>
</div>
