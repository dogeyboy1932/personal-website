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
  <div class="grid gap-3 lg:grid-cols-3">
    {#each leadership as role, i}
      <div
        class="group relative flex flex-col rounded-2xl border {$theme.accent.violet.border} {$theme.gradient.violet} p-5 shadow-lg transition-colors {$theme.accent.violet.hover.border}"
        in:fly={{ y: 16, delay: i * 90, duration: 380 }}
      >
        <div class="flex items-start justify-between gap-3">
          <h4 class="font-display text-lg font-bold leading-tight {$theme.text.primary}">
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

        <p class="mt-1 text-sm font-semibold {$theme.accent.violet.text}">
          {role.role}{#if role.tenure}<span class="{$theme.text.dim} font-normal"> · {role.tenure}</span>{/if}
        </p>

        <p class="mt-3 text-sm leading-relaxed {$theme.text.secondary}">{role.summary}</p>
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
          class="inline-flex items-baseline gap-1.5 rounded-full border {$theme.border.light} {$theme.bg.secondary} px-3 py-1.5 text-xs {$theme.text.secondary}"
          in:fly={{ y: 8, delay: 200 + i * 25, duration: 280 }}
        >
          {club.name}
          {#if club.tagline}
            <span class="{$theme.accent.violet.textMuted}">({club.tagline})</span>
          {/if}
        </span>
      {/each}
    </div>
  </div>
  {/if}
</div>
