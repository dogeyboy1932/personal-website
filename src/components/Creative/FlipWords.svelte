<script lang="ts">
  import { prefersReducedMotion } from "../../lib/utils";
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  export let words: string[] = [];
  export let interval = 2600;
  export let stagger = 28;
  let klass = "";
  export { klass as class };

  let index = 0;
  let timer: ReturnType<typeof setInterval> | undefined;
  let reduced = false;

  $: current = words[index] ?? "";
  // Reserve the width of the longest word so downstream text never shifts.
  $: longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  onMount(() => {
    if (!browser) return;
    reduced = prefersReducedMotion();
    if (words.length < 2) return;
    timer = setInterval(() => {
      index = (index + 1) % words.length;
    }, interval);
  });

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
</script>

<span class="fx-flip-words {klass}">
  <span class="fx-fw-sizer" aria-hidden="true">{longest}</span>

  {#key index}
    <span class="fx-fw-word" class:is-static={reduced}>
      {#each current.split("") as char, i}
        <span class="fx-fw-char" style="animation-delay: {i * stagger}ms"
          >{char === " " ? " " : char}</span
        >
      {/each}
    </span>
  {/key}

  <span class="sr-only" aria-live="polite">{current}</span>
</span>

<style>
  .fx-flip-words {
    position: relative;
    display: inline-block;
    text-align: left;
    vertical-align: bottom;
  }

  .fx-fw-sizer {
    display: block;
    visibility: hidden;
    white-space: nowrap;
  }

  .fx-fw-word {
    position: absolute;
    inset: 0;
    white-space: nowrap;
  }

  .fx-fw-char {
    display: inline-block;
    animation: fx-fw-in 460ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .is-static .fx-fw-char {
    animation: none;
  }

  @keyframes fx-fw-in {
    from {
      opacity: 0;
      filter: blur(6px);
      transform: translateY(-0.45em);
    }
    to {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0);
    }
  }
</style>
