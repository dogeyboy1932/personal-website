import { rafCoalesce } from "../utils";

export function fitRow(node: HTMLElement) {
  if (typeof window === "undefined") return { destroy() {} };

  const row = node.firstElementChild as HTMLElement | null;
  if (!row) return { destroy() {} };

  const update = () => {
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

  const { schedule, cancel } = rafCoalesce(update);

  const observer = new ResizeObserver(schedule);
  observer.observe(node);
  schedule();

  document.fonts?.ready.then(schedule).catch(() => {});

  return {
    destroy() {
      cancel();
      observer.disconnect();
    },
  };
}

export default fitRow;
