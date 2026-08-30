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

<div class="fx-share-button" style="--sb-stagger: {stagger}ms;">
  <div class="fx-sb-pill {$theme.bg.secondary} {$theme.border.default} {$theme.text.secondary}">
    <span class="fx-sb-label">{label}</span>

    <div class="fx-sb-fan">
      {#each actions as action, i}
        {@const Icon = icons[action.icon]}
        <div class="fx-sb-slot" style="--sb-index: {i};">
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

  /* Enlarged: "The find me button is too small." */
  .fx-sb-pill {
    display: inline-flex;
    align-items: center;
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

  .fx-sb-fan {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .fx-sb-slot {
    position: relative;
    /* Collapsed at rest: zero width so the pill hugs its label, then each slot
       opens in turn. Animating width rather than only transform is what lets
       the pill itself grow instead of the icons overflowing it. */
    width: 0;
    opacity: 0;
    /* Rises from below on hover: "WHen I hover, the logos should appear from
       the bottom." Was a sideways slide. */
    transform: translateY(14px) scale(0.7);
    transition:
      width 320ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 260ms ease,
      transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: calc(var(--sb-index) * var(--sb-stagger));
  }

  .fx-sb-pill:hover .fx-sb-slot,
  .fx-sb-pill:focus-within .fx-sb-slot {
    width: 2.6rem;
    opacity: 1;
    transform: translateY(0) scale(1);
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
