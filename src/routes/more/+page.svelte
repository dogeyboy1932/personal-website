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
      <!-- Both scaled up on request: "The \"off the clock\" line is too small
           and the stats row can be a bit bigger." -->
      <p class="text-xl sm:text-2xl {$theme.text.muted}">
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

  <!-- ===== WHERE I'VE BEEN (path only) =====
       Left as-is on request: "All that's untouched on the more page is the
       where I've been and the find me. Leave those as is for now". -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <h3 class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}">{sections[0].label}</h3>
    <TravelSection path={more.travel?.path ?? []} show="path" />
  </section>

  <!-- ===== COUNTRIES (left) + INTERESTS WHEEL (right) =====
       "Make the option wheel verticle and keep it to the right side. The
       countries should take up the left side." -->
  <!-- FX:scroll-reveal -->
  <div class="grid items-start gap-5 lg:grid-cols-[1.15fr_1fr]" use:scrollReveal>
    <div>
      <h3 class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}">Countries</h3>
      <TravelSection countries={more.travel?.countries ?? []} show="countries" columns={3} />
    </div>

    <div>
      <h3 class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}">{sections[1].label}</h3>
      <InterestGrid interests={more.interests ?? []} />
    </div>
  </div>

  <!-- ===== WHAT I RAN =====
       Roles stack as rows down the left; the club chips and honors stack in
       the right column. ("the clubs can be stacked like rows instead of
       columns on the left... On the right you can stack my other clubs and
       honors below it.") -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <h3 class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}">{sections[2].label}</h3>

    <div class="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
      <LeadershipSection leadership={more.leadership ?? []} {clubs} show="roles" />

      <div class="flex flex-col gap-4">
        <LeadershipSection leadership={more.leadership ?? []} {clubs} show="clubs" />

        <div>
          <h4 class="meta-label mb-2 ml-1 text-[11px] {$theme.text.dim}">Honors</h4>
          <HonorShelf honors={more.honors ?? []} />
        </div>
      </div>
    </div>
  </section>

  <!-- ===== LICHESS (WITH CHALLENGE) + CONNECT ===== -->
  <!-- FX:scroll-reveal -->
  <div class="grid gap-4 lg:grid-cols-2" use:scrollReveal>
    <LichessCard label={more.lichess.label} username={more.lichess.username}>
      <ChessChallenge />
    </LichessCard>
    <ConnectFooter socials={more.socials ?? []} />
  </div>
</section>
