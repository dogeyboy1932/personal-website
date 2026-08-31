import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { more } from "../../../constants/more";
import type { RequestHandler } from "./$types";

/** Lichess challenge endpoint.
   SECURITY: creating a challenge needs an OAuth token with `challenge:write`. */

export const prerender = false;

const OWNER = more.lichess.username;

/** "realtime" is 10+0.
   CAVEAT: a real-time challenge starts a live game the moment it is accepted, whether or not the
   owner is at the board — flip to "correspondence" if that matters. */
const CHALLENGE_MODE: "realtime" | "correspondence" = "realtime";

const CORRESPONDENCE_DAYS = "3";

/** Lichess usernames: 2-30 chars, alphanumeric plus _ and -, must start alphanumeric. */
const USERNAME_RE = /^[a-zA-Z0-9][\w-]{1,29}$/;

interface Result {
  ok: boolean;
  status:
    | "sent"
    | "not_configured"
    | "invalid_format"
    | "not_found"
    | "cannot_challenge"
    | "upstream_error";
  message: string;
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
        handoffUrl: `https://lichess.org/@/${encodeURIComponent(OWNER)}`,
      },
      200
    );
  }

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

  return reply(
    {
      ok: true,
      status: "sent",
      message: `Challenge sent — it's waiting in ${username}'s Lichess inbox.`,
    },
    200
  );
};
