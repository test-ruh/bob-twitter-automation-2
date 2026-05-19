import { LayoutDashboard, type LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

import OverviewTab from "@/tabs/overview";

/**
 * Top-tab registry for the dashboard.
 *
 * This file is OWNED BY THE AGENT — the agent-dashboard-builder subagent
 * writes / overwrites it after deciding which tabs the operator needs.
 *
 * Convention:
 *   - At least one route. The route with `id: "overview"` is REQUIRED
 *     (the platform tester enforces this).
 *   - Other tab ids are agent-chosen kebab-case strings (e.g. `posts`,
 *     `followers`, `pull-requests`, `runs`, `calendar`). There's no
 *     fixed set — the agent picks what makes sense for its domain.
 *   - Each route's `Component` is imported from `@/tabs/<id>.tsx`,
 *     written by the agent. The component renders into the main content
 *     area; the surrounding chrome (sidebar / header / right-rail) is
 *     platform-managed.
 *
 *   - Icons come from `lucide-react` — pick whatever maps to the tab's
 *     concept. The renderer falls back to `LayoutDashboard` if omitted.
 *
 *   - `defaultRouteId` is the tab that activates on load. Defaults to
 *     "overview" if omitted; must reference an id in `routes`.
 *
 * Example (a hypothetical Instagram-bot dashboard the agent might write):
 *
 *   import { Image, Sparkles, Users } from "lucide-react";
 *   import OverviewTab from "@/tabs/overview";
 *   import PostsTab from "@/tabs/posts";
 *   import CaptionsTab from "@/tabs/captions";
 *   import FollowersTab from "@/tabs/followers";
 *
 *   export const routes: DashboardRoute[] = [
 *     { id: "overview",  label: "Overview",  icon: LayoutDashboard, Component: OverviewTab },
 *     { id: "posts",     label: "Posts",     icon: Image,           Component: PostsTab },
 *     { id: "captions",  label: "Captions",  icon: Sparkles,        Component: CaptionsTab },
 *     { id: "followers", label: "Followers", icon: Users,           Component: FollowersTab }
 *   ];
 *   export const defaultRouteId = "overview";
 */

export type DashboardRoute = {
  /** Kebab-case unique id used in URL hash + as React key. */
  id: string;
  /** Visible label in the top-tabs bar. */
  label: string;
  /** Optional Lucide icon shown next to the label. */
  icon?: LucideIcon;
  /** Tab body. Renders into the main content area when this tab is active. */
  Component: ComponentType;
  /** Optional tooltip text on hover. */
  hint?: string;
};

export const routes: DashboardRoute[] = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    Component: OverviewTab,
    hint: "At-a-glance summary of the agent"
  }
];

export const defaultRouteId = "overview";
