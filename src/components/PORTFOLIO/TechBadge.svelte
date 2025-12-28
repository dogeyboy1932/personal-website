<script lang="ts">
  // import { techColors } from "../../constants";
  import { theme } from "../../lib/stores";
  import { getTechColor } from "../../lib/utils";


  export let tech: string;
  export let index: number = 0;

  $: colorClass = getTechColor(tech, index, $theme.techColors);
</script>

<span
  class={`rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] border ${$theme.border.light} ${$theme.bg.overlay} ${colorClass}`}
>
  {tech}
</span>
