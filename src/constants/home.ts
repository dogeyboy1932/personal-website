import type { HomePageData, SiteMeta } from "../types";

import { Instagram, Mail, Github, Linkedin, Check, ChessKnightIcon } from "lucide-svelte";
import DiscordLogo from "../lib/OtherLogos/DiscordLogo.svelte";

/* One object for the page, declared against HomePageData — the same shape
   `more` uses. It absorbed six loose exports that were only ever read together,
   plus `resume`, whose description is derived from lastUpdated rather than
   restated (the two had already drifted: the resume claimed June 2026 against a
   footer reading 8/26). */

const lastUpdated = "8/26";

export const home: HomePageData = {
  lastUpdated,

  hero: {
    tagline: "Portfolio 2026",
    summary:
      "Heyyy, I'm Akhil! 👋\n\n" +
      "I put time toward sharpening how I leverage AI & emerging tech. I try being ahead of the curve, staying informed of latest trends + seeing where the world's headed. Super excited for what's to come! 🌱🚀 \n\n" +
    "Also I'm curious by nature...and I love trying new things. Every day is a level-up.",
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
  },

  focusesTitle: "Mainly Focused On",

  focusAreas: [
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
  ],

  quickLinks: [
    { label: "Portfolio", href: "/portfolio" },
    { label: "Full stack", href: "/portfolio#skills" },
    { label: "More about me", href: "/more" },
  ],

  socials: [
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
  ],

  resume: {
    url: "/resume.pdf",
    label: "Download Resume",
    pageTitle: "Resume",
    description: `Last updated: ${lastUpdated}`,
  },
};

export const site: SiteMeta = {
  title: "Akhil Gogineni — Portfolio",
  description: "See my website",
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