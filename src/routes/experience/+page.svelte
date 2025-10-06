<script lang="ts">
	import SectionHeader from '../../components/Divs/SectionHeader.svelte';
	import { experiences } from '../../constants/experiences';
	import { experienceHero, experienceHighlightStats } from '../../constants/experience-page';
	import { fade, fly } from 'svelte/transition';

	const milestoneQuotes = experiences.map((experience) => ({
		company: experience.company,
		role: experience.role,
		lesson: experience.description
	}));
</script>

<section class="space-y-12">
	<section class="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
		<div class="space-y-6" in:fly={{ x: -18, duration: 400 }}>
			<p class="text-xs uppercase tracking-[0.45em] text-emerald-500">{experienceHero.tagline}</p>
			<h1 class="text-4xl font-semibold text-slate-900 dark:text-slate-100">{experienceHero.title}</h1>
			<p class="text-base text-slate-600 dark:text-slate-300">{experienceHero.description}</p>
			<div class="flex flex-wrap gap-4" in:fade>
				{#each experienceHighlightStats as stat, index}
					<div class="rounded-2xl border border-emerald-500/30 bg-white/70 px-5 py-4 text-center shadow-lg dark:bg-slate-900/70" in:fly={{ y: 18, delay: index * 140 }}>
						<p class="text-2xl font-semibold text-emerald-400">{stat.value}</p>
						<p class="mt-1 text-xs uppercase tracking-[0.35em] text-slate-500">{stat.label}</p>
					</div>
				{/each}
			</div>
			<a href="/connect" class="inline-flex w-max items-center rounded-full border border-emerald-400/60 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.4em] text-emerald-200 transition hover:bg-emerald-500/10">Let’s collaborate</a>
		</div>

		<figure class="relative" in:fly={{ x: 18, duration: 400 }}>
			<div class="aspect-[4/5] overflow-hidden rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 via-transparent to-cyan-500/20 shadow-2xl backdrop-blur">
				<img src={experienceHero.image.src} alt={experienceHero.image.alt} class="h-full w-full object-cover opacity-90" />
			</div>
			<figcaption class="mt-3 text-center text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
				{experienceHero.image.caption}
			</figcaption>
		</figure>
	</section>

	<SectionHeader id="timeline" title="Experience timeline" />
	<div class="one-grid">
		{#each experiences as experience, i}
			<div class="content-card" in:fade={{ delay: i * 200, duration: 500 }}>
				<div class="p-6">
					<div class="section-header">
						<span class="title">{experience.company}</span>
						<span class="time-badge">{experience.duration}</span>
					</div>
					<div class="label-header mt-2 mb-4">{experience.role}</div>
					<p class="description">{experience.description}</p>
				</div>
			</div>
		{/each}
	</div>

	<section class="space-y-6" in:fade>
		<h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">Lessons I’m carrying forward</h2>
		<div class="grid gap-6 md:grid-cols-2">
			{#each milestoneQuotes as quote, index}
				<div class="rounded-2xl border border-emerald-500/20 bg-white/80 p-6 shadow-lg dark:bg-slate-900/60" in:fly={{ y: 18, delay: index * 80 }}>
					<p class="text-xs uppercase tracking-[0.35em] text-emerald-400">{quote.company}</p>
					<h3 class="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{quote.role}</h3>
					<p class="mt-4 text-sm text-slate-600 dark:text-slate-300">{quote.lesson}</p>
				</div>
			{/each}
		</div>
	</section>
</section>
