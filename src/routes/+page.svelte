<script lang="ts">
  // External dependencies
  import { MetaTags } from "svelte-meta-tags";
  import { fade } from "svelte/transition";
  import { breakpoints, theme } from "../lib/stores";
  // FX:scroll-reveal — blurred-to-crisp entrance as each section scrolls in
  import { scrollReveal } from "../lib/actions/scrollReveal";
  // FX:side-rays — volumetric light fanning across the hero
  // HoverBorderGradient dropped: the travelling arc moved to the "Find me"
  // button on /more so exactly one button on the site carries it.
  import { SideRays, SparkleField, ParticleText } from "../components/Creative";

  import { homeFocusAreas } from "../constants";
  
  // Components
  import { SectionHeader } from "../components/Headers";
  import { 
    SocialLinkButton, 
    HeroImage,
    FocusCard
  } from "../components/HOME";
  
  // Constants and data
  import {
    homeHero,
    homeQuickLinks,
    links,
    sections,
    site,
  } from "../constants";

  // NavigationCard / SkillBadge / homeNavigationCards / skillsData still exist,
  // just unused here — restoring either band is an import away.
</script>

<MetaTags title={site.title} description={site.description} />


<!-- ===== HERO SECTION ===== -->
<!-- FX:scroll-reveal (hero reveals immediately; no offset so it does not fight the fly-in) -->
<!-- mb-0: the hero had trailing space that pushed "Mainly focused on" down.
     ("MOve the mainly focused on a bit higher") -->
