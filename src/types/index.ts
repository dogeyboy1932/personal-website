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

/* ─── HOME ────────────────────────────────────────────────────────────────────
   constants/home.ts → routes/+page.svelte, and the two pieces that outlive the
   page it is named for: the footer reads `lastUpdated`, the resume route reads
   `resume`. They live here because `resume.description` IS `lastUpdated` — the
   two drifted apart when they sat in separate files.
   `site` and `icons` deliberately stay OUT of this: site meta is read by every
   page, and icons is a component registry rather than content.
   ─────────────────────────────────────────────────────────────────────────── */

export interface HomePageData {
  hero: HomeHero;
  focusesTitle: string;
  focusAreas: HomeFocusArea[];
  quickLinks: HomeQuickLink[];
  socials: SocialHandle[];
  resume: ResumeDoc;
  /** Footer stamp, and the source of the resume's "last updated" line. */
  lastUpdated: string;
}

export interface HomeHero {
  tagline: string;
  /** Rendered with `whitespace-pre-line`, so the \n\n breaks in it are load-bearing. */
  summary: string;
  image: { src: string; alt: string };
  fullName: string;
  /** Draws the name as a ParticleText canvas instead of plain text. */
  particleName: boolean;
  role: string;
  age: string;
  credential: string;
  location: string;
  quotes: HeroQuote[];
}

export interface HeroQuote {
  quote: string;
  voice: string;
}

export interface HomeFocusArea {
  title: string;
  description: string;
}

export interface HomeQuickLink {
  label: string;
  href: string;
}

export interface ResumeDoc {
  url: string;
  label: string;
  pageTitle: string;
  description: string;
}

/** Site-wide meta, not home-page content — NavigationBar and every page's
    MetaTags read it. */
export interface SiteMeta {
  title: string;
  description: string;
  author: string;
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
  kind: "win" | "rank";
  detail?: string;
}

export interface SocialHandle {
  label: string;
  handle: string;
  href: string;
  icon: "instagram" | "discord" | "lichess" | "mail" | "github" | "linkedin";
}