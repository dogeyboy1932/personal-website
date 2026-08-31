<script lang="ts">
  import { prefersReducedMotion } from "../../lib/utils";
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";

  export let sensitivity = 1.6;
  export let friction = 0.965;
  export let maxVelocity = 26;
  export let perspective = 520;
  export let snapBack = false;
  export let drift = 0.055;
  let klass = "";
  export { klass as class };

  let el: HTMLDivElement;

  let rotX = 0;
  let rotY = 0;
  let velX = 0;
  let velY = 0;

  let dragging = false;
  let frame = 0;
  let t0 = 0;

  let lastX = 0;
  let lastY = 0;
  let lastTime = 0;

  const reducedMotion = prefersReducedMotion();

  const clamp = (v: number) => Math.max(-maxVelocity, Math.min(maxVelocity, v));

  function onPointerDown(event: PointerEvent) {
    if (event.button !== 0) return;
    // Deliberately does NOT cancel the loop — it keeps running and simply
    dragging = true;
    velX = 0;
    velY = 0;
    lastX = event.clientX;
    lastY = event.clientY;
    lastTime = event.timeStamp;
    el.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging) return;

    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    const dt = Math.max(event.timeStamp - lastTime, 1);

    rotY += dx * sensitivity;
    rotX -= dy * sensitivity;

    // deg/frame at ~60fps, clamped per axis.
    velY = clamp((dx * sensitivity) / dt * 16.67);
    velX = clamp((-dy * sensitivity) / dt * 16.67);

    lastX = event.clientX;
    lastY = event.clientY;
    lastTime = event.timeStamp;
  }

  function onPointerUp(event: PointerEvent) {
    if (!dragging) return;
    dragging = false;
    if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
    if (snapBack && Math.hypot(velX, velY) <= 0.15) settle();
  }

    /* One loop for both the throw decay and the idle drift: two would fight over the same rAF handle,
     and drift rides on top of the decay so the logo never stops dead then twitches back to life. */
  function tick(now: number) {
    frame = requestAnimationFrame(tick);
    if (dragging) return;

    if (Math.hypot(velX, velY) > 0.05) {
      rotX += velX;
      rotY += velY;
      velX *= friction;
      velY *= friction;
    } else if (velX || velY) {
      velX = 0;
      velY = 0;
      if (snapBack) settle();
    }

    // Two sines at unrelated frequencies so the pattern never visibly repeats.
    const t = now - t0;
    rotY += Math.sin(t * 0.00041) * drift;
    rotX += Math.sin(t * 0.00027 + 1.7) * drift * 0.62;
  }

  function settle() {
    cancelAnimationFrame(frame);
    const step = () => {
      const tx = Math.round(rotX / 360) * 360;
      const ty = Math.round(rotY / 360) * 360;
      const dx = tx - rotX;
      const dy = ty - rotY;
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        rotX = tx;
        rotY = ty;
        return;
      }
      rotX += dx * 0.12;
      rotY += dy * 0.12;
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
  }

  onMount(() => {
    if (reducedMotion) return;
    t0 = performance.now();
    frame = requestAnimationFrame(tick);
  });

  onDestroy(() => {
    if (browser) cancelAnimationFrame(frame);
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  bind:this={el}
  class="fx-spin-logo {klass}"
  class:is-dragging={dragging}
  style="--sl-perspective: {perspective}px;"
  on:pointerdown={onPointerDown}
  on:pointermove={onPointerMove}
  on:pointerup={onPointerUp}
  on:pointercancel={onPointerUp}
  on:dragstart|preventDefault
>
  <!-- CAVEAT: perspective on the wrapper, rotation on the child. Both on one
       element flattens the 3D. -->
  <span class="fx-sl-inner" style="transform: rotateX({rotX}deg) rotateY({rotY}deg);">
    <slot />
  </span>
</div>

<style>
  .fx-spin-logo {
    display: inline-flex;
    perspective: var(--sl-perspective, 520px);
    touch-action: none;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    padding: 8px;
    margin: -8px;
  }

  .is-dragging {
    cursor: grabbing;
  }

  .fx-sl-inner {
    display: inline-flex;
    transform-style: preserve-3d;
    /* No will-change: this site hit single-digit fps once over speculatively
       promoted layers. */
  }
</style>
