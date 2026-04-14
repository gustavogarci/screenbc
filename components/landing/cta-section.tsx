"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";

export function CtaSection() {
  const [loading, setLoading] = useState(false);

  async function handleDemoLogin() {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "margaret.johnson",
          password: "demo1234",
        }),
      });
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      window.location.href = data.consentAccepted ? "/portal" : "/consent";
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="bg-bc-blue-light">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 text-center">
        <h2 className="text-2xl font-semibold text-bc-blue mb-3">
          See it in action
        </h2>
        <p className="text-text-secondary mb-8 max-w-lg mx-auto">
          Explore the full screening experience as a sample patient — from
          enrollment to results interpretation and next steps.
        </p>
        <Button
          size="lg"
          className="bg-bc-blue hover:bg-bc-blue-hover"
          onClick={handleDemoLogin}
          disabled={loading}
        >
          <UserRound className="mr-2 h-5 w-5" />
          {loading ? "Signing in..." : "Try as Sample Patient"}
        </Button>
      </div>
    </div>
  );
}
