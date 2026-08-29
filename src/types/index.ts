import type { EmblaCarouselType } from "embla-carousel";
import type emblaCarouselSvelte from "embla-carousel-svelte";

export type EmblaCarouselConfig = Parameters<
  NonNullable<ReturnType<typeof emblaCarouselSvelte>["update"]>
>[0];

export interface CarouselContext {
  api?: EmblaCarouselType;
  config: EmblaCarouselConfig;
}

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

export interface HobbyOrOther {
  name: string;
  logoUrl: string;
}

export interface HobbyCategory {
  category: string;
  items: HobbyOrOther[];
}

export interface HobbiesData {
  hobbies: HobbyCategory[];
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

export interface SkillsData {
  skills: SkillCategory[];
}

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

export interface PageData {
  hero: Hero;
  mainContent: ContentSection;
  additionalContent: ContentSection;
}

interface Hero {
  tagline: string;
  title: string;
  description: string;
  image: Image;
}

interface Image {
  src: string;
  alt: string;
  caption: string;
}

interface ContentSection {
  title: string;
  items: ContentItem[];
}

interface ContentItem {
  title: string;
  subtitle: string;
  secondarySubtitle?: string;
  description: string;
}

export interface CustomLink {
  platform: string;
  title: string;
  href: string;
  isExternal?: boolean;
  logo?: string;
}


export interface Experience {
  role: string;
  company: string;
  duration: string;
  summary: string;
  skills: string[];
}

export interface Hobby {
  name: string;
  note: string;
}

export interface Club {
  name: string;
  /** Optional short role/note; left undefined for member-only clubs */
  tagline?: string;
  /** Optional external link; when set, the club name renders as an underlined link */
  link?: string;
}

export interface AchievementItem {
  label: string;
  value: string;
}

export interface MorePageData {
  title: string;
  subtitle: string;
  bio: string;
  studyAbroad?: {
    role: string;
    company: string;
    duration: string;
    summary: string;
  };
  professionalIdentity?: {
    title: string;
    points: string[];
  };
  achievements?: {
    title: string;
    items: AchievementItem[];
  };
  philosophy?: {
    title: string;
    description: string;
  };
  funFacts: string[];
  hobbies: Hobby[];
  lichess: {
    username: string;
    label: string;
  };

  /* ---- /more rebuild -------------------------------------------------
     Content sourced from the "On My Break", "Leadership" and "Honors"
     sections of GitHub_README_config/README.md, expanded for the website.
     Optional so the older shape still type-checks if a section is dropped. */

  /** FX:flip-words — rotating identity words under the page title. */
  identityWords?: string[];
  /** Count-up figures in the stat band. */
  stats?: MoreStat[];
  travel?: {
    /** Life path, in order: where he was born through where he is now. */
    path: TravelStop[];
    /** FX:flowing-menu — one row per country visited. */
    countries: TravelCountry[];
  };
  /** FX:flip-card — emoji + name on the front, detail on the back. */
  interests?: Interest[];
  /** Orgs with a real role, shown as spotlight cards above the club chips. */
  leadership?: LeadershipRole[];
  honors?: Honor[];
  /** FX:share-button — the hover-fan in the page footer. */
  socials?: SocialHandle[];
}

export interface MoreStat {
  /** Numeric target; the counter animates 0 -> value on scroll into view. */
  value: number;
  /** Rendered straight after the number, e.g. "K+". */
  suffix?: string;
  label: string;
}

export interface TravelStop {
  place: string;
  /** What that stop was: "born", "raised", "college"... */
  note: string;
}

export interface TravelCountry {
  flag: string;
  name: string;
  /** Shown in the marquee panel that slides in on hover. */
  note: string;
}

export interface Interest {
  emoji: string;
  name: string;
  /** Back of the flip card. */
  detail: string;
}

export interface LeadershipRole {
  org: string;
  role: string;
  /** Secondary role line, e.g. "Now Alumni Advisor". */
  tenure?: string;
  summary: string;
  link?: string;
}

export interface Honor {
  /** "2nd Place", "Track Win", "Rank". */
  placement: string;
  event: string;
  detail?: string;
  /** Eagle Scout is a rank, not a competition — rendered apart from the rest. */
  kind: "competition" | "rank";
}

export interface SocialHandle {
  label: string;
  handle: string;
  /** Absent for handles with no linkable profile (Discord) — those copy instead. */
  href?: string;
  icon: "instagram" | "discord" | "lichess" | "mail" | "github" | "linkedin";
}