<script lang="ts">
  import { browser } from "$app/environment";
  import { theme } from "../../lib/stores";
  import type { MoreStat } from "../../types";

  export let stats: MoreStat[] = [];

  let shown: number[] = stats.map(() => 0);

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
