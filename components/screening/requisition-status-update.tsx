"use client";

import { useEffect } from "react";

export function RequisitionStatusUpdate() {
  useEffect(() => {
    fetch("/api/patient/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "start-screening" }),
    });
  }, []);

  return null;
}
