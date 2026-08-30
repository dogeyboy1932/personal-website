import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import type { RequestHandler } from "./$types";

/**
 * Lichess challenge endpoint.
 *
 * updates.txt: "send chess challenges (have an input box...if the username is
 * valid then a challenge will be created (deterministic api call and check)).
 * If invalid, then red error otherwise green 'chellegne sent'"
 *
 * Why this is a server route rather than a fetch from the browser:
 * creating a challenge requires an OAuth token with the `challenge:write`
 * scope. A token shipped in the client bundle is readable by anyone, who could
 * then send challenges as the site owner. It stays server-side, read from the
 * environment, and is never returned to the client.
 *
 * SETUP (done by the site owner, not in this repo):
 *   1. lichess.org -> Preferences -> API access tokens -> New token
 *      Scope: `challenge:write` ONLY. Nothing else.
 *   2. Netlify -> Site settings -> Environment variables -> LICHESS_TOKEN
 * The token must never be committed, pasted into a file, or shared.
 *
 * Until that variable exists the endpoint still answers usefully: it validates
 * the username and reports `configured: false`, and the UI falls back to
 * handing the visitor off to Lichess. The feature is therefore shippable
 * before the token is set.
 */

/** This route is dynamic; the rest of the site is prerendered. */
export const prerender = false;

/** Lichess usernames: 2-30 chars, alphanumeric plus _ and -, must start alphanumeric. */
const USERNAME_RE = /^[a-zA-Z0-9][\w-]{1,29}$/;

interface Result {
  ok: boolean;
  /** Machine-readable so the UI can pick its own copy. */
  status:
    | "sent"
    | "not_configured"
    | "invalid_format"
    | "not_found"
    | "cannot_challenge"
    | "upstream_error";
  message: string;
  /** Present when the caller should hand off to Lichess instead. */
  handoffUrl?: string;
}

const reply = (result: Result, code: number) => json(result, { status: code });

export const POST: RequestHandler = async ({ request, fetch }) => {
  let username = "";
  try {
    const body = await request.json();
    username = String(body?.username ?? "").trim();
  } catch {
    return reply(
      { ok: false, status: "invalid_format", message: "Malformed request." },
      400
    );
  }

  // Cheap local check first, so an obviously bad value never hits Lichess.
  if (!USERNAME_RE.test(username)) {
    return reply(
      {
        ok: false,
        status: "invalid_format",
        message: "That doesn't look like a Lichess username.",
      },
      400
    );
  }

  // Deterministic existence check against the public endpoint.
  let profile: Response;
  try {
    profile = await fetch(`https://lichess.org/api/user/${encodeURIComponent(username)}`);
  } catch {
    return reply(
      { ok: false, status: "upstream_error", message: "Couldn't reach Lichess. Try again." },
      502
    );
  }

  if (profile.status === 404) {
    return reply(
      { ok: false, status: "not_found", message: `No Lichess user "${username}".` },
      404
    );
  }
  if (!profile.ok) {
    return reply(
      { ok: false, status: "upstream_error", message: "Lichess returned an error." },
      502
    );
  }

  const data = await profile.json().catch(() => ({}));

  // A closed or tos-violating account exists but cannot be challenged; saying
  // "sent" here would be a lie the visitor only discovers on Lichess.
  if (data?.disabled || data?.tosViolation) {
    return reply(
      {
        ok: false,
        status: "cannot_challenge",
        message: `"${username}" can't be challenged.`,
      },
      409
    );
  }

  const token = env.LICHESS_TOKEN;
  if (!token) {
    return reply(
      {
        ok: false,
        status: "not_configured",
        message: `"${username}" exists, but challenges aren't wired up yet.`,
        handoffUrl: `https://lichess.org/@/${encodeURIComponent(username)}`,
      },
      200
    );
  }

  // Create the challenge: casual 10+0, rated:false so an anonymous visitor
  // clicking a button on a portfolio can't affect anyone's rating.
  let challenge: Response;
  try {
    challenge = await fetch(
      `https://lichess.org/api/challenge/${encodeURIComponent(username)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          rated: "false",
          "clock.limit": "600",
          // 10+0 — ten minutes, no increment. ("It should also be a 10 + 0
          // challenge.")
          "clock.increment": "0",
          color: "random",
          variant: "standard",
        }),
      }
    );
  } catch {
    return reply(
      { ok: false, status: "upstream_error", message: "Couldn't reach Lichess. Try again." },
      502
    );
  }

  if (!challenge.ok) {
    const detail = await challenge.text().catch(() => "");
    // Never surface the raw upstream body — it can echo request details.
    console.error("lichess challenge failed", challenge.status, detail.slice(0, 200));
    return reply(
      {
        ok: false,
        status: "upstream_error",
        message: "Lichess wouldn't accept the challenge.",
        handoffUrl: `https://lichess.org/@/${encodeURIComponent(username)}`,
      },
      502
    );
  }

  return reply(
    { ok: true, status: "sent", message: `Challenge sent to ${username}.` },
    200
  );
};
