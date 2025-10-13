import type { PageData } from "../src/types";
import type { HobbiesData, SkillsData } from "../src/types";
import { ProficiencyLevel, SkillStatus } from "../src/types";

// export const experienceHero = {
//   tagline: "Experience",
//   title:
//     "From research labs to product floors, every stop has sharpened my problem-solving lens.",
//   description:
//     "This timeline is a collection of stories about iteration, empathy, and translating ambitious ideas into useful products. Each chapter brought a new lens on leadership, systems thinking, and collaboration.",
//   image: {
//     src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
//     alt: "Team collaboration placeholder",
//     caption: "Team sessions, demo days, and cross-functional wins",
//   },
// };

// export const hobbiesHero = {
//   tagline: "Life beyond the screen",
//   title:
//     "Fueling creativity with music, movement, and moments that build community.",
//   description:
//     "Whether it’s practicing with the a cappella group, coaching tennis, or planning the next volunteer day, hobbies help me stay grounded and energized. Here’s a snapshot of the activities I love plugging into.",
//   image: {
//     src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1100&q=80",
//     alt: "Community gathering placeholder",
//     caption: "Celebrations, team spirit, and shared wins",
//   },
// };

// export const skillsHero = {
//   tagline: "Toolkit",
//   title:
//     "An evolving stack of tools that balance velocity, maintainability, and delight.",
//   description:
//     "Here’s a snapshot of the technologies I reach for and the areas I’m experimenting with next. I believe in combining proven tools with emerging ones to unlock new ideas while keeping reliability high.",
//   image: {
//     src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
//     alt: "Workspace setup placeholder",
//     caption: "Workspace snapshots and lab experiments",
//   },
// };

export const experiences = [
  {
    role: "Core Member",
    company: "CollegeDAO",
    duration: "Oct 2024 - Present",
    description:
      "Building infrastructure for student blockchain communities. Setting up hacker houses and developing a job board for blockchain-related positions. Partnered with multiple organizations to grow the Web3 student ecosystem nationwide.",
  },
  {
    role: "Software & Corporate Intern",
    company: "FreshCredit®",
    duration: "Jun 2023 - Aug 2024",
    description:
      "Developed dynamic NFT solutions for credit management systems. Led technical workshops on Rust programming and credit modeling for the team. Distilled the technical whitepaper into an accessible litepaper for broader audiences.",
  },
  {
    role: "Dev Lead & VP Partnerships",
    company: "Illini Blockchain",
    duration: "Jan 2023 - Present",
    description:
      "Led development team and secured 10+ strategic Web3 partnerships. Architected and built a decentralized crypto lending dApp. Organized large-scale blockchain conferences and educational events on campus.",
  },
  {
    role: "Study Abroad Student",
    company: "National University of Singapore (NUS)",
    duration: "Spring 2024",
    description:
      "Studied Computer Science at NUS, immersing myself in Southeast Asian tech culture. Engaged with the local blockchain and startup ecosystem while exploring innovation hubs across Singapore.",
  },
];

export const hobbyData: HobbiesData = {
  hobbies: [
    {
      category: "Social",
      items: [
        { name: "Public Speaking", logoUrl: "" },
        { name: "Leadership", logoUrl: "" },
        { name: "Communication", logoUrl: "" },
        { name: "Team Building", logoUrl: "" },
        { name: "Project Management", logoUrl: "" },
      ],
    },
    {
      category: "Sports/Hobbies",
      items: [
        { name: "Tennis", logoUrl: "" },
        { name: "Chess", logoUrl: "" },
        { name: "Badminton", logoUrl: "" },
      ],
    },
  ],
};

