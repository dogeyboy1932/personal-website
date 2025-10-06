<script lang="ts">
  import { SectionHeader } from "../../../components/Headers";
  import { fade, fly } from "svelte/transition";

  export let data;
</script>

<section class="space-y-12">
  <section
    class="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
  >
    <div class="space-y-6" in:fly={{ x: -18, duration: 400 }}>
      <p class="text-xs uppercase tracking-[0.45em] text-emerald-500">
        {data.page.hero.tagline}
      </p>
      <h1 class="text-4xl font-semibold text-slate-900 dark:text-slate-100">
        {data.page.hero.title}
      </h1>
      <p class="text-base text-slate-600 dark:text-slate-300">
        {data.page.hero.description}
      </p>
    </div>

    <figure class="relative" in:fly={{ x: 18, duration: 400 }}>
      <div
        class="aspect-[4/5] overflow-hidden rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 via-transparent to-cyan-500/20 shadow-2xl backdrop-blur"
      >
        <img
          src={data.page.hero.image.src}
          alt={data.page.hero.image.alt}
          class="h-full w-full object-cover opacity-90"
          loading="lazy"
        />
      </div>
      <figcaption
        class="mt-3 text-center text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400"
      >
        {data.page.hero.image.caption}
      </figcaption>
    </figure>
  </section>

  <SectionHeader id="timeline" title={data.page.mainContent.title} />
  <div class="one-grid">
    {#each data.page.mainContent.items as item, i}
      <div class="content-card" in:fade={{ delay: i * 200, duration: 500 }}>
        <div class="p-6">
          <div class="section-header">
            <span class="title">{item.title}</span>
            <span class="time-badge">{item.subtitle}</span>
          </div>
          <div class="label-header mt-2 mb-4">{item.secondarySubtitle}</div>
          <p class="description">{item.description}</p>
        </div>
      </div>
    {/each}
  </div>

  <section class="space-y-6" in:fade>
    <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
      {data.page.additionalContent.title}
    </h2>
    <div class="grid gap-6 md:grid-cols-2">
      {#each data.page.additionalContent.items as item, index}
        <div
          class="rounded-2xl border border-emerald-500/20 bg-white/80 p-6 shadow-lg dark:bg-slate-900/60"
          in:fly={{ y: 18, delay: index * 80 }}
        >
          <p class="text-xs uppercase tracking-[0.35em] text-emerald-400">
            {item.title}
          </p>
          <h3
            class="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100"
          >
            {item.subtitle}
          </h3>
          <p class="mt-4 text-sm text-slate-600 dark:text-slate-300">
            {item.description}
          </p>
        </div>
      {/each}
    </div>
  </section>
</section>
