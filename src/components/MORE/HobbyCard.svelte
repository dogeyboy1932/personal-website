<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";

  export let name: string;
  export let note: string;
  export let index: number;
</script>

<li 
  class="group relative overflow-hidden rounded-xl border {$theme.accent.cyan.border} {$theme.bg.secondary} p-4 transition hover:-translate-y-0.5 hover:shadow-lg {$theme.accent.cyan.hover.border}"
  in:fly={{ y: 12, delay: 250 + index * 100, duration: 350 }}
>
  <!-- Glow effect -->
  <div class="absolute -right-6 -top-6 h-20 w-20 rounded-full {$theme.accent.cyan.glow} blur-2xl transition group-hover:scale-110 {$theme.accent.cyan.hover.glow}" />
  
  <div class="relative">
    <div class="font-semibold {$theme.text.secondary}">{name}</div>
    <div class="mt-1 text-xs {$theme.accent.cyan.textMuted}">{note}</div>
  </div>
</li>
