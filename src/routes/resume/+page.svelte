<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { PageHeader } from "../../components/Headers";
  import { scrollReveal } from "../../lib/actions/scrollReveal";
  import { resume } from "../../constants";
  import { theme } from "../../lib/stores";

  $: linkClass =
    `mt-4 inline-flex items-center rounded-md border px-4 py-2 text-sm font-semibold uppercase ` +
    `tracking-[0.35em] transition ${$theme.border.light} ${$theme.text.primary} ` +
    `${$theme.bg.secondary} ${$theme.hover.bgSecondary}`;
</script>

<section class="space-y-6" in:fade>
  <PageHeader title={resume.pageTitle} />

  <div
    class="rounded-2xl border p-6 shadow-lg {$theme.border.default} {$theme.bg.card}"
    in:fly={{ y: 8 }}
    use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}
  >
    <p class="text-sm {$theme.text.secondary}">{resume.description}</p>

    {#if resume.embed}
      <div class="mt-4 w-full overflow-hidden rounded-md border">
        <iframe
          title={resume.label}
          src={resume.url}
          width={resume.embedWidth}
          height={resume.embedHeight}
          class="h-[900px] w-full"
        />
      </div>
    {/if}

    <a href={resume.url} class={linkClass} target="_blank" rel="noopener noreferrer">
      {resume.embed ? "Open in New Tab" : resume.label}
    </a>
  </div>
</section>
