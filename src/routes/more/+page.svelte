<script lang="ts">
  import { fade, fly, scale } from "svelte/transition";
  import { onMount } from "svelte";
  import { Sparkles, Heart, Gamepad2, Trophy } from "lucide-svelte";
  
  import PageHeader from "../../components/Headers/PageHeader.svelte";
  import { more } from "../../constants";

  let lichessRating: number | null = null;
  let lichessPerf: string | null = null;
  let lichessError: string | null = null;

  async function fetchLichess() {
    const username = more.lichess.username;
    if (!username) return;
    try {
      const res = await fetch(`https://lichess.org/api/user/${username}`);
      if (!res.ok) throw new Error(`Lichess user not found (${res.status})`);
      const data = await res.json();
      // prefer blitz, then rapid, then classical
      const perfs = data.perfs || {};
      const prefOrder = ["blitz", "rapid", "classical", "bullet"];
      for (const p of prefOrder) {
        if (perfs[p] && perfs[p].rating) {
          lichessRating = perfs[p].rating;
          lichessPerf = p;
          break;
        }
      }
    } catch (err: any) {
      lichessError = err?.message ?? String(err);
    }
  }

  onMount(() => {
    fetchLichess();
  });
</script>



<section class="space-y-8" in:fade>
  <PageHeader title={more.title} />

  <!-- Hero Bio Card -->
  <div 
    class="p-5 group relative overflow-hidden rounded-2xl border border-slate-500/20 bg-slate-900/70"
    in:fly={{ y: 20, duration: 400 }}
  >
    <div class="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-slate-500/10 blur-3xl transition group-hover:translate-x-3" />
    <div class="relative">
      <div class="flex items-center gap-2 mb-4">
        <Sparkles class="w-5 h-5 text-slate-400" />
        <p class="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">{more.subtitle}</p>
      </div>
      
      <div class="text-lg leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
        {more.bio}
      </div>
      
    </div>
  </div>

  <!-- Two Column Layout -->
  <div class="grid gap-6 lg:grid-cols-2">
    
    <!-- Fun Facts Card -->
    <div 
      class="p-3 rounded-2xl border border-slate-500/20 bg-slate-900/70"
      in:fly={{ y: 20, delay: 100, duration: 400 }}
    >
      <div class="flex items-center gap-2 mb-4">
        <Heart class="w-5 h-5 text-pink-400" />
        <h3 class="text-lg font-semibold text-slate-100">Fun Facts</h3>
      </div>
      <ul class="space-y-3">
        {#each more.funFacts as fact, i}
          <li 
            class="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
            in:fly={{ x: -10, delay: 200 + i * 80, duration: 300 }}
          >
            <span class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-500/10 text-xs font-semibold text-slate-400">
              {i + 1}
            </span>
            <span class="pt-0.5">{fact}</span>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Hobbies Card -->
    <div 
      class="p-3 rounded-2xl border border-slate-500/20 bg-slate-900/70"
      in:fly={{ y: 20, delay: 150, duration: 400 }}
    >
      <div class="flex items-center gap-2 mb-4">
        <Gamepad2 class="w-5 h-5 text-cyan-400" />
        <h3 class="text-lg font-semibold text-slate-100">Hobbies</h3>
      </div>
      <ul class="space-y-3">
        {#each more.hobbies as hobby, i}
          <li 
            class="group relative overflow-hidden rounded-xl border border-slate-400/20 bg-slate-50/70 p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-800/60"
            in:fly={{ y: 12, delay: 250 + i * 100, duration: 350 }}
          >
            <div class="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-slate-400/5 blur-2xl transition group-hover:scale-110" />
            <div class="relative">
              <div class="font-semibold text-slate-100">{hobby.name}</div>
              <div class="mt-1 text-xs text-slate-600 dark:text-slate-400">{hobby.note}</div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <!-- Lichess Rating Card -->
  <div 
    class="group relative overflow-hidden rounded-2xl border border-slate-500/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 shadow-lg"
    in:fly={{ y: 20, delay: 250, duration: 400 }}
  >
    <div class="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-slate-500/20 blur-3xl" />
    <div class="relative">
      <h3 class="text-lg font-semibold text-white mb-3">{more.lichess.label}</h3>
      {#if lichessRating}
        <div class="flex items-baseline gap-2" in:scale={{ delay: 400, duration: 300 }}>
          <div class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-cyan-200 to-slate-200">
            {lichessRating}
          </div>
          <span class="text-sm font-medium uppercase tracking-wider text-slate-400">({lichessPerf})</span>
        </div>
        <a 
          href={`https://lichess.org/@/${more.lichess.username}`}
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.35em] text-slate-300 hover:text-slate-100 transition"
        >
          View Profile →
        </a>
      {:else if lichessError}
        <div class="text-sm text-rose-400">{lichessError}</div>
      {:else}
        <div class="text-sm text-slate-400">Loading rating...</div>
      {/if}
    </div>
  </div>
</section>
