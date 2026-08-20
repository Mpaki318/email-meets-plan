# AI Workplace Companion

Build a modern, responsive web application called "AI Workplace Productivity Assistant" that helps professionals automate everyday workplace tasks using AI. Include a dashboard layout with a sidebar navigation containing three sections: 1. Smart Email Generator 2. Meeting Notes Summarizer 3. AI Task Planner Also include an overview/home page with a welcome message and quick links to each feature. === FEATURE 1: Smart Email Generator === Input fields: - Recipient (name or role) - Subject / purpose of the email - Tone selector (Formal, Friendly, Persuasive) - Optional: key points to include (multi-line text box) Output: - An editable text box showing the AI-generated email (subject line + body) - A "Copy to clipboard" button - A "Regenerate" button === FEATURE 2: Meeting Notes Summarizer === Input: - A large text box for pasting raw meeting notes Output, broken into clearly labeled sections: - Summary (2-4 sentences) - Action Items (with owner name if mentioned in the notes, and deadline if mentioned) - Key Decisions Made If no action items or decisions are found, show "None detected" rather than leaving it blank. === FEATURE 3: AI Task Planner === Input: - A text box where the user lists their tasks (one per line, or free text) - A dropdown to choose "Daily" or "Weekly" view Output: - A prioritized, organized schedule (e.g. High/Medium/Low priority, or time-blocked) - Tasks displayed as a checklist the user can mark complete === DESIGN REQUIREMENTS === - Clean, modern, professional SaaS-style design - Mobile-friendly and responsive - Sidebar navigation that collapses on mobile - Light color palette with a single accent color - Loading state shown while AI is generating output - A visible "Responsible AI Disclaimer" in the footer: this tool generates AI-assisted suggestions and outputs should be reviewed by a human before use in real workplace communications. Structure the code cleanly with reusable components for each feature so it's easy to extend later.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://email-meets-plan.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f168b754-12d0-4833-87be-9688ed9e5083).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
