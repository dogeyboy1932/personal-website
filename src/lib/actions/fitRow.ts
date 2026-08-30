/** Scales a single-line row down so it always fits its container. */
export function fitRow(node: HTMLElement) {
  if (typeof window === "undefined") return { destroy() {} };

  const row = node.firstElementChild as HTMLElement | null;
  if (!row) return { destroy() {} };

  let frame = 0;

  const update = () => {
    frame = 0;

    row.style.transform = "none"; // measure unscaled
    const natural = row.scrollWidth;
    const available = node.clientWidth;
    if (!natural || !available) return;

    const scale = Math.min(1, available / natural);
    row.style.transformOrigin = "top center";
    row.style.transform = `scale(${scale})`;

        /* CAVEAT: the wrapper must be items-start. */
    node.style.height = `${Math.ceil(row.offsetHeight * scale)}px`;
  };

  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(update);
  };

  const observer = new ResizeObserver(schedule);
  observer.observe(node);
  schedule();

  // Webfonts land after first layout and change the natural width.
  document.fonts?.ready.then(schedule).catch(() => {});

  return {
    destroy() {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    },
  };
}

export default fitRow;
