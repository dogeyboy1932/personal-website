<script lang="ts">
  import { fade } from "svelte/transition";
  import { theme } from "../../constants/_theme";
  
  import { FlipWords, ShareButton } from "../../components/Creative";
  import { PageHeader, SmallSectionHeader } from "../../components/Headers";
  import { 
    LichessCard, StatStrip, TravelSection, InterestGrid, 
    LeadershipRoles, CampusClubs, HonorShelf, ChessChallenge 
  } from "../../components/MORE";
  
  import { scrollReveal } from "../../lib/actions/scrollReveal";
  
  import { more } from "../../constants";

</script>

<section class="space-y-8 pb-4" in:fade>
  <!-- <div use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}>
    <PageHeader title={more.title} />
  </div> -->

  <div
    class="grid items-stretch gap-6 lg:grid-cols-[1.85fr_1fr] lg:divide-x lg:divide-[rgb(var(--rule)/0.25)]"
    use:scrollReveal
  >
    <div class="flex h-full min-w-0 flex-col gap-3 text-center lg:pr-7">
      <!-- Section one: who I am off the clock, and the numbers behind it. -->
      <div class="flex flex-col gap-3">
        <p
          class="w-full text-center font-display text-2xl font-semibold {$theme.text.secondary} sm:text-3xl"
        >
          Off the clock, I'm
          <FlipWords words={more.identityWords ?? []} class="font-semibold text-lede" />
        </p>

        <div class="rule-soft" aria-hidden="true" />

        <StatStrip stats={more.stats ?? []} />
      </div>

      <div class="rule-soft mb-5" aria-hidden="true" />

      <!-- Section two: travel. Each header hangs left (SmallSectionHeader forces
           text-left); the rows under them stay centred by the column's text-center. -->
      <div class="flex flex-1 flex-col justify-center gap-3">
        <div>
          <SmallSectionHeader line="Where I've been" />
          <TravelSection path={more.travel?.path ?? []} show="path" />
        </div>

        <TravelSection countries={more.travel?.countries ?? []} show="countries" columns={3} />
        
      </div>
    </div>

        <!-- min-w-0 is required, not cosmetic. -->
    <div class="min-w-0 lg:pl-7">
      <SmallSectionHeader line={"What I'm into"} />
      <InterestGrid interests={more.interests ?? []} />
    </div>

  </div>

  <section use:scrollReveal>
    <SmallSectionHeader line={"Was part of"} />

    <div class="grid items-stretch gap-5 lg:grid-cols-[1.5fr_1fr]">
      <LeadershipRoles leadership={more.leadership ?? []} />

      <div class="flex h-full flex-col gap-4">
        <!-- exclude: names already spotlighted above must not repeat here. -->
        <CampusClubs clubs={more.clubs ?? []} exclude={(more.leadership ?? []).map((l) => l.org)} />

        <HonorShelf honors={more.honors ?? []} class="flex-1" />
      </div>
    </div>
  </section>

  <div class="grid gap-4 lg:grid-cols-2" use:scrollReveal>
    <LichessCard label={more.lichess.label} username={more.lichess.username}>
      <ChessChallenge />
    </LichessCard>
    


    <div
      class="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border {$theme.border.default} {$theme.bg.card} p-6 text-center"
    >
      <p class="text-[11px] uppercase tracking-[0.3em] {$theme.text.muted}">
        That's the whole picture...more coming soon!
      </p>
      <ShareButton actions={more.socials ?? []} label="Reach out" glow />
    </div>
  </div>

</section>
