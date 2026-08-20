import { createFileRoute } from "@tanstack/react-router";

import { NotesSummarizer } from "@/components/features/notes-summarizer";
import { PageHeader } from "@/components/page-header";

const title = "Meeting Notes Summarizer — AI Workplace Productivity Assistant";
const description =
  "Paste raw meeting notes and get a short summary, owner-tagged action items with deadlines, and the key decisions made.";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <>
      <PageHeader
        title="Meeting Notes Summarizer"
        description="Turn messy notes into a clean summary, action items, and decisions your team can act on."
      />
      <NotesSummarizer />
    </>
  );
}