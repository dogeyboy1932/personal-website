<!--
  FX: flowing-menu
  Source: https://reactbits.dev/components/flowing-menu (React) — reimplemented in Svelte

  Full-width rows. Hovering one slides a marquee panel in from the direction
  the cursor entered, scrolling the row's note across it on repeat.

  Routed to TRAVEL per the brief ("maybe the flowing menu could be for like the
  travel stuff where I indicate what countries I've been to") — one row per
  country, the marquee carrying the flag and the note.

  Used by: src/components/MORE/TravelSection.svelte

  Tunables:
    items      [{ key, label, note, badge }]
    marquee    seconds per marquee loop     default 12
    rowHeight  CSS height of each row       default "4.5rem"

  Entry direction: the original React version measures where the pointer
  crossed the row's edge and animates in from that side. That is preserved
  here — the panel slides down if you enter from the top and up if from the
  bottom, which is what makes the effect feel physical rather than canned.

  Rows render as <a> when `href` is set, otherwise as plain divs; the marquee
  panel is aria-hidden since it only repeats content already in the row.
-->
<script lang="ts">
  export let items: {
    key: string;
    label: string;
    note: string;
    /** Optional leading glyph — a flag emoji for the travel rows. */
    badge?: string;
    href?: string;
  }[] = [];
  export let marquee = 12;
  export let rowHeight = "4.5rem";
  /**
   * 0 = the original full-width row list.
   * >0 = a grid with this many columns, each CELL behaving as one flowing row.
   *
   * Added for the /more countries: seven full-width rows was a large part of
   * why that page ran long, but the hover-marquee is the effect the user picked
   * for travel. ("i think the current setup for the countries is good. Each
   * cell can be a flow menu.")
   */
  export let columns = 0;

  /** Per-row entry/exit direction: -1 = from above, 1 = from below. */
  let dirs: Record<string, number> = {};

  /** Which half of the row's height the pointer was nearest when it crossed. */
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

      <!-- The panel that slides in. Content is repeated so the marquee has
           something to scroll into as the first copy leaves. -->
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

  /* Grid mode: cells instead of stacked rows. The hover panel, entry direction
     and marquee all work unchanged — only the layout differs. */
  .is-grid {
    display: grid;
    grid-template-columns: repeat(var(--fm-cols), minmax(0, 1fr));
    gap: 0.5rem;
    border-top: 0;
  }

  /*
    A LIGHT WARM BORDER, so the country cells read as their own thing rather
    than as seven more neutral boxes on a page full of neutral boxes.
    ("add a little border color to country card so it's more identifiable...keep
    it light")

    --warm rather than a literal, and at 0.22 alpha: the same hue as the orange
    marquee panel that slides in on hover, so the resting border reads as a
    preview of the interaction instead of an unrelated accent. Alpha does the
    "keep it light" — it is a tint on the border only, nothing filled.

    Hover lifts it to 0.5 so the cell acknowledges the pointer before the panel
    finishes sliding in.
  */
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

  /* Flag LEFT of the name, not stacked above it. ("The flag icon should be
     left of the country name.") Row + centred as a pair, so short and long
     names both sit balanced in the cell. */
  .is-grid .fx-fm-face {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    padding: 0 0.5rem;
    text-align: left;
  }

  /* Bigger on request: "Countries is too small. Make flag and text bigger." */
  .is-grid .fx-fm-badge {
    font-size: 1.9rem;
    flex-shrink: 0;
  }

  .is-grid .fx-fm-label {
    font-size: 0.95rem;
    line-height: 1.15;
  }

  /* The row layout shows the note inline; in a cell there is no room, so it
     lives only in the marquee panel. */
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
    /* Hidden on narrow screens: the marquee carries it on hover anyway. */
    display: none;
  }

  @media (min-width: 640px) {
    .fx-fm-note {
      display: inline;
    }
  }

  /* The row's own content fades as the panel takes over. */
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
    /*
      --fm-dir is -1 when the pointer crossed the top edge and 1 when it
      crossed the bottom, so the panel always arrives from where you came.

      101%, not 100%, and visibility:hidden on top of it. ("when I mount 'more'
      the countries card has an orange line that appears at the top of the card
      occassionally...I don't want that to happen")

      At exactly 100% the panel's edge lands exactly on the row's edge, and the
      row is clipped by overflow:hidden on a rounded, fractionally-positioned
      grid cell. Rounding at that boundary leaves a sub-pixel of orange showing
      — intermittently, because whether it rounds in or out depends on the
      cell's fractional y, which changes with viewport width and with the
      transform scroll-reveal applies while the page is mounting. That is
      exactly the "occasionally" in the report.

      101% moves the edge off the boundary entirely. visibility is the
      guarantee: at rest the panel is not painted at all, so no rounding rule
      can expose it. Its transition is delayed by the slide duration so the
      panel stays visible for the whole slide OUT, then stops being painted.
    */
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

  /* Four identical copies, so shifting by exactly one quarter loops seamlessly. */
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