<section class="relative mb-0 font-sans" use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}>
  <!-- FX:side-rays — section level, no `overlay`, so z-index 0 paints behind
       BOTH columns. CAVEAT: siblings that must sit above it need `relative`;
       a non-positioned block child paints earlier than a positioned z-0 one. -->
  <SideRays
    side="right"
    count={2}
    opacity={0.46}
    speed={13}
    spread={30}
    widthScale={1.8}
    hue="warm"
  />
  <!-- /Creative:side-rays -->

  <!-- CAVEAT: minmax(0,1fr), not 1fr. A bare 1fr is minmax(AUTO,1fr), so the
       column will not shrink below its content and the photo overflowed the
       page by ~103px below 900px. -->
  <div
    class="relative z-10 grid gap-3"
    class:grid-cols-1={!$breakpoints.isDesktop}
    class:grid-cols-[65%_minmax(0,1fr)]={$breakpoints.isDesktop}
  >
    
    <!-- Left Column: Header and Summary -->
    <!-- min-w-0: without it a grid child's min-content width becomes the
         column's floor, which is the same overflow bug by another route. -->
    <div class="relative flex min-w-0 flex-col flex-1 md:flex-[1] justify-center gap-3">
      <!-- FX:side-rays — scoped to THIS column, not the whole section.
           It used to sit on the section at z-30 with the photo column at z-40,
           which does not work: the photo column is nested inside the hero grid,
           and that grid is z-10, so the entire grid (z-40 child included)
           paints beneath the rays. A child cannot escape its parent's stacking
           context. Confining the rays to the text column means they physically
           cannot reach the photo or the quote, with no z-index reasoning to get
           wrong. ("AND THE BEAM STILL CROSSES THE PHOTO AND QUOTES") -->

      
      <!-- Header Box -->
          <div class="relative flex items-center justify-center p-4 rounded-xl">
        <!-- FX:sparkles FX:gravity-stars — covers the whole title block: name,
             university and the three social links -->
        <!-- Reaches ~24px above the title block and ~110px below it, which
             lands inside the blurb without passing it. ("make particles in hero
             descend further into the blurb section but not further than that.
             Particles can also go a little bit higher") The field is
             pointer-events:none, so covering the blurb costs no selection or
             link behaviour. -->
        <SparkleField density={6} pointerPull={150} bleedTop={24} bleedBottom={110} />
        <!-- /Creative:sparkles /Creative:gravity-stars -->

        <div class="relative z-10 text-left">
          <!-- relative: the name's radial halo below is absolutely positioned
               against this box. -->
          <div class="relative flex flex-col">
            <!-- FX:particle-text — gated by homeHero.particleName.
                 look="plain": nanotech strokes hairlines between neighbouring
                 particles, which read as threads spanning the glyph gaps. -->
            <!-- One container glow: a blurred rounded rectangle behind the
                 block, not a halo per letter. -->
            <!--
              WHY THIS LOOKED YELLOW. The halo was already pure white, but at
              0.16 it was thinner than the amber SideRays wash sitting behind it
              at 0.46, so the two composited to a warm cream.
              ("make glow white bright silver...it's looking yellowy right now")

              I fixed that by cranking the halo to 0.34 so white would dominate
              the warm wash. It did, and overshot: "Glow is way too bright."

              The real fix was upstream and landed this pass — FX:sparkles was
              running on --particles = amber, so the yellow cast was the
              PARTICLES, not the halo. With those now silver there is no warm
              source left here to out-shout, so the halo drops to 0.14: it is
              back to lifting the word off the background rather than lighting
              the whole block.
            -->
            <span
              aria-hidden="true"
              class="pointer-events-none absolute -inset-x-6 -inset-y-5 -z-10 rounded-3xl bg-white/[0.07] blur-2xl"
            />
            <!-- No drop-shadow: that is a glyph-shaped glow, which is the
                 thing being replaced by the rectangle above. -->
            <h1 class="relative uppercase text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight {$theme.text.primary} leading-[0.95]">
              {#if homeHero.particleName}
                <ParticleText
                  text={homeHero.fullName.toUpperCase()}
                  look="plain"
                  gap={2}
                  radius={110}
                  force={3}
                />
              {:else}
                {homeHero.fullName}
              {/if}
            </h1>
            <!-- /Creative:particle-text -->

            <h2 class="mt-3 text-lg sm:text-xl md:text-2xl font-display font-extrabold {$theme.text.primary} tracking-[0.2em] uppercase">
              {homeHero.role}
            </h2>

            <!-- .meta-label-strong — the same class as "Also around campus"
                 and "Honors" on /more, so the three move together. -->
            <!-- The one warm accent left in the hero now that the sparkles
                 went silver. text-warm-deep (amber-600) rather than text-warm
                 (amber-400): "Make UIUC '26 a lil darker orange". -->
            <p class="meta-label-strong mt-1.5 text-xs sm:text-sm {$theme.text.muted}">
              {homeHero.age}
              <span aria-hidden="true" class="{$theme.text.dim} mx-1.5">·</span>
              <span class="text-warm-deep">{homeHero.credential}</span>
              <span aria-hidden="true" class="{$theme.text.dim} mx-1.5">·</span>
              {homeHero.location}
            </p>
          </div>

          <!-- Social Links -->
          <div class="flex flex-row gap-2 items-center justify-start mt-4"> 
            {#each links as link, index}
              <SocialLinkButton 
                href={link.href} 
                logo={link.logo} 
                title={link.title}
                {index} 
              />
            {/each}
          </div>
        </div>
      </div>

      
      <!-- Divider. `relative` for the same paint-order reason as the summary. -->
      <div class="relative mx-auto w-[90%] border-t {$theme.border.divider}" />

      
      <!-- Summary Text -->
      <!-- backdrop-blur-sm removed; see the note on the header box above. -->
      <!-- `relative` is load-bearing — see the side-rays caveat above. -->
      <div class="relative flex flex-col items-center gap-5 py-3 px-8">
        <!-- Larger and brighter than before: this is the five-second answer to
             "who is this", and it was previously small, light-weight grey that
             read as filler next to the name. -->
        <p class="text-lg sm:text-xl leading-relaxed {$theme.text.primary} font-sans font-normal whitespace-pre-line">
          {homeHero.summary}
        </p>

        <!-- ===== QUICK LINKS =====
             Inside the hero column, directly beneath the blurb, centred.
             ("Move them a little more upward and center it. It can honestly go
             under the blurb.")

             Replaces the "Also Check Out" card grid and the "Stack" badge band;
             the third link is /portfolio#skills, an anchor straight to the
             stack rather than the top of that page.

             PLAIN BORDER, not the travelling arc. ("Remove the border glow.
             That should only apply to one button." / "Have a border for those
             buttons instead of the glow animation.") The arc moved to the
             "Find me" button on /more, so exactly one button on the site has
             it and it reads as emphasis again rather than as a default style.

             No scroll-reveal: this sits inside the first viewport, so a
             scroll-triggered reveal would start blurred and never un-blur. -->
        <!-- Sheen is transform-only: this hero sits over an animating canvas
             and a blurred ray layer, so a paint-triggering hover would show. -->
        <nav class="flex flex-wrap justify-center gap-3.5" aria-label="Quick links">
          {#each homeQuickLinks as link, i}
            <a
              href={link.href}
              class="group relative overflow-hidden rounded-xl border {$theme.border.default} {$theme.bg.secondary} px-7 py-3.5 font-display text-sm font-bold uppercase tracking-[0.14em] {$theme.text.primary} shadow-lg transition-all duration-300 hover:border-warm/70 hover:shadow-warm/10 {$theme.hover.scaleSmall}"
            >
              <!-- Travelling sheen. -translate-x-full at rest, so it is parked
                   off the left edge and the clip hides it entirely. -->
              <span
                aria-hidden="true"
                class="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-warm/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />

              <span class="relative flex items-center gap-2.5">
                <!-- <span class="text-[0.65rem] font-extrabold tabular-nums text-warm/70"
                  >0{i + 1}</span
                > -->
                {link.label}
                <span
                  aria-hidden="true"
                  class="inline-block {$theme.text.muted} transition-all duration-300 group-hover:translate-x-1 group-hover:text-warm"
                  >&rarr;</span
                >
              </span>
            </a>
          {/each}
        </nav>
      </div>
    </div>


    <!-- Right column: photo and quote. -->
    <div class="relative z-40 flex min-w-0 flex-col">
      <HeroImage 
        src={homeHero.image.src} 
        alt={homeHero.image.alt} 
        quotes={homeHero.quotes} 
      />
    </div>

  </div>
</section>


<!-- <div class="mx-auto w-[95%] border-t border-slate-500/50" /> -->


<!-- ===== FOCUS AREAS SECTION ===== -->
<!-- FX:scroll-reveal -->
<section class="mt-0 mb-8" use:scrollReveal>

  <div>
    <h3 class="meta-label text-base text-xl {$theme.text.muted} font-bold mb-3 ml-2">{sections.focuses}</h3>
    
    <div class="grid gap-4" class:grid-cols-1={$breakpoints.isMobile} class:grid-cols-3={!$breakpoints.isMobile}>
      {#each homeFocusAreas as focus, index}
        <FocusCard title={focus.title} description={focus.description} {index} />
      {/each}
    </div>
  </div>

</section>




