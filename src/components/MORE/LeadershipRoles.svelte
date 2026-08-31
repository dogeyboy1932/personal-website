<script lang="ts">
  import { ExternalLink } from "lucide-svelte";
  import { theme, leadershipAccents } from "../../constants/_theme";
  import LinkPreview from "../../lib/LinkPreview.svelte";
  import type { LeadershipRole } from "../../types";

  export let leadership: LeadershipRole[] = [];

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

<div class="flex h-full flex-1 flex-col gap-4">
  {#each leadership as role, i}
    <div
      class="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border {$theme.border.default} {$theme.bg.cardMuted} p-5 pl-6 shadow-lg transition-colors {leadershipAccents[i % leadershipAccents.length].edge}"
    >
      <span
        class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b {leadershipAccents[i % leadershipAccents.length].bar}"
        aria-hidden="true"
      />

      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h4
          class="inline-flex items-baseline gap-1.5 font-casual text-lg font-extrabold leading-tight {$theme.text.strong}"
        >
          {#if role.link}
            <LinkPreview
              href={role.link}
              label={role.org}
              className="underline {leadershipAccents[i % leadershipAccents.length].rule} decoration-1 underline-offset-4 transition-colors"
            >{role.org}</LinkPreview>
            <ExternalLink
              class="h-3.5 w-3.5 flex-shrink-0 self-center {leadershipAccents[i % leadershipAccents.length].icon}"
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
