<script lang="ts">
	import { skillsData } from '../../constants/skills';
</script>

<div class="space-y-10">
	{#each skillsData.skills as skillCategory}
		<div class="space-y-2">
			<h2 class="text-2xl font-bold text-center mb-4 text-gray-400">{skillCategory.category}</h2>
			<div class="col-grid">
				{#each skillCategory.items as skill}
					<div class="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center border border-gray-200">
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




