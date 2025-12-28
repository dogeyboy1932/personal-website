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
  bullets?: string[];
  skills?: string[];
}

export interface Hobby {
  name: string;
  note: string;
}

export interface AchievementItem {
  label: string;
  value: string;
}

export interface MorePageData {
  title: string;
  subtitle: string;
  bio: string;
  studyAbroad: {
    role: string;
    company: string;
    duration: string;
    summary: string;
  };
  professionalIdentity: {
    title: string;
    points: string[];
  };
  achievements: {
    title: string;
    items: AchievementItem[];
  };
  philosophy: {
    title: string;
    description: string;
  };
  funFacts: string[];
  hobbies: Hobby[];
  lichess: {
    username: string;
    label: string;
  };
}