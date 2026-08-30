<!--
  FX: particle-text
  Source: https://reactbits.dev/text-animations/particle-text (React) — reimplemented in Svelte

  The name rendered as a cloud of particles that scatter away from the cursor
  and spring back into the letterforms.

  Used by: src/routes/+page.svelte — but ONLY when homeHero.particleName is
  true. The brief flagged this one as "we'll see if it's worth keeping", and it
  competes with FX:sparkles over the same title block, so it ships behind a
  flag rather than as a revert-or-nothing change. Flip the constant to compare.

  Tunables:
    text        the string to render
    gap         px between sampled points — LOWER IS DENSER AND MUCH SLOWER
                (cost is O(1/gap^2)); default 4
    fontSize    px; falls back to fitting the container width
    font        canvas font stack; defaults to the site's display face
    radius      cursor repulsion radius, px       default 90
    force       repulsion strength                default 2.4
    spring      pull back toward home, 0..1       default 0.09
    friction    velocity damping, 0..1            default 0.86
    color       particle color; defaults to theme
    look        "nanotech" adds glow + neighbour links; "plain" is flat dots
    linkDistance  px; how close two particles must be to be linked

  How it works: the text is rasterized once to an offscreen canvas, then
  getImageData is sampled on a `gap` grid; every opaque pixel becomes a
  particle whose home is that coordinate. Per frame each particle is pushed
  away from the cursor and pulled back home under a spring.

  Falls back to plain rendered text when the canvas is unavailable or motion
  is reduced — the name must always be readable and selectable, so a real <h1>
  is present either way and only visually hidden when the canvas takes over.
-->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { darkModeStore } from "../../lib/stores";

  export let text = "";
  export let gap = 4;
  export let fontSize: number | undefined = undefined;
  export let font = "700 {size}px 'Space Grotesk', Inter, sans-serif";
  export let radius = 90;
  export let force = 2.4;
  export let spring = 0.09;
  export let friction = 0.86;
  export let color: string | undefined = undefined;
  /**
   * "nanotech" — particles snap to a lattice, glow, and link to nearby
   * neighbours with hairlines, so the name reads as an assembling structure
   * rather than a dot-matrix print. "plain" is the original flat dots.
   */
  export let look: "plain" | "nanotech" = "plain";
  /** Max px between two particles for a connecting line to be drawn. */
  export let linkDistance = 13;
  let klass = "";
  export { klass as class };

  interface Particle {
    /** Home position — where the letterform wants this dot. */
    hx: number;
    hy: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
  }

  let host: HTMLDivElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;
  let particles: Particle[] = [];
  let frame = 0;
  let observer: ResizeObserver | null = null;
  let active = false;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let pointerX = -9999;
  let pointerY = -9999;

  $: isDark = $darkModeStore;
  /* Pure white in dark mode: the side beams wash warm light across the name and
     were knocking the old slate-200 down to a muddy grey. ("make my particle
     name a bit brighter. the beams are darkening it") */
  $: fill = color ?? (isDark ? "#ffffff" : "#0f172a");

  const reducedMotion = () =>
    browser && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  /** Rasterize the text offscreen and turn its opaque pixels into particles. */
  function build() {
    if (!host || !canvas) return;
    const rect = host.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (width < 10 || height < 10) return;

    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const off = document.createElement("canvas");
    off.width = Math.floor(width);
    off.height = Math.floor(height);
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!octx) return;

    // Size the type to the box unless an explicit size was given.
    let size = fontSize ?? Math.floor(height * 0.72);
    const setFont = (px: number) => {
      octx.font = font.replace("{size}", String(px));
    };
    setFont(size);
    if (fontSize === undefined) {
      // Shrink until it fits the available width.
      let guard = 40;
      while (octx.measureText(text).width > width * 0.98 && size > 8 && guard-- > 0) {
        size -= 2;
        setFont(size);
      }
    }

    octx.textBaseline = "middle";
    octx.textAlign = "left";
    octx.fillStyle = "#fff";
    octx.fillText(text, 0, height / 2);

    const data = octx.getImageData(0, 0, off.width, off.height).data;
    const next: Particle[] = [];
    const step = Math.max(2, Math.floor(gap));

    for (let y = 0; y < off.height; y += step) {
      for (let x = 0; x < off.width; x += step) {
        // Alpha channel of this pixel; anything mostly-opaque is ink.
        if (data[(y * off.width + x) * 4 + 3] > 128) {
          next.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 });
        }
      }
    }

    particles = next;
  }

  function step() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = fill;

    const size = Math.max(1, gap - 1.6);

    /*
      Nanotech pass: hairlines between near neighbours, drawn BEFORE the dots
      so the nodes sit on top of their own links.

      Cost control matters here — naive all-pairs is O(n^2) over a few thousand
      particles. Particles are generated in row-major order, so neighbours in
      the array are neighbours in space; comparing each particle to a short
      forward window gets the lattice look at O(n).
    */
    if (look === "nanotech" && particles.length) {
      ctx.strokeStyle = fill;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.28;
      ctx.beginPath();
      const WINDOW = 3;
      const maxSq = linkDistance * linkDistance;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j <= i + WINDOW && j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy < maxSq) {
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
          }
        }
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      // One cheap shadow setup for the whole pass, not per particle — canvas
      // shadowBlur per item per frame is what tanked the site once already.
      ctx.shadowBlur = 8;
      ctx.shadowColor = fill;
    }

    for (const p of particles) {
      const dx = p.x - pointerX;
      const dy = p.y - pointerY;
      const distSq = dx * dx + dy * dy;

      // Push away from the cursor, strongest at the centre of the radius.
      if (distSq < radius * radius && distSq > 0.01) {
        const dist = Math.sqrt(distSq);
        const push = ((radius - dist) / radius) * force;
        p.vx += (dx / dist) * push;
        p.vy += (dy / dist) * push;
      }

      // Spring home, damped — this is what reassembles the letterforms.
      p.vx += (p.hx - p.x) * spring;
      p.vy += (p.hy - p.y) * spring;
      p.vx *= friction;
      p.vy *= friction;
      p.x += p.vx;
      p.y += p.vy;

      ctx.fillRect(p.x, p.y, size, size);
    }

    ctx.shadowBlur = 0;
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
    build();
    if (particles.length === 0) return;
    active = true;
    observer = new ResizeObserver(() => {
      build();
    });
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

<div bind:this={host} class="fx-particle-text {klass}">
  <!-- The real text is always in the DOM: selectable, searchable, and read by
       screen readers. It is only visually hidden once the canvas has actually
       produced particles, so a canvas failure degrades to plain text. -->
  <span class="fx-pt-text" class:is-hidden={active}>{text}</span>
  <canvas bind:this={canvas} class="fx-pt-canvas" class:is-shown={active} aria-hidden="true" />
</div>

<style>
  .fx-particle-text {
    position: relative;
    display: block;
    width: 100%;
  }

  .fx-pt-text {
    display: block;
  }

  .is-hidden {
    /* Not display:none — the element still has to lay out so the canvas
       inherits a sensible box, and it must stay reachable to assistive tech. */
    visibility: hidden;
  }

  .fx-pt-canvas {
    position: absolute;
    inset: 0;
    display: none;
    pointer-events: none;
  }

  .fx-pt-canvas.is-shown {
    display: block;
  }
</style>
