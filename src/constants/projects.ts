/**
 * Projects and portfolio showcase
 */

import type { Project } from "../types";

export const projectsHero = {
  tagline: "Portfolio",
  description:
    "Each project is a playground where research, prototyping, and iteration intersect. From product sprints to hackathons, I love shipping fast, learning intentionally, and refining based on user feedback.",
};

export const projectsData: Project[] = [
  
  {
  title: "NUS Mods",
  duration: "Ongoing",
  description:
    "A project to replicate NUS Mods, making university module planning accessible and scalable across institutions. Designed to help students better plan their academic journey.",
  technologies: ["React", "Node.js", "PostgreSQL"],
  status: "In Development",
  category: "Web Development",
  image: "/nus-mods.png",
  github: "https://github.com/cookedsalamander/University-Mods",
  },
  {
  title: "WhatAGent",
  duration: "Jan 2025",
  description:
    "A starter AI Agent that can interact with Windows CLI (cmd, powershell, etc.) and has CRUD functionality with PostgreSQL database. Features bidirectional voice and text capabilities.",
  technologies: ["Python", "PostgreSQL", "AI/ML"],
  status: "Completed",
  category: "AI/ML",
  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  github: "https://github.com/dogeyboy1932/WhatAGent",
  },
  {
  title: "OnChain Mafia",
  duration: "July 2024",
  description:
    "A Solana-based dApp that uses Multi-Party Computation and Zero-Knowledge proofs for secure, private P2P interactions and game state. The classic mafia card game, but on the blockchain.",
  technologies: ["Solana", "Rust", "Zero-Knowledge Proofs", "MPC"],
  status: "Completed",
  category: "Blockchain",
  image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
  github: "https://github.com/evcoats/on-chain-mafia-game",
  },
  {
  title: "GymBro",
  duration: "Aug 2024",
  description:
    "A multi-platform fitness app that tracks workouts, creates visualizations, and includes real-time chat features. Built for iOS, Android, and web.",
  technologies: ["React Native", "Firebase", "TypeScript"],
  status: "Completed",
  category: "Mobile Development",
  image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  github: "https://github.com/sdimov2/gymapp",
  },
  {
  title: "Upland Chess",
  duration: "Jan 2024",
  description:
    "A chess app built on the Upland Metaverse where users can play and wager cryptocurrency. Integrates blockchain technology with classic chess gameplay.",
  technologies: ["JavaScript", "Blockchain", "Upland SDK"],
  status: "Completed",
  category: "Blockchain",
  image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80",
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

