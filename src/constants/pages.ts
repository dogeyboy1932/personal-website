import type { PageData } from "../types";
import type { HobbiesData, SkillsData } from "../types";
import { ProficiencyLevel, SkillStatus } from "../types";

export const experienceHero = {
  tagline: "Experience",
  title:
    "From research labs to product floors, every stop has sharpened my problem-solving lens.",
  description:
    "This timeline is a collection of stories about iteration, empathy, and translating ambitious ideas into useful products. Each chapter brought a new lens on leadership, systems thinking, and collaboration.",
  image: {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    alt: "Team collaboration placeholder",
    caption: "Team sessions, demo days, and cross-functional wins",
  },
};

export const hobbiesHero = {
  tagline: "Life beyond the screen",
  title:
    "Fueling creativity with music, movement, and moments that build community.",
  description:
    "Whether it’s practicing with the a cappella group, coaching tennis, or planning the next volunteer day, hobbies help me stay grounded and energized. Here’s a snapshot of the activities I love plugging into.",
  image: {
    src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1100&q=80",
    alt: "Community gathering placeholder",
    caption: "Celebrations, team spirit, and shared wins",
  },
};

export const skillsHero = {
  tagline: "Toolkit",
  title:
    "An evolving stack of tools that balance velocity, maintainability, and delight.",
  description:
    "Here’s a snapshot of the technologies I reach for and the areas I’m experimenting with next. I believe in combining proven tools with emerging ones to unlock new ideas while keeping reliability high.",
  image: {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    alt: "Workspace setup placeholder",
    caption: "Workspace snapshots and lab experiments",
  },
};

export const experiences = [
  {
    role: "Core Member",
    company: "CollegeDAO",
    duration: "Oct 2024 - Present",
    description:
      "Setting up hacker houses and building a job board for blockchain-related positions. Partnered with orgs to grow the student ecosystem in Web3",
  },
  {
    role: "Software & Corporate Intern",
    company: "FreshCredit®",
    duration: "Jun 2023 - Aug 2024",
    description:
      "Worked on dynamic NFTs for credit management. Ran workshops on Rust and credit models. Summarized the whitepaper into a litepaper.",
  },
  {
    role: "Dev Lead & VP Partnerships",
    company: "Illini Blockchain",
    duration: "Jan 2023 - Present",
    description:
      "Led dev projects and secured 10+ Web3 partnerships. Built a crypto lending dApp and organized large blockchain events.",
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
          name: "Bash",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/8/82/Gnu-bash-logo.svg",
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

export const pageData: Record<string, PageData> = {
  experience: {
    hero: experienceHero,
    mainContent: {
      title: "Experience timeline",
      items: experiences.map((experience) => ({
        title: experience.company,
        subtitle: experience.role,
        secondarySubtitle: experience.duration,
        description: experience.description,
      })),
    },
    additionalContent: {
      title: "Lessons I’m carrying forward",
      items: experiences.map((experience) => ({
        title: experience.company,
        subtitle: experience.role,
        description: experience.description,
      })),
    },
  },
  hobbies: {
    hero: hobbiesHero,
    mainContent: {
      title: "Hobby notebook",
      items: hobbyData.hobbies.flatMap((hobbyCategory) =>
        hobbyCategory.items.map((hobby) => ({
          title: hobby.name,
          subtitle: hobbyCategory.category,
          description: "",
        }))
      ),
    },
    additionalContent: {
      title: "Future adventures",
      items: [
        {
          title: "Weekend photo walks",
          subtitle: "",
          description:
            "Capture textures, reflections, and portraits across campus neighborhoods.",
        },
        {
          title: "Campus wellness pop-up",
          subtitle: "",
          description:
            "Host a mindfulness session with warm drinks and collaborative journaling.",
        },
        {
          title: "Tech-for-good hackathon",
          subtitle: "",
          description:
            "Bring friends together to prototype tools for local nonprofits.",
        },
      ],
    },
  },
  skills: {
    hero: skillsHero,
    mainContent: {
      title: "Skill library",
      items: skillsData.skills.flatMap((skillCategory) =>
        skillCategory.items.map((skill) => ({
          title: skill.name,
          subtitle: skillCategory.category,
          description: `Proficiency: ${skill.proficiency}, Status: ${skill.status}`,
        }))
      ),
    },
    additionalContent: {
      title: "Up next on the radar",
      items: [
        {
          title: "Google Cloud Digital Leader",
          subtitle: "",
          description: "",
        },
        {
          title: "AWS Solutions Architect Associate",
          subtitle: "",
          description: "",
        },
        {
          title: "Product Strategy Micro-credential",
          subtitle: "",
          description: "",
        },
        {
          title: "Data Visualization Nanodegree",
          subtitle: "",
          description: "",
        },
      ],
    },
  },
};
