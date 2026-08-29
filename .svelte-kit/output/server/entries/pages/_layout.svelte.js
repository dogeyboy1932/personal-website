import { c as create_ssr_component, a as validate_store, b as subscribe, o as onDestroy, d as add_attribute, e as spread, f as escape_object, v as validate_component, g as escape, h as each, m as missing_component } from "../../chunks/ssr.js";
import { d as darkModeStore, t as theme, a as themeToggle, s as screenWidth } from "../../chunks/skills.js";
import { p as page } from "../../chunks/stores.js";
import { I as Icon } from "../../chunks/Icon.js";
import { S as Sparkles } from "../../chunks/sparkles.js";
import { s as site, l as lastUpdated } from "../../chunks/home.js";
import "clsx";
const MatrixRain = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_darkModeStore;
  validate_store(darkModeStore, "darkModeStore");
  $$unsubscribe_darkModeStore = subscribe(darkModeStore, (value) => value);
  let canvas;
  onDestroy(() => {
    return;
  });
  $$unsubscribe_darkModeStore();
  return `<canvas class="fixed top-0 left-0 w-full h-full -z-10"${add_attribute("this", canvas, 0)}></canvas>`;
});
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isDarkMode = true;
  darkModeStore.subscribe((value) => {
    isDarkMode = value;
  });
  return `<svg${spread(
    [
      { width: "24" },
      { height: "24" },
      { viewBox: "0 0 24 24" },
      { fill: "currentColor" },
      { xmlns: "http://www.w3.org/2000/svg" },
      escape_object($$props)
    ],
    {}
  )}><path d="M2 3L12 24L24 3H18L12 13L8 3H6C" fill="url(#linear-gradient)"></path><defs><linearGradient id="linear-gradient" x1="0" y1="0" x2="100%" y2="0">${isDarkMode ? `<stop offset="0%" stop-color="#FFD700"><animate attributeName="stop-color" values="#FFD700; #FFA500; #FFEB3B; #FFA500; #FFD700;" dur="3s" repeatCount="indefinite"></animate></stop> <stop offset="100%" stop-color="#FF8C00"><animate attributeName="stop-color" values="#FF8C00; #FFB84D; #FFA500; #FFB84D; #FF8C00;" dur="3s" repeatCount="indefinite"></animate></stop>` : `<stop offset="0%" stop-color="#F59E0B"><animate attributeName="stop-color" values="#F59E0B; #D97706; #B45309; #D97706; #F59E0B;" dur="5s" repeatCount="indefinite"></animate></stop> <stop offset="100%" stop-color="#B45309"><animate attributeName="stop-color" values="#B45309; #D97706; #F59E0B; #D97706; #B45309;" dur="5s" repeatCount="indefinite"></animate></stop>`}</linearGradient></defs></svg>`;
});
const Briefcase = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
      }
    ],
    [
      "rect",
      {
        "width": "20",
        "height": "14",
        "x": "2",
        "y": "6",
        "rx": "2"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "briefcase" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Briefcase$1 = Briefcase;
const File_text = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
      }
    ],
    ["path", { "d": "M14 2v5a1 1 0 0 0 1 1h5" }],
    ["path", { "d": "M10 9H8" }],
    ["path", { "d": "M16 13H8" }],
    ["path", { "d": "M16 17H8" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "file-text" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const FileText = File_text;
const House = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
      }
    ],
    [
      "path",
      {
        "d": "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "house" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Home = House;
const Moon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "moon" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Moon$1 = Moon;
const ThemeToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let unsubscribe = null;
  onDestroy(() => {
    unsubscribe?.();
    unsubscribe = null;
  });
  $$unsubscribe_theme();
  return `<button class="${"p-2 rounded-lg transition-all duration-200 " + escape($theme.bg.secondary, true) + " " + escape($theme.border.default, true) + " border hover:scale-105"}" aria-label="Toggle theme">${`${validate_component(Moon$1, "Moon").$$render($$result, { class: "h-5 w-5 " + themeToggle.moon }, {}, {})}`}</button>`;
});
const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase$1 },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/more", label: "More", icon: Sparkles }
];
const NavigationBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  let $page, $$unsubscribe_page;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  validate_store(page, "page");
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_theme();
  $$unsubscribe_page();
  return `<nav class="${"w-full " + escape($theme.bg.navbar, true) + " backdrop-blur-md px-4 sm:px-6 top-0 z-50 sticky"}"><div class="flex flex-wrap mx-auto flex h-25 w-full max-w-[1400px] items-center justify-between p-2"> <a href="/" class="flex flex-shrink-0 items-center gap-4 group" aria-label="Go to home">${validate_component(Logo, "Logo").$$render(
    $$result,
    {
      class: "w-9 h-9 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
    },
    {},
    {}
  )} <span class="${"font-sans sm:block text-md tracking-[0.25em] " + escape($theme.text.primary, true) + " uppercase " + escape($theme.nav.logoHover, true)}">${escape(site.author)}</span></a>  <div class="flex items-center gap-4"><div class="${"flex flex-wrap items-center p-1 " + escape($theme.accent.purple.shadow, true) + " gap-5"}">${each(navItems, (item) => {
    return `<a${add_attribute("href", item.href, 0)}${add_attribute(
      "class",
      `relative flex items-center gap-2 p-2 rounded-sm text-md font-sans tracking-wide transition-all duration-300 ${$page.url.pathname === item.href ? $theme.nav.active : $theme.nav.inactive}`,
      0
    )}><span>${escape(item.label)}</span> ${validate_component(item.icon || missing_component, "svelte:component").$$render($$result, { class: "w-4 h-4" }, {}, {})} </a>`;
  })}  ${validate_component(ThemeToggle, "ThemeToggle").$$render($$result, {}, {}, {})}</div></div></div></nav>`;
});
const CursorParticles = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvas;
  onDestroy(() => {
    return;
  });
  return `<canvas class="pointer-events-none fixed inset-0 z-20 h-full w-full" aria-hidden="true"${add_attribute("this", canvas, 0)}></canvas>`;
});
const index = "";
const styles = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "html.dark body{--tw-bg-opacity:1;background-color:rgb(2 6 23 / var(--tw-bg-opacity, 1))\n}html:not(.dark) body{--tw-bg-opacity:1;background-color:rgb(255 251 235 / var(--tw-bg-opacity, 1))\n}body{transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:300ms;animation-duration:300ms\n}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_screenWidth;
  let $theme, $$unsubscribe_theme;
  validate_store(screenWidth, "screenWidth");
  $$unsubscribe_screenWidth = subscribe(screenWidth, (value) => value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  const fonts = {
    primary: "font-sans",
    // Inter for body text
    secondary: "font-display",
    // Space Grotesk for headings
    fun: "font-mono",
    // JetBrains Mono for code/accents
    options: [
      {
        id: "inter",
        label: "Inter (clean)",
        class: "font-sans"
      },
      {
        id: "display",
        label: "Space Grotesk (display)",
        class: "font-display"
      },
      {
        id: "mono",
        label: "JetBrains Mono (coder)",
        class: "font-mono"
      }
    ]
  };
  if ($$props.fonts === void 0 && $$bindings.fonts && fonts !== void 0)
    $$bindings.fonts(fonts);
  $$result.css.add(css);
  $$unsubscribe_screenWidth();
  $$unsubscribe_theme();
  return ` ${validate_component(MatrixRain, "MatrixRain").$$render($$result, {}, {}, {})} ${validate_component(CursorParticles, "CursorParticles").$$render($$result, {}, {}, {})} <div class="min-h-screen relative"><div class="pointer-events-none absolute inset-0"></div> ${validate_component(NavigationBar, "NavigationBar").$$render($$result, {}, {}, {})} <main${add_attribute("class", `relative z-10 w-full px-4 md:px-8 ${fonts.primary}`, 0)}><div class="${"max-w-[1600px] mx-auto rounded-b-xl border " + escape($theme.border.default, true) + " " + escape($theme.bg.page, true) + " p-3 shadow-2xl backdrop-blur " + escape($theme.border.light, true)}"><div>${slots.default ? slots.default({}) : ``}</div> <div class="${"flex flex-row justify-between text-[10px] uppercase " + escape($theme.text.muted, true) + " mt-10"}"><span class="tracking-[0.2em]" data-svelte-h="svelte-1qep6tk">© 2025 Akhil Gogineni. All rights reserved.</span> <span class="tracking-[0.3em]">Last updated: ${escape(lastUpdated)}</span></div></div></main> </div>`;
});
export {
  Layout as default
};
