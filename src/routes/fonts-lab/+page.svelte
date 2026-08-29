<!--
  TEMPORARY font sampler — not linked from anywhere, not in the navbar, and
  not listed in prerender.entries, so it never ships to the built site.

  Purpose: updates.txt says "make the fonts better. I can't describe what I
  want. you need to sample a few. Test my name." This renders the name at hero
  size across candidate display faces so one can be picked by eye.

  DELETE THIS ROUTE once a face is chosen; the winner goes into
  tailwind.config.js `fontFamily.display` and the Google Fonts link in
  src/app.html.

  Note: the site already loads Inter / JetBrains Mono / Space Grotesk from
  Google Fonts in src/app.html — `font-display` really is Space Grotesk today,
  it is not silently falling back. The candidates below are pulled in from this
  page only.
-->
<script lang="ts">
  import { theme } from "../../lib/stores";
  import { homeHero } from "../../constants";

  /** Candidate display faces. Space Grotesk is the current one — the control. */
  const candidates = [
    { name: "Space Grotesk", stack: "'Space Grotesk', sans-serif", note: "current — geometric, slightly quirky" },
    { name: "Sora", stack: "'Sora', sans-serif", note: "technical, wide, modern" },
    { name: "Outfit", stack: "'Outfit', sans-serif", note: "clean geometric, very even" },
    { name: "Bricolage Grotesque", stack: "'Bricolage Grotesque', sans-serif", note: "characterful, editorial" },
    { name: "Archivo", stack: "'Archivo', sans-serif", note: "grotesque, sturdy, news-like" },
    { name: "Manrope", stack: "'Manrope', sans-serif", note: "soft geometric, friendly" },
    { name: "Chivo", stack: "'Chivo', sans-serif", note: "high contrast, confident" },
    { name: "Familjen Grotesk", stack: "'Familjen Grotesk', sans-serif", note: "tight, contemporary" },
  ];

  const sample = homeHero.fullName;
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=Outfit:wght@700;800&family=Bricolage+Grotesque:wght@700;800&family=Archivo:wght@700;800&family=Manrope:wght@700;800&family=Chivo:wght@700;800&family=Familjen+Grotesk:wght@700&display=swap"
  />
</svelte:head>

<section class="space-y-8 py-6">
  <div>
    <h1 class="text-2xl font-bold {$theme.text.primary}">Font lab</h1>
    <p class="mt-1 text-sm {$theme.text.muted}">
      Temporary page. Pick one and I'll wire it into <code>fontFamily.display</code> and delete this route.
    </p>
  </div>

  {#each candidates as font, i}
    <div class="rounded-2xl border {$theme.border.default} {$theme.bg.card} p-6">
      <div class="mb-3 flex items-baseline gap-3">
        <span class="text-xs font-bold uppercase tracking-[0.3em] {$theme.accent.orange.text}">
          {i + 1}. {font.name}
        </span>
        <span class="text-xs {$theme.text.dim}">{font.note}</span>
      </div>

      <!-- Hero-size, matching how the name actually renders on the landing page -->
      <div
        class="uppercase text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight {$theme.text.primary} leading-[0.95]"
        style="font-family: {font.stack};"
      >
        {sample}
      </div>

      <!-- The role line sits directly under the name, so show it too -->
      <div
        class="mt-3 text-lg sm:text-xl md:text-2xl font-bold {$theme.accent.orange.text} tracking-[0.2em] uppercase"
        style="font-family: {font.stack};"
      >
        {homeHero.role}
      </div>
    </div>
  {/each}
</section>
