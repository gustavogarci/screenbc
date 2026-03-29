export type ScreeningStatus =
  | "due"
  | "awaiting-results"
  | "results-ready"
  | "up-to-date";

export type ResultTier = "green" | "yellow" | "red";

export type SmokingStatus = "never" | "former" | "current";

export type FraminghamCategory = "low" | "intermediate" | "high";

export interface LabResult {
  value: number;
  unit: string;
  tier: ResultTier;
}

export interface LabResults {
  hba1c: LabResult;
  fastingGlucose: LabResult;
  totalCholesterol: LabResult;
  ldlCholesterol: LabResult;
  hdlCholesterol: LabResult;
}

export interface Questionnaire {
  familyHistoryDiabetes: boolean | null;
  familyHistoryHeartDisease: boolean | null;
  smokingStatus: SmokingStatus | null;
  systolicBp: number | null;
  onBpMedication: boolean | null;
}

export interface FraminghamRisk {
  score: number;
  category: FraminghamCategory;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  sex: "M" | "F";
  postalCode: string;
  phn: string;
  email: string;
  phone: string | null;
  hasFamilyDoctor: boolean;
  consentAccepted: boolean;
  questionnaireCompleted: boolean;
  questionnaire: Questionnaire | null;
  screeningStatus: ScreeningStatus;
  labResults: LabResults | null;
  framinghamRisk: FraminghamRisk | null;
  cachedSummary: string | null;
}

export interface UPCCLocation {
  name: string;
  address: string;
  phone: string;
}

export interface LifeLabsLocation {
  name: string;
  address: string;
  phone: string;
}

export interface DemoCredential {
  username: string;
  password: string;
  patientId: string;
}
