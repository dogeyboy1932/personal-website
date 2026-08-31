import type { CustomLink } from "../types";

export const lastUpdated = "8/26";

export const homeHero = {
  tagline: "Portfolio 2026",
  summary:
    "Heyyy, I'm Akhil! 👋\n\n" +
    "I'm building AI systems that turn new technology into something people can actually use \n\n" +
    "I see myself as highly driven, keeping myself informed of emerging trends and seeking opportunities to learn, grow, and deliver meaningful value.",
    image: {
    src: "/Linkedin_pfp.jpeg",
    alt: "Placeholder headshot",
  },
  fullName: "Akhil Gogineni",
  particleName: true,
  role: "AI Engineer",
  age: "22",
  credential: "MCS @ UIUC '26",
  location: "Based in Chicago",
  quotes: [
    {
      quote:
        "\"It gets easier. Every day it gets a little easier. But you gotta do it every day. That's the hard part. But it does get easier\"",
      voice: "— A Jogging Baboon",
    },
  ],
};

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

export const homeQuickLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Full stack", href: "/portfolio#skills" },
  { label: "More about me", href: "/more" },
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
