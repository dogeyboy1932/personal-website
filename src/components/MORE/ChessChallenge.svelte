<script lang="ts">
  import { ChessKnightIcon } from "lucide-svelte";
  import { theme } from "../../constants/_theme";

</script>

<div
  class="flex h-full flex-col items-center justify-center text-center"
>
  <div class="mb-1 flex items-center gap-2">
    <ChessKnightIcon class="h-5 w-5 {$theme.text.strong}" />
    <h4 class="meta-label text-lg {$theme.text.strong}">Play me</h4>
  </div>

  <p class="max-w-[35ch] text-sm {$theme.text.secondary}">
    Feel free to send over a challenge on Lichess
  </p>
</div>
