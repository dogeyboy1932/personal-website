<!--
  FX: share-button
  Source: https://animate-ui.com/docs/components/community/share-button (React) — reimplemented in Svelte

  A pill that fans its icons out on hover, staggered, so you can hover across
  them and click any one. The brief singled out that interaction specifically:
  "I like the hover and being able to click around icons."

  Used by: src/components/MORE/ConnectFooter.svelte

  Tunables:
    actions   [{ label, handle, href?, icon }]
    label     resting pill text                default "Find me"
    stagger   ms between adjacent icons        default 55

  An action without `href` (Discord — a handle, not a linkable profile) renders
  as a button that copies the handle to the clipboard and reports back, rather
  than as a dead link.

  The fan stays open on focus-within, so keyboard users can tab through the
  icons instead of the group collapsing the moment hover ends.
-->
<script lang="ts">
  import { Instagram, MessageCircle, Mail, Github, Linkedin, Check, Copy } from "lucide-svelte";
  import KnightIcon from "../icons/KnightIcon.svelte";
  import { theme } from "../../lib/stores";
  import type { SocialHandle } from "../../types";

  export let actions: SocialHandle[] = [];
  export let label = "Find me";
  /**
   * Travelling-arc border, the FX:hover-border-gradient effect inlined.
   *
   * Inlined rather than wrapping this component in <HoverBorderGradient>,
   * because that renders a real <a>/<button> and the pill already contains
   * interactive children — nesting them would be invalid and would break
   * keyboard use.
   *
   * ("Apply glow animation to the 'find me' button?" — it came off the three
   * home-page quick links in the same pass, so exactly one button on the site
   * carries the arc.)
   */
  export let glow = false;
  /** Seconds per revolution of the arc. */
  export let glowDuration = 4;
  export let stagger = 55;

  const icons = {
    instagram: Instagram,
    discord: MessageCircle,
    // A knight, not a crown — the crown reads as king/queen.
    lichess: KnightIcon,
    mail: Mail,
    github: Github,
    linkedin: Linkedin,
  } as const;

  /** Handle of the action most recently copied, cleared after a beat. */
  let copied: string | null = null;
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  async function copy(action: SocialHandle) {
    try {
      await navigator.clipboard.writeText(action.handle);
      copied = action.handle;
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => (copied = null), 1800);
    } catch {
      // Clipboard can be blocked (insecure context, denied permission). Leave
      // the handle visible in the tooltip so it can still be selected by hand.
      copied = null;
    }
  }
</script>

<div class="fx-share-button" style="--sb-stagger: {stagger}ms; --sb-glow-duration: {glowDuration}s;">
  <div
    class="fx-sb-pill {$theme.bg.secondary} {$theme.border.default} {$theme.text.secondary}"
    class:is-glowing={glow}
  >
    <!-- Absolutely centred, so the icons occupy the SAME space rather than
         sitting next to it. ("just replace the find me with the logos when the
         hover happens") -->
    <span class="fx-sb-label">{label}</span>

    <div class="fx-sb-fan">
      {#each actions as action, i}
        {@const Icon = icons[action.icon]}
        <div class="fx-sb-slot" style="--sb-index: {i};">
          <span class="fx-sb-mask">
            <span class="fx-sb-rise">
          <svelte:element
            this={action.href ? "a" : "button"}
            href={action.href}
            target={action.href && !action.href.startsWith("mailto:") ? "_blank" : undefined}
            rel={action.href ? "noopener noreferrer" : undefined}
            type={action.href ? undefined : "button"}
            role={action.href ? "link" : "button"}
            class="fx-sb-action {$theme.bg.cardSolid} {$theme.border.default} {$theme.text.secondary}"
            aria-label="{action.label}: {action.handle}"
            on:click={() => !action.href && copy(action)}
          >
            {#if copied === action.handle}
              <Check class="h-5 w-5" />
            {:else}
              <svelte:component this={Icon} class="h-5 w-5" />
            {/if}
          </svelte:element>
            </span>
          </span>

          <span class="fx-sb-tip {$theme.bg.cardSolid} {$theme.text.muted}">
            {#if copied === action.handle}
              Copied
            {:else}
              {action.handle}{#if !action.href}<Copy class="ml-1 inline h-3 w-3" />{/if}
            {/if}
          </span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .fx-share-button {
    display: inline-block;
  }

  /* Enlarged: "The find me button is too small."
     Position context for the label overlay below. */
  .fx-sb-pill {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    padding: 0.8rem 1.4rem;
    border-radius: 9999px;
    border-width: 1px;
    border-style: solid;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  /*
    Travelling arc, same technique as FX:hover-border-gradient: a conic gradient
    rotated by an animated @property angle, masked down to the border ring with
    an exclude composite so only the 1.5px rim paints.

    @property is a global at-rule even inside a scoped <style>, and registering
    the same name twice is idempotent, so this is safe alongside
    HoverBorderGradient's own registration.

    Rotation only — no blur, no scale, nothing that re-rasterises. The site has
    been to 8fps once over exactly that kind of layer.
  */
  @property --sb-angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }

  .is-glowing::before {
    content: "";
    position: absolute;
    inset: -1.5px;
    border-radius: inherit;
    padding: 1.5px;
    background: conic-gradient(
      from var(--sb-angle),
      transparent 0%,
      rgb(var(--warm)) 12%,
      rgb(var(--brand-strong)) 22%,
      transparent 34%,
      transparent 100%
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: fx-sb-spin var(--sb-glow-duration, 4s) linear infinite;
    pointer-events: none;
  }

  @keyframes fx-sb-spin {
    to {
      --sb-angle: 360deg;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .is-glowing::before {
      animation: none;
    }
  }

  .fx-sb-fan {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  /*
    The label sits ON TOP of the icon row, not beside it. Both occupy the pill's
    full box, so the swap is a crossfade in place and the pill never changes
    size — the icons land exactly where the words were.
  */
  .fx-sb-label {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      opacity 200ms ease,
      transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
    pointer-events: none;
  }

  .fx-sb-pill:hover .fx-sb-label,
  .fx-sb-pill:focus-within .fx-sb-label {
    opacity: 0;
    transform: translateY(-45%);
  }

  /*
    The slot reserves its full width AT REST, so the pill is already its final
    size and does not grow on hover. ("The button itself shouldn't increase in
    size from how it currently is...it should already be that big size. Once I
    hover over it, then the logos will appear coming in from the bottom")

    overflow:hidden is what makes the icons read as arriving from BELOW the
    button rather than just fading in place — the icon starts pushed down past
    the slot's bottom edge and is clipped until it rises into view.
  */
  .fx-sb-slot {
    position: relative;
    width: 2.6rem;
    height: 2.6rem;
  }

  /* Only the MASK clips. Putting overflow:hidden on the slot itself also ate
     the tooltip, which has to escape upward. */
  .fx-sb-mask {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 9999px;
  }

  .fx-sb-rise {
    display: block;
    height: 100%;
    opacity: 0;
    transform: translateY(115%);
    transition:
      opacity 240ms ease,
      transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: calc(var(--sb-index) * var(--sb-stagger));
  }

  .fx-sb-pill:hover .fx-sb-rise,
  .fx-sb-pill:focus-within .fx-sb-rise {
    opacity: 1;
    transform: translateY(0);
  }

  .fx-sb-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 9999px;
    border-width: 1px;
    border-style: solid;
    cursor: pointer;
    transition: transform 180ms ease, filter 180ms ease;
  }

  .fx-sb-action:hover,
  .fx-sb-action:focus-visible {
    transform: translateY(-3px) scale(1.08);
    filter: brightness(1.25);
  }

  /* Handle label above each icon; only shown for the one being hovered. */
  /* Sibling of the mask, not a child, so the clip that lets icons rise from the
     bottom edge doesn't swallow the tooltip too. */
  .fx-sb-tip {
    position: absolute;
    bottom: calc(100% + 0.5rem);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    padding: 0.25rem 0.55rem;
    border-radius: 0.5rem;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    text-transform: none;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 160ms ease, transform 160ms ease;
  }

  .fx-sb-slot:hover .fx-sb-tip,
  .fx-sb-slot:focus-within .fx-sb-tip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-sb-slot,
    .fx-sb-action,
    .fx-sb-tip {
      transition: none;
    }
  }
</style>
