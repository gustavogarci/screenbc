import { NextRequest, NextResponse } from "next/server";
import { getPatient } from "@/lib/patient-store";
import {
  getScreeningDueEmail,
  getResultsReadyEmail,
} from "@/lib/email-templates";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const type = request.nextUrl.searchParams.get("type");

  if (!id || !type) {
    return NextResponse.json(
      { error: "Missing id or type" },
      { status: 400 }
    );
  }

  const patient = getPatient(id);
  if (!patient) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const html =
    type === "due"
      ? getScreeningDueEmail(patient)
      : getResultsReadyEmail(patient);

  return NextResponse.json({ html });
}
