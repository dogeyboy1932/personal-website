import type { CustomLink } from "../types";

export const homeHero = {
  tagline: "Portfolio 2025",
  summary:
    "I'm Akhil Gogineni, a 1st-year Master's student at the University of Illinois Urbana-Champaign studying Computer Science. With experience in blockchain development, full-stack engineering, and Web3 partnerships, I'm passionate about building innovative solutions at the intersection of technology and real-world impact.",
  image: {
    src: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80",
    alt: "Placeholder headshot",
    caption: "Building at the intersection of Web3 and traditional tech",
  },
  fullName: "Akhil Gogineni",
  title: "Graduate Student at University of Illinois - Urbana Champaign • Computer Science"
};

export const homeQuickLinks = [
  { href: "/experience", label: "View Experience" },
  { href: "/portfolio", label: "Browse Projects" },
  { href: "/connect", label: "Say Hello" },
] as const;

export const homeFocusAreas = [
  {
    title: "Product Engineering",
    description:
      "Designing delightful user experiences backed by resilient systems.",
  },
  {
    title: "Analytics & Strategy",
    description:
      "Translating complex data into crisp, actionable insights for teams.",
  },
  {
    title: "Community & Mentorship",
    description:
      "Empowering peers through workshops, leadership, and service projects.",
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
  // {
  //   title: "Experience Timeline",
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
    title: "Community Life",
    description:
      "Clubs, hobbies, and adventures that keep me energized beyond the screen.",
    cta: "Browse hobbies",
    href: "/hobbies",
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
    seeCompleteStack: "See complete stack",
  },
};

export const lastUpdated = "10/25";





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
    title: "vagogineni@gmail.com",
    href: "mailto:vagogineni@gmail.com",
    logo: "https://www.svgrepo.com/show/349378/gmail.svg",
  },
];





export const sections = {
  highlights: "Highlights",
  navigation: "Navigate",
  toolkit: "Toolkit",
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
    "Graduate student at UIUC studying Computer Science. Building at the intersection of blockchain, Web3, and full-stack engineering.",
  author: "Akhil Gogineni",
};
