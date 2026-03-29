import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getPatient, updatePatient } from "@/lib/patient-store";

export async function GET() {
  const patientId = await getSession();
  if (!patientId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const patient = await getPatient(patientId);
  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json(patient);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, patientId } = body;

  if (action === "accept-consent") {
    const patient = await updatePatient(patientId, { consentAccepted: true });
    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  }

  if (action === "update-contact") {
    const sessionPatientId = await getSession();
    if (!sessionPatientId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const { email, phone } = body as { email?: string; phone?: string };
    const updates: Record<string, unknown> = {};
    if (typeof email === "string") {
      const trimmed = email.trim();
      if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
      }
      updates.email = trimmed;
    }
    if (typeof phone === "string") {
      updates.phone = phone.trim() || null;
    }
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }
    const patient = await updatePatient(sessionPatientId, updates);
    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, patient });
  }

  if (action === "start-screening") {
    const sessionPatientId = await getSession();
    if (!sessionPatientId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const patient = await getPatient(sessionPatientId);
    if (patient && patient.screeningStatus === "due") {
      await updatePatient(sessionPatientId, { screeningStatus: "awaiting-results" });
    }
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
