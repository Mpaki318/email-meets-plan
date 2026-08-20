import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { generateEmailDraft, summarizeNotes, planTasks } from "./ai.server";

export const EmailInput = z.object({
  recipient: z.string().min(1),
  subject: z.string().min(1),
  tone: z.enum(["Formal", "Friendly", "Persuasive"]),
  keyPoints: z.string().optional(),
});

export const NotesInput = z.object({ notes: z.string().min(1) });

export const PlannerInput = z.object({
  tasks: z.string().min(1),
  view: z.enum(["Daily", "Weekly"]),
});

export const generateEmail = createServerFn({ method: "POST" })
  .validator((input: unknown) => EmailInput.parse(input))
  .handler(async ({ data }) => generateEmailDraft(data));

export const summarizeMeetingNotes = createServerFn({ method: "POST" })
  .validator((input: unknown) => NotesInput.parse(input))
  .handler(async ({ data }) => summarizeNotes(data.notes));

export const generateTaskPlan = createServerFn({ method: "POST" })
  .validator((input: unknown) => PlannerInput.parse(input))
  .handler(async ({ data }) => planTasks(data.tasks, data.view));