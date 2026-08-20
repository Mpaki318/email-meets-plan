# Email Meets Plan — AI Workplace Productivity Assistant

**Project slug:** `email-meets-plan`

A modern, responsive web application that helps professionals automate everyday workplace tasks using AI. Built with [TanStack Start](https://tanstack.com/start), [React 19](https://react.dev), [TypeScript](https://www.typescriptlang.org), and [Tailwind CSS v4](https://tailwindcss.com).

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

### 1. Smart Email Generator
Generate polished, context-aware emails in seconds.

- **Recipient** input (name or role)
- **Subject / purpose** field
- **Tone selector**: Formal, Friendly, or Persuasive
- **Key points** textarea for must-include details
- **Editable AI output** with one-click copy and regenerate

### 2. Meeting Notes Summarizer
Turn raw meeting notes into structured, actionable insights.

- Paste notes and receive a concise **summary**
- Extracted **action items** with owner and deadline detection
- **Key decisions made** clearly listed
- Graceful "None detected" messaging when no actions or decisions are found

### 3. AI Task Planner
Transform a loose list of tasks into a prioritized schedule.

- Free-text or one-task-per-line input
- **Daily** or **Weekly** view selector
- Organized, prioritized task groups
- Interactive checklists to mark tasks complete

## Design

- Clean, professional SaaS-style dashboard
- Light color palette with a teal/blue accent
- Collapsible sidebar for mobile and desktop
- Loading states for all AI operations
- **Responsible AI Disclaimer** in the footer: outputs are AI-assisted suggestions and should be reviewed by a human before real-world use

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start v1 |
| UI | React 19, shadcn/ui |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| AI | Lovable AI Gateway (Google Gemini 2.5 Flash) |
| Routing | TanStack Router (file-based) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (LTS recommended)
- [Bun](https://bun.sh) or npm
- A `LOVABLE_API_KEY` environment variable for AI features

### Install

```bash
bun install
```

### Run Development Server

```bash
bun run dev
```

The app will be available at `http://localhost:8080`.

### Build for Production

```bash
bun run build
```

## Environment Variables

Create a `.env` file in the project root:

```env
LOVABLE_API_KEY=your_lovable_api_key_here
```

The `LOVABLE_API_KEY` is required for the AI-powered features (email generation, notes summarization, and task planning).

## Project Structure

```text
src/
├── components/
│   ├── app-sidebar.tsx          # Collapsible navigation sidebar
│   ├── features/
│   │   ├── email-generator.tsx  # Smart Email Generator UI
│   │   ├── notes-summarizer.tsx # Meeting Notes Summarizer UI
│   │   └── task-planner.tsx     # AI Task Planner UI
│   └── page-header.tsx          # Reusable page header
├── lib/
│   ├── ai-gateway.server.ts     # Lovable AI Gateway provider config
│   ├── ai-types.ts              # Shared AI output types
│   ├── ai.server.ts             # AI prompting and JSON parsing logic
│   └── ai.functions.ts          # TanStack Start server functions
├── routes/
│   ├── __root.tsx               # Root layout with sidebar and footer
│   ├── index.tsx                # Overview / home dashboard
│   ├── email-generator.tsx      # /email-generator route
│   ├── meeting-notes.tsx        # /meeting-notes route
│   └── task-planner.tsx         # /task-planner route
├── router.tsx                   # TanStack Router setup
├── server.ts                    # Server entry
├── start.ts                     # Start config
└── styles.css                   # Global styles and theme tokens
```

## Customization

- **Accent color**: update CSS variables in `src/styles.css`.
- **AI model**: change `AI_MODEL` in `src/lib/ai-gateway.server.ts`.
- **Prompts**: edit the system prompts in `src/lib/ai.server.ts`.
- **Routes**: add new pages under `src/routes/` using TanStack Router file conventions.

## Responsible AI

This tool generates AI-assisted suggestions. All outputs should be reviewed by a human before being used in real workplace communications or decisions.

## License

MIT
