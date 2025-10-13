# Constants Directory

This directory contains all static content and configuration data for the portfolio website.

## Structure

### Active Constants
- **`experiences.ts`** - Professional experiences and education timeline
- **`skills.ts`** - Technical skills, hobbies, proficiency levels, and styling helpers
- **`projects.ts`** - Project portfolio data and labels
- **`home.ts`** - Homepage hero, quick links, focus areas, and navigation cards
- **`more.ts`** - "More About Me" page content (fun facts, hobbies, spotlight projects)
- **`nav.ts`** - Navigation menu items
- **`links.ts`** - Social media and contact links
- **`site.ts`** - Site metadata (title, description, author)
- **`resume.ts`** - Resume page configuration and PDF path
- **`fonts.ts`** - Font configuration and options
- **`sections.ts`** - Section labels used across the site
- **`labels.ts`** - UI labels and text snippets
- **`index.ts`** - Central export for all constants (use this for cleaner imports)

### Archive
- **`archive/`** - Unused or deprecated constant files
  - `blog-page.ts` - Blog page content (route not active)
  - `connect-page.ts` - Connect page content (commented out, not used)
  - `lab.ts` - Creative zone content (route exists but not actively used)
  - `pages.ts` - Old monolithic file (split into experiences.ts and skills.ts)
  - `portfolio.ts` - Old portfolio file (replaced by projects.ts)

## Usage

### Recommended Import Pattern
Use the index file for cleaner imports:
```typescript
import { experiences, skillsData, projectsData } from '../constants';
```

### Direct Imports
You can also import directly from specific files:
```typescript
import { experiences } from '../constants/experiences';
import { skillsData } from '../constants/skills';
```

## Organization Principles

1. **One concern per file** - Each file handles a specific domain (experiences, skills, projects, etc.)
2. **Clear naming** - File names clearly indicate their purpose
3. **Type safety** - All data exports are properly typed using TypeScript interfaces
4. **Centralized exports** - The index.ts file provides a single import point
5. **Archive unused code** - Old or deprecated files moved to `/archive` rather than deleted

## Maintaining Constants

When updating content:
1. Find the appropriate file based on the content type
2. Update the data while maintaining type safety
3. Ensure any new fields match the TypeScript interfaces in `src/types/`
4. Test the changes across all routes that use the constant

When adding new constants:
1. Create a new file following the naming pattern
2. Add proper JSDoc comments at the top
3. Export the new constants in `index.ts`
4. Update this README with the new file

## Content Accuracy

All content should match the actual resume (`/static/Akhil Resume • Aug 2025.pdf`). Key facts:
- Currently pursuing MS in Computer Science at UIUC
- Study abroad at NUS Singapore (Spring 2024)
- Experience with CollegeDAO, FreshCredit®, Illini Blockchain
- Projects: WhatAGent, OnChain Mafia, GymBro, NUS Mods, Upland Chess
- Skills: Python, Java, JavaScript, TypeScript, C, C++, Go, Rust, Solidity, React, Svelte, Vue
- Interests: Chess (Lichess: trashboatsr), Tennis, Blockchain/Web3
