<script lang="ts">
  import { theme } from "../../lib/stores";
  import { getTechColor } from "../../lib/utils";

  export let tech: string;
  export let index: number = 0;
  export let neutral = false;
  export let color: string | null = null;

  $: colorClass = neutral
    ? $theme.text.primary
    : (color ?? getTechColor(tech, index, $theme.techColors));
  $: fill = neutral ? "bg-slate-400/10" : $theme.bg.overlay;
</script>

<span
  class={`meta-label rounded px-2 py-1 text-[11px] border ${$theme.border.light} ${fill} ${colorClass}`}
>
  {tech}
</span>
