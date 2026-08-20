import { createFileRoute } from "@tanstack/react-router";

import { EmailGenerator } from "@/components/features/email-generator";
import { PageHeader } from "@/components/page-header";

const title = "Smart Email Generator — AI Workplace Productivity Assistant";
const description =
  "Draft professional workplace emails in a formal, friendly, or persuasive tone, then edit and copy them in seconds.";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <>
      <PageHeader
        title="Smart Email Generator"
        description="Describe the recipient and purpose, pick a tone, and get an editable draft ready to send."
      />
      <EmailGenerator />
    </>
  );
}