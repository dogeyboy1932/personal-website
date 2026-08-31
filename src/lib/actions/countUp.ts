import { prefersReducedMotion } from "../utils";

/** Counts a row of numbers up from zero the first time the node scrolls into view.
    Reports progress through `onUpdate` rather than owning any state itself. */
export interface CountUpOptions {
  values: number[];
  onUpdate: (shown: number[]) => void;
  duration?: number;
  threshold?: number;
}

const DEFAULTS = { duration: 1400, threshold: 0.35 };

export function countUp(node: HTMLElement, options: CountUpOptions) {
  let opts = { ...DEFAULTS, ...options };

  // No observer support (or motion suppressed) → land on the final values immediately,
  // so the numbers are never left sitting at zero.
  if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
    opts.onUpdate([...opts.values]);
    return { destroy() {} };
  }

  let frame = 0;
  let started = false;

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting || started) return;
      started = true;
      observer.disconnect();

      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / opts.duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        opts.onUpdate(opts.values.map((v) => Math.round(v * eased)));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    },
    { threshold: opts.threshold }
  );

  observer.observe(node);

  return {
    update(next: CountUpOptions) {
      opts = { ...DEFAULTS, ...next };
    },
    destroy() {
      cancelAnimationFrame(frame);
      observer.disconnect();
    },
  };
}

export default countUp;
