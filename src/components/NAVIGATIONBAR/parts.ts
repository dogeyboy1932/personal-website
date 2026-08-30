/*
  Named exports for the navbar's own pieces, so they import as
  `{ Logo, ThemeToggle }`. A .svelte file only has a default export, so the
  named form needs a re-export like this to exist.

  A FLAT FILE, not a folder, and deliberately NOT index.ts.

  index.ts exports NavigationBar, so re-exporting these from there made
  NavigationBar import from a file that imports NavigationBar. That cycle is not
  survivable under SSR: the namespace object is still null when the component
  renders, giving
    TypeError: Cannot read properties of null (reading 'Logo')
  It passed `bun run build` because compiling is not rendering.

  This file imports nothing from NavigationBar, so there is no cycle.
*/
export { default as Logo } from "./Logo.svelte";
export { default as ThemeToggle } from "./ThemeToggle.svelte";
