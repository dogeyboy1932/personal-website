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

<section class="space-y-6 pb-4" in:fade>
  <!--
    LAYOUT NOTE
    -----------
    Deliberately NOT one full-width row per section. ("It's worth considering
    how we don't need 'rows' on this page... Plan out the structuring of the
    page better so it's less to scroll without cutting out information
    altogether.")

    Where two blocks are short or chip-shaped, they share a row. Nothing is
    hidden or truncated — the saving comes from pairing, not from cutting.
  -->

  <!-- ===== HEADER + IDENTITY + STATS (one row, not three) ===== -->
  <div use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}>
    <PageHeader title={more.title} />

    <div class="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <!-- FX:flip-words — rotating identity line -->
      <p class="text-lg {$theme.text.muted}">
        Off the clock, I'm
        <FlipWords
          words={more.identityWords ?? []}
          class="font-semibold {$theme.accent.orange.text}"
        />
      </p>
      <!-- /FX:flip-words -->

      <StatStrip stats={more.stats ?? []} />
    </div>
  </div>

  <!-- ===== TRAVEL ===== -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <h3 class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}">{sections[0].label}</h3>
    <TravelSection
      path={more.travel?.path ?? []}
      countries={more.travel?.countries ?? []}
    />
  </section>

  <!-- ===== INTERESTS ===== -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <h3 class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}">{sections[1].label}</h3>
    <InterestGrid interests={more.interests ?? []} />
  </section>

  <!-- ===== LEADERSHIP ROLES ===== -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <h3 class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}">{sections[2].label}</h3>
    <LeadershipSection leadership={more.leadership ?? []} {clubs} show="roles" />
  </section>

  <!-- ===== CLUBS + HONORS side by side =====
       Both are chip strips, so they pair naturally instead of stacking into
       two more full-width bands. -->
  <!-- FX:scroll-reveal -->
  <div class="grid gap-4 lg:grid-cols-[1.6fr_1fr]" use:scrollReveal>
    <LeadershipSection leadership={more.leadership ?? []} {clubs} show="clubs" />

    <div>
      <h4 class="meta-label mb-2 ml-1 text-[11px] {$theme.text.dim}">Honors</h4>
      <HonorShelf honors={more.honors ?? []} />
    </div>
  </div>

  <!-- ===== LICHESS (WITH CHALLENGE) + CONNECT ===== -->
  <!-- FX:scroll-reveal -->
  <div class="grid gap-4 lg:grid-cols-2" use:scrollReveal>
    <LichessCard label={more.lichess.label} username={more.lichess.username}>
      <ChessChallenge />
    </LichessCard>
    <ConnectFooter socials={more.socials ?? []} />
  </div>
</section>
