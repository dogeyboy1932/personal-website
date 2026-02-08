<script lang="ts">
  import { page } from "$app/stores";
  import { Logo } from "./Logo";
  import { ThemeToggle } from "./ThemeToggle";
  import { navItems, site } from "../../constants";
  import { theme } from "../../lib/stores";
</script>

<nav
  class="w-full {$theme.bg.navbar} backdrop-blur-md px-4 sm:px-6 top-0 z-50 sticky"
>
  <div class="flex flex-wrap mx-auto flex h-25 w-full max-w-[1400px] items-center justify-between p-2">
    
    <!-- Logo Section -->
    <a
      href="/"
      class="flex flex-shrink-0 items-center gap-4 group"
      aria-label="Go to home"
    >
      <Logo
        class="w-9 h-9 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
      />
      <span
        class="font-sans sm:block text-md tracking-[0.25em] {$theme.text.primary} uppercase {$theme.nav.logoHover}"
      >
        {site.author}
      </span>
    </a>

    <!-- Navigation Pills + Theme Toggle -->
    <div class="flex items-center gap-4">
      <div class="flex flex-wrap items-center p-1 {$theme.accent.purple.shadow} gap-5">
        {#each navItems as item}
          <a
            href={item.href}
            class={`relative flex items-center gap-2 p-2 rounded-sm text-md font-sans tracking-wide transition-all duration-300 ${
              $page.url.pathname === item.href
                ? $theme.nav.active
                : $theme.nav.inactive
            }`}
          >
            <span>{item.label}</span>
            <svelte:component this={item.icon} class="w-4 h-4" />
          </a>
        {/each}

        <!-- Theme Toggle -->
        <ThemeToggle />
      </div>
    </div>
  </div>
</nav>