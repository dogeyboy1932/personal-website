<script lang="ts">
  import { Moon, Sun } from "lucide-svelte";
  import Button from "./Button.svelte";
  import { darkModeStore } from "../../functions/utils";
  import { onMount } from "svelte";

  let isDarkMode = true; // Set initial value

  // Apply dark mode immediately
  if (typeof document !== "undefined") {
    document.documentElement.classList.add("dark");
  }

  darkModeStore.subscribe((value) => {
    isDarkMode = value;
    if (typeof document !== "undefined") {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  });

  function handleSwitchDarkMode() {
    isDarkMode = !isDarkMode;
    darkModeStore.set(isDarkMode);
  }
</script>

<Button variant="ghost" size="icon" on:click={handleSwitchDarkMode}>
  <Sun class="h-[1.5rem] w-[1.3rem] dark:hidden text-emerald-500" />
  <Moon class="hidden h-5 w-5 dark:block text-emerald-500" />
  <span class="sr-only">Toggle theme</span>
  <!-- </Button>le theme</span> -->
  <!-- </Button> -->
  <!-- theme</span> -->
</Button>
