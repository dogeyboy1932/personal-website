<script lang="ts">
  import { fly } from "svelte/transition";
  import { Sparkles } from "lucide-svelte";
  import { theme } from "../../lib/stores";

  export let subtitle: string;
  export let bio: string;
</script>

<div 
  class="p-5 group relative overflow-hidden rounded-2xl border {$theme.accent.violet.border} {$theme.gradient.violet} shadow-xl"
  in:fly={{ y: 20, duration: 400 }}
>
  <!-- Glow effect -->
  <div class="absolute -right-10 -top-12 h-40 w-40 rounded-full {$theme.accent.violet.glow} blur-3xl transition group-hover:translate-x-3 {$theme.accent.violet.hover.bg}" />
  
  <div class="relative">
    <div class="flex items-center gap-2 mb-4">
      <Sparkles class="w-5 h-5 {$theme.accent.violet.text}" />
      <p class="text-sm font-semibold uppercase tracking-[0.35em] {$theme.accent.violet.textMuted}">{subtitle}</p>
    </div>
    
    <div class="text-lg leading-relaxed {$theme.text.secondary} whitespace-pre-line">
      {bio}
    </div>
  </div>
</div>
