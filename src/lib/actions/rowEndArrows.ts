/**
 * Hides connector arrows that land at the END of a wrapped row.
 *
 * The /more life-path stepper is a wrapping flex row of
 * [stop][arrow][stop][arrow]... When it wraps, the arrow belonging to the last
 * stop on a line stays on that line and points at nothing — a dangling
 * connector hanging off the right edge. ("fix the 'where I've been' section.")
 *
 * This cannot be done in CSS: which item ends a row depends on measured layout,
 * and there is no selector for "last box on a visual line". So it is measured —
 * an arrow is hidden when the element after it starts on a different line.
 *
 * `visibility` rather than `display`, deliberately: removing the arrow from
 * flow would change where the row breaks, which could move a stop onto the
 * previous line, which could change which arrow is dangling. That is a feedback
 * loop. Keeping the box and only hiding the glyph makes one pass stable.
 *
 * Re-measures on resize via ResizeObserver, and once after fonts settle, since
 * a late-loading webfont changes every width.
 */
export function rowEndArrows(node: HTMLElement, selector = "[data-arrow]") {
  if (typeof window === "undefined") return { destroy() {} };

  let frame = 0;

  const update = () => {
    frame = 0;
    const arrows = [...node.querySelectorAll<HTMLElement>(selector)];
    for (const arrow of arrows) {
      // Reset first: a previously hidden arrow must be measured as visible, or
      // its own top would be stale after a resize.
      arrow.style.visibility = "";
    }
    for (const arrow of arrows) {
      const next = arrow.nextElementSibling as HTMLElement | null;
      if (!next) {
        arrow.style.visibility = "hidden";
        continue;
      }
      /*
        Compare vertical CENTRES, not tops. The arrow is self-center inside an
        items-stretch row, so its box is shorter than the stop beside it and
        their `top` values never match even on the same line — comparing tops
        hid every arrow, which is how this first shipped in testing.
        Centres coincide for anything sharing a flex line.
      */
      const a = arrow.getBoundingClientRect();
      const n = next.getBoundingClientRect();
      const sameLine = Math.abs((a.top + a.height / 2) - (n.top + n.height / 2)) < 8;
      arrow.style.visibility = sameLine ? "" : "hidden";
    }
  };

  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(update);
  };

  const observer = new ResizeObserver(schedule);
  observer.observe(node);
  schedule();

  // Webfonts land after first layout and change every measurement.
  document.fonts?.ready.then(schedule).catch(() => {});

  return {
    destroy() {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    },
  };
}

export default rowEndArrows;
