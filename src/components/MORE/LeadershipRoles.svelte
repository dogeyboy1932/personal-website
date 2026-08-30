<!-- /more: orgs where a real role was held, as spotlight cards. -->
<script lang="ts">
  import { ExternalLink } from "lucide-svelte";
  import { theme } from "../../lib/stores";
  import LinkPreview from "../../lib/LinkPreview.svelte";
  import type { LeadershipRole } from "../../types";

  export let leadership: LeadershipRole[] = [];

    /* Per-org accent, by POSITION not by name. */
  const accents = [
    { bar: "from-orange-500 via-orange-400 to-orange-500", edge: "hover:border-orange-400/60", rule: "decoration-orange-400/60 hover:decoration-orange-300", icon: "text-orange-400/70" },
    { bar: "from-red-800 via-red-700 to-red-800", edge: "hover:border-red-400/60", rule: "decoration-red-400/60 hover:decoration-red-300", icon: "text-red-400/70" },
    { bar: "from-sky-300 via-blue-500 to-indigo-600", edge: "hover:border-blue-400/60", rule: "decoration-blue-400/60 hover:decoration-blue-300", icon: "text-blue-400/70" },
  ];

    /* `role` and `tenure` render as one list of equal items; the separator carries the meaning. */
  const TRANSITION = /^(now|currently|former|formerly|previously|later)\b/i;

  function roleParts(role: string, tenure?: string) {
    const parts = role
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .map((text, i) => ({ text, sep: i === 0 ? "" : "|" }));

    const t = tenure?.trim();
    if (t) parts.push({ text: t, sep: TRANSITION.test(t) ? "→" : "|" });
    return parts;
  }
</script>

<!-- h-full + flex-1 on each card: the stack fills the grid row and the cards
     divide it evenly, so the last one ends level with the column opposite. -->
<div class="flex h-full flex-1 flex-col gap-4">
  {#each leadership as role, i}
    <div
      class="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border {$theme.border.default} {$theme.bg.cardMuted} p-5 pl-6 shadow-lg transition-colors {accents[i % accents.length].edge}"
    >
      <span
        class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b {accents[i % accents.length].bar}"
        aria-hidden="true"
      />

      <!-- One header row: org, its link icon, then the role on the same
           baseline. flex-wrap so a long pair drops to two lines. -->
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4
          class="inline-flex items-baseline gap-1.5 font-casual text-lg font-extrabold leading-tight {$theme.text.strong}"
        >
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

        <p
          class="flex flex-wrap items-baseline gap-x-1.5 font-casual text-sm font-bold {$theme.text.secondary}"
        >
          {#each roleParts(role.role, role.tenure) as part}
            {#if part.sep}
              <span aria-hidden="true" class="font-normal {$theme.text.dim}">{part.sep}</span>
            {/if}
            <span>{part.text}</span>
          {/each}
        </p>
      </div>

      <p class="mt-2.5 font-casual text-[0.925rem] leading-relaxed {$theme.text.muted}">
        {role.summary}
      </p>
    </div>
  {/each}
</div>
