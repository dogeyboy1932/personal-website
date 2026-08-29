/**
 * FX barrel — every effect ported from CustomDesign.txt lives here.
 *
 * Each file names its React source in a header comment and lists its tunables.
 * Call sites are bracketed with `<!-- FX:<slug> -->` markers, so
 * `grep -rn "FX:shiny-text" src` finds all usage of any one effect.
 */

// FX:shiny-text — reactbits shiny-text / gradient-text
export { default as ShinyText } from "./ShinyText.svelte";

// FX:spin-logo — drag-to-rotate with inertial coast (no React original)
export { default as SpinLogo } from "./SpinLogo.svelte";

// FX:side-rays — reactbits side-rays
export { default as SideRays } from "./SideRays.svelte";

// FX:sparkles + FX:gravity-stars — aceternity sparkles fused with animate-ui gravity-stars
export { default as SparkleField } from "./SparkleField.svelte";

// FX:border-glow — reactbits border-glow
export { default as BorderGlow } from "./BorderGlow.svelte";

// FX:hover-border-gradient — aceternity hover-border-gradient
export { default as HoverBorderGradient } from "./HoverBorderGradient.svelte";

// FX:quote-carousel — reactbits carousel, applied to the hero quotes
export { default as QuoteCarousel } from "./QuoteCarousel.svelte";

// FX:pill-nav — reactbits pill-nav, applied to the project category filter
export { default as PillNav } from "./PillNav.svelte";

// FX:background-gradient — aceternity background-gradient (project + experience cards)
export { default as BackgroundGradient } from "./BackgroundGradient.svelte";

// FX:flip-words — aceternity flip-words (/more identity line)
export { default as FlipWords } from "./FlipWords.svelte";

// FX:flip-card — animate-ui flip-card (/more interests)
export { default as FlipCard } from "./FlipCard.svelte";

// FX:flowing-menu — reactbits flowing-menu (/more travel)
export { default as FlowingMenu } from "./FlowingMenu.svelte";

// FX:share-button — animate-ui share-button (/more footer)
export { default as ShareButton } from "./ShareButton.svelte";

// FX:gooey-nav — reactbits gooey-nav (main navigation)
export { default as GooeyNav } from "./GooeyNav.svelte";

// FX:particle-text — reactbits particle-text (hero name; gated by homeHero.particleName)
export { default as ParticleText } from "./ParticleText.svelte";
