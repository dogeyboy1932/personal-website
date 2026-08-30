<!--
  Chess knight. lucide-svelte has no chess pieces, so this is a hand-drawn
  path rather than an icon-set import. ("The chess logo should be a knight")

  Drawn as three explicit parts — plinth, body, eye — instead of one clever
  path, because a single path at 20px collapsed into an unreadable blob. The
  silhouette that actually reads at icon size is: flat base, steep chest,
  muzzle pointing left, ear pointing up.

  currentColor and a 24x24 viewBox, so it drops into lucide slots unchanged.
-->
<script lang="ts">
  let klass = "";
  export { klass as class };
</script>

<svg
  viewBox="0 0 24 24"
  fill="currentColor"
  xmlns="http://www.w3.org/2000/svg"
  class={klass}
  aria-hidden="true"
>
  <!-- Plinth -->
  <path d="M5 20.2h14a.8.8 0 0 1 .8.8v.6a.4.4 0 0 1-.4.4H4.6a.4.4 0 0 1-.4-.4V21a.8.8 0 0 1 .8-.8Z" />
  <!-- Body: ear at the top, muzzle jutting left, chest falling to the base -->
  <path
    d="M13.6 2.1a.6.6 0 0 1 1 .3l.5 2.4c2.6 1.3 4.3 3.9 4.6 6.9l.5 5.2c.1.9-.6 1.7-1.5 1.7H8.1c-.9 0-1.6-.8-1.5-1.7.2-2 1.2-3.8 2.8-5l1.9-1.4-3 1a2 2 0 0 1-2.5-1.2l-.4-1.2a2 2 0 0 1 .7-2.3l3.3-2.4-.9-1.3a.6.6 0 0 1 .3-.9l1.6-.5a.6.6 0 0 1 .6.2l.8 1 1.3-1.1Z"
  />
  <!-- Eye, punched out of the body -->
  <circle cx="10.4" cy="7.5" r="0.85" fill="var(--knight-eye, #0b0b0f)" />
</svg>
