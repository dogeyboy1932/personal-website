<script lang="ts">
  export let items: {
    key: string;
    label: string;
    note: string;
    badge?: string;
    href?: string;
  }[] = [];
  export let marquee = 12;
  export let rowHeight = "4.5rem";
  export let columns = 0;

  let dirs: Record<string, number> = {};

  function edge(event: PointerEvent, node: HTMLElement): number {
    const rect = node.getBoundingClientRect();
    return event.clientY < rect.top + rect.height / 2 ? -1 : 1;
  }

  function onEnter(event: PointerEvent, key: string) {
    dirs[key] = edge(event, event.currentTarget as HTMLElement);
    dirs = dirs;
  }

  function onLeave(event: PointerEvent, key: string) {
    dirs[key] = edge(event, event.currentTarget as HTMLElement);
    dirs = dirs;
  }
</script>

<ul
  class="fx-flowing-menu"
  class:is-grid={columns > 0}
  style="--fm-row-height: {rowHeight}; --fm-marquee: {marquee}s; --fm-cols: {columns};"
>
  {#each items as item (item.key)}
    <li
      class="fx-fm-row"
      style="--fm-dir: {dirs[item.key] ?? -1};"
      on:pointerenter={(e) => onEnter(e, item.key)}
      on:pointerleave={(e) => onLeave(e, item.key)}
    >
      <svelte:element
        this={item.href ? "a" : "div"}
        href={item.href}
        target={item.href ? "_blank" : undefined}
        rel={item.href ? "noopener noreferrer" : undefined}
        class="fx-fm-face"
      >
        {#if item.badge}
          <span class="fx-fm-badge">{item.badge}</span>
        {/if}
        <span class="fx-fm-label">{item.label}</span>
        <span class="fx-fm-note">{item.note}</span>
      </svelte:element>

      <div class="fx-fm-panel" aria-hidden="true">
        <div class="fx-fm-marquee">
          {#each Array(4) as _}
            <span class="fx-fm-marquee-item">
              {#if item.badge}<span class="fx-fm-marquee-badge">{item.badge}</span>{/if}
              {item.label}
              <span class="fx-fm-marquee-sep">·</span>
              <span class="fx-fm-marquee-note">{item.note}</span>
              <span class="fx-fm-marquee-sep">·</span>
            </span>
          {/each}
        </div>
      </div>
    </li>
  {/each}
</ul>

<style>
  .fx-flowing-menu {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid rgb(148 163 184 / 0.18);
  }

  .is-grid {
    display: grid;
    grid-template-columns: repeat(var(--fm-cols), minmax(0, 1fr));
    gap: 0.5rem;
    border-top: 0;
  }

  .is-grid .fx-fm-row {
    border-bottom: 0;
    border: 1px solid rgb(var(--warm) / 0.22);
    border-radius: 0.6rem;
    transition: border-color 300ms ease;
  }

  .is-grid .fx-fm-row:hover,
  .is-grid .fx-fm-row:focus-within {
    border-color: rgb(var(--warm) / 0.5);
  }

  .is-grid .fx-fm-face {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    padding: 0 0.5rem;
    text-align: left;
  }

  .is-grid .fx-fm-badge {
    font-size: 1.9rem;
    flex-shrink: 0;
  }

  .is-grid .fx-fm-label {
    font-size: 0.95rem;
    line-height: 1.15;
  }

  .is-grid .fx-fm-note {
    display: none;
  }

  .is-grid .fx-fm-marquee {
    font-size: 0.7rem;
  }

  @media (max-width: 860px) {
    .is-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media (max-width: 520px) {
    .is-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .fx-fm-row {
    position: relative;
    height: var(--fm-row-height);
    overflow: hidden;
    border-bottom: 1px solid rgb(148 163 184 / 0.18);
  }

  .fx-fm-face {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0.9rem;
    height: 100%;
    padding: 0 1rem;
    text-decoration: none;
    color: inherit;
    transition: opacity 300ms ease;
  }

  .fx-fm-badge {
    font-size: 1.6rem;
    line-height: 1;
  }

  .fx-fm-label {
    font-weight: 600;
    font-size: 1.05rem;
    letter-spacing: 0.01em;
  }

  .fx-fm-note {
    font-size: 0.82rem;
    opacity: 0.62;
    display: none;
  }

  @media (min-width: 640px) {
    .fx-fm-note {
      display: inline;
    }
  }

  .fx-fm-row:hover .fx-fm-face,
  .fx-fm-row:focus-within .fx-fm-face {
    opacity: 0;
  }

  .fx-fm-panel {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: linear-gradient(90deg, #f59e0b, #fb923c, #f59e0b);
    transform: translateY(calc(var(--fm-dir) * -101%));
    visibility: hidden;
    transition:
      transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
      visibility 0s linear 420ms;
    pointer-events: none;
  }

  .fx-fm-row:hover .fx-fm-panel,
  .fx-fm-row:focus-within .fx-fm-panel {
    transform: translateY(0);
    visibility: visible;
    /* No delay on the way in — it must be painted before the slide starts. */
    transition:
      transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
      visibility 0s linear 0s;
  }

  .fx-fm-marquee {
    display: flex;
    align-items: center;
    white-space: nowrap;
    animation: fx-fm-scroll var(--fm-marquee) linear infinite;
    color: #1c1207;
    font-weight: 700;
    font-size: 0.95rem;
  }

  .fx-fm-marquee-item {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding-right: 1.2rem;
  }

  .fx-fm-marquee-badge {
    font-size: 1.3rem;
  }

  .fx-fm-marquee-note {
    font-weight: 500;
    opacity: 0.8;
  }

  .fx-fm-marquee-sep {
    opacity: 0.45;
  }

  @keyframes fx-fm-scroll {
    to {
      transform: translateX(-25%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fx-fm-panel,
    .fx-fm-face {
      transition: none;
    }
    /* With no transform transition the panel would jump; keep it unpainted at
       rest so the reduced-motion path cannot show the sliver either. */
    .fx-fm-panel {
      visibility: hidden;
    }
    .fx-fm-row:hover .fx-fm-panel,
    .fx-fm-row:focus-within .fx-fm-panel {
      visibility: visible;
    }
    .fx-fm-marquee {
      animation: none;
    }
  }
</style>
