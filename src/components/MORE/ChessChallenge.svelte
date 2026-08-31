<script lang="ts">
  import { ChessKnightIcon } from "lucide-svelte";
  import { theme } from "../../lib/stores";

  export let standalone = false;
</script>

<div
  class="flex h-full flex-col items-center justify-center text-center {standalone
    ? `rounded-2xl border p-5 ${$theme.border.default} ${$theme.bg.card}`
    : ''}"
>
  <div class="mb-1 flex items-center gap-2">
    <ChessKnightIcon class="h-5 w-5 {$theme.text.strong}" />
    <h4 class="meta-label text-sm {$theme.text.strong}">Play me</h4>
  </div>

  <p class="max-w-[32ch] text-xs {$theme.text.secondary}">
    Feel free to send over a challenge on Lichess. I might be afk but I'll get to it.
  </p>
</div>
