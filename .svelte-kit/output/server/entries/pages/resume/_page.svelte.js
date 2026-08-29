import { c as create_ssr_component, a as validate_store, b as subscribe, v as validate_component, g as escape, d as add_attribute } from "../../../chunks/ssr.js";
import { t as theme } from "../../../chunks/skills.js";
import { P as PageHeader } from "../../../chunks/PageHeader.js";
const resume = {
  url: "/resume.pdf",
  label: "Download Resume",
  pageTitle: "Resume",
  description: "Last updated: June 2026",
  embed: true,
  embedWidth: "100%",
  embedHeight: "800px"
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_theme();
  return `<section class="space-y-6">${validate_component(PageHeader, "PageHeader").$$render($$result, { title: resume.pageTitle }, {}, {})}  <div class="${"rounded-2xl border " + escape($theme.border.default, true) + " " + escape($theme.bg.card, true) + " p-6 shadow-lg"}"><p class="${"text-sm " + escape($theme.text.secondary, true)}">${escape(resume.description)}</p> ${` <div class="mt-4 w-full rounded-md overflow-hidden border"><iframe${add_attribute("title", resume.label, 0)}${add_attribute("src", resume.url, 0)}${add_attribute("width", resume.embedWidth, 0)}${add_attribute("height", resume.embedHeight, 0)} class="w-full h-[900px]"></iframe></div>  <a${add_attribute("href", resume.url, 0)} class="${"mt-4 inline-flex items-center rounded-md border " + escape($theme.border.light, true) + " px-4 py-2 text-sm uppercase tracking-[0.35em] font-semibold " + escape($theme.text.primary, true) + " " + escape($theme.bg.secondary, true) + " " + escape($theme.hover.bgSecondary, true) + " transition"}" target="_blank" rel="noopener noreferrer">Open in New Tab</a>`}</div></section>`;
});
export {
  Page as default
};
