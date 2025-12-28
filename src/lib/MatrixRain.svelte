<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  
  import { theme } from "./stores";
  import { darkModeStore } from "./utils";


  
  let isDarkMode: boolean
  $: isDarkMode  = $darkModeStore;

  let primaryColor: string;
  let secondaryColor: string;

  $: primaryColor = isDarkMode ? "#0066ff" : "#e69a0dd3";
  $: secondaryColor = isDarkMode ? "#00ccff" : "#cb880dd3";



  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let animationFrame: number;
  let width = 0;
  let height = 0;


  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
  const fontSize = 14;
  let columns: number[] = [];
  let drops: number[] = [];


  function initMatrix() {
    if (!browser) return;

    width = window.innerWidth;
    height = window.innerHeight;

    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    columns = Array(Math.floor(width / fontSize))
      .fill(0)
      .map(() => Math.floor(Math.random() * -100));

    drops = Array(columns.length).fill(0);

    if (ctx) {
      ctx.font = `${fontSize}px monospace`;
    }
  }

  function draw() {
    if (!ctx || !canvas) return;

    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = primaryColor;
    ctx.textAlign = "center";

    for (let i = 0; i < columns.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.shadowBlur = 5;
      ctx.shadowColor = primaryColor;

      const gradient = ctx.createLinearGradient(x, y - fontSize, x, y);
      gradient.addColorStop(0, primaryColor);
      gradient.addColorStop(1, secondaryColor);
      ctx.fillStyle = gradient;

      ctx.fillText(char, x, y);

      ctx.shadowBlur = 0;

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    animationFrame = requestAnimationFrame(draw);
  }

  onMount(() => {
    if (!browser) return;

    ctx = canvas.getContext("2d")!;
    initMatrix();
    draw();

    window.addEventListener("resize", initMatrix);
  });

  onDestroy(() => {
    if (!browser) return;

    window.removeEventListener("resize", initMatrix);
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });
</script>

<canvas bind:this={canvas} class="fixed top-0 left-0 w-full h-full -z-10" />
