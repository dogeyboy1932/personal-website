<script lang="ts">
  import { Coffee, Moon, Sun } from "lucide-svelte";
  import Button from "../../Button/Button.svelte";
  import { theme, themeToggle, darkModeStore } from "../../../lib/stores";
  import { onMount, onDestroy } from "svelte";

  let isDarkMode: boolean;
  let unsubscribe: (() => void) | null = null;

  onMount(() => {
    // Subscribe on the client and keep the document class in sync.
    unsubscribe = darkModeStore.subscribe((value) => {
      isDarkMode = value;
      if (typeof document !== "undefined") {
        // Use toggle with a boolean to avoid race conditions
        document.documentElement.classList.toggle("dark", Boolean(isDarkMode));
      }
    });
  });

  onDestroy(() => {
    unsubscribe?.();
    unsubscribe = null;
  });

  function handleSwitchDarkMode() {
    // Flip the store value. Let the subscription keep local state in sync.
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
