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
        class="group relative flex flex-col overflow-hidden rounded-2xl border {$theme.border.default} bg-slate-900/70 p-4 pl-5 shadow-lg transition-colors hover:border-violet-400/50"
      >
        <!--
          COLOUR REWORK. Previous versions put text directly on a violet
          gradient and I kept adjusting the text instead of the surface: muted
          violet, then violet-200, then amber. The surface was the problem —
          any mid-tone text on a mid-tone purple wash is low contrast, and the
          amber that finally read clashed with the violet it sat on.

          Now: a near-neutral slate surface carries all the text, and the violet
          identity moves to a left accent bar and the border. Everything on the
          card is high contrast against slate, and the palette is one hue plus
          neutrals rather than two competing hues.
        -->
        <span
          class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet-400 via-fuchsia-400 to-violet-500"
          aria-hidden="true"
        />

        <div class="flex items-start justify-between gap-3">
          <h4 class="font-display text-lg font-bold leading-tight text-slate-50">
            {#if role.link}
              <LinkPreview
                href={role.link}
                label={role.org}
                className="underline decoration-violet-400/50 decoration-1 underline-offset-4 hover:decoration-violet-300 transition-colors"
              >{role.org}</LinkPreview>
            {:else}
              {role.org}
            {/if}
          </h4>
          {#if role.link}
            <ExternalLink class="mt-1 h-4 w-4 flex-shrink-0 {$theme.text.dim}" />
          {/if}
        </div>

        <!-- violet-300 reads cleanly HERE because the surface is slate, not
             violet. The same colour failed on the old purple card — the fix was
             the background, not the text. -->
        <p class="mt-0.5 text-sm font-semibold text-violet-300">
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
            <span class="text-violet-300/80">({club.tagline})</span>
          {/if}
        </span>
      {/each}
    </div>
  </div>
  {/if}
</div>
