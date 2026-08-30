<script lang="ts">
  import { tokens } from "./tokens";
  import { browser } from "$app/environment";
  import { onDestroy, onMount } from "svelte";

  type Particle = {
    x: number;
    y: number;
    size: number;
    life: number;
    maxLife: number;
    velocityX: number;
    velocityY: number;
  };

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D | null = null;
  let animationFrame = 0;
  let lastTimestamp = 0;
  let width = 0;
  let height = 0;
  let devicePixelRatio = 1;
  let pointerX = 0;
  let pointerY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let hasPointer = false;
  let reducedMotion = false;
  let idleSpawnAccumulator = 0;
  let particles: Particle[] = [];

  function resizeCanvas() {
    if (!canvas || !context) return;

    width = window.innerWidth;
    height = window.innerHeight;
    devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  function addParticles(amount: number) {
    for (let index = 0; index < amount; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 8 + Math.random() * 20;
      const maxLife = 0.45 + Math.random() * 0.35;

      particles.push({
        x: pointerX + (Math.random() - 0.5) * 8,
        y: pointerY + (Math.random() - 0.5) * 8,
        size: 1.5 + Math.random() * 2.5,
        life: maxLife,
        maxLife,
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed - 8,
      });
    }
  }

  function handlePointerMove(event: PointerEvent) {
    const nextX = event.clientX;
    const nextY = event.clientY;
    const distance = Math.hypot(nextX - pointerX, nextY - pointerY);

    pointerX = nextX;
    pointerY = nextY;

    if (!hasPointer) {
      cursorX = pointerX;
      cursorY = pointerY;
      hasPointer = true;
    }

    if (!reducedMotion) {
      addParticles(Math.min(5, Math.max(1, Math.ceil(distance / 18))));
    }
  }

  function drawParticles(delta: number) {
    if (!context) return;

    particles = particles.filter((particle) => particle.life > 0);

    for (const particle of particles) {
      particle.life -= delta;
      particle.x += particle.velocityX * delta;
      particle.y += particle.velocityY * delta;
      particle.velocityY += 18 * delta;

      const opacity = Math.max(0, particle.life / particle.maxLife);
      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(Math.PI / 4);
      context.globalAlpha = opacity;
      // Colour from the --cursor token (src/styles/tokens.css). Kept distinct
      // from --particles so the cursor trail and the title sparkles never
      // read as the same effect.
      context.fillStyle = `rgb(${$tokens.cursor ?? "226, 232, 240"})`;
      context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      context.restore();
    }
  }

  function animate(timestamp: number) {
    if (!context) return;

    const delta = Math.min((timestamp - lastTimestamp) / 1000 || 0.016, 0.05);
    lastTimestamp = timestamp;
    context.clearRect(0, 0, width, height);

    if (hasPointer) {
      cursorX += (pointerX - cursorX) * Math.min(1, delta * 14);
      cursorY += (pointerY - cursorY) * Math.min(1, delta * 14);

      if (!reducedMotion) {
        idleSpawnAccumulator += delta * 12;
        const idleParticleCount = Math.floor(idleSpawnAccumulator);
        if (idleParticleCount > 0) {
          addParticles(idleParticleCount);
          idleSpawnAccumulator -= idleParticleCount;
        }
      }

      drawParticles(delta);
    }

    animationFrame = requestAnimationFrame(animate);
  }

  onMount(() => {
    if (!browser) return;

    context = canvas.getContext("2d");
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    animationFrame = requestAnimationFrame(animate);
  });

  onDestroy(() => {
    if (!browser) return;

    window.removeEventListener("resize", resizeCanvas);
    window.removeEventListener("pointermove", handlePointerMove);
    cancelAnimationFrame(animationFrame);
  });
</script>

<canvas bind:this={canvas} class="pointer-events-none fixed inset-0 z-20 h-full w-full" aria-hidden="true"></canvas>
