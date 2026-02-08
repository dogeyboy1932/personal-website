import { Home, Briefcase, FileText, Sparkles } from "lucide-svelte";
import type { ComponentType } from "svelte";

export const navItems: readonly { href: string; label: string; icon: ComponentType }[] = [
  { href: "/", label: "Home", icon: Home }, 
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/more", label: "More", icon: Sparkles },
];