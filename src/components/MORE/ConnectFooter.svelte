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
  <!-- FX:share-button — glow: the travelling border arc, moved here off the
       home page's three quick links so exactly one button on the site has it.
       ("Apply glow animation to the 'find me' button?") -->
  <ShareButton actions={socials} label="Reach out" glow />
  <!-- /Creative:share-button -->
</div>
