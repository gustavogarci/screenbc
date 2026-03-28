import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getPatient } from "@/lib/patient-store";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QuestionnaireForm } from "@/components/screening/questionnaire-form";

export default async function QuestionnairePage() {
  const patientId = await getSession();
  if (!patientId) redirect("/login");

  const patient = await getPatient(patientId);
  if (!patient) redirect("/login");
  if (!patient.consentAccepted) redirect("/consent");

  return (
    <>
      <Header showLogout />
      <main className="flex-1">
        <QuestionnaireForm />
      </main>
      <Footer />
    </>
  );
}
