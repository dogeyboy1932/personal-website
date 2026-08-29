import { c as create_ssr_component, v as validate_component, a as validate_store, b as subscribe, g as escape, h as each, d as add_attribute } from "../../../chunks/ssr.js";
import { P as PageHeader } from "../../../chunks/PageHeader.js";
import { t as theme } from "../../../chunks/skills.js";
import { S as Sparkles } from "../../../chunks/sparkles.js";
import { L as LinkPreview } from "../../../chunks/LinkPreview.js";
import { I as Icon } from "../../../chunks/Icon.js";
const Gamepad_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "6",
        "x2": "10",
        "y1": "11",
        "y2": "11"
      }
    ],
    [
      "line",
      {
        "x1": "8",
        "x2": "8",
        "y1": "9",
        "y2": "13"
      }
    ],
    [
      "line",
      {
        "x1": "15",
        "x2": "15.01",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "18",
        "x2": "18.01",
        "y1": "10",
        "y2": "10"
      }
    ],
    [
      "path",
      {
        "d": "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "gamepad-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Gamepad2 = Gamepad_2;
const Heart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "heart" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Heart$1 = Heart;
const Users = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      }
    ],
    ["path", { "d": "M16 3.128a4 4 0 0 1 0 7.744" }],
    ["path", { "d": "M22 21v-2a4 4 0 0 0-3-3.87" }],
    ["circle", { "cx": "9", "cy": "7", "r": "4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "users" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Users$1 = Users;
const more = {
  title: "More About Me",
  subtitle: "Beyond the code",
  bio: "When I'm not locking in, I'd probably be watching TV/movies, playing a racquet sport, exploring new tech trends, or something else. I try to be organized & productive with the time I have, and I enjoy trying new things. More recently I've picked up a liking for travel and rollerblading.",
  // studyAbroad: {
  //   role: "Study Abroad",
  //   company: "National University of Singapore (NUS)",
  //   duration: "Spring 2024",
  //   summary: "Studied CS and blockchain at Asia's top university. Immersed in Singapore's tech ecosystem.",
  // },
  // professionalIdentity: {
  //   title: "Professional Identity",
  //   points: [
  //     "Self-taught developer with versatile skills across full-stack, mobile, and automation",
  //     "Specialize in agentic AI systems and blockchain development (Solana, Ethereum)",
  //     "Focus on creating intelligent, autonomous systems for everyday utility",
  //     "Entrepreneurial mindset with a practical, get-things-done approach",
  //   ],
  // },
  // achievements: {
  //   title: "Achievements & Recognition",
  //   items: [
  //     { label: "Hackathons", value: "2nd Place - Solana University ($1,500), 2nd Place - Raise Your Hack, 3rd Place - SEBA Entrepreneurship" },
  //     { label: "Academic", value: "3.72 GPA in Master's CS at UIUC, Study Abroad at NUS" },
  //     { label: "Leadership", value: "Eagle Scout, VP Partnerships at Illini Blockchain" },
  //     { label: "Incubators", value: "Optimism Superchain Interop ($9,000), CollegeDAO Core Team" },
  //   ],
  // },
  // philosophy: {
  //   title: "My Approach",
  //   description: "I believe in putting my soul into every project, approaching challenges with both technical depth and entrepreneurial vision. I don't wait to be told what to do—I actively seek out what needs to be done. I love breaking new ground and starting with a blank slate, excelling in cooperative environments where innovation meets execution.",
  // },
  funFacts: [
    "Studied abroad in Singapore (NUS)- loved the traveling and cultural perspective",
    "Eagle Scout"
  ],
  hobbies: [
    { name: "Chess", note: "Competitive player on Lichess - pattern recognition and strategic planning" },
    { name: "Racquet Sports", note: "Tennis doubles, learning table tennis, badminton, and pickleball" },
    { name: "Travel & Culture", note: "Study abroad in Singapore, exploring new cuisines and perspectives" },
    { name: "Movies / TV", note: "Very immersed in various genres and storytelling styles. I try to watch something new regularly" }
  ],
  lichess: {
    username: "trashboatsr",
    label: "Lichess"
  }
};
const clubs = [
  { name: "AI Alignment @ Illinois", tagline: "Vice President", link: "https://aialignmentillinois.org/spring-2026/" },
  { name: "Sigma Phi Delta (ΣΦΔ)", link: "https://sigphis.org/" },
  { name: "Illini Blockchain", tagline: "Partnerships Lead; Developer", link: "https://linktr.ee/illiniblockchain" },
  { name: "ACM", tagline: "SIGMobile · SIGGLUG" },
  { name: "Chess Club" },
  { name: "Economics Club" },
  { name: "Intramural Tennis" },
  { name: "Virtual Reality Club" },
  { name: "Cheese Club" },
  { name: "Euchre League" },
  { name: "Illini Insomniacs" },
  { name: "Singapore Students Association" },
  { name: "Sanskrit Network" }
];
const BioCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { subtitle } = $$props;
  let { bio } = $$props;
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0)
    $$bindings.subtitle(subtitle);
  if ($$props.bio === void 0 && $$bindings.bio && bio !== void 0)
    $$bindings.bio(bio);
  $$unsubscribe_theme();
  return `<div class="${"p-5 group relative overflow-hidden rounded-2xl border " + escape($theme.accent.violet.border, true) + " " + escape($theme.gradient.violet, true) + " shadow-xl"}"> <div class="${"absolute -right-10 -top-12 h-40 w-40 rounded-full " + escape($theme.accent.violet.glow, true) + " blur-3xl transition group-hover:translate-x-3 " + escape($theme.accent.violet.hover.bg, true)}"></div> <div class="relative"><div class="flex items-center gap-2 mb-4">${validate_component(Sparkles, "Sparkles").$$render(
    $$result,
    {
      class: "w-5 h-5 " + $theme.accent.violet.text
    },
    {},
    {}
  )} <p class="${"text-sm font-semibold uppercase tracking-[0.35em] " + escape($theme.accent.violet.textMuted, true)}">${escape(subtitle)}</p></div> <div class="${"text-lg leading-relaxed " + escape($theme.text.secondary, true) + " whitespace-pre-line"}">${escape(bio)}</div></div></div>`;
});
const FunFactItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { fact } = $$props;
  let { index } = $$props;
  if ($$props.fact === void 0 && $$bindings.fact && fact !== void 0)
    $$bindings.fact(fact);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  $$unsubscribe_theme();
  return `<li class="${"flex items-start gap-3 text-sm " + escape($theme.text.primary, true)}"><span class="${"mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full " + escape($theme.accent.pink.badge, true) + " text-xs font-semibold " + escape($theme.accent.pink.textMuted, true)}">${escape(index + 1)}</span> <span class="pt-0.5">${escape(fact)}</span></li>`;
});
const HobbyCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { name } = $$props;
  let { note } = $$props;
  let { index } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.note === void 0 && $$bindings.note && note !== void 0)
    $$bindings.note(note);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  $$unsubscribe_theme();
  return `<li class="${"group relative overflow-hidden rounded-xl border " + escape($theme.accent.cyan.border, true) + " " + escape($theme.bg.secondary, true) + " p-4 transition hover:-translate-y-0.5 hover:shadow-lg " + escape($theme.accent.cyan.hover.border, true)}"> <div class="${"absolute -right-6 -top-6 h-20 w-20 rounded-full " + escape($theme.accent.cyan.glow, true) + " blur-2xl transition group-hover:scale-110 " + escape($theme.accent.cyan.hover.glow, true)}"></div> <div class="relative"><div class="${"font-semibold " + escape($theme.text.secondary, true)}">${escape(name)}</div> <div class="${"mt-1 text-xs " + escape($theme.accent.cyan.textMuted, true)}">${escape(note)}</div></div></li>`;
});
const LichessCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { label } = $$props;
  let { username } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.username === void 0 && $$bindings.username && username !== void 0)
    $$bindings.username(username);
  $$unsubscribe_theme();
  return `<div class="${"group relative overflow-hidden rounded-2xl border " + escape($theme.accent.yellow.border, true) + " " + escape($theme.gradient.yellow, true) + " p-6 shadow-xl " + escape($theme.accent.yellow.hover.border, true) + " transition-colors"}"> <div class="${"absolute -left-10 -bottom-10 h-40 w-40 rounded-full " + escape($theme.accent.yellow.glow, true) + " blur-3xl " + escape($theme.accent.yellow.hover.bg, true) + " transition"}"></div> <div class="relative"><h3 class="${"text-lg font-semibold " + escape($theme.accent.yellow.text, true)}">${escape(label)}</h3> <h4 class="${"text-md font-semibold " + escape($theme.accent.cyan.text, true) + " mb-3"}">@${escape(username)}</h4> ${`${`<div class="${"text-sm " + escape($theme.lichess.loading, true)}">Loading rating...</div>`}`}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_theme();
  return `<section class="space-y-8">${validate_component(PageHeader, "PageHeader").$$render($$result, { title: more.title }, {}, {})}  ${validate_component(BioCard, "BioCard").$$render($$result, { subtitle: more.subtitle, bio: more.bio }, {}, {})}  <div class="grid gap-6 lg:grid-cols-2"> <div class="${"p-3 rounded-2xl border " + escape($theme.accent.pink.border, true) + " " + escape($theme.gradient.pink, true) + " shadow-lg " + escape($theme.accent.pink.hover.border, true) + " transition-colors"}"><div class="flex items-center gap-2 mb-4">${validate_component(Heart$1, "Heart").$$render(
    $$result,
    {
      class: "w-5 h-5 " + $theme.accent.pink.text
    },
    {},
    {}
  )} <h3 class="${"text-lg font-semibold " + escape($theme.accent.pink.textLight, true)}">Fun Facts</h3></div> <ul class="space-y-3">${each(more.funFacts, (fact, i) => {
    return `${validate_component(FunFactItem, "FunFactItem").$$render($$result, { fact, index: i }, {}, {})}`;
  })}</ul></div>  <div class="${"p-3 rounded-2xl border " + escape($theme.accent.cyan.border, true) + " " + escape($theme.gradient.cyan, true) + " shadow-lg " + escape($theme.accent.cyan.hover.border, true) + " transition-colors"}"><div class="flex items-center gap-2 mb-4">${validate_component(Gamepad2, "Gamepad2").$$render(
    $$result,
    {
      class: "w-5 h-5 " + $theme.accent.cyan.text
    },
    {},
    {}
  )} <h3 class="${"text-lg font-semibold " + escape($theme.accent.cyan.textLight, true)}">Hobbies</h3></div> <ul class="space-y-3">${each(more.hobbies, (hobby, i) => {
    return `${validate_component(HobbyCard, "HobbyCard").$$render(
      $$result,
      {
        name: hobby.name,
        note: hobby.note,
        index: i
      },
      {},
      {}
    )}`;
  })}</ul></div></div>  <div class="${"p-5 rounded-2xl border " + escape($theme.accent.violet.border, true) + " " + escape($theme.gradient.violet, true) + " shadow-lg " + escape($theme.accent.violet.hover.border, true) + " transition-colors"}"><div class="flex items-center gap-2 mb-4">${validate_component(Users$1, "Users").$$render(
    $$result,
    {
      class: "w-5 h-5 " + $theme.accent.violet.text
    },
    {},
    {}
  )} <h3 class="${"text-lg font-semibold " + escape($theme.text.primary, true)}">Clubs</h3></div> <div class="flex flex-wrap gap-x-3 gap-y-2.5">${each(clubs, (club, i) => {
    return `<span class="inline-flex items-baseline gap-2"><span class="inline-flex items-baseline">${club.link ? `${validate_component(LinkPreview, "LinkPreview").$$render(
      $$result,
      {
        href: club.link,
        label: club.name,
        className: $theme.text.primary + " underline decoration-violet-400/50 decoration-1 underline-offset-4 hover:decoration-violet-300 transition-colors"
      },
      {},
      {
        default: () => {
          return `${escape(club.name)}`;
        }
      }
    )}` : `<span${add_attribute("class", $theme.text.primary, 0)}>${escape(club.name)}</span>`} ${club.tagline ? `<span class="${"ml-1.5 " + escape($theme.accent.violet.textMuted, true)}">(${escape(club.tagline)})</span>` : ``}</span> ${i < clubs.length - 1 ? `<span${add_attribute("class", $theme.accent.violet.text, 0)}>/</span>` : ``} </span>`;
  })}</div></div>  ${validate_component(LichessCard, "LichessCard").$$render(
    $$result,
    {
      label: more.lichess.label,
      username: more.lichess.username
    },
    {},
    {}
  )}</section>`;
});
export {
  Page as default
};
