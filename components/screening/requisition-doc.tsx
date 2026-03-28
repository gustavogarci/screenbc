"use client";

import type { Patient, LifeLabsLocation } from "@/lib/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Printer, ArrowLeft } from "lucide-react";

interface Props {
  patient: Patient;
  lifeLabsLocations: LifeLabsLocation[];
}

export function RequisitionDoc({ patient, lifeLabsLocations }: Props) {
  const dob = new Date(patient.dateOfBirth);
  const formattedDob = dob.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="no-print flex items-center gap-4 mb-6">
        <Link
          href="/portal"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "border-surface-border"
          )}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Portal
        </Link>
        <Button
          size="sm"
          className="bg-bc-blue hover:bg-bc-blue-hover"
          onClick={() => window.print()}
        >
          <Printer className="h-4 w-4 mr-1" />
          Print Requisition
        </Button>
      </div>

      <div className="bg-white border border-surface-border p-10 font-mono text-sm leading-relaxed">
        <div className="text-center border-b border-black pb-4 mb-6">
          <h1 className="text-base font-bold tracking-wide">
            SCREENBC &mdash; PREVENTIVE HEALTH SCREENING PROGRAM
          </h1>
          <p className="text-sm mt-1">Laboratory Requisition</p>
        </div>

        <section className="mb-6">
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2">
            Patient Information
          </h2>
          <div className="grid grid-cols-[140px_1fr] gap-y-1">
            <span>Name:</span>
            <span className="font-semibold">
              {patient.firstName} {patient.lastName}
            </span>
            <span>PHN:</span>
            <span>{patient.phn}</span>
            <span>DOB:</span>
            <span>
              {formattedDob} (Age {patient.age})
            </span>
            <span>Sex:</span>
            <span>{patient.sex === "F" ? "Female" : "Male"}</span>
            <span>Address:</span>
            <span>
              {patient.postalCode.startsWith("V8N")
                ? "Victoria"
                : patient.postalCode.startsWith("V9A")
                  ? "Victoria"
                  : patient.postalCode.startsWith("V2S")
                    ? "Abbotsford"
                    : "BC"}
              , BC {patient.postalCode}
            </span>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2">
            Ordering Clinician
          </h2>
          <p>Dr. Aisha Patel, MD</p>
          <p>ScreenBC Preventive Screening Program</p>
          <p>License #: 42891</p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2">
            Tests Ordered
          </h2>
          <ul className="space-y-1">
            <li>&#9745; Hemoglobin A1c (HbA1c)</li>
            <li>&#9745; Fasting Glucose</li>
            <li>
              &#9745; Lipid Panel (Total Cholesterol, LDL, HDL, Triglycerides)
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2">
            Clinical Indication
          </h2>
          <p>
            Preventive screening per Canadian clinical guidelines (Diabetes
            Canada, CCS 2021 Dyslipidemia). Patient is asymptomatic. No family
            physician on record.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2">
            Patient Instructions
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Bring this form to any LifeLabs location</li>
            <li>Fast for 10-12 hours before your appointment</li>
            <li>Drink water normally</li>
            <li>Bring your BC Services Card or photo ID</li>
          </ul>
        </section>

        {lifeLabsLocations.length > 0 && (
          <section className="border-t border-black pt-4">
            <h2 className="font-bold text-xs uppercase tracking-wider mb-2">
              Nearest LifeLabs Locations (based on postal code{" "}
              {patient.postalCode.slice(0, 3)})
            </h2>
            <ol className="list-decimal list-inside space-y-1">
              {lifeLabsLocations.map((loc, i) => (
                <li key={i}>
                  {loc.name} | {loc.address} | {loc.phone}
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
}
