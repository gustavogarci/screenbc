"use client";

import type { FraminghamRisk, Patient } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  framinghamRisk: FraminghamRisk | null;
  patient: Patient;
}

const CATEGORY_STYLES = {
  low: {
    bg: "bg-status-green-bg",
    border: "border-status-green/20",
    label: "Low Risk",
  },
  intermediate: {
    bg: "bg-status-yellow-bg",
    border: "border-status-yellow/30",
    label: "Intermediate Risk",
  },
  high: {
    bg: "bg-status-red-bg",
    border: "border-status-red/20",
    label: "High Risk",
  },
};

export function FraminghamCard({ framinghamRisk, patient }: Props) {
  if (!framinghamRisk) {
    return (
      <div className="bg-bc-blue-light border border-bc-link/20 rounded-md p-6">
        <h3 className="font-semibold text-text-primary text-sm">
          Want a more specific cholesterol assessment?
        </h3>
        <p className="text-sm text-text-secondary mt-2">
          Complete your health questionnaire to get your personalized
          cardiovascular risk score.
        </p>
        <Link
          href="/portal/questionnaire"
          className={cn(
            buttonVariants({ size: "sm" }),
            "mt-4 bg-bc-blue hover:bg-bc-blue-hover"
          )}
        >
          Fill Out Questionnaire
        </Link>
      </div>
    );
  }

  const style = CATEGORY_STYLES[framinghamRisk.category];
  const q = patient.questionnaire;

  const factors = [
    `age ${patient.age}`,
    patient.sex === "F" ? "female" : "male",
    q?.smokingStatus === "current"
      ? "smoker"
      : q?.smokingStatus === "former"
        ? "former smoker"
        : "non-smoker",
    q?.systolicBp ? `BP ${q.systolicBp}` : null,
    patient.labResults
      ? `total cholesterol ${patient.labResults.totalCholesterol.value}`
      : null,
    patient.labResults
      ? `HDL ${patient.labResults.hdlCholesterol.value}`
      : null,
  ]
    .filter(Boolean)
    .join(", ");

  const explanations = {
    low: "This means your 10-year cardiovascular risk is low. No medication is recommended. Keep up the good work with a healthy lifestyle.",
    intermediate:
      "This means you have a moderate chance of a cardiovascular event in the next 10 years. It may be a good idea to speak with a doctor about whether cholesterol medication is appropriate for you.",
    high: "This means you have a higher chance of a cardiovascular event in the next 10 years. Statin therapy is recommended. Please book a doctor\u2019s appointment to discuss treatment.",
  };

  return (
    <div className={`${style.bg} border ${style.border} rounded-md p-6`}>
      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
        Your Cardiovascular Risk Score
      </h3>
      <p className="text-2xl font-bold text-text-primary mt-2">
        {framinghamRisk.score}%{" "}
        <span className="text-base font-medium">({style.label})</span>
      </p>
      <p className="text-xs text-text-secondary mt-2">Based on: {factors}</p>
      <p className="text-sm text-text-primary mt-3 leading-relaxed">
        {explanations[framinghamRisk.category]}
      </p>
    </div>
  );
}
