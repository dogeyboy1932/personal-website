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

- [x] 1.0 Consolidate Codebase and Reduce File Duplication
  - [x] 1.1 Analyze the `src/routes` directory to identify pages with similar structures that can be merged into a single dynamic route.
  - [x] 1.2 Refactor similar pages (e.g., `skills`, `hobbies`, `experience`) into a unified component that accepts data props.
  - [x] 1.3 Audit the `src/components` directory and consolidate single-use components directly into the parent components where they are used.
  - [x] 1.4 Review and merge CSS files in `src/styles` to reduce the number of separate stylesheets.
- [x] 2.0 Enhance Component Modularity and Reusability
  - [x] 2.1 Audit all components in `src/components` to identify and remove tightly coupled dependencies.
  - [x] 2.2 Refactor components to be self-contained, receiving all necessary data via props and communicating changes via events.
  - [x] 2.3 Ensure that components are designed for reusability across different parts of the application where applicable.
- [x] 3.0 Centralize All Constants and Content
  - [x] 3.1 Perform a global search across the codebase to find and list all hard-coded strings (UI text, links, titles, etc.).
  - [x] 3.2 Create new files in the `src/constants/` directory to store this content in a structured manner (e.g., `page-content.ts`, `site-links.ts`).
  - [x] 3.3 Replace all hard-coded values in the components and pages with imports from the new constant files.
- [x] 4.0 Optimize Application Performance
  - [x] 4.1 Establish a baseline by running a Lighthouse performance audit on the live or local site.
  - [x] 4.2 Optimize all images and static assets in the `static/` directory using compression tools.
  - [x] 4.3 Implement SvelteKit performance best practices, such as lazy loading for off-screen components or images.
  - [x] 4.4 Run a final Lighthouse audit to measure the performance improvement against the baseline.
- [x] 5.0 Final Verification and Code Cleanup
  - [x] 5.1 Conduct a full manual review of the website to ensure all pages render correctly and all interactive elements are functional.
  - [x] 5.2 Execute the entire test suite and fix any failing tests resulting from the refactor.
  - [x] 5.3 Identify and delete any unused files, components, or variables to clean up the codebase.
  - [x] 5.4 Ensure the entire project adheres to the established code formatting and linting rules.
- [x] 6.0 Project Cleanup and Navigation Fix
  - [x] 6.1 Relocate NavigationBar Component: Move `src/sections/NavigationBar.svelte` to `src/components/NavigationBar.svelte` and delete the `src/sections` directory.
  - [x] 6.2 Consolidate Styles: Move any necessary styles from `src/styles/mainpage.css` into a more appropriate location like `src/app.css` or inline them, and then delete the `src/styles` directory.
  - [x] 6.3 Fix Navigation Links: Update `src/components/NavigationBar.svelte` to ensure all links (`/lab`, `/blog`, etc.) are present and correct.
  - [x] 6.4 Consolidate Type Definitions: Review the `src/types` directory and merge related type files to reduce the number of files.
  - [x] 6.5 Final Directory Audit: Perform a final review of the project structure and remove any other empty or single-file directories by consolidating where possible.
