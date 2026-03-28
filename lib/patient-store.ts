import type { Patient, LabResults, Questionnaire, FraminghamRisk } from "./types";
import initialPatients from "@/data/demo-patients.json";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

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

const STORE_PATH = join(process.cwd(), ".screenbc-state.json");

function loadStore(): Map<string, Patient> {
  const map = new Map<string, Patient>();
  if (existsSync(STORE_PATH)) {
    try {
      const data = JSON.parse(readFileSync(STORE_PATH, "utf-8")) as Patient[];
      for (const p of data) {
        map.set(p.id, p);
      }
      return map;
    } catch {
      // corrupted file, fall through to defaults
    }
  }
  for (const p of initialPatients as Patient[]) {
    map.set(p.id, { ...p });
  }
  saveStore(map);
  return map;
}

function saveStore(map: Map<string, Patient>): void {
  writeFileSync(STORE_PATH, JSON.stringify(Array.from(map.values()), null, 2));
}

export function getPatient(id: string): Patient | undefined {
  return loadStore().get(id);
}

export function updatePatient(id: string, updates: Partial<Patient>): Patient | undefined {
  const store = loadStore();
  const patient = store.get(id);
  if (!patient) return undefined;
  const updated = { ...patient, ...updates };
  store.set(id, updated);
  saveStore(store);
  return updated;
}

export function getAllPatients(): Patient[] {
  return Array.from(loadStore().values());
}

export function simulateResults(id: string): Patient | undefined {
  const store = loadStore();
  const patient = store.get(id);
  if (!patient) return undefined;
  const preset = LAB_RESULTS_BY_PATIENT[id];
  if (!preset) return undefined;

  const updated: Patient = {
    ...patient,
    screeningStatus: "results-ready",
    labResults: preset.labResults,
    framinghamRisk: patient.questionnaireCompleted ? preset.framinghamRisk : patient.framinghamRisk,
    questionnaireCompleted: patient.questionnaireCompleted,
    questionnaire: patient.questionnaireCompleted ? preset.questionnaire : patient.questionnaire,
  };
  store.set(id, updated);
  saveStore(store);
  return updated;
}

export function resetPatient(id: string): Patient | undefined {
  const store = loadStore();
  const original = (initialPatients as Patient[]).find((p) => p.id === id);
  if (!original) return undefined;
  const reset = { ...original };
  store.set(id, reset);
  saveStore(store);
  return reset;
}

export function resetAll(): void {
  const map = new Map<string, Patient>();
  for (const p of initialPatients as Patient[]) {
    map.set(p.id, { ...p });
  }
  saveStore(map);
}
