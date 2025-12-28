<script lang="ts">
  import { techColors } from "../../constants";
  import { theme } from "../../lib/stores";

  export let tech: string;
  export let index: number = 0;

  function getTechColor(tech: string, index: number) {
    const hash = (tech.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + index) % techColors.length;
    return techColors[hash];
  }

  $: colorClass = getTechColor(tech, index);
</script>

<span
  class={`rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] border ${$theme.border.light} ${$theme.bg.overlay} ${colorClass}`}
>
  {tech}
</span>
