/** FX: scroll-reveal — elements sit blurred and resolve to crisp as they enter view. — Honours
   prefers-reduced-motion; degrades to "always visible" without IntersectionObserver, so content is
   never trapped invisible. blur / restOpacity / y / duration / delay / threshold / once */
export interface ScrollRevealOptions {
  blur?: number;
  /** Opacity before reveal. 1 = pure blur-and-settle; below 1 adds a fade. */
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
    /* CAVEAT: `once: true` would let a lingering `filter` pin a composited layer per section — a
     stack of those took this site to single-digit fps. */
  once: false,
};

/** One observer per distinct threshold, not per element (/more reveals ~30 nodes). */
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

  /** Strip our styles once settled — see the layer caveat above. */
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
