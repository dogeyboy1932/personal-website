<!--
  FX: sparkles + gravity-stars
  Source: https://ui.aceternity.com/components/sparkles  (React)
      and https://animate-ui.com/docs/components/backgrounds/gravity-stars  (React)
  Both reimplemented in Svelte, fused into one canvas.

  The brief asked for both over the same region ("In the entire title section
  with my name, my university and the 3 links, there should be sparkles of some
  kind... Then those sparkles or stars should have a gravity movement"). Two
  separate components would mean two canvases and two rAF loops stacked on the
  same box, so they share one render loop here: every particle twinkles like a
  sparkle AND is integrated under gravity like a star.

  Used by: src/routes/+page.svelte (hero title block)

  Tunables:
    density     particles per 10,000 px^2 of container    default 1.6
    minSize     smallest particle radius, px              default 0.6
    maxSize     largest particle radius, px               default 1.9
    gravity     downward acceleration, px/frame^2         default 0.0055
    drift       horizontal wander strength                default 0.16
    twinkle     seconds for a full opacity cycle          default 2.4
    pointerPull cursor attraction radius in px (0 = off)  default 130
    color       null = use the --particles token; or an explicit "r, g, b"

  Particles that fall past the bottom respawn at the top, so the field is
  self-sustaining without unbounded allocation. Sized by ResizeObserver and
  DPR-aware. Fully skipped under prefers-reduced-motion.
-->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { darkModeStore } from "../../lib/stores";

  export let density = 1.6;
  export let minSize = 0.6;
  export let maxSize = 1.9;
  export let gravity = 0.0055;
  export let drift = 0.16;
  export let twinkle = 2.4;
  export let pointerPull = 130;
  export let color: string | null = null;
  let klass = "";
  export { klass as class };

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
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

  /**
   * Pre-rendered glow sprite.
   *
   * The draw loop used to set ctx.shadowBlur per particle per frame — with ~130
   * particles that is ~8000 shadowed fills a second, and canvas shadowBlur is
   * among the slowest 2D operations available. Every particle is the same dot
   * at a different size and alpha, so it is rasterised once and blitted with
   * drawImage instead. Same look, a fraction of the cost.
   */
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

  /*
    Colour comes from the --particles token (src/styles/tokens.css), read off
    the document at runtime, so recolouring the site never means editing this
    file. `color` overrides it per call site when a one-off is wanted.

    Tokens are space-separated RGB channels; canvas needs comma-separated, hence
    the split/join.
  */
  $: isDark = $darkModeStore;
  let tokenRgb = "34, 211, 238";
  function readToken() {
    if (!browser) return;
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--particles")
      .trim();
    if (raw) tokenRgb = raw.split(/\s+/).join(", ");
  }
  // Re-read on theme flip: the light palette redefines the token.
  $: if (browser && isDark !== undefined) readToken();
  /* Only a numeric triple is accepted as an override. A stale keyword from an
     old call site would otherwise reach the canvas as rgba(warm, 1) and throw
     during hydration, taking the rest of the page's onMount work with it. */
  $: rgb = color && /^\s*\d+\s*[, ]\s*\d+\s*[, ]\s*\d+\s*$/.test(color)
    ? color.trim().split(/[\s,]+/).join(", ")
    : tokenRgb;

  const reducedMotion = () =>
    browser && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  function spawn(w: number, h: number, atTop = false): Particle {
    return {
      x: Math.random() * w,
      // atTop = respawning a particle that fell out; start it just above the box.
      y: atTop ? -Math.random() * h * 0.25 : Math.random() * h,
      vx: (Math.random() - 0.5) * drift,
      vy: Math.random() * 0.12,
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
      // Gravity, plus a slow horizontal wander so the fall isn't a straight line.
      p.vy += gravity;
      p.vx += (Math.random() - 0.5) * drift * 0.04;
      p.vx *= 0.995;

      // Cursor attraction — the "gravity" the brief asked for reads best as
      // something the pointer can bend, not just a constant downward pull.
      if (pointerPull > 0) {
        const dx = pointerX - p.x;
        const dy = pointerY - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < pointerPull && dist > 1) {
          const pull = (1 - dist / pointerPull) * 0.05;
          p.vx += (dx / dist) * pull;
          p.vy += (dy / dist) * pull;
        }
      }

      p.x += p.vx;
      p.y += p.vy;
      p.phase += p.phaseStep;

      // Recycle rather than allocate: keeps the particle count flat.
      if (p.y > height + 8 || p.x < -20 || p.x > width + 20) {
        Object.assign(p, spawn(width, height, true));
      }

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

<div bind:this={host} class="fx-sparkle-field {klass}" aria-hidden="true">
  <canvas bind:this={canvas} />
</div>

<style>
  .fx-sparkle-field {
    position: absolute;
    inset: 0;
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
