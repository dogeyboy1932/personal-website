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
<section class="px-0">
	<Intro />
</section> -->

<section class="">
	<div class="container px-4">
		<h2 class="text-2xl font-bold tracking-wide text-primary border-b-2 border-primary pb-4" id="experience">
			Work Experience
		</h2>
	</div>
	<Experiences />
</section>

<section class="">
	<div class="container mx-auto px-4">
		<h2 class="pb-2 text-2xl font-bold tracking-wide text-primary border-b-2 border-primary" id="projects">
			Projects
		</h2>
	</div>
	<div class="">
		<Projects />
	</div>
</section>

<section class="">
	<div class="container mx-auto px-4">
		<h2 class="pb-2 text-2xl font-bold tracking-wide text-primary border-b-2 border-primary" id="skills">
			Skills
		</h2>
	</div>
	<Skills />
</section>

<section class="">
	<div class="container mx-auto px-4">
		<h2 class="text-2xl font-bold tracking-wide text-primary border-b-2 border-primary" id="other">
			Other
		</h2>
	</div>
	<Hobbies/>
</section>

<section class="ty-8">
	<div class="container mx-auto px-4">
		<h2 class="pb-2 text-2xl font-bold tracking-wide text-primary border-b-2 border-primary" id="links">
			Links
		</h2>
	</div>
	<Links />
</section>
