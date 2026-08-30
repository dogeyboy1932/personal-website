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
    LeadershipRoles,
    CampusClubs,
    HonorShelf,
    ConnectFooter,
    ChessChallenge,

    // FunFactItem
  } from "../../components/MORE";
  import { FlipWords } from "../../components/Creative";

  // Constants and theme
  import { more, clubs } from "../../constants";
  import { theme } from "../../lib/stores";
  // FX:scroll-reveal
  import { scrollReveal } from "../../lib/actions/scrollReveal";

  /* Section labels. "What I won" was dropped — HonorShelf already labels
     itself, so the heading duplicated it. */
  const sections = [
    { id: "travel", label: "Where I've been" },
    { id: "interests", label: "What I'm into" },
    { id: "leadership", label: "Was part of" },
  ] as const;
</script>

<section class="space-y-8 pb-4" in:fade>

  <!-- ===== HEADER ===== -->
  <div use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}>
    <PageHeader title={more.title} />
  </div>

  <!-- Left: identity + stats + path + countries | Right: interests wheel -->
  <!-- FX:scroll-reveal -->
  <div
    class="grid items-stretch gap-6 lg:grid-cols-[1.85fr_1fr] lg:divide-x lg:divide-slate-500/25"
    use:scrollReveal
  >
    <!-- h-full + flex-col so the column fills the grid row; the slack is what
         the block below the second divider is centred in. -->
    <div class="flex h-full min-w-0 flex-col space-y-3 text-center lg:pr-7">
      <!-- FX:flip-words — rotating identity line -->
      <p
        class="w-full text-center font-display text-2xl font-semibold {$theme.text.secondary} sm:text-3xl"
      >
        Off the clock, I'm
        <FlipWords words={more.identityWords ?? []} class="font-semibold text-lede" />
      </p>
      <!-- /Creative:flip-words -->

      <div
        class="mx-auto h-px w-4/5 bg-gradient-to-r from-transparent via-slate-400/35 to-transparent"
        aria-hidden="true"
      />

      <StatStrip stats={more.stats ?? []} />
      

      <div
        class="mx-auto h-px w-4/5 bg-gradient-to-r from-transparent via-slate-400/35 to-transparent"
        aria-hidden="true"
      />

      <!-- CAVEAT: !mt-0 is load-bearing. The parent space-y-3 puts a 12px top
           margin OUTSIDE the box being centred, and space-y-3 compiles to a
           three-class selector that a plain mt-0 loses to. -->
      <div class="!mt-0 flex flex-1 flex-col justify-center gap-3">
        <!-- Left as-is on request: "All that's untouched on the more page is the
             where I've been and the find me." Only its POSITION moved. -->
        <div>
          <h3 class="meta-label mb-4 text-sm {$theme.text.muted}">{sections[0].label}</h3>
          <TravelSection path={more.travel?.path ?? []} show="path" />
        </div>

          <TravelSection countries={more.travel?.countries ?? []} show="countries" columns={3} />
      </div>
    </div>

    <!--
      min-w-0 is required, not cosmetic. A grid track declared `1fr` is
      minmax(AUTO, 1fr), so its floor is the cell's min-content width — and this
      cell contains the option wheel, whose track and counter pocket are fixed
      px (324 + 8 + 96 = 428). At 1024 with the 125% page zoom the column is
      300px, so the cell refused to shrink and pushed exactly 128px of
      horizontal scroll onto the page.

      .fx-option-wheel already has overflow:hidden, but that only zeroes the
      automatic minimum size of a FLEX or GRID item, and it is a plain block
      child of this cell — so the constraint travelled straight through it.
      min-w-0 here is what actually lets the column shrink and the wheel clip.
      Same failure mode as the hero photo's minmax(0,1fr).
    -->
    <div class="min-w-0 lg:pl-7">
      <h3 class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}">{sections[1].label}</h3>
      <InterestGrid interests={more.interests ?? []} />
    </div>


    
  </div>

  <!-- Was part of: roles left, club chips + honors right -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <h3 class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}">{sections[2].label}</h3>

    <div class="grid items-stretch gap-5 lg:grid-cols-[1.5fr_1fr]">
      <LeadershipRoles leadership={more.leadership ?? []} />

      <div class="flex h-full flex-col gap-4">
        <!-- exclude: names already spotlighted above must not repeat here. -->
        <CampusClubs {clubs} exclude={(more.leadership ?? []).map((l) => l.org)} />

        <HonorShelf honors={more.honors ?? []} class="flex-1" />
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



  <div>
    <!-- <FunFactItem fact="Hi" index={0} /> -->
  </div>
</section>
