<script lang="ts">
  import { SectionHeader } from "../../components/Headers";
  import { links } from "../../constants/links";
  import {
    connectHero,
    connectMessageTemplate,
    connectMethods,
    connectPage,
  } from "../../constants/connect-page";
  import { fade, fly } from "svelte/transition";
</script>

<section class="space-y-5">
  <section>
    <h2 class="text-3xl uppercase tracking-[0.4em] text-emerald-500 text-center">
          {connectHero.tagline}
        </h2>
    <div class="mt-2 h-1 w-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 opacity-60" />
  </section>
  
  <section
    class="grid items-center gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
  >
  
    <div class="space-y-5" in:fly={{ x: -18, duration: 400 }}>
      <h1 class="text-4xl font-semibold text-slate-900 dark:text-slate-100">
        {connectHero.title}
      </h1>
      
      <p class="text-base text-slate-600 dark:text-slate-300">
        {connectHero.description}
      </p>

      <div class="grid gap-4 grid-cols-2" in:fade>
        {#each connectMethods as method, index}
          <a
            href={method.href}
            class="rounded-2xl border border-emerald-500/30 bg-white/70 p-4 text-sm shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900/70"
            in:fly={{ y: 18, delay: index * 120 }}
          >
            <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {method.title}
            </h3>
            
            <p class="mt-2 text-md text-slate-600 dark:text-slate-300">
              {method.description}
            </p>
            
            <span
              class="mt-3 inline-flex text-[0.70rem] font-semibold uppercase tracking-[0.4em] text-emerald-300">
              {method.cta}
            </span>

            →
          </a>
        {/each}
      </div>
    </div>

    <div in:fly={{ x: 18, duration: 400 }}>
      <figure class="relative" in:fly={{ x: 18, duration: 400 }}>
        <div
          class="aspect-[4/3] overflow-hidden rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-cyan-500/20 via-transparent to-emerald-500/20 shadow-2xl"
        >
          <img
            src={connectHero.image.src}
            alt={connectHero.image.alt}
            class="h-full w-full object-cover opacity-90"
            loading="lazy"
          />
        </div>

        <figcaption
          class="mt-3 text-center text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400"
        >
          {connectHero.image.caption}
        </figcaption>
        
      </figure>
    </div>
  </section>


  <section class="space-y-2">
    <SectionHeader id="links" title="LET'S CONNECT" customColor="text-violet-500" />
    <div class="grid gap-2 grid-cols-3" in:fade>
      {#each links as link, index}
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          class="uppercase rounded-2xl border border-emerald-500/20 bg-white/80 p-4 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900/60"
          in:fly={{ y: 18, delay: index * 80 }}
        >
          <p class="text-lg font-semibold text-slate-300 tracking-[0.10em]">{link.platform}</p>
        </a>
      {/each}
    </div>
  </section>

  <!-- <section class="space-y-3" in:fade>
    <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
      {connectPage.messageTemplate}
    </h2>
    <p class="text-sm text-slate-600 dark:text-slate-300">
      Not sure what to say? Copy this outline and make it yours. Replace the
      placeholders with your details to kick-start the conversation.
    </p>
    <div
      class="rounded-2xl border border-emerald-500/20 bg-white/80 p-6 text-sm shadow-lg dark:bg-slate-900/60"
    >
      <p class="whitespace-pre-line text-slate-700 dark:text-slate-200">
        {connectMessageTemplate}
      </p>
    </div>
  </section> -->
</section>
