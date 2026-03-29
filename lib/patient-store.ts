import type { Patient, LabResults, Questionnaire, FraminghamRisk } from "./types";
import { getSupabase } from "./supabase";
import initialPatients from "@/data/demo-patients.json";

const LAB_RESULTS_BY_PATIENT: Record<string, { labResults: LabResults; framinghamRisk: FraminghamRisk; questionnaire: Questionnaire }> = {
  "PAT-001": {
    labResults: {
      hba1c: { value: 6.3, unit: "%", tier: "yellow" },
      fastingGlucose: { value: 6.4, unit: "mmol/L", tier: "yellow" },
      totalCholesterol: { value: 6.1, unit: "mmol/L", tier: "yellow" },
      ldlCholesterol: { value: 4.2, unit: "mmol/L", tier: "yellow" },
      hdlCholesterol: { value: 1.4, unit: "mmol/L", tier: "green" },
    },
    framinghamRisk: { score: 12, category: "intermediate" },
    questionnaire: {
      familyHistoryDiabetes: true,
      familyHistoryHeartDisease: false,
      smokingStatus: "never",
      systolicBp: 128,
      onBpMedication: false,
    },
  },
  "PAT-002": {
    labResults: {
      hba1c: { value: 5.4, unit: "%", tier: "green" },
      fastingGlucose: { value: 5.1, unit: "mmol/L", tier: "green" },
      totalCholesterol: { value: 4.8, unit: "mmol/L", tier: "green" },
      ldlCholesterol: { value: 2.9, unit: "mmol/L", tier: "green" },
      hdlCholesterol: { value: 1.6, unit: "mmol/L", tier: "green" },
    },
    framinghamRisk: { score: 4, category: "low" },
    questionnaire: {
      familyHistoryDiabetes: false,
      familyHistoryHeartDisease: false,
      smokingStatus: "never",
      systolicBp: 118,
      onBpMedication: false,
    },
  },
  "PAT-003": {
    labResults: {
      hba1c: { value: 7.1, unit: "%", tier: "red" },
      fastingGlucose: { value: 7.8, unit: "mmol/L", tier: "red" },
      totalCholesterol: { value: 7.2, unit: "mmol/L", tier: "red" },
      ldlCholesterol: { value: 5.4, unit: "mmol/L", tier: "red" },
      hdlCholesterol: { value: 1.1, unit: "mmol/L", tier: "green" },
    },
    framinghamRisk: { score: 24, category: "high" },
    questionnaire: {
      familyHistoryDiabetes: true,
      familyHistoryHeartDisease: true,
      smokingStatus: "former",
      systolicBp: 145,
      onBpMedication: false,
    },
  },
};

// --- snake_case <-> camelCase mapping ---

interface PatientRow {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  age: number;
  sex: "M" | "F";
  postal_code: string;
  phn: string;
  email: string;
  has_family_doctor: boolean;
  consent_accepted: boolean;
  questionnaire_completed: boolean;
  questionnaire: Questionnaire | null;
  screening_status: string;
  lab_results: LabResults | null;
  framingham_risk: FraminghamRisk | null;
  cached_summary: string | null;
}

function rowToPatient(row: PatientRow): Patient {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    dateOfBirth: row.date_of_birth,
    age: row.age,
    sex: row.sex,
    postalCode: row.postal_code,
    phn: row.phn,
    email: row.email,
    hasFamilyDoctor: row.has_family_doctor,
    consentAccepted: row.consent_accepted,
    questionnaireCompleted: row.questionnaire_completed,
    questionnaire: row.questionnaire,
    screeningStatus: row.screening_status as Patient["screeningStatus"],
    labResults: row.lab_results,
    framinghamRisk: row.framingham_risk,
    cachedSummary: row.cached_summary,
  };
}

