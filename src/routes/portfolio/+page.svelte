<script lang="ts">
  import { SectionHeader } from "../../components/Headers";
  import { sections, experiences, skillsData, projectsData } from "../../constants";
  import { fly } from "svelte/transition";
  import PageHeader from "../../components/Headers/PageHeader.svelte";
  import { 
    ExperienceCard, 
    ProjectCard, 
    SkillCategoryCard, 
    CategoryFilter 
  } from "../../components/Portfolio";

  // Project filtering
  let selectedCategory = "All";
  $: categories = ["All", ...new Set(projectsData.map(p => p.category))];
  $: filteredProjects = selectedCategory === "All" 
    ? projectsData 
    : projectsData.filter(p => p.category === selectedCategory);
</script>



<section>
  <!-- <section class="justify-center items-center">
    <PageHeader title={projectsHero.tagline} />

    <div class="mt-6 flex flex-col items-center justify-center text-center" in:fly={{ x: -18, duration: 400 }}>

      <h2 class="w-2/3 text-2xl text-slate-300">
        {projectsHero.description}
      </h2>
    </div>
  </section> -->


  <section> 
    <SectionHeader id="gallery" title={sections.prof_experiences} />
    <div class="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
      {#each experiences as experience, i}
        <ExperienceCard {experience} index={i} />
      {/each}
    </div>
  </section>



  <section>
    <SectionHeader id="gallery" title={sections.projectGallery} />

    <CategoryFilter {categories} bind:selectedCategory />

    <!-- Projects Grid -->
    <div class="grid gap-6 grid-cols-1 min-[600px]:grid-cols-2 min-[1200px]:grid-cols-3">
      {#each filteredProjects as project, i (project.title)}
        <ProjectCard {project} index={i} />
      {/each}
    </div>
  </section>


  <section>
    <SectionHeader id="skills" title={sections.skills} />
    <div class="grid gap-2 grid-cols-1 min-[600px]:grid-cols-2 min-[1200px]:grid-cols-3">
      {#each skillsData.skills as category}
        <SkillCategoryCard {category} />
      {/each}
    </div>
  </section>
</section>
