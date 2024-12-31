<script lang="ts">
	import { hobbyData } from '../../constants/hobbies';
</script>

<div class="container mx-auto px-4 py-8">
	{#each hobbyData.hobbies as hobbyType}
		<div class="category mb-8">
			<h2 class="text-2xl font-bold text-center mb-4 text-gray-400">
                {hobbyType.category}
            </h2>
			
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each hobbyType.items as skill}
					<div class="skill bg-white shadow-lg rounded-lg p-4 flex flex-col items-center border border-gray-200">
						<!--
                            <img src={skill.logoUrl} alt={skill.name} class="w-16 h-16 mb-4 object-contain" />
                        -->

						<h3 class="text-lg font-semibold text-gray-800">{skill.name}</h3>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	/* Minimal custom styling as Tailwind CSS handles most styles */
</style>




