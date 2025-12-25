<script lang="ts">
  // External dependencies
  import { fly } from "svelte/transition";
  
  // Components
  import { SectionHeader } from "../../components/Headers";
  import PageHeader from "../../components/Headers/PageHeader.svelte";
  import { 
    ExperienceCard, 
    ProjectCard, 
    SkillCategoryCard, 
    CategoryFilter 
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

    <!-- Projects grid -->
    <div class="grid gap-6 grid-cols-1 min-[600px]:grid-cols-2 min-[1200px]:grid-cols-3">
      {#each filteredProjects as project, i (project.title)}
        <ProjectCard {project} index={i} />
      {/each}
    </div>
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
