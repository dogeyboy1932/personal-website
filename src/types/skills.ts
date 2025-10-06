import { ProficiencyLevel, SkillStatus } from './enums';

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