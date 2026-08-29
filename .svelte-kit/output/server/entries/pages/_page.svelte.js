import { c as create_ssr_component, g as escape, d as add_attribute, h as each, e as spread, f as escape_object, a as validate_store, b as subscribe, v as validate_component } from "../../chunks/ssr.js";
import { t as theme, b as skillsData, c as breakpoints } from "../../chunks/skills.js";
import { s as site, h as homeHero, a as links, b as homeFocusAreas, c as homeNavigationCards, d as sections, e as home } from "../../chunks/home.js";
import { L as LinkPreview } from "../../chunks/LinkPreview.js";
const MetaTags = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let updatedTitle;
  let { title = "" } = $$props;
  let { titleTemplate = "" } = $$props;
  let { robots = "index,follow" } = $$props;
  let { additionalRobotsProps = void 0 } = $$props;
  let { description = void 0 } = $$props;
  let { mobileAlternate = void 0 } = $$props;
  let { languageAlternates = void 0 } = $$props;
  let { twitter = void 0 } = $$props;
  let { facebook = void 0 } = $$props;
  let { openGraph = void 0 } = $$props;
  let { canonical = void 0 } = $$props;
  let { keywords = void 0 } = $$props;
  let { additionalMetaTags = void 0 } = $$props;
  let { additionalLinkTags = void 0 } = $$props;
  let robotsParams = "";
  if (additionalRobotsProps) {
    const { nosnippet, maxSnippet, maxImagePreview, maxVideoPreview, noarchive, noimageindex, notranslate, unavailableAfter } = additionalRobotsProps;
    robotsParams = `${nosnippet ? ",nosnippet" : ""}${maxSnippet ? `,max-snippet:${maxSnippet}` : ""}${maxImagePreview ? `,max-image-preview:${maxImagePreview}` : ""}${noarchive ? ",noarchive" : ""}${unavailableAfter ? `,unavailable_after:${unavailableAfter}` : ""}${noimageindex ? ",noimageindex" : ""}${maxVideoPreview ? `,max-video-preview:${maxVideoPreview}` : ""}${notranslate ? ",notranslate" : ""}`;
  }
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.titleTemplate === void 0 && $$bindings.titleTemplate && titleTemplate !== void 0)
    $$bindings.titleTemplate(titleTemplate);
  if ($$props.robots === void 0 && $$bindings.robots && robots !== void 0)
    $$bindings.robots(robots);
  if ($$props.additionalRobotsProps === void 0 && $$bindings.additionalRobotsProps && additionalRobotsProps !== void 0)
    $$bindings.additionalRobotsProps(additionalRobotsProps);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.mobileAlternate === void 0 && $$bindings.mobileAlternate && mobileAlternate !== void 0)
    $$bindings.mobileAlternate(mobileAlternate);
  if ($$props.languageAlternates === void 0 && $$bindings.languageAlternates && languageAlternates !== void 0)
    $$bindings.languageAlternates(languageAlternates);
  if ($$props.twitter === void 0 && $$bindings.twitter && twitter !== void 0)
    $$bindings.twitter(twitter);
  if ($$props.facebook === void 0 && $$bindings.facebook && facebook !== void 0)
    $$bindings.facebook(facebook);
  if ($$props.openGraph === void 0 && $$bindings.openGraph && openGraph !== void 0)
    $$bindings.openGraph(openGraph);
  if ($$props.canonical === void 0 && $$bindings.canonical && canonical !== void 0)
    $$bindings.canonical(canonical);
  if ($$props.keywords === void 0 && $$bindings.keywords && keywords !== void 0)
    $$bindings.keywords(keywords);
  if ($$props.additionalMetaTags === void 0 && $$bindings.additionalMetaTags && additionalMetaTags !== void 0)
    $$bindings.additionalMetaTags(additionalMetaTags);
  if ($$props.additionalLinkTags === void 0 && $$bindings.additionalLinkTags && additionalLinkTags !== void 0)
    $$bindings.additionalLinkTags(additionalLinkTags);
  updatedTitle = titleTemplate ? title ? titleTemplate.replace(/%s/g, title) : title : title;
  {
    if (!robots && additionalRobotsProps) {
      console.warn("additionalRobotsProps cannot be used when robots is set to false");
    }
  }
  return `${$$result.head += `<!-- HEAD_svelte-18pzfb8_START -->${updatedTitle ? `${$$result.title = `<title>${escape(updatedTitle)}</title>`, ""}` : ``}${robots !== false ? `<meta name="robots" content="${escape(robots, true) + escape(robotsParams, true)}">` : ``}${description ? `<meta name="description"${add_attribute("content", description, 0)}>` : ``}${canonical ? `<link rel="canonical"${add_attribute("href", canonical, 0)}>` : ``}${keywords?.length ? `<meta name="keywords"${add_attribute("content", keywords.join(", "), 0)}>` : ``}${mobileAlternate ? `<link rel="alternate"${add_attribute("media", mobileAlternate.media, 0)}${add_attribute("href", mobileAlternate.href, 0)}>` : ``}${languageAlternates && languageAlternates.length > 0 ? `${each(languageAlternates, (languageAlternate) => {
    return `<link rel="alternate"${add_attribute("hreflang", languageAlternate.hrefLang, 0)}${add_attribute("href", languageAlternate.href, 0)}>`;
  })}` : ``}${twitter ? `${twitter.cardType ? `<meta name="twitter:card"${add_attribute("content", twitter.cardType, 0)}>` : ``} ${twitter.site ? `<meta name="twitter:site"${add_attribute("content", twitter.site, 0)}>` : ``} ${twitter.handle ? `<meta name="twitter:creator"${add_attribute("content", twitter.handle, 0)}>` : ``} ${twitter.title ? `<meta name="twitter:title"${add_attribute("content", twitter.title, 0)}>` : ``} ${twitter.description ? `<meta name="twitter:description"${add_attribute("content", twitter.description, 0)}>` : ``} ${twitter.image ? `<meta name="twitter:image"${add_attribute("content", twitter.image, 0)}>` : ``} ${twitter.imageAlt ? `<meta name="twitter:image:alt"${add_attribute("content", twitter.imageAlt, 0)}>` : ``}` : ``}${facebook ? `<meta property="fb:app_id"${add_attribute("content", facebook.appId, 0)}>` : ``}${openGraph ? `${openGraph.url || canonical ? `<meta property="og:url"${add_attribute("content", openGraph.url || canonical, 0)}>` : ``} ${openGraph.type ? `<meta property="og:type"${add_attribute("content", openGraph.type.toLowerCase(), 0)}> ${openGraph.type.toLowerCase() === "profile" && openGraph.profile ? `${openGraph.profile.firstName ? `<meta property="profile:first_name"${add_attribute("content", openGraph.profile.firstName, 0)}>` : ``} ${openGraph.profile.lastName ? `<meta property="profile:last_name"${add_attribute("content", openGraph.profile.lastName, 0)}>` : ``} ${openGraph.profile.username ? `<meta property="profile:username"${add_attribute("content", openGraph.profile.username, 0)}>` : ``} ${openGraph.profile.gender ? `<meta property="profile:gender"${add_attribute("content", openGraph.profile.gender, 0)}>` : ``}` : `${openGraph.type.toLowerCase() === "book" && openGraph.book ? `${openGraph.book.authors && openGraph.book.authors.length ? `${each(openGraph.book.authors, (author) => {
    return `<meta property="book:author"${add_attribute("content", author, 0)}>`;
  })}` : ``} ${openGraph.book.isbn ? `<meta property="book:isbn"${add_attribute("content", openGraph.book.isbn, 0)}>` : ``} ${openGraph.book.releaseDate ? `<meta property="book:release_date"${add_attribute("content", openGraph.book.releaseDate, 0)}>` : ``} ${openGraph.book.tags && openGraph.book.tags.length ? `${each(openGraph.book.tags, (tag) => {
    return `<meta property="book:tag"${add_attribute("content", tag, 0)}>`;
  })}` : ``}` : `${openGraph.type.toLowerCase() === "article" && openGraph.article ? `${openGraph.article.publishedTime ? `<meta property="article:published_time"${add_attribute("content", openGraph.article.publishedTime, 0)}>` : ``} ${openGraph.article.modifiedTime ? `<meta property="article:modified_time"${add_attribute("content", openGraph.article.modifiedTime, 0)}>` : ``} ${openGraph.article.expirationTime ? `<meta property="article:expiration_time"${add_attribute("content", openGraph.article.expirationTime, 0)}>` : ``} ${openGraph.article.authors && openGraph.article.authors.length ? `${each(openGraph.article.authors, (author) => {
    return `<meta property="article:author"${add_attribute("content", author, 0)}>`;
  })}` : ``} ${openGraph.article.section ? `<meta property="article:section"${add_attribute("content", openGraph.article.section, 0)}>` : ``} ${openGraph.article.tags && openGraph.article.tags.length ? `${each(openGraph.article.tags, (tag) => {
    return `<meta property="article:tag"${add_attribute("content", tag, 0)}>`;
  })}` : ``}` : `${openGraph.type.toLowerCase() === "video.movie" || openGraph.type.toLowerCase() === "video.episode" || openGraph.type.toLowerCase() === "video.tv_show" || openGraph.type.toLowerCase() === "video.other" && openGraph.video ? `${openGraph.video?.actors && openGraph.video.actors.length ? `${each(openGraph.video.actors, (actor) => {
    return `${actor.profile ? `<meta property="video:actor"${add_attribute("content", actor.profile, 0)}>` : ``} ${actor.role ? `<meta property="video:actor:role"${add_attribute("content", actor.role, 0)}>` : ``}`;
  })}` : ``} ${openGraph.video?.directors && openGraph.video.directors.length ? `${each(openGraph.video.directors, (director) => {
    return `<meta property="video:director"${add_attribute("content", director, 0)}>`;
  })}` : ``} ${openGraph.video?.writers && openGraph.video.writers.length ? `${each(openGraph.video.writers, (writer) => {
    return `<meta property="video:writer"${add_attribute("content", writer, 0)}>`;
  })}` : ``} ${openGraph.video?.duration ? `<meta property="video:duration"${add_attribute("content", openGraph.video.duration.toString(), 0)}>` : ``} ${openGraph.video?.releaseDate ? `<meta property="video:release_date"${add_attribute("content", openGraph.video.releaseDate, 0)}>` : ``} ${openGraph.video?.tags && openGraph.video.tags.length ? `${each(openGraph.video.tags, (tag) => {
    return `<meta property="video:tag"${add_attribute("content", tag, 0)}>`;
  })}` : ``} ${openGraph.video?.series ? `<meta property="video:series"${add_attribute("content", openGraph.video.series, 0)}>` : ``}` : ``}`}`}`}` : ``} ${openGraph.title || updatedTitle ? `<meta property="og:title"${add_attribute("content", openGraph.title || updatedTitle, 0)}>` : ``} ${openGraph.description || description ? `<meta property="og:description"${add_attribute("content", openGraph.description || description, 0)}>` : ``} ${openGraph.images && openGraph.images.length ? `${each(openGraph.images, (image) => {
    return `<meta property="og:image"${add_attribute("content", image.url, 0)}> ${image.alt ? `<meta property="og:image:alt"${add_attribute("content", image.alt, 0)}>` : ``} ${image.width ? `<meta property="og:image:width"${add_attribute("content", image.width.toString(), 0)}>` : ``} ${image.height ? `<meta property="og:image:height"${add_attribute("content", image.height.toString(), 0)}>` : ``} ${image.secureUrl ? `<meta property="og:image:secure_url"${add_attribute("content", image.secureUrl.toString(), 0)}>` : ``} ${image.type ? `<meta property="og:image:type"${add_attribute("content", image.type.toString(), 0)}>` : ``}`;
  })}` : ``} ${openGraph.videos && openGraph.videos.length ? `${each(openGraph.videos, (video) => {
    return `<meta property="og:video"${add_attribute("content", video.url, 0)}> ${video.width ? `<meta property="og:video:width"${add_attribute("content", video.width.toString(), 0)}>` : ``} ${video.height ? `<meta property="og:video:height"${add_attribute("content", video.height.toString(), 0)}>` : ``} ${video.secureUrl ? `<meta property="og:video:secure_url"${add_attribute("content", video.secureUrl.toString(), 0)}>` : ``} ${video.type ? `<meta property="og:video:type"${add_attribute("content", video.type.toString(), 0)}>` : ``}`;
  })}` : ``} ${openGraph.audio && openGraph.audio.length ? `${each(openGraph.audio, (audio) => {
    return `<meta property="og:audio"${add_attribute("content", audio.url, 0)}> ${audio.secureUrl ? `<meta property="og:audio:secure_url"${add_attribute("content", audio.secureUrl.toString(), 0)}>` : ``} ${audio.type ? `<meta property="og:audio:type"${add_attribute("content", audio.type.toString(), 0)}>` : ``}`;
  })}` : ``} ${openGraph.locale ? `<meta property="og:locale"${add_attribute("content", openGraph.locale, 0)}>` : ``} ${openGraph.siteName ? `<meta property="og:site_name"${add_attribute("content", openGraph.siteName, 0)}>` : ``}` : ``}${additionalMetaTags && Array.isArray(additionalMetaTags) ? `${each(additionalMetaTags, (tag) => {
    return `<meta${spread([escape_object(tag)], {})}>`;
  })}` : ``}${additionalLinkTags?.length ? `${each(additionalLinkTags, (tag) => {
    return `<link${spread([escape_object(tag)], {})}>`;
  })}` : ``}<!-- HEAD_svelte-18pzfb8_END -->`, ""}`;
});
const SocialLinkButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { href } = $$props;
  let { logo } = $$props;
  let { title } = $$props;
  let { isExternal = false } = $$props;
  let { index = 0 } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.logo === void 0 && $$bindings.logo && logo !== void 0)
    $$bindings.logo(logo);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.isExternal === void 0 && $$bindings.isExternal && isExternal !== void 0)
    $$bindings.isExternal(isExternal);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  $$unsubscribe_theme();
  return `${isExternal ? `${validate_component(LinkPreview, "LinkPreview").$$render(
    $$result,
    {
      href,
      label: title,
      className: "group inline-flex items-center justify-center rounded-2xl border " + $theme.border.tertiary + " " + $theme.bg.secondary + " p-2 transition-all " + $theme.hover.scale + " " + $theme.accent.indigo.hover.border + " " + $theme.accent.indigo.hover.bg
    },
    {},
    {
      default: () => {
        return `${logo ? `<div class="h-6 w-6"><img${add_attribute("src", logo, 0)}${add_attribute("alt", title, 0)} class="h-full w-full object-contain group-hover:opacity-100 transition-all"></div>` : ``}`;
      }
    }
  )}` : `<a${add_attribute("href", href, 0)} class="${"group flex items-center justify-center rounded-2xl border " + escape($theme.border.tertiary, true) + " " + escape($theme.bg.secondary, true) + " p-2 transition-all " + escape($theme.hover.scale, true) + " " + escape($theme.accent.indigo.hover.border, true) + " " + escape($theme.accent.indigo.hover.bg, true)}">${logo ? `<div class="h-6 w-6"><img${add_attribute("src", logo, 0)}${add_attribute("alt", title, 0)} class="h-full w-full object-contain group-hover:opacity-100 transition-all"></div>` : ``}</a>`}`;
});
const NavigationCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { href } = $$props;
  let { title } = $$props;
  let { description } = $$props;
  let { cta } = $$props;
  let { index = 0 } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.cta === void 0 && $$bindings.cta && cta !== void 0)
    $$bindings.cta(cta);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  $$unsubscribe_theme();
  return `<a${add_attribute("href", href, 0)} class="${"group relative overflow-hidden rounded-xl border " + escape($theme.border.accent, true) + " " + escape($theme.bg.card, true) + " p-3 sm:p-4 md:p-6 shadow-lg transition " + escape($theme.hover.translateUp, true) + " " + escape($theme.hover.shadow, true) + " " + escape($theme.border.hover, true) + " flex flex-col"}"> <div class="${"absolute -right-10 -top-12 h-32 w-32 rounded-full " + escape($theme.glow.primary, true) + " blur-[60px] transition group-hover:translate-x-3"}"></div> <h4 class="${"text-base sm:text-lg md:text-xl font-display font-bold " + escape($theme.text.primary, true)}">${escape(title)}</h4> <p class="${"mt-2 md:mt-3 text-sm sm:text-base md:text-lg " + escape($theme.text.subtle, true) + " flex-1"}">${escape(description)}</p> <span class="${"mt-auto pt-3 md:pt-4 inline-flex text-xs sm:text-sm font-semibold uppercase tracking-widest " + escape($theme.text.subtle, true) + " " + escape($theme.cta.hover, true) + " transition-colors"}">${escape(cta)} →</span></a>`;
});
const SkillBadge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { name } = $$props;
  let { index = 0 } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  $$unsubscribe_theme();
  return `<span class="${"px-4 py-2 rounded-xl " + escape($theme.gradient.secondary, true) + " border " + escape($theme.border.tertiary, true) + " text-[12px] font-sans font-bold uppercase tracking-widest " + escape($theme.text.muted, true) + " transition-all " + escape($theme.accent.emerald.hover.border, true) + " " + escape($theme.accent.yellow.hover.text, true)}">${escape(name)}</span>`;
});
const HeroImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { src } = $$props;
  let { alt } = $$props;
  let { quote } = $$props;
  let { voice } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  if ($$props.quote === void 0 && $$bindings.quote && quote !== void 0)
    $$bindings.quote(quote);
  if ($$props.voice === void 0 && $$bindings.voice && voice !== void 0)
    $$bindings.voice(voice);
  $$unsubscribe_theme();
  return `<figure class="group relative flex flex-col mx-auto"> <div class="${"relative overflow-hidden rounded-xl border " + escape($theme.border.accent, true) + " " + escape($theme.bg.cardSolid, true) + " shadow-2xl"}"><img${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)} class="h-full w-full object-cover transition duration-1000 group-hover:scale-105 group-hover:rotate-1" loading="lazy"></div>  <figcaption class="${"mt-2 p-4 rounded-2xl border " + escape($theme.border.accent, true) + " " + escape($theme.bg.backdrop, true) + " backdrop-blur-md shadow-lg"}"><p class="${"text-md italic " + escape($theme.text.primary, true) + " leading-snug"}">${escape(quote)}</p> <p class="${"mt-3 text-sm " + escape($theme.accent.indigo.text, true) + " font-bold uppercase tracking-widest text-right"}">${escape(voice)}</p></figcaption></figure>`;
});
const FocusCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let { title } = $$props;
  let { description } = $$props;
  let { index = 0 } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  $$unsubscribe_theme();
  return `<div class="${"group relative overflow-hidden rounded-2xl border " + escape($theme.border.default, true) + " " + escape($theme.gradient.primary, true) + " shadow-xl transition-all duration-300 " + escape($theme.border.hover, true) + " " + escape($theme.hover.translateUpMedium, true) + " " + escape($theme.hover.shadowLarge, true) + " p-6"}"><div class="relative"> <h4 class="${"text-2xl font-extrabold " + escape($theme.text.primary, true) + " mb-4 tracking-tight"}">${escape(title)}</h4>  <p class="${"text-base " + escape($theme.text.muted, true) + " leading-relaxed font-light"}">${escape(description)}</p></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $breakpoints, $$unsubscribe_breakpoints;
  let $theme, $$unsubscribe_theme;
  validate_store(breakpoints, "breakpoints");
  $$unsubscribe_breakpoints = subscribe(breakpoints, (value) => $breakpoints = value);
  validate_store(theme, "theme");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  const featuredSkills = skillsData.skills.flatMap((group) => group.items).slice(0, 14);
  $$unsubscribe_breakpoints();
  $$unsubscribe_theme();
  return `${validate_component(MetaTags, "MetaTags").$$render(
    $$result,
    {
      title: site.title,
      description: site.description
    },
    {},
    {}
  )}  <section class="mb-3 font-sans"><div class="${[
    "grid gap-3",
    (!$breakpoints.isDesktop ? "grid-cols-1" : "") + " " + ($breakpoints.isDesktop ? "grid-cols-[65%_1fr]" : "")
  ].join(" ").trim()}"> <div class="flex flex-col flex-1 md:flex-[1] justify-center gap-3"> <div class="flex items-center justify-center backdrop-blur-sm p-4 rounded-xl"><div class="text-left"><div class="flex flex-col"><h1 class="${"uppercase text-5xl font-display font-bold tracking-tight " + escape($theme.text.primary, true) + " leading-tight"}">${escape(homeHero.fullName)}</h1> <h3 class="${"text-sm sm:text-base md:text-lg font-display font-bold " + escape($theme.accent.orange.text, true) + " tracking-widest uppercase"}">${escape(homeHero.title)}</h3></div>  <div class="flex flex-row gap-2 items-center justify-start mt-4">${each(links, (link, index) => {
    return `${validate_component(SocialLinkButton, "SocialLinkButton").$$render(
      $$result,
      {
        href: link.href,
        logo: link.logo,
        title: link.title,
        isExternal: link.isExternal,
        index
      },
      {},
      {}
    )}`;
  })}</div></div></div>  <div class="${"mx-auto w-[90%] border-t " + escape($theme.border.divider, true)}"></div>  <div class="flex items-center py-3 px-8 backdrop-blur-sm"><p class="${"text-base text-lg leading-relaxed " + escape($theme.text.secondary, true) + " font-sans font-light whitespace-pre-line"}">${escape(homeHero.summary)}</p></div></div>  <div class="flex flex-col">${validate_component(HeroImage, "HeroImage").$$render(
    $$result,
    {
      src: homeHero.image.src,
      alt: homeHero.image.alt,
      quote: homeHero.quote,
      voice: homeHero.voice
    },
    {},
    {}
  )}</div></div></section>   <section class="my-12"><div><h3 class="${"text-base text-xl uppercase tracking-[0.4em] " + escape($theme.text.muted, true) + " font-bold mb-3 ml-2"}">${escape(sections.focuses)}</h3> <div class="${[
    "grid gap-4",
    ($breakpoints.isMobile ? "grid-cols-1" : "") + " " + (!$breakpoints.isMobile ? "grid-cols-3" : "")
  ].join(" ").trim()}">${each(homeFocusAreas, (focus, index) => {
    return `${validate_component(FocusCard, "FocusCard").$$render(
      $$result,
      {
        title: focus.title,
        description: focus.description,
        index
      },
      {},
      {}
    )}`;
  })}</div></div></section>  <section><h3 class="${"text-base sm:text-lg md:text-xl font-display uppercase tracking-[0.4em] " + escape($theme.text.muted, true) + " font-bold mb-3 ml-2"}">${escape(sections.navigation)}</h3> <div class="grid gap-2 grid-cols-2">${each(homeNavigationCards, (card, index) => {
    return `${validate_component(NavigationCard, "NavigationCard").$$render(
      $$result,
      {
        href: card.href,
        title: card.title,
        description: card.description,
        cta: card.cta,
        index
      },
      {},
      {}
    )}`;
  })}</div></section>  <section class="my-6"><h3 class="${"text-base sm:text-lg md:text-xl font-display uppercase tracking-[0.4em] " + escape($theme.text.muted, true) + " font-bold mb-3 ml-2"}">${escape(sections.toolkit)}</h3> <div class="${["flex gap-6 justify-between", $breakpoints.isLarge ? "flex-row" : ""].join(" ").trim()}"> <div class="${[
    "flex flex-wrap gap-2 justify-end items-center w-full",
    $breakpoints.isLarge ? "lg:w-[80%]" : ""
  ].join(" ").trim()}">${each(featuredSkills, (skill, index) => {
    return `${validate_component(SkillBadge, "SkillBadge").$$render($$result, { name: skill.name, index }, {}, {})}`;
  })}</div>  <div class="flex items-center w-15"><a href="/portfolio" class="${"w-full hover:opacity-100 opacity-80 group relative px-4 py-2 rounded-xl " + escape($theme.gradient.button, true) + " " + escape($theme.text.white, true) + " text-sm font-display font-bold uppercase tracking-widest transition-all duration-300 " + escape($theme.hover.scaleSmall, true) + " border " + escape($theme.accent.indigo.borderThin, true) + " text-center"}"><span class="relative z-10">${escape(home.skills.seeCompleteStack)}</span></a></div></div></section>`;
});
export {
  Page as default
};
