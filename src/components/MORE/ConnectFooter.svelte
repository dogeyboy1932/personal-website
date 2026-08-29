<!--
  /more section: connect footer.

  The README ends on three social badges. Here they collapse into a single
  pill that fans open — the brief called out that interaction specifically
  ("I like the hover and being able to click around icons").

  Data: more.socials in src/constants/more.ts
  Uses: FX:share-button
-->
<script lang="ts">
  import { theme } from "../../lib/stores";
  import { ShareButton } from "../fx";
  import type { SocialHandle } from "../../types";

  export let socials: SocialHandle[] = [];
</script>

<div
  class="flex flex-col items-center gap-3 rounded-2xl border {$theme.border.default} {$theme.bg.card} p-6 text-center"
>
  <p class="text-[11px] uppercase tracking-[0.3em] {$theme.text.muted}">
    That's the whole picture
  </p>
  <!-- FX:share-button -->
  <ShareButton actions={socials} label="Find me" />
  <!-- /FX:share-button -->
</div>
