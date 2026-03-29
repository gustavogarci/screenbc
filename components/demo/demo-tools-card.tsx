"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ScreeningStatus } from "@/lib/types";

interface Props {
  patientId: string;
  screeningStatus: ScreeningStatus;
}

export function DemoToolsCard({ patientId, screeningStatus }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleAction(action: "simulate" | "reset") {
    setLoading(action);
    const url =
      action === "simulate"
        ? "/api/admin/simulate-results"
        : "/api/admin/reset";
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId }),
    });
    setLoading(null);
    router.refresh();
  }

  if (screeningStatus === "due") return null;

  return (
    <Card className="border-dashed border-surface-border shadow-sm py-0 gap-0">
      <CardContent className="p-5">
        <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-3">
          Demo Tools
        </h2>
        <div className="space-y-2">
          {screeningStatus === "awaiting-results" && (
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              disabled={loading === "simulate"}
              onClick={() => handleAction("simulate")}
            >
              {loading === "simulate"
                ? "Simulating…"
                : "Simulate lab results"}
            </Button>
          )}
          {(screeningStatus === "results-ready" ||
            screeningStatus === "up-to-date") && (
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              disabled={loading === "reset"}
              onClick={() => handleAction("reset")}
            >
              {loading === "reset" ? "Resetting…" : "Reset demo"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
