"use client";

import { useEffect, useState } from "react";
import { Markdown } from "@/components/ui/markdown";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ResultTier } from "@/lib/types";

interface Props {
  overallTier: ResultTier;
}

const BORDER_COLORS = {
  green: "border-l-status-green",
  yellow: "border-l-bc-link",
  red: "border-l-status-red",
};

export function HealthSummary({ overallTier }: Props) {
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchSummary() {
      try {
        const res = await fetch("/api/screening/interpret", { method: "POST" });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          if (!cancelled) setError(data.error || `HTTP ${res.status}`);
          if (!cancelled) setLoading(false);
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) {
          if (!cancelled) setError("No response stream");
          if (!cancelled) setLoading(false);
          return;
        }

        const decoder = new TextDecoder();
        let text = "";

        if (!cancelled) setLoading(false);

        while (true) {
          const { done, value } = await reader.read();
          if (done || cancelled) break;
          text += decoder.decode(value, { stream: true });
          setSummary(text);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Network error");
          setLoading(false);
        }
      }
    }

    fetchSummary();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className={`bg-white border border-surface-border rounded-md border-l-4 ${BORDER_COLORS[overallTier]} overflow-hidden`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors"
      >
        <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
          Your Personalized Health Summary
        </h3>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-text-secondary" />
        ) : (
          <ChevronDown className="h-4 w-4 text-text-secondary" />
        )}
      </button>

      {expanded && (
        <div className="px-6 pb-5 border-t border-surface-border pt-4">
          {loading && (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
              <div className="h-4 bg-muted rounded w-2/3" />
              <div className="h-3 bg-muted rounded w-1/2 mt-4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-4/5" />
            </div>
          )}

          {summary && <Markdown content={summary} />}

          {error && (
            <div className="rounded-md bg-status-red-bg border border-status-red/20 p-4">
              <p className="text-sm font-medium text-status-red">
                Could not generate your health summary
              </p>
              <p className="text-xs text-text-secondary mt-1">{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
