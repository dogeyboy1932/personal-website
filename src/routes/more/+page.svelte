<script lang="ts">
  // External dependencies
  import { fade } from "svelte/transition";

  // Components
  import PageHeader from "../../components/Headers/PageHeader.svelte";
  import {
    LichessCard,
    StatStrip,
    TravelSection,
    InterestGrid,
    LeadershipSection,
    HonorShelf,
    ConnectFooter,
    ChessChallenge,
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
  /* Section labels. "What I won" was dropped — HonorShelf already labels
     itself, so the heading duplicated it. */
  const sections = [
    { id: "travel", label: "Where I've been" },
    { id: "interests", label: "What I'm into" },
    { id: "leadership", label: "What I ran" },
  ] as const;
</script>

<section class="space-y-7 pb-4" in:fade>
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

  <!-- ===== TRAVEL ===== -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <h3
      class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}"
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
      class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}"
    >
      {sections[1].label}
    </h3>
    <InterestGrid interests={more.interests ?? []} />
  </section>

  <!-- ===== WHAT I RAN + WHAT I WON =====
       One region, two registers. Fused because they are both credentials and
       two stacked headed sections cost real height; kept visually distinct
       because they are not the same claim — leadership is roles with substance
       behind them, honors are one-line results. ("Leadership and honors could
       be fused somewhat but they shouldn't appear the same. There's def a lot
       more to articulate wiht leadership. Honors could be more compact.")

       Leadership keeps full width and card treatment; there is more to say
       there later. Honors sits underneath as a single chip strip. -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <h3 class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}">
      {sections[2].label}
    </h3>
    <LeadershipSection leadership={more.leadership ?? []} {clubs} />

    <div class="mt-4">
      <h4 class="meta-label mb-2 ml-1 text-[11px] {$theme.text.dim}">Honors</h4>
      <HonorShelf honors={more.honors ?? []} />
    </div>
  </section>

  <!-- ===== LICHESS (WITH CHALLENGE) + CONNECT ===== -->
  <!-- "the 'play me' should be in the lichess container...keep it all
       contained. THe find me container should be where play me is right now" -->
  <!-- FX:scroll-reveal -->
  <div class="grid gap-4 lg:grid-cols-2" use:scrollReveal>
    <LichessCard label={more.lichess.label} username={more.lichess.username}>
      <ChessChallenge />
    </LichessCard>
    <ConnectFooter socials={more.socials ?? []} />
  </div>
</section>
