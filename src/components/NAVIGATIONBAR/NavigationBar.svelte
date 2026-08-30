<script lang="ts">
  import { page } from "$app/stores";
  import { Logo, ThemeToggle } from ".";
  import { navItems, site } from "../../constants";
  import { theme } from "../../lib/stores";
  // FX:shiny-text — animated gradient + specular sweep on the name.
  // (The particle-text experiment moved to the hero title: at navbar size it
  //  read as texture rather than letterforms.)
  import { ShinyText, SpinLogo, GooeyNav } from "../Creative";
</script>

<nav
  class="w-full {$theme.bg.navbar} backdrop-blur-md px-4 sm:px-6 top-0 z-50 sticky"
>
  <div class="flex flex-wrap mx-auto flex h-25 w-full max-w-[1400px] items-center justify-between p-2">
    
    <!-- Logo Section -->
        <!-- THE LOGO IS NOT A LINK. -->
    <div class="group flex flex-shrink-0 items-center gap-4">
      <!-- FX:spin-logo — grab the mark and throw it; it coasts to a stop, and
           drifts slowly on its own so it reads as grabbable -->
      <SpinLogo>
        <Logo
          class="w-9 h-9 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
        />
      </SpinLogo>
      <!-- /Creative:spin-logo -->
      <a href="/" aria-label="Go to home">
            <!-- Hidden below sm: the full name is wide enough to claim the whole first row on a phone,
           which pushed the nav and the theme toggle onto rows of their own. -->
      <span class="hidden sm:block">
        <!-- FX:shiny-text -->
                <!-- font-extrabold and slightly tighter tracking: the sweep is clipped to the glyphs, so
             thin strokes give the gradient almost no area to show in. -->
        <ShinyText
          variant="both"
          speed={5}
          class="font-sans text-md font-extrabold tracking-[0.22em] uppercase"
        >
          {site.author}
        </ShinyText>
        <!-- /Creative:shiny-text -->
      </span>
      </a>
    </div>

    <!-- Navigation Pills + Theme Toggle -->
    <div class="flex items-center gap-4">
      <div class="flex flex-wrap items-center p-1 {$theme.accent.purple.shadow} gap-3">
        <!-- FX:gooey-nav — the links and their active state live in the fx
             component now; the blob replaces the old per-link active pill -->
        <GooeyNav items={navItems} current={$page.url.pathname} />
        <!-- /Creative:gooey-nav -->

        <!-- Theme Toggle -->
                <!-- It had been commented out, which is why the light theme rotted unnoticed: every pass
             for weeks rendered dark-only, so hardcoded dark surfaces went in without anything
             surfacing them. -->
        <ThemeToggle />
      </div>
    </div>
  </div>
</nav>