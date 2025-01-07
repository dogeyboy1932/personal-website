<script lang="ts">
    import { ExternalLinkIcon, GithubIcon, LinkedinIcon, TwitterIcon, MailIcon } from 'lucide-svelte';
    import { links } from '../../constants/links';
    import { fade } from 'svelte/transition';

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

<div class="text-regular page-grid">
    {#each links as link, i}
        <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div class="sm-content-card h-[110px]">
                <div class="flex justify-center items-center gap-2 pt-2">
                    <svelte:component this={getIcon(link.platform)} class="w-6 h-6" />
                    <span class="link-primary text-lg font-semibold"> {link.platform} </span>
                </div>
                
                {#if link.title}
                    <p class="text-regular text-sm mt-1 text-center border-t-2 border-zinc-200 mx-4 ">
                        {link.title}
                    </p>
                {/if}
            </div>
        </a>
    {/each}    
</div>

<!-- class="link-primary" -->