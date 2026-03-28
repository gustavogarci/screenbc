"use client";

import type { ResultTier, UPCCLocation } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface Props {
  overallTier: ResultTier;
  upccLocations: UPCCLocation[];
  postalCode: string;
  nextScreeningMonths: number;
}

export function NextSteps({
  overallTier,
  upccLocations,
  postalCode,
  nextScreeningMonths,
}: Props) {
  const nextDate = new Date();
  nextDate.setMonth(nextDate.getMonth() + nextScreeningMonths);
  const formattedDate = nextDate.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
  });

  if (overallTier === "green") {
    return (
      <div className="bg-status-green-bg border border-status-green/20 rounded-md p-6">
        <h3 className="font-semibold text-text-primary text-sm">
          You&rsquo;re Up to Date
        </h3>
        <p className="text-sm text-text-secondary mt-2">
          All your results are normal. Next screening recommended:{" "}
          <strong>{formattedDate}</strong>. We&rsquo;ll send you a reminder when
          it&rsquo;s time.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 border-status-green/30"
          onClick={() => window.print()}
        >
          <Printer className="h-4 w-4 mr-1" />
          Print This Summary
        </Button>
      </div>
    );
  }

  if (overallTier === "yellow") {
    return (
      <div className="bg-status-yellow-bg border border-status-yellow/30 rounded-md p-6">
        <h3 className="font-semibold text-text-primary text-sm">
          What to Do Next
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-text-secondary">
          <li className="flex gap-2">
            <span className="text-status-yellow">&#x2022;</span>
            Your results suggest early risk that lifestyle changes can address
          </li>
          <li className="flex gap-2">
            <span className="text-status-yellow">&#x2022;</span>
            Review the resources linked in your summary above
          </li>
          <li className="flex gap-2">
            <span className="text-status-yellow">&#x2022;</span>
            Consider booking at a walk-in clinic to discuss (not urgent)
          </li>
          <li className="flex gap-2">
            <span className="text-status-yellow">&#x2022;</span>
            Your next screening is recommended in {nextScreeningMonths} months (
            {formattedDate}). We&rsquo;ll send you an email reminder when it&rsquo;s time
          </li>
        </ul>

        <div className="mt-5 pt-4 border-t border-status-yellow/20">
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">
            Helpful Resources
          </h4>
          <ul className="space-y-1.5 text-sm">
            <li>
              <a
                href="https://diabetes.ca/about-diabetes/prediabetes-1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bc-link hover:underline"
              >
                Diabetes Canada: Understanding Prediabetes &rarr;
              </a>
            </li>
            <li>
              <a
                href="https://heartandstroke.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bc-link hover:underline"
              >
                Heart &amp; Stroke Foundation: Healthy Eating &rarr;
              </a>
            </li>
            <li>
              <a
                href="https://healthlinkbc.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bc-link hover:underline"
              >
                HealthLink BC: 8-1-1 &rarr;
              </a>
            </li>
          </ul>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-4 border-status-yellow/30"
          onClick={() => window.print()}
        >
          <Printer className="h-4 w-4 mr-1" />
          Print This Summary
        </Button>
      </div>
    );
  }

  // RED
  const city = postalCode.startsWith("V2S")
    ? "Abbotsford, BC"
    : postalCode.startsWith("V8N") || postalCode.startsWith("V9A")
      ? "Victoria, BC"
      : "BC";

  return (
    <div className="bg-status-red-bg border border-status-red/20 rounded-md p-6">
      <h3 className="font-semibold text-text-primary text-sm">
        Important: Follow-Up Recommended
      </h3>
      <p className="text-sm text-text-secondary mt-2">
        Some of your results need medical attention. Book an appointment at your
        nearest UPCC or walk-in clinic. Bring this summary with you.
      </p>

      {upccLocations.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">
            Care Options Near You ({city} &mdash; {postalCode.slice(0, 3)})
          </h4>
          <ol className="space-y-2">
            {upccLocations.map((loc, i) => (
              <li key={i} className="text-sm text-text-primary">
                <span className="font-medium">
                  {i + 1}. {loc.name}
                </span>{" "}
                | {loc.address} |{" "}
                <span className="font-mono text-xs">{loc.phone}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-4 space-y-1.5 text-sm">
        <a
          href="https://healthlinkbc.ca/primary-care/service-type/urgent-and-primary-care-centres"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-bc-link hover:underline"
        >
          Find more locations: healthlinkbc.ca &rarr;
        </a>
        <p className="text-text-secondary">
          Or call <strong>8-1-1</strong> to speak with a nurse
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="mt-4 border-status-red/20"
        onClick={() => window.print()}
      >
        <Printer className="h-4 w-4 mr-1" />
        Print This Summary
      </Button>
    </div>
  );
}