export const skillsData: SkillsData = {
  skills: [
    {
      category: "Programming Languages",
      items: [
        {
          name: "Python",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
        },
        {
          name: "Java",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
        },
        {
          name: "JavaScript",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        },
        {
          name: "TypeScript",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/f/f5/Typescript.svg",
        },
        {
          name: "C",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg",
        },
        {
          name: "C++",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
        },
        {
          name: "Go",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg",
        },
        {
          name: "Bash",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/8/82/Gnu-bash-logo.svg",
        },
        {
          name: "Rust",
          proficiency: ProficiencyLevel.Beginner,
          status: SkillStatus.Learning,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg",
        },
        {
          name: "Solidity",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/9/98/Solidity_logo.svg",
        },
        {
          name: "C#",
          proficiency: ProficiencyLevel.Beginner,
          status: SkillStatus.Learning,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png",
        },
        {
          name: "SQL",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png",
        },
      ],
    },
    {
      category: "Frameworks",
      items: [
        {
          name: "React.js",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        },
        {
          name: "Svelte.js",
          proficiency: ProficiencyLevel.Learning,
          status: SkillStatus.Learning,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg",
        },
        {
          name: "Vue.js",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
        },
        {
          name: "React Native",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        },
        {
          name: "Flask",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg",
        },
        {
          name: "Tailwind CSS",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
        },
        {
          name: ".NET MAUI",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Priority,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/e/ee/.NET_Core_Logo.svg",
        },
      ],
    },
    {
      category: "Tools",
      items: [
        {
          name: "PostgreSQL",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
        },
        {
          name: "MongoDB",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
        },
        {
          name: "Firebase",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg",
        },
        {
          name: "Git",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg",
        },
        {
          name: "Ubuntu",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo-ubuntu_cof-orange-hex.svg",
        },
        {
          name: "Heroku",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/e/ec/Heroku_logo.svg",
        },
      ],
    },
  ],
};


// export const pageData: Record<string, PageData> = {
//   experience: {
//     hero: experienceHero,
//     mainContent: {
//       title: "Experience timeline",
//       items: experiences.map((experience) => ({
//         title: experience.company,
//         subtitle: experience.role,
//         secondarySubtitle: experience.duration,
//         description: experience.description,
//       })),
//     },
//     additionalContent: {
//       title: "Lessons I’m carrying forward",
//       items: experiences.map((experience) => ({
//         title: experience.company,
//         subtitle: experience.role,
//         description: experience.description,
//       })),
//     },
//   },
//   hobbies: {
//     hero: hobbiesHero,
//     mainContent: {
//       title: "Hobby notebook",
//       items: hobbyData.hobbies.flatMap((hobbyCategory) =>
//         hobbyCategory.items.map((hobby) => ({
//           title: hobby.name,
//           subtitle: hobbyCategory.category,
//           description: "",
//         }))
//       ),
//     },
//     additionalContent: {
//       title: "Future adventures",
//       items: [
//         {
//           title: "Weekend photo walks",
//           subtitle: "",
//           description:
//             "Capture textures, reflections, and portraits across campus neighborhoods.",
//         },
//         {
//           title: "Campus wellness pop-up",
//           subtitle: "",
//           description:
//             "Host a mindfulness session with warm drinks and collaborative journaling.",
//         },
//         {
//           title: "Tech-for-good hackathon",
//           subtitle: "",
//           description:
//             "Bring friends together to prototype tools for local nonprofits.",
//         },
//       ],
//     },
//   },
//   skills: {
//     hero: skillsHero,
//     mainContent: {
//       title: "Skill library",
//       items: skillsData.skills.flatMap((skillCategory) =>
//         skillCategory.items.map((skill) => ({
//           title: skill.name,
//           subtitle: skillCategory.category,
//           description: `Proficiency: ${skill.proficiency}, Status: ${skill.status}`,
//         }))
//       ),
//     },
//     additionalContent: {
//       title: "Up next on the radar",
//       items: [
//         {
//           title: "Google Cloud Digital Leader",
//           subtitle: "",
//           description: "",
//         },
//         {
//           title: "AWS Solutions Architect Associate",
//           subtitle: "",
//           description: "",
//         },
//         {
//           title: "Product Strategy Micro-credential",
//           subtitle: "",
//           description: "",
//         },
//         {
//           title: "Data Visualization Nanodegree",
//           subtitle: "",
//           description: "",
//         },
//       ],
//     },
//   },
// };




export const complexityClasses = {
  Beginner: "text-slate-400 bg-slate-500/10 border border-slate-500/20",
  Intermediate: "text-amber-300 bg-amber-500/10 border border-amber-400/20",
  Advanced: "text-rose-300 bg-rose-500/10 border border-rose-400/20",
} as const;

export const techColors: Record<string, string> = {
  React: "text-blue-300",
  TensorFlow: "text-orange-300",
  Python: "text-yellow-300",
  WebGL: "text-cyan-300",
  "Node.js": "text-slate-300",
  "D3.js": "text-pink-300",
  TypeScript: "text-blue-400",
  WebAssembly: "text-purple-300",
  Redis: "text-red-300",
  Go: "text-cyan-200",
  WebSocket: "text-sky-300",
  PostgreSQL: "text-blue-500",
  Docker: "text-blue-200",
  Kubernetes: "text-indigo-300",
};