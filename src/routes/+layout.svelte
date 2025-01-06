<script lang="ts">
    import MatrixRain from '../animations/MatrixRain.svelte';
    import NavigationBar from '../sections/NavigationBar.svelte';
	import '../styles.css';
</script>

<MatrixRain />

<div class="min-h-screen relative">
    <NavigationBar />
    <div class=" min-h-screen">
        <main class="md:w-[70%] lg:w-[50%] mx-auto px-4 pb-12 bg-gray-400/90 dark:bg-gray-900/90 relative z-10">
            
            <slot />
        </main>
    </div>
</div>

<style lang="postcss">
    :global(body) {
        @apply bg-gradient-to-br from-slate-100 to-white dark:from-gray-900 dark:to-black;
    }
</style>