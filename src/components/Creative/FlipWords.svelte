<!-- FX: flip-words — Cycles a list of words in place. -->
<script lang="ts">
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
    reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
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
  <!-- Invisible sizer: holds the box open at the longest word's width. -->
  <span class="fx-fw-sizer" aria-hidden="true">{longest}</span>

  <!-- Keyed so Svelte tears down and rebuilds on every change, which is what
       restarts the per-letter animation. -->
  {#key index}
    <span class="fx-fw-word" class:is-static={reduced}>
      {#each current.split("") as char, i}
        <span class="fx-fw-char" style="animation-delay: {i * stagger}ms"
          >{char === " " ? " " : char}</span
        >
      {/each}
    </span>
  {/key}

  <!-- Screen readers get the plain current word, not the split characters:
       per-letter spans are announced letter by letter otherwise. -->
  <span class="sr-only" aria-live="polite">{current}</span>
</span>

<style>
  .fx-flip-words {
    position: relative;
    display: inline-block;
    text-align: left;
    vertical-align: bottom;
  }

    /* Reserves BOTH the width of the longest word and a line's height. */
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

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>
