<script lang="ts">
  // import { techColors } from "../../constants";
  import { theme } from "../../lib/stores";
  import { getTechColor } from "../../lib/utils";


  export let tech: string;
  export let index: number = 0;
  /**
   * Drop the per-tech colour and the blue fill. Experience cards use this;
   * project cards do not. ("Just make everything in experience white/silver.")
   */
  export let neutral = false;
  /**
   * Precomputed colour class. Rows pass this from getTechColors() so adjacent
   * badges are guaranteed to differ — a property of the sequence, which a
   * single badge cannot know on its own. Falls back to per-badge hashing when
   * a call site renders a lone badge.
   */
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
