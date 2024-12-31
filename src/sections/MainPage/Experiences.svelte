<script lang="ts">
	import { DotIcon } from 'lucide-svelte';
	import { experiences } from '../../constants/experiences';
</script>

<div class="grid grid-cols-1 gap-3 sm:gap-y-6">
	{#each experiences as experience}
		
		<div class="col-span-2 text-secondary-foreground sm:pb-0 mb-4">
			<div class="justify-between items-center">
				<p class="tracking-tight text-black/70 justify-between flex">
					<span class="text-[17px] text-muted-foreground">
						{experience.company}
					</span>
					
					<span class="flex items-center dark:text-orange-300 text-[13px] mx-2">
						[ {experience.duration} ]
					</span>
				</p>
			</div>

			<div class="dark:text-gray-300/90 mb-3">
				<span class="italic text-[14px]">{experience.role}</span>	
			</div>
			
			<span>{experience.description}</span>
					
		</div>
	{/each}
</div>


<style>

</style>