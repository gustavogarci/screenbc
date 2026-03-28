import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getPatient, updatePatient } from "@/lib/patient-store";

export async function GET() {
  const patientId = await getSession();
  if (!patientId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const patient = getPatient(patientId);
  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json(patient);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, patientId } = body;

  if (action === "accept-consent") {
    const patient = updatePatient(patientId, { consentAccepted: true });
    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
