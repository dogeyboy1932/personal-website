<script lang="ts">
	import { projectsData } from '../../constants/projects';
</script>

<div class="grid grid-cols-1 gap-3 sm:gap-y-6">
	{#each projectsData.projects as project} <!-- Accessing the projects array -->
		<div class="col-span-2 text-secondary-foreground sm:pb-0 mb-4">
			<div class="justify-between items-center">
				<p class="tracking-tight text-primary justify-between flex">
					<a
                        href={project.githubLink}
                        class="text-[17px] text-muted-foreground underline"
                    >
                        {project.title}
                    </a>
					
					<span class="flex items-center dark:text-orange-300 text-[13px] mx-2">
						[ {project.duration} ] <!-- Correcting to 'project.duration' -->
					</span>
				</p>
			</div>
			
			<span>{project.description}</span>					
		</div>
	{/each}
</div>

<style>
    
</style>
