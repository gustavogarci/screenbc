import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createSession } from "@/lib/auth";
import { getPatient } from "@/lib/patient-store";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const patientId = validateCredentials(username, password);
  if (!patientId) {
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  }

  await createSession(patientId);
  const patient = await getPatient(patientId);

  return NextResponse.json({
    patientId,
    consentAccepted: patient?.consentAccepted ?? false,
  });
}
