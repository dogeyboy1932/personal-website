<!--
  /more section: leadership + clubs.

  Two tiers, because they are not the same claim:
  - `leadership`: orgs where a real role was held. Spotlight cards with the
    substance intact (member counts, what the fellowship covered).
  - `clubs`: everything else, as chips. Membership is a fact, not a story, and
    listing fourteen of them as cards would drown the three that matter.

  Replaces the old flat inline "Clubs" row.
  Data: more.leadership + clubs in src/constants/
-->
<script lang="ts">
  import { fly } from "svelte/transition";
  import { Users, ExternalLink } from "lucide-svelte";
  import { theme } from "../../lib/stores";
  import LinkPreview from "../LinkPreview.svelte";
  import type { LeadershipRole, Club } from "../../types";

  export let leadership: LeadershipRole[] = [];
  export let clubs: Club[] = [];
  /**
   * Which half to render. The page places the spotlight cards and the club
   * chips in different grid cells so neither has to own a full-width row.
   */
  export let show: "all" | "roles" | "clubs" = "all";

  /*
    NO COLOURED TEXT. That is the whole point of this version.

    Five previous attempts all moved the same lever — muted violet, violet-200,
    amber, then a per-card cyan/fuchsia/amber on the role line. The note was
    "I still don't like the TEXT COLOR for the clubs stuff", five times, and
    every one of those attempts answered it by picking a different colour to
    tint the text with. Contrast was never the problem (measured: 17:1 title,
    9.7:1 role, 12:1 body — all far above AA), and neither was the hue.

    Colour on body text is the problem. Every other place on this site that got
    this note resolved the same way: "AI Engineer" is white, the cursor trail is
    silver, the hero role reads by WEIGHT not hue.

    So: all text is neutral — white title, slate-100 role, slate-300 summary.
    The per-card identity moves entirely to non-text surfaces (left bar, hover
    border, link underline), which is where the "better assortment of colors"
    still reads across the three boxes without tinting a single word.
  */
  /*
    Named per club, in order. ("AI alignment should be orange. Illini Blockchian
    should be yellow. Sigma phi delta should be somewhat red but not evil red.")

    "not evil red" is why the third is rose-400 -> red-400 rather than a pure
    red-600: rose keeps a little pink in it and reads warm instead of like an
    error state.

    Text stays neutral — that was the previous note and it still holds. These
    colours live on the bar, the hover border and the link underline only.
  */
  const accents = [
    // AI Alignment @ Illinois — orange
    { bar: "from-orange-500 via-orange-400 to-orange-500", edge: "hover:border-orange-400/60", rule: "decoration-orange-400/60 hover:decoration-orange-300", icon: "text-orange-400/70" },
    /*
      Sigma Phi Delta — actual red. rose-300 -> red-400 -> rose-500 was chosen
      to avoid "evil red" and landed so warm it read as the orange card again:
      "Sigma phi is same as ai alignment. It should be red." Now red-400 through
      red-600, which is unmistakably red while staying short of a pure #f00
      alarm tone.
    */
    { bar: "from-red-800 via-red-700 to-red-800", edge: "hover:border-red-400/60", rule: "decoration-red-400/60 hover:decoration-red-300", icon: "text-red-400/70" },
    /*
      Illini Blockchain — blue. Was yellow, which sat one step from the orange
      above it on the wheel and read as a second orange. ("make illini
      blockchain blue")
    */
    { bar: "from-sky-300 via-blue-500 to-indigo-600", edge: "hover:border-blue-400/60", rule: "decoration-blue-400/60 hover:decoration-blue-300", icon: "text-blue-400/70" },
  ];

  // Orgs already spotlighted above shouldn't repeat in the chip cloud.
  $: featured = new Set(leadership.map((l) => l.org));
  $: rest = clubs.filter((c) => !featured.has(c.name));
</script>

<div class="space-y-4">
  {#if show !== "clubs"}
  <!-- ===== Spotlight roles ===== -->
  <!-- Stacked rows, not columns. ("the clubs can be stacked like rows instead
       of columns on the left") -->
  <div class="flex flex-col gap-4">
    {#each leadership as role, i}
      <!-- p-5 pl-6 and a wider gap below: "Everything looks kinda crammed right
           now...space it out wisely." -->
      <div
        class="group relative flex flex-col overflow-hidden rounded-2xl border {$theme.border.default} bg-slate-900/70 p-5 pl-6 shadow-lg transition-colors {accents[i % accents.length].edge}"
      >
        <!-- The card's entire colour identity: this bar, plus the hover border
             and the link underline. Nothing tints text. -->
        <span
          class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b {accents[i % accents.length].bar}"
          aria-hidden="true"
        />

        <!--
          ONE header row: org name, its link icon, then the role.
          ("the role should be next to the club...space it out wisely" and "put
          the link icon next to the club so it's more understandable.")

          The icon sat at the far right on a justify-between row, which put a
          gap between the name and the thing that says the name is clickable —
          it read as unrelated page furniture. It is now immediately after the
          name, so the two are obviously one control.

          flex-wrap so a long org + long role drop onto two lines instead of
          squeezing; the role keeps its own baseline either way.
        -->
        <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <!-- font-casual (Nunito) rather than font-display (Chivo). ("I want a
               better font...less robotic. More casual. Do this for all clubs
               too including leadership.") -->
          <h4 class="inline-flex items-baseline gap-1.5 font-casual text-lg font-extrabold leading-tight text-slate-50">
            {#if role.link}
              <LinkPreview
                href={role.link}
                label={role.org}
                className="underline {accents[i % accents.length].rule} decoration-1 underline-offset-4 transition-colors"
              >{role.org}</LinkPreview>
              <ExternalLink
                class="h-3.5 w-3.5 flex-shrink-0 self-center {accents[i % accents.length].icon}"
              />
            {:else}
              {role.org}
            {/if}
          </h4>

          <!-- Neutral text. The role reads by weight, and now by POSITION —
               it sits on the title's baseline rather than in its own band. -->
          <p class="font-casual text-sm font-bold text-slate-100">
            {role.role}{#if role.tenure}<span class="font-medium text-slate-400"> · {role.tenure}</span>{/if}
          </p>
        </div>

        <p class="mt-2.5 font-casual text-[0.925rem] leading-relaxed text-slate-300">
          {role.summary}
        </p>
      </div>
    {/each}
  </div>

  {/if}

  {#if show !== "roles"}
  <!-- ===== Everything else, as chips ===== -->
  <div class="rounded-2xl border {$theme.border.default} {$theme.bg.card} p-5">
    <div class="mb-3 flex items-center gap-2">
      <Users class="h-4 w-4 {$theme.text.muted}" />
      <!-- .meta-label-strong: shared with Honors and the hero's MCS line. -->
      <h4 class="meta-label-strong text-xs sm:text-[0.8rem] {$theme.text.secondary}">
        Also around campus
      </h4>
    </div>
    <div class="flex flex-wrap gap-2">
      {#each rest as club, i}
        <span
          class="inline-flex items-baseline gap-1.5 rounded-full border {$theme.border.light} bg-slate-900/70 px-3.5 py-1.5 font-casual text-sm font-semibold text-slate-200"
          in:fly={{ y: 8, delay: 200 + i * 25, duration: 280 }}
        >
          {club.name}
          {#if club.tagline}
            <!-- Was cycling through the card accents, which put a rainbow of
                 tinted text through the chip cloud — the most literal reading
                 of "the text color for the clubs stuff". Neutral now; the
                 tagline is secondary, so it recedes by tone, not by hue. -->
            <span class="text-[0.8rem] font-medium text-slate-400">({club.tagline})</span>
          {/if}
        </span>
      {/each}
    </div>
  </div>
  {/if}
</div>
