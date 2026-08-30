import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { more } from "../../../constants/more";
import type { RequestHandler } from "./$types";

/**
 * Lichess challenge endpoint. The challenge goes FROM the site owner TO the
 * visitor: POST /api/challenge/{visitor} with the OWNER's token.
 *
 * SECURITY: creating a challenge needs an OAuth token with `challenge:write`.
 * It stays server-side, read from LICHESS_TOKEN, and is never returned to the
 * client. Set it in Netlify -> Environment variables; never commit it.
 *
 * Without the token the endpoint still validates and reports `not_configured`,
 * so the feature is shippable before the token exists.
 */

/** This route is dynamic; the rest of the site is prerendered. */
export const prerender = false;

/** Who the challenge comes from. Single source of truth: src/constants/more.ts */
const OWNER = more.lichess.username;

/**
 * "realtime" is 10+0. CAVEAT: a real-time challenge starts a live game the
 * moment it is accepted, whether or not the owner is at the board — flip to
 * "correspondence" if that matters.
 */
const CHALLENGE_MODE: "realtime" | "correspondence" = "realtime";

/** Days per move when CHALLENGE_MODE is "correspondence". */
const CORRESPONDENCE_DAYS = "3";

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

  // Cheap local check first.
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

  // Exists but unchallengeable — saying "sent" would be a lie.
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
        message: `"${username}" exists, but auto-challenges aren't switched on yet.`,
        // The OWNER's profile — the visitor's own page is a dead end.
        handoffUrl: `https://lichess.org/@/${encodeURIComponent(OWNER)}`,
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
          color: "random",
          variant: "standard",
          ...(CHALLENGE_MODE === "realtime"
            ? // 10+0 — ten minutes, no increment. ("It should also be a 10 + 0
              // challenge.")
              { "clock.limit": "600", "clock.increment": "0" }
            : { days: CORRESPONDENCE_DAYS }),
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
    // CAVEAT: never surface the raw upstream body — it can echo request details.
    console.error("lichess challenge failed", challenge.status, detail.slice(0, 200));
    return reply(
      {
        ok: false,
        status: "upstream_error",
        message: "Lichess wouldn't accept the challenge.",
        handoffUrl: `https://lichess.org/@/${encodeURIComponent(OWNER)}`,
      },
      502
    );
  }

  // Says WAITING, not that a game has started — the owner may be away.
  return reply(
    {
      ok: true,
      status: "sent",
      message: `Challenge sent — it's waiting in ${username}'s Lichess inbox.`,
    },
    200
  );
};
