

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/resume/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.cc4009a0.js","_app/immutable/chunks/scheduler.cd15ae3c.js","_app/immutable/chunks/index.8e49917d.js","_app/immutable/chunks/index.631bbcda.js","_app/immutable/chunks/index.cb5194ce.js","_app/immutable/chunks/PageHeader.5ed1dee8.js"];
export const stylesheets = [];
export const fonts = [];
