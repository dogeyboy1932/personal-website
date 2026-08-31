<script lang="ts">
  import { page } from "$app/stores";
  import { Logo, ThemeToggle } from ".";
  import { navItems, site } from "../../constants";
  import { theme } from "../../constants/_theme";
  import { ShinyText, SpinLogo, GooeyNav } from "../Creative";
</script>

<nav
  class="w-full {$theme.bg.navbar} backdrop-blur-md px-4 sm:px-6 top-0 z-50 sticky"
>
  <div class="flex flex-wrap mx-auto flex h-25 w-full max-w-[1400px] items-center justify-between p-2">
    
    <div class="group flex flex-shrink-0 items-center gap-4">
      <SpinLogo>
        <Logo
          class="w-9 h-9 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgb(var(--halo-3)/0.5)]"
        />
      </SpinLogo>

      <a href="/" aria-label="Go to home">

        <span class="hidden sm:block">
        <ShinyText
          variant="both"
          speed={5}
          class="font-sans text-md font-extrabold tracking-[0.22em] uppercase"
        >
          {site.author}
        </ShinyText>

      </span>
      </a>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex flex-wrap items-center p-1 {$theme.accent.purple.shadow} gap-3">
        <GooeyNav items={navItems} current={$page.url.pathname} />

        <ThemeToggle />
      </div>
    </div>
  </div>
</nav>