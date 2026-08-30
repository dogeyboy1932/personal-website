<!--
  /more section: stat band.

  The README has these as four shields.io badges in a row. Here they're
  oversized numerals that count up when the band scrolls into view — a badge
  row transplanted to a website reads as leftover GitHub chrome, a counter
  reads as a hook.

  Data: more.stats in src/constants/more.ts
  Count-up uses the same IntersectionObserver pool as FX:scroll-reveal.
-->
<script lang="ts">
  import { browser } from "$app/environment";
  import { theme } from "../../lib/stores";
  import type { MoreStat } from "../../types";

  export let stats: MoreStat[] = [];

  /** Rendered values; start at 0 and are driven up to `stat.value`. */
  let shown: number[] = stats.map(() => 0);

  /**
   * Counts every figure up from zero over `duration`, eased so it decelerates
   * into the final number instead of stopping dead.
   */
  function countUp(node: HTMLElement, duration = 1400) {
    if (!browser) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      shown = stats.map((s) => s.value);
      return;
    }

    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        observer.disconnect();

        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          shown = stats.map((s) => Math.round(s.value * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }
</script>

<!--
  Inline and LEFT-ALIGNED, not a full-width band. As a bordered card with
  centred 5xl numerals it claimed ~120px of a page being compacted, and read as
  its own section rather than as a detail line. ("the stats row is too big...we
  can align to the left")
-->
<div class="flex flex-wrap items-baseline gap-x-6 gap-y-2" use:countUp>
  {#each stats as stat, i}
    <div class="flex items-baseline gap-1.5">
      <span class="font-display text-2xl font-extrabold tracking-tight {$theme.accent.orange.text}">
        {shown[i] ?? 0}{stat.suffix ?? ""}
      </span>
      <span class="meta-label text-[10px] {$theme.text.muted}">{stat.label}</span>
    </div>
  {/each}
</div>
