<script lang="ts">
	import SectionHeader from '../../components/Divs/SectionHeader.svelte';
	import { skillsData } from '../../constants/skills';
	import { skillsCertificationIdeas, skillsHero, skillsStrengthThreads } from '../../constants/skills-page';
	import { fade, fly } from 'svelte/transition';
</script>

<section class="space-y-12">
	<section class="grid items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
		<div class="space-y-6" in:fly={{ x: -18, duration: 400 }}>
			<p class="text-xs uppercase tracking-[0.45em] text-emerald-500">{skillsHero.tagline}</p>
			<h1 class="text-4xl font-semibold text-slate-900 dark:text-slate-100">{skillsHero.title}</h1>
			<p class="text-base text-slate-600 dark:text-slate-300">{skillsHero.description}</p>
			<div class="grid gap-4 sm:grid-cols-3" in:fade>
				{#each skillsStrengthThreads as thread, index}
					<div class="rounded-2xl border border-emerald-500/30 bg-white/70 p-4 text-sm shadow-lg dark:bg-slate-900/70" in:fly={{ y: 18, delay: index * 120 }}>
						<h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">{thread.title}</h3>
						<p class="mt-2 text-xs text-slate-600 dark:text-slate-300">{thread.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<figure class="relative" in:fly={{ x: 18, duration: 400 }}>
			<div class="aspect-[4/5] overflow-hidden rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-slate-900 via-emerald-500/10 to-slate-900 shadow-2xl">
				<img src={skillsHero.image.src} alt={skillsHero.image.alt} class="h-full w-full object-cover opacity-80" />
			</div>
			<figcaption class="mt-3 text-center text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
				{skillsHero.image.caption}
			</figcaption>
		</figure>
	</section>

	<SectionHeader id="skills" title="Skill library" />
	<div class="space-y-10">
		{#each skillsData.skills as skillCategory}
			<section class="space-y-4">
				<h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">{skillCategory.category}</h2>
				<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
					{#each skillCategory.items as skill}
						<div class="rounded-2xl border border-emerald-500/20 bg-white/80 p-6 text-center shadow-lg dark:bg-slate-900/60">
							<img src={skill.logoUrl} alt={skill.name} class="mx-auto mb-4 h-16 w-24 rounded-md bg-slate-200 object-contain p-2 dark:bg-slate-700" />
							<h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">{skill.name}</h3>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>

	<section class="space-y-6" in:fade>
		<h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">Up next on the radar</h2>
		<p class="text-sm text-slate-600 dark:text-slate-300">
			I’m currently exploring these certifications and learning paths to keep expanding my toolkit. Swapping these placeholders with your newest goals keeps this list fresh.
		</p>
		<div class="flex flex-wrap gap-3">
			{#each skillsCertificationIdeas as idea, index}
				<span class="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200" in:fly={{ y: 12, delay: index * 90 }}>
					{idea}
				</span>
			{/each}
		</div>
		<a href="/projects" class="inline-flex text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300 hover:text-emerald-100">View how these skills show up in projects →</a>
	</section>
</section>
