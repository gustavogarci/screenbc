"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function QuestionnaireBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-bc-blue-light border border-bc-link/20 rounded-md p-5">
      <p className="text-sm font-medium text-text-primary">
        Help us tailor your results &mdash; fill out a 2-minute health
        questionnaire.
      </p>
      <p className="text-xs text-text-secondary mt-1">
        This allows us to calculate your cardiovascular risk score for more
        specific cholesterol guidance.
      </p>
      <div className="flex items-center gap-3 mt-4">
        <Link
          href="/portal/questionnaire"
          className={cn(
            buttonVariants({ size: "sm" }),
            "bg-bc-blue hover:bg-bc-blue-hover"
          )}
        >
          Fill Out Questionnaire
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="text-sm text-text-secondary hover:text-text-primary"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}
