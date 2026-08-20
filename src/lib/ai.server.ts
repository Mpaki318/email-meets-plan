import { generateText } from "ai";
import { z } from "zod";

import { AI_MODEL, getGateway } from "./ai-gateway.server";
import type { MeetingSummary, TaskPlan } from "./ai-types";

const gatewayModel = () => getGateway()(AI_MODEL);

async function generateJson<T>(system: string, prompt: string, schema: z.ZodType<T>): Promise<T> {
  const { text } = await generateText({
    model: gatewayModel(),
    system: `${system}\n\nRespond with valid JSON only. No markdown fences, no commentary.`,
    prompt,
  });

  const raw = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("The AI response could not be read. Try again.");
  return schema.parse(JSON.parse(raw.slice(start, end + 1)));
}

export async function generateEmailDraft(input: {
  recipient: string;
  subject: string;
  tone: string;
  keyPoints?: string | undefined;
}) {
  const { text } = await generateText({
    model: gatewayModel(),
    system:
      "You are a professional workplace writing assistant. Write clear, concise business emails. Output plain text starting with a line 'Subject: <subject line>' then a blank line then the email body. No markdown, no commentary.",
    prompt: [
      `Recipient: ${input.recipient}`,
      `Purpose / subject: ${input.subject}`,
      `Tone: ${input.tone}`,
      input.keyPoints?.trim() ? `Key points to include:\n${input.keyPoints}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return { email: text.trim() };
}

const summarySchema = z.object({
  summary: z.string().default(""),
  actionItems: z
    .array(
      z.object({
        task: z.string().default(""),
        owner: z.string().default(""),
        deadline: z.string().default(""),
      }),
    )
    .default([]),
  decisions: z.array(z.string()).default([]),
});

export async function summarizeNotes(notes: string): Promise<MeetingSummary> {
  return generateJson(
    `You summarize workplace meeting notes. Return JSON shaped exactly like:
{"summary": "2-4 sentences", "actionItems": [{"task": "", "owner": "", "deadline": ""}], "decisions": [""]}
Include an owner or deadline only if it is mentioned in the notes; otherwise use an empty string. Use empty arrays when there are no action items or decisions. Never invent facts.`,
    notes,
    summarySchema,
  );
}

const planSchema = z.object({
  overview: z.string().default(""),
  groups: z
    .array(
      z.object({
        label: z.string().default(""),
        priority: z.enum(["High", "Medium", "Low"]).catch("Medium"),
        tasks: z
          .array(
            z.object({
              title: z.string().default(""),
              timeBlock: z.string().default(""),
              note: z.string().default(""),
            }),
          )
          .default([]),
      }),
    )
    .default([]),
});

export async function planTasks(tasks: string, view: "Daily" | "Weekly"): Promise<TaskPlan> {
  return generateJson(
    `You are a productivity planner. Organize the user's tasks into a prioritized ${view.toLowerCase()} schedule.
Return JSON shaped exactly like:
{"overview": "1-2 sentences", "groups": [{"label": "", "priority": "High|Medium|Low", "tasks": [{"title": "", "timeBlock": "", "note": ""}]}]}
Group tasks by priority: High, Medium, Low. ${
      view === "Daily"
        ? 'For a daily plan, give each task a suggested time block such as "09:00 - 10:00".'
        : 'For a weekly plan, put the suggested day in timeBlock such as "Monday morning".'
    } Keep notes short and actionable. Use an empty string when a field does not apply.`,
    tasks,
    planSchema,
  );
}
