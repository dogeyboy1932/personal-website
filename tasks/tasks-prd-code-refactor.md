## Relevant Files

- `src/routes/**/+page.svelte` - These page files are the primary candidates for consolidation and refactoring.
- `src/routes/+layout.svelte` - The main layout file, which will be affected by routing and structural changes.
- `src/components/**/*.svelte` - All components will be reviewed for modularity, reusability, and potential consolidation.
- `src/constants/*.ts` - This directory will house all the centralized content and constants extracted from the codebase.
- `src/types/*.ts` - Type definitions may need to be updated or consolidated as the codebase is refactored.
- `svelte.config.js` & `vite.config.ts` - Configuration files may need adjustments for performance optimization.

### Notes

- Unit tests should be created or updated for any refactored components to ensure functionality remains intact.
- Use `bun test` to run the test suite.

## Tasks

- [ ] 1.0 Consolidate Codebase and Reduce File Duplication
  - [ ] 1.1 Analyze the `src/routes` directory to identify pages with similar structures that can be merged into a single dynamic route.
  - [ ] 1.2 Refactor similar pages (e.g., `skills`, `hobbies`, `experience`) into a unified component that accepts data props.
  - [ ] 1.3 Audit the `src/components` directory and consolidate single-use components directly into the parent components where they are used.
  - [ ] 1.4 Review and merge CSS files in `src/styles` to reduce the number of separate stylesheets.
- [ ] 2.0 Enhance Component Modularity and Reusability
  - [ ] 2.1 Audit all components in `src/components` to identify and remove tightly coupled dependencies.
  - [ ] 2.2 Refactor components to be self-contained, receiving all necessary data via props and communicating changes via events.
  - [ ] 2.3 Ensure that components are designed for reusability across different parts of the application where applicable.
- [ ] 3.0 Centralize All Constants and Content
  - [ ] 3.1 Perform a global search across the codebase to find and list all hard-coded strings (UI text, links, titles, etc.).
  - [ ] 3.2 Create new files in the `src/constants/` directory to store this content in a structured manner (e.g., `page-content.ts`, `site-links.ts`).
  - [ ] 3.3 Replace all hard-coded values in the components and pages with imports from the new constant files.
- [ ] 4.0 Optimize Application Performance
  - [ ] 4.1 Establish a baseline by running a Lighthouse performance audit on the live or local site.
  - [ ] 4.2 Optimize all images and static assets in the `static/` directory using compression tools.
  - [ ] 4.3 Implement SvelteKit performance best practices, such as lazy loading for off-screen components or images.
  - [ ] 4.4 Run a final Lighthouse audit to measure the performance improvement against the baseline.
- [ ] 5.0 Final Verification and Code Cleanup
  - [ ] 5.1 Conduct a full manual review of the website to ensure all pages render correctly and all interactive elements are functional.
  - [ ] 5.2 Execute the entire test suite and fix any failing tests resulting from the refactor.
  - [ ] 5.3 Identify and delete any unused files, components, or variables to clean up the codebase.
  - [ ] 5.4 Ensure the entire project adheres to the established code formatting and linting rules.
