/**
 * Projects and portfolio showcase
 */

import type { Project } from "../types";

export const projectsHero = {
  tagline: "Portfolio",
  description:
    "Through my experiences and projects, I’ve had the opportunity to explore how emerging technologies can create real value and practical solutions. I strive to stay ahead of the curve, continuously learning, experimenting, and adapting to where our future is headed.",
};

export const projectsData: Project[] = [
  {
    title: "MyCalPal",
    duration: "Sept 2025",
    description:
      "AI calendar assistant via Discord bot. Upload event screenshots, get auto-parsed drafts in a Next.js dashboard, publish to Google Calendar with one click.",
    technologies: ["Next.js", "TypeScript", "Gemini SDK", "Discord SDK", "MongoDB", "GCP", "MCP"],
    status: "Completed",
    complexity: "Advanced",
    category: "AI/ML",
    image: "/projectImages/MyCalPal.png",
    github: "https://github.com/dogeyboy1932/MyCalPal",
    demo: "https://mycalpal.netlify.app/",
  },
  {
    title: "SolPal",
    duration: "Aug 2025",
    description:
      "Voice and text-controlled blockchain wallet. Send crypto to contacts through natural language using AI-powered commands.",
    technologies: ["React Native", "TypeScript", "Web3.js", "Gemini SDK", "MCP"],
    status: "Completed",
    complexity: "Advanced",
    category: "AI/ML",
    image: "/projectImages/SolPal.png",
    github: "https://github.com/dogeyboy1932/SolPal",
  },
  {
    title: "NodeFlow",
    duration: "July 2025",
    description:
      "Browser-native visual playground for Model Context Protocol (MCP) servers where users drag-and-drop to connect AI models with external tools (GitHub, databases, weather, etc), then interact through a chat panel using voice or text prompts. Early contributor to WebMCP ecosystem [mcp-b.ai] (864 stars).",
    technologies: ["React.js", "React Flow", "WebMCP", "TypeScript", "Gemini SDK", "MCP"],
    status: "Completed",
    complexity: "Advanced",
    category: "AI/ML",
    image: "/projectImages/NodeFlow.png",
    github: "https://github.com/dogeyboy1932/NodeFlow",
    demo: "https://mcp-voice.netlify.app/",
  },
  {
    title: "StakeShack",
    duration: "June 2025",
    description:
      "Trustless renting platform with crypto-staking verification and AI recommendations. Won 2nd Place ($1,500) at Solana University Hackathon. Built in one week.",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Solana", "Rust", "Anchor"],
    status: "Completed",
    complexity: "Advanced",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    github: "https://github.com/dogeyboy1932/StakeShack",
  },
  {
    title: "WhatAGent",
    duration: "Jan 2025",
    description:
      "Multi-modal AI agent with voice and chat capabilities. Interacts with Windows CLI and PostgreSQL database for seamless human-AI interaction.",
    technologies: ["React.js", "Express.js", "PostgreSQL", "AI/ML", "REST APIs"],
    status: "Completed",
    complexity: "Intermediate",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
    github: "https://github.com/dogeyboy1932/WhatAGent",
  },
  {
    title: "NUS Mods",
    duration: "Ongoing",
    description:
      "University module planning tool to help students plan their academic journey with course selection, scheduling, and prerequisite tracking.",
    technologies: ["React.js", "Node.js", "PostgreSQL", "Express.js"],
    status: "In Development",
    complexity: "Intermediate",
    category: "Web Development",
    image: "/projectImages/NUS-MODS.png",
    github: "https://github.com/cookedsalamander/University-Mods",
  },
  {
    title: "OnChain Mafia",
    duration: "Aug 2024",
    description:
      "Solana dApp using Multi-Party Computation (MPC) and Zero-Knowledge proofs for secure, private game state. The classic mafia card game on blockchain.",
    technologies: ["Solana", "Rust", "Zero-Knowledge Proofs", "MPC", "Anchor", "React.js", "TypeScript"],
    status: "MVP",
    complexity: "Advanced",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1200&q=80",
    github: "https://github.com/evcoats/on-chain-mafia-game",
  },
  {
    title: "GymBro",
    duration: "Aug 2024",
    description:
      "Multi-platform fitness app with workout tracking, visualizations, and real-time chat. Built for iOS, Android, and web, with Flask and Firebase backend.",
    technologies: ["React Native", "Firebase", "TypeScript", "Expo", "Flask", "Python"],
    status: "MVP",
    complexity: "Intermediate",
    category: "Mobile Development",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    github: "https://github.com/sdimov2/gymapp",
  },
  {
    title: "Upland Chess",
    duration: "Jan 2024",
    description:
      "Wager crypto in chess matches with Lichess and Upland Metaverse integration. Trustless wagering with transparent game outcomes.",
    technologies: ["JavaScript", "Blockchain", "Upland SDK", "Lichess API"],
    status: "Completed",
    complexity: "Intermediate",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&w=1200&q=80",
    github: "https://github.com/dogeyboy1932/Upland-Chess-App",
  },
];

// UI labels for project display
export const projectLabels = {
  techStack: "Tech stack",
  performance: "Performance",
  activeUsers: "Active users",
  processing: "Processing",
  projectPlaybook: "Project playbook",
  liveDemo: "Live demo",
  viewCode: "View code",
  viewAllProjects: "View all projects",
};

