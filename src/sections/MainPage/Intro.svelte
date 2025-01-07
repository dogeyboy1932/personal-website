<script lang="ts">
    import { DotIcon } from 'lucide-svelte';
    import { experiences } from '../../constants/experiences';
    import { Logo } from '../../components/Logo';
</script>

<header class=" rounded-t border-2 border-b-0">
    <!-- Navigation section -->
    
        <div class="flex justify-between w-full py-2 px-6 border-green-500 border-b-2">
            <a href="/" class="flex items-center">
                <Logo class="w-10 h-10 transition-opacity hover:opacity-80" />
            </a>
            
            <div class="flex items-center space-x-4 ml-auto">
                <nav class="hidden space-x-6 text-sm font-medium md:flex">
                    {#each ['experience', 'projects', 'skills', 'other', 'links'] as section}
                        <a 
                            href="#{section}" 
                            class="relative py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
                                   after:bg-gradient-to-r dark:after:from-primary dark:after:via-accent dark:after:to-secondary
                                   after:from-primary/60 after:to-accent/60
                                   hover:after:w-full after:transition-all after:duration-300
                                   dark:hover:text-primary hover:text-accent"
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </a>
                    {/each}
                </nav>
            </div>
        </div>
</header>

<!-- Intro Text Section -->
<header class=" border-2">
    <div class="tracking-tight space-y-4 custom-font max-w-2xl mx-auto my-8 text-center">
        <span class="text-lg md:text-xl font-semibold block cyberpunk-text">
            Junior at the 
            <span class="text-primary dark:text-primary">
                University of Illinois - Urbana Champaign
            </span> 
            studying 
            <span class="text-accent dark:text-accent">
                Computer Science & Economics
            </span> 
        </span>
        
        <div class="text-base md:text-lg font-medium leading-relaxed space-y-3">
            <p class="block dark:text-muted-foreground">
                I enjoy learning, exploring, and building things
            </p>
            
            <p class="block dark:text-muted-foreground">
                Dedicated to consistent improvement with aspirations to rise to the top
            </p>

            <p class="flex justify-center mt-2 text-lg font-medium pt-4 cyberpunk-text">
                Determined to stay ahead of the curve 🔥
            </p>
        </div>
    </div>
</header>

<style>
    .custom-font {
        font-family: 'Poppins', sans-serif;
    }

    /* Matrix background effect - only visible in dark mode */
    :global(.dark body) {
        position: relative;
    }
    
    :global(.dark body::before) {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
                    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ctext x='50%25' y='50%25' font-family='monospace' font-size='10' fill='rgba(0, 255, 0, 0.1)' text-anchor='middle' dominant-baseline='middle'%3E01%3C/text%3E%3C/svg%3E");
        opacity: 0.05;
        pointer-events: none;
        z-index: -1;
    }
</style>