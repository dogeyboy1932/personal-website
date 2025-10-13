<script lang="ts">
  import { Moon, Sun } from "lucide-svelte";
  import Button from "./Button.svelte";
  import { darkModeStore } from "../../lib/utils";
  import { onMount, onDestroy } from "svelte";

  let isDarkMode = true;
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

<!-- <Button variant="ghost" size="icon" on:click={handleSwitchDarkMode}>
  <Sun class="h-[1.5rem] w-[1.3rem] hidden text-slate-500" />
  <Moon class="hidden h-5 w-5 block text-slate-500" />
  <span class="sr-only">Toggle theme</span>
</Button> -->
