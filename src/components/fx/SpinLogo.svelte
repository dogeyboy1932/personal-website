<!--
  FX: spin-logo
  Source: no React original — brief line "Make the logo spinnable...I can drag it
  in any direction." Built from scratch.

  Wraps any slotted content in a drag-to-rotate surface: grab it, throw it, and
  it keeps spinning and decays to a stop. Direction follows the drag, so a
  counter-clockwise flick spins counter-clockwise.

  Used by: src/components/NavigationBar/NavigationBar.svelte (wraps <Logo />)

  Tunables:
    friction      per-frame velocity multiplier while coasting   default 0.94
                  (higher = longer spin; 1.0 would never stop)
    maxVelocity   deg/frame ceiling, stops absurd flicks         default 28
    snapBack      if true, eases back to 0deg after coasting     default false
    clickSlop     deg of rotation still treated as a click       default 4

  The logo lives inside the navbar's <a href="/">, so a drag must not navigate.
  Rotating past `clickSlop` arms a one-shot capture-phase click swallower; a
  plain click (no rotation) falls through to the link untouched.

  Respects prefers-reduced-motion by skipping the coast — drag still works,
  it just stops when you let go.
-->
<script lang="ts">
  import { onDestroy } from "svelte";
  import { browser } from "$app/environment";

  export let friction = 0.94;
  export let maxVelocity = 28;
  export let snapBack = false;
  export let clickSlop = 4;
  let klass = "";
  export { klass as class };

  let el: HTMLDivElement;
  let rotation = 0;
  let velocity = 0;
  let dragging = false;
  let frame = 0;

  let lastAngle = 0;
  let lastTime = 0;
  /** Total absolute rotation this gesture — decides drag vs. click. */
  let travel = 0;

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  /** Pointer angle in degrees, measured from the element's center. */
  function angleFromCenter(event: PointerEvent): number {
    const box = el.getBoundingClientRect();
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    return (Math.atan2(event.clientY - cy, event.clientX - cx) * 180) / Math.PI;
  }

  /** Wrap into (-180, 180] so crossing the ±180 seam doesn't spike the delta. */
  function normalize(deg: number): number {
    return ((((deg + 180) % 360) + 360) % 360) - 180;
  }

  function onPointerDown(event: PointerEvent) {
    // Left button / touch / pen only.
    if (event.button !== 0) return;
    cancelAnimationFrame(frame);
    dragging = true;
    velocity = 0;
    travel = 0;
    lastAngle = angleFromCenter(event);
    lastTime = event.timeStamp;
    el.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging) return;
    const angle = angleFromCenter(event);
    const delta = normalize(angle - lastAngle);
    const dt = Math.max(event.timeStamp - lastTime, 1);

    rotation += delta;
    travel += Math.abs(delta);

    // Velocity in deg/frame, assuming ~60fps, clamped both ways.
    const perFrame = (delta / dt) * 16.67;
    velocity = Math.max(-maxVelocity, Math.min(maxVelocity, perFrame));

    lastAngle = angle;
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

    if (!reducedMotion && Math.abs(velocity) > 0.15) coast();
    else if (snapBack) settle();
  }

  /** Free spin decaying by `friction` each frame. */
  function coast() {
    cancelAnimationFrame(frame);
    const step = () => {
      rotation += velocity;
      velocity *= friction;
      if (Math.abs(velocity) > 0.05) {
        frame = requestAnimationFrame(step);
      } else if (snapBack) {
        settle();
      }
    };
    frame = requestAnimationFrame(step);
  }

  /** Optional ease back to upright once the spin dies out. */
  function settle() {
    cancelAnimationFrame(frame);
    const step = () => {
      // Shortest path back to a multiple of 360.
      const target = Math.round(rotation / 360) * 360;
      const diff = target - rotation;
      if (Math.abs(diff) < 0.1) {
        rotation = target;
        return;
      }
      rotation += diff * 0.12;
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
  style="transform: rotate({rotation}deg);"
  on:pointerdown={onPointerDown}
  on:pointermove={onPointerMove}
  on:pointerup={onPointerUp}
  on:pointercancel={onPointerUp}
  on:dragstart|preventDefault
>
  <slot />
</div>

<style>
  .fx-spin-logo {
    display: inline-flex;
    /* Let the element own touch gestures so dragging doesn't scroll the page. */
    touch-action: none;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }
  .is-dragging {
    cursor: grabbing;
  }
</style>
