<script lang="ts">
  import { Instagram, Mail, Github, Linkedin, Check, ChessKnightIcon } from "lucide-svelte";
  import { theme } from "../../lib/stores";
  import type { SocialHandle } from "../../types";

  import DiscordLogo from "../../lib/OtherLogos/DiscordLogo.svelte"

  export let actions: SocialHandle[] = [];
  export let glow = false;
  export let glowDuration = 4;

  const icons = {
    instagram: Instagram,
    discord: DiscordLogo,
    lichess: ChessKnightIcon,
    mail: Mail,
    github: Github,
    linkedin: Linkedin,
  } as const;

  let copied: string | null = null;
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  async function copy(action: SocialHandle) {
    try {
      await navigator.clipboard.writeText(action.handle);
      copied = action.handle;
      clearTimeout(copyTimer);
      copyTimer = setTimeout(() => (copied = null), 1800);
    } catch {
      copied = null;
    }
  }
</script>

<div class="fx-share-button" style="--fx-arc-duration: {glowDuration}s;">
  <div
    class="fx-sb-pill {$theme.bg.secondary} {$theme.border.default} {$theme.text.secondary}"
    class:fx-arc={glow}
  >

    <div class="fx-sb-fan">
      {#each actions as action, i}
        {@const Icon = icons[action.icon]}
        <div class="fx-sb-slot">
          <span class="fx-sb-mask">
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
    .fx-sb-slot,
    .fx-sb-action,
    .fx-sb-tip {
      transition: none;
    }
  }
</style>
