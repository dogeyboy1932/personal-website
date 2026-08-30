<script lang="ts">
  import { fade } from "svelte/transition";
  import { MetaTags } from "svelte-meta-tags";
  import PageHeader from "../../components/Headers/PageHeader.svelte";
  import ComingSoon from "../../lib/ComingSoon.svelte";
  import { theme } from "../../lib/stores";
  // FX:scroll-reveal
  import { scrollReveal } from "../../lib/actions/scrollReveal";

  /* "hot takes is part of it (idea)" — kept as a named strand rather than a
     separate route, so it can grow into a tag/section without another page. */
  const strands = [
    { name: "Hot takes", note: "Short, opinionated, probably about AI or economics" },
    { name: "Long form", note: "Things that needed more than a paragraph" },
    { name: "Build notes", note: "What broke, and what it taught me" },
  ];
</script>

<MetaTags title="Writings — Akhil Gogineni" description="Essays and hot takes, in progress." />

<section class="space-y-8 pb-4" in:fade>
  <div use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}>
    <PageHeader title="Writings" />
  </div>

  <!-- FX:scroll-reveal -->
  <div use:scrollReveal>
    <ComingSoon
      blurb="Essays, build notes, and hot takes."
      note="Nothing published yet — the route is live so it can be linked before it's filled."
    >
      <div class="mt-6 grid gap-3 sm:grid-cols-3">
        {#each strands as strand}
          <div class="rounded-xl border {$theme.border.light} {$theme.bg.secondary} p-4 text-left">
            <div class="text-sm font-semibold {$theme.text.secondary}">{strand.name}</div>
            <div class="mt-1 text-xs {$theme.text.dim}">{strand.note}</div>
          </div>
        {/each}
      </div>
    </ComingSoon>
  </div>
</section>
