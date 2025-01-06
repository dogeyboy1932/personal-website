<script lang="ts">
    import { ExternalLinkIcon, GithubIcon, LinkedinIcon, TwitterIcon, MailIcon } from 'lucide-svelte';
    import { links } from '../../constants/links';
    import { fade, slide } from 'svelte/transition';

    // Function to get the appropriate icon
    function getIcon(platform: string) {
        switch (platform.toLowerCase()) {
            case 'github': return GithubIcon;
            case 'linkedin': return LinkedinIcon;
            case 'twitter': return TwitterIcon;
            case 'email': return MailIcon;
            default: return ExternalLinkIcon;
        }
    }
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-4 gap-4" in:fade>
    {#each links as link, i}
        <div class="group relative overflow-hidden">
            <a
                href={link.href}
                target="_blank"
                class="flex items-center space-x-3 bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/70"
                aria-label={`Visit ${link.platform} profile`}
                rel="noopener noreferrer"
            >
                <div class="flex-shrink-0 w-10 h-10 bg-orange-300 dark:bg-green-600 rounded-full flex items-center justify-center">
                    <svelte:component 
                        this={getIcon(link.platform)} 
                        class="w-5 h-5 text-gray-600 dark:text-gray-300"
                    />
                </div>
                
                <div class="flex-grow">
                    <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {link.platform}
                    </h3>
                    {#if link.title}
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            {link.title}
                        </p>
                    {/if}
                </div>
                
                {#if link.isExternal}
                    <div class="pointer-events-none">
                        <ExternalLinkIcon 
                            class="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                    </div>
                {/if}
            </a>
            
            <!-- <div class="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div> -->
        </div>
    {/each}
</div>


<style>
    /* Add any additional custom styles here */
</style>