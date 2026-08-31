<script lang="ts">
  import { pageZoom, prefersReducedMotion, pointerOffset, POINTER_AWAY, sizeCanvas } from "../../lib/utils";
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { tokens, css } from "../../constants/_tokens";

  export let text = "";
  export let gap = 4;
  export let fontSize: number | undefined = undefined;
  export let font = "700 {size}px 'Space Grotesk', Inter, sans-serif";
  export let radius = 90;
  export let force = 2.4;
  export let spring = 0.09;
  export let friction = 0.86;
  export let color: string | undefined = undefined;
  export let look: "plain" | "nanotech" = "plain";
  export let linkDistance = 13;
  let klass = "";
  export { klass as class };

  interface Particle {
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
  let pointerX = POINTER_AWAY;
  let pointerY = POINTER_AWAY;

  $: fill = color ?? css($tokens, "ink");

  function build() {
    if (!host || !canvas) return;
    const rect = host.getBoundingClientRect();
    /* rect is in zoomed viewport px; the canvas draws in local units. */
    const zoom = pageZoom();
    width = rect.width / zoom;
    height = rect.height / zoom;
    if (width < 10 || height < 10) return;

    ctx = sizeCanvas(canvas, width, height);
    if (!ctx) return;

    const off = document.createElement("canvas");
    off.width = Math.floor(width);
    off.height = Math.floor(height);
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!octx) return;

    let size = fontSize ?? Math.floor(height * 0.72);
    const setFont = (px: number) => {
      octx.font = font.replace("{size}", String(px));
    };
    setFont(size);
    if (fontSize === undefined) {
      let guard = 40;
      while (octx.measureText(text).width > width * 0.98 && size > 8 && guard-- > 0) {
        size -= 2;
        setFont(size);
      }
    }

    octx.textBaseline = "middle";
    octx.textAlign = "left";
    /* The offscreen pass is a MASK — only its alpha is read, so the colour is arbitrary. */
    octx.fillStyle = "#fff";
    octx.fillText(text, 0, height / 2);

    const data = octx.getImageData(0, 0, off.width, off.height).data;
    const next: Particle[] = [];
    const step = Math.max(2, Math.floor(gap));

    for (let y = 0; y < off.height; y += step) {
      for (let x = 0; x < off.width; x += step) {
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

    const size = Math.max(1, gap - 0.4);

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

      ctx.shadowBlur = 0;
    }

    for (const p of particles) {
      const dx = p.x - pointerX;
      const dy = p.y - pointerY;
      const distSq = dx * dx + dy * dy;

      if (distSq < radius * radius && distSq > 0.01) {
        const dist = Math.sqrt(distSq);
        const push = ((radius - dist) / radius) * force;
        p.vx += (dx / dist) * push;
        p.vy += (dy / dist) * push;
      }

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
    ({ x: pointerX, y: pointerY } = pointerOffset(event, host));
  }

  function onPointerLeave() {
    pointerX = POINTER_AWAY;
    pointerY = POINTER_AWAY;
  }

  onMount(() => {
    if (!browser || prefersReducedMotion()) return;
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
