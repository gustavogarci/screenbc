import { NextRequest, NextResponse } from "next/server";
import { getPatient } from "@/lib/patient-store";
import {
  getScreeningDueEmail,
  getResultsReadyEmail,
} from "@/lib/email-templates";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const { patientId, type } = await request.json();

  if (!patientId || !type) {
    return NextResponse.json(
      { error: "Missing patientId or type" },
      { status: 400 }
    );
  }

  const patient = await getPatient(patientId);
  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  const html =
    type === "due"
      ? getScreeningDueEmail(patient)
      : getResultsReadyEmail(patient);

  const subject =
    type === "due"
      ? "You may be overdue for preventive health screening"
      : "Your ScreenBC screening results are ready";

  try {
    await sendEmail({ to: patient.email, subject, html });
    return NextResponse.json({ success: true, to: patient.email });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
