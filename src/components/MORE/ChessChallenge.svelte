<script lang="ts">
  import { Check, X, Loader2, ExternalLink, ChessKnightIcon } from "lucide-svelte";
  import { theme } from "../../lib/stores";

  const USERNAME_RE = /^[a-zA-Z0-9][\w-]{1,29}$/;

  export let standalone = false;

  let username = "";
  let sending = false;

  type State = "idle" | "sent" | "error";
  let state: State = "idle";
  let message = "";
  let handoffUrl: string | null = null;

  function onInput() {
    if (state !== "idle") {
      state = "idle";
      message = "";
      handoffUrl = null;
    }
  }

  async function send() {
    const value = username.trim();
    if (!value || sending) return;

    // Cheap local shape check first, so an obviously bad value never leaves the
    if (!USERNAME_RE.test(value)) {
      state = "error";
      message = "That doesn't look like a Lichess username.";
      return;
    }

    sending = true;
    handoffUrl = null;
    try {
      const res = await fetch("/api/chess-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: value }),
      });
      const data = await res.json().catch(() => null);

      if (data?.ok) {
        state = "sent";
        message = `${data.message} I may not be at the board right now, but I'll take it.`;
      } else {
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
    state === "error"
      ? "border-rose-400/70 focus:border-rose-300"
      : state === "sent"
      ? "border-emerald-400/70 focus:border-emerald-300"
      : `${$theme.border.light} focus:border-slate-400`;
</script>

<div class={standalone ? `rounded-2xl border ${$theme.border.default} ${$theme.bg.card} p-6` : ""}>
  <div class="mb-1 flex items-center gap-2">
    <ChessKnightIcon class="h-5 w-5 {$theme.text.white}" />
    <h4 class="meta-label text-sm {$theme.text.white}">Play me</h4>
  </div>
  <p class="mb-3 text-xs {$theme.text.secondary}">
    Drop your Lichess username and I'll fire a casual 10+0 your way. It'll sit
    in your Lichess inbox — I might be AFK, but I'll get to it.
  </p>

  <form class="flex flex-col gap-2" on:submit|preventDefault={send}>
    <div class="group relative flex-1">
      <input
        bind:value={username}
        on:input={onInput}
        type="text"
        autocomplete="off"
        spellcheck="false"
        placeholder="your lichess username"
        aria-label="Lichess username"
        aria-invalid={state === "error"}
        aria-describedby={state === "error" ? "chess-challenge-error" : undefined}
        class="w-full rounded-xl border-2 {$theme.bg.cardSolid} px-3 py-2.5 pr-9 text-sm outline-none transition-colors {$theme.text.primary} {ringClass}"
      />

      <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        {#if sending}
          <Loader2 class="h-4 w-4 animate-spin {$theme.text.dim}" />
        {:else if state === "sent"}
          <Check class="h-4 w-4 text-emerald-400" />
        {:else if state === "error"}
          <X class="h-4 w-4 text-rose-400" />
        {/if}
      </span>

      {#if state === "error"}
        <span
          id="chess-challenge-error"
          role="tooltip"
          class="pointer-events-none absolute bottom-full left-0 z-20 mb-2 w-max max-w-[15rem] rounded-lg border border-rose-400/50 bg-slate-950 px-2.5 py-1.5 text-xs leading-snug text-rose-300 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          {message}
          {#if handoffUrl}
            <a
              href={handoffUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="pointer-events-auto mt-1 inline-flex items-center gap-1 underline underline-offset-4 hover:opacity-80"
            >
              Challenge me on Lichess <ExternalLink class="h-3 w-3" />
            </a>
          {/if}
        </span>
      {/if}
    </div>

        <!-- Enabled whenever there is something to send. -->
    <button
      type="submit"
      disabled={!username.trim() || sending}
      class="w-full rounded-xl border-2 px-4 py-2.5 font-display text-xs font-bold uppercase tracking-[0.18em] transition-all disabled:cursor-not-allowed disabled:opacity-40 {$theme.accent.orange.border} {$theme.accent.orange.bg} {$theme.text.primary} hover:enabled:scale-[1.03]"
    >
      {sending ? "Sending" : "Challenge"}
    </button>
  </form>

  <p
    class="text-xs text-emerald-400 {state === 'sent' ? 'mt-3' : ''}"
    aria-live="polite"
  >
    {state === "sent" ? message : ""}
  </p>
</div>
