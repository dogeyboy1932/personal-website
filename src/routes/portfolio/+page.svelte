<script lang="ts">
  import { breakpoints } from "../../constants/_stores";
  
  import { scrollReveal } from "../../lib/actions/scrollReveal";
  
  import { SectionHeader } from "../../components/Headers";
  import { ExperienceCard, SkillCategoryCard, CategoryFilter, ProjectCard } from "../../components/PORTFOLIO";
  import { Carousel } from "../../components/Creative";

  import { sections, experiences, skillsData, projectsData } from "../../constants";
  
  import { type ProjectCategory } from "../../types";

  
  
  let selectedCategory = "All";

  $: categories = ["All", ...new Set(projectsData.flatMap((p) => p.category))];
  $: filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category.includes(selectedCategory as ProjectCategory));
  $: projectProps = filteredProjects.map((project, index) => ({ project, index }));
</script>

<section class="space-y-10 pb-4">
  <section use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}>
    <SectionHeader id="experiences" title={sections.prof_experiences} />
    <div class="grid gap-5 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
      {#each experiences as experience, i}
        <ExperienceCard {experience} index={i} />
      {/each}
    </div>
  </section>

  <section use:scrollReveal>
    <SectionHeader id="gallery" title={sections.projectGallery} />

    <CategoryFilter {categories} bind:selectedCategory />

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

  <section use:scrollReveal>
    <SectionHeader id="skills" title={sections.skills} />
    <div class="grid gap-3" class:grid-cols-1={$breakpoints.isMobile} class:grid-cols-2={$breakpoints.isTablet} class:grid-cols-3={$breakpoints.isDesktop}>
      {#each skillsData as category, index}
        <SkillCategoryCard {category} {index} />
      {/each}
    </div>
  </section>
</section>
