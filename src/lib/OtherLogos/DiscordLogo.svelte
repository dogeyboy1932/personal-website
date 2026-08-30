<!--
  Discord mark, sized like the lucide icons beside it: pass `class="h-5 w-5"`.

  CAVEAT: the artwork is drawn on a 256x256 canvas (the glyph spans x28-228,
  y51-206). The viewBox must match it. This previously computed `0 0 2 2`, which
  magnified a 2px corner of the canvas to fill the box — that is why the logo
  looked enormous and cropped.
-->
<script lang="ts">
  /** Explicit px size. Omit and size with `class` instead, like lucide. */
  export let size: number | string | undefined = undefined;
  export let opacity = 1;
  export let rotation = 0;
  export let flipHorizontal = false;
  export let flipVertical = false;
  /** Breathing room inside the box, in canvas units (256 = full width). */
  export let padding = 0;
  let klass = "";
  export { klass as class };

  const CANVAS = 256;

  $: transforms = [
    rotation !== 0 ? `rotate(${rotation}deg)` : "",
    flipHorizontal ? "scaleX(-1)" : "",
    flipVertical ? "scaleY(-1)" : "",
  ]
    .filter(Boolean)
    .join(" ");

  $: viewBox = `${-padding} ${-padding} ${CANVAS + padding * 2} ${CANVAS + padding * 2}`;
</script>

<!-- No stroke: this is a filled brand mark, and a stroke would outline every
     path. width/height are omitted unless `size` is given, so the class sizes it. -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  {viewBox}
  fill="none"
  class={klass}
  style="opacity: {opacity};{transforms ? ` transform: ${transforms};` : ''}"
  aria-hidden="true"
>
  <rect 
    x={padding} 
    y={padding} 
    width={CANVAS - padding} 
    height={CANVAS - padding} 
    rx="60" 
    
  />

  <g clip-path="url(#discord-glyph)">
    <path
      fill="#fff"
      d="M197.308 64.797a165 165 0 0 0-40.709-12.627a.62.62 0 0 0-.654.31c-1.758 3.126-3.706 7.206-5.069 10.412c-15.373-2.302-30.666-2.302-45.723 0c-1.364-3.278-3.382-7.286-5.148-10.412a.64.64 0 0 0-.655-.31a164.5 164.5 0 0 0-40.709 12.627a.6.6 0 0 0-.268.23c-25.928 38.736-33.03 76.52-29.546 113.836a.7.7 0 0 0 .26.468c17.106 12.563 33.677 20.19 49.94 25.245a.65.65 0 0 0 .702-.23c3.847-5.254 7.276-10.793 10.217-16.618a.633.633 0 0 0-.347-.881c-5.44-2.064-10.619-4.579-15.601-7.436a.642.642 0 0 1-.063-1.064a86 86 0 0 0 3.098-2.428a.62.62 0 0 1 .646-.088c32.732 14.944 68.167 14.944 100.512 0a.62.62 0 0 1 .655.08a80 80 0 0 0 3.106 2.436a.642.642 0 0 1-.055 1.064a102.6 102.6 0 0 1-15.609 7.428a.64.64 0 0 0-.339.889a133 133 0 0 0 10.208 16.61a.64.64 0 0 0 .702.238c16.342-5.055 32.913-12.682 50.02-25.245a.65.65 0 0 0 .26-.46c4.17-43.141-6.985-80.616-29.571-113.836a.5.5 0 0 0-.26-.238M94.834 156.142c-9.855 0-17.975-9.047-17.975-20.158s7.963-20.158 17.975-20.158c10.09 0 18.131 9.127 17.973 20.158c0 11.111-7.962 20.158-17.973 20.158m66.456 0c-9.855 0-17.974-9.047-17.974-20.158s7.962-20.158 17.974-20.158c10.09 0 18.131 9.127 17.974 20.158c0 11.111-7.884 20.158-17.974 20.158"
    />
  </g>
  <defs>
    <clipPath id="discord-glyph">
      <path fill="#fff" d="M28 51h200v154.93H28z" />
    </clipPath>
  </defs>
</svg>
