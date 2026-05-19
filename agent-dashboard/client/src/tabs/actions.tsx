import { Card, CardContent, CardHeader, CardTitle } from "@ruh-ai/ruh-design-system";
import { Lock, ShieldCheck } from "lucide-react";

export function ActionsTab() {
  return (
    <section aria-label="Reporting-only mode" className="space-y-4 p-6">
      <Card size="sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldCheck size={18} /> Reporting-only dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p className="m-0">
            bob publishes only from its daily 10:00 AM IST schedule. This dashboard does not provide manual posting controls.
          </p>
          <div className="flex items-start gap-3 rounded-md border border-border bg-muted/30 p-3">
            <Lock size={16} className="mt-0.5 text-foreground" />
            <p className="m-0">
              Use the Overview page to inspect stored runs, successes, failures, and Twitter/X post IDs from the run log.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default ActionsTab;
