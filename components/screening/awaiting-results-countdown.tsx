"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface Props {
  patientId: string;
}

export function AwaitingResultsCountdown({ patientId }: Props) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [simulating, setSimulating] = useState(false);
  const hasSimulated = useRef(false);

  useEffect(() => {
    if (simulating || hasSimulated.current) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [simulating]);

  useEffect(() => {
    if (countdown === 0 && !hasSimulated.current) {
      hasSimulated.current = true;
      setSimulating(true);
      fetch("/api/admin/simulate-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId }),
      }).then(() => {
        router.refresh();
      });
    }
  }, [countdown, patientId, router]);

  return (
    <div className="bg-bc-blue-light border border-bc-link/20 rounded-md p-5">
      <h3 className="font-semibold text-text-primary text-sm">
        Awaiting lab results
      </h3>
      <p className="text-sm text-text-secondary mt-1">
        Your lab requisition has been generated. Visit any LifeLabs to complete
        your blood work.
      </p>
      <p className="text-sm font-medium text-bc-blue mt-3">
        {simulating ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Receiving results...
          </span>
        ) : (
          <>Results arriving in {countdown}...</>
        )}
      </p>
    </div>
  );
}
