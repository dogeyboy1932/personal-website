/** Shared content shapes, grouped by the page that consumes them.
    Pattern: a constants/*.ts file declares the data against a type here, and a
    component takes a slice of it as a prop. */

/* ─── SKILLS (portfolio) ──────────────────────────────────────────────────────
   constants/skills.ts → PORTFOLIO/SkillCategoryCard.svelte
   Enums, not unions: skills.ts uses the members as runtime values.
   ─────────────────────────────────────────────────────────────────────────── */

export enum ProficiencyLevel {
  Beginner = "beginner",
  Proficient = "proficient",
  Learning = "learning",
}

export enum SkillStatus {
  Learned = "learned",
  Learning = "learning",
  Priority = "priority",
}

export interface SkillItem {
  name: string;
  proficiency: ProficiencyLevel;
  status: SkillStatus;
  logoUrl: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

/* ─── PROJECTS (portfolio) ────────────────────────────────────────────────────
   constants/projects.ts → PORTFOLIO/ProjectCard.svelte
   ─────────────────────────────────────────────────────────────────────────── */

export type ProjectCategory = "AI/ML" | "Blockchain" | "Mobile" | "Other";

export interface Project {
  title: string;
  duration: string;
  description: string;
  technologies: string[];
  status: "Completed" | "In Development" | "MVP";
  complexity: "Beginner" | "Intermediate" | "Advanced";
  category: ProjectCategory[];
  image: string;
  github: string;
  demo?: string;
}

/* ─── EXPERIENCE (portfolio) ──────────────────────────────────────────────────
   constants/experiences.ts → PORTFOLIO/ExperienceCard.svelte
   ─────────────────────────────────────────────────────────────────────────── */

export interface Experience {
  role: string;
  company: string;
  duration: string;
  summary: string;
  skills: string[];
}

/* ─── MORE ────────────────────────────────────────────────────────────────────
   constants/more.ts (more) → more/+page.svelte, which spreads the optional
   sections into one MORE/* component each. Club is used by MORE/CampusClubs;
   SocialHandle also by Creative/ShareButton.
   ─────────────────────────────────────────────────────────────────────────── */

export interface MorePageData {
  title: string;
  bio?: string;
  lichess: {
    username: string;
    label: string;
  };
  identityWords?: string[];
  stats?: MoreStat[];
  travel?: {
    path: TravelStop[];
    countries: TravelCountry[];
  };
  interests?: Interest[];
  leadership?: LeadershipRole[];
  clubs?: Club[];
  honors?: Honor[];
  socials?: SocialHandle[];
}


export interface Club {
  name: string;
  tagline?: string;
  link?: string;
}

export interface MoreStat {
  value: number;
  suffix?: string;
  label: string;
}

export interface TravelStop {
  place: string;
  note: string;
}

export interface TravelCountry {
  flag: string;
  name: string;
  note: string;
}

export interface Interest {
  emoji: string;
  name: string;
  detail: string;
}

export interface LeadershipRole {
  org: string;
  role: string;
  tenure?: string;
  summary: string;
  link?: string;
}

export interface Honor {
  placement: string;
  event: string;
  detail?: string;
  kind: "win" | "rank";
}

export interface SocialHandle {
  label: string;
  handle: string;
  href: string;
  icon: "instagram" | "discord" | "lichess" | "mail" | "github" | "linkedin";
}