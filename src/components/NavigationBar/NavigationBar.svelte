<script lang="ts">
  import { page } from "$app/stores";
  import { ThemeToggle } from "../Button";
  import { Logo } from "../Logo";

  import { navItems } from "../../constants/nav";
  import { site } from "../../constants/site";

  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  function handleNavClick(href: string) {
    if (typeof window !== "undefined") {
      window.location.href = href;
    }
    closeDropdown();
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      closeDropdown();
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<nav
  class="w-full bg-black/80 backdrop-blur-sm border-b border-yellow-500/40 px-4 sm:px-8 top-0 z-50 sticky"
>
  <div class="mx-auto flex h-16 w-full max-w-7xl items-center gap-6">
    <a
      href="/"
      class="flex flex-shrink-0 items-center gap-3"
      aria-label="Go to home"
    >
      <Logo
        class="w-10 h-10 transition-transform duration-300 hover:-translate-y-1"
      />
      <span
        class="hidden sm:block text-sm font-semibold tracking-[0.4em] text-slate-300 uppercase"
      >
        {site.author}
      </span>
    </a>

    <div class="ml-auto flex items-center gap-6">
      <div class="items-center gap-6 lg:flex">
        {#each navItems as item}
          <a
            href={item.href}
            class={`relative text-xs uppercase tracking-[0.35em] font-semibold transition-all duration-300 ${
              $page.url.pathname === item.href
                ? "text-yellow-300"
                : "text-yellow-400 hover:text-yellow-200"
            }`}
          >
            <span class="px-1">{item.label}</span>
            <span
              class={`absolute left-0 -bottom-2 h-[2px] w-full bg-gradient-to-r from-yellow-400 via-cyan-400 to-yellow-500 transition-transform duration-300 ${
                $page.url.pathname === item.href ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </a>
        {/each}
      </div>

      <div class="flex items-center gap-3">
        <div class="lg:hidden custom-dropdown relative">
          <button
            type="button"
            class="flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-yellow-500/40 text-yellow-200 text-xs uppercase tracking-[0.35em] font-semibold px-4 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-yellow-500/10 hover:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
            on:click|stopPropagation={toggleDropdown}
            aria-label="Navigation menu"
            aria-expanded={isDropdownOpen}
          >
            <span>
              {navItems.find(item => item.href === $page.url.pathname)?.label || 'Menu'}
            </span>
            <svg
              class="h-4 w-4 text-yellow-300 transition-transform duration-300 {isDropdownOpen ? 'rotate-180' : ''}"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          {#if isDropdownOpen}
            <div
              class="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-sm border border-yellow-500/40 rounded-md shadow-lg shadow-yellow-500/20 overflow-hidden z-50"
            >
              {#each navItems as item}
                <button
                  type="button"
                  class={`w-full text-left px-4 py-3 text-xs uppercase tracking-[0.35em] font-semibold transition-all duration-200 ${
                    $page.url.pathname === item.href
                      ? "bg-gradient-to-r from-yellow-500/20 to-cyan-500/20 text-yellow-300"
                      : "text-yellow-200 hover:bg-yellow-500/10"
                  }`}
                  on:click={() => handleNavClick(item.href)}
                >
                  {item.label}
                </button>
              {/each}
            </div>
          {/if}
        </div>


        <ThemeToggle />
      </div>
    </div>
  </div>
</nav>