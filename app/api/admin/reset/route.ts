import { NextRequest, NextResponse } from "next/server";
import { resetPatient, resetAll } from "@/lib/patient-store";

export async function POST(request: NextRequest) {
  const { patientId } = await request.json();

  if (patientId === "all") {
    await resetAll();
    return NextResponse.json({ success: true, message: "All patients reset" });
  }

  const patient = await resetPatient(patientId);
  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    message: `${patient.firstName} ${patient.lastName} reset`,
  });
}
