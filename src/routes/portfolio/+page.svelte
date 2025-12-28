<script lang="ts">
  import { breakpoints } from "$lib/stores";

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

<section>
  <!-- ===== PROFESSIONAL EXPERIENCES SECTION ===== -->
  <section> 
    <SectionHeader id="experiences" title={sections.prof_experiences} />
    <div class="grid gap-3 md:grid-cols-1 lg:grid-cols-2">
      {#each experiences as experience, i}
        <ExperienceCard {experience} index={i} />
      {/each}
    </div>
  </section>

  <!-- ===== PROJECTS GALLERY SECTION ===== -->
  <section>
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
  <section>
    <SectionHeader id="skills" title={sections.skills} />
    <div class="grid gap-3" class:grid-cols-1={$breakpoints.isMobile} class:grid-cols-2={$breakpoints.isTablet} class:grid-cols-3={$breakpoints.isDesktop}>
      {#each skillsData.skills as category}
        <SkillCategoryCard {category} />
      {/each}
    </div>
  </section>
</section>
