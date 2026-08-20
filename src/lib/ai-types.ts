export type MeetingSummary = {
  summary: string;
  actionItems: { task: string; owner: string; deadline: string }[];
  decisions: string[];
};

export type TaskPlan = {
  overview: string;
  groups: {
    label: string;
    priority: "High" | "Medium" | "Low";
    tasks: { title: string; timeBlock: string; note: string }[];
  }[];
};