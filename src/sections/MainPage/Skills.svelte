<script lang="ts">
	import { skillsData } from '../../constants/skills';
</script>

<div class="space-y-10">
	{#each skillsData.skills as skillCategory}
		<h2 class="title-header mb-2">{skillCategory.category}</h2>
		<div class="col-grid">
			{#each skillCategory.items as skill}
				<div class="frame-card">
					<img src={skill.logoUrl} alt={skill.name} class="w-16 h-16 mb-4 object-contain" />
					<h3 class="text-lg font-semibold text-gray-800">{skill.name}</h3>						
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	/* Minimal custom styling as Tailwind CSS handles most styles */
</style>


<!-- 
<p class="text-sm text-gray-600">
	<strong>Proficiency:</strong> {skill.proficiency}
</p>

<p class="text-sm text-gray-600">
	<strong>Status:</strong> {skill.status}
</p> 
-->
