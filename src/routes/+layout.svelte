<script lang="ts">
	import '../styles.css';
	
	import SiteHeader from '../sections/SiteHeader.svelte';
	// import Analytics from '../../Trash/Analytics.svelte';
</script>

<!-- <Analytics /> -->
<main class="max-w-xl mx-auto px-4 pb-12">
	<SiteHeader />
	<slot />
</main>
