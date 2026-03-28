import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getPatient, updatePatient } from "@/lib/patient-store";
import { calculateFraminghamRisk } from "@/lib/framingham";
import type { Questionnaire } from "@/lib/types";

export async function POST(request: NextRequest) {
  const patientId = await getSession();
  if (!patientId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const patient = await getPatient(patientId);
  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  const body: Questionnaire = await request.json();

  const questionnaire: Questionnaire = {
    familyHistoryDiabetes: body.familyHistoryDiabetes,
    familyHistoryHeartDisease: body.familyHistoryHeartDisease,
    smokingStatus: body.smokingStatus,
    systolicBp: body.systolicBp,
    onBpMedication: body.onBpMedication,
  };

  let framinghamRisk = patient.framinghamRisk;

  if (
    questionnaire.systolicBp &&
    questionnaire.smokingStatus &&
    patient.labResults
  ) {
    framinghamRisk = calculateFraminghamRisk({
      age: patient.age,
      sex: patient.sex,
      totalCholesterol: patient.labResults.totalCholesterol.value,
      hdlCholesterol: patient.labResults.hdlCholesterol.value,
      systolicBp: questionnaire.systolicBp,
      onBpMedication: questionnaire.onBpMedication ?? false,
      isSmoker: questionnaire.smokingStatus === "current",
      hasDiabetes: patient.labResults.hba1c.value >= 6.5,
    });
  }

  await updatePatient(patientId, {
    questionnaire,
    questionnaireCompleted: true,
    framinghamRisk,
  });

  return NextResponse.json({ success: true });
}
