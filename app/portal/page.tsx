import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getPatient } from "@/lib/patient-store";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionnaireBanner } from "@/components/screening/questionnaire-banner";
import { ScreeningStatus } from "@/components/screening/screening-status";

export default async function PortalPage() {
  const patientId = await getSession();
  if (!patientId) redirect("/login");

  const patient = await getPatient(patientId);
  if (!patient) redirect("/login");
  if (!patient.consentAccepted) redirect("/consent");

  const dob = new Date(patient.dateOfBirth);
  const formattedDob = dob.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Header showLogout />
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-semibold text-text-primary mb-8">
            Welcome back, {patient.firstName}.
          </h1>

          <div style={{ display: "flex", flexDirection: "row", gap: "1.5rem", alignItems: "flex-start" }}>
            {/* Left column — status and banners */}
            <div className="space-y-8" style={{ flex: "1 1 0%", minWidth: 0 }}>
              {!patient.questionnaireCompleted && <QuestionnaireBanner />}

              {patient.questionnaireCompleted &&
                patient.screeningStatus !== "results-ready" &&
                patient.screeningStatus !== "up-to-date" && (
                  <div className="bg-status-green-bg border border-status-green/20 rounded-md p-4">
                    <p className="text-sm text-status-green font-medium">
                      Health questionnaire completed. Your results will include a
                      personalized cardiovascular risk assessment.
                    </p>
                  </div>
                )}

              <div>
                <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-3">
                  Screening Status
                </h2>
                <ScreeningStatus status={patient.screeningStatus} />
              </div>
            </div>

            {/* Right column — profile card */}
            <div style={{ width: "320px", flexShrink: 0, position: "sticky", top: "1.5rem" }}>
              <Card className="border-surface-border shadow-sm py-0 gap-0">
                <CardContent className="p-5">
                  <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">
                    Your Profile
                  </h2>
                  <dl className="space-y-2.5 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-text-secondary">Name</dt>
                      <dd className="font-medium text-text-primary">
                        {patient.firstName} {patient.lastName}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-text-secondary">Date of Birth</dt>
                      <dd className="font-medium text-text-primary">
                        {formattedDob} (Age {patient.age})
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-text-secondary">Sex</dt>
                      <dd className="font-medium text-text-primary">
                        {patient.sex === "F" ? "Female" : "Male"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-text-secondary">PHN</dt>
                      <dd className="font-medium text-text-primary font-mono text-xs">
                        {patient.phn}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-text-secondary">Postal Code</dt>
                      <dd className="font-medium text-text-primary">
                        {patient.postalCode}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
