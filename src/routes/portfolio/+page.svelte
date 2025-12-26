<script lang="ts">
  // Components
  import { SectionHeader } from "../../components/Headers";
  import { 
    ExperienceCard, 
    SkillCategoryCard, 
    CategoryFilter,
    ProjectCard,
    Carousel
  } from "../../components/PORTFOLIO";
  
  // Constants and data
  import { sections, experiences, skillsData, projectsData } from "../../constants";

  // Project filtering state
  let selectedCategory = "All";
  
  // Reactive statements
  $: categories = ["All", ...new Set(projectsData.map(p => p.category))];
  $: filteredProjects = selectedCategory === "All" 
    ? projectsData 
    : projectsData.filter(p => p.category === selectedCategory);
  $: projectProps = filteredProjects.map((project, index) => ({ project, index }));
</script>

<section>
  <!-- ===== PROFESSIONAL EXPERIENCES SECTION ===== -->
  <section> 
    <SectionHeader id="experiences" title={sections.prof_experiences} />
    <div class="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
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
    <div class="grid gap-2 grid-cols-1 min-[600px]:grid-cols-2 min-[1200px]:grid-cols-3">
      {#each skillsData.skills as category}
        <SkillCategoryCard {category} />
      {/each}
    </div>
  </section>
</section>
