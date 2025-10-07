<script lang="ts">
  import { resume } from "../../constants/resume";
  import SectionHeader from "../../components/Headers/SectionHeader.svelte";
  import { fade, fly } from "svelte/transition";
</script>

<section class="space-y-6" in:fade>
  <SectionHeader id="resume" title={resume.pageTitle} />
  <div class="rounded-2xl border border-emerald-500/20 bg-white/80 p-6 shadow-lg dark:bg-slate-900/70" in:fly={{ y: 8 }}>
    <p class="text-sm text-slate-700 dark:text-slate-300">{resume.description}</p>
    {#if resume.embed}
      <div class="mt-4 w-full rounded-md overflow-hidden border">
        <iframe src={resume.url} width={resume.embedWidth} height={resume.embedHeight} class="w-full h-[900px]" />
      </div>
      <a href={resume.url} class="mt-4 inline-flex items-center rounded-md border border-emerald-400/60 px-4 py-2 text-sm uppercase tracking-[0.35em] font-semibold text-emerald-200 bg-emerald-500/10 hover:bg-emerald-500/20" target="_blank" rel="noopener noreferrer">
        {resume.label}
      </a>
    {:else}
      <a href={resume.url} class="mt-4 inline-flex items-center rounded-md border border-emerald-400/60 px-4 py-2 text-sm uppercase tracking-[0.35em] font-semibold text-emerald-200 bg-emerald-500/10 hover:bg-emerald-500/20" target="_blank" rel="noopener noreferrer">
        {resume.label}
      </a>
    {/if}
  </div>
</section>
