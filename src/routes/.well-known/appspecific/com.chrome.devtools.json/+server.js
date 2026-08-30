/* Chrome DevTools probes this path on every page load; an empty 200 keeps the
   dev console free of 404 noise. */
export function GET() {
  return new Response(JSON.stringify({}), {
    headers: { "Content-Type": "application/json" },
  });
}
