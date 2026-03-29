"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ConsentForm({ patientId }: { patientId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleAccept() {
    setLoading(true);
    await fetch("/api/patient/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "accept-consent", patientId }),
    });
    window.location.href = "/portal";
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card className="border-surface-border shadow-sm">
        <CardContent className="pt-8 pb-8 px-8">
          <h1 className="text-xl font-semibold text-bc-blue text-center">
            ScreenBC Preventive Screening Program
          </h1>
          <p className="text-sm text-text-secondary text-center mt-1 mb-8">
            Terms and Consent
          </p>

          <div className="space-y-6 text-sm text-text-primary leading-relaxed">
            <p>Please read the following carefully before proceeding.</p>

            <div>
              <h2 className="font-semibold text-text-primary mb-2 uppercase text-xs tracking-wide">
                What This Program Is
              </h2>
              <p>
                ScreenBC is a preventive health screening pilot program for
                British Columbians. The
                program screens for type 2 diabetes and high cholesterol
                (dyslipidemia) through standard blood tests.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-text-primary mb-2 uppercase text-xs tracking-wide">
                What You Need to Understand
              </h2>
              <ol className="list-decimal list-outside ml-5 space-y-3">
                <li>
                  Your screening results will be interpreted using artificial
                  intelligence (AI) that follows well-established Canadian
                  clinical guidelines (Diabetes Canada, Canadian Cardiovascular
                  Society). Individual results are{" "}
                  <strong>NOT reviewed by a physician</strong>. You will receive
                  automated guidance based on your results.
                </li>
                <li>
                  If a result requires attention, the system will provide you
                  with clear next steps and direct you to appropriate care
                  resources (e.g., UPCC, walk-in clinic, HealthLink BC).
                </li>
                <li>
                  You are responsible for following up on your results. ScreenBC
                  will provide you with resources, guidance, and referral
                  information, but cannot guarantee access to a physician for
                  follow-up care.
                </li>
                <li>
                  This program does <strong>NOT</strong> replace staying on the
                  waitlist for a family doctor. It provides preventive screening
                  only, with limited scope (diabetes and cholesterol).
                </li>
                <li>
                  If you feel unwell at any time, call{" "}
                  <strong>8-1-1</strong> (HealthLink BC) or go to your nearest
                  emergency department. Do not wait for screening results.
                </li>
              </ol>
            </div>

            <div>
              <h2 className="font-semibold text-text-primary mb-2 uppercase text-xs tracking-wide">
                Consent
              </h2>
              <p>
                By clicking &ldquo;I Accept and Continue,&rdquo; you confirm
                that you have read and understand the above terms, and you
                consent to participating in the ScreenBC preventive screening
                program.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Button
              onClick={handleAccept}
              disabled={loading}
              className="w-full bg-bc-blue hover:bg-bc-blue-hover py-3 text-base"
              size="lg"
            >
              {loading ? "Please wait..." : "I Accept and Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
