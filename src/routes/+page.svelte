<script lang="ts">
  // External dependencies
  import { MetaTags } from "svelte-meta-tags";
  import { fade } from "svelte/transition";
  import { breakpoints, theme } from "../lib/stores";
  // FX:scroll-reveal — blurred-to-crisp entrance as each section scrolls in
  import { scrollReveal } from "../lib/actions/scrollReveal";
  // FX:side-rays — volumetric light fanning across the hero
  import { SideRays, SparkleField, HoverBorderGradient, ParticleText } from "../components/fx";

  import { homeFocusAreas } from "../constants";
  
  // Components
  import { SectionHeader } from "../components/Headers";
  import { 
    SocialLinkButton, 
    NavigationCard, 
    SkillBadge,
    HeroImage,
    FocusCard
  } from "../components/HOME";
  
  // Constants and data
  import {
    home,
    homeHero,
    homeNavigationCards,
    links,
    sections,
    site,
    skillsData,
  } from "../constants";

  // Featured content selection
  const featuredSkills = skillsData.skills
    .flatMap((group) => group.items)
    .slice(0, 14);
</script>

<MetaTags title={site.title} description={site.description} />


<!-- ===== HERO SECTION ===== -->
<!-- FX:scroll-reveal (hero reveals immediately; no offset so it does not fight the fly-in) -->
<!-- mb-0: the hero had trailing space that pushed "Mainly focused on" down.
     ("MOve the mainly focused on a bit higher") -->
