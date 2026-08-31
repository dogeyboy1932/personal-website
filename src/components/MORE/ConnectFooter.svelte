<script lang="ts">
  import { theme } from "../../lib/stores";
  import { ShareButton } from "../Creative";
  import type { SocialHandle } from "../../types";

  export let socials: SocialHandle[] = [];
</script>

<div
  class="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border {$theme.border.default} {$theme.bg.card} p-6 text-center"
>
  <p class="text-[11px] uppercase tracking-[0.3em] {$theme.text.muted}">
    That's the whole picture
  </p>
  <ShareButton actions={socials} glow />
</div>
