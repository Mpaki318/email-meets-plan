import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarCheck, LayoutDashboard, Mail, NotebookPen, Sparkles } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const navItems = [
  {
    title: "Overview",
    url: "/",
    icon: LayoutDashboard,
    description: "Your assistant at a glance",
  },
  {
    title: "Smart Email Generator",
    url: "/email-generator",
    icon: Mail,
    description: "Draft polished emails in any tone",
  },
  {
    title: "Meeting Notes Summarizer",
    url: "/meeting-notes",
    icon: NotebookPen,
    description: "Turn raw notes into decisions and actions",
  },
  {
    title: "AI Task Planner",
    url: "/task-planner",
    icon: CalendarCheck,
    description: "Prioritize your day or week",
  },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-1 py-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold leading-tight">Workplace AI</p>
            <p className="truncate text-xs text-muted-foreground">Productivity Assistant</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}