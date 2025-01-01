<script lang="ts">
    import { DotIcon } from 'lucide-svelte';
    import { experiences } from '../../constants/experiences';
    import { fade, slide } from 'svelte/transition';
</script>

<div class="grid grid-cols-1 pt-6 gap-6">
    {#each experiences as experience, i}
        <div 
            class="col-span-2 text-secondary-foreground sm:pb-0 bg-white dark:bg-gray-800/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            in:fade={{delay: i * 200, duration: 500}}
        >
            <div class="space-y-4 p-6">
                <div class="flex justify-between items-center border-b dark:border-gray-700 pb-3">
                    <span class="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        {experience.company}
                    </span>
                    
                    <span class="flex items-center bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-3 py-1 rounded-full text-sm">
                        {experience.duration}
                    </span>
                </div>

                <div class="dark:text-gray-300/90 mb-3">
                    <span class="text-lg font-medium text-blue-600 dark:text-blue-400">
                        {experience.role}
                    </span>    
                </div>
                
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {experience.description}
                </p>
            </div>
        </div>
    {/each}
</div>

<style>
    /* Add any additional custom styles here */
</style>