<script lang="ts">
  import { fade } from "svelte/transition";
  import { MetaTags } from "svelte-meta-tags";
  import PageHeader from "../../components/Headers/PageHeader.svelte";
  import ComingSoon from "../../components/ComingSoon.svelte";
  // FX:scroll-reveal
  import { scrollReveal } from "../../lib/actions/scrollReveal";
</script>

<MetaTags title="Pictures — Akhil Gogineni" description="Photos, in progress." />

<section class="space-y-8 pb-4" in:fade>
  <div use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}>
    <PageHeader title="Pictures" />
  </div>

  <!-- FX:scroll-reveal -->
  <div use:scrollReveal>
    <ComingSoon
      blurb="Photos from the seven countries, the courts, and whatever else is worth keeping."
      note="Nothing here yet — the route is live so it can be linked before it's filled."
    />
  </div>
</section>
