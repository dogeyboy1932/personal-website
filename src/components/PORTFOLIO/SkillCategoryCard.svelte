<!--
  /portfolio: one card per stack category.

  COLOUR. ("Make the stack colorful but try beind consistent with cyberpunk and
  futuristic theme on the portfolio page.")

  The stack was six identical slate cards — the only monochrome block on a page
  whose experience cards carry an accent each. It now takes an accent per
  category from the SAME cyan -> magenta neon arc the experience cards use
  (theme.cardThemes), so the two halves of the page read as one system instead
  of one coloured section above one grey one.

  Deliberately restrained about WHERE the colour lands: a top hairline, the
  category title, and a tinted hover on each chip. The logos are full-colour
  brand marks, so a tinted card fill would fight them — the accent frames the
  group rather than washing it.

  `index` picks the accent. It comes from the parent's {#each}, so the ramp runs
  in reading order down the grid rather than being assigned per category name.
-->
<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";
  import type { SkillCategory } from "../../types";

  export let category: SkillCategory;
  /** Position in the grid; selects the accent off the shared neon ramp. */
  export let index = 0;

  $: accent = $theme.cardThemes[index % $theme.cardThemes.length];
</script>

<div
  class="group relative overflow-hidden rounded-sm border {$theme.border.default} {accent.border} {$theme.bg.card} p-6 shadow-lg transition-shadow"
  in:fly={{ y: 16, delay: index * 60 }}
>
  <!-- The card's accent: a hairline across the top edge. -->
  <span
    class="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r {accent.accent}"
    aria-hidden="true"
  />

  <h2 class="bg-gradient-to-r {accent.title} bg-clip-text text-lg font-semibold uppercase text-transparent">
    {category.category}
  </h2>

  <div class="mt-4 grid gap-2 sm:grid-cols-1 md:grid-cols-2">
    {#each category.items as skill}
      <div
        class="flex min-w-0 items-center gap-3 rounded-sm border {$theme.border.light} {$theme.bg.cardElevated} p-3 transition-colors {accent.border}"
      >
        {#if skill.logoUrl}
          <img src={skill.logoUrl} alt={skill.name} class="h-8 w-8 flex-shrink-0 rounded" />
        {/if}

        <div class="min-w-0 flex-1">
          <div class="truncate font-semibold {$theme.text.primary}">{skill.name}</div>
        </div>
      </div>
    {/each}
  </div>
</div>
