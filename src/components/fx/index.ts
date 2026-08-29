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
