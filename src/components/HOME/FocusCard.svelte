<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";

  export let title: string;
  export let description: string;
  export let index: number = 0;
</script>

<div
  class="group relative overflow-hidden rounded-2xl border {$theme.border.default} {$theme.gradient.primary} shadow-xl transition-all duration-300 {$theme.border.hover} {$theme.hover.translateUpMedium} {$theme.hover.shadowLarge} p-6"
  in:fly={{ y: 20, delay: index * 100 }}
>
  <div class="relative">
    <!-- Title -->
    <h4 class="text-2xl font-extrabold {$theme.text.primary} mb-4 tracking-tight">
      {title}
    </h4>
    
    <!-- Description -->
    <p class="text-base {$theme.text.muted} leading-relaxed font-light">
      {description}
    </p>
  </div>
</div>
