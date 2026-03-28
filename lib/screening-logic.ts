import type { LabResults, ResultTier, FraminghamRisk } from "./types";

export function classifyHba1c(value: number): ResultTier {
  if (value < 6.0) return "green";
  if (value <= 6.4) return "yellow";
  return "red";
}

export function classifyFastingGlucose(value: number): ResultTier {
  if (value < 6.1) return "green";
  if (value <= 6.9) return "yellow";
  return "red";
}

export function classifyLdl(
  ldl: number,
  framingham?: FraminghamRisk | null
): ResultTier {
  if (ldl >= 5.0) return "red";

  if (framingham) {
    if (framingham.score >= 20) return "red";
    if (framingham.score >= 10) return "yellow";
    return "green";
  }

  if (ldl >= 3.5) return "yellow";
  return "green";
}

export function classifyTotalCholesterol(value: number): ResultTier {
  if (value < 5.2) return "green";
  if (value <= 6.2) return "yellow";
  return "red";
}

export function classifyHdl(value: number): ResultTier {
  if (value >= 1.0) return "green";
  return "yellow";
}

export function getOverallTier(results: LabResults): ResultTier {
  const tiers = [
    results.hba1c.tier,
    results.fastingGlucose.tier,
    results.totalCholesterol.tier,
    results.ldlCholesterol.tier,
    results.hdlCholesterol.tier,
  ];

  if (tiers.includes("red")) return "red";
  if (tiers.includes("yellow")) return "yellow";
  return "green";
}

export function getTierLabel(tier: ResultTier): string {
  switch (tier) {
    case "green":
      return "Normal";
    case "yellow":
      return "Borderline";
    case "red":
      return "Needs Attention";
  }
}

export function getTestExplanation(
  testName: string,
  value: number,
  unit: string,
  tier: ResultTier
): string {
  const explanations: Record<string, Record<ResultTier, string>> = {
    hba1c: {
      green: `Your HbA1c of ${value}${unit} is in the normal range. This means your average blood sugar over the past 2-3 months is healthy.`,
      yellow: `Your HbA1c of ${value}${unit} is in the pre-diabetes range (6.0-6.4%). This means your blood sugar is slightly elevated. Lifestyle changes can help prevent progression to diabetes.`,
      red: `Your HbA1c of ${value}${unit} is in the diabetes range (\u22656.5%). This result needs confirmation and follow-up with a physician for management.`,
    },
    fastingGlucose: {
      green: `Your fasting glucose of ${value} ${unit} is normal. Your body is processing sugar well.`,
      yellow: `Your fasting glucose of ${value} ${unit} is in the impaired range (6.1-6.9 mmol/L). This is consistent with your HbA1c and supports the pre-diabetes finding.`,
      red: `Your fasting glucose of ${value} ${unit} is elevated (\u22657.0 mmol/L). Combined with your HbA1c, this needs physician follow-up.`,
    },
    totalCholesterol: {
      green: `Your total cholesterol of ${value} ${unit} is in the desirable range. Good news.`,
      yellow: `Your total cholesterol of ${value} ${unit} is borderline high (5.2-6.2 mmol/L). Your cardiovascular risk score helps determine the significance.`,
      red: `Your total cholesterol of ${value} ${unit} is high (>6.2 mmol/L). This should be discussed with a physician.`,
    },
    ldlCholesterol: {
      green: `Your LDL (\u201cbad\u201d) cholesterol of ${value} ${unit} is in the desirable range.`,
      yellow: `Your LDL cholesterol of ${value} ${unit} is borderline high. Whether medication is needed depends on your overall cardiovascular risk.`,
      red: `Your LDL cholesterol of ${value} ${unit} is significantly elevated. An LDL \u22655.0 may indicate familial hypercholesterolemia. A physician should evaluate this.`,
    },
    hdlCholesterol: {
      green: `Your HDL (\u201cgood\u201d) cholesterol of ${value} ${unit} is at a healthy level. HDL helps protect against heart disease.`,
      yellow: `Your HDL cholesterol of ${value} ${unit} is below the ideal level. Exercise and healthy fats can help raise HDL.`,
      red: `Your HDL cholesterol of ${value} ${unit} is low. This increases cardiovascular risk.`,
    },
  };

  return explanations[testName]?.[tier] ?? "";
}
