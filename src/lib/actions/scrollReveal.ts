/**
 * FX: scroll-reveal
 * Source: https://reactbits.dev/text-animations/scroll-reveal (React) — reimplemented as a Svelte action.
 *
 * Elements start blurred + nudged down, then resolve to crisp as they scroll into view.
 * They stay VISIBLE the whole time — see `restOpacity`. An earlier version rested
 * at opacity 0, which is a pop-in, not a reveal.
 * The original is text-only; per the design brief this is generalised so any block
 * ("the bottom should appear from blurred to unblurred") can use it.
 *
 * Usage:  <section use:scrollReveal>                       // defaults
 *         <section use:scrollReveal={{ delay: 120 }}>       // stagger within a group
 *         <div use:scrollReveal={{ blur: 4, y: 8, once: false }}>
 *
 * Tunables (all optional):
 *   blur      px of blur at rest                    default 10
 *   restOpacity opacity BEFORE the reveal            default 1
 *   y         px of downward offset at rest         default 24
 *   duration  ms of the reveal transition           default 700
 *   delay     ms before this element starts         default 0
 *   threshold fraction visible before firing        default 0.15
 *   once      unreveal when scrolled back out?      default FALSE (re-blurs)
 *
 * Honours `prefers-reduced-motion` and degrades to "always visible" when
 * IntersectionObserver is missing, so content is never trapped invisible.
 */

export interface ScrollRevealOptions {
  blur?: number;
  /**
   * Opacity at rest, BEFORE the element scrolls into view.
   *
   * Was hard-coded to 0, which meant every un-reached section was not blurred —
   * it was absent, and popped into existence on scroll. ("When I scroll on
   * portfolio, the bototm section is not blurry, it's just entirely gone and
   * appears when I scroll. It should be blurry and be visible when I scroll
   * down not be gone and then come to life when I scroll.")
   *
   * 1 makes the reveal purely a blur-and-settle: the content is there the whole
   * time and simply resolves. Set below 1 for a fade as well.
   */
  restOpacity?: number;
  y?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

const DEFAULTS: Required<ScrollRevealOptions> = {
  blur: 10,
  restOpacity: 1,
  y: 24,
  duration: 700,
  delay: 0,
  threshold: 0.15,
  /*
    RECURRING. ("It's blurry once when I moutn the page but then never again.
    It should be recurring")

    Was true, which unobserved the element after its first reveal — so the
    effect only ever fired once per page load and scrolling back up and down
    showed nothing. false keeps the observer attached and re-blurs on exit.

    The cost is real and is why it defaulted to true: with `once` the action
    strips its own `filter`/`will-change` after the transition, and a lingering
    `filter` — `blur(0px)` included — pins a composited layer per section. That
    is what dragged this site to single-digit fps once. So the cleanup is now
    driven by VISIBILITY rather than by finality: styles are stripped whenever
    an element settles in view and re-applied on exit, which means an on-screen
    section carries no layer either way. Only the handful of sections currently
    scrolled out hold one.
  */
  once: false,
};

/**
 * Shared observer pool, keyed by threshold. One observer per distinct threshold
 * instead of one per element — the /more page alone reveals ~30 nodes.
 */
const pools = new Map<number, IntersectionObserver>();
const handlers = new WeakMap<Element, (visible: boolean) => void>();

function getObserver(threshold: number): IntersectionObserver {
  let observer = pools.get(threshold);
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          handlers.get(entry.target)?.(entry.isIntersecting);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    pools.set(threshold, observer);
  }
  return observer;
}

export function scrollReveal(node: HTMLElement, options: ScrollRevealOptions = {}) {
  const opts = { ...DEFAULTS, ...options };

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // No observer support (or motion suppressed) → render plainly, never hidden.
  if (typeof IntersectionObserver === "undefined" || reducedMotion) {
    node.style.opacity = "1";
    return { destroy() {} };
  }

  const hide = () => {
    node.style.opacity = String(opts.restOpacity);
    node.style.filter = `blur(${opts.blur}px)`;
    node.style.transform = `translate3d(0, ${opts.y}px, 0)`;
  };

  const show = () => {
    node.style.opacity = "1";
    node.style.filter = "blur(0px)";
    node.style.transform = "translate3d(0, 0, 0)";
  };

  /**
   * Strip every style this action set once the reveal has finished.
   *
   * This matters for more than tidiness. A `filter` of ANY value — `blur(0px)`
   * included — promotes the element to its own composited layer for as long as
   * it is set, and `will-change` pins that layer explicitly. Leaving both on
   * every revealed section meant each page permanently carried a stack of
   * full-width GPU layers, which is what dragged rendering down to single-digit
   * fps once an animated backdrop sat behind them. A lingering `filter` also
   * disables subpixel text antialiasing, so the copy renders slightly softer.
   *
   * Only safe when `once` is set; a re-hiding reveal still needs its styles.
   */
  let cleanupTimer: ReturnType<typeof setTimeout> | undefined;
  const clearStyles = () => {
    node.style.removeProperty("filter");
    node.style.removeProperty("transform");
    node.style.removeProperty("will-change");
    node.style.removeProperty("opacity");
    // `transition` is deliberately KEPT when the reveal can recur: dropping it
    // would make the next re-blur snap instead of animate.
    if (opts.once) node.style.removeProperty("transition");
  };

  /** Re-arm the styles a recurring reveal needs before hiding again. */
  const armStyles = () => {
    node.style.willChange = "opacity, filter, transform";
    node.style.transition =
      `opacity ${opts.duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${opts.delay}ms, ` +
      `filter ${opts.duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${opts.delay}ms, ` +
      `transform ${opts.duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${opts.delay}ms`;
  };

  node.style.willChange = "opacity, filter, transform";
  node.style.transition =
    `opacity ${opts.duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${opts.delay}ms, ` +
    `filter ${opts.duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${opts.delay}ms, ` +
    `transform ${opts.duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${opts.delay}ms`;
  hide();

  const observer = getObserver(opts.threshold);

  handlers.set(node, (visible: boolean) => {
    clearTimeout(cleanupTimer);

    if (visible) {
      show();
      if (opts.once) {
        observer.unobserve(node);
        handlers.delete(node);
      }
      /*
        Drop the composited layer once the transition has actually finished —
        for recurring reveals too, not just `once` ones. An element that is
        settled in view needs no filter and no will-change, and this is what
        keeps `once: false` from re-introducing the permanent per-section GPU
        layers that cost ~45fps here previously.
      */
      cleanupTimer = setTimeout(clearStyles, opts.duration + opts.delay + 60);
    } else if (!opts.once) {
      // Styles were stripped when it settled; put them back before re-hiding,
      // or the blur would snap on rather than transition.
      armStyles();
      hide();
    }
  });

  observer.observe(node);

  return {
    destroy() {
      clearTimeout(cleanupTimer);
      observer.unobserve(node);
      handlers.delete(node);
    },
  };
}

export default scrollReveal;
