<script lang="ts">
	import { labChecklist, labHero } from '../../constants/lab';
</script>

<section class="flex min-h-[60vh] flex-col gap-10">
	<header class="space-y-3">
		<p class="text-xs uppercase tracking-[0.45em] text-emerald-500">{labHero.tagline}</p>
		<h1 class="text-4xl font-semibold text-slate-900 dark:text-slate-100">{labHero.title}</h1>
		<p class="max-w-2xl text-sm text-slate-600 dark:text-slate-300">{labHero.description}</p>
	</header>

	<div class="grid gap-6 lg:grid-cols-2">
		<div class="rounded-3xl border border-dashed border-emerald-400/40 bg-white/70 p-6 text-sm shadow-inner dark:bg-slate-900/60">
			<h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Design pasteboard</h2>
			<p class="mt-3 text-slate-600 dark:text-slate-300">
				Paste Figma embeds, screenshots, or detailed notes right inside this block.
			</p>
			<div class="mt-4 min-h-[220px] rounded-2xl border border-emerald-300/30 bg-emerald-500/5 p-4 text-slate-500 dark:text-slate-400">
				Drop references or notes here
			</div>
		</div>

		<div class="flex flex-col gap-4 rounded-3xl border border-emerald-400/30 bg-white/80 p-6 shadow-lg dark:bg-slate-900/60">
			<h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Things to outline</h2>
			<ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
				{#each labChecklist as item}
					<li class="flex items-start gap-2">
						<span class="mt-1 h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
						<span>{item}</span>
					</li>
				{/each}
			</ul>
			<div class="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-xs uppercase tracking-[0.35em] text-emerald-300">
				Ready when you are!
			</div>
		</div>
	</div>
</section>
