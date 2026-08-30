<script lang="ts">
  import { page } from "$app/stores";
  import { Logo } from "./Logo";
  import { ThemeToggle } from "./ThemeToggle";
  import { navItems, site } from "../../constants";
  import { theme } from "../../lib/stores";
  // FX:shiny-text — animated gradient + specular sweep on the name.
  // (The particle-text experiment moved to the hero title: at navbar size it
  //  read as texture rather than letterforms.)
  import { ShinyText, SpinLogo, GooeyNav } from "../fx";
</script>

<nav
  class="w-full {$theme.bg.navbar} backdrop-blur-md px-4 sm:px-6 top-0 z-50 sticky"
>
  <div class="flex flex-wrap mx-auto flex h-25 w-full max-w-[1400px] items-center justify-between p-2">
    
    <!-- Logo Section -->
    <!--
      THE LOGO IS NOT A LINK. ("the logo shouldn't be a link...that makes it
      hard to move")

      It used to sit inside <a href="/">, which fought the drag two ways: the
      browser's native image/link drag competed with the pointer gesture, and
      SpinLogo had to run a click-swallower to stop a spin from navigating home.
      Both are gone. The wrapper is now a plain flex div and the <a> wraps only
      the NAME beside it, so home is still one click away and the mark is purely
      a toy.
    -->
    <div class="group flex flex-shrink-0 items-center gap-4">
      <!-- FX:spin-logo — grab the mark and throw it; it coasts to a stop, and
           drifts slowly on its own so it reads as grabbable -->
      <SpinLogo>
        <Logo
          class="w-9 h-9 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
        />
      </SpinLogo>
      <!-- /FX:spin-logo -->
      <a href="/" aria-label="Go to home">
      <!--
        Hidden below sm: the full name is wide enough to claim the whole first
        row on a phone, which pushed the nav and the theme toggle onto rows of
        their own.
      -->
      <span class="hidden sm:block">
        <!-- FX:shiny-text -->
        <!-- font-extrabold and slightly tighter tracking: the sweep is clipped
             to the glyphs, so thin strokes give the gradient almost no area to
             show in. Thicker letterforms are what make it visible, not a
             brighter gradient. ("make my name in the navbar a bit 'bolder' so
             the gradient is easier to spot. Increase thickness") -->
        <ShinyText
          variant="both"
          speed={5}
          class="font-sans text-md font-extrabold tracking-[0.22em] uppercase"
        >
          {site.author}
        </ShinyText>
        <!-- /FX:shiny-text -->
      </span>
      </a>
    </div>

    <!-- Navigation Pills + Theme Toggle -->
    <div class="flex items-center gap-4">
      <div class="flex flex-wrap items-center p-1 {$theme.accent.purple.shadow} gap-3">
        <!-- FX:gooey-nav — the links and their active state live in the fx
             component now; the blob replaces the old per-link active pill -->
        <GooeyNav items={navItems} current={$page.url.pathname} />
        <!-- /FX:gooey-nav -->

        <!-- Theme Toggle -->
        <!-- <ThemeToggle /> -->
      </div>
    </div>
  </div>
</nav>