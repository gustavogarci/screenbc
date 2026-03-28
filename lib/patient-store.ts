import { cookies } from "next/headers";
import type { Patient, LabResults, Questionnaire, FraminghamRisk } from "./types";
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

const COOKIE_PREFIX = "sbc-";
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

type PatientOverrides = Omit<Partial<Patient>, "cachedSummary">;

function getDefaults(): Map<string, Patient> {
  const map = new Map<string, Patient>();
  for (const p of initialPatients as Patient[]) {
    map.set(p.id, { ...p });
  }
  return map;
}

function getDefaultPatient(id: string): Patient | undefined {
  return getDefaults().get(id);
}

function serializeOverrides(patient: Patient, base: Patient): string {
  const diff: Record<string, unknown> = {};
  for (const key of Object.keys(patient) as (keyof Patient)[]) {
    if (key === "cachedSummary") continue;
    if (JSON.stringify(patient[key]) !== JSON.stringify(base[key])) {
      diff[key] = patient[key];
    }
  }
  return encodeURIComponent(JSON.stringify(diff));
}

export async function getPatient(id: string): Promise<Patient | undefined> {
  const base = getDefaultPatient(id);
  if (!base) return undefined;

  const cookieStore = await cookies();
  const raw = cookieStore.get(`${COOKIE_PREFIX}${id}`)?.value;
  if (!raw) return { ...base };

  try {
    const overrides: PatientOverrides = JSON.parse(decodeURIComponent(raw));
    return { ...base, ...overrides };
  } catch {
    return { ...base };
  }
}

export async function updatePatient(id: string, updates: Partial<Patient>): Promise<Patient | undefined> {
  const current = await getPatient(id);
  if (!current) return undefined;
  const base = getDefaultPatient(id)!;

  const updated = { ...current, ...updates };
  const cookieStore = await cookies();
  cookieStore.set(`${COOKIE_PREFIX}${id}`, serializeOverrides(updated, base), COOKIE_OPTIONS);

  return updated;
}

export async function getAllPatients(): Promise<Patient[]> {
  const defaults = getDefaults();
  const result: Patient[] = [];
  for (const id of defaults.keys()) {
    const patient = await getPatient(id);
    if (patient) result.push(patient);
  }
  return result;
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
  const cookieStore = await cookies();
  cookieStore.delete({ name: `${COOKIE_PREFIX}${id}`, path: "/" });
  return getDefaultPatient(id);
}

export async function resetAll(): Promise<void> {
  const cookieStore = await cookies();
  for (const id of getDefaults().keys()) {
    cookieStore.delete({ name: `${COOKIE_PREFIX}${id}`, path: "/" });
  }
}
