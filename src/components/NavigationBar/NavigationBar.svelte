<script lang="ts">
  import { page } from "$app/stores";
  import { Logo } from "../Logo";
  import { navItems, site } from "../../constants";

  // Icon paths for each nav item
  const navIcons: Record<string, string> = {
    "/": "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819",
    "/portfolio": "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6",
    "/resume": "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z",
    "/more": "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
  };
</script>

<nav
  class="w-full bg-slate-950/95 backdrop-blur-md px-4 sm:px-6 top-0 z-50 sticky"
>
  <div class="flex flex-wrap mx-auto flex h-25 w-full max-w-[1400px] items-center justify-between p-2">
    
    <!-- Logo Section -->
    <a
      href="/"
      class="flex flex-shrink-0 items-center gap-2 group"
      aria-label="Go to home"
    >
      <Logo
        class="w-9 h-9 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
      />
      <span
        class="font-sans sm:block text-md tracking-[0.25em] text-white uppercase group-hover:text-slate-300"
      >
        {site.author}
      </span>
    </a>

    <!-- Navigation Pills -->
    <div class="flex items-center p-1 shadow-purple-900/10 gap-5">
      {#each navItems as item}
        <a
          href={item.href}
          class={`relative flex items-center gap-2 p-2 rounded-sm text-md font-sans tracking-wide transition-all duration-300 ${
            $page.url.pathname === item.href
              ? "bg-slate-500 text-white shadow-md shadow-purple-500/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <span>{item.label}</span>
          
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="w-4 h-4"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d={navIcons[item.href] || navIcons["/"]} />
          </svg>
        </a>
      {/each}
    </div>
  </div>
</nav>