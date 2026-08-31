
import type { SkillCategory } from "../types";
import { ProficiencyLevel, SkillStatus } from "../types";

/* LOGOS — three sources, and one decision per mark. Everything here was
   verified to resolve, in BOTH themes; nothing hotlinks a search-result cache
   or a site favicon any more, and the devicon URLs are PINNED to a release tag
   so an upstream reshuffle cannot silently break them.

     cdn.jsdelivr.net/…/devicon@v2.17.0   brand-coloured marks, all 128×128
     cdn.simpleicons.org/<slug>/<colour>  anything devicon renders flat black
     api.iconify.design/…                 the few devicon has no mark for

   The colour a mark is asked for is the whole decision, and getting it wrong
   is what "whited out" and "invisible" logos look like:

     /pydantic/E92063        brand colour, when it clears ~3:1 on white AND black
     /expo/{ink}             ONLY for a mark that is genuinely black (Expo, Rust,
                             Next.js, Express, Railway) — no brand colour to
                             lose, so it follows the theme
     /pandas/{theme:a|b}     a mark whose brand colour only reads on ONE ground.
                             Pandas navy vanishes on black, so dark gets the
                             pandas yellow; AWS navy likewise, so dark gets the
                             AWS orange. Both halves are real brand colours.
                             The halves need not be colours: Neo4j swaps the
                             whole icon for vscode-icons' matched pair, same
                             mark and same blue, black circle on white and a
                             light one on black. Recolouring cannot fix a logo
                             that is PART black — only a second artwork can.

   Never put {ink} on a mark that HAS a brand colour: flattened to one ink it
   reads as a loading failure sitting next to its colourful neighbours. Bash
   (#4EAA25) and Flask (#3BABC3) are the borderline pair — both land under 3:1
   on white, so they stay on {ink} deliberately.

   CAVEAT for whoever adds the next one: check the mark against BOTH grounds,
   and check EVERY colour in it, not just the most visible one. A two-tone logo
   passes a naive check on the strength of its bright half while the other half
   disappears — that is exactly how the AWS wordmark and the pandas body shipped
   invisible on black. */

export const skillsData: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: [
      {
        name: "Python",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/python/python-original.svg",
      },
      {
        name: "Java",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/java/java-original.svg",
      },
      {
        name: "JavaScript",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/typescript/typescript-original.svg",
      },
      {
        name: "C",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/c/c-original.svg",
      },
      {
        name: "C++",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/cplusplus/cplusplus-original.svg",
      },
      {
        name: "Go",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/go/go-original.svg",
      },
      {
        name: "Rust",
        proficiency: ProficiencyLevel.Beginner,
        status: SkillStatus.Learning,
        logoUrl:
          "https://cdn.simpleicons.org/rust/{ink}",
      },
      {
        name: "Bash",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.simpleicons.org/gnubash/{ink}",
      },
      {
        name: "Git",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/git/git-original.svg",
      },
      {
        name: "SQL",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://api.iconify.design/mdi/database.svg?color=%23{theme:0369A1|38BDF8}",
      },
      {
        name: "C#",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/csharp/csharp-original.svg",
      },
      {
        name: "HTML/CSS",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/html5/html5-original.svg",
      },
      {
        name: "PHP",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/php/php-original.svg",
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
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.simpleicons.org/nextdotjs/{ink}",
      },
      {
        name: "Vue.js",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/vuejs/vuejs-original.svg",
      },
      {
        name: "Svelte.js",
        proficiency: ProficiencyLevel.Learning,
        status: SkillStatus.Learning,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/svelte/svelte-original.svg",
      },
      {
        name: "Tailwind CSS",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/tailwindcss/tailwindcss-original.svg",
      },
              {
        name: "React Native / Expo",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.simpleicons.org/expo/{ink}",
      },
      {
        name: "Node.js",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express.js",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.simpleicons.org/express/{ink}",
      },
      {
        name: "NumPy",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/numpy/numpy-original.svg",
      },
      {
        name: "Pandas",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.simpleicons.org/pandas/{theme:150458|FFCA00}",
      },
      {
        name: "Flutter",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/flutter/flutter-original.svg",
      },
      {
        name: "FastAPI",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/fastapi/fastapi-original.svg",
      },
      {
        name: "Flask",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.simpleicons.org/flask/{ink}",
      }
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
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "MySQL",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/mysql/mysql-original.svg",
      },
      {
        name: "Firebase",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/firebase/firebase-original.svg",
      },
      {
        name: "Supabase",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/supabase/supabase-original.svg",
      },
      {
        name: "MongoDB",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "pgvector",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "Milvus",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://api.iconify.design/logos/milvus-icon.svg",
      },
      {
        name: "Neo4j",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://api.iconify.design/vscode-icons/{theme:file-type-light-neo4j|file-type-neo4j}.svg",
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
          "https://api.iconify.design/logos/databricks-icon.svg",
      },
      {
        name: "Docker",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/docker/docker-original.svg",
      },
      {
        name: "AWS",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://api.iconify.design/mdi/aws.svg?color=%23{theme:252F3E|FF9900}",
      },
      {
        name: "Azure",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/azure/azure-original.svg",
      },
      {
        name: "GCP",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/googlecloud/googlecloud-original.svg",
      },
      {
        name: "Railway",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.simpleicons.org/railway/{ink}",
      },
      {
        name: "Netlify",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/netlify/netlify-original.svg",
      },
      {
        name: "Ubuntu/Linux",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/ubuntu/ubuntu-original.svg",
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
          "https://cdn.simpleicons.org/anthropic/D97757",
      },
      {
        name: "LangChain",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.simpleicons.org/langchain/{theme:0F6FA8|7FC8FF}",
      },
      {
        name: "Pydantic AI",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.simpleicons.org/pydantic/E92063",
      },
      {
        name: "Pytorch",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/pytorch/pytorch-original.svg",
      },
      {
        name: "Scikit-learn",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learning,
        logoUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/scikitlearn/scikitlearn-original.svg",
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
          "https://api.iconify.design/token-branded/solana.svg",
      },
      {
        name: "Ethereum",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.simpleicons.org/ethereum/627EEA",
      },
      {
        name: "Solidity",
        proficiency: ProficiencyLevel.Proficient,
        status: SkillStatus.Learned,
        logoUrl:
          "https://cdn.simpleicons.org/solidity/{theme:363636|9CA3AF}",
      },
    ],
  },
]