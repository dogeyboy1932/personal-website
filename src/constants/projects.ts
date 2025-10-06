import type { ProjectData } from "../types";

export const projectsData: ProjectData = {
  projects: [
    {
      title: "WhatAGent",
      duration: "Ongoing",
      description:
        "A starter AI Agent that can interact with Windows CLI (cmd, powershell, etc.) and has CRUD functionality with PostgreSQL database. (+ Bidirection voice/text capabilities)",
      githubLink: "https://github.com/dogeyboy1932/WhatAGent",
    },
    {
      title: "NUS Mods",
      duration: "Ongoing",
      description:
        "A project to replicate NUS Mods, making university modules accessible and scalable across institutions.",
      githubLink: "https://github.com/cookedsalamander/University-Mods",
    },
    {
      title: "OnChain Mafia",
      duration: "July 2024 - Present",
      description:
        "A Solana-based dApp that uses Multi-Party Computation and Zero-Knowledge proofs for secure, private P2P interactions and game state. (Literally the mafia card game but on the Solana blockchain",
      githubLink: "https://github.com/evcoats/on-chain-mafia-game",
    },
    {
      title: "GymBro",
      duration: "June 2024 - Aug 2024",
      description:
        "A multi-platform fitness app that tracks workouts, creates visualizations, and includes real-time chat features.",
      githubLink: "https://github.com/sdimov2/gymapp",
    },
    {
      title: "Upland Chess",
      duration: "Nov 2023 - Jan 2024",
      description:
        "A chess app built on the Upland Metaverse where users can play and wager crypto.",
      githubLink: "https://github.com/dogeyboy1932/Upland-Chess-App",
    },
  ],
};

export const projects = {
  techStack: "Tech stack",
  performance: "Performance",
  activeUsers: "Active users",
  processing: "Processing",
  projectPlaybook: "Project playbook",
};
