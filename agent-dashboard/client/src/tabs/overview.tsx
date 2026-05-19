import { useQuery } from "@tanstack/react-query";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@ruh-ai/ruh-design-system";
import { AlertTriangle, CalendarClock, CheckCircle2, Clock, ExternalLink, Send } from "lucide-react";

import { apiBaseUrl } from "@/lib/api";
import type { ResultScheduledRun } from "../../../server/schema";

// Stub data — preview fallback + cold-start initial render.
// Reflects what `result_scheduled_run` would look like after a week of daily 10:00 AM IST runs.
const stubScheduledRuns: ResultScheduledRun[] = [
  {
    id: "7f8b5c4d-1001-4a6d-91f1-7a2b5d4c0001",
    run_id: "run_20260519_043000",
    computed_at: "2026-05-19T04:30:42Z",
    scheduled_at: "2026-05-19T04:30:00Z",
    started_at: "2026-05-19T04:30:05Z",
    completed_at: "2026-05-19T04:30:42Z",
    status: "success",
    twitter_post_id: "1792093847561201024",
    error_message: null,
    created_at: "2026-05-19T04:30:42Z",
    updated_at: "2026-05-19T04:30:42Z",
    org_id: "org_preview",
    agent_id: "bob"
  },
  {
    id: "7f8b5c4d-1001-4a6d-91f1-7a2b5d4c0002",
    run_id: "run_20260518_043000",
    computed_at: "2026-05-18T04:30:38Z",
    scheduled_at: "2026-05-18T04:30:00Z",
    started_at: "2026-05-18T04:30:04Z",
    completed_at: "2026-05-18T04:30:38Z",
    status: "success",
    twitter_post_id: "1791731450187714560",
    error_message: null,
    created_at: "2026-05-18T04:30:38Z",
    updated_at: "2026-05-18T04:30:38Z",
    org_id: "org_preview",
    agent_id: "bob"
  },
  {
    id: "7f8b5c4d-1001-4a6d-91f1-7a2b5d4c0003",
    run_id: "run_20260517_043000",
    computed_at: "2026-05-17T04:30:29Z",
    scheduled_at: "2026-05-17T04:30:00Z",
    started_at: "2026-05-17T04:30:03Z",
    completed_at: "2026-05-17T04:30:29Z",
    status: "success",
    twitter_post_id: "1791369065240096768",
    error_message: null,
    created_at: "2026-05-17T04:30:29Z",
    updated_at: "2026-05-17T04:30:29Z",
    org_id: "org_preview",
    agent_id: "bob"
  },
  {
    id: "7f8b5c4d-1001-4a6d-91f1-7a2b5d4c0004",
    run_id: "run_20260516_043000",
    computed_at: "2026-05-16T04:30:17Z",
    scheduled_at: "2026-05-16T04:30:00Z",
    started_at: "2026-05-16T04:30:02Z",
    completed_at: "2026-05-16T04:30:17Z",
    status: "failed",
    twitter_post_id: null,
    error_message: "Twitter/X API rejected the credential. Reconnect the account credential before the next scheduled run.",
    created_at: "2026-05-16T04:30:17Z",
    updated_at: "2026-05-16T04:30:17Z",
    org_id: "org_preview",
    agent_id: "bob"
  },
  {
    id: "7f8b5c4d-1001-4a6d-91f1-7a2b5d4c0005",
    run_id: "run_20260515_043000",
    computed_at: "2026-05-15T04:30:35Z",
    scheduled_at: "2026-05-15T04:30:00Z",
    started_at: "2026-05-15T04:30:04Z",
    completed_at: "2026-05-15T04:30:35Z",
    status: "success",
    twitter_post_id: "1790644283348979712",
    error_message: null,
    created_at: "2026-05-15T04:30:35Z",
    updated_at: "2026-05-15T04:30:35Z",
    org_id: "org_preview",
    agent_id: "bob"
  }
];

