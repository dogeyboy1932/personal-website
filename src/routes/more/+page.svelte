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

<section class="space-y-8 pb-4" in:fade>
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
       1.85fr/1fr, up from 1.4fr and 1.15fr before that: "Make more right side a
       bit smaller in width and left a little bigger", then "Make left section
       bigger and right smaller. move the divider right." lg:divide-x draws the
       rule at the column boundary, so widening the left column IS moving the
       divider right — they are the same number.

       "Put the stats and off the clock line both to the left... Where I've been
       should be below the stats row but above countries." -->
  <!-- FX:scroll-reveal -->
  <!-- lg:divide-x draws the rule between the two halves; the padding keeps
       content off it. ("have a divider in teh top sections btwn left and right") -->
  <div
    class="grid items-stretch gap-6 lg:grid-cols-[1.85fr_1fr] lg:divide-x lg:divide-slate-500/25"
    use:scrollReveal
  >
    <!--
      CENTRED and spaced out. ("The left side should be centered. I can see that
      it's right now aligned to the left. Also have some space between the
      different sections. Everything looks like a blob")

      text-center centres the headings and the stepper; space-y-9 (was 5) is
      what stops the four blocks reading as one mass. The blob was as much about
      the missing gaps as the alignment — at space-y-5 the stat row, the
      stepper and the country grid had less air between them than the country
      cells had between each other.
    -->
    <!--
      h-full + flex-col so this column fills the grid row rather than stopping
      at its own content height. The row is 556px, set by the wheel opposite;
      this column's content is 482px, and that 74px of slack is what the block
      below the second divider is centred in.
      ("bring what's below the divider a bit further down...put it in the middle
      btwn the divider and the bottom of the left section")
    -->
    <div class="flex h-full min-w-0 flex-col space-y-3 text-center lg:pr-7">
      <!-- FX:flip-words — rotating identity line -->
      <!-- Full row and centred, matching the scorecard beneath it. Display
           face. Colour is text-lede, the same token the scorecard figures use,
           so the two always move together. Yellow now. ("Also a better color
           than blue for the one liner and stats. Make it yellow for now.") -->
      <p
        class="w-full text-center font-display text-2xl font-semibold {$theme.text.secondary} sm:text-3xl"
      >
        Off the clock, I'm
        <FlipWords words={more.identityWords ?? []} class="font-semibold text-lede" />
      </p>
      <!-- /FX:flip-words -->

      <!-- Gives the one-liner its own footing rather than letting it float
           above the scorecard. ("have a divider below the one-line on
           more...just to give it its own platform") Fades at both ends so it
           reads as a rule under the line rather than as a box edge — the
           scorecard below already has hard vertical rules and a second hard
           horizontal one would box the two together. -->
      <div
        class="mx-auto h-px w-4/5 bg-gradient-to-r from-transparent via-slate-400/35 to-transparent"
        aria-hidden="true"
      />

      <StatStrip stats={more.stats ?? []} />
      

      <div
        class="mx-auto h-px w-4/5 bg-gradient-to-r from-transparent via-slate-400/35 to-transparent"
        aria-hidden="true"
      />

      <!--
        Everything below the second divider, centred in the leftover height.
        flex-1 takes the slack; justify-center splits it evenly above and below,
        which is what puts this block in the middle between the divider and the
        bottom of the column rather than sitting straight under the divider.

        gap-3 matches the column's own space-y-3, so the two blocks inside keep
        the spacing they had.

        !mt-0 is load-bearing. The parent's space-y-3 puts a 12px top margin on
        this element, and that margin sits OUTSIDE the flex-1 box being centred
        — so the gap above measured 49px against 37px below. The important flag
        is needed because space-y-3 compiles to
        `.space-y-3 > :not([hidden]) ~ :not([hidden])`, three classes' worth of
        specificity, which a plain mt-0 loses to.
      -->
      <div class="!mt-0 flex flex-1 flex-col justify-center gap-3">
        <!-- Left as-is on request: "All that's untouched on the more page is the
             where I've been and the find me." Only its POSITION moved. -->
        <div>
          <h3 class="meta-label mb-4 text-sm {$theme.text.muted}">{sections[0].label}</h3>
          <TravelSection path={more.travel?.path ?? []} show="path" />
        </div>

        <!-- No "Countries" heading: removed on request, and the flags say what
             this is without one. 3-up now the left column is 1.85fr — at 2-up
             the cells were wide enough that each flag/name pair floated in the
             middle of a lot of nothing. Seven countries make three rows. -->
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

  <!-- ===== WHAT I RAN =====
       Roles stack as rows down the left; the club chips and honors stack in
       the right column. ("the clubs can be stacked like rows instead of
       columns on the left... On the right you can stack my other clubs and
       honors below it.") -->
  <!-- FX:scroll-reveal -->
  <section use:scrollReveal>
    <h3 class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}">{sections[2].label}</h3>

    <!-- 1.75fr/1fr, up from 1.35fr. ("Under was part of, you can once again
         make the left side wider and right side less wider. Ration wisely.")
         The role cards carry paragraphs; the chips and honors are short. -->
    <!-- items-stretch (grid default, stated for clarity) + h-full inside both
         children: the two columns end at the same baseline whichever is taller.
         ("Flex the was part of leadership section height so it's same as the
         right side. Same bottom.") -->
    <div class="grid items-stretch gap-5 lg:grid-cols-[1.5fr_1fr]">
      <LeadershipSection leadership={more.leadership ?? []} {clubs} show="roles" />

      <div class="flex h-full flex-col gap-4">
        <LeadershipSection leadership={more.leadership ?? []} {clubs} show="clubs" />

        <!-- flex-1 so honors absorbs the slack on this side, matching the
             leadership stack opposite. -->
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
</section>
