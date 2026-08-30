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
  import { SideRays, SparkleField, ParticleText } from "../components/fx";

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

  /*
    NavigationCard, SkillBadge, homeNavigationCards, skillsData and
    home.skills are all still in the codebase — they are just no longer
    imported here. The "Also Check Out" card grid and the "Stack" badge band
    were replaced by FX:quick-links below; putting either back is re-adding the
    import, not rebuilding anything.
  */
</script>

<MetaTags title={site.title} description={site.description} />


<!-- ===== HERO SECTION ===== -->
<!-- FX:scroll-reveal (hero reveals immediately; no offset so it does not fight the fly-in) -->
<!-- mb-0: the hero had trailing space that pushed "Mainly focused on" down.
     ("MOve the mainly focused on a bit higher") -->
<section class="relative mb-0 font-sans" use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}>
  <!--
    FX:side-rays — mounted on the SECTION, ahead of the grid in DOM order.

    It has moved three times and each move was a different reading of the same
    complaint, so the reasoning is worth keeping:

      1. section level with `overlay` (z-index:30) — painted OVER the photo and
         the quote card. Wrong.
      2. inside the left text column, z-index:0 — physically could not reach the
         photo, which fixed that, but also meant the light stopped dead at the
         column boundary instead of crossing the hero.
      3. HERE: section level, no `overlay`, so z-index:0. The hero grid below is
         `relative z-10`, and a z-0 positioned sibling paints before a z-10 one,
         so the blades are behind BOTH columns — photo, quote card and all copy.

    That is what makes "coming in all the way from the right of the photo. Beam
    should be behind everything but still visible. It must never overshadow the
    text or photo" satisfiable: it cannot overshadow anything it paints beneath.
    The origin is at right:3%, past the photo's right edge, so the fan enters
    from beyond the photo and rakes left across the whole section.

    widthScale 1.8 and spread 30 are the "a bit bigger" half.

    Opacity has walked 0.5 -> 0.42 -> 0.28 -> 0.30 -> 0.34 -> 0.46. Everything
    below 0.34 was dimming to stop it washing the hero copy; since it moved
    behind the z-10 grid that constraint is gone, and "make the beam a bit
    brighter" can simply be answered.
  -->
  <SideRays
    side="right"
    count={2}
    opacity={0.46}
    speed={13}
    spread={30}
    widthScale={1.8}
    hue="warm"
  />
  <!-- /FX:side-rays -->

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
          <!-- relative: the name's radial halo below is absolutely positioned
               against this box. -->
          <div class="relative flex flex-col">
            <!-- FX:particle-text — gated by homeHero.particleName in
                 src/constants/home.ts; off renders the plain heading -->
            <!--
              THREE layers of glow, each doing a different job:
                1. canvas shadowBlur (in ParticleText) — glows each dot.
                2. the radial halo below — light BEHIND the word, which is what
                   "Apply a glow behind it so it looks brighter" asks for. A
                   drop-shadow can only trace the shape it is given; it cannot
                   put light on the background the letters sit on.
                3. drop-shadow on the canvas — lifts the whole word as one shape.
            -->
            <!--
              WHY THIS LOOKED YELLOW. The halo was already pure white, but at
              0.16 it was thinner than the amber SideRays wash sitting behind it
              at 0.46, so the two composited to a warm cream.
              ("make glow white bright silver...it's looking yellowy right now")

              Fixed by making the halo actually dominate locally rather than by
              dimming the beam, which line 6 last pass asked to brighten: 0.16 ->
              0.34 at the centre, and the mid stop moves from white to
              slate-200 (226 232 240) so it reads as SILVER rather than as a
              second warm light source.
            -->
            <span
              aria-hidden="true"
              class="pointer-events-none absolute -inset-x-10 -inset-y-12 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.34),rgba(226,232,240,0.16)_42%,rgba(203,213,225,0.05)_62%,transparent_78%)] blur-2xl"
            />
            <h1 class="relative uppercase text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight {$theme.text.primary} leading-[0.95] [&_canvas]:drop-shadow-[0_0_22px_rgba(255,255,255,0.45)]">
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

            <!-- .meta-label-strong — the same class as "Also around campus"
                 and "Honors" on /more, so the three move together. -->
            <p class="meta-label-strong mt-1.5 text-xs sm:text-sm {$theme.text.muted}">
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

      
      <!-- Divider. `relative` for the same paint-order reason as the summary. -->
      <div class="relative mx-auto w-[90%] border-t {$theme.border.divider}" />

      
      <!-- Summary Text -->
      <!-- backdrop-blur-sm removed; see the note on the header box above. -->
      <!-- `relative` is load-bearing: FX:side-rays is a z-index:0 POSITIONED
           sibling, and positioned z-0 descendants paint after non-positioned
           block ones. Without this the beams would cross this paragraph even
           though they sit earlier in the DOM. -->
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
        <!--
          Larger and given some actual design. ("make the buttons under the blub
          look better? Better design and style + larger.")

          What each piece is doing, since "look better" is otherwise a guess:
          - a sweep highlight that travels left-to-right on hover, clipped by
            overflow-hidden. Transform only, so it stays on the compositor —
            this hero already sits over an animating canvas and a blurred ray
            layer, and a hover effect that triggers paint would show.
          - a leading index (01/02/03) in the accent, which gives the row a
            deliberate order instead of three interchangeable chips.
          - the arrow tucks in at rest and slides out on hover.
          Sizing: px-5 py-2 text-xs -> px-7 py-3.5 text-sm, and the row gets a
          wider gap so the three do not read as one segmented control.
        -->
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
                <span class="text-[0.65rem] font-extrabold tabular-nums text-warm/70"
                  >0{i + 1}</span
                >
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
<!-- mt-0: "MOve the mainly focused on a bit higher", third time. The hero's
     own trailing space went first, then the quick-links band that used to sit
     between the two — it now lives inside the hero column, so this section
     moves up by the whole height of that band plus its margins. -->
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




