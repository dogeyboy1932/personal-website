

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.9d1b68be.js","_app/immutable/chunks/scheduler.cd15ae3c.js","_app/immutable/chunks/index.8e49917d.js","_app/immutable/chunks/stores.7222852e.js","_app/immutable/chunks/singletons.63405c95.js","_app/immutable/chunks/index.cb5194ce.js"];
export const stylesheets = [];
export const fonts = [];
