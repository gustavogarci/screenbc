import type { FraminghamCategory, FraminghamRisk } from "./types";

/**
 * Framingham Risk Score calculation per CCS guidelines.
 * Estimates 10-year cardiovascular disease risk.
 *
 * Uses the 2008 General Cardiovascular Risk Profile (D'Agostino et al.)
 * with sex-specific log-linear Cox regression coefficients.
 */

interface FraminghamInputs {
  age: number;
  sex: "M" | "F";
  totalCholesterol: number; // mmol/L
  hdlCholesterol: number; // mmol/L
  systolicBp: number;
  onBpMedication: boolean;
  isSmoker: boolean;
  hasDiabetes: boolean;
}

const MALE_COEFFICIENTS = {
  lnAge: 3.06117,
  lnTotalChol: 1.1237,
  lnHdl: -0.93263,
  lnSbpTreated: 1.99881,
  lnSbpUntreated: 1.93303,
  smoking: 0.65451,
  diabetes: 0.57367,
  meanCoeff: 23.9802,
  baseSurvival: 0.88936,
};

const FEMALE_COEFFICIENTS = {
  lnAge: 2.32888,
  lnTotalChol: 1.20904,
  lnHdl: -0.70833,
  lnSbpTreated: 2.76157,
  lnSbpUntreated: 2.82263,
  smoking: 0.52873,
  diabetes: 0.69154,
  meanCoeff: 26.1931,
  baseSurvival: 0.95012,
};

export function calculateFraminghamRisk(inputs: FraminghamInputs): FraminghamRisk {
  const coeff =
    inputs.sex === "M" ? MALE_COEFFICIENTS : FEMALE_COEFFICIENTS;

  const lnAge = Math.log(inputs.age);
  const lnTotalChol = Math.log(inputs.totalCholesterol);
  const lnHdl = Math.log(inputs.hdlCholesterol);
  const lnSbp = Math.log(inputs.systolicBp);

  const sbpCoeff = inputs.onBpMedication
    ? coeff.lnSbpTreated
    : coeff.lnSbpUntreated;

  const sumCoeff =
    coeff.lnAge * lnAge +
    coeff.lnTotalChol * lnTotalChol +
    coeff.lnHdl * lnHdl +
    sbpCoeff * lnSbp +
    (inputs.isSmoker ? coeff.smoking : 0) +
    (inputs.hasDiabetes ? coeff.diabetes : 0);

  const risk =
    1 - Math.pow(coeff.baseSurvival, Math.exp(sumCoeff - coeff.meanCoeff));

  const score = Math.round(risk * 100);
  const clampedScore = Math.max(1, Math.min(score, 80));

  let category: FraminghamCategory;
  if (clampedScore < 10) {
    category = "low";
  } else if (clampedScore < 20) {
    category = "intermediate";
  } else {
    category = "high";
  }

  return { score: clampedScore, category };
}
