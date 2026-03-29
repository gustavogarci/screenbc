"use client";

import type { LabResults } from "@/lib/types";
import { getTierLabel, getTestExplanation } from "@/lib/screening-logic";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface Props {
  results: LabResults;
}

const TEST_CONFIG = [
  { key: "hba1c" as const, name: "HbA1c", reference: "< 6.0% normal" },
  {
    key: "fastingGlucose" as const,
    name: "Fasting Glucose",
    reference: "< 6.1 mmol/L normal",
  },
  {
    key: "totalCholesterol" as const,
    name: "Total Cholesterol",
    reference: "< 5.2 mmol/L desirable",
  },
  {
    key: "ldlCholesterol" as const,
    name: "LDL Cholesterol",
    reference: "< 3.5 mmol/L desirable",
  },
  {
    key: "hdlCholesterol" as const,
    name: "HDL Cholesterol",
    reference: "> 1.0 mmol/L desirable",
  },
];

const TIER_STYLES = {
  green: "bg-status-green text-white",
  yellow: "bg-status-yellow text-text-primary",
  red: "bg-status-red text-white",
};

export function ResultsTable({ results }: Props) {
  return (
    <div className="bg-white border border-surface-border rounded-md overflow-hidden">
      <div className="grid md:hidden lg:grid grid-cols-[1fr_120px_130px_160px] gap-4 px-5 py-3 bg-muted text-xs font-semibold text-text-secondary uppercase tracking-wide border-b border-surface-border">
        <span>Test</span>
        <span>Your Result</span>
        <span>Status</span>
        <span>Reference</span>
      </div>

      <Accordion multiple className="divide-y divide-surface-border">
        {TEST_CONFIG.map(({ key, name, reference }) => {
          const result = results[key];
          const tierLabel = getTierLabel(result.tier);
          const explanation = getTestExplanation(
            key,
            result.value,
            result.unit,
            result.tier
          );

          return (
            <AccordionItem key={key} value={key} className="border-0">
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/50">
                {/* Wide & narrow: 4-column row (below md, and lg+) */}
                <div className="grid md:hidden lg:grid grid-cols-[1fr_120px_130px_160px] gap-4 items-center w-full text-left mr-2">
                  <span className="text-sm font-medium text-text-primary">
                    {name}
                  </span>
                  <span className="text-sm font-mono text-text-primary">
                    {result.value} {result.unit}
                  </span>
                  <span>
                    <Badge className={`${TIER_STYLES[result.tier]} text-xs font-medium`}>
                      {result.tier === "yellow" && "\u26A0\uFE0F "}
                      {result.tier === "green" && "\u2705 "}
                      {result.tier === "red" && "\u26A0\uFE0F "}
                      {tierLabel}
                    </Badge>
                  </span>
                  <span className="text-xs text-text-secondary">{reference}</span>
                </div>
                {/* Medium: compact 2-line layout (md to lg, when in narrow left column) */}
                <div className="hidden md:block lg:hidden w-full text-left mr-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text-primary">
                      {name}
                    </span>
                    <Badge className={`${TIER_STYLES[result.tier]} text-xs font-medium`}>
                      {result.tier === "yellow" && "\u26A0\uFE0F "}
                      {result.tier === "green" && "\u2705 "}
                      {result.tier === "red" && "\u26A0\uFE0F "}
                      {tierLabel}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-text-primary">
                      {result.value} {result.unit}
                    </span>
                    <span className="text-xs text-text-secondary">{reference}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4">
                <p className="text-sm text-text-secondary leading-relaxed">
                  {explanation}
                </p>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
