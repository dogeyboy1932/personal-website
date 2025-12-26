<script lang="ts">
  import { fly } from "svelte/transition";

  export let name: string;
  export let note: string;
  export let index: number;
</script>

<li 
  class="group relative overflow-hidden rounded-xl border border-cyan-400/30 bg-slate-800/50 p-4 transition hover:-translate-y-0.5 hover:shadow-lg hover:border-cyan-400/50"
  in:fly={{ y: 12, delay: 250 + index * 100, duration: 350 }}
>
  <!-- Glow effect -->
  <div class="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-cyan-400/10 blur-2xl transition group-hover:scale-110 group-hover:bg-cyan-400/20" />
  
  <div class="relative">
    <div class="font-semibold text-slate-100">{name}</div>
    <div class="mt-1 text-xs text-cyan-300/70">{note}</div>
  </div>
</li>
