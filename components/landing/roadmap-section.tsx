"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionWrapper } from "./section-wrapper";

const phases = [
  {
    label: "Phase 0",
    title: "Pilot Program",
    content: (
      <div className="space-y-2 text-text-secondary">
        <p>
          A small, independent trial that can be run by individual physicians in
          their own practices or small communities.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Conditions screened: Diabetes (HbA1c) and dyslipidemia (lipid panel) only</li>
          <li>Patients opt in and register directly on the platform</li>
          <li>A physician approves and signs lab requisitions</li>
          <li>Scale: a handful of practices or one community</li>
          <li>Goal: Validate the model, gather patient feedback, measure engagement</li>
        </ul>
      </div>
    ),
  },
  {
    label: "Phase 1",
    title: "Sanctioned Pilot",
    content: (
      <div className="space-y-2 text-text-secondary">
        <p>
          The program becomes officially approved and supported at a provincial
          level, running in targeted communities with the highest screening gaps.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Connected to the BC health registry — patients identified and notified proactively</li>
          <li>A designated &ldquo;champion physician&rdquo; in each region signs requisitions on behalf of the program</li>
          <li>Select communities across BC with high unscreened populations</li>
          <li>Goal: Measure clinical impact — conditions caught, downstream effect on ER visits</li>
        </ul>
      </div>
    ),
  },
  {
    label: "Phase 2",
    title: "Provincial Expansion",
    content: (
      <div className="space-y-2 text-text-secondary">
        <p>
          Expand to more communities across British Columbia based on Phase 1 results.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Province-wide rollout to all communities</li>
          <li>Priority outreach to those without a family doctor</li>
          <li>Goal: Make preventive screening available to every British Columbian</li>
        </ul>
      </div>
    ),
  },
  {
    label: "Phase 3",
    title: "Add Kidney Disease Screening",
    content: (
      <div className="space-y-2 text-text-secondary">
        <p>
          Introduce chronic kidney disease (CKD) screening via creatinine/eGFR testing.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Unlike diabetes, kidney tests can return critical results needing same-day intervention</li>
          <li>Requires building a physician-on-call notification loop</li>
          <li>Goal: Prove the system can handle both passive and active care pathways</li>
        </ul>
      </div>
    ),
  },
  {
    label: "Phase 4",
    title: "Evaluate and Expand",
    content: (
      <div className="space-y-2 text-text-secondary">
        <p>
          With the platform proven across multiple conditions, evaluate additional
          conditions that could benefit from population-level screening.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Additional conditions determined by clinical advisory input and impact analysis</li>
          <li>Goal: Establish ScreenBC as the preventive screening platform for BC — the chronic disease equivalent of BC Cancer Screening</li>
        </ul>
      </div>
    ),
  },
];

export function RoadmapSection() {
  return (
    <div className="bg-white">
      <SectionWrapper id="roadmap">
        <h2 className="text-2xl font-semibold text-bc-blue mb-8">The Roadmap</h2>

        <Accordion defaultValue={[0]}>
          {phases.map((phase, i) => (
            <AccordionItem key={phase.label} value={i} className="border-surface-border">
              <AccordionTrigger className="py-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-md bg-bc-blue px-2.5 py-0.5 text-xs font-medium text-white">
                    {phase.label}
                  </span>
                  <span className="text-base font-medium text-text-primary">
                    {phase.title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-[4.5rem]">
                {phase.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionWrapper>
    </div>
  );
}
