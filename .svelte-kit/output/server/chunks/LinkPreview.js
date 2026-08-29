import { c as create_ssr_component, d as add_attribute } from "./ssr.js";
const LinkPreview = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let previewStyle;
  let { href } = $$props;
  let { label } = $$props;
  let { className = "" } = $$props;
  let trigger;
  let isOpen = false;
  let previewX = 0;
  let previewY = 0;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.className === void 0 && $$bindings.className && className !== void 0)
    $$bindings.className(className);
  previewStyle = `left: ${previewX}px; top: ${previewY}px;`;
  return ` <a${add_attribute("href", href, 0)} target="_blank" rel="noopener noreferrer"${add_attribute("class", className, 0)}${add_attribute("data-state", "closed", 0)}${add_attribute("this", trigger, 0)}>${slots.default ? slots.default({}) : ``}</a> <div${add_attribute(
    "class",
    `pointer-events-none fixed z-[100] w-60 overflow-hidden rounded-xl border border-yellow-300/40 bg-slate-950/95 p-2 shadow-xl shadow-black/40 transition-all duration-200 motion-reduce:transition-none ${"invisible translate-y-1 opacity-0"}`,
    0
  )}${add_attribute("style", previewStyle, 0)}${add_attribute("aria-hidden", !isOpen, 0)}>${``}</div>`;
});
export {
  LinkPreview as L
};
