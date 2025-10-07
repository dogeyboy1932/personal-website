export const connectPage = {
  messageTemplate: "Message template",
};

export const connectHero = {
  tagline: "Connect",
  title: "Let’s build, brainstorm, or celebrate something together.",
  description:
    "I love hearing from fellow builders, mentors, and future collaborators. Drop a note, share a project, or suggest a new adventure—my inbox is always open.",
  image: {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1100&q=80",
    alt: "Collaboration meetup placeholder",
    caption: "Coffee chats, idea jams, and campus meetups",
  },
};

export const connectMethods = [
  {
    title: "Coffee chat",
    description:
      "Let’s swap stories about design, data, and the next big idea. Remote friendly or on campus.",
    cta: "Schedule a chat",
    href: "mailto:akhilg4@illinois.edu",
  },
  {
    title: "Speaking & panels",
    description:
      "Workshops on rapid prototyping, product strategy, or student leadership.",
    cta: "Request a session",
    href: "mailto:akhilg4@illinois.edu",
  }
] as const;

export const connectMessageTemplate = `Hi Akhil,

My name is [your name], and I’m currently working on [project or interest]. I’d love to connect about [topic].

Let me know if you’re open to chatting sometime next week. Looking forward to hearing from you!

Best,
[your name]
`;
