<script lang="ts">
  import { PillNav } from "../Creative";

  export let categories: string[];
  export let selectedCategory: string;
</script>

<div class="mb-8 flex justify-center">
  <PillNav items={categories} bind:selected={selectedCategory} ariaLabel="Filter projects by category" />
</div>
