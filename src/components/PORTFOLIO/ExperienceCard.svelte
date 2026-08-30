<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";
  import type { Experience } from "../../types";
  import { TechBadge } from ".";
  import { getTechColors } from "../../lib/utils";
  // FX:background-gradient — animated halo behind the card
  import { BackgroundGradient } from "../fx";

  export let experience: Experience;
  export let index: number = 0;

  let skillMax = 8;

  // Use theme-aware card themes from the store
  /* experienceThemes, NOT cardThemes: the experience list is white/silver and
     the stack below it stays colourful. Two tables so the two asks can
     disagree. ("Just make everything in experience white/silver.") */
  $: cardTheme = $theme.experienceThemes[index % $theme.experienceThemes.length];

  /* Coloured as a SEQUENCE, not per badge: adjacent badges must never match.
     ("In stack two of the SAME color can never be side by side") */
  $: shownSkills = experience.skills.slice(0, skillMax);
  $: skillColors = getTechColors(shownSkills, $theme.techColors);
</script>

<!-- FX:background-gradient — see the note in ProjectCard.svelte for why this
     wraps instead of overlaying. Delete the wrapper tags to remove. -->
<!-- backdrop-blur-sm was removed from the card below: bg.card is already 80%
     opaque so it contributed almost nothing visually, but seven of these sat
     over the animating MatrixRain and re-blurred ~180K px each every frame. -->
<!--
  palette="silver", not "violet". THIS was the purple. ("The cards are still
  somewhat purple...fix the border.")

  Last pass made experienceThemes silver — bars, titles, badges, dividers — but
  every card is wrapped in this halo, which paints a blurred ring just outside
  the border and is therefore the widest-reaching colour on the card. A silver
  card inside a violet halo still reads as a purple-edged card, so recolouring
  the card alone could never finish the job.
-->
<BackgroundGradient class="h-full" radius="1rem" palette="silver" spread={3} idle={0.28}>
<div 
  class="group relative overflow-hidden rounded-2xl border {cardTheme.border} {$theme.bg.card} shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full"
  in:fly={{ y: 18, delay: index * 100 }}
>
  <!-- Left accent bar with unique color -->
  <div class="absolute left-0 top-0 h-full w-1 bg-gradient-to-b {cardTheme.accent}" />
  
  <div class="p-5 pl-6 space-y-5 flex-1 flex flex-col">
    <!-- Duration badge - top right corner style -->
    <div class="flex items-start justify-between gap-4 ">
      <div class="space-y-1">
        <h3 class="text-2xl font-bold bg-gradient-to-r {cardTheme.title} bg-clip-text text-transparent">
          {experience.company}
        </h3>
        <p class="text-md font-medium {cardTheme.role}">
          {experience.role}
        </p>
      </div>
      
      <!--
        DURATION: one colour on every card, and not white.
        ("the duration can all be a different color than white")

        cardTheme.badge is silver and steps per card, which is what made the
        row of dates read as more of the same. This is a fixed brand-cyan chip
        instead — fixed, so the six dates are one recognisable element rather
        than six variations, and cyan because it is the site accent and matches
        the stack section further down the same page.
      -->
      <span
        class="shrink-0 rounded-sm border border-brand/40 bg-brand/10 px-3 py-1.5 text-xs font-bold tracking-wide text-brand-strong"
      >
        {experience.duration}
      </span>
    </div>

    <!-- Summary with subtle separator.
         FIXED height, not min-height: summaries run 1-3 lines, and with only a
         minimum the block grew and pushed the tech row down, so the stacks
         started at different heights across cards (measured 193px vs 208px
         from the card top). A fixed three-line box lands every card's stack on
         the same line. updates.txt: "the stacks must start from same height". -->
    <div class="h-[5.5rem] pt-2 border-t {cardTheme.divider}">
      <p class="{$theme.text.secondary} text-md leading-relaxed line-clamp-3">
        {experience.summary}
      </p>
    </div>


    <div class="mt-auto min-h-[3rem]">
      <div class="flex flex-wrap gap-2">
        <!--
          COLOUR IS BACK on the stack, deliberately. ("Make experience card less
          stale. The inside design can stay as is. The stack can be alternate
          colors")

          Last pass these went neutral under "make everything in experience
          white/silver". That read as stale, which is the correction: the
          CHROME wanted to be silver — halo, border, accent bar, title — and the
          badges are content, where variation is information rather than noise.
        -->
        {#each shownSkills as tech, techIndex}
          <TechBadge {tech} index={techIndex} color={skillColors[techIndex]} />
        {/each}
        {#if experience.skills.length > skillMax}
          <!-- Stays neutral: this chip is a count, not a technology, so it
               should not pick up a colour from the alternating table. -->
          <span
            class="rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] border {$theme.border.light} bg-slate-400/10 {$theme.text.primary}"
          >
            +{experience.skills.length - skillMax} more
          </span>
        {/if}
      </div>
    </div>
  </div>
  
  <!-- Bottom glow on hover -->
  <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t {cardTheme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
</div>
</BackgroundGradient>
<!-- /FX:background-gradient -->
