import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, ListChecks, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { summarizeMeetingNotes } from "@/lib/ai.functions";
import type { MeetingSummary } from "@/lib/ai-types";

function EmptyState() {
  return <p className="text-sm italic text-muted-foreground">None detected</p>;
}

export function NotesSummarizer() {
  const run = useServerFn(summarizeMeetingNotes);
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<MeetingSummary | null>(null);
  const [loading, setLoading] = useState(false);

  async function summarize() {
    if (!notes.trim() || loading) return;
    setLoading(true);
    try {
      setResult(await run({ data: { notes } }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not summarize these notes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Raw meeting notes</CardTitle>
          <CardDescription>Paste your notes, transcript, or bullet points.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            rows={18}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste meeting notes here…"
          />
          <Button onClick={summarize} disabled={!notes.trim() || loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Summarizing…
              </>
            ) : (
              <>
                <Sparkles /> Summarize notes
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {loading && !result ? (
          <Card>
            <CardContent className="flex h-64 flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="size-5 animate-spin text-primary" />
              Reading your notes…
            </CardContent>
          </Card>
        ) : !result ? (
          <Card>
            <CardContent className="flex h-64 items-center justify-center text-center text-sm text-muted-foreground">
              Your summary, action items, and decisions will appear here.
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{result.summary || "None detected"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ListChecks className="size-4 text-primary" /> Action items
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result.actionItems.length === 0 ? (
                  <EmptyState />
                ) : (
                  <ul className="space-y-3">
                    {result.actionItems.map((item, i) => (
                      <li key={i} className="rounded-md border bg-surface p-3">
                        <p className="text-sm font-medium">{item.task}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="secondary" className="gap-1">
                            <User className="size-3" />
                            {item.owner?.trim() || "Owner not specified"}
                          </Badge>
                          <Badge variant="outline">
                            {item.deadline?.trim() || "No deadline mentioned"}
                          </Badge>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CheckCircle2 className="size-4 text-primary" /> Key decisions made
                </CardTitle>
              </CardHeader>
              <CardContent>
                {result.decisions.length === 0 ? (
                  <EmptyState />
                ) : (
                  <ul className="list-inside list-disc space-y-2 text-sm">
                    {result.decisions.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}