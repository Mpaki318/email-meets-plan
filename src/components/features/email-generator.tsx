import { useServerFn } from "@tanstack/react-start";
import { Copy, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { generateEmail } from "@/lib/ai.functions";

type Tone = "Formal" | "Friendly" | "Persuasive";

export function EmailGenerator() {
  const run = useServerFn(generateEmail);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [keyPoints, setKeyPoints] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = recipient.trim() && subject.trim() && !loading;

  async function generate() {
    if (!canSubmit) return;
    setLoading(true);
    try {
      const result = await run({
        data: { recipient, subject, tone, keyPoints },
      });
      setDraft(result.email);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not generate the email.");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Clipboard is unavailable in this browser.");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Email details</CardTitle>
          <CardDescription>Tell the assistant who you're writing to and why.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient (name or role)</Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Sarah, Head of Operations"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject / purpose</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Request an extension on the Q3 report"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
              <SelectTrigger id="tone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Formal">Formal</SelectItem>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Persuasive">Persuasive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="points">Key points to include (optional)</Label>
            <Textarea
              id="points"
              rows={5}
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              placeholder={"- New deadline: 12 September\n- Blocked on finance sign-off"}
            />
          </div>
          <Button onClick={generate} disabled={!canSubmit} className="w-full">
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles /> Generate email
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Draft</CardTitle>
          <CardDescription>Edit freely before sending.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading && !draft ? (
            <div className="flex h-72 flex-col items-center justify-center gap-3 rounded-md border border-dashed text-sm text-muted-foreground">
              <Loader2 className="size-5 animate-spin text-primary" />
              Writing your email…
            </div>
          ) : (
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={16}
              placeholder="Your generated email will appear here."
              className="font-mono text-sm"
            />
          )}
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={copy} disabled={!draft}>
              <Copy /> Copy to clipboard
            </Button>
            <Button variant="outline" onClick={generate} disabled={!canSubmit || !draft}>
              <RefreshCw /> Regenerate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}