<!--
  Fleur-de-lis — the Boy Scouts of America emblem.

  Hand-drawn: lucide has no scouting mark. Replaces the medal on the Eagle
  Scout honor, which was generic. ("have the boyscouts corn-like symbol and not
  a medal" — the corn-like shape is the fleur-de-lis.)

  currentColor and a 24x24 viewBox so it drops into lucide slots unchanged.
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
  <!-- Centre petal: a tapered spearhead rising from the band. -->
  <path d="M12 1.4c1.9 2.3 2.9 4.6 2.9 6.9 0 1.9-.7 3.7-2 5.4h-1.8c-1.3-1.7-2-3.5-2-5.4 0-2.3 1-4.6 2.9-6.9Z" />
  <!-- Side petals, curling outward and back in. -->
  <path d="M9.6 13.7c-1.9.6-3.4.4-4.6-.6-1.4-1.2-1.9-3-1.4-5.4.9 1 1.8 1.5 2.7 1.5.5 1.6 1.6 3 3.3 4.5Z" />
  <path d="M14.4 13.7c1.7-1.5 2.8-2.9 3.3-4.5.9 0 1.8-.5 2.7-1.5.5 2.4 0 4.2-1.4 5.4-1.2 1-2.7 1.2-4.6.6Z" />
  <!-- Binding band. -->
  <path d="M7.4 15h9.2a.9.9 0 0 1 0 1.8H7.4a.9.9 0 0 1 0-1.8Z" />
  <!-- Stem below the band. -->
  <path d="M11.1 17.6h1.8v3.1l1.5 1.5H9.6l1.5-1.5v-3.1Z" />
</svg>
