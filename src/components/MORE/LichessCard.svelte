<script lang="ts">
  import { fly, scale } from "svelte/transition";
  import { onMount } from "svelte";
  import { theme } from "../../lib/stores";

  export let label: string;
  export let username: string;

  let rating: number | null = null;
  let perfType: string | null = null;
  let error: string | null = null;

  /**
   * Fetches Lichess rating data from the API
   * Prioritizes: blitz > rapid > classical > bullet
   */
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
  class="group relative overflow-hidden rounded-2xl border {$theme.accent.emerald.border} {$theme.gradient.emerald} p-6 shadow-xl {$theme.accent.emerald.hover.border} transition-colors"
  in:fly={{ y: 20, delay: 250, duration: 400 }}
>
  <!-- Glow effect -->
  <div class="absolute -left-10 -bottom-10 h-40 w-40 rounded-full {$theme.accent.emerald.glow} blur-3xl {$theme.accent.emerald.hover.bg} transition" />
  
  <div class="relative">
    <h3 class="text-lg font-semibold {$theme.accent.emerald.text} ">{label}</h3>
    <h4 class="text-md font-semibold {$theme.accent.cyan.text} mb-3">  @{username}</h4>
    
    {#if rating}
      <div class="flex items-baseline gap-2" in:scale={{ delay: 400, duration: 300 }}>
        <div class="text-5xl font-extrabold text-transparent bg-clip-text {$theme.lichess.rating}">
          {rating}
        </div>
        <span class="text-sm font-medium uppercase tracking-wider {$theme.lichess.perfType}">({perfType})</span>
      </div>
      <a 
        href={`https://lichess.org/@/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        class="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.35em] {$theme.lichess.link} transition"
      >
        View Profile →
      </a>
    {:else if error}
      <div class="text-sm {$theme.lichess.error}">{error}</div>
    {:else}
      <div class="text-sm {$theme.lichess.loading}">Loading rating...</div>
    {/if}
  </div>
</div>
