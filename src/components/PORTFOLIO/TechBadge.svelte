<script lang="ts">
  // import { techColors } from "../../constants";
  import { theme } from "../../lib/stores";
  import { getTechColor } from "../../lib/utils";


  export let tech: string;
  export let index: number = 0;
    /** Drop the per-tech colour and the blue fill. */
  export let neutral = false;
    /** Precomputed colour class. */
  export let color: string | null = null;

  $: colorClass = neutral
    ? $theme.text.primary
    : (color ?? getTechColor(tech, index, $theme.techColors));
  // bg.overlay is bg-blue-400/10 — a blue wash, which is hue on a card that is
  // meant to have none.
  $: fill = neutral ? "bg-slate-400/10" : $theme.bg.overlay;
</script>

<span
  class={`meta-label rounded px-2 py-1 text-[11px] border ${$theme.border.light} ${fill} ${colorClass}`}
>
  {tech}
</span>
