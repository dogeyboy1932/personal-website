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
  class="group relative overflow-hidden rounded-sm border {$theme.border.default} {accent.border} {$theme.bg.card} p-4 shadow-lg transition-shadow"
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

  <!--
    CONTENT-SIZED CHIPS, not a 2-column grid. ("improve stack section")

    The grid forced every chip to exactly half the card width, and the names
    that did not fit were truncated: JavaSc..., TypeS..., Tailwin..., Expres...,
    Postgr..., Supaba..., Mongo.... A stack section whose whole job is naming
    technologies cannot be abbreviating the names, and it got worse the moment
    the page was zoomed to 125% because every card became effectively narrower.

    flex-wrap with whitespace-nowrap chips inverts the relationship: each chip
    takes the width its name needs and the row wraps around it, so "JavaScript"
    and "C" both render correctly and nothing is ever cut. Logos come down
    8 -> 6 so a chip is not mostly icon.
  -->
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
