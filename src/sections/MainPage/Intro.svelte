<script lang="ts">
    import { DotIcon } from 'lucide-svelte';
    import { Logo } from '../../components/Logo';

    function handleNavClick(e: MouseEvent) {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        const targetId = href?.replace('#', '');
        const element = document.getElementById(targetId || '');
        
        if (element) {
            const offset = 50; // Adjust this value as needed
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
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
                    <a 
                        href="#{section}" 
                        class="nav-link" 
                        on:click={handleNavClick}
                    >
                        {section.toUpperCase()}
                    </a>
                {/each}
            </nav>
        </div>
    </div>

    <div class="gradient-container2">
        <h1 class="gradient-text2">
            Akhil Gogineni
        </h1>
    </div>
</header>


<!-- Intro Text Section -->
<div class="border-2 intro-container px-1">
    <span class="intro-header">
        Junior at 
        <span class="text-primary text-orange-800">
            University of Illinois - Urbana Champaign
        </span> 
        
        <br>
        
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

        <p class="text-yellow-500 text-md font-semibold">
            Determined to stay ahead of the curve 🔥
        </p>
    </div>
</div>



<style lang="postcss">
    .gradient-container2 {
        @apply 
            bg-gradient-to-r 
               dark:from-purple-500 dark:via-cyan-500 dark:to-purple-500
               from-purple-600 via-cyan-600 to-purple-600 
                border-t border-gray-200
    }

    .gradient-text2 {
        @apply px-8 py-4 flex justify-center font-sans text-4xl font-bold tracking-tight 
               bg-clip-text text-transparent;
        background-image: linear-gradient(90deg, #5fffbc, #feb47b, #5feaff);
        background-size: 200% 200%;
        animation: gradient-animation 3s ease infinite;
    }

    @keyframes gradient-animation {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>