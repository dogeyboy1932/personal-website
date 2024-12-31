<script lang="ts">
	import { darkModeStore } from '../../functions/utils';

	let isDarkMode = true;

	darkModeStore.subscribe((value) => {
		isDarkMode = value;
	});
</script>

<svg
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="currentColor"
	xmlns="http://www.w3.org/2000/svg"
	{...$$props}
>
	<path
		d="M2 3L12 24L24 3H18L12 13L8 3H6C"
		fill="url(#linear-gradient)"
	/>
	<defs>
		<linearGradient id="linear-gradient" x1="0" y1="0" x2="100%" y2="0">
			{#if isDarkMode}
				<stop offset="0%" stop-color="#03A89E">
					<animate
						attributeName="stop-color"
						values="#30E8BF; #FF8235; #FFE53B; #FF8235; #30E8BF;"
						dur="3s"
						repeatCount="indefinite"
					/>
				</stop>
				<stop offset="100%" stop-color="#72195A">
					<animate
						attributeName="stop-color"
						values="#F46B45; #EEA849; #F79D00; #EEA849; #F46B45;"
						dur="3s"
						repeatCount="indefinite"
					/>
				</stop>
			{:else}
				<stop offset="0%" stop-color="rgb(29, 78, 216)">
					<animate
						attributeName="stop-color"
						values="rgb(29, 78, 216); rgb(30, 64, 175); rgb(17, 24, 39); rgb(30, 64, 175); rgb(29, 78, 216);"
						dur="5s"
						repeatCount="indefinite"
					/>
				</stop>
				<stop offset="100%" stop-color="rgb(17, 24, 39)">
					<animate
						attributeName="stop-color"
						values="rgb(17, 24, 39); rgb(30, 64, 175); rgb(29, 78, 216); rgb(30, 64, 175); rgb(17, 24, 39);"
						dur="5s"
						repeatCount="indefinite"
					/>
				</stop>
			{/if}
		</linearGradient>
	</defs>
</svg>
