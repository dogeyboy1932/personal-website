<script lang="ts">
  import { fly, scale } from "svelte/transition";
  import { onMount } from "svelte";
  import { theme } from "../../lib/stores";
  import LinkPreview from "../LinkPreview.svelte";

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
  class="group relative overflow-hidden rounded-2xl border {$theme.accent.yellow.border} {$theme.gradient.yellow} p-6 shadow-xl {$theme.accent.yellow.hover.border} transition-colors"
  in:fly={{ y: 20, delay: 250, duration: 400 }}
>
  <!-- Glow effect -->
  <div class="absolute -left-10 -bottom-10 h-40 w-40 rounded-full {$theme.accent.yellow.glow} blur-3xl {$theme.accent.yellow.hover.bg} transition" />
  
  <div class="relative">
    <h3 class="text-lg font-semibold {$theme.accent.yellow.text} ">{label}</h3>
    <h4 class="text-md font-semibold {$theme.accent.cyan.text} mb-3">  @{username}</h4>
    
    {#if rating}
      <div class="flex items-baseline gap-2" in:scale={{ delay: 400, duration: 300 }}>
        <div class="text-5xl font-extrabold text-transparent bg-clip-text {$theme.lichess.rating}">
          {rating}
        </div>
        <span class="text-sm font-medium uppercase tracking-wider {$theme.lichess.perfType}">({perfType})</span>
      </div>
      <LinkPreview
        href={`https://lichess.org/@/${username}`}
        label={`@${username} on Lichess`}
        className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-[0.35em] {$theme.lichess.link} transition"
      >
        View Profile →
      </LinkPreview>
    {:else if error}
      <div class="text-sm {$theme.lichess.error}">{error}</div>
    {:else}
      <div class="text-sm {$theme.lichess.loading}">Loading rating...</div>
    {/if}

    <!--
      Slot for the challenge form. updates.txt: "the 'play me' should be in the
      lichess container...keep it all contained." The rating is the invitation
      and the form is the way to act on it, so they belong in one box rather
      than two side by side.
    -->
    {#if $$slots.default}
      <!-- Inset panel, not just a divider. The Lichess card is a warm gradient,
           and a bare divider left the challenge form sitting in the same wash
           as the rating above it. Its own darker ground gives it edges.
           ("the play me comopnent is hard to see...make it more visible") -->
      <!-- Deliberately COOL against the card's warm gradient. Matching the
           card's own amber made this block melt into it however bright the text
           got; the contrast that makes it findable is hue, not luminance.
           ("The play me component is still hard to see...make it contrast
           better to make it more identifiable") -->
      <div
        class="mt-5 rounded-xl border-2 border-brand/50 bg-slate-950/90 p-4 shadow-lg shadow-black/40 ring-1 ring-inset ring-white/5"
      >
        <slot />
      </div>
    {/if}
  </div>
</div>
