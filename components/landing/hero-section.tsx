"use client";

import { useState } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { ChevronDown, UserRound } from "lucide-react";

export function HeroSection() {
  const [demoLoading, setDemoLoading] = useState(false);

  async function handleDemoLogin() {
    setDemoLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "margaret.johnson", password: "demo1234" }),
      });
      if (!res.ok) {
        setDemoLoading(false);
        return;
      }
      const data = await res.json();
      window.location.href = data.consentAccepted ? "/portal" : "/consent";
    } catch {
      setDemoLoading(false);
    }
  }

  return (
    <div className="bg-surface min-h-[calc(100vh-58px)]">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-36">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-bc-gold-light border border-bc-gold/40 px-3 py-1 mb-4">
              <a
                href="https://www.uvichacks.com/events/healthcare-hackathon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-bc-blue hover:underline"
              >
                Winner — BuildersVault Healthcare AI Hackathon
              </a>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-bc-blue leading-tight">
              Preventive Health Screening for British Columbians
            </h1>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">
              Screen for diabetes and high cholesterol — without a family doctor.
              Get your results interpreted in plain language with clear next steps.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-start gap-3">
              <Button
                className="bg-bc-blue hover:bg-bc-blue-hover"
                onClick={handleDemoLogin}
                disabled={demoLoading}
              >
                <UserRound className="mr-2 h-4 w-4" />
                {demoLoading ? "Signing in..." : "Try as Sample Patient"}
              </Button>
              <button
                onClick={() => {
                  const el = document.getElementById("about");
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 58;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-bc-link hover:underline py-2"
              >
                Learn more about this project
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
