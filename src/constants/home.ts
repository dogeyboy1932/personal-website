import type { CustomLink } from "../types";


export const lastUpdated = "8/26";


export const homeHero = {
  tagline: "Portfolio 2026",
  /*
    The five-second answer to "who is this and what drives him".
    Deliberately: one short hook line, then the driver, then the proof. Kept to
    three beats — anything longer and the answer arrives too late.
    Rendered larger and brighter than the old version, which was small grey
    body copy that read as filler.
  */
  summary:
    "Heyyy, I'm Akhil! 👋\n\n" +
    "I build AI systems that turn new technology into something people can actually use — RAG pipelines, agents, and the unglamorous data plumbing underneath them.\n\n" +
    "I'm drawn to problems nobody has settled yet, where the right answer still has to be found rather than looked up. So far that's meant shipping at PwC, research at UIUC, and a stack of hackathon wins.",
  // I see myself as highly driven, keeping myself informed of emerging trends and seeking opportunities to learn, grow, and deliver meaningful value. 
    image: {
    src: "/Linkedin_pfp.jpeg",
    alt: "Placeholder headshot",
  },
  fullName: "Akhil Gogineni",
  // FX:particle-text — flip to true to render the hero name as a cursor-reactive
  // particle cloud instead of plain type. Off by default: it competes with
  // FX:sparkles over the same title block, and the brief flagged it as
  // "we'll see if it's worth keeping".
  particleName: false,
  // Hero identity line, split into parts so the copy is editable without
  // touching markup. Modelled on the GitHub profile header
  // ("AI Engineer · MCS UIUC '26 · Chicago") but with the age dropped —
  // it dates a portfolio and recruiters don't need it.
  role: "AI Engineer",
  age: "22",
  credential: "MCS @ UIUC '26",
  location: "Based in Chicago",
  // FX:quote-carousel — was a single `quote`/`voice` pair; the carousel cycles
  // this list and shuffles the order on each page load.
  // The first entry is the original. The rest are placeholders — swap the text
  // and attribution for whatever you actually want quoted.
  quotes: [
    {
      quote:
        "\"It gets easier. Every day it gets a little easier. But you gotta do it every day. That's the hard part. But it does get easier\"",
      voice: "— A Jogging Baboon",
    },
    {
      quote: "\"The best way to predict the future is to invent it.\"",
      voice: "— Alan Kay",
    },
    {
      quote: "\"Talk is cheap. Show me the code.\"",
      voice: "— Linus Torvalds",
    },
    {
      quote: "\"Premature optimization is the root of all evil.\"",
      voice: "— Donald Knuth",
    },
  ],
};

export const homeQuickLinks = [
  { href: "/experience", label: "View Experience" },
  { href: "/portfolio", label: "Browse Projects" },
  { href: "/connect", label: "Say Hello" },
] as const;



export const homeFocusAreas = [
  {
    title: "Product Development",
    description:
      "Building scalable full-stack applications with modern frameworks and clean architecture.",
  },
  {
    title: "AI Engineering",
    description:
      "Designing and implementing intelligent systems with machine learning and AI technologies.",
  },
  {
    title: "Data Management",
    description:
      "Building robust data pipelines and storage solutions for large-scale applications.",
  },
] as const;



export const homeNavigationCards = [
  {
    title: "Career Portfolio",
    description:
      "See projects, internships, and skills that shaped my journey.",
    cta: "See portfolio",
    href: "/portfolio",
  },
  // for  //   title: "Experience Timeline",
  //   description:
  //     "Dive deep into internships, leadership roles, and the lessons that shaped my journey.",
  //   cta: "View experience",
  //   href: "/experience",
  // },
  // {
  //   title: "Project Gallery",
  //   description:
  //     "Explore end-to-end builds across AI, web, and data storytelling initiatives.",
  //   cta: "Browse projects",
  //   href: "/portfolio",
  // },
  // {
  //   title: "Skill Stack",
  //   description:
  //     "See the languages, frameworks, and tools I rely on to ship ideas quickly.",
  //   cta: "See skills",
  //   href: "/skills",
  // },
  {
    title: "More About Me",
    description:
      "Clubs, hobbies, and interests that keep me busy.",
    cta: "Browse",
    href: "/more",
  },
] as const;

export const home = {
  experience: {
    title: "Latest Experience Snapshot",
    viewFullTimeline: "View full timeline",
  },
  projects: {
    title: "Featured Projects",
    browseFullGallery: "Browse full gallery",
  },
  skills: {
    seeCompleteStack: "See full stack",
  },
};




export const links: CustomLink[] = [
  {
    platform: "Github",
    title: "dogeyboy1932",
    href: "https://github.com/dogeyboy1932",
    isExternal: true,
    logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  },
  {
    platform: "LinkedIn",
    title: "gvAkhil",
    href: "https://www.linkedin.com/in/gvAkhil/",
    isExternal: true,
    logo: "https://imgs.search.brave.com/9M_yqfcDbqqOmImAMszvYFe6oPt8EtceNt5tPfKOgSk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8zNDg4LzM0ODgz/MTEucG5nP3NlbXQ9/YWlzX3doaXRlX2xh/YmVs",
  },
  {
    platform: "Email",
    title: "gogineni.akhil@hotmail.com",
    href: "mailto:gogineni.akhil@hotmail.com",
    logo: "https://www.svgrepo.com/show/349378/gmail.svg",
  },
];



export const sections = {
  focuses: "Mainly Focused On",
  navigation: "Also Check Out",
  toolkit: "Stack",
  openProject: "Open project ↗",
  projectGallery: "Projects",
  skills: "Skills",
  resume: "Resume",
  more: "More",
  prof_experiences: "Experiences",
};



export const site = {
  title: "Akhil Gogineni — Portfolio",
  description:
    "Meet Akhil Gogineni, a Computer Science graduate student at UIUC. Explore his portfolio showcasing expertise in full-stack development, cloud engineering, and AI.",
  author: "Venkat Akhil Gogineni",
};
