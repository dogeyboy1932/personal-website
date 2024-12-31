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

<header class="m-1 bg-transparent">
	<div class="flex justify-between max-w-xl py-2 mx-5">
		<a href="/" class="flex items-center">
			<Logo class="w-10 h-10 transition-opacity hover:opacity-80" />
		</a>
		
		<div class="flex items-center space-x-2">
			<div class="hidden space-x-3 text-sm md:block">
				<a href="#experience" class="hover:underline">Experience</a>
				<a href="#project" class="hover:underline">Projects</a>
				<a href="#skills" class="hover:underline">Skills</a>
				<a href="#other" class="hover:underline">Other</a>
				<a href="#links" class="hover:underline">Links</a>
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
		
	</div>


	<!-- TITLE NAME -->

	<div class="dark:border-2 dark:border-t-0 dark:border-gray-400 border-black border-2 border-t-0">
		<h1 class="flex justify-center font-sans md:font-serif text-3xl tracking-tight text-primary dark:text-yellow-600">
			Akhil Gogineni
		</h1>
		
		<h2 class="flex justify-center">
			Determined to stay ahead of the curve 🔥
		</h2>
		
	</div>


</header>
