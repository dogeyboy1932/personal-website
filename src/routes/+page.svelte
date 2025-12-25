<script lang="ts">
  import { SectionHeader } from "../components/Headers";
  import { FocusAreas } from "../components/HOME/FocusAreas";
  import { MetaTags } from "svelte-meta-tags";
  import { experiences } from "../constants/experiences";
  import { fade, fly } from "svelte/transition";
  import {
    home,
    homeHero,
    homeNavigationCards,
    links,
    lastUpdated,
    sections,
    site,
    skillsData,
    projectsData
  } from "../constants";


const featuredExperiences = experiences.slice(0, 2);
  const featuredProjects = projectsData.slice(0, 2);
  const featuredSkills = skillsData.skills
    .flatMap((group) => group.items)
    .slice(0, 15);
</script>

<MetaTags
  title={site.title}
  description={site.description}
/>



<section>
  
  <section class="mb-3">

    <div class="grid gap-2 grid-cols-1 min-[1000px]:grid-cols-[35%_1fr] gap-4">

      <!-- Option 1: Dark slate with white pop -->
      <div class="flex flex-col">


        <!-- Column 1: Name, Photo, Caption -->
                
          


          <!-- <div class="flex flex-row "> -->

            <figure class="group relative flex flex-col mx-auto" in:fly={{ x: -24, duration: 400 }}>
              <div class="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
                <img
                  src={homeHero.image.src}
                  alt={homeHero.image.alt}
                  class="h-full w-full object-cover transition duration-1000 group-hover:scale-105 group-hover:rotate-1"
                  loading="lazy"
                />
              </div>

              <figcaption class="mt-2 p-4 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md shadow-lg">
                <p class="text-md italic text-slate-200 leading-snug">{homeHero.quote}</p>
                <p class="mt-3 text-sm text-indigo-400 font-bold uppercase tracking-widest text-right">{homeHero.voice}</p>
              </figcaption>
            </figure>

            
          
            
            


          <!-- </div> -->


          
          
          
        </div>

        
        <!-- Column 2: Description & Focus Areas -->
        <div class="flex flex-col flex-1 md:flex-[1] justify-center gap-4">

          <!-- HEADER -->
          
          <div class="flex items-center justify-center backdrop-blur-sm shadow-2xl p-4 rounded-xl border border-slate-800 bg-slate-900/50">
            <div class="text-right">
              <div class="flex flex-col">
                <h1 class="text-5xl font-bold tracking-tight text-white leading-tight">
                  {homeHero.fullName}
                </h1>
                
                <h3 class="text-sm sm:text-base md:text-lg font-bold text-orange-400 tracking-widest uppercase">
                  {homeHero.title}
                </h3>
              </div>

              <!-- Social Links integrated into header -->
              <div class="flex flex-row gap-2 items-center justify-end mt-4"> 
                
                {#each links as link, index}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-800/50 p-2 transition-all hover:scale-110 hover:border-indigo-500 hover:bg-indigo-500/10"
                    in:fly={{ y: 18, delay: index * 80 }}
                  >
                    {#if link.logo}
                      <div class="h-6 w-6">
                        <img src={link.logo} alt={link.title} class="h-full w-full object-contain group-hover:opacity-100 transition-all" />
                      </div>
                    {/if}
                  </a>
                {/each}
              </div>
            </div>
          </div>

          

              <div class="flex items-center rounded-xl border border-slate-800 bg-slate-900/50 p-4 sm:p-6 md:p-8 shadow-xl backdrop-blur-sm">
              
                <p class="text-base text-xl leading-relaxed text-slate-300 font-light whitespace-pre-line">
                  {homeHero.summary}
                </p>

              </div>



              <!-- IF SCREEN IS BIG, IT SHOULD APPEAR HERE -->
              <!-- <div class="hidden min-[1700px]:block">
                <FocusAreas />
              </div> -->

              

        </div>
      </div>

      <!-- Option 2: Charcoal with silver gradient -->
      <!-- <div class="mb-4 rounded-xl border border-zinc-700/20 bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950 p-4 text-center">
        <h1 class="mb-1 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-100 to-zinc-300 leading-tight">
        {homeHero.fullName}
        </h1>
        <p class="text-sm text-zinc-300/90">{homeHero.title}</p>
      </div> -->

      <!-- Option 3: Dark with subtle slate edge glow -->
      <!-- <div class="mb-4 rounded-xl border border-slate-400/20 bg-gradient-to-r from-black via-zinc-950 to-black p-4 text-center shadow-lg shadow-slate-500/5">
        <h1 class="mb-1 text-6xl font-extrabold text-white leading-tight drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">
        {homeHero.fullName}
        </h1>
        <p class="text-sm text-slate-300/90">{homeHero.title}</p>
      </div> -->


  </section>


  <section class="my-6">

    <!-- IF SCREEN IS SMALL, IT SHOULD APPEAR HERE -->
    <FocusAreas />

  </section>




  <section>
    <!-- Navigation Cards -->
              <div >
                <h3 class="text-base sm:text-lg md:text-xl uppercase tracking-[0.4em] text-slate-500 font-bold mb-3 ml-2">Also Check Out</h3>
                <div class="grid gap-2 grid-cols-2">
                  {#each homeNavigationCards as card, index}
                    <a
                      href={card.href}
                      class="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-3 sm:p-4 md:p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl hover:border-slate-700 flex flex-col"
                      in:fly={{ y: 18, delay: index * 100 + 100 }}
                    >
                      <div class="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-indigo-500/10 blur-[60px] transition group-hover:translate-x-3" />
                      <h4 class="text-base sm:text-lg md:text-xl font-bold text-white">{card.title}</h4>
                      <p class="mt-2 md:mt-3 text-sm sm:text-base md:text-lg text-slate-400 flex-1">{card.description}</p>
                      <span class="mt-auto pt-3 md:pt-4 inline-flex text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">{card.cta} →</span>
                    </a>
                  {/each}
                </div>
              </div>
    
  </section>





  <!-- <section class="space-y-6">
    <SectionHeader id="highlights" title={sections.highlights} />
    
    <div class="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <div
        class="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-6 shadow-lg flex flex-col backdrop-blur-sm"
        in:fade
      >
        <h3 class="text-xs uppercase tracking-[0.4em] text-slate-500 font-bold mb-4">
          {home.experience.title}
        </h3>
        
        <div class="mt-2 space-y-4 flex-1">
          {#each featuredExperiences as experience, index}
          <div
            class="group flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700"
            in:fly={{ y: 16, delay: index * 120 }}
          >


            <div class="flex flex-row items-start justify-between mb-3">
              <div>
                <p class="text-sm font-bold text-indigo-400 uppercase tracking-widest" >
                  {experience.company}
                </p>

                <p class="text-sm mt-1 font-medium text-white">
                  {experience.role}
                </p>
              </div>
            </div>


            <p class="text-sm text-slate-400 leading-relaxed flex-1">
              {experience.summary}
            </p>
          </div>
          {/each}
        </div>

        <a
          href="/portfolio"
          class="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-emerald-400 transition-colors"
          >{home.experience.viewFullTimeline} →</a
        >
      </div>




      <div
        class="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-6 shadow-lg flex flex-col backdrop-blur-sm"
        in:fade={{ delay: 120 }}
      >
        <h3 class="text-xs uppercase tracking-[0.4em] text-slate-500 font-bold mb-4">
          {home.projects.title}
        </h3>

        <div class="mt-2 space-y-4 flex-1">
          {#each featuredProjects as project, index}
            <div
              class="group flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700"
              in:fly={{ y: 16, delay: index * 120 }}
            >
              <h4 class="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-2">{project.title}</h4>
              
              <p class="text-sm text-slate-400 leading-relaxed mb-3 flex-1">
                {project.description}
              </p>
              
              <a
                href={project.github ?? "#"}
                target={project.github ? "_blank" : undefined}
                rel={project.github ? "noopener noreferrer" : undefined}
                class="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
              >
                {sections.openProject}
              </a>
              
            </div>
          {/each}
        </div>

        <a
          href="/portfolio"
          class="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-emerald-400 transition-colors"
          >{home.projects.browseFullGallery} →</a
        >
      </div>

    </div>
  </section> -->










  <section class="my-6">

    <h3 class="text-base sm:text-lg md:text-xl uppercase tracking-[0.4em] text-slate-500 font-bold mb-3 ml-2">{sections.toolkit}</h3>

    <div class="flex flex-row">
      <div class="flex flex-wrap gap-2 justify-end w-[70%]" in:fade>
        {#each featuredSkills as skill, index}
          <span
            class="px-4 py-2 rounded-xl bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 border border-slate-700 text-[12px] font-bold uppercase tracking-widest text-slate-300 transition-all hover:border-emerald-500/50 hover:text-yellow-400"
            in:fly={{ y: 12, delay: index * 80 }}
          >
            {skill.name}
          </span>
        {/each}
      </div>

      <div class="flex items-center justify-center w-[30%]">
        <a
          href="/portfolio"
          class="hover:opacity-100 opacity-80 group relative px-2 py-4 rounded-xl bg-gradient-to-r from-blue-600/40 to-slate-400/40 text-white text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 border border-indigo-400/20"
        >
          <span class="relative z-10">{home.skills.seeCompleteStack}</span>
        </a>
      </div>
    </div>


  </section>
</section>
