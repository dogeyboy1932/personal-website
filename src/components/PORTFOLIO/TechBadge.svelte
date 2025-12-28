<script lang="ts">
  // import { techColors } from "../../constants";
  import { theme } from "../../lib/stores";

  export let tech: string;
  export let index: number = 0;


  let primaryColor: string;
  let secondaryColor: string;
  
  // $: primaryColor = $theme.matrixColors.primaryColor;
  // $: secondaryColor = $theme.matrixColors.secondaryColor;



  // Always use $theme.techColors directly for reactivity
  function getTechColor(tech: string, index: number, techColors: string[]) {
    const hash = (tech.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + index) % techColors.length;
    return techColors[hash];
  }

  $: colorClass = getTechColor(tech, index, $theme.techColors);
</script>

<span
  class={`rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] border ${$theme.border.light} ${$theme.bg.overlay} ${colorClass}`}
>
  {tech}
</span>
