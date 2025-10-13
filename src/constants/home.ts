import type { CustomLink } from "../types";

export const homeHero = {
  tagline: "Portfolio 2025",
  summary:
    "Heyyy, I'm Akhil! \n\n I'm a first-year Computer Science graduate student at the University of Illinois Urbana-Champaign. I specialize in full-stack development, cloud engineering, and AI-powered solutions. I see myself as highly driven, aiming to stay ahead of emerging trends and seeking opportunities to learn, grow, and deliver meaningful value.",
  image: {
    src: "/Linkedin_pfp.jpeg",
    alt: "Placeholder headshot",
  },
  fullName: "Akhil Gogineni",
  title: "Graduate Student at University of Illinois - Urbana Champaign • Computer Science",
  quote: "\"It gets easier. Every day it gets a little easier. But you gotta do it every day. That's the hard part. But it does get easier\" \n",
  voice: "- A Jogging Baboon"
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
    title: "gogineni.akhil@hotmail.com",
    href: "mailto:gogineni.akhil@hotmail.com",
    logo: "https://www.svgrepo.com/show/349378/gmail.svg",
  },
];





export const sections = {
  highlights: "Highlights",
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
  author: "Akhil Gogineni",
};
