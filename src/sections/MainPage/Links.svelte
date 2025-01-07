<script lang="ts">
    import { ExternalLinkIcon, GithubIcon, LinkedinIcon, TwitterIcon, MailIcon } from 'lucide-svelte';
    import { links } from '../../constants/links';
    import { fade } from 'svelte/transition';



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



<!-- <div class=""> -->
    <div class="page-grid">
        {#each links as link, i}
            
        <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                class="link-primary"
            >
            <div 
                class="sm-content-card"  
                in:fade={{delay: i * 200, duration: 500}}
            >
                <div class="text-center space-y-2">
                    <span class="flex items-center justify-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
                        <svelte:component this={getIcon(link.platform)} class="w-6 h-6" />
                        {link.platform}
                    </span>
                    
                    {#if link.title}
                        <p class="text-gray-600 dark:text-gray-400 text-sm">
                            {link.title}
                        </p>
                    {/if}                    
                </div>
            </div>
        </a>
        {/each}
    </div>
<!-- </div> -->