<script lang="ts">
  import SectionHeader from "../../components/Headers/SectionHeader.svelte";
  import { more } from "../../constants/more";
  import { fade, fly } from "svelte/transition";
  import { onMount } from "svelte";

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

<section class="space-y-6" in:fade>
  <SectionHeader id="more" title={more.title} />

  <div class="rounded-2xl border border-emerald-500/20 bg-white/80 p-6 shadow-lg dark:bg-slate-900/70" in:fly={{ y: 8 }}>
    <p class="text-sm text-slate-700 dark:text-slate-300">{more.subtitle}</p>
    <p class="mt-3 text-base text-slate-800 dark:text-slate-200">{more.bio}</p>

    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <div>
        <h4 class="text-sm font-semibold text-slate-900 dark:text-slate-100">Fun Facts</h4>
        <ul class="mt-3 list-disc pl-5 text-sm text-slate-700 dark:text-slate-300">
          {#each more.funFacts as fact}
            <li in:fly={{ y: 6 }}>{fact}</li>
          {/each}
        </ul>
      </div>

      <div>
        <h4 class="text-sm font-semibold text-slate-900 dark:text-slate-100">Hobbies</h4>
        <ul class="mt-3 list-none text-sm text-slate-700 dark:text-slate-300 space-y-2">
          {#each more.hobbies as hobby}
            <li class="rounded-md border border-emerald-400/20 bg-slate-50/60 p-3 dark:bg-slate-800/60" in:fly={{ y: 6 }}>
              <div class="font-semibold">{hobby.name}</div>
              <div class="text-xs">{hobby.note}</div>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="mt-6">
      <h4 class="text-sm font-semibold text-slate-900 dark:text-slate-100">Spotlight Projects</h4>
      <div class="mt-3 grid gap-3 sm:grid-cols-2">
        {#each more.spotlightProjects as p}
          <div class="rounded-lg border border-emerald-400/20 p-4 bg-slate-50/70 dark:bg-slate-800/60" in:fly={{ y: 8 }}>{p.title}: <span class="text-sm text-slate-600 dark:text-slate-300">{p.description}</span></div>
        {/each}
      </div>
    </div>

    <div class="mt-6">
      <h4 class="text-sm font-semibold text-slate-900 dark:text-slate-100">{more.lichess.label}</h4>
      {#if lichessRating}
        <div class="mt-2 text-lg font-semibold text-emerald-400">{lichessRating} <span class="text-xs text-slate-500">({lichessPerf})</span></div>
      {:else if lichessError}
        <div class="mt-2 text-sm text-rose-400">{lichessError}</div>
      {:else}
        <div class="mt-2 text-sm text-slate-600 dark:text-slate-300">Rating unavailable — please set your Lichess username in src/constants/more.ts</div>
      {/if}
    </div>
  </div>
</section>
