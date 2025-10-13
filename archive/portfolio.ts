// import type { ProjectData } from "../../types";

// export const projectsData: ProjectData = {
//   projects: [
//     {
//       title: "WhatAGent",
//       duration: "Ongoing",
//       description:
//         "A starter AI Agent that can interact with Windows CLI (cmd, powershell, etc.) and has CRUD functionality with PostgreSQL database. (+ Bidirection voice/text capabilities)",
//       githubLink: "https://github.com/dogeyboy1932/WhatAGent",
//     },
//     {
//       title: "NUS Mods",
//       duration: "Ongoing",
//       description:
//         "A project to replicate NUS Mods, making university modules accessible and scalable across institutions.",
//       githubLink: "https://github.com/cookedsalamander/University-Mods",
//     },
//     {
//       title: "OnChain Mafia",
//       duration: "July 2024 - Present",
//       description:
//         "A Solana-based dApp that uses Multi-Party Computation and Zero-Knowledge proofs for secure, private P2P interactions and game state. (Literally the mafia card game but on the Solana blockchain",
//       githubLink: "https://github.com/evcoats/on-chain-mafia-game",
//     },
//     {
//       title: "GymBro",
//       duration: "June 2024 - Aug 2024",
//       description:
//         "A multi-platform fitness app that tracks workouts, creates visualizations, and includes real-time chat features.",
//       githubLink: "https://github.com/sdimov2/gymapp",
//     },
//     {
//       title: "Upland Chess",
//       duration: "Nov 2023 - Jan 2024",
//       description:
//         "A chess app built on the Upland Metaverse where users can play and wager crypto.",
//       githubLink: "https://github.com/dogeyboy1932/Upland-Chess-App",
//     },
//   ],
// };

// export const projects = {
//   techStack: "Tech stack",
//   performance: "Performance",
//   activeUsers: "Active users",
//   processing: "Processing",
//   projectPlaybook: "Project playbook",
// };


// // export interface ProjectMetrics {
// // 	performance: string;
// // 	users: string;
// // 	processing: string;
// // }

// export interface ProjectShowcaseItem {
//   id: number;
//   title: string;
//   category: string;
//   description: string;
//   image: string;
//   technologies: string[];
//   // metrics: ProjectMetrics;
//   status: "Production" | "Beta" | "Prototype";
//   github?: string;
//   demo?: string;
//   featured?: boolean;
// }

// export const projectsHero = {
//   tagline: "Portfolio",
//   description:
//     "Each project is a playground where research, prototyping, and iteration intersect. From product sprints to hackathons, I love shipping fast, learning intentionally, and refining based on user feedback.",
// };

// export const projectShowcaseIntro = {
//   tagline: "Featured Work",
//   title: "Project Showcase",
//   subtitle:
//     "Cutting-edge solutions that push the boundaries of technology and innovation.",
// };

// export const projectShowcaseItems: ProjectShowcaseItem[] = [
//   {
//     id: 1,
//     title: "NeuroSync AI Platform",
//     category: "Machine Learning",
//     description:
//       "Advanced neural network platform for real-time data processing and predictive analytics. Built with TensorFlow and React for seamless AI integration.",
//     image:
//       "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
//     technologies: ["React", "TensorFlow", "Python", "WebGL", "Node.js"],
//     // metrics: {
//     // 	performance: '99.9%',
//     // 	users: '10K+',
//     // 	processing: '1M+ ops/sec'
//     // },
//     status: "Production",
//     github: "https://github.com",
//     demo: "https://demo.com",
//     featured: true,
//   },
//   {
//     id: 2,
//     title: "Quantum Dashboard",
//     category: "Data Visualization",
//     description:
//       "Interactive quantum computing visualization dashboard with real-time quantum state monitoring and algorithm performance tracking.",
//     image:
//       "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
//     technologies: ["D3.js", "WebGL", "TypeScript", "WebAssembly", "Redis"],
//     // metrics: {
//     // 	performance: '60fps',
//     // 	users: '5K+',
//     // 	processing: 'Real-time'
//     // },
//     status: "Beta",
//     github: "https://github.com",
//     demo: "https://demo.com",
//     featured: true,
//   },
//   {
//     id: 3,
//     title: "CryptoFlow Exchange",
//     category: "Blockchain",
//     description:
//       "High-frequency cryptocurrency trading platform with advanced order matching engine and real-time market data streaming.",
//     image:
//       "https://images.pixabay.com/photo/2017/12/12/12/44/bitcoin-3014614_1280.jpg?auto=compress&cs=tinysrgb&w=1200",
//     technologies: ["Go", "WebSocket", "PostgreSQL", "Docker", "Kubernetes"],
//     // metrics: {
//     // 	performance: '< 1ms',
//     // 	users: '25K+',
//     // 	processing: '100K+ tx/sec'
//     // },
//     status: "Production",
//     github: "https://github.com",
//     demo: "https://demo.com",
//     featured: true,
//   },
// ];

// export interface ProjectCardSummary extends ProjectShowcaseItem {
//   complexity: "Beginner" | "Intermediate" | "Advanced";
//   liveUrl?: string;
//   githubUrl?: string;
// }

// export const projectCardSummaries: ProjectCardSummary[] = [
//   {
//     ...projectShowcaseItems[0],
//     complexity: "Advanced",
//     liveUrl: "https://demo.com",
//     githubUrl: "https://github.com",
//   },
//   {
//     ...projectShowcaseItems[1],
//     complexity: "Intermediate",
//     liveUrl: "https://demo.com",
//     githubUrl: "https://github.com",
//   },
//   {
//     ...projectShowcaseItems[2],
//     complexity: "Advanced",
//     liveUrl: "https://demo.com",
//     githubUrl: "https://github.com",
//   },
// ];

// export const projectPlaybookSteps = [
//   {
//     step: "01 — Discover",
//     description:
//       "Quick research, user interviews, and writing to understand the real problem. I love synthesizing patterns with affinity maps and actionable insights.",
//   },
//   {
//     step: "02 — Build & Measure",
//     description:
//       "Sprint rapidly, test hypotheses, and track meaningful metrics. I document experiments so the next iteration is faster and smarter.",
//   },
//   {
//     step: "03 — Launch & Reflect",
//     description:
//       "Ship with polish, celebrate the wins, and distill key learnings. Every release informs how I scope, prioritize, and collaborate moving forward.",
//   },
//   {
//     step: "04 — Share & Teach",
//     description:
//       "Documenting lessons and open-sourcing resources keeps the community loop strong. I enjoy presenting, blogging, and mentoring newer builders.",
//   },
// ] as const;