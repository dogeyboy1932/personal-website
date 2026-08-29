import { c as create_ssr_component, a as validate_store, b as subscribe, g as escape } from "./ssr.js";
import { t as theme } from "./skills.js";
const PageHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { title = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$unsubscribe_theme();
  return `<section><h2 class="${"text-3xl uppercase tracking-[0.4em] " + escape($theme.text.muted, true) + " text-center"}">${escape(title)}</h2> <div class="${"mt-2 h-1 w-full rounded-full " + escape($theme.gradient.divider, true)}"></div></section>`;
});
export {
  PageHeader as P
};
