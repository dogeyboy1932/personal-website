<script lang="ts">
  import { theme } from "../../constants/_theme";
  import { getTechColor } from "../../lib/utils";

  export let tech: string;
  export let index: number = 0;
  export let neutral = false;
  export let color: string | null = null;

  $: colorClass = neutral
    ? $theme.text.primary
    : (color ?? getTechColor(tech, index, $theme.techColors));
</script>

<span
  class={`meta-label rounded px-2 py-1 text-[11px] border ${$theme.border.light} ${$theme.bg.neutral} ${colorClass}`}
>
  {tech}
</span>