async function fetchRecentRuns(): Promise<ResultScheduledRun[]> {
  const response = await fetch(`${apiBaseUrl}/api/runs/recent?limit=20`);
  if (!response.ok) throw new Error(`Failed to load recent runs (${response.status})`);
  const payload = (await response.json()) as { rows: ResultScheduledRun[] };
  return payload.rows;
}

const formatDateTime = (value: string | null): string => {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata"
  }).format(new Date(value));
};

const statusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  const normalized = status.toLowerCase();
  if (normalized === "success" || normalized === "succeeded") return "default";
  if (normalized === "failed" || normalized === "error") return "destructive";
  if (normalized === "running" || normalized === "pending") return "secondary";
  return "outline";
};

export function OverviewTab() {
  const { data = stubScheduledRuns, isFetching, isError } = useQuery<ResultScheduledRun[]>({
    queryKey: ["bob-recent-scheduled-runs"],
    queryFn: fetchRecentRuns,
    placeholderData: stubScheduledRuns,
    enabled: !!apiBaseUrl
  });

  const successes = data.filter((run) => ["success", "succeeded"].includes(run.status.toLowerCase())).length;
  const failures = data.filter((run) => ["failed", "error"].includes(run.status.toLowerCase())).length;
  const latest = data[0];
  const latestPostId = data.find((run) => run.twitter_post_id)?.twitter_post_id ?? "—";

  return (
    <section aria-label="bob reporting overview" className="space-y-5 p-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Send size={16} /> Fixed Twitter/X post: <span className="font-medium text-foreground">Good morning People</span>
        </div>
        <h1 className="m-0 text-2xl font-semibold">Daily posting report</h1>
        <p className="m-0 max-w-3xl text-sm text-muted-foreground">
          bob only reports stored run-log data here: daily schedule, recent outcomes, Twitter/X post IDs, and failure details.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card size="sm">
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><CalendarClock size={16} /> Schedule</CardTitle></CardHeader>
          <CardContent><div className="text-lg font-semibold">10:00 AM IST</div><p className="m-0 text-xs text-muted-foreground">Every day · 30 4 * * * UTC</p></CardContent>
        </Card>
        <Card size="sm">
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Clock size={16} /> Latest run</CardTitle></CardHeader>
          <CardContent><div className="text-lg font-semibold">{formatDateTime(latest?.scheduled_at ?? null)}</div><p className="m-0 text-xs text-muted-foreground">{isFetching ? "Refreshing stored runs…" : "From result_scheduled_run"}</p></CardContent>
        </Card>
        <Card size="sm">
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} /> Successes</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-semibold">{successes}</div><p className="m-0 text-xs text-muted-foreground">In the recent run log</p></CardContent>
        </Card>
        <Card size="sm">
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><AlertTriangle size={16} /> Failures</CardTitle></CardHeader>
          <CardContent><div className="text-3xl font-semibold">{failures}</div><p className="m-0 text-xs text-muted-foreground">Credential/API/rate-limit errors appear below</p></CardContent>
        </Card>
      </div>

      <Card size="sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-base">
            <span>Recent scheduled runs</span>
            <Badge variant="outline">Latest post ID: {latestPostId}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isError ? <p className="text-sm text-destructive">Could not load live run-log rows; showing preview data.</p> : null}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Scheduled time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Twitter/X post ID</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Failure details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((run) => (
                <TableRow key={run.id}>
                  <TableCell className="font-medium">{formatDateTime(run.scheduled_at)}</TableCell>
                  <TableCell><Badge variant={statusVariant(run.status)}>{run.status}</Badge></TableCell>
                  <TableCell>
                    {run.twitter_post_id ? <span className="inline-flex items-center gap-1 font-mono text-xs"><ExternalLink size={13} />{run.twitter_post_id}</span> : "—"}
                  </TableCell>
                  <TableCell>{formatDateTime(run.completed_at)}</TableCell>
                  <TableCell className="max-w-md text-muted-foreground">{run.error_message ?? "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}

export default OverviewTab;
