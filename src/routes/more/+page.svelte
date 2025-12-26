<script lang="ts">
  // External dependencies
  import { fade, fly } from "svelte/transition";
  
  // Icons
  import { Heart, Gamepad2 } from "lucide-svelte";
  
  // Components
  import PageHeader from "../../components/Headers/PageHeader.svelte";
  import { BioCard, FunFactItem, HobbyCard, LichessCard } from "../../components/MORE";
  
  // Constants
  import { more } from "../../constants";
</script>


<section class="space-y-8" in:fade>
  <PageHeader title={more.title} />

  <!-- ===== HERO BIO CARD ===== -->
  <BioCard subtitle={more.subtitle} bio={more.bio} />

  <!-- ===== TWO COLUMN LAYOUT ===== -->
  <div class="grid gap-6 lg:grid-cols-2">
    
    <!-- Fun Facts Card -->
    <div 
      class="p-3 rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-950/40 via-slate-900/70 to-slate-900/70 shadow-lg hover:border-pink-500/50 transition-colors"
      in:fly={{ y: 20, delay: 100, duration: 400 }}
    >
      <div class="flex items-center gap-2 mb-4">
        <Heart class="w-5 h-5 text-pink-400" />
        <h3 class="text-lg font-semibold text-pink-100">Fun Facts</h3>
      </div>
      <ul class="space-y-3">
        {#each more.funFacts as fact, i}
          <FunFactItem {fact} index={i} />
        {/each}
      </ul>
    </div>

    <!-- Hobbies Card -->
    <div 
      class="p-3 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-slate-900/70 to-slate-900/70 shadow-lg hover:border-cyan-500/50 transition-colors"
      in:fly={{ y: 20, delay: 150, duration: 400 }}
    >
      <div class="flex items-center gap-2 mb-4">
        <Gamepad2 class="w-5 h-5 text-cyan-400" />
        <h3 class="text-lg font-semibold text-cyan-100">Hobbies</h3>
      </div>
      <ul class="space-y-3">
        {#each more.hobbies as hobby, i}
          <HobbyCard name={hobby.name} note={hobby.note} index={i} />
        {/each}
      </ul>
    </div>
  </div>

  <!-- ===== LICHESS RATING CARD ===== -->
  <LichessCard label={more.lichess.label} username={more.lichess.username} />
</section>
