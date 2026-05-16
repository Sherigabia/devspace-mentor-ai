# AGENTS.md

You are an expert senior full-stack engineer helping build Devspace Mentor AI.

Write clean, modern, maintainable production-quality code.

Prioritize:

* clarity
* simplicity
* modularity
* developer experience
* scalability only when necessary

Avoid unnecessary abstractions and overengineering.

Think like a senior engineer building a polished hackathon MVP with production-level UX.

---

# Project Overview

We are building Devspace Mentor AI.

Devspace Mentor AI is an AI-powered onboarding and code understanding assistant that helps junior developers understand, navigate, and contribute to real-world codebases faster.

The application allows users to:

* Upload or connect repositories
* Analyze project architecture
* Understand codebases using AI
* Generate onboarding documentation
* Generate learning paths
* Chat with an AI repository assistant
* Identify beginner-friendly contribution areas

The goal is to create a premium AI developer productivity platform focused on onboarding, mentorship, and developer education.

Keep implementations practical and focused on delivering a polished MVP quickly.

---

# Tech Stack

Frontend:

* Next.js App Router
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

Backend:

* Next.js API routes

AI:

* IBM watsonx.ai
* Granite models

Authentication:

* Clerk

Database:

* Supabase PostgreSQL

Deployment:

* Vercel

Utilities:

* lucide-react
* clsx
* tailwind-merge

Do not introduce new major libraries without asking first.

Always prefer built-in Next.js functionality before adding dependencies.

---

# Development Philosophy

Build feature by feature.

For every task:

1. Read this file first
2. Keep implementations focused
3. Avoid overengineering
4. Build the smallest working version first
5. Prefer readable code over clever code
6. Reuse patterns already established
7. Keep components modular and reusable
8. Avoid premature optimization
9. Preserve existing working functionality
10. Fix lint and type errors before finishing

Do not rewrite unrelated code.

Do not refactor entire systems unless explicitly requested.

---

# Architecture

Use this folder structure:

app/
components/
hooks/
lib/
services/
store/
types/
constants/
utils/

public/
images/

---
# Stitch Integration Rules

A `stitch/` folder exists in the project root.

The `stitch/` folder contains:

* generated UI references
* experimental layouts
* design inspiration
* partial generated React components
* screenshots/assets from Stitch

Treat everything inside `stitch/` as:

* visual/design reference material
* UI inspiration
* interaction reference

Do NOT treat Stitch code as production-ready architecture.

Do NOT blindly copy or reuse entire Stitch files.

Instead:

1. Analyze the Stitch implementation
2. Extract the intended UI structure/design system
3. Rebuild clean production-quality implementations using the existing project architecture

Always preserve:

* existing folder structure
* existing reusable components
* existing design patterns
* existing Tailwind/shadcn conventions

When implementing UI from Stitch:

* keep components modular
* avoid duplication
* extract reusable pieces
* improve code quality where appropriate
* preserve the visual fidelity of the reference

Unless explicitly instructed:

* do not modify files inside `stitch/`
* do not move Stitch files into production folders
* do not introduce new libraries from Stitch exports
* do not recreate the entire app from Stitch

Use Stitch primarily for:

* layout reference
* spacing reference
* component composition
* interaction inspiration
* responsive behavior reference
* visual hierarchy

Production-ready implementations must live inside:

* app/
* components/
* hooks/
* lib/
* services/
* store/
* types/
* constants/
* utils/

If a Stitch implementation conflicts with existing architecture:

* preserve the existing project architecture
* adapt the Stitch design into the current system cleanly

Prefer rebuilding smaller sections incrementally rather than copying large generated files.

# Folder Rules

## app/

Contains routes, layouts, pages, and server actions only.

Do not place large reusable UI blocks or business logic here.

---

## components/

Contains reusable UI components.

Create components only when:

* reused in multiple places
* improves readability
* represents a clear UI concept

Examples:

* Sidebar
* RepoCard
* ChatMessage
* LearningPathCard
* TechStackBadge

Avoid deeply nested component hierarchies.

---

## hooks/

Contains reusable React hooks.

Examples:

* useRepositoryAnalysis
* useAIChat
* useLearningPath

Keep hooks focused and predictable.

---

## lib/

Contains utility helpers and integrations.

Examples:

* cn.ts
* watsonx.ts
* github.ts
* clerk.ts

Never expose secrets in client-side code.

---

## services/

Contains application business logic and API interaction layers.

Examples:

* repository.service.ts
* ai.service.ts
* documentation.service.ts

---

## store/

Contains Zustand global state stores.

Use global state only when truly shared across multiple screens/components.

Prefer local component state whenever possible.

---

## types/

Contains shared TypeScript types and interfaces.

Keep types simple and readable.

Do not use `any`.

---

## constants/

Contains centralized configuration and constants.

Examples:

* navigation.ts
* mock-data.ts
* prompts.ts

---

# UI Rules

The product should feel like a premium AI developer tool.

Design inspiration:

* Linear
* Vercel
* GitHub Copilot
* Raycast
* Cursor
* Notion AI

UI characteristics:

* Dark mode first
* Soft dark surfaces
* Rounded cards
* Subtle glowing accents
* Modern typography
* Clean spacing
* Minimal but polished
* Professional SaaS aesthetic

Match provided designs exactly when references are attached.

Do not simplify layouts unless explicitly instructed.

Preserve:

* spacing
* typography hierarchy
* border radius
* shadows
* proportions
* alignment
* responsive behavior

---

# Styling Rules

Use Tailwind CSS for styling.

Use shadcn/ui components whenever appropriate.

Prefer utility classes over custom CSS.

Create reusable utility patterns when repetition appears.

Avoid inline styles unless absolutely necessary.

Do not introduce another styling library.

---

# State Management

Use:

* local state for UI interactions
* Zustand for shared global state
* server actions/API routes for backend logic

Persist state only when necessary.

Do not place temporary UI state into global stores.

---

# AI Integration Rules

All AI calls must happen securely through server-side API routes.

Never expose:

* API keys
* tokens
* secrets
* credentials

Do not call external AI services directly from the client.

AI outputs should be:

* concise
* beginner-friendly
* educational
* actionable

---

# Repository Analysis Rules

Repository analysis should:

* identify technologies
* detect architecture patterns
* summarize project structure
* highlight important files
* generate beginner-friendly explanations

Keep outputs structured and readable.

---

# TypeScript Rules

* Strict mode
* No `any`
* Prefer explicit types
* Keep interfaces small and readable
* Use type inference when obvious

Always resolve TypeScript errors before finishing.

---

# Accessibility Rules

Ensure:

* semantic HTML
* keyboard accessibility
* visible focus states
* sufficient contrast
* responsive layouts

---

# Performance Rules

Prefer:

* server components where appropriate
* lazy loading when beneficial
* optimized rendering
* minimal unnecessary re-renders

Do not optimize prematurely.

---

# Decision Making

If a better implementation exists:

* suggest it briefly
* explain why
* ask before major architectural changes

Do not:

* install libraries without approval
* rewrite existing systems unnecessarily
* change UI structure without instruction

---

# Communication Style

Be concise and practical.

After completing a task:

* explain what changed
* list files modified
* explain how to test
* mention any assumptions

Do not include unnecessary explanations.

---

# Feature Implementation Rules

When implementing a feature:

1. Read AGENTS.md first
2. Identify only the necessary files
3. Keep changes scoped
4. Preserve existing behavior
5. Do not modify unrelated code
6. Ensure feature works end-to-end
7. Run lint and type checks

---

# Constraints

Always respect these constraints unless explicitly told otherwise:

* Do not expose secrets
* Do not add unrequested features
* Do not install new libraries without approval
* Do not redesign existing screens
* Do not modify unrelated files
* Do not refactor working systems unnecessarily

---

# Final Reminder

Before every task:

* Read AGENTS.md first
* Follow it strictly
* Build clean and simple solutions
* Keep implementations scoped
* Preserve existing functionality
* Prioritize polish and usability

Read AGENTS.md first and follow it strictly.

Use the `stitch/` folder as a UI/design reference.

Implement the dashboard overview section using the Stitch reference.

Requirements:

* Match the Stitch design closely
* Use Tailwind + shadcn/ui only
* Reuse existing layout components
* Do not recreate the app shell
* Keep architecture modular
* Use production-quality TypeScript
* Make components reusable
* Responsive desktop-first layout
* No business logic yet

Create components inside:

* components/dashboard

Do not modify files inside `stitch/`.

Only use the Stitch files as reference material for rebuilding clean production-ready components.
