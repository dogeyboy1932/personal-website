<!--
  FX: side-rays
  Source: https://reactbits.dev/backgrounds/side-rays (React) — reimplemented in Svelte

  Volumetric light rays fanning in from one edge, drifting and breathing. Pure
  CSS: a stack of skewed, blurred gradient blades with staggered animations, so
  there is no canvas and no rAF competing with MatrixRain's loop.

  Used by: src/routes/+page.svelte (landing hero)

  Per the brief, this pairs with a reduced MatrixRain opacity — the rays sit in
  front, and the rain reads as "a faint glimmer" behind them rather than a
  competing full-strength layer. That opacity lives on the canvas in
  src/lib/MatrixRain.svelte, tagged FX:side-rays.

  Tunables:
    side       "left" | "right" | "both"    which edge the rays fan from  default "left"
    count      number of blades              default 7
    opacity    peak blade opacity            default 0.5
    speed      seconds per drift cycle       default 12
    spread     degrees of fan across blades  default 42
    hue        "warm" (amber, matches logo) | "cool" (blue, matches rain)

  Purely decorative: aria-hidden, pointer-events:none, sits behind content.
  Fades out entirely under prefers-reduced-motion rather than sitting static.
-->
<script lang="ts">
  import { browser } from "$app/environment";
  import { darkModeStore } from "../../lib/stores";
  import { tokens, channels } from "../../lib/tokens";

  export let side: "left" | "right" | "both" = "left";
  export let count = 9;
  export let opacity = 0.42;
  export let speed = 12;
  export let spread = 72;
  export let hue: "warm" | "cool" = "warm";
  /**
   * Paint the rays ABOVE the page content instead of behind it.
   *
   * Needed on the right-hand mount: that half of the hero is an opaque photo,
   * so rays rendered behind it are simply invisible. Over the top they read as
   * a light leak washing across the image, which is what "side light" is
   * supposed to look like. Always pointer-events:none, so nothing under it
   * stops being clickable.
   */
  export let overlay = false;
  let klass = "";
  export { klass as class };

  $: isDark = $darkModeStore;

  /* Colour from tokens: --rays for the brand hue, --warm for the logo hue. */
  $: rayColor = channels($tokens, hue === "warm" ? "warm" : "rays");

  // Light mode needs less punch — the page ground is amber-50, not black.
  $: peak = isDark ? opacity : opacity * 0.45;

  const sides = (s: typeof side) => (s === "both" ? ["left", "right"] : [s]);

  /*
    Overlay mode composites over live content, so each extra blade costs real
    frames — unlike the behind-content case, where the static backdrop is
    cached. Capped at 4; the original 9 measured a ~30fps drop on the landing
    page.

    Presence is bought with blade WIDTH, not count: width is nearly free and
    count is not. Six narrow blades also read as a general sunny wash rather
    than as distinct shafts ("Now it looks like a sun is shining"), so fewer
    and wider is both cheaper and closer to the intent.
  */
  $: effectiveCount = overlay ? Math.min(count, 4) : count;

  /**
   * Blades fan out across `spread` degrees, centred on the edge's diagonal.
   * Each gets its own width, delay and duration so the group never pulses in
   * lockstep.
   */
  function blades(n: number, deg: number) {
    return Array.from({ length: n }, (_, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      return {
        angle: -deg / 2 + t * deg,
        width: 5 + ((i * 37) % 55) / 10,    // 5-10.5vw, deterministic so SSR matches
        delay: -((i * 1.7) % speed),        // negative = already mid-cycle on load
        duration: speed + ((i * 3) % 7),
        strength: 0.45 + ((i * 13) % 55) / 100,
      };
    });
  }
</script>

<div class="fx-side-rays {klass}" class:is-overlay={overlay} aria-hidden="true">
  {#each sides(side) as edge}
    <div class="fx-rays-origin" class:from-right={edge === "right"}>
      {#each blades(effectiveCount, spread) as blade}
        <span
          class="fx-ray"
          style="
            --ray-angle: {blade.angle}deg;
            --ray-width: {blade.width}vw;
            --ray-delay: {blade.delay}s;
            --ray-duration: {blade.duration}s;
            --ray-opacity: {peak * blade.strength};
            --ray-color: {rayColor};
          "
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  .fx-side-rays {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  /*
    Above the content. Kept a separate mode rather than the default: over dark
    text this would cost legibility, and only the photo side needs it.

    Deliberately NO mix-blend-mode. Behind content these blurred, rotating
    blades are effectively free — the backdrop under them is static, so the
    compositor caches it. As an OVERLAY over two live canvases, a blend mode
    forces the whole stack to be re-blended every frame: measured 19fps with
    it, 57 without. Blade count is capped in the component for the same reason
    (9 animated blurred layers over live content cost ~30fps on their own).
  */
  .is-overlay {
    z-index: 30;
  }

  /* Anchor point the blades rotate around: just off the top corner, so the fan
     sweeps down and across the hero the way a window light would. */
  /* Origin sits inboard of the edge so the fan reads as light crossing the
     section rather than a stain in the corner — but not so far in that it
     lands mid-page. Currently mounted on the RIGHT: "Make the side light
     appear at the right. it looks weird in the middle." */
  .fx-rays-origin {
    position: absolute;
    top: -14%;
    left: 18%;
    width: 0;
    height: 0;
  }
  /* Right-mounted fan sits close to the edge. At 18% inboard the origin fell
     behind the hero photo, which is opaque, and the rays were invisible. */
  .fx-rays-origin.from-right {
    left: auto;
    right: 3%;
  }

  .fx-ray {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--ray-width);
    /* Long enough to cross the section at any angle. */
    height: 190vh;
    /* Base rotation is a variable so one keyframe set serves both edges —
       hardcoding it here would be overridden by the animation's transform.
       A blade hangs straight down at 0deg (origin is its top edge), so a
       small positive tilt rakes it down-and-right across the section. Large
       angles like 150deg would swing it back off the top of the screen. */
    --ray-base: 34deg;
    transform-origin: 50% 0;
    transform: rotate(calc(var(--ray-base) + var(--ray-angle)));
    background: linear-gradient(
      to bottom,
      rgba(var(--ray-color), calc(var(--ray-opacity) * 0.7)) 0%,
      rgba(var(--ray-color), var(--ray-opacity)) 18%,
      rgba(var(--ray-color), calc(var(--ray-opacity) * 0.6)) 55%,
      rgba(var(--ray-color), 0) 95%
    );
    filter: blur(13px);
    opacity: 0;
    animation: fx-ray-drift var(--ray-duration) ease-in-out var(--ray-delay) infinite;
    will-change: opacity;
  }

  /* Mirror the fan when it originates from the right edge. */
  .from-right .fx-ray {
    --ray-base: 34deg;
  }

  /*
    Deliberately animates ONLY opacity and rotation. Both ride the element's
    existing composited layer. scaleX changes the layer's size, which forces
    the 13px blur across ~1.5M px to be re-rasterised every single frame —
    nine blades doing that was a large part of an 8fps landing page.
    The breathing that scaleX gave is approximated by the rotation sweep.
  */
  @keyframes fx-ray-drift {
    0%,
    100% {
      opacity: 0.4;
      transform: rotate(calc(var(--ray-base) + var(--ray-angle)));
    }
    50% {
      opacity: 1;
      transform: rotate(calc(var(--ray-base) + var(--ray-angle) + 6deg));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-side-rays {
      display: none;
    }
  }
</style>
