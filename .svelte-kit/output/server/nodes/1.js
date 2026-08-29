

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.9beef105.js","_app/immutable/chunks/scheduler.cd15ae3c.js","_app/immutable/chunks/index.8e49917d.js","_app/immutable/chunks/stores.cf5a9dd1.js","_app/immutable/chunks/singletons.55f0ce8f.js","_app/immutable/chunks/index.cb5194ce.js"];
export const stylesheets = [];
export const fonts = [];
