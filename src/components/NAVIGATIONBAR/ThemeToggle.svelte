<script lang="ts">
  import { Coffee, Moon } from "lucide-svelte";
  import { theme, themeToggle, darkModeStore } from "../../constants/_theme";
  import { onMount, onDestroy } from "svelte";

  let isDarkMode: boolean;
  let unsubscribe: (() => void) | null = null;

  onMount(() => {
    unsubscribe = darkModeStore.subscribe((value) => {
      isDarkMode = value;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", Boolean(isDarkMode));
      }
    });
  });

  onDestroy(() => {
    unsubscribe?.();
    unsubscribe = null;
  });

  function handleSwitchDarkMode() {
    darkModeStore.update((v) => !v);
  }
</script>

<button 
  on:click={handleSwitchDarkMode}
  class="p-2 rounded-lg transition-all duration-200 {$theme.bg.secondary} {$theme.border.default} border hover:scale-105"
  aria-label="Toggle theme"
>
  {#if isDarkMode}
    <Coffee class="h-5 w-5 {themeToggle.sun}" />
  {:else}
    <Moon class="h-5 w-5 {themeToggle.moon}" />
  {/if}
</button>
