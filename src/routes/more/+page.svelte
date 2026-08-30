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
    { id: "leadership", label: "Was part of" },
  ] as const;
</script>

<section class="space-y-5 pb-4" in:fade>
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

  <!-- ===== HEADER ===== -->
  <div use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}>
    <PageHeader title={more.title} />
  </div>

  <!-- ===== LEFT: identity + stats + where I've been + countries | RIGHT: wheel
       1.4fr/1fr, up from 1.15fr: "Make more right side a bit smaller in width
       and left a little bigger. option wheel doesn't take up too much space so
       let's ration wisely."

       "Put the stats and off the clock line both to the left... Where I've been
       should be below the stats row but above countries." -->
  <!-- FX:scroll-reveal -->
  <!-- lg:divide-x draws the rule between the two halves; the padding keeps
       content off it. ("have a divider in teh top sections btwn left and right") -->
  <div
    class="grid items-start gap-6 lg:grid-cols-[1.4fr_1fr] lg:divide-x lg:divide-slate-500/25"
    use:scrollReveal
  >
    <div class="space-y-5 lg:pr-7">
      <!-- FX:flip-words — rotating identity line -->
      <!-- Full row and centred, matching the scorecard beneath it. Display
           face, and cyan rather than amber. ("Same with one liner. Use a diff
           color than orange for this text.") -->
      <p
        class="w-full text-center font-display text-2xl font-semibold {$theme.text.secondary} sm:text-3xl"
      >
        Off the clock, I'm
        <FlipWords words={more.identityWords ?? []} class="font-semibold text-brand" />
      </p>
      <!-- /FX:flip-words -->

      <StatStrip stats={more.stats ?? []} />

      <!-- Left as-is on request: "All that's untouched on the more page is the
           where I've been and the find me." Only its POSITION moved. -->
      <div>
        <h3 class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}">{sections[0].label}</h3>
        <TravelSection path={more.travel?.path ?? []} show="path" />
      </div>

      <!-- No "Countries" heading: removed on request, and the flags say what
           this is without one. 2-up so seven countries make four rows. -->
      <TravelSection countries={more.travel?.countries ?? []} show="countries" columns={2} />
    </div>

    <div class="lg:pl-7">
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

        <!-- HonorShelf is self-titled now that it is boxed. -->
        <HonorShelf honors={more.honors ?? []} />
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
