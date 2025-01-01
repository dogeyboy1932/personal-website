<script lang="ts">
	import SiteHeader from '../sections/SiteHeader.svelte';
	// import Analytics from '../../Trash/Analytics.svelte';
    import MatrixRain from '../animations/MatrixRain.svelte';
	import '../styles.css';
</script>

<MatrixRain />

<!-- <Analytics /> -->
<div class="backdrop-blur-sm bg-white/70 dark:bg-gray-900/80 absolute inset-0 bg-gradient-to-b via-background to-background">
	<main class="md:w-[70%] lg:w-[50%] mx-auto px-4 pb-12 bg-white/90 dark:bg-gray-900/90">
		<SiteHeader />
		<slot />
	</main>
</div>



<!-- 
<script lang="ts">
    import '../styles.css';
    import SiteHeader from '../sections/SiteHeader.svelte';
    import MatrixRain from '../animations/MatrixRain.svelte';
</script>

<MatrixRain />

<div class="relative min-h-screen bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm ">
    
    <main class="px-4 pb-12 z-10">
        <SiteHeader />
        <div class="prose dark:prose-invert max-w-xl mx-auto">
            <slot />
        </div>
     </main> -->
<!-- </div>

<style>
    :global(body) {
        background: theme('colors.background');
    }
    
    :global(.prose) {
        max-width: none;
    }
</style>
>
</main>
>
</main> -->
