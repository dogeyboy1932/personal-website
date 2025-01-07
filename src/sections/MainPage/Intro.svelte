<script lang="ts">
    import { DotIcon } from 'lucide-svelte';
    import { experiences } from '../../constants/experiences';
    import { Logo } from '../../components/Logo';
</script>

<!-- Navigation section -->
<header class="rounded-t border-2 border-b-0">
    <div class="flex justify-between w-full py-2 px-6 border-green-500 border-b-2">
        <a href="/" class="flex items-center">
            <Logo class="w-10 h-10 transition-opacity hover:opacity-80" />
        </a>
        
        <div class="flex items-center space-x-4 ml-auto">
            <nav class="nav-container">
                {#each ['experience', 'projects', 'skills', 'other', 'links'] as section}
                    <a href="#{section}" class="nav-link">
                        {section.toUpperCase()}
                    </a>
                {/each}
            </nav>
        </div>
    </div>

    <div class="gradient-container">
        <h1 class="gradient-text">
            Akhil Gogineni
        </h1>
    </div>
</header>


<!-- Intro Text Section -->
<div class="border-2 intro-container">
    <span class="intro-header">
        Junior at the 
        <span class="text-primary dark:text-primary">
            University of Illinois - Urbana Champaign
        </span> 
        studying 
        <span class="text-accent dark:text-accent">
            Computer Science & Economics
        </span> 
    </span>
    
    <div class="intro-text">
        <p class="intro-paragraph">
            I enjoy learning, exploring, and building things
        </p>
        
        <p class="intro-paragraph">
            Dedicated to consistent improvement with aspirations to rise to the top
        </p>

        <p class="intro-highlight">
            Determined to stay ahead of the curve 🔥
        </p>
    </div>
</div>



<style>
    
</style>