<script lang="ts">
  import { MetaTags } from "svelte-meta-tags";
  import { breakpoints } from "../constants/_stores";
  import { theme } from "../constants/_theme";

  import { scrollReveal } from "../lib/actions/scrollReveal";
  
  import { SideRays, SparkleField, ParticleText, SmallCarousel } from "../components/Creative";
  import { SocialLinkButton, HeroImage, FocusCard } from "../components/HOME";
  
  import { home, site } from "../constants";
</script>

<MetaTags title={site.title} description={site.description} />

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

  <!-- CAVEAT: minmax(0,1fr), not 1fr. -->
  <div
    class="relative z-10 grid gap-3 "
    class:grid-cols-1={!$breakpoints.isDesktop}
    class:grid-cols-[65%_minmax(0,1fr)]={$breakpoints.isDesktop}
  >

    <div class="relative flex min-w-0 flex-col justify-center gap-3">
      <div class="relative flex items-center justify-center p-4 ">
        <SparkleField density={6} pointerPull={150} bleedTop={24} bleedBottom={110} />

        <div class="relative z-10 text-left">
          <div class="relative flex flex-col">
            <span
              aria-hidden="true"
              class="pointer-events-none absolute -inset-x-6 -inset-y-5 -z-10 blur-2xl"
            />
            <h1 class="relative uppercase text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight {$theme.text.primary} leading-[0.95]">
              {#if home.hero.particleName}
                <ParticleText
                  text={home.hero.fullName.toUpperCase()}
                  look="plain"
                  gap={2}
                  radius={110}
                  force={3}
                />
              {:else}
                {home.hero.fullName}
              {/if}
            </h1>

            <h2 class="mt-3 text-lg sm:text-xl md:text-2xl font-display font-extrabold {$theme.text.primary} tracking-[0.2em] uppercase">
              {home.hero.role}
            </h2>

            <p class="meta-label-strong mt-1.5 text-xs sm:text-sm {$theme.text.muted}">
              {home.hero.age}
              <span aria-hidden="true" class="{$theme.text.dim} mx-1.5">·</span>
              <span class="text-warm-deep">{home.hero.credential}</span>
              <span aria-hidden="true" class="{$theme.text.dim} mx-1.5">·</span>
              {home.hero.location}
            </p>
          </div>

          <div class="flex flex-row gap-2 items-center justify-start mt-4">
            {#each home.socials as link, index}
              <SocialLinkButton
                href={link.href}
                icon={link.icon}
                title={link.handle}
                {index}
              />
            {/each}
          </div>
        </div>
      </div>


      <div class="relative mx-auto w-[90%] border-t {$theme.border.divider}" />


      <!-- `relative` is load-bearing — see the side-rays caveat above. -->
      <div class="relative flex flex-col items-center gap-5 py-3 px-8">
        <!-- Nunito, not Inter: this is three lines of "Heyyy, I'm Akhil", not
             body copy, and the rounded terminals carry that where the grotesk
             read like a form field. (Inter still owns the long-form pages.) -->
        <p class="mb-3 text-lg sm:text-xl leading-relaxed {$theme.text.primary} font-casual font-medium whitespace-pre-line">
          {home.hero.summary}
        </p>

        <!-- No scroll-reveal: this sits inside the first viewport, so a scroll-triggered reveal
        would start blurred and never un-blur. -->
        <!-- Warm wash rather than bg.secondary: that is a near-neutral, and on the
             light theme it landed on the same value as the focus cards' ground, so
             the two blocks read as one. `warm` is token-backed, so this tracks the
             theme on its own — and it matches the warm border/shimmer these pills
             already take on hover. -->
        <nav class="flex flex-wrap justify-center gap-3.5" aria-label="Quick links">
          {#each home.quickLinks as link, i}
            <a
              href={link.href}
              class="group relative overflow-hidden rounded-xl border {$theme.border.default} bg-warm/10 px-7 py-3.5 font-display text-sm font-bold uppercase tracking-[0.14em] {$theme.text.primary} shadow-lg transition-all duration-300 hover:border-warm/70 hover:shadow-warm/10 {$theme.hover.scaleSmall}"
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

    <div class="relative z-40 flex min-w-0 flex-col gap-2 m-1">
      <HeroImage
        src={home.hero.image.src}
        alt={home.hero.image.alt}
      />

      <SmallCarousel
        items={home.hero.quotes}
        interval={7000}
        shuffle
        class="rounded-2xl border p-4 shadow-lg backdrop-blur-md {$theme.border.light} {$theme.bg.backdrop}"
        let:item
      >
        <div class="flex h-full flex-col justify-between ">
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

<section class="mt-4 mb-8" use:scrollReveal>
    <h3 class="meta-label text-xl {$theme.text.muted} font-bold mb-3 ml-2">{home.focusesTitle}</h3>

    <div class="grid gap-4" class:grid-cols-1={$breakpoints.isMobile} class:grid-cols-3={!$breakpoints.isMobile}>
      {#each home.focusAreas as focus, index}
        <FocusCard title={focus.title} description={focus.description} {index} />
      {/each}
  </div>
</section>
