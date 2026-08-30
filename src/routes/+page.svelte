<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { breakpoints, theme } from "../lib/stores";
  import { scrollReveal } from "../lib/actions/scrollReveal";
  import { SideRays, SparkleField, ParticleText, SmallCarousel } from "../components/Creative";
  import { SocialLinkButton, HeroImage, FocusCard } from "../components/HOME";
  import { homeHero, homeQuickLinks, homeFocusAreas, links, sections, site } from "../constants";
</script>

<MetaTags title={site.title} description={site.description} />


<!-- ===== HERO ===== -->
<section class="relative mb-0 font-sans rounded-lg" use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}>
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
  <!-- /FX:side-rays -->

  <!-- CAVEAT: minmax(0,1fr), not 1fr. A bare 1fr is minmax(AUTO,1fr), so the
       column will not shrink below its content and the photo overflowed the
       page by ~103px below 900px. -->
  <div
    class="relative z-10 grid gap-3 rounded-lg"
    class:grid-cols-1={!$breakpoints.isDesktop}
    class:grid-cols-[65%_minmax(0,1fr)]={$breakpoints.isDesktop}
  >
    
    <!-- Left Column: Header and Summary -->
    <!-- min-w-0: without it a grid child's min-content width becomes the
         column's floor, which is the same overflow bug by another route. -->
    <div class="relative flex min-w-0 flex-col justify-center gap-3">
      <!-- Header box -->
        <div class="relative flex items-center justify-center p-4 rounded-lg">
        <!-- FX:sparkles — bleeds past the title block into the blurb below;
             pointer-events:none, so it costs no selection or link behaviour. -->
        <SparkleField density={6} pointerPull={150} bleedTop={24} bleedBottom={110} />
        <!-- /FX:sparkles -->

        <div class="relative z-10 text-left">
          <!-- relative: the name's radial halo below is absolutely positioned
               against this box. -->
          <div class="relative flex flex-col">
            <!-- One container glow behind the whole block, not a halo per letter. -->
            <span
              aria-hidden="true"
              class="pointer-events-none absolute -inset-x-6 -inset-y-5 -z-10 rounded-3xl bg-white/[0.07] blur-2xl"
            />
            <!-- FX:particle-text — look="plain"; nanotech strokes hairlines
                 between particles that read as threads across the glyph gaps. -->
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
            <!-- /FX:particle-text -->

            <h2 class="mt-3 text-lg sm:text-xl md:text-2xl font-display font-extrabold {$theme.text.primary} tracking-[0.2em] uppercase">
              {homeHero.role}
            </h2>

            <!-- .meta-label-strong is shared with the two /more headings. -->
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

      
      <!-- `relative` is load-bearing — see the side-rays caveat above. -->
      <div class="relative flex flex-col items-center gap-5 py-3 px-8">
        <p class="text-lg sm:text-xl leading-relaxed {$theme.text.primary} font-sans font-normal whitespace-pre-line">
          {homeHero.summary}
        </p>

        <!-- Quick links. No scroll-reveal: this sits inside the first viewport,
             so a scroll-triggered reveal would start blurred and never un-blur.
             The sheen is transform-only — this hero sits over an animating
             canvas and a blurred ray layer, so a paint-triggering hover shows. -->
        <nav class="flex flex-wrap justify-center gap-3.5" aria-label="Quick links">
          {#each homeQuickLinks as link, i}
            <a
              href={link.href}
              class="group relative overflow-hidden rounded-xl border {$theme.border.default} {$theme.bg.secondary} px-7 py-3.5 font-display text-sm font-bold uppercase tracking-[0.14em] {$theme.text.primary} shadow-lg transition-all duration-300 hover:border-warm/70 hover:shadow-warm/10 {$theme.hover.scaleSmall}"
            >
              <span
                aria-hidden="true"
                class="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-warm/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />

              <span class="relative flex items-center gap-2.5">
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
    <div class="relative z-40 flex min-w-0 flex-col gap-4">
      <HeroImage 
        src={homeHero.image.src} 
        alt={homeHero.image.alt} 
      />
      
      <SmallCarousel
        items={homeHero.quotes}
        interval={7000}
        shuffle
        class="rounded-2xl border p-4 shadow-lg backdrop-blur-md {$theme.border.accent} {$theme.bg.backdrop}"
        let:item
      >
        <div class="flex h-full flex-col justify-between">
          <p class="text-md italic leading-snug {$theme.text.primary}">{item.quote}</p>
          <p
            class="mt-3 text-right text-sm font-bold uppercase tracking-widest {$theme.accent.indigo.text}"
          >
            {item.voice}
          </p>
        </div>

      </SmallCarousel>
    </div>

  </div>
</section>

<!-- ===== FOCUS AREAS ===== -->
<section class="mt-0 mb-8" use:scrollReveal>
    <h3 class="meta-label text-xl {$theme.text.muted} font-bold mb-3 ml-2">{sections.focuses}</h3>
    
    <div class="grid gap-4" class:grid-cols-1={$breakpoints.isMobile} class:grid-cols-3={!$breakpoints.isMobile}>
      {#each homeFocusAreas as focus, index}
        <FocusCard title={focus.title} description={focus.description} {index} />
      {/each}
  </div>
</section>
