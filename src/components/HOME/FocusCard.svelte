<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../constants/_theme";
  import { BorderGlow } from "../Creative";

  export let title: string;
  export let description: string;
  export let index: number = 0;
</script>

<div
  class="group relative overflow-hidden rounded-2xl border {$theme.border.default} {$theme.gradient.primary} shadow-xl transition-all duration-300 {$theme.border.hover} {$theme.hover.translateUpMedium} {$theme.hover.shadowLarge} p-6"
  in:fly={{ y: 20, delay: index * 100 }}
>
  <BorderGlow size={280} intensity={0.85} radius="1rem" />

  <div class="relative">
    <h4 class="text-2xl font-extrabold {$theme.text.primary} mb-4 tracking-tight">
      {title}
    </h4>
    
    <p class="text-base {$theme.text.muted} leading-relaxed font-light">
      {description}
    </p>
  </div>
</div>
