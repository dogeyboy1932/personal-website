<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import Button from './Button.svelte';
	import { darkModeStore } from '../../functions/utils';

	let isDarkMode = true;

	darkModeStore.subscribe((value) => {
		isDarkMode = value;
	});

	function handleSwitchDarkMode() {
		darkModeStore.update((value) => !value);

		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<Button variant="ghost" size="icon" on:click={handleSwitchDarkMode}>
	<Sun class="h-[1.5rem] w-[1.3rem] dark:hidden" />
	<Moon class="hidden h-5 w-5 dark:block" />
	<span class="sr-only">Toggle theme</span>
</Button>
