/**
 * Scales a single-line row down so it always fits its container.
 *
 * ("fix the 'where I've been' section. smaller window means the whole row
 * shrinks proportionally")
 *
 * WHY NOT CSS. The alternatives all fail on one axis or another:
 *   - flex-wrap lets it fit, but by BREAKING the row, which is what this
 *     replaces — a life path split across two lines stops reading as a path,
 *     and it leaves a connector arrow dangling at the end of a line.
 *   - flex: 1 1 0 on the boxes shrinks the BOXES but not the type inside them,
 *     so the text overflows or has to be clamped separately.
 *   - clamp()/vw font sizing scales the text but not the gaps, padding, border
 *     radii and arrow glyphs, so proportions drift as the window narrows.
 * A transform scales every one of those by the same factor, which is what
 * "shrinks proportionally" actually means.
 *
 * Applied to a WRAPPER; the row is its first element child. The row is measured
 * unscaled, compared against the wrapper's width, and scaled by the ratio —
 * capped at 1 so it never grows past its natural size on a wide screen.
 *
 * The wrapper's height is set explicitly to the scaled height. A transform does
 * not affect layout, so without this the wrapper would keep reserving the row's
 * FULL height and leave a growing gap underneath as the scale drops.
 */
export function fitRow(node: HTMLElement) {
  if (typeof window === "undefined") return { destroy() {} };

  const row = node.firstElementChild as HTMLElement | null;
  if (!row) return { destroy() {} };

  let frame = 0;

  const update = () => {
    frame = 0;

    // Measure unscaled. Reading scrollWidth while a transform is applied would
    // return the pre-transform box anyway, but clearing it keeps this honest if
    // the implementation ever changes to something layout-affecting.
    row.style.transform = "none";
    const natural = row.scrollWidth;
    const available = node.clientWidth;
    if (!natural || !available) return;

    const scale = Math.min(1, available / natural);
    row.style.transformOrigin = "top center";
    row.style.transform = `scale(${scale})`;

    /*
      offsetHeight is the untransformed height; the rendered height is that
      times the scale.

      The wrapper MUST NOT stretch the row for this to be stable. With the
      wrapper as a default `align-items: stretch` flex container, setting its
      height here resized the row, which made the next measurement smaller,
      which shrank the wrapper again — the row collapsed from 74px to 1px over
      a few frames. The wrapper carries `items-start` so the row's height stays
      content-driven and this is a one-shot write rather than a feedback loop.
    */
    node.style.height = `${Math.ceil(row.offsetHeight * scale)}px`;
  };

  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(update);
  };

  const observer = new ResizeObserver(schedule);
  observer.observe(node);
  schedule();

  // Webfonts land after first layout and change the row's natural width.
  document.fonts?.ready.then(schedule).catch(() => {});

  return {
    destroy() {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    },
  };
}

export default fitRow;
