# Project: "Lisek Salon Groomerski" - Main Guidelines

## 1. CRITICAL RULE: MEMORY.md File
- Before starting any coding work, **create a `MEMORY.md` file** in the project's root directory.
- The `MEMORY.md` file will serve as your logbook. You must continuously record: current progress, project assumptions, resolved issues, data structure, and the plan for the next steps.
- **ABSOLUTE REQUIREMENT:** At the beginning of each new interaction, session, or before starting a new task, you must **read the `MEMORY.md` file first** to retrieve the full project context.
- Update the contents of `MEMORY.md` after every successfully completed stage.

## 2. Design and Visual Guidelines
- The website's design style (UI/UX) **must be based exclusively on the guidelines provided in the `DESIGN.md` file**.
- **Logo Asset:** The salon's logo is located in the file **`lisek_logo.png`**. Use this file for the branding and navigation sections of the website.
- Before you start building the interface or writing styles, locate and read `DESIGN.md`. Use only the color palette, typography, spacing, and component guidelines defined there.
- Do not invent your own visual styles – treat `DESIGN.md` as the single source of truth for the front-end.

## 3. Functional & Content Requirements
- **Language Policy:** All text content displayed on the website must be written entirely in **Polish**.
- **Salon Data:** All salon details, including contact information, address, and operating hours, are located in the **`info.txt`** file. You must read this file and use its precise contents to populate the website.
- The website will serve as a portfolio and include a clear pricing list.
- Integration of the Booksy widget for appointment booking (iframe/JS script) is required.
- The code must be semantic and fully responsive (Mobile First).

## 4. Accessibility Guidelines (WCAG) - STRICT COMPLIANCE
- The website must be developed in strict accordance with **WCAG (Web Content Accessibility Guidelines)**.
- Ensure full web accessibility by actively implementing semantic HTML5, appropriate ARIA roles and labels, full keyboard navigation compatibility, and proper color contrast ratios.
- Treat accessibility as a core feature, not an afterthought.

## 5. Technology Stack, Tooling & Frameworks
- **Primary Language:** You MUST use **TypeScript** as the primary programming language for all logic to ensure type safety, robust architecture, and code quality. Do not use plain JavaScript (.js) unless strictly required by a specific third-party script.
- **Modern Frameworks:** Utilize a modern frontend stack (e.g., Vite, React, or Next.js) combined with a utility-first CSS framework (like Tailwind CSS) to efficiently build the UI.
- **everything-claude-code:** You are explicitly required to actively use all tools, scripts, and capabilities provided by the **`everything-claude-code`** framework. Maximize your efficiency by utilizing the full spectrum of available commands for file management, code generation, and terminal execution.

## 6. Coding Rules
- Work step-by-step, ensuring a given component works before moving on to the next one.
- If you encounter a problem, note it in `MEMORY.md`, present your diagnosis to me, and ask for permission before implementing a solution.