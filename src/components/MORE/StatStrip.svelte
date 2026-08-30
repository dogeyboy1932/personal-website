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

<div
  class="grid grid-cols-2 gap-4 rounded-2xl border {$theme.border.default} {$theme.bg.card} p-6 sm:grid-cols-4"
  use:countUp
>
  {#each stats as stat, i}
    <div class="text-center">
      <div
        class="font-display text-4xl font-extrabold tracking-tight sm:text-5xl text-brand"
      >
        {shown[i] ?? 0}{stat.suffix ?? ""}
      </div>
      <div class="mt-1 text-[11px] uppercase tracking-[0.28em] {$theme.text.muted}">
        {stat.label}
      </div>
    </div>
  {/each}
</div>
