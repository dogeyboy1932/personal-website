<script lang="ts">
	import { ExternalLinkIcon } from 'lucide-svelte';
	import { links } from '../../constants/links';
</script>

<div class="grid grid-cols-1 sm:grid-cols-4 sm:gap-y-4">
	{#each links as link}
		<!-- <div class="col-span-1 text-muted-foreground">{link.platform}</div> -->
		<div class="col-span-3 pb-2 text-secondary-foreground sm:pb-0">
			{#if link.isExternal}
				<a
					href={link.href}
					target="_blank"
					rel="noopener"
					class="break-all transition-colors dark:hover:text-slate-200 dark:text-slate-300 hover:text-slate-500 text-slate-600"
				>
					{link.platform}
					<ExternalLinkIcon class="h-4 w-4 mb-0.5 inline" />
				</a>
			{:else}
				<a
					href={link.href}
					class="break-all transition-colors dark:hover:text-slate-200 dark:text-slate-300 hover:text-slate-500 text-slate-600"
				>
					{link.platform}
				</a>
			{/if}
		</div>
	{/each}
</div>
