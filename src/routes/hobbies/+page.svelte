<script lang="ts">
	import SectionHeader from '../../components/Divs/SectionHeader.svelte';
	import { hobbyData } from '../../constants/hobbies';
	import { hobbiesAdventureIdeas, hobbiesHero } from '../../constants/hobbies-page';
	import { fade, fly } from 'svelte/transition';
</script>

<section class="space-y-12">
	<section class="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
		<div class="space-y-6" in:fly={{ x: -18, duration: 400 }}>
			<p class="text-xs uppercase tracking-[0.45em] text-emerald-500">{hobbiesHero.tagline}</p>
			<h1 class="text-4xl font-semibold text-slate-900 dark:text-slate-100">{hobbiesHero.title}</h1>
			<p class="text-base text-slate-600 dark:text-slate-300">{hobbiesHero.description}</p>
		</div>

		<figure class="relative" in:fly={{ x: 18, duration: 400 }}>
			<div class="aspect-[4/3] overflow-hidden rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/15 via-transparent to-purple-500/15 shadow-2xl">
				<img src={hobbiesHero.image.src} alt={hobbiesHero.image.alt} class="h-full w-full object-cover opacity-90" />
			</div>
			<figcaption class="mt-3 text-center text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
				{hobbiesHero.image.caption}
			</figcaption>
		</figure>
	</section>

	<SectionHeader id="hobbies" title="Hobby notebook" />
	<div class="space-y-12 text-slate-900 dark:text-slate-100">
		{#each hobbyData.hobbies as hobbyType}
			<section class="space-y-4">
				<h2 class="text-3xl font-bold text-center">{hobbyType.category}</h2>
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each hobbyType.items as hobby}
						<div class="rounded-2xl border border-emerald-500/20 bg-white/80 p-6 text-center shadow-lg dark:bg-slate-900/60">
							<h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{hobby.name}</h3>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>

	<section class="space-y-6" in:fade>
		<h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">Future adventures</h2>
		<p class="text-sm text-slate-600 dark:text-slate-300">
			Swap in your upcoming events, collaborations, or goals to keep this roadmap current. These prompts can be adapted for the next big idea you want to share.
		</p>
		<div class="grid gap-6 md:grid-cols-3">
			{#each hobbiesAdventureIdeas as idea, index}
				<div class="rounded-2xl border border-emerald-500/20 bg-white/80 p-6 text-sm shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900/60" in:fly={{ y: 16, delay: index * 120 }}>
					<h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">{idea.title}</h3>
					<p class="mt-3 text-xs text-slate-600 dark:text-slate-300">{idea.description}</p>
				</div>
			{/each}
		</div>
	</section>
</section>
