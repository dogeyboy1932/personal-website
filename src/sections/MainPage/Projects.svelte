<script lang="ts">
    import { projectsData } from '../../constants/projects';
    import { GithubIcon, ExternalLinkIcon } from 'lucide-svelte';
    import { fade } from 'svelte/transition';
</script>


<div class="one-grid">
    {#each projectsData.projects as project, i}
        <div 
            class="content-card card-content bg-gradient-to-r from-violet-500/20 via-rose-600/20 to-indigo-600/20  dark:bg-cyan-900"
            in:fade={{delay: i * 200, duration: 500}}
        >
            <div class="section-header">    
                <span> {project.title} </span>
                <span class="time-badge"> {project.duration} </span>
            </div>
            
            <p class="description"> {project.description} </p>
            
            {#if project.githubLink}
                <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link-primary"
                >
                    <span class="flex in-line mt-3">
                        See more &nbsp; 
                        <ExternalLinkIcon class="w-4 h-4" />
                    </span>
                </a>
            {/if}
        </div>
    {/each}
</div>

<style>
    /* Add any additional custom styles here */
</style>