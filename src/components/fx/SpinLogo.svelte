<!--
  FX: spin-logo
  Source: no React original — brief line "Make the logo spinnable...I can drag it
  in any direction", later "the logo should be 3d spinnable". Built from scratch.

  Grab the logo and tumble it in 3D: horizontal drag spins it about Y, vertical
  drag about X, and a flick keeps spinning and decays to a stop on both axes at
  once. Direction follows the drag.

  WHAT CHANGED FROM THE 2D VERSION. It used to measure the pointer's ANGLE about
  the element's centre and apply a single rotate() — a flat spin in the page
  plane, which can only ever turn like a steering wheel. "Drag in any direction"
  was satisfied only in the sense that both directions of one axis worked.

  3D needs the opposite input: not the angle to the centre but the pointer's
  DELTA, because dx and dy map to two independent axes. So the whole input model
  changed, not just the transform.

  Used by: src/components/NavigationBar/NavigationBar.svelte (wraps <Logo />)

  Tunables:
    sensitivity   degrees of rotation per px of drag            default 0.55
    friction      per-frame velocity multiplier while coasting  default 0.94
                  (higher = longer spin; 1.0 would never stop)
    maxVelocity   deg/frame ceiling per axis, stops absurd flicks default 26
    perspective   px; smaller = stronger foreshortening         default 520
    snapBack      if true, eases back to flat after coasting     default false
    clickSlop     px of pointer travel still treated as a click  default 4

  The logo lives inside the navbar's <a href="/">, so a drag must not navigate.
  Moving past `clickSlop` arms a one-shot capture-phase click swallower; a plain
  click (no movement) falls through to the link untouched.

  A logo is a flat plane, so edge-on it goes to a sliver and then shows its back
  — which is what a real card does when you tumble it, and is the whole reason
  this reads as 3D rather than as a scaling trick.

  Respects prefers-reduced-motion by skipping the coast — drag still works, it
  just stops when you let go.
-->
<script lang="ts">
  import { onDestroy } from "svelte";
  import { browser } from "$app/environment";

  /*
    TUNED FOR EFFORT, not for restraint. ("It's hard to spin the logo")

    At the old 0.55 deg/px a full revolution took 655px of dragging — most of
    the screen — on a 45px target. 1.6 brings that to 225px, a comfortable
    flick of the wrist.
  */
  export let sensitivity = 1.6;
  /*
    0.94 decayed a 15 deg/frame flick to a stop in 1.5s, sweeping 235deg — it
    stopped before completing a turn, so a throw never felt like a throw. 0.965
    coasts 2.7s and sweeps 414deg, so a flick carries past a full rotation.
  */
  export let friction = 0.965;
  export let maxVelocity = 26;
  export let perspective = 520;
  export let snapBack = false;
  export let clickSlop = 4;
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

  let lastX = 0;
  let lastY = 0;
  let lastTime = 0;
  /** Total pointer travel this gesture, in px — decides drag vs. click. */
  let travel = 0;

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const clamp = (v: number) => Math.max(-maxVelocity, Math.min(maxVelocity, v));

  function onPointerDown(event: PointerEvent) {
    // Left button / touch / pen only.
    if (event.button !== 0) return;
    cancelAnimationFrame(frame);
    dragging = true;
    velX = 0;
    velY = 0;
    travel = 0;
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

    /*
      Horizontal drag spins about Y, vertical about X. dy is NEGATED because
      screen Y grows downward while a positive rotateX tips the top away — so
      without the sign flip, dragging down would tip the logo up and the object
      would feel like it was fighting the hand.
    */
    rotY += dx * sensitivity;
    rotX -= dy * sensitivity;
    travel += Math.abs(dx) + Math.abs(dy);

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

    if (travel > clickSlop) {
      // This gesture was a spin, not a click — swallow the click the browser is
      // about to synthesize, before it reaches the wrapping <a>.
      const swallow = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      };
      window.addEventListener("click", swallow, { capture: true, once: true });
      // If no click follows (drag ended off-element), don't leave it armed.
      setTimeout(() => window.removeEventListener("click", swallow, { capture: true }), 300);
    }

    if (!reducedMotion && Math.hypot(velX, velY) > 0.15) coast();
    else if (snapBack) settle();
  }

  /** Free tumble on both axes, decaying by `friction` each frame. */
  function coast() {
    cancelAnimationFrame(frame);
    const step = () => {
      rotX += velX;
      rotY += velY;
      velX *= friction;
      velY *= friction;
      if (Math.hypot(velX, velY) > 0.05) {
        frame = requestAnimationFrame(step);
      } else if (snapBack) {
        settle();
      }
    };
    frame = requestAnimationFrame(step);
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

  // onDestroy also runs during SSR, where there is no rAF to cancel.
  onDestroy(() => {
    if (browser) cancelAnimationFrame(frame);
  });
</script>

<!--
  Not interactive in the a11y sense — it's a decorative spin on a logo that is
  already inside a real link. Keyboard users get the link; there is no
  keyboard-reachable state here to miss.
-->
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
  <!--
    Perspective on the wrapper, rotation on the child. Both on one element
    flattens the 3D — the same rule FX:flip-card documents, and the reason this
    needs an inner span it did not need in 2D.
  -->
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
    /*
      A BIGGER GRAB TARGET AT NO LAYOUT COST. The logo is 45x45, which is a
      small thing to catch precisely before a drag even starts. The padding
      grows the hit box to 61x61; the equal negative margin cancels it, so the
      navbar lays out exactly as before. Purely a hit-area change.
    */
    padding: 8px;
    margin: -8px;
  }

  .is-dragging {
    cursor: grabbing;
  }

  .fx-sl-inner {
    display: inline-flex;
    transform-style: preserve-3d;
    /*
      Deliberately NO will-change. The site has been to single-digit fps once
      over speculatively promoted layers; a transform on an element this small
      is composited anyway, and this one is idle almost all the time.
    */
  }
</style>
