export const homeHero = {
  tagline: "Portfolio 2024",
  summary:
    "I’m Akhil Gogineni, a 1st-year Master's student at the University of Illinois Urbana-Champaign studying Computer Science. I love exploring intersections between technology, people, and impact.",
  image: {
    src: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80",
    alt: "Placeholder headshot",
    caption: "I was 20 when this photo was taken. And I look a lot better now",
  },
  fullName: "Akhil Gogineni",
  title: "Graduate at University of Illinois - Urbana Champaign • Computer Science"
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

export const lastUpdated = "Last updated: 1/25";