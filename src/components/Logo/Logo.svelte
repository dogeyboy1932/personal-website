<script lang="ts">
  import { darkModeStore } from "../../lib/utils";

  let isDarkMode = true;

  darkModeStore.subscribe((value) => {
    isDarkMode = value;
  });
</script>

<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="currentColor"
  xmlns="http://www.w3.org/2000/svg"
  {...$$props}
>
  <path d="M2 3L12 24L24 3H18L12 13L8 3H6C" fill="url(#linear-gradient)" />
  <defs>
    <linearGradient id="linear-gradient" x1="0" y1="0" x2="100%" y2="0">
      {#if isDarkMode}
        <stop offset="0%" stop-color="#FFD700">
          <animate
            attributeName="stop-color"
            values="#FFD700; #FFA500; #FFEB3B; #FFA500; #FFD700;"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="100%" stop-color="#FF8C00">
          <animate
            attributeName="stop-color"
            values="#FF8C00; #FFB84D; #FFA500; #FFB84D; #FF8C00;"
            dur="3s"
            repeatCount="indefinite"
          />
        </stop>
      {:else}
        <stop offset="0%" stop-color="#F59E0B">
          <animate
            attributeName="stop-color"
            values="#F59E0B; #D97706; #B45309; #D97706; #F59E0B;"
            dur="5s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="100%" stop-color="#B45309">
          <animate
            attributeName="stop-color"
            values="#B45309; #D97706; #F59E0B; #D97706; #B45309;"
            dur="5s"
            repeatCount="indefinite"
          />
        </stop>
      {/if}
    </linearGradient>
  </defs>
</svg>
