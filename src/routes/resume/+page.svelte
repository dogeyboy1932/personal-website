<script lang="ts">
  // External dependencies
  import { fade, fly } from "svelte/transition";
  
  // Components
  import { PageHeader } from "../../components/Headers";
  
  // Constants
  import { resume } from "../../constants";
</script>

<section class="space-y-6" in:fade>
  <PageHeader title={resume.pageTitle} />
  
  <!-- ===== RESUME DISPLAY CARD ===== -->
  <div class="rounded-2xl border border-slate-500/20 bg-slate-900/70 p-6 shadow-lg" in:fly={{ y: 8 }}>
    <p class="text-sm text-slate-300">{resume.description}</p>
    
    {#if resume.embed}
      <!-- Embedded resume iframe -->
      <div class="mt-4 w-full rounded-md overflow-hidden border">
        <iframe 
          title={resume.label} 
          src={resume.url} 
          width={resume.embedWidth} 
          height={resume.embedHeight} 
          class="w-full h-[900px]" 
        />
      </div>
      
      <!-- Open in new tab link -->
      <a 
        href={resume.url} 
        class="mt-4 inline-flex items-center rounded-md border border-slate-400/60 px-4 py-2 text-sm uppercase tracking-[0.35em] font-semibold text-slate-200 bg-slate-500/10 hover:bg-slate-500/20 transition" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Open in New Tab
      </a>
    {:else}
      <!-- Direct link to resume -->
      <a 
        href={resume.url} 
        class="mt-4 inline-flex items-center rounded-md border border-slate-400/60 px-4 py-2 text-sm uppercase tracking-[0.35em] font-semibold text-slate-200 bg-slate-500/10 hover:bg-slate-500/20 transition" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {resume.label}
      </a>
    {/if}
  </div>
</section>
