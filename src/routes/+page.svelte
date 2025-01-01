<script lang="ts">
	import Intro from '../sections/MainPage/Intro.svelte';
	import Experiences from '../sections/MainPage/Experiences.svelte';
	import Projects from '../sections/MainPage/Projects.svelte';
	import Skills from '../sections/MainPage/Skills.svelte';
	import Hobbies from '../sections/MainPage/Hobbies.svelte';
	import Links from '../sections/MainPage/Links.svelte';
	import { MetaTags } from 'svelte-meta-tags';
</script>

<!--
<MetaTags
	title="Akhil Gogineni"
	description="I enjoy building websites and applications. Most of my hours are spent on hackathons, and I'm
		always building something. I'm currently working at Nethermind."
	canonical="https://marcuspang.me/"
/>
-->

<!-- <section class="py-8">
	<h1 class="pb-1 text-3xl font-semibold tracking-tight text-primary">Akhil Gogineni</h1>
	<p class="pb-1 text-xl text-muted-foreground">Full-stack + Smart Contract Developer</p>
</section> -->

<!-- <section class="py-8">
	<h2 class="pb-1 text-xl font-bold tracking-tight text-primary" id="about-me">About</h2>
	<p class="prose dark:text-slate-300/70">
		Determined to stay ahead of the curve 🔥
	</p>
</section> -->

<section class="py-3">
	<!-- <h2 class="pb-1 text-xl font-bold tracking-tight text-primary" id="education">
		About
	</h2> -->
	<Intro />
</section>

<section class="pb-8 pt-12">
	<h2 class="text-2xl font-bold tracking-wide text-primary border-b-2 border-primary pb-4" id="experience">
		Work Experience
	</h2>
	<Experiences />
</section>

<section class="pb-8 pt-12">
	<h2 class="pb-2 text-2xl font-bold tracking-wide text-primary border-b-2 border-primary" id="project">
		Projects
	</h2>

	<div class="mt-5">
		<Projects />
	</div>
</section>

<section class="py-8">
	<h2 class="pb-2 text-2xl font-bold tracking-wide text-primary border-b-2 border-primary" id="skills">
		Skills
	</h2>
	<Skills />
</section>

<section class="py-8">
	<h2 class="pb-2 text-2xl font-bold tracking-wide text-primary border-b-2 border-primary" id="other">
		Other
	</h2>
	<Hobbies/>
</section>

<section class="py-8">
	<h2 class="pb-2 text-2xl font-bold tracking-wide text-primary border-b-2 border-primary" id="links">Links</h2>
	<Links />
</section>

