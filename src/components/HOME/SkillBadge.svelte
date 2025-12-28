<script lang="ts">
  import { fly } from "svelte/transition";
  import { theme } from "../../lib/stores";

  export let name: string;
  export let index: number = 0;
</script>

<span
  class="px-4 py-2 rounded-xl {$theme.gradient.secondary} border {$theme.border.tertiary} text-[12px] font-sans font-bold uppercase tracking-widest {$theme.text.muted} transition-all {$theme.accent.emerald.hover.border} {$theme.accent.yellow.hover.text}"
  in:fly={{ y: 12, delay: index * 80 }}
>
  {name}
</span>
