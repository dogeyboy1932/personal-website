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
  A SCORECARD: full row, centred, with a rule between each figure. ("Make the
  stats like a scorecard almost...each with dividers and taking up the whole
  row while centered.")

  divide-x draws the rules; each cell is flex-1 so the four split the row
  evenly whatever the label lengths.

  Colour comes off --lede in src/styles/tokens.css, not a literal. Amber first,
  then cyan, now yellow ("Also a better color than blue for the one liner and
  stats. Make it yellow for now.") — a pair that keeps moving belongs behind
  one switch rather than being edited in two files each time.
-->
<!--
  NO CONTAINER. ("remove the container for the stats...it should be embedded to
  the background if you understand.") The rounded border and card fill are gone;
  the figures now sit directly on the page and the only structure left is the
  divide-x rules between them, which is what made it read as a scorecard in the
  first place. Nothing boxes it in, so it reads as part of the page rather than
  a widget dropped onto it.
-->
<div class="flex w-full divide-x {$theme.border.light} py-2" use:countUp>
  {#each stats as stat, i}
    <div class="flex flex-1 flex-col items-center justify-center px-2">
      <span class="font-display text-3xl font-extrabold tracking-tight text-lede sm:text-4xl">
        {shown[i] ?? 0}{stat.suffix ?? ""}
      </span>
      <span class="meta-label mt-1 text-[10px] {$theme.text.muted} sm:text-xs">{stat.label}</span>
    </div>
  {/each}
</div>
