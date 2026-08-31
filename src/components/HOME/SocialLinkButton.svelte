<script lang="ts">
  import { fly } from "svelte/transition";

  import { theme } from "../../constants/_theme";

  import { icons } from "../../constants/home";

  import type { SocialHandle } from "../../types";

  export let href: string;
  export let icon: SocialHandle["icon"];
  export let title: string;
  export let index: number = 0;

</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={title}
  class="group flex h-11 w-11 items-center justify-center rounded-2xl border {$theme.border.tertiary} {$theme.bg.secondary} {$theme.text.secondary} transition-all {$theme.hover.scale} {$theme.accent.indigo.hover.border} {$theme.accent.indigo.hover.bg}"
  in:fly={{ y: 18, delay: index * 80 }}
>
  <svelte:component this={icons[icon]} class="h-5 w-5" strokeWidth={1.5} />
</a>
