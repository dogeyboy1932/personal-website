<!-- FX: sparkles + gravity-stars — drifting motes that scatter from the cursor. — PERFORMANCE:
     particles are pre-rendered once to an offscreen sprite and blitted with drawImage. -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { darkModeStore } from "../../lib/stores";
  import { tokens, channels } from "../../lib/tokens";

  export let density = 5.5;
  export let minSize = 0.6;
  export let maxSize = 1.9;
    /** DEFAULT 0 — any non-zero value makes the whole field fall in unison, which reads as rain rather
     than sparkle. */
  export let gravity = 0;
  export let drift = 0.22;
  export let twinkle = 3.2;
  export let pointerPull = 130;
  export let color: string | null = null;
    /** Px the field extends ABOVE and BELOW its container. */
  export let bleedTop = 0;
  export let bleedBottom = 0;
  let klass = "";
  export { klass as class };

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    /** Persistent heading, radians. Turns slowly; never damped to zero. */
    angle: number;
    /** Constant px/frame along `angle`. */
    speed: number;
    /** Radians/frame the heading wanders by. */
    turn: number;
    r: number;
    /** Radians; advances each frame to drive the twinkle. */
    phase: number;
    phaseStep: number;
    /** Per-particle brightness ceiling, so the field isn't uniform. */
    peak: number;
  }

  let host: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;
  let particles: Particle[] = [];
  let frame = 0;
  let observer: ResizeObserver | null = null;

  let width = 0;
  let height = 0;
  let pointerX = -9999;
  let pointerY = -9999;

    /** Pre-rendered glow sprite. */
  const SPRITE_R = 8;
  const SPRITE_SIZE = SPRITE_R * 6;
  let sprite: HTMLCanvasElement | null = null;

  function buildSprite() {
    if (!browser) return;
    const c = document.createElement("canvas");
    c.width = SPRITE_SIZE;
    c.height = SPRITE_SIZE;
    const g = c.getContext("2d");
    if (!g) return;

    const mid = SPRITE_SIZE / 2;
    // Solid core out to SPRITE_R, then a soft falloff standing in for the glow.
    const grad = g.createRadialGradient(mid, mid, 0, mid, mid, mid);
    grad.addColorStop(0, `rgba(${rgb}, 1)`);
    grad.addColorStop(SPRITE_R / mid, `rgba(${rgb}, 0.85)`);
    grad.addColorStop(0.55, `rgba(${rgb}, 0.25)`);
    grad.addColorStop(1, `rgba(${rgb}, 0)`);

    g.fillStyle = grad;
    g.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
    sprite = c;
  }

  // Rebuild when the theme changes the particle color.
  $: if (browser && rgb) buildSprite();

  /* CAVEAT: `color` overrides the token only when it is a numeric triple — a
     stale keyword reaching canvas as rgba(warm,1) throws and kills hydration. */
  $: isDark = $darkModeStore;

  $: rgb =
    color && /^\s*\d+\s*[, ]\s*\d+\s*[, ]\s*\d+\s*$/.test(color)
      ? color.trim().split(/[\s,]+/).join(", ")
      : channels($tokens, "particles");

  const reducedMotion = () =>
    browser && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  function spawn(w: number, h: number): Particle {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      // Persistent heading on the unit circle, so the field has no shared axis.
      ...(() => {
        const a = Math.random() * Math.PI * 2;
        const sp = drift * (0.45 + Math.random() * 0.9);
        return {
          angle: a,
          speed: sp,
          turn: (Math.random() - 0.5) * 0.02,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
        };
      })(),
      r: minSize + Math.random() * (maxSize - minSize),
      phase: Math.random() * Math.PI * 2,
      // 60fps assumed; a full cycle takes `twinkle` seconds.
      phaseStep: (Math.PI * 2) / (twinkle * 60) * (0.6 + Math.random() * 0.8),
      peak: 0.35 + Math.random() * 0.65,
    };
  }

  function resize() {
    if (!canvas || !host) return;
    const rect = host.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx = canvas.getContext("2d");
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = Math.round((width * height) / 10000 * density);
    particles = Array.from({ length: Math.max(target, 8) }, () => spawn(width, height));
  }

  function step() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
            /* Motion is a PERSISTENT heading that slowly turns, not a damped random walk. */
      p.angle += p.turn;
      p.vx = Math.cos(p.angle) * p.speed;
      p.vy = Math.sin(p.angle) * p.speed + gravity;

      // Cursor attraction — the "gravity" the brief asked for reads best as
      // something the pointer can bend, not just a constant downward pull.
      if (pointerPull > 0) {
        const dx = pointerX - p.x;
        const dy = pointerY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < pointerPull && dist > 1) {
          // Bends this frame's velocity only; vx/vy are recomputed from the
          // heading next frame, so the pull never accumulates into a drift.
          const pull = (1 - dist / pointerPull) * 0.7;
          p.vx += (dx / dist) * pull;
          p.vy += (dy / dist) * pull;
        }
      }

      p.x += p.vx;
      p.y += p.vy;
      p.phase += p.phaseStep;

            /* Wrap on all four edges rather than respawning at the top. */
      const M = 6;
      if (p.x < -M) p.x = width + M;
      else if (p.x > width + M) p.x = -M;
      if (p.y < -M) p.y = height + M;
      else if (p.y > height + M) p.y = -M;

      // sin() maps to [0,1] for the twinkle; never fully off, so points don't
      // pop in and out.
      const alpha = (0.25 + 0.75 * (0.5 + 0.5 * Math.sin(p.phase))) * p.peak;

      if (sprite) {
        // Scale the sprite so its solid core matches this particle's radius.
        const size = (p.r / SPRITE_R) * SPRITE_SIZE;
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }
    }
    ctx.globalAlpha = 1;

    frame = requestAnimationFrame(step);
  }

  function onPointerMove(event: PointerEvent) {
    const rect = host.getBoundingClientRect();
    pointerX = event.clientX - rect.left;
    pointerY = event.clientY - rect.top;
  }

  function onPointerLeave() {
    pointerX = -9999;
    pointerY = -9999;
  }

  onMount(() => {
    if (!browser || reducedMotion()) return;
    resize();
    observer = new ResizeObserver(resize);
    observer.observe(host);
    frame = requestAnimationFrame(step);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
  });

  onDestroy(() => {
    if (!browser) return;
    cancelAnimationFrame(frame);
    observer?.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerleave", onPointerLeave);
  });
</script>

<div
  bind:this={host}
  class="fx-sparkle-field {klass}"
  style="--sf-top: {-bleedTop}px; --sf-bottom: {-bleedBottom}px;"
  aria-hidden="true"
>
  <canvas bind:this={canvas} />
</div>

<style>
  .fx-sparkle-field {
    position: absolute;
    inset: 0;
    /* Overridden by the bleed props; 0 by default so this is inset:0. */
    top: var(--sf-top, 0px);
    bottom: var(--sf-bottom, 0px);
    pointer-events: none;
    overflow: hidden;
  }
  .fx-sparkle-field canvas {
    display: block;
  }
  @media (prefers-reduced-motion: reduce) {
    .fx-sparkle-field {
      display: none;
    }
  }
</style>
