<script lang="ts">
  // FX:pill-nav — the pill markup and hover behaviour now live in the fx
  // component; this file keeps the same public contract (categories +
  // bind:selectedCategory) so the portfolio page is unchanged.
  import { PillNav } from "../fx";

  export let categories: string[];
  export let selectedCategory: string;
</script>

<div class="mb-8 flex justify-center">
  <!-- FX:pill-nav -->
  <PillNav items={categories} bind:selected={selectedCategory} ariaLabel="Filter projects by category" />
  <!-- /FX:pill-nav -->
</div>
