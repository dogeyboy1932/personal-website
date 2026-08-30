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
  const accents = [
    { bar: "from-cyan-300 via-sky-400 to-blue-500", edge: "hover:border-cyan-400/60", rule: "decoration-cyan-400/60 hover:decoration-cyan-300" },
    { bar: "from-violet-300 via-fuchsia-400 to-purple-500", edge: "hover:border-fuchsia-400/60", rule: "decoration-fuchsia-400/60 hover:decoration-fuchsia-300" },
    { bar: "from-amber-300 via-orange-400 to-rose-400", edge: "hover:border-amber-400/60", rule: "decoration-amber-400/60 hover:decoration-amber-300" },
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
  <div class="flex flex-col gap-3">
    {#each leadership as role, i}
      <div
        class="group relative flex flex-col overflow-hidden rounded-2xl border {$theme.border.default} bg-slate-900/70 p-4 pl-5 shadow-lg transition-colors {accents[i % accents.length].edge}"
      >
        <!-- The card's entire colour identity: this bar, plus the hover border
             and the link underline. Nothing tints text. -->
        <span
          class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b {accents[i % accents.length].bar}"
          aria-hidden="true"
        />

        <div class="flex items-start justify-between gap-3">
          <h4 class="font-display text-lg font-bold leading-tight text-slate-50">
            {#if role.link}
              <LinkPreview
                href={role.link}
                label={role.org}
                className="underline {accents[i % accents.length].rule} decoration-1 underline-offset-4 transition-colors"
              >{role.org}</LinkPreview>
            {:else}
              {role.org}
            {/if}
          </h4>
          {#if role.link}
            <ExternalLink class="mt-1 h-4 w-4 flex-shrink-0 {$theme.text.dim}" />
          {/if}
        </div>

        <!-- Neutral. The role reads by weight against the summary beneath it,
             the same way the hero's "AI ENGINEER" does. -->
        <p class="mt-0.5 text-sm font-semibold text-slate-100">
          {role.role}{#if role.tenure}<span class="font-normal text-slate-400"> · {role.tenure}</span>{/if}
        </p>

        <p class="mt-2 text-sm leading-relaxed text-slate-300">{role.summary}</p>
      </div>
    {/each}
  </div>

  {/if}

  {#if show !== "roles"}
  <!-- ===== Everything else, as chips ===== -->
  <div class="rounded-2xl border {$theme.border.default} {$theme.bg.card} p-5">
    <div class="mb-3 flex items-center gap-2">
      <Users class="h-4 w-4 {$theme.text.muted}" />
      <h4 class="meta-label text-[11px] {$theme.text.muted}">Also around campus</h4>
    </div>
    <div class="flex flex-wrap gap-2">
      {#each rest as club, i}
        <span
          class="inline-flex items-baseline gap-1.5 rounded-full border {$theme.border.light} bg-slate-900/70 px-3 py-1.5 text-xs text-slate-200"
          in:fly={{ y: 8, delay: 200 + i * 25, duration: 280 }}
        >
          {club.name}
          {#if club.tagline}
            <!-- Was cycling through the card accents, which put a rainbow of
                 tinted text through the chip cloud — the most literal reading
                 of "the text color for the clubs stuff". Neutral now; the
                 tagline is secondary, so it recedes by tone, not by hue. -->
            <span class="text-slate-400">({club.tagline})</span>
          {/if}
        </span>
      {/each}
    </div>
  </div>
  {/if}
</div>
