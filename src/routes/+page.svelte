<script lang="ts">
	// import Intro from '../sections/MainPage/Intro.svelte';
	import Experiences from '../sections/MainPage/Experiences.svelte';
	import Projects from '../sections/MainPage/Projects.svelte';
	import Skills from '../sections/MainPage/Skills.svelte';
	import Hobbies from '../sections/MainPage/Hobbies.svelte';
	import Links from '../sections/MainPage/Links.svelte';
	import SectionHeader from '../components/Divs/SectionHeader.svelte';
	import { MetaTags } from 'svelte-meta-tags';
</script>
<!-- 
<section class="px-0">
	<Intro />
</section> -->

<section class="">
	<SectionHeader id="experience" title="Work Experience" />
	<Experiences />
</section>

<section class="">
	<SectionHeader id="projects" title="Projects" />
	<div class="">
		<Projects />
	</div>
</section>

<section class="">
	<SectionHeader id="skills" title="Skills" />
	<Skills />
</section>

<section class="">
	<SectionHeader id="other" title="Other" />
	<Hobbies/>
</section>

<section class="ty-8">
	<SectionHeader id="links" title="Links" />
	<Links />
</section>
