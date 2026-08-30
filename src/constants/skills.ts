/** Skills, hobbies, and proficiency levels */

import type { SkillsData } from "../types";
import { ProficiencyLevel, SkillStatus } from "../types";

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
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
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
          name: "Rust",
          proficiency: ProficiencyLevel.Beginner,
          status: SkillStatus.Learning,
          logoUrl:
            "https://cdn.simpleicons.org/rust/E2E8F0",
        },
        {
          name: "Bash",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.simpleicons.org/gnubash/E2E8F0",
        },
        {
          name: "Git",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://imgs.search.brave.com/JmSVv0Txoc0_4jwsKY74t_Ogv17947XPCvxZj54zamM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LWdpdC1pY29uLXN2/Zy1kb3dubG9hZC1w/bmctMjI1OTk2LnBu/Zz9mPXdlYnAmdz0y/NTY",
        },
        {
          name: "SQL",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://imgs.search.brave.com/WvFM_NuTnQ7TFqY9ZRDfYRR3mVYpM4kme71eRZXR-DU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNzEzNC8xNzEz/NDA2Ni5wbmc_c2Vt/dD1haXNfd2hpdGVf/bGFiZWw",
        },
        {
          name: "C#",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
        },
        {
          name: "HTML/CSS",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/1/10/CSS3_and_HTML5_logos_and_wordmarks.svg",
        },
        {
          name: "PHP",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
        }
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
          name: "Next.js",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.simpleicons.org/nextdotjs/E2E8F0",
        },
        {
          name: "Vue.js",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
        },
        {
          name: "Svelte.js",
          proficiency: ProficiencyLevel.Learning,
          status: SkillStatus.Learning,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg",
        },
        {
          name: "Tailwind CSS",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
        },
                {
          name: "React Native / Expo",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        },
        {
          name: "Node.js",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg",
        },
        {
          name: "Express.js",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.simpleicons.org/express/E2E8F0",
        },
        {
          name: "Flask",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.simpleicons.org/flask/E2E8F0",
        },
        {
          name: "FastAPI",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
        },
        {
          name: "NumPy",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
        },
        {
          name: "Pandas",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
        },
        {
          name: "Flutter",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
        },
      ],
    },
    {
      category: "Databases",
      items: [
        
        {
          name: "PostgreSQL",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
        },
        {
          name: "MySQL",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        },
        {
          name: "Firebase",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://imgs.search.brave.com/xqjvu9YcpQRhidfyqy58dDFVl2yzn1dKgtqfq0IvpHg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuY2RubG9nby5j/b20vbG9nb3MvZi82/Ny9maXJlYmFzZS5z/dmc",
        },
        {
          name: "Supabase",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://imgs.search.brave.com/YMP3Ruh4z3Oo2rtS9p91S4dF9uMRVHOG5j3M4n78XgY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdXBh/YmFzZS5jb20vX25l/eHQvaW1hZ2U_dXJs/PS9pbWFnZXMvY29t/cGFueS9jb21tdW5p/dHkvc3VwYWJhc2Uu/cG5nJnc9Mzg0MCZx/PTc1",
        },
        {
          name: "MongoDB",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://imgs.search.brave.com/KO0LdnYb-uykcgT_EQztTcp_3oJnwj8yScuY2u52kYM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LW1vbmdvZGItbG9n/by1pY29uLXN2Zy1k/b3dubG9hZC1wbmct/MzAzMjMxMC5wbmc_/Zj13ZWJwJnc9MTI4",
        },
        {
          name: "pgvector",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
        },
        {
          name: "Milvus",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.simpleicons.org/milvus/00A1EA",
        },
        {
          name: "Neo4j",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://imgs.search.brave.com/pMMurtIx_165CkjcQpCX9fKrlVJBCZBjIGgXONyuinw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuY2RubG9nby5j/b20vbG9nb3Mvbi80/Mi9uZW80ai5zdmc",
        },
      ],
    },
    {
      category: "Cloud",
      items: [
        {
          name: "Databricks",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.simpleicons.org/databricks/FF3621",
        },
        {
          name: "Docker",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://imgs.search.brave.com/qcoXX3ekf6X_P-u5tdCXkPy6Iv0m7H9FX1xOpiWflWY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9h/L2E3L0RvY2tlci1z/dmdyZXBvLWNvbS5z/dmc",
        },
        {
          name: "AWS",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
        },
        {
          name: "Azure",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        },
        {
          name: "GCP",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
        },
        {
          name: "Railway",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://railway.app/brand/logo-light.png",
        },
        {
          name: "Netlify",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
        },
        {
          name: "Ubuntu/Linux",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo-ubuntu_cof-orange-hex.svg",
        },
      ],
    },
    {
      category: "AI & ML Libraries",
      items: [
        {
          name: "Gemini SDK",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.simpleicons.org/googlegemini/8E75B2",
        },
        {
          name: "Anthropic MCP",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learning,
          logoUrl:
            "https://www.anthropic.com/images/icons/apple-touch-icon.png",
        },
        {
          name: "LangChain",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://avatars.githubusercontent.com/u/126733545?s=200&v=4",
        },
        {
          name: "Pydantic AI",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://avatars.githubusercontent.com/u/110818415?s=200&v=4",
        },
        {
          name: "Pytorch",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://imgs.search.brave.com/rdD8MIx6SCwI2j_ZmcAQWJH3iyKa_GlVfmmsQw3fWEE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ibG9n/LmNocmlzdGlhbnBl/cm9uZS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTgvMTAv/cHl0b3JjaC1sb2dv/LTMwMHgzMDAucG5n",
        },
        {
          name: "Scikit-learn",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learning,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
        },
      ],
    },
    {
      category: "Blockchain",
      items: [
        {
          name: "Solana",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
        },
        {
          name: "Ethereum",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg",
        },
        {
          name: "Solidity",
          proficiency: ProficiencyLevel.Proficient,
          status: SkillStatus.Learned,
          logoUrl:
            "https://cdn.simpleicons.org/solidity/E2E8F0",
        },
      ],
    },
  ],
};

// Tech stack colors - randomly pick from these
export const techColors = [
  "text-blue-300",
  "text-blue-400",
  "text-cyan-300",
  "text-cyan-400",
  "text-teal-300",
  "text-emerald-300",
  "text-emerald-400",
  "text-green-300",
  "text-green-400",
  "text-lime-300",
  "text-yellow-300",
  "text-yellow-400",
  "text-amber-300",
  "text-orange-300",
  "text-orange-400",
  "text-red-300",
  "text-rose-300",
  "text-pink-300",
  "text-pink-400",
  "text-purple-300",
  "text-purple-400",
  "text-violet-300",
  "text-violet-400",
  "text-indigo-300",
  "text-indigo-400",
  "text-sky-300",
  "text-slate-300",
  "text-slate-400",
] as const;

// Project complexity badge styles
export const complexityClasses = {
  Beginner: "text-slate-400 bg-slate-500/10 border border-slate-500/20",
  Intermediate: "text-amber-300 bg-amber-500/10 border border-amber-400/20",
  Advanced: "text-rose-300 bg-rose-500/10 border border-rose-400/20",
} as const;
