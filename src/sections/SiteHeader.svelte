<script lang="ts">
	import { browser } from '$app/environment';
	import {Logo } from '../components/Logo';
	import { darkModeStore } from '../functions/utils';
	import ThemeToggle from '../components/Button/ThemeToggle.svelte';

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			darkModeStore.set(true);
		} else {
			document.documentElement.classList.remove('dark');
			darkModeStore.set(false);
		}
	}
</script>

<header class="m-1 bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-purple-500/30 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
	<div class="flex justify-between w-full py-4 px-6">
		<a href="/" class="flex items-center">
			<Logo class="w-10 h-10 transition-opacity hover:opacity-80" />
		</a>
		
		<div class="flex items-center space-x-4">
			<nav class="hidden space-x-6 text-sm font-medium md:flex">
				<a href="#experience" class="relative py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-cyan-500 after:to-purple-500 hover:after:w-full after:transition-all after:duration-300">Experience</a>
				<a href="#project" class="relative py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-cyan-500 after:to-purple-500 hover:after:w-full after:transition-all after:duration-300">Projects</a>
				<a href="#skills" class="relative py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-cyan-500 after:to-purple-500 hover:after:w-full after:transition-all after:duration-300">Skills</a>
				<a href="#other" class="relative py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-cyan-500 after:to-purple-500 hover:after:w-full after:transition-all after:duration-300">Other</a>
				<a href="#links" class="relative py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-cyan-500 after:to-purple-500 hover:after:w-full after:transition-all after:duration-300">Links</a>
				<!-- <a href="/OtherPage" class="hover:underline">New Page</a> -->
		</div>
		<ThemeToggle />
			<!-- {#if $page.data.session}
				{#if $page.data.session.user?.image}
					<Avatar>
						<AvatarImage
							src={$page.data.session.user.image}
							alt={$page.data.session.user?.email ?? $page.data.session.user?.name}
							class="transition-opacity hover:opacity-80"
						/>
						<AvatarFallback>PFP</AvatarFallback>
					</Avatar>
				{/if}
				<Button on:click={() => goto('/auth/signout')} variant="outline">Sign Out</Button>
			{:else}
				<Button on:click={() => goto('/auth/signin')} variant="outline">Sign In</Button>
			{/if} -->
	</div>
	


	<!-- TITLE NAME -->

	<div class="mt-4 py-6 px-8 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10 rounded-b-2xl border-t border-gray-200 dark:border-gray-800">
		<h1 class="flex justify-center font-sans text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
			Akhil Gogineni
		</h1>
		
		<h2 class="flex justify-center mt-2 text-lg font-medium text-gray-600 dark:text-gray-300">
			Determined to stay ahead of the curve 🔥
		</h2>
		
	</div>


</header>
