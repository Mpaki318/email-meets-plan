import { useServerFn } from "@tanstack/react-start";
import { Clock, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateTaskPlan } from "@/lib/ai.functions";
import type { TaskPlan } from "@/lib/ai-types";

type View = "Daily" | "Weekly";

const priorityStyles: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-accent text-accent-foreground",
  Low: "bg-secondary text-secondary-foreground",
};

export function TaskPlanner() {
  const run = useServerFn(generateTaskPlan);
  const [tasks, setTasks] = useState("");
  const [view, setView] = useState<View>("Daily");
  const [plan, setPlan] = useState<TaskPlan | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!tasks.trim() || loading) return;
    setLoading(true);
    try {
      setPlan(await run({ data: { tasks, view } }));
      setDone({});
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not build your plan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Your tasks</CardTitle>
          <CardDescription>One per line, or just describe your workload.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            rows={12}
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
            placeholder={"Finish client proposal\nPrep board slides\nReview two pull requests"}
          />
          <div className="space-y-2">
            <Label htmlFor="view">Planning view</Label>
            <Select value={view} onValueChange={(v) => setView(v as View)}>
              <SelectTrigger id="view">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={generate} disabled={!tasks.trim() || loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Planning…
              </>
            ) : (
              <>
                <Sparkles /> Build my {view.toLowerCase()} plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {loading && !plan ? (
          <Card>
            <CardContent className="flex h-64 flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="size-5 animate-spin text-primary" />
              Prioritizing your tasks…
            </CardContent>
          </Card>
        ) : !plan ? (
          <Card>
            <CardContent className="flex h-64 items-center justify-center text-center text-sm text-muted-foreground">
              Your prioritized schedule will appear here.
            </CardContent>
          </Card>
        ) : (
          <>
            {plan.overview ? (
              <p className="rounded-lg border bg-brand-soft p-4 text-sm text-accent-foreground">
                {plan.overview}
              </p>
            ) : null}
            {plan.groups.map((group, gi) => (
              <Card key={gi}>
                <CardHeader className="flex flex-row items-center justify-between gap-3">
                  <CardTitle className="text-base">{group.label}</CardTitle>
                  <Badge className={priorityStyles[group.priority] ?? ""} variant="secondary">
                    {group.priority} priority
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  {group.tasks.map((task, ti) => {
                    const id = `${gi}-${ti}`;
                    const checked = !!done[id];
                    return (
                      <div
                        key={id}
                        className="flex items-start gap-3 rounded-md border bg-surface p-3"
                      >
                        <Checkbox
                          id={id}
                          checked={checked}
                          onCheckedChange={(v) => setDone((d) => ({ ...d, [id]: v === true }))}
                          className="mt-0.5"
                        />
                        <div className="min-w-0 flex-1">
                          <Label
                            htmlFor={id}
                            className={
                              checked
                                ? "text-sm line-through text-muted-foreground"
                                : "text-sm font-medium"
                            }
                          >
                            {task.title}
                          </Label>
                          {task.note?.trim() ? (
                            <p className="mt-1 text-xs text-muted-foreground">{task.note}</p>
                          ) : null}
                        </div>
                        {task.timeBlock?.trim() ? (
                          <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="size-3" />
                            {task.timeBlock}
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
}