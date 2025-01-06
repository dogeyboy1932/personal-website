<script lang="ts">
    import { projectsData } from '../../constants/projects';
    import { GithubIcon, ExternalLinkIcon } from 'lucide-svelte';
    import { fade, slide } from 'svelte/transition';
</script>

<div class="grid grid-cols-1 gap-6 sm:gap-y-8">
    {#each projectsData.projects as project, i}
        <div 
            class="col-span-2 bg-white dark:bg-gray-700/50 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            in:fade={{delay: i * 200, duration: 500}}
        >
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="group flex items-center space-x-2 text-xl font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                        <span>{project.title}</span>
                        <GithubIcon class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                    
                    <span class="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                        {project.duration}
                    </span>
                </div>
                
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.description}
                </p>
                
                {#if project.githubLink}
                    <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300"
                    >
                        <span>See more</span>
                        <ExternalLinkIcon class="w-4 h-4" />
                    </a>
                {/if}
            </div>
        </div>
    {/each}
</div>

<style>
    /* Add any additional custom styles here */
</style>