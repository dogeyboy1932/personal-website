<script lang="ts">
  import { fly, scale } from "svelte/transition";
  import { onMount } from "svelte";

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
      const preferredOrder = ["blitz", "rapid", "classical", "bullet"];
      
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
  class="group relative overflow-hidden rounded-2xl border border-slate-500/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-lg"
  in:fly={{ y: 20, delay: 250, duration: 400 }}
>
  <!-- Glow effect -->
  <div class="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-slate-500/20 blur-3xl" />
  
  <div class="relative">
    <h3 class="text-lg font-semibold text-white mb-3">{label}</h3>
    
    {#if rating}
      <div class="flex items-baseline gap-2" in:scale={{ delay: 400, duration: 300 }}>
        <div class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-cyan-200 to-slate-200">
          {rating}
        </div>
        <span class="text-sm font-medium uppercase tracking-wider text-slate-400">({perfType})</span>
      </div>
      <a 
        href={`https://lichess.org/@/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        class="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.35em] text-slate-300 hover:text-slate-100 transition"
      >
        View Profile →
      </a>
    {:else if error}
      <div class="text-sm text-rose-400">{error}</div>
    {:else}
      <div class="text-sm text-slate-400">Loading rating...</div>
    {/if}
  </div>
</div>
