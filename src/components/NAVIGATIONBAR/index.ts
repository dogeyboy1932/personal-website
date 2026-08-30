export { default as NavigationBar } from "./NavigationBar.svelte";

/*
  Named exports for the navbar's own pieces, so they import as
  `{ Logo, ThemeToggle }` rather than as defaults — a .svelte file only has a
  default export, so the named form needs a re-export like this to exist.

  CAVEAT: NavigationBar.svelte imports these from here, and this file also
  exports NavigationBar — a circular import. It resolves because Svelte reads
  component bindings at RENDER time, by which point the cycle has settled, not
  at module-evaluation time. Keep it in mind if anything here ever needs a value
  at module scope.
*/
export { default as Logo } from "./Logo.svelte";
export { default as ThemeToggle } from "./ThemeToggle.svelte";
