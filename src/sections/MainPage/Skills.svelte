<script lang="ts">
	import { skillsData } from '../../constants/skills';
</script>

<div class="container mx-auto px-4 py-8">
	{#each skillsData.skills as skillCategory}
		<div class="category mb-8">
			<h2 class="text-2xl font-bold text-center mb-4 text-gray-400">{skillCategory.category}</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{#each skillCategory.items as skill}
					<div class="skill bg-white shadow-lg rounded-lg p-4 flex flex-col items-center border border-gray-200">
						<img src={skill.logoUrl} alt={skill.name} class="w-16 h-16 mb-4 object-contain" />
						<h3 class="text-lg font-semibold text-gray-800">{skill.name}</h3>
						
						
						<!-- 
						<p class="text-sm text-gray-600">
							<strong>Proficiency:</strong> {skill.proficiency}
						</p>

						<p class="text-sm text-gray-600">
							<strong>Status:</strong> {skill.status}
						</p> 
						-->
						
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	/* Minimal custom styling as Tailwind CSS handles most styles */
</style>




