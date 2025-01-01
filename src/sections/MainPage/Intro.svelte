<script lang="ts">
    import { DotIcon } from 'lucide-svelte';
    import { experiences } from '../../constants/experiences';
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center ">
    <!-- Profile Image Section -->
    <!-- <div class="col-span-1 flex justify-center">
        <div class="relative w-48 h-48">
            Matrix-style border animation
            <div class="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full animate-pulse"></div>
            
            Profile Image Container
            <div class="relative w-full h-full rounded-full overflow-hidden border-2 border-green-500/30">
                <img
                    src="Pfp.jpg"
                    alt="Profile"
                    class="w-200 h-200 object-cover object-[30%_15%] transform scale-1"
                />
            </div>
        </div>
    </div> -->

    <!-- Intro Text Section -->
    <div class="col-span-3 flex justify-center text-center"> <!-- Changed col-span-2 to col-span-3 and added flex justify-center and text-center -->
        <div class="tracking-tight text-gray-700 dark:text-gray-100 space-y-4 custom-font max-w-2xl"> <!-- Added max-w-2xl for better readability -->
            <span class="text-lg md:text-xl font-semibold block">
                Junior at the 
                <span class="text-green-500 dark:text-green-400">
                    University of Illinois - Urbana Champaign
                </span> 
                studying 
                <span class="text-emerald-600 dark:text-emerald-400">
                    Computer Science & Economics
                </span> 
            </span>
            
            <p class="text-base md:text-lg font-medium leading-relaxed space-y-3">
                <span class="block">
                    I enjoy learning, exploring, and building things
                </span>
                
                <span class="block">
                    Dedicated to consistent improvement with aspirations to rise to the top
                </span>
            </p>
        </div>
    </div>
</div>

<style>
    .custom-font {
        font-family: 'Poppins', sans-serif;
    }

    :global(body) {
        position: relative;
    }
    
    :global(body::before) {
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
    
    @keyframes matrixRain {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 0 100%;
        }
    }
</style>