import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getPatient } from "@/lib/patient-store";
import { getOverallTier } from "@/lib/screening-logic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ResultsTable } from "@/components/screening/results-table";
import { FraminghamCard } from "@/components/screening/framingham-card";
import { HealthSummary } from "@/components/screening/health-summary";
import { FollowUpChat } from "@/components/screening/follow-up-chat";
import { NextSteps } from "@/components/screening/next-steps";
import upccData from "@/data/upcc-locations.json";
import type { UPCCLocation } from "@/lib/types";

export default async function ResultsPage() {
  const patientId = await getSession();
  if (!patientId) redirect("/login");

  const patient = await getPatient(patientId);
  if (!patient) redirect("/login");
  if (!patient.consentAccepted) redirect("/consent");
  if (!patient.labResults || patient.screeningStatus !== "results-ready") {
    redirect("/portal");
  }

  const overallTier = getOverallTier(patient.labResults);
  const postalPrefix = patient.postalCode.slice(0, 3);
  const upccLocations: UPCCLocation[] =
    (upccData as Record<string, UPCCLocation[]>)[postalPrefix] ?? [];

  const nextScreeningMonths =
    overallTier === "green" ? 36 : overallTier === "yellow" ? 6 : 3;

  const today = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Header showLogout />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* Full-width top section */}
          <div className="space-y-6 mb-8">
            <div className="bg-bc-blue-light border border-bc-link/20 rounded-md px-5 py-3">
              <p className="text-xs text-text-secondary">
                Your results were interpreted using Canadian clinical guidelines
                (Diabetes Canada, CCS). For health questions, call{" "}
                <strong>8-1-1</strong> (HealthLink BC).
              </p>
            </div>

            <h1 className="text-xl font-semibold text-text-primary">
              Your Screening Results &mdash; {today}
            </h1>
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Left column — main content */}
            <div className="flex-1 min-w-0 w-full space-y-8">
              <ResultsTable results={patient.labResults} />
              <HealthSummary overallTier={overallTier} />
              <FollowUpChat />
            </div>

            {/* Right column — sidebar cards */}
            <div className="w-full md:w-80 md:flex-shrink-0 md:sticky md:top-6 space-y-6">
              <FraminghamCard
                framinghamRisk={patient.framinghamRisk}
                patient={patient}
              />
              <NextSteps
                overallTier={overallTier}
                upccLocations={upccLocations}
                postalCode={patient.postalCode}
                nextScreeningMonths={nextScreeningMonths}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
