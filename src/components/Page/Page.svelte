<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<section class="space-y-12">
  <div class="space-y-6">
    <h1 class="text-4xl font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
    <p class="text-base text-slate-600 dark:text-slate-300">{description}</p>
  </div>
  <slot />
</section>
