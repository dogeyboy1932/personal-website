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
  class="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-800 p-6 shadow-xl hover:border-emerald-500/50 transition-colors"
  in:fly={{ y: 20, delay: 250, duration: 400 }}
>
  <!-- Glow effect -->
  <div class="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl group-hover:bg-emerald-400/30 transition" />
  
  <div class="relative">
    <h3 class="text-lg font-semibold text-emerald-100 mb-3">{label}</h3>
    
    {#if rating}
      <div class="flex items-baseline gap-2" in:scale={{ delay: 400, duration: 300 }}>
        <div class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-200 to-emerald-200">
          {rating}
        </div>
        <span class="text-sm font-medium uppercase tracking-wider text-emerald-300/70">({perfType})</span>
      </div>
      <a 
        href={`https://lichess.org/@/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        class="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300 hover:text-emerald-100 transition"
      >
        View Profile →
      </a>
    {:else if error}
      <div class="text-sm text-rose-300">{error}</div>
    {:else}
      <div class="text-sm text-emerald-300/70">Loading rating...</div>
    {/if}
  </div>
</div>
