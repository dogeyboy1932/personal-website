<script lang="ts">
  import { fly, scale } from "svelte/transition";
  import { onMount } from "svelte";
  import { theme } from "../../lib/stores";
  import LinkPreview from "../../lib/LinkPreview.svelte";

  export let label: string;
  export let username: string;

  let rating: number | null = null;
  let perfType: string | null = null;
  let error: string | null = null;

    /** Fetches Lichess rating data from the API Prioritizes: blitz > rapid > classical > bullet */
  async function fetchLichess() {
    if (!username) return;
    
    try {
      const res = await fetch(`https://lichess.org/api/user/${username}`);
      if (!res.ok) throw new Error(`Lichess user not found (${res.status})`);
      
      const data = await res.json();
      const perfs = data.perfs || {};
      const preferredOrder = ["rapid", "blitz", "classical", "bullet"];
      
      for (const perf of preferredOrder) {
        if (perfs[perf]?.rating) {
          rating = perfs[perf].rating;
          perfType = perf;
          break;
        }
      }
    } catch (err: any) {
      error = err?.message ?? String(err);
    }
  }

  onMount(() => {
    fetchLichess();
  });
</script>



<div 
  class="group relative overflow-hidden rounded-2xl border {$theme.accent.yellow.border} {$theme.gradient.yellow} p-5 shadow-xl {$theme.accent.yellow.hover.border} transition-colors"
  in:fly={{ y: 20, delay: 250, duration: 400 }}
>
  <!-- Glow effect -->
  <div class="absolute -left-10 -bottom-10 h-40 w-40 rounded-full {$theme.accent.yellow.glow} blur-3xl {$theme.accent.yellow.hover.bg} transition" />
  
    <!-- Two columns: rating on the left, challenge form on the right. -->
  <div class="relative grid gap-4 sm:grid-cols-[auto_1fr] sm:items-stretch">
    <div class="min-w-0">
      <h3 class="text-base font-semibold {$theme.accent.yellow.text}">{label}</h3>
      <h4 class="text-sm font-semibold {$theme.accent.cyan.text} mb-2">@{username}</h4>

      {#if rating}
        <div class="flex items-baseline gap-2" in:scale={{ delay: 400, duration: 300 }}>
          <div class="text-4xl font-extrabold text-transparent bg-clip-text {$theme.lichess.rating}">
            {rating}
          </div>
          <span class="text-sm font-medium uppercase tracking-wider {$theme.lichess.perfType}">({perfType})</span>
        </div>
        <LinkPreview
          href={`https://lichess.org/@/${username}`}
          label={`@${username} on Lichess`}
          className="mt-3 inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.3em] {$theme.lichess.link} transition"
        >
          View Profile →
        </LinkPreview>
      {:else if error}
        <div class="text-sm {$theme.lichess.error}">{error}</div>
      {:else}
        <div class="text-sm {$theme.lichess.loading}">Loading rating...</div>
      {/if}
    </div>

    {#if $$slots.default}
      <!-- Full-bleed to the card's right and vertical edges via negative
           margins that cancel its p-5. -->
      <div
        class="-my-5 -mr-5 border-l-2 border-brand/50 {$theme.bg.panel} px-5 py-3 sm:pl-5"
      >
        <slot />
      </div>
    {/if}
  </div>
</div>
