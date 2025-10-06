<script lang="ts">
  import { page } from "$app/stores";
  import ThemeToggle from "../components/Button/ThemeToggle.svelte";
  import Logo from "../components/Logo/Logo.svelte";

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/hobbies", label: "Hobbies" },
    { href: "/connect", label: "Connect" },
    { href: "/lab", label: "Lab" },
  ];

  function handleSelectChange(event: Event) {
    const target = event.currentTarget as HTMLSelectElement | null;
    if (target?.value) {
      if (typeof window !== "undefined") {
        window.location.href = target.value;
      }
    }
  }
</script>

<nav
  class="w-full bg-black/80 backdrop-blur-sm border-b border-emerald-500/40 px-4 sm:px-8 top-0 z-50 sticky"
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
        class="hidden sm:block text-sm font-semibold tracking-[0.4em] text-emerald-400 uppercase"
      >
        Akhil Gogineni
      </span>
    </a>

    <div class="ml-auto flex items-center gap-6">
      <div class="hidden items-center gap-6 lg:flex">
        {#each navItems as item}
          <a
            href={item.href}
            class={`relative text-xs uppercase tracking-[0.35em] font-semibold transition-all duration-300 ${
              $page.url.pathname === item.href
                ? "text-emerald-300"
                : "text-emerald-500/80 hover:text-emerald-300"
            }`}
          >
            <span class="px-1">{item.label}</span>
            <span
              class={`absolute left-0 -bottom-2 h-[2px] w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 transition-transform duration-300 ${
                $page.url.pathname === item.href ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </a>
        {/each}
      </div>

      <div class="flex items-center gap-3">
        <div class="lg:hidden">
          <select
            class="bg-black/60 border border-emerald-500/40 text-emerald-200 text-xs uppercase tracking-[0.4em] px-3 py-2 rounded-md"
            on:change={handleSelectChange}
          >
            {#each navItems as item}
              <option
                value={item.href}
                selected={$page.url.pathname === item.href}
              >
                {item.label}
              </option>
            {/each}
          </select>
        </div>

        <a
          href="/connect"
          class="hidden sm:inline-flex items-center rounded-md border border-emerald-400/60 px-4 py-2 text-xs uppercase tracking-[0.45em] font-semibold text-emerald-200 transition hover:bg-emerald-500/10"
        >
          Connect
        </a>
        <ThemeToggle />
      </div>
    </div>
  </div>
</nav>
