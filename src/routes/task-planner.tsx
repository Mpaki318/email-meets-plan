import { createFileRoute } from "@tanstack/react-router";

import { TaskPlanner } from "@/components/features/task-planner";
import { PageHeader } from "@/components/page-header";

const title = "AI Task Planner — AI Workplace Productivity Assistant";
const description =
  "List your tasks and get a prioritized daily or weekly schedule with time blocks and a checklist you can tick off.";

export const Route = createFileRoute("/task-planner")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <>
      <PageHeader
        title="AI Task Planner"
        description="Drop in your task list and get it prioritized and time-blocked for the day or the week."
      />
      <TaskPlanner />
    </>
  );
}