<script lang="ts">
  import { fly } from "svelte/transition";
  import { homeFocusAreas } from "../../../constants";
  import { SectionHeader } from "../../Headers";

</script>

<div>
  <h3 class="text-base text-xl uppercase tracking-[0.4em] text-slate-500 font-bold mb-3 ml-2">Mainly Focused on</h3>
  
  <div class="grid gap-4 grid-cols-1 min-[800px]:grid-cols-3">
    {#each homeFocusAreas as focus, index}
      <div
        class="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900 via-violet-950/30 to-slate-900 shadow-xl transition-all duration-300 hover:border-slate-600 hover:-translate-y-2 hover:shadow-2xl p-6"
        in:fly={{ y: 20, delay: index * 100 }}
      >
        <div class="relative">
          <!-- Title -->
          <h4 class="text-2xl font-extrabold text-white mb-4 tracking-tight">
            {focus.title}
          </h4>
          
          <!-- Description -->
          <p class="text-base text-slate-300 leading-relaxed font-light">
            {focus.description}
          </p>
        </div>
      </div>
    {/each}
  </div>
</div>
