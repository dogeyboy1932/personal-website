<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { embedFrame, theme } from "../../constants/_theme";
  
  import { scrollReveal } from "../../lib/actions/scrollReveal";
  
  import { home } from "../../constants";

  import { PageHeader } from "../../components/Headers";



  $: linkClass =
    `mt-4 inline-flex items-center rounded-md border px-4 py-2 text-sm font-semibold uppercase ` +
    `tracking-[0.35em] transition ${$theme.border.light} ${$theme.text.primary} ` +
    `${$theme.bg.secondary} ${$theme.hover.bgSecondary}`;
</script>

<section class="" in:fade>
  <PageHeader title={home.resume.pageTitle} />

  <div
    class="border shadow-lg {$theme.border.default} {$theme.bg.card}"
    in:fly={{ y: 8 }}
    use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}
  >
  
    <div class="ml-2">
      <a href={home.resume.url} class={linkClass} target="_blank" rel="noopener noreferrer">
        Open in New Tab
      </a>
    </div>
    
    <div class="mt-3 w-full overflow-hidden border {$theme.border.light}">
      <iframe title={home.resume.label} src={home.resume.url} class={embedFrame} />
    </div>
  </div>
</section>
