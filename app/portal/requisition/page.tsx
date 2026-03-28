import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getPatient } from "@/lib/patient-store";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RequisitionDoc } from "@/components/screening/requisition-doc";
import { RequisitionStatusUpdate } from "@/components/screening/requisition-status-update";
import lifeLabsData from "@/data/lifelabs-locations.json";
import type { LifeLabsLocation } from "@/lib/types";

export default async function RequisitionPage() {
  const patientId = await getSession();
  if (!patientId) redirect("/login");

  const patient = await getPatient(patientId);
  if (!patient) redirect("/login");
  if (!patient.consentAccepted) redirect("/consent");

  const postalPrefix = patient.postalCode.slice(0, 3);
  const locations: LifeLabsLocation[] =
    (lifeLabsData as Record<string, LifeLabsLocation[]>)[postalPrefix] ?? [];

  return (
    <>
      <Header showLogout />
      <main className="flex-1">
        {patient.screeningStatus === "due" && <RequisitionStatusUpdate />}
        <RequisitionDoc patient={patient} lifeLabsLocations={locations} />
      </main>
      <Footer />
    </>
  );
}
