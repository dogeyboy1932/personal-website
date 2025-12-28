<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";

  export let href: string;
  export let title: string;
  export let description: string;
  export let cta: string;
  export let index: number = 0;
</script>

<a
  {href}
  class="group relative overflow-hidden rounded-xl border {$theme.border.accent} {$theme.bg.card} p-3 sm:p-4 md:p-6 shadow-lg transition {$theme.hover.translateUp} {$theme.hover.shadow} {$theme.border.hover} flex flex-col"
  in:fly={{ y: 18, delay: index * 100 + 100 }}
>
  <!-- Glow effect -->
  <div class="absolute -right-10 -top-12 h-32 w-32 rounded-full {$theme.glow.primary} blur-[60px] transition group-hover:translate-x-3" />
  
  <h4 class="text-base sm:text-lg md:text-xl font-display font-bold {$theme.text.primary}">
    {title}
  </h4>
  
  <p class="mt-2 md:mt-3 text-sm sm:text-base md:text-lg {$theme.text.subtle} flex-1">
    {description}
  </p>
  
  <span class="mt-auto pt-3 md:pt-4 inline-flex text-xs sm:text-sm font-semibold uppercase tracking-widest {$theme.text.subtle} {$theme.cta.hover} transition-colors">
    {cta} →
  </span>
</a>
