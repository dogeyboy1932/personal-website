<script lang="ts">
  import { breakpoints } from "$lib/stores";
  // FX:scroll-reveal
  import { scrollReveal } from "$lib/actions/scrollReveal";

  // Components
  import { SectionHeader } from "../../components/Headers";
  import {
    ExperienceCard,
    SkillCategoryCard,
    CategoryFilter,
    ProjectCard,
    Carousel
  } from "../../components/PORTFOLIO";

  import { sections, experiences, skillsData, projectsData } from "../../constants";
  import { type ProjectCategory } from "../../types";

  // Project filtering state
  let selectedCategory = "All";
  
  // Reactive statements
  $: categories = ["All", ...new Set(projectsData.flatMap(p => p.category))];
  
  $: filteredProjects = selectedCategory === "All" 
    ? projectsData 
    : projectsData.filter(p => p.category.includes(selectedCategory as ProjectCategory));
  $: projectProps = filteredProjects.map((project, index) => ({ project, index }));
</script>

<section class="space-y-10 pb-4">
  <!-- ===== PROFESSIONAL EXPERIENCES SECTION ===== -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}> 
    <SectionHeader id="experiences" title={sections.prof_experiences} />
    <!--
      2-up by default, 3-up only when there is genuinely room. ("make experience
      cards look better")

      At 3-up with the 125% page zoom the effective card width was ~370px, and
      the cards came apart: "Graduate Research Assistant" broke over three
      lines, summaries clipped mid-word, and the date badge pushed past the
      card's right edge. 2xl is 1536 CSS px, which with the zoom means a genuine
      ~1920px monitor — the only place three of these actually fit.
    -->
    <div class="grid gap-5 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
      {#each experiences as experience, i}
        <ExperienceCard {experience} index={i} />
      {/each}
    </div>
  </section>

  <!-- ===== PROJECTS GALLERY SECTION ===== -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <SectionHeader id="gallery" title={sections.projectGallery} />
    
    <!-- Category filter -->
    <CategoryFilter {categories} bind:selectedCategory />

    <!-- Projects carousel -->
    {#key selectedCategory}
      <Carousel 
        component={ProjectCard}
        componentProps={projectProps}
        config={{
          options: { 
            loop: true, 
            axis: "x",
            align: "start",
            slidesToScroll: 1
          },
          plugins: []
        }}
        carouselItemsClass="items-stretch"
      />
    {/key}
  </section>

  <!-- ===== SKILLS SECTION ===== -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <SectionHeader id="skills" title={sections.skills} />
    <div class="grid gap-5" class:grid-cols-1={$breakpoints.isMobile} class:grid-cols-2={$breakpoints.isTablet} class:grid-cols-3={$breakpoints.isDesktop}>
      <!-- `index` drives the per-category accent off the shared neon ramp. -->
      {#each skillsData.skills as category, index}
        <SkillCategoryCard {category} {index} />
      {/each}
    </div>
  </section>
</section>
