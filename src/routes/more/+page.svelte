<script lang="ts">
  import { fade } from "svelte/transition";
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
  } from "../../components/MORE";
  import { FlipWords } from "../../components/Creative";
  import { scrollReveal } from "../../lib/actions/scrollReveal";
  import { more, clubs } from "../../constants";
  import { theme } from "../../lib/stores";

  const sections = [
    { id: "travel", label: "Where I've been" },
    { id: "interests", label: "What I'm into" },
    { id: "leadership", label: "Was part of" },
  ] as const;
</script>

<section class="space-y-8 pb-4" in:fade>
  <div use:scrollReveal={{ y: 0, blur: 6, duration: 500 }}>
    <PageHeader title={more.title} />
  </div>

  <div
    class="grid items-stretch gap-6 lg:grid-cols-[1.85fr_1fr] lg:divide-x lg:divide-slate-500/25"
    use:scrollReveal
  >
    <div class="flex h-full min-w-0 flex-col space-y-3 text-center lg:pr-7">
      <p
        class="w-full text-center font-display text-2xl font-semibold {$theme.text.secondary} sm:text-3xl"
      >
        Off the clock, I'm
        <FlipWords words={more.identityWords ?? []} class="font-semibold text-lede" />
      </p>

      <div
        class="mx-auto h-px w-4/5 bg-gradient-to-r from-transparent via-slate-400/35 to-transparent"
        aria-hidden="true"
      />

      <StatStrip stats={more.stats ?? []} />

      <div
        class="mx-auto h-px w-4/5 bg-gradient-to-r from-transparent via-slate-400/35 to-transparent"
        aria-hidden="true"
      />

            <!-- CAVEAT: !mt-0 is load-bearing. -->
      <div class="!mt-0 flex flex-1 flex-col justify-center gap-3">
        <div>
          <h3 class="meta-label mb-4 text-sm {$theme.text.muted}">{sections[0].label}</h3>
          <TravelSection path={more.travel?.path ?? []} show="path" />
        </div>

          <TravelSection countries={more.travel?.countries ?? []} show="countries" columns={3} />
      </div>
    </div>

        <!-- min-w-0 is required, not cosmetic. -->
    <div class="min-w-0 lg:pl-7">
      <h3 class="meta-label mb-3 ml-1 text-sm {$theme.text.muted}">{sections[1].label}</h3>
      <InterestGrid interests={more.interests ?? []} />
    </div>

  </div>

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

  <div class="grid gap-4 lg:grid-cols-2" use:scrollReveal>
    <LichessCard label={more.lichess.label} username={more.lichess.username}>
      <ChessChallenge />
    </LichessCard>
    <ConnectFooter socials={more.socials ?? []} />
  </div>

  <div>
  </div>
</section>
