<script lang="ts">
  import { page } from "$app/stores";
  import { Logo } from "./Logo";
  import { ThemeToggle } from "./ThemeToggle";
  import { navItems, site } from "../../constants";
  import { theme } from "../../lib/stores";
  // FX:particle-text — the name renders as a cursor-reactive particle cloud
  import { SpinLogo, GooeyNav, ParticleText } from "../fx";
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
      <!-- FX:spin-logo — grab the mark and throw it; it coasts to a stop -->
      <SpinLogo>
        <Logo
          class="w-9 h-9 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
        />
      </SpinLogo>
      <!-- /FX:spin-logo -->
      <!--
        Hidden below sm: the full name is wide enough to claim the whole first
        row on a phone, which pushed the nav and the theme toggle onto rows of
        their own.
      -->
      <span class="hidden h-7 w-[21rem] sm:block">
        <!-- FX:particle-text — the navbar name as a particle cloud.
             Sized explicitly: ParticleText measures its host box to rasterise
             the text, and an inline-auto-width host collapses to nothing.
             Swap this block back to <ShinyText> to undo. -->
        <ParticleText
          text={site.author.toUpperCase()}
          gap={2}
          radius={60}
          fontSize={17}
          font={`700 {size}px 'Chivo', 'Space Grotesk', Inter, sans-serif`}
          class="font-sans text-md tracking-[0.25em] uppercase"
        />
        <!-- /FX:particle-text -->
      </span>
    </a>

    <!-- Navigation Pills + Theme Toggle -->
    <div class="flex items-center gap-4">
      <div class="flex flex-wrap items-center p-1 {$theme.accent.purple.shadow} gap-3">
        <!-- FX:gooey-nav — the links and their active state live in the fx
             component now; the blob replaces the old per-link active pill -->
        <GooeyNav items={navItems} current={$page.url.pathname} />
        <!-- /FX:gooey-nav -->

        <!-- Theme Toggle -->
        <ThemeToggle />
      </div>
    </div>
  </div>
</nav>