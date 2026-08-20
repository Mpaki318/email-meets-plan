import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { navItems } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const title = "AI Workplace Productivity Assistant";
const description =
  "Automate everyday workplace tasks: generate emails, summarize meeting notes, and plan prioritized daily or weekly schedules with AI.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

const features = navItems.filter((item) => item.url !== "/");

function Index() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border bg-surface p-6 shadow-card sm:p-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-accent-foreground">
          <Sparkles className="size-3.5" /> Powered by Lovable AI
        </span>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcome back — let's clear your desk
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Your AI workplace assistant drafts the emails, untangles the meeting notes, and turns a
          messy task list into a plan you can actually follow. Pick a tool below to get started.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/email-generator">
              Draft an email <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/task-planner">Plan my day</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight">Quick links</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.url} className="transition-shadow hover:shadow-card">
              <CardHeader>
                <span className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-accent-foreground">
                  <feature.icon className="size-5" />
                </span>
                <CardTitle className="mt-3 text-base">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="px-0 hover:bg-transparent">
                  <Link to={feature.url}>
                    Open <ArrowRight />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="flex gap-3 rounded-xl border bg-surface p-4">
          <Zap className="size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium">Built for busy weeks</p>
            <p className="text-sm text-muted-foreground">
              Every tool takes a rough input and returns something you can edit and use right away.
            </p>
          </div>
        </div>
        <div className="flex gap-3 rounded-xl border bg-surface p-4">
          <ShieldCheck className="size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium">You stay in control</p>
            <p className="text-sm text-muted-foreground">
              Outputs are drafts, not decisions. Review everything before it leaves your inbox.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