function patientUpdatesToRow(updates: Partial<Patient>): Record<string, unknown> {
  const map: Record<string, unknown> = {};
  if (updates.firstName !== undefined) map.first_name = updates.firstName;
  if (updates.lastName !== undefined) map.last_name = updates.lastName;
  if (updates.dateOfBirth !== undefined) map.date_of_birth = updates.dateOfBirth;
  if (updates.age !== undefined) map.age = updates.age;
  if (updates.sex !== undefined) map.sex = updates.sex;
  if (updates.postalCode !== undefined) map.postal_code = updates.postalCode;
  if (updates.phn !== undefined) map.phn = updates.phn;
  if (updates.email !== undefined) map.email = updates.email;
  if (updates.hasFamilyDoctor !== undefined) map.has_family_doctor = updates.hasFamilyDoctor;
  if (updates.consentAccepted !== undefined) map.consent_accepted = updates.consentAccepted;
  if (updates.questionnaireCompleted !== undefined) map.questionnaire_completed = updates.questionnaireCompleted;
  if (updates.questionnaire !== undefined) map.questionnaire = updates.questionnaire;
  if (updates.screeningStatus !== undefined) map.screening_status = updates.screeningStatus;
  if (updates.labResults !== undefined) map.lab_results = updates.labResults;
  if (updates.framinghamRisk !== undefined) map.framingham_risk = updates.framinghamRisk;
  if (updates.cachedSummary !== undefined) map.cached_summary = updates.cachedSummary;
  return map;
}

function seedPatientToRow(p: Patient): PatientRow {
  return {
    id: p.id,
    first_name: p.firstName,
    last_name: p.lastName,
    date_of_birth: p.dateOfBirth,
    age: p.age,
    sex: p.sex,
    postal_code: p.postalCode,
    phn: p.phn,
    email: p.email,
    has_family_doctor: p.hasFamilyDoctor,
    consent_accepted: p.consentAccepted,
    questionnaire_completed: p.questionnaireCompleted,
    questionnaire: p.questionnaire,
    screening_status: p.screeningStatus,
    lab_results: p.labResults,
    framingham_risk: p.framinghamRisk,
    cached_summary: p.cachedSummary,
  };
}

// --- Public API (same signatures as before) ---

export async function getPatient(id: string): Promise<Patient | undefined> {
  const { data, error } = await getSupabase()
    .from("patients")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return undefined;
  return rowToPatient(data as PatientRow);
}

export async function updatePatient(id: string, updates: Partial<Patient>): Promise<Patient | undefined> {
  const row = patientUpdatesToRow(updates);
  if (Object.keys(row).length === 0) return getPatient(id);

  const { data, error } = await getSupabase()
    .from("patients")
    .update(row)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) return undefined;
  return rowToPatient(data as PatientRow);
}

export async function getAllPatients(): Promise<Patient[]> {
  const { data, error } = await getSupabase()
    .from("patients")
    .select("*")
    .order("id");

  if (error || !data) return [];
  return (data as PatientRow[]).map(rowToPatient);
}

export async function simulateResults(id: string): Promise<Patient | undefined> {
  const patient = await getPatient(id);
  if (!patient) return undefined;
  const preset = LAB_RESULTS_BY_PATIENT[id];
  if (!preset) return undefined;

  return updatePatient(id, {
    screeningStatus: "results-ready",
    labResults: preset.labResults,
    framinghamRisk: patient.questionnaireCompleted ? preset.framinghamRisk : patient.framinghamRisk,
    questionnaire: patient.questionnaireCompleted ? preset.questionnaire : patient.questionnaire,
  });
}

export async function resetPatient(id: string): Promise<Patient | undefined> {
  const seed = (initialPatients as Patient[]).find((p) => p.id === id);
  if (!seed) return undefined;

  const row = seedPatientToRow(seed);
  const { data, error } = await getSupabase()
    .from("patients")
    .update(row)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) return undefined;
  return rowToPatient(data as PatientRow);
}

export async function resetAll(): Promise<void> {
  const db = getSupabase();
  for (const seed of initialPatients as Patient[]) {
    const row = seedPatientToRow(seed);
    await db.from("patients").update(row).eq("id", seed.id);
  }
}
