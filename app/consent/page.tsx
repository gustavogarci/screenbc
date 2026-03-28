import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getPatient } from "@/lib/patient-store";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ConsentForm } from "@/components/screening/consent-form";

export default async function ConsentPage() {
  const patientId = await getSession();
  if (!patientId) redirect("/login");

  const patient = getPatient(patientId);
  if (!patient) redirect("/login");
  if (patient.consentAccepted) redirect("/portal");

  return (
    <>
      <Header showLogout />
      <main className="flex-1">
        <ConsentForm patientId={patientId} />
      </main>
      <Footer />
    </>
  );
}
