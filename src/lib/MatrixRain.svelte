<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  
  import { tokens, channels, css } from "../constants/_tokens";


  let primaryColor: string;
  let secondaryColor: string;

  $: primaryColor = css($tokens, "rain");
  $: secondaryColor = css($tokens, "rain-tail");
  /* Painted over the previous frame at low alpha to fade the trails — must be the
     page ground, or light mode smears the trails grey. */
  $: fadeColor = `rgba(${channels($tokens, "rain-fade")}, 0.05)`;

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

    drops = Array(columns.length)
      .fill(0)
      .map(() => Math.floor(Math.random() * -100));

    if (ctx) {
      ctx.font = `${fontSize}px monospace`;
    }
  }

  const GLOW = 5;
  const PAD = GLOW + 3;
  let glyphs: HTMLCanvasElement[] = [];
  let glyphW = 0;
  let glyphH = 0;
  let glyphBaseline = 0;

  function buildGlyphs() {
    if (!browser) return;

    glyphW = fontSize + PAD * 2;
    glyphH = fontSize + PAD * 2;
    glyphBaseline = PAD + fontSize;

    glyphs = chars.split("").map((char) => {
      const sprite = document.createElement("canvas");
      sprite.width = glyphW;
      sprite.height = glyphH;
      const g = sprite.getContext("2d");
      if (!g) return sprite;

      g.font = `${fontSize}px monospace`;
      g.textAlign = "center";

      const gradient = g.createLinearGradient(0, glyphBaseline - fontSize, 0, glyphBaseline);
      gradient.addColorStop(0, primaryColor);
      gradient.addColorStop(1, secondaryColor);

      g.shadowBlur = GLOW;
      g.shadowColor = primaryColor;
      g.fillStyle = gradient;
      g.fillText(char, glyphW / 2, glyphBaseline);

      return sprite;
    });
  }

  $: if (browser && primaryColor && secondaryColor) buildGlyphs();

    /* Frame throttle.
     Stepping at ~20fps both slows the fall and cuts the canvas work to a third. */
  const STEP_MS = 50;
  let lastStep = 0;

  function draw(now = 0) {
    if (!ctx || !canvas) return;

    if (now - lastStep < STEP_MS) {
      animationFrame = requestAnimationFrame(draw);
      return;
    }
    lastStep = now;

    ctx.fillStyle = fadeColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < columns.length; i++) {
      const sprite = glyphs[Math.floor(Math.random() * glyphs.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      if (sprite) {
        ctx.drawImage(sprite, x - glyphW / 2, y - glyphBaseline);
      }

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
