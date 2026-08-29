import { c as create_ssr_component, v as validate_component, a as validate_store, b as subscribe, g as escape, h as each, d as add_attribute, m as missing_component } from "../../../chunks/ssr.js";
import { t as theme, c as breakpoints, b as skillsData } from "../../../chunks/skills.js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { L as LinkPreview } from "../../../chunks/LinkPreview.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { d as sections } from "../../../chunks/home.js";
const Arrow_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m12 19-7-7 7-7" }], ["path", { "d": "M19 12H5" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "arrow-left" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ArrowLeft = Arrow_left;
const Arrow_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "m12 5 7 7-7 7" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "arrow-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ArrowRight = Arrow_right;
const experiences = [
  {
    role: "AI Engineer",
    company: "PwC",
    duration: "Jun 2026 - Aug 2026",
    summary: "Worked on RAG Pipeline using Databricks",
    skills: ["AI/ML", "Software Development", "Consulting"]
  },
  {
    role: "Graduate Research Assistant",
    company: "UIUC",
    duration: "Mar 2026 - May 2026",
    summary: "Built AI-powered system deployed on AWS that allows academics to identify cross-disciplinary connections across collegiate courses",
    skills: ["AI Evaluation", "Coding Principles", "Quality Assurance"]
  },
  {
    role: "Coding Expert",
    company: "Mercor",
    duration: "Nov 2025 - Dec 2025",
    summary: "Provided coded expertise for a leading AI research lab to train LLMs and improve their accuracy and reasoning",
    skills: ["AI Evaluation", "Coding Principles", "Quality Assurance"]
  },
  {
    role: "Software Developer Intern",
    company: "IDX Exchange",
    duration: "Oct 2025 - Nov 2025",
    summary: "Lead a team to build a real estate property search platform. Involved in API integration, database design, full-stack development with React.js, PHP, and MySQL.",
    skills: ["React.js", "PHP", "MySQL", "REST APIs", "Project Management"]
  },
  {
    role: "Core Team",
    company: "CollegeDAO",
    duration: "Oct 2024 - Sep 2025",
    summary: "Built a MVP for Latent, an AI-powered hiring platform",
    skills: ["AI/ML", "Web3", "Product Dev"]
  },
  {
    role: "Model Analyst",
    company: "Mercor",
    duration: "Feb 2025 - May 2025",
    summary: "Audited 120+ AI evaluations to drive model improvements and optimize accuracy",
    skills: ["AI Evaluation", "Data Analysis"]
  },
  {
    role: "Software Intern",
    company: "FreshCredit®",
    duration: "Jun 2024 - Aug 2024",
    summary: "Managed 5-member dev team to build a substrate pallet to store credit-related metadata using a dNFT. Coordinated workshops and acted as PoC between dev team and leadership",
    skills: ["Substrate", "Blockchain", "Project Management"]
  }
];
const projectsData = [
  {
    title: "ShotBook",
    duration: "June 2026",
    description: "Created AI-powered book-to-video platform that tracks evolving story lore to let users highlight text and generate scenes in real time.",
    technologies: ["React", "FastAPI", "Pydantic", "PostgreSQL", "vLLM", "Wan 2.2"],
    status: "MVP",
    complexity: "Advanced",
    category: ["AI/ML"],
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
    github: "https://github.com/dogeyboy1932/shotbook"
  },
  {
    title: "Weave",
    duration: "March 2026 - May 2026",
    description: "Made an AI-powered platform that maps collegiate course data, allowing academics to seamlessly discover cross-disciplinary connections and uncover new collaborative research opportunities.",
    technologies: ["PostgreSQL", "FastAPI", "Supabase", "pgvector", "PyTorch", "AWS", "D3.js", "Docker", "YAML", "Gemini SDK", "SciNCL"],
    status: "MVP",
    complexity: "Advanced",
    category: ["AI/ML"],
    image: "/projectImages/Weave.png",
    github: "https://github.com/nbhide8/Universal-PactPay-Blink-API/",
    demo: "https://dogeyboy19-armchair.hf.space/"
  },
  {
    title: "Blink API",
    duration: "Feb 2026",
    description: "Trust-as-a-service escrow engine on Solana. Developers deploy on-chain escrow rooms via a single REST call. Supports Direct Mode (self-custody wallets) and Custodial Mode (Stripe fiat bridge) — making blockchain invisible to end users. Built for hackathon.",
    technologies: ["Next.js", "TypeScript", "Rust", "Anchor", "Solana", "Supabase", "Stripe", "Railway"],
    status: "MVP",
    complexity: "Advanced",
    category: ["Blockchain"],
    image: "/projectImages/BlinkAPI.png",
    github: "https://github.com/nbhide8/Universal-PactPay-Blink-API/"
  },
  {
    title: "DocAssist",
    duration: "Jan 2026",
    description: "AI-powered clinical documentation platform. Patients and doctors upload health documents and/or query history via RAG. Personalized clinical notes auto-generated. Built overnight for Keywords AI Hackathon (Won Prompt Track)",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind", "Keywords AI"],
    status: "MVP",
    complexity: "Beginner",
    category: ["AI/ML"],
    image: "/projectImages/DocAssist.png",
    github: "https://github.com/kushal238/docassist",
    demo: "https://devpost.com/software/doc-assist-6pz4rs"
  },
  {
    title: "MyCalPal",
    duration: "Sept 2025",
    description: "AI calendar assistant via Discord bot. Upload event screenshots, get auto-parsed drafts in a Next.js dashboard, publish to Google Calendar with one click.",
    technologies: ["Next.js", "TypeScript", "Gemini SDK", "Discord SDK", "MongoDB", "GCP", "MCP"],
    status: "Completed",
    complexity: "Beginner",
    category: ["AI/ML"],
    image: "/projectImages/MyCalPal.png",
    github: "https://github.com/dogeyboy1932/MyCalPal",
    demo: "https://mycalpal.netlify.app/"
  },
  {
    title: "SolPal",
    duration: "Aug 2025",
    description: "Voice and text-controlled blockchain wallet. Send crypto to contacts through natural language using AI-powered commands.",
    technologies: ["React Native", "TypeScript", "Web3.js", "Gemini SDK", "MCP"],
    status: "Completed",
    complexity: "Intermediate",
    category: ["AI/ML", "Mobile"],
    image: "/projectImages/SolPal.png",
    github: "https://github.com/dogeyboy1932/SolPal"
  },
  {
    title: "NodeFlow",
    duration: "July 2025",
    description: "Browser-native visual playground for Model Context Protocol (MCP) servers where users drag-and-drop to connect AI models with external tools (GitHub, databases, weather, etc), then interact through a chat panel using voice or text prompts. Early contributor to WebMCP ecosystem [mcp-b.ai] (864 stars).",
    technologies: ["React.js", "React Flow", "WebMCP", "TypeScript", "Gemini SDK", "MCP"],
    status: "Completed",
    complexity: "Intermediate",
    category: ["AI/ML"],
    image: "/projectImages/NodeFlow.png",
    github: "https://github.com/dogeyboy1932/NodeFlow",
    demo: "https://mcp-voice.netlify.app/"
  },
  {
    title: "StakeShack",
    duration: "June 2025",
    description: "Trustless renting platform with crypto-staking verification and AI recommendations. Won 2nd Place at Solana University Hackathon. Built in 4 days.",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Solana", "Rust", "Anchor"],
    status: "MVP",
    complexity: "Intermediate",
    category: ["Blockchain"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    github: "https://github.com/dogeyboy1932/StakeShack"
  },
  {
    title: "WhatAGent",
    duration: "Jan 2025",
    description: "Multi-modal AI agent with voice and chat capabilities. Interacts with Windows CLI and PostgreSQL database for seamless human-AI interaction.",
    technologies: ["React.js", "Express.js", "PostgreSQL", "AI/ML", "REST APIs"],
    status: "Completed",
    complexity: "Beginner",
    category: ["AI/ML"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
    github: "https://github.com/dogeyboy1932/WhatAGent"
  },
  {
    title: "NUS Mods",
    duration: "Ongoing",
    description: "University module planning tool to help students plan their academic journey with course selection, scheduling, and prerequisite tracking.",
    technologies: ["React.js", "Node.js", "PostgreSQL", "Express.js"],
    status: "In Development",
    complexity: "Advanced",
    category: ["Other"],
    image: "/projectImages/NUS-MODS.png",
    github: "https://github.com/cookedsalamander/University-Mods"
  },
  {
    title: "OnChain Mafia",
    duration: "Aug 2024",
    description: "Solana dApp using Multi-Party Computation (MPC) and Zero-Knowledge proofs for secure, private game state. The classic mafia card game on blockchain.",
    technologies: ["Solana", "Rust", "Zero-Knowledge Proofs", "MPC", "Anchor", "React.js", "TypeScript"],
    status: "MVP",
    complexity: "Intermediate",
    category: ["Blockchain"],
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1200&q=80",
    github: "https://github.com/evcoats/on-chain-mafia-game"
  },
  {
    title: "GymBro",
    duration: "Aug 2024",
    description: "Multi-platform fitness app with workout tracking, visualizations, and real-time chat. Built for iOS, Android, and web, with Flask and Firebase backend.",
    technologies: ["React Native", "Firebase", "TypeScript", "Expo", "Flask", "Python"],
    status: "MVP",
    complexity: "Beginner",
    category: ["Mobile"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    github: "https://github.com/sdimov2/gymapp"
  },
  {
    title: "Upland Chess",
    duration: "Jan 2024",
    description: "Wager crypto in chess matches with Lichess and Upland Metaverse integration. Trustless wagering with transparent game outcomes.",
    technologies: ["JavaScript", "Blockchain", "Upland SDK", "Lichess API"],
    status: "Completed",
    complexity: "Beginner",
    category: ["Blockchain"],
    image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=1200&q=80",
    github: "https://github.com/dogeyboy1932/Upland-Chess-App"
  }
];
const ExperienceCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let cardTheme;
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { experience } = $$props;
  let { index = 0 } = $$props;
  if ($$props.experience === void 0 && $$bindings.experience && experience !== void 0)
    $$bindings.experience(experience);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  cardTheme = $theme.cardThemes[index % $theme.cardThemes.length];
  $$unsubscribe_theme();
  return `<div class="${"group relative overflow-hidden rounded-2xl border " + escape(cardTheme.border, true) + " " + escape($theme.bg.card, true) + " backdrop-blur-sm shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col"}"> <div class="${"absolute left-0 top-0 h-full w-1 bg-gradient-to-b " + escape(cardTheme.accent, true)}"></div> <div class="p-5 pl-6 space-y-5 flex-1 flex flex-col"> <div class="flex items-start justify-between gap-4 "><div class="space-y-1"><h3 class="${"text-2xl font-bold bg-gradient-to-r " + escape(cardTheme.title, true) + " bg-clip-text text-transparent"}">${escape(experience.company)}</h3> <p class="${"text-md font-medium " + escape(cardTheme.role, true)}">${escape(experience.role)}</p></div> <span class="${"shrink-0 rounded-sm " + escape(cardTheme.badge, true) + " border px-3 py-1.5 text-xs font-bold tracking-wide"}">${escape(experience.duration)}</span></div>  <div class="${"min-h-[4.5rem] pt-2 border-t " + escape(cardTheme.divider, true)}"><p class="${escape($theme.text.secondary, true) + " text-md leading-relaxed"}">${escape(experience.summary)}</p></div> <div class="mt-auto min-h-[3rem]"><div class="flex flex-wrap gap-2">${each(experience.skills.slice(0, 5), (tech, techIndex) => {
    return `${validate_component(TechBadge, "TechBadge").$$render($$result, { tech, index: techIndex }, {}, {})}`;
  })} ${experience.skills.length > 5 ? `<span class="${"rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] border " + escape($theme.border.light, true) + " " + escape($theme.bg.overlay, true) + " " + escape($theme.text.primary, true)}">+${escape(experience.skills.length - 5)} more</span>` : ``}</div></div></div>  <div class="${"absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t " + escape(cardTheme.glow, true) + " to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"}"></div></div>`;
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function getTechColor(tech, index, techColors) {
  const hash = (tech.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) + index) % techColors.length;
  return techColors[hash];
}
const TechBadge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let colorClass;
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { tech } = $$props;
  let { index = 0 } = $$props;
  if ($$props.tech === void 0 && $$bindings.tech && tech !== void 0)
    $$bindings.tech(tech);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  colorClass = getTechColor(tech, index, $theme.techColors);
  $$unsubscribe_theme();
  return `<span${add_attribute("class", `rounded px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] border ${$theme.border.light} ${$theme.bg.overlay} ${colorClass}`, 0)}>${escape(tech)}</span>`;
});
const ProjectCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { project } = $$props;
  let { index = 0 } = $$props;
  if ($$props.project === void 0 && $$bindings.project && project !== void 0)
    $$bindings.project(project);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  $$unsubscribe_theme();
  return `<div class="${"group relative overflow-hidden rounded-xl border " + escape($theme.border.default, true) + " " + escape($theme.bg.card, true) + " shadow-lg transition hover:-translate-y-1 hover:shadow-2xl flex flex-col h-full"}"> <div class="${"relative h-48 overflow-hidden " + escape($theme.bg.cardHover, true)}"><img${add_attribute("src", project.image, 0)}${add_attribute("alt", project.title, 0)} class="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy"> <div class="absolute top-2 left-2 flex gap-2 opacity-50 transition group-hover:opacity-100">${project.demo ? `${validate_component(LinkPreview, "LinkPreview").$$render(
    $$result,
    {
      href: project.demo,
      label: project.title + " demo",
      className: "inline-flex rounded-lg border " + $theme.border.light + " " + $theme.bg.cardHover + " p-2 " + $theme.text.muted + " hover:" + $theme.border.hover
    },
    {},
    {
      default: () => {
        return `<img src="https://api.iconify.design/mdi:open-in-new.svg?color=%23cbd5e1" alt="Demo" class="h-4 w-4">`;
      }
    }
  )}` : ``} ${project.github ? `${validate_component(LinkPreview, "LinkPreview").$$render(
    $$result,
    {
      href: project.github,
      label: project.title + " GitHub",
      className: "inline-flex rounded-lg border " + $theme.border.light + " " + $theme.bg.cardHover + " p-2 " + $theme.text.dim + " hover:" + $theme.border.hover
    },
    {},
    {
      default: () => {
        return `<img src="https://imgs.search.brave.com/w5LFW4ei3PC6DUOkw2jcpG1OVDzoYhDqENlECFBWUg8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8y/LzI0L0dpdGh1Yl9s/b2dvX3N2Zy5zdmc" alt="GitHub" class="h-4 w-4">`;
      }
    }
  )}` : ``}</div></div> <div class="p-5 flex flex-col "> <div class="flex items-start justify-between gap-3 min-h-[5rem] mb-2"><div class=""><h3 class="${"text-2xl font-semibold " + escape($theme.text.secondary, true) + " transition"}">${escape(project.title)}</h3> <p class="${"text-sm uppercase tracking-[0.35em] " + escape($theme.text.muted, true) + " mt-1"}">${escape(project.category.join(", "))}</p></div> <div class="flex flex-col items-end gap-2 flex-shrink-0"><span class="${"rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.25em] " + escape($theme.bg.secondary, true) + " " + escape($theme.text.primary, true)}">${escape(project.duration)}</span> <span${add_attribute(
    "class",
    `rounded px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] border ${project.status === "Completed" ? `${$theme.status.completed.border} ${$theme.status.completed.bg} ${$theme.status.completed.text}` : `${$theme.status.inProgress.border} ${$theme.status.inProgress.bg} ${$theme.status.inProgress.text}`}`,
    0
  )}>${escape(project.status)}</span></div></div>  <div class="min-h-[7.5rem] mb-2"><p class="${"text-sm " + escape($theme.text.secondary, true) + " line-clamp-5 font-sans"}">${escape(project.description)}</p></div>  <div class="mt-auto min-h-[4rem]"><div class="flex flex-wrap gap-2">${each(project.technologies.slice(0, 7), (tech, techIndex) => {
    return `${validate_component(TechBadge, "TechBadge").$$render($$result, { tech, index: techIndex }, {}, {})}`;
  })} ${project.technologies.length > 7 ? `<span class="${"rounded px-2 py-1 text-xs font-semibold uppercase tracking-[0.35em] border " + escape($theme.border.light, true) + " " + escape($theme.bg.overlay, true) + " " + escape($theme.text.primary, true)}">+${escape(project.technologies.length - 7)} more</span>` : ``}</div></div></div></div>`;
});
const SkillCategoryCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { category } = $$props;
  if ($$props.category === void 0 && $$bindings.category && category !== void 0)
    $$bindings.category(category);
  $$unsubscribe_theme();
  return `<div class="${escape($theme.bg.card, true) + " rounded-sm border " + escape($theme.border.default, true) + " p-6 shadow-lg"}"><h2 class="${"uppercase text-lg font-semibold " + escape($theme.text.primary, true)}">${escape(category.category)}</h2> <div class="mt-4 grid gap-2 sm:grid-cols-1 md:grid-cols-2">${each(category.items, (skill) => {
    return `<div class="${"flex items-center gap-3 rounded-sm border " + escape($theme.border.light, true) + " " + escape($theme.bg.cardElevated, true) + " p-3 min-w-0"}">${skill.logoUrl ? `<img${add_attribute("src", skill.logoUrl, 0)}${add_attribute("alt", skill.name, 0)} class="h-8 w-8 rounded flex-shrink-0">` : ``} <div class="min-w-0 flex-1"><div class="${escape($theme.text.primary, true) + " font-semibold truncate"}">${escape(skill.name)}</div></div> </div>`;
  })}</div></div>`;
});
const CategoryFilter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { categories } = $$props;
  let { selectedCategory } = $$props;
  if ($$props.categories === void 0 && $$bindings.categories && categories !== void 0)
    $$bindings.categories(categories);
  if ($$props.selectedCategory === void 0 && $$bindings.selectedCategory && selectedCategory !== void 0)
    $$bindings.selectedCategory(selectedCategory);
  $$unsubscribe_theme();
  return `<div class="mb-8 flex justify-center"><div class="${"inline-flex flex-wrap gap-3 justify-center " + escape($theme.accent.indigo.bg, true) + " border-[1.6px] " + escape($theme.accent.indigo.border, true) + " rounded-xl p-2 shadow-2xl " + escape($theme.accent.indigo.glow, true)}">${each(categories, (category) => {
    return `<button${add_attribute(
      "class",
      `rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-200 border-[1.6px] ${selectedCategory === category ? `${$theme.filter.active.bg} ${$theme.filter.active.text} ${$theme.filter.active.border} shadow-lg scale-105` : `bg-transparent ${$theme.accent.indigo.text} border-transparent ${$theme.filter.inactive.hoverBg} ${$theme.filter.inactive.hoverText} ${$theme.filter.inactive.hoverBorder}`}`,
      0
    )}>${escape(category)} </button>`;
  })}</div></div>`;
});
const Carousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let itemsPerSection;
  let basisClass;
  let totalSections;
  let currentSection;
  let $breakpoints, $$unsubscribe_breakpoints;
  let $theme, $$unsubscribe_theme;
  validate_store(breakpoints, "breakpoints");
  $$unsubscribe_breakpoints = subscribe(breakpoints, (value) => $breakpoints = value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { componentProps = [] } = $$props;
  let { component } = $$props;
  let { config = {
    options: { loop: true, axis: "x" },
    plugins: []
  } } = $$props;
  let { carouselItemClass = "" } = $$props;
  let { carouselItemsClass = "" } = $$props;
  let canScrollNext = componentProps.length > 0;
  let currentCount = 0;
  if ($$props.componentProps === void 0 && $$bindings.componentProps && componentProps !== void 0)
    $$bindings.componentProps(componentProps);
  if ($$props.component === void 0 && $$bindings.component && component !== void 0)
    $$bindings.component(component);
  if ($$props.config === void 0 && $$bindings.config && config !== void 0)
    $$bindings.config(config);
  if ($$props.carouselItemClass === void 0 && $$bindings.carouselItemClass && carouselItemClass !== void 0)
    $$bindings.carouselItemClass(carouselItemClass);
  if ($$props.carouselItemsClass === void 0 && $$bindings.carouselItemsClass && carouselItemsClass !== void 0)
    $$bindings.carouselItemsClass(carouselItemsClass);
  itemsPerSection = $breakpoints.itemsPerSection;
  basisClass = itemsPerSection === 1 ? "basis-full" : itemsPerSection === 2 ? "basis-1/2" : "basis-1/3";
  totalSections = Math.ceil(componentProps.length / itemsPerSection);
  currentSection = Math.ceil(currentCount / itemsPerSection);
  $$unsubscribe_breakpoints();
  $$unsubscribe_theme();
  return ` <div class="relative" role="region" aria-roledescription="carousel"> <div class="flex items-center gap-2"> <div class="overflow-hidden flex-1"><div${add_attribute(
    "class",
    cn(
      "flex",
      config?.options.axis === "x" ? "-ml-2" : "-mt-2 flex-col",
      carouselItemsClass
    ),
    0
  )}>${each(componentProps, (props) => {
    return `<div role="group" aria-roledescription="slide"${add_attribute("class", cn("min-w-0 shrink-0 grow-0", basisClass, config?.options.axis === "x" ? "pl-3" : "pt-3", carouselItemClass), 0)}>${validate_component(component || missing_component, "svelte:component").$$render($$result, Object.assign({}, props), {}, {})} </div>`;
  })}</div></div></div> <div class="flex flex-row gap-6 items-center justify-center mt-5"> <button${add_attribute("class", cn(`flex items-center justify-center h-10 w-10 p-0 border rounded-full transition-all shrink-0 ${$theme.carousel.arrow.bg} ${$theme.carousel.arrow.border} ${$theme.carousel.arrow.hoverBg} ${$theme.carousel.arrow.hoverBorder}`, config?.options.axis === "x" ? "" : "rotate-90"), 0)} ${"disabled"}>${validate_component(ArrowLeft, "ArrowLeft").$$render(
    $$result,
    {
      class: "w-5 h-5 " + $theme.carousel.arrow.icon
    },
    {},
    {}
  )} <span class="sr-only" data-svelte-h="svelte-1tx67gn">Previous slide</span></button>  <div class="flex justify-center gap-2 py-4">${each(Array(totalSections), (_, i) => {
    return `<button${add_attribute(
      "class",
      cn("w-3 h-3 rounded-full transition-all duration-300", currentSection === i + 1 ? `${$theme.carousel.dot.active} scale-110` : `${$theme.carousel.dot.inactive} ${$theme.carousel.dot.hover}`),
      0
    )}${add_attribute("aria-label", `Go to section ${i + 1}`, 0)}></button>`;
  })}</div>  <button${add_attribute("class", cn(`flex items-center justify-center h-10 w-10 p-0 border rounded-full transition-all shrink-0 ${$theme.carousel.arrow.bg} ${$theme.carousel.arrow.border} ${$theme.carousel.arrow.hoverBg} ${$theme.carousel.arrow.hoverBorder}`, config?.options.axis === "x" ? "" : "rotate-90"), 0)} ${!canScrollNext ? "disabled" : ""}>${validate_component(ArrowRight, "ArrowRight").$$render(
    $$result,
    {
      class: "w-5 h-5 " + $theme.carousel.arrow.icon
    },
    {},
    {}
  )} <span class="sr-only" data-svelte-h="svelte-vmesmf">Next slide</span></button></div></div>`;
});
const SectionHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { id = "" } = $$props;
  let { title = "" } = $$props;
  let { customColor = "" } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.customColor === void 0 && $$bindings.customColor && customColor !== void 0)
    $$bindings.customColor(customColor);
  $$unsubscribe_theme();
  return `<div class="py-2 mt-4 mb-2"><h1${add_attribute("id", id, 0)}${add_attribute("class", `uppercase tracking-[0.15em] text-2xl font-semibold ${customColor || $theme.sectionHeader} inline-flex items-center gap-3`, 0)}><span class="${"w-8 h-[2px] " + escape($theme.gradient.sectionLine, true) + " rounded-full"}"></span> <span>${escape(title)}</span></h1></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categories;
  let filteredProjects;
  let projectProps;
  let $breakpoints, $$unsubscribe_breakpoints;
  validate_store(breakpoints, "breakpoints");
  $$unsubscribe_breakpoints = subscribe(breakpoints, (value) => $breakpoints = value);
  let selectedCategory = "All";
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    categories = ["All", ...new Set(projectsData.flatMap((p) => p.category))];
    filteredProjects = selectedCategory === "All" ? projectsData : projectsData.filter((p) => p.category.includes(selectedCategory));
    projectProps = filteredProjects.map((project, index) => ({ project, index }));
    $$rendered = `<section class="space-y-10 pb-4"> <section>${validate_component(SectionHeader, "SectionHeader").$$render(
      $$result,
      {
        id: "experiences",
        title: sections.prof_experiences
      },
      {},
      {}
    )} <div class="grid gap-5 md:grid-cols-1 lg:grid-cols-2">${each(experiences, (experience, i) => {
      return `${validate_component(ExperienceCard, "ExperienceCard").$$render($$result, { experience, index: i }, {}, {})}`;
    })}</div></section>  <section>${validate_component(SectionHeader, "SectionHeader").$$render(
      $$result,
      {
        id: "gallery",
        title: sections.projectGallery
      },
      {},
      {}
    )}  ${validate_component(CategoryFilter, "CategoryFilter").$$render(
      $$result,
      { categories, selectedCategory },
      {
        selectedCategory: ($$value) => {
          selectedCategory = $$value;
          $$settled = false;
        }
      },
      {}
    )}  ${validate_component(Carousel, "Carousel").$$render(
      $$result,
      {
        component: ProjectCard,
        componentProps: projectProps,
        config: {
          options: {
            loop: true,
            axis: "x",
            align: "start",
            slidesToScroll: 1
          },
          plugins: []
        },
        carouselItemsClass: "items-stretch"
      },
      {},
      {}
    )}</section>  <section>${validate_component(SectionHeader, "SectionHeader").$$render($$result, { id: "skills", title: sections.skills }, {}, {})} <div class="${[
      "grid gap-5",
      ($breakpoints.isMobile ? "grid-cols-1" : "") + " " + ($breakpoints.isTablet ? "grid-cols-2" : "") + " " + ($breakpoints.isDesktop ? "grid-cols-3" : "")
    ].join(" ").trim()}">${each(skillsData.skills, (category) => {
      return `${validate_component(SkillCategoryCard, "SkillCategoryCard").$$render($$result, { category }, {}, {})}`;
    })}</div></section></section>`;
  } while (!$$settled);
  $$unsubscribe_breakpoints();
  return $$rendered;
});
export {
  Page as default
};
