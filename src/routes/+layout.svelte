<script lang="ts">
    import MatrixRain from '../animations/MatrixRain.svelte';
    import NavigationBar from '../sections/NavigationBar.svelte';
    import Intro from '../sections/MainPage/Intro.svelte';
	import '../styles/mainpage.css';
    import '../styles.css';
</script>

<MatrixRain />

<div class="min-h-screen relative">
    <NavigationBar />
    <div class=" min-h-screen">
        <main class="md:w-[70%] lg:w-[50%] mx-auto pb-12  bg-gray-400/90 dark:bg-gray-900/90 relative z-10">
            
            <Intro />
            <div class="px-3">
                <slot />
            </div>
        </main>
    </div>
</div>

<style lang="postcss">
    :global(body) {
        @apply bg-gradient-to-br from-slate-100 to-white dark:from-gray-900 dark:to-black;
    }
</style>