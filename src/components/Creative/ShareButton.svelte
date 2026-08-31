<script lang="ts">
  import { Check } from "lucide-svelte";
  
  import { copyToClipboard } from "../../lib/utils";

  import { theme } from "../../constants/_theme";

  import { icons } from "../../constants/home";

  import type { SocialHandle } from "../../types";

  export let actions: SocialHandle[] = [];
  export let label = "Find me";
  export let glow = false;
  export let glowDuration = 4;
  export let stagger = 55;

  

  let copied: string | null = null;
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  async function copy(action: SocialHandle) {
    if (!(await copyToClipboard(action.handle))) {
      copied = null;
      return;
    }
    copied = action.handle;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => (copied = null), 1800);
  }
</script>

<div class="fx-share-button" style="--sb-stagger: {stagger}ms; --fx-arc-duration: {glowDuration}s;">
  <div
    class="fx-sb-pill {$theme.bg.secondary} {$theme.border.default} {$theme.text.secondary}"
    class:fx-arc={glow}
  >
    <!-- Absolutely centred, so the icons occupy the SAME space rather than sitting beside it —
         the pill never changes size and the icons land where the words were. -->
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
              {action.handle}
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

  .fx-sb-fan {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

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

  .fx-sb-slot {
    position: relative;
    width: 2.6rem;
    height: 2.6rem;
  }

  .fx-sb-mask {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 9999px;
  }

  /* CAVEAT: only the MASK clips. overflow:hidden on the slot itself also ate the tooltip,
     which has to escape upward. */
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
    .fx-sb-label,
    .fx-sb-rise,
    .fx-sb-slot,
    .fx-sb-action,
    .fx-sb-tip {
      transition: none;
    }
  }
</style>