<section class="relative mb-0 font-sans" use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}>
  <!--
    minmax(0,1fr), not 1fr. A bare `1fr` is minmax(AUTO,1fr): the column refuses
    to shrink below its content's min-content width, so below ~900px the photo
    column pushed past the page panel by up to 103px and the document scrolled
    sideways. minmax(0,...) lets it actually shrink. ("If my picture overflows
    outside the entire page container, that's a problem. It should NEVER
    overflow")
  -->
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
      <!-- Dimmer: at 0.5 the wash was competing with the hero copy.
           ("don't make the beams too bright...it's becomming a bit an issue
           with seeing the hero text.") -->
      <SideRays side="right" count={2} opacity={0.28} speed={13} spread={16} hue="warm" overlay />
      <!-- /FX:side-rays -->

      
      <!-- Header Box -->
      <!-- backdrop-blur-sm removed: this box has no background of its own, so
           the blur only softened the matrix rain behind the text, and it sits
           over an animating canvas so it could never be cached. -->
      <div class="relative flex items-center justify-center p-4 rounded-xl">
        <!-- FX:sparkles FX:gravity-stars — covers the whole title block: name,
             university and the three social links -->
        <SparkleField density={6} pointerPull={150} />
        <!-- /FX:sparkles /FX:gravity-stars -->

        <div class="relative z-10 text-left">
          <div class="flex flex-col">
            <!-- FX:particle-text — gated by homeHero.particleName in
                 src/constants/home.ts; off renders the plain heading -->
            <h1 class="uppercase text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight {$theme.text.primary} leading-[0.95]">
              {#if homeHero.particleName}
                <ParticleText
                  text={homeHero.fullName.toUpperCase()}
                  look="nanotech"
                  gap={2}
                  radius={110}
                  force={3}
                  linkDistance={13}
                />
              {:else}
                {homeHero.fullName}
              {/if}
            </h1>
            <!-- /FX:particle-text -->

            <!-- Two lines by design: the role carries more weight than the
                 credentials, so it gets its own line rather than being buried
                 in a single run-on row of separators. -->
            <!-- Bright primary text, not amber and not cyan. Two notes pulled in
                 opposite directions here — "AI Engineer should be a diff color
                 than orange" and later "the cyan text is looking kinda ugly.
                 revert the text color for all of it" — so the role reads by
                 WEIGHT rather than by hue. -->
            <h2 class="mt-3 text-lg sm:text-xl md:text-2xl font-display font-extrabold {$theme.text.primary} tracking-[0.2em] uppercase">
              {homeHero.role}
            </h2>

            <p class="mt-1 text-xs sm:text-sm font-sans {$theme.text.muted} tracking-[0.18em] uppercase">
              {homeHero.age}
              <span aria-hidden="true" class="{$theme.text.dim} mx-1.5">·</span>
              {homeHero.credential}
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

      
      <!-- Divider -->
      <div class="mx-auto w-[90%] border-t {$theme.border.divider}" />

      
      <!-- Summary Text -->
      <!-- backdrop-blur-sm removed; see the note on the header box above. -->
      <div class="flex items-center py-3 px-8">
        <!-- Larger and brighter than before: this is the five-second answer to
             "who is this", and it was previously small, light-weight grey that
             read as filler next to the name. -->
        <p class="text-lg sm:text-xl leading-relaxed {$theme.text.primary} font-sans font-normal whitespace-pre-line">
          {homeHero.summary}
        </p>
      </div>
    </div>


    <!-- Right Column: Photo and Quote.
         z-40 puts it ABOVE FX:side-rays (z-30, overlay mode) so the beams no
         longer wash across the photo and the quote card. ("make the picture and
         quote stuff not be glared by the side beams. Worst case move it 'in
         front' of the side beams.") The rays still cross the text column, which
         is where they read as light rather than glare. -->
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
<section class="mt-2 mb-8" use:scrollReveal>

  <div>
    <h3 class="meta-label text-base text-xl {$theme.text.muted} font-bold mb-3 ml-2">{sections.focuses}</h3>
    
    <div class="grid gap-4" class:grid-cols-1={$breakpoints.isMobile} class:grid-cols-3={!$breakpoints.isMobile}>
      {#each homeFocusAreas as focus, index}
        <FocusCard title={focus.title} description={focus.description} {index} />
      {/each}
    </div>
  </div>

</section>



<!-- ===== NAVIGATION CARDS SECTION ===== -->
<!-- FX:scroll-reveal -->
<section use:scrollReveal>
  <h3 class="meta-label text-base sm:text-lg md:text-xl {$theme.text.muted} font-bold mb-3 ml-2">
    {sections.navigation}
  </h3>
  
  <div class="grid gap-2 grid-cols-2">
    {#each homeNavigationCards as card, index}
      <NavigationCard 
        href={card.href} 
        title={card.title} 
        description={card.description} 
        cta={card.cta} 
        {index} 
      />
    {/each}
  </div>
</section>



<!-- ===== TOOLKIT SECTION ===== -->
<!-- FX:scroll-reveal -->
<section class="my-6" use:scrollReveal>
  <h3 class="meta-label text-base sm:text-lg md:text-xl {$theme.text.muted} font-bold mb-3 ml-2">
    {sections.toolkit}
  </h3>

  <div class="flex gap-6 justify-between" class:flex-row={$breakpoints.isLarge}>
    <!-- Skills badges -->
    <div class="flex flex-wrap gap-2 justify-end items-center w-full" class:lg:w-[80%]={$breakpoints.isLarge} in:fade>
      {#each featuredSkills as skill, index}
        <SkillBadge name={skill.name} {index} />
      {/each}
    </div>

    <!-- View full stack button -->
    <div class="flex items-center w-15">
      <!-- FX:hover-border-gradient — replaces the plain bordered link; the
           travelling arc is the border now, so the old `border` class is gone -->
      <HoverBorderGradient
        href="/portfolio"
        radius="0.75rem"
        duration={4}
        class="w-full hover:opacity-100 opacity-90 px-4 py-2 {$theme.gradient.button} {$theme.text.white} text-sm font-display font-bold uppercase tracking-widest transition-all duration-300 {$theme.hover.scaleSmall} text-center"
      >
        {home.skills.seeCompleteStack}
      </HoverBorderGradient>
      <!-- /FX:hover-border-gradient -->
    </div>
  </div>
</section>
