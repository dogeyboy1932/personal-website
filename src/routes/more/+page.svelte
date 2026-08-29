<script lang="ts">
  // External dependencies
  import { fade } from "svelte/transition";

  // Components
  import PageHeader from "../../components/Headers/PageHeader.svelte";
  import {
    BioCard,
    LichessCard,
    StatStrip,
    TravelSection,
    InterestGrid,
    LeadershipSection,
    HonorShelf,
    ConnectFooter,
  } from "../../components/MORE";
  import { FlipWords } from "../../components/fx";

  // Constants and theme
  import { more, clubs } from "../../constants";
  import { theme } from "../../lib/stores";
  // FX:scroll-reveal
  import { scrollReveal } from "../../lib/actions/scrollReveal";

  /**
   * Section order is deliberate: hook (stats) -> who (bio) -> where (travel)
   * -> what (interests) -> what I ran (leadership) -> what I won (honors)
   * -> how to reach me. Each section is a labelled band so the page reads as
   * a sequence rather than a wall of cards.
   */
  const sections = [
    { id: "travel", label: "Where I've been" },
    { id: "interests", label: "What I'm into" },
    { id: "leadership", label: "What I ran" },
    { id: "honors", label: "What I won" },
  ] as const;
</script>

<section class="space-y-10 pb-4" in:fade>
  <!-- ===== IDENTITY HEADER ===== -->
  <div use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}>
    <PageHeader title={more.title} />

    <!-- FX:flip-words — rotating identity line under the title -->
    <p
      class="mt-4 text-center text-lg {$theme.text.muted}"
    >
      Off the clock, I'm
      <FlipWords
        words={more.identityWords ?? []}
        class="font-semibold {$theme.accent.orange.text}"
      />
    </p>
    <!-- /FX:flip-words -->
  </div>

  <!-- ===== STAT BAND ===== -->
  <!-- FX:scroll-reveal -->
  <div use:scrollReveal>
    <StatStrip stats={more.stats ?? []} />
  </div>

  <!-- ===== BIO ===== -->
  <!-- FX:scroll-reveal -->
  <div use:scrollReveal>
    <BioCard subtitle={more.subtitle} bio={more.bio} />
  </div>

  <!-- ===== TRAVEL ===== -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <h3
      class="mb-4 ml-1 text-base font-bold uppercase tracking-[0.4em] {$theme.text.muted} sm:text-lg"
    >
      {sections[0].label}
    </h3>
    <TravelSection
      path={more.travel?.path ?? []}
      countries={more.travel?.countries ?? []}
    />
  </section>

  <!-- ===== INTERESTS ===== -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <h3
      class="mb-4 ml-1 text-base font-bold uppercase tracking-[0.4em] {$theme.text.muted} sm:text-lg"
    >
      {sections[1].label}
    </h3>
    <InterestGrid interests={more.interests ?? []} />
  </section>

  <!-- ===== LEADERSHIP & CLUBS ===== -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <h3
      class="mb-4 ml-1 text-base font-bold uppercase tracking-[0.4em] {$theme.text.muted} sm:text-lg"
    >
      {sections[2].label}
    </h3>
    <LeadershipSection leadership={more.leadership ?? []} {clubs} />
  </section>

  <!-- ===== HONORS ===== -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <h3
      class="mb-4 ml-1 text-base font-bold uppercase tracking-[0.4em] {$theme.text.muted} sm:text-lg"
    >
      {sections[3].label}
    </h3>
    <HonorShelf honors={more.honors ?? []} />
  </section>

  <!-- ===== LICHESS + CONNECT ===== -->
  <!-- FX:scroll-reveal -->
  <div class="grid gap-4 lg:grid-cols-2" use:scrollReveal>
    <LichessCard label={more.lichess.label} username={more.lichess.username} />
    <ConnectFooter socials={more.socials ?? []} />
  </div>
</section>
