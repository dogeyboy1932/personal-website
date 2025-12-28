<script lang="ts">
  // External dependencies
  import { fade, fly } from "svelte/transition";
  
  // Icons
  import { Heart, Gamepad2 } from "lucide-svelte";
  
  // Components
  import PageHeader from "../../components/Headers/PageHeader.svelte";
  import { BioCard, FunFactItem, HobbyCard, LichessCard } from "../../components/MORE";
  
  // Constants and theme
  import { more } from "../../constants";
  import { theme } from "../../lib/stores";
</script>


<section class="space-y-8" in:fade>
  <PageHeader title={more.title} />

  <!-- ===== HERO BIO CARD ===== -->
  <BioCard subtitle={more.subtitle} bio={more.bio} />

  <!-- ===== TWO COLUMN LAYOUT ===== -->
  <div class="grid gap-6 lg:grid-cols-2">
    
    <!-- Fun Facts Card -->
    <div 
      class="p-3 rounded-2xl border {$theme.accent.pink.border} {$theme.gradient.pink} shadow-lg {$theme.accent.pink.hover.border} transition-colors"
      in:fly={{ y: 20, delay: 100, duration: 400 }}
    >
      <div class="flex items-center gap-2 mb-4">
        <Heart class="w-5 h-5 {$theme.accent.pink.text}" />
        <h3 class="text-lg font-semibold {$theme.accent.pink.textLight}">Fun Facts</h3>
      </div>
      <ul class="space-y-3">
        {#each more.funFacts as fact, i}
          <FunFactItem {fact} index={i} />
        {/each}
      </ul>
    </div>

    <!-- Hobbies Card -->
    <div 
      class="p-3 rounded-2xl border {$theme.accent.cyan.border} {$theme.gradient.cyan} shadow-lg {$theme.accent.cyan.hover.border} transition-colors"
      in:fly={{ y: 20, delay: 150, duration: 400 }}
    >
      <div class="flex items-center gap-2 mb-4">
        <Gamepad2 class="w-5 h-5 {$theme.accent.cyan.text}" />
        <h3 class="text-lg font-semibold {$theme.accent.cyan.textLight}">Hobbies</h3>
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
