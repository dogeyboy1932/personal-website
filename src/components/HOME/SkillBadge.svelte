<script lang="ts">
  import { fly } from "svelte/transition";

  export let name: string;
  export let index: number = 0;
</script>

<span
  class="px-4 py-2 rounded-xl bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 border border-slate-700 text-[12px] font-sans font-bold uppercase tracking-widest text-slate-300 transition-all hover:border-emerald-500/50 hover:text-yellow-400"
  in:fly={{ y: 12, delay: index * 80 }}
>
  {name}
</span>
