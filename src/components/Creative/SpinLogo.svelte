<!-- FX: spin-logo — grab the logo and tumble it in 3D; a flick coasts to a stop — on both axes, and
     it drifts slowly on its own as a hint that it is draggable. -->
<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";

  export let sensitivity = 1.6;
  export let friction = 0.965;
  export let maxVelocity = 26;
  export let perspective = 520;
  export let snapBack = false;
  /** Idle drift, deg/frame at peak. The motion is the affordance — a static
      logo gives no hint that it can be dragged. */
  export let drift = 0.055;
  let klass = "";
  export { klass as class };

  let el: HTMLDivElement;

  /** Rotation about each axis, in degrees. Unclamped — it is a free tumble. */
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

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const clamp = (v: number) => Math.max(-maxVelocity, Math.min(maxVelocity, v));

  function onPointerDown(event: PointerEvent) {
    // Left button / touch / pen only.
    if (event.button !== 0) return;
    // Deliberately does NOT cancel the loop — it keeps running and simply
    // returns early while `dragging`, so releasing needs no restart.
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

    /* dy is negated: screen Y grows downward while +rotateX tips the top
       away, so without the flip the logo fights the hand. */
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

    // Throw decay.
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

  /** Optional ease back to face-on once the spin dies out. */
  function settle() {
    cancelAnimationFrame(frame);
    const step = () => {
      // Shortest path back to a multiple of 360 on each axis independently.
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
    // Reduced motion: no ambient drift and no idle loop at all. A throw still
    // works — onPointerUp starts the loop on demand below.
    if (reducedMotion) return;
    t0 = performance.now();
    frame = requestAnimationFrame(tick);
  });

  // onDestroy also runs during SSR, where there is no rAF to cancel.
  onDestroy(() => {
    if (browser) cancelAnimationFrame(frame);
  });
</script>

<!-- Not interactive in the a11y sense — it's a decorative spin on a logo that is already inside a
     real link. -->
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
    /* Let the element own touch gestures so dragging doesn't scroll the page. */
    touch-action: none;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    /* Grows the hit box 45 -> 65px; the equal negative margin cancels it, so
       layout is unchanged. */
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
