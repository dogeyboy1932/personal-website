import type { SocialHandle } from "../types";

import { Instagram, Mail, Github, Linkedin, Check, ChessKnightIcon } from "lucide-svelte";
import DiscordLogo from "../lib/OtherLogos/DiscordLogo.svelte";


export const lastUpdated = "8/26";

/* Lives here, next to lastUpdated, because its description IS lastUpdated —
   the two used to drift in separate files (the resume claimed "June 2026"
   while the footer said 8/26). The embed's size is presentation, not content,
   so it sits in _theme.ts as `embedFrame`. */
export const resume = {
  url: "/resume.pdf",
  label: "Download Resume",
  pageTitle: "Resume",
  description: `Last updated: ${lastUpdated}`,
};

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

export const links: SocialHandle[] = [
  {
    label: "Github",
    handle: "dogeyboy1932",
    href: "https://github.com/dogeyboy1932",
    icon: "github",
  },
  {
    label: "LinkedIn",
    handle: "gvAkhil",
    href: "https://www.linkedin.com/in/gvAkhil/",
    icon: "linkedin",
  },
  {
    label: "Email",
    handle: "gogineni.akhil@hotmail.com",
    href: "mailto:gogineni.akhil@hotmail.com",
    icon: "mail",
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


export const icons = {
    instagram: Instagram,
    discord: DiscordLogo,
    lichess: ChessKnightIcon,
    mail: Mail,
    github: Github,
    linkedin: Linkedin,
  } as const;