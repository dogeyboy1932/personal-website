<script lang="ts">
  // External dependencies
  import { MetaTags } from "svelte-meta-tags";
  import { fade } from "svelte/transition";

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
<section class="mb-3 font-sans">
  <div class="grid grid-cols-1 min-[1000px]:grid-cols-[65%_1fr] gap-3">
    
    <!-- Left Column: Header and Summary -->
    <div class="flex flex-col flex-1 md:flex-[1] justify-center gap-3">
      
      <!-- Header Box -->
      <div class="flex items-center justify-center backdrop-blur-sm shadow-2xl p-4 rounded-xl">
        <div class="text-left">
          <div class="flex flex-col">
            <h1 class="uppercase text-5xl font-display font-bold tracking-tight text-white leading-tight">
              {homeHero.fullName}
            </h1>
            
            <h3 class="text-sm sm:text-base md:text-lg font-display font-bold text-orange-400 tracking-widest uppercase">
              {homeHero.title}
            </h3>
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
      <div class="mx-auto w-[90%] border-t border-slate-500/50" />

      
      <!-- Summary Text -->
      <div class="flex items-center py-3 px-8 shadow-xl backdrop-blur-sm">
        <p class="text-base text-lg leading-relaxed text-slate-100 font-sans font-light whitespace-pre-line">
          {homeHero.summary}
        </p>
      </div>
    </div>


    <!-- Right Column: Photo and Quote -->
    <div class="flex flex-col">
      <HeroImage 
        src={homeHero.image.src} 
        alt={homeHero.image.alt} 
        quote={homeHero.quote} 
        voice={homeHero.voice} 
      />
    </div>

  </div>
</section>




<!-- ===== FOCUS AREAS SECTION ===== -->
<section class="my-6">

<div>
  <h3 class="text-base text-xl uppercase tracking-[0.4em] text-slate-300 font-bold mb-3 ml-2">Mainly Focused on</h3>
  
  <div class="grid gap-4 grid-cols-1 min-[800px]:grid-cols-3">
    {#each homeFocusAreas as focus, index}
      <FocusCard title={focus.title} description={focus.description} {index} />
    {/each}
  </div>
</div>

</section>



<!-- ===== NAVIGATION CARDS SECTION ===== -->
<section>
  <h3 class="text-base sm:text-lg md:text-xl font-display uppercase tracking-[0.4em] text-slate-300 font-bold mb-3 ml-2">
    Also Check Out
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
<section class="my-6">
  <h3 class="text-base sm:text-lg md:text-xl font-display uppercase tracking-[0.4em] text-slate-300 font-bold mb-3 ml-2">
    {sections.toolkit}
  </h3>

  <div class="flex flex-col lg:flex-row gap-6 justify-between">
    <!-- Skills badges -->
    <div class="flex flex-wrap gap-2 justify-end items-center lg:w-[80%] w-full" in:fade>
      {#each featuredSkills as skill, index}
        <SkillBadge name={skill.name} {index} />
      {/each}
    </div>

    <!-- View full stack button -->
    <div class="flex items-center w-15">
      <a
        href="/portfolio"
        class="w-full hover:opacity-100 opacity-80 group relative px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600/40 to-slate-400/40 text-white text-sm font-display font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 border border-indigo-400/20 text-center"
      >
        <span class="relative z-10">{home.skills.seeCompleteStack}</span>
      </a>
    </div>
  </div>
</section>
