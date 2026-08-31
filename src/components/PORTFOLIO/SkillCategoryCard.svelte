<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme, darkModeStore } from "../../constants/_theme";
  import { logoSrc } from "../../lib/utils";
  import type { SkillCategory } from "../../types";

  export let category: SkillCategory;
  export let index = 0;

  /* A mark that fails to load hides itself — a broken-image glyph in a skill
     chip looks worse than no logo at all. */
  function hideBrokenLogo(event: Event) {
    (event.currentTarget as HTMLImageElement).hidden = true;
  }
</script>

<!-- One accent for every category, deliberately. These cards used to take a
     different hue each — five of them on screen at once read as five unrelated
     things rather than one grid. The categories are peers; only the heading
     tells them apart. -->
<div
  class="group relative overflow-hidden rounded-sm border {$theme.border.default} {$theme.bg.card} p-4 shadow-lg transition-shadow"
  in:fly={{ y: 16, delay: index * 60 }}
>
  <span
    class="absolute inset-x-0 top-0 h-0.5 bg-brand"
    aria-hidden="true"
  />

  <h2 class="text-lg font-semibold uppercase {$theme.text.strong}">
    {category.category}
  </h2>

  <div class="mt-4 flex flex-wrap gap-2">
    {#each category.items as skill}
      <div
        class="flex items-center gap-2 rounded-sm border {$theme.border.light} {$theme.bg.cardElevated} px-2.5 py-2 transition-colors hover:border-brand/50"
      >
        {#if skill.logoUrl}
          <!-- object-contain because the box is square and a few marks are not:
               without it a wide logo is stretched to fit rather than letterboxed. -->
          <img
            src={logoSrc(skill.logoUrl, $darkModeStore)}
            alt={skill.name}
            class="h-6 w-6 flex-shrink-0 rounded object-contain"
            loading="lazy"
            on:error={hideBrokenLogo}
          />
        {/if}
        <span class="whitespace-nowrap text-sm font-semibold {$theme.text.primary}">
          {skill.name}
        </span>
      </div>
    {/each}
  </div>
</div>
