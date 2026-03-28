import { NextRequest, NextResponse } from "next/server";
import { simulateResults } from "@/lib/patient-store";

export async function POST(request: NextRequest) {
  const { patientId } = await request.json();

  const patient = simulateResults(patientId);
  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    status: patient.screeningStatus,
  });
}
