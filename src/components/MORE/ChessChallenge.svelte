<!--
  /more section: send me a chess challenge.

  updates.txt: "send chess challenges (have an input box...if the username is
  valid then a challenge will be created (deterministic api call and check)).
  If invalid, then red error otherwise green 'chellegne sent'"

  Two layers, both real:
   - As you type (debounced), the public Lichess profile endpoint is checked
     straight from the browser — the same call LichessCard.svelte already
     makes. That drives the red/green state deterministically.
   - Submitting posts to /api/chess-challenge, which holds the OAuth token
     server-side and actually creates the challenge.

  If LICHESS_TOKEN isn't set yet the endpoint says so and returns a handoff
  URL, and this falls back to opening Lichess — so the box is useful before
  the token exists rather than being dead UI.
-->
<script lang="ts">
  import { Check, X, Loader2, ExternalLink } from "lucide-svelte";
  import KnightIcon from "../icons/KnightIcon.svelte";
  import { theme } from "../../lib/stores";

  /** Same shape Lichess accepts: 2-30 chars, alphanumeric plus _ and -. */
  const USERNAME_RE = /^[a-zA-Z0-9][\w-]{1,29}$/;

  let username = "";
  let checking = false;
  let sending = false;

  type State = "idle" | "valid" | "invalid" | "sent" | "error";
  let state: State = "idle";
  let message = "";
  let handoffUrl: string | null = null;

  /** Render with its own card border/background. Off when nested. */
  export let standalone = false;

  let debounce: ReturnType<typeof setTimeout>;
  /** Guards against an earlier, slower check overwriting a newer one. */
  let checkId = 0;

  function onInput() {
    clearTimeout(debounce);
    handoffUrl = null;
    const value = username.trim();

    if (!value) {
      state = "idle";
      message = "";
      return;
    }
    if (!USERNAME_RE.test(value)) {
      state = "invalid";
      message = "That doesn't look like a Lichess username.";
      return;
    }
    debounce = setTimeout(() => verify(value), 400);
  }

  async function verify(value: string) {
    const id = ++checkId;
    checking = true;
    try {
      const res = await fetch(`https://lichess.org/api/user/${encodeURIComponent(value)}`);
      if (id !== checkId) return; // a newer keystroke already superseded this
      if (res.status === 404) {
        state = "invalid";
        message = `No Lichess user "${value}".`;
      } else if (!res.ok) {
        state = "invalid";
        message = "Couldn't reach Lichess.";
      } else {
        const data = await res.json().catch(() => ({}));
        if (data?.disabled || data?.tosViolation) {
          state = "invalid";
          message = `"${value}" can't be challenged.`;
        } else {
          state = "valid";
          message = `${value} found.`;
        }
      }
    } catch {
      if (id !== checkId) return;
      state = "invalid";
      message = "Couldn't reach Lichess.";
    } finally {
      if (id === checkId) checking = false;
    }
  }

  async function send() {
    if (state !== "valid" || sending) return;
    sending = true;
    handoffUrl = null;
    try {
      const res = await fetch("/api/chess-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim() }),
      });
      const data = await res.json().catch(() => null);

      if (data?.ok) {
        state = "sent";
        message = data.message;
      } else {
        // not_configured is not a failure — it means finish on Lichess.
        state = "error";
        message = data?.message ?? "Something went wrong.";
        handoffUrl = data?.handoffUrl ?? null;
      }
    } catch {
      state = "error";
      message = "Couldn't reach the server.";
    } finally {
      sending = false;
    }
  }

  $: ringClass =
    state === "invalid" || state === "error"
      ? "border-rose-400/70 focus:border-rose-300"
      : state === "valid" || state === "sent"
      ? "border-emerald-400/70 focus:border-emerald-300"
      : `${$theme.border.light} focus:border-slate-400`;
</script>

<!-- No card chrome of its own: this now renders inside LichessCard's box.
     Pass `standalone` to get the border/background back. -->
<div class={standalone ? `rounded-2xl border ${$theme.border.default} ${$theme.bg.card} p-6` : ""}>
  <div class="mb-1 flex items-center gap-2">
    <KnightIcon class="h-5 w-5 {$theme.text.white}" />
    <h4 class="meta-label text-sm {$theme.text.white}">Play me</h4>
  </div>
  <p class="mb-3 text-xs {$theme.text.secondary}">
    Drop your Lichess username and I'll send a casual 10+0 challenge.
  </p>

  <form class="flex gap-2" on:submit|preventDefault={send}>
    <div class="relative flex-1">
      <input
        bind:value={username}
        on:input={onInput}
        type="text"
        autocomplete="off"
        spellcheck="false"
        placeholder="your lichess username"
        aria-label="Lichess username"
        aria-invalid={state === "invalid" || state === "error"}
        class="w-full rounded-xl border-2 {$theme.bg.cardSolid} px-3 py-2.5 pr-9 text-sm outline-none transition-colors {$theme.text.primary} {ringClass}"
      />

      <!-- Status glyph, so the state reads without relying on colour alone -->
      <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        {#if checking}
          <Loader2 class="h-4 w-4 animate-spin {$theme.text.dim}" />
        {:else if state === "valid" || state === "sent"}
          <Check class="h-4 w-4 text-emerald-400" />
        {:else if state === "invalid" || state === "error"}
          <X class="h-4 w-4 text-rose-400" />
        {/if}
      </span>
    </div>

    <button
      type="submit"
      disabled={state !== "valid" || sending}
      class="rounded-xl border-2 px-4 py-2.5 font-display text-xs font-bold uppercase tracking-[0.18em] transition-all disabled:cursor-not-allowed disabled:opacity-40 {$theme.accent.orange.border} {$theme.accent.orange.bg} {$theme.text.primary} hover:enabled:scale-[1.03]"
    >
      {sending ? "Sending" : "Challenge"}
    </button>
  </form>

  <!-- aria-live so the result is announced, not just shown -->
  <p
    class="mt-3 min-h-[1.25rem] text-xs {state === 'invalid' || state === 'error'
      ? 'text-rose-400'
      : state === 'valid' || state === 'sent'
      ? 'text-emerald-400'
      : $theme.text.dim}"
    aria-live="polite"
  >
    {message}
    {#if handoffUrl}
      <a
        href={handoffUrl}
        target="_blank"
        rel="noopener noreferrer"
        class="ml-1 inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-80"
      >
        Send it on Lichess <ExternalLink class="h-3 w-3" />
      </a>
    {/if}
  </p>
</div>
