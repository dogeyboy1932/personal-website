<script lang="ts">
  import { fly } from "svelte/transition";

  export let src: string;
  export let alt: string;
  export let quote: string;
  export let voice: string;
</script>

<figure class="group relative flex flex-col mx-auto" in:fly={{ x: -24, duration: 400 }}>
  <!-- Image container -->
  <div class="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
    <img
      {src}
      {alt}
      class="h-full w-full object-cover transition duration-1000 group-hover:scale-105 group-hover:rotate-1"
      loading="lazy"
    />
  </div>

  <!-- Quote caption -->
  <figcaption class="mt-2 p-4 rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md shadow-lg">
    <p class="text-md italic text-slate-200 leading-snug">{quote}</p>
    <p class="mt-3 text-sm text-indigo-400 font-bold uppercase tracking-widest text-right">{voice}</p>
  </figcaption>
</figure>
