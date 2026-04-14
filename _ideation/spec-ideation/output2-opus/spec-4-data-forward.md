# Spec 4: ScreenWell BC — Data-Forward (Population Health + Clinical AI)

> **What this is:** A version that leans heavily into the hackathon data. Instead of just building a patient-facing app, this spec adds a powerful analytics layer that quantifies the impact: "Here's exactly how many people this would catch, in which communities, at what cost savings." Judges at a healthcare hackathon love data. Estimated build time: 9-12 hours.

> **When to pick this over other specs:** When you believe the hackathon judges will score data analysis and quantified impact heavily (the scoring rubric mentions "Clinical Relevance" at 30 points). This spec bridges Track 1 (Clinical AI) and Track 2 (Population Health) — showing the judges you can work across both tracks.

---

## The Big Idea Difference

Specs 1-3 build a patient portal and demo the flow. This spec adds a third layer: a **Population Health Dashboard** that runs the screening algorithm against ALL 2,000 hackathon patients and visualizes the results. It answers the question judges will ask: **"How big is this problem, really?"**

The demo becomes two stories:
1. **The Patient Story:** Margaret signs up, gets screened, gets her results (same as other specs)
2. **The System Story:** "We ran this against 2,000 patients. Here's what we found."

---

## Architecture: Three Layers

```
┌──────────────────────────────────────────────────────────────┐
│  LAYER 1: PATIENT PORTAL (same as Spec 2 lean build)        │
│  Login → Dashboard → Requisition → Results → Summary         │
├──────────────────────────────────────────────────────────────┤
│  LAYER 2: POPULATION HEALTH DASHBOARD ← NEW                 │
│  Community Map → Screening Gap Analysis → Cost Impact        │
├──────────────────────────────────────────────────────────────┤
│  LAYER 3: CLINICAL DATA ANALYSIS ENGINE ← NEW               │
│  Batch screening of 2,000 patients → findings report         │
└──────────────────────────────────────────────────────────────┘
```

**Layer 1** is the patient-facing app (built using Spec 2's lean approach).
**Layer 2** is a Physician/Admin dashboard that visualizes population-level insights.
**Layer 3** is the data pipeline that runs at build time to produce the numbers.

---

## Layer 3: Clinical Data Analysis (Build First)

This runs as a build-time script (or server-side at startup). It processes all hackathon CSV files and produces the key statistics for the demo.

### Analysis Pipeline

```typescript
// scripts/analyze-hackathon-data.ts
// Run: npx tsx scripts/analyze-hackathon-data.ts
// Output: data/analysis-results.json

import { parse } from 'csv-parse/sync';
import fs from 'fs';

// Step 1: Load all datasets
const patients = loadCSV('patients.csv');         // 2,000 patients
const labResults = loadCSV('lab_results.csv');     // 3,000 results
const encounters = loadCSV('encounters.csv');      // 10,000 encounters
const medications = loadCSV('medications.csv');     // 5,000 records
const vitals = loadCSV('vitals.csv');              // 2,000 readings

// Step 2: Identify screening-eligible population
const eligible = patients.filter(p => p.age >= 40);
// Expected: ~1,200 of 2,000 patients

// Step 3: Identify patients with KNOWN diagnoses
// (These are already being managed — not the ones we'd "catch")
const knownDiabetes = findPatientsWithDiagnosis(encounters, ['E11', 'E10', 'Type 2 diabetes']);
const knownHyperlipidemia = findPatientsWithDiagnosis(encounters, ['E78', 'Hyperlipidemia']);
const knownCKD = findPatientsWithDiagnosis(encounters, ['N18', 'Chronic kidney']);
const knownHypertension = findPatientsWithDiagnosis(encounters, ['I10', 'Hypertension']);

// Step 4: Identify patients on relevant medications
// (Also already being managed)
const onMetformin = findPatientsOnMedication(medications, ['Metformin']);
const onStatins = findPatientsOnMedication(medications, ['Atorvastatin', 'Rosuvastatin', 'Simvastatin']);
const onACEInhibitors = findPatientsOnMedication(medications, ['Ramipril', 'Lisinopril', 'Enalapril']);

// Step 5: Find THE GAP — eligible patients with NO known diagnosis AND NO relevant medication
//         but WHO HAVE abnormal lab results
const undiagnosedAbnormal = eligible.filter(p => {
  const hasNoDiagnosis = !knownDiabetes.has(p.id) && !knownHyperlipidemia.has(p.id) && !knownCKD.has(p.id);
  const hasNoRelevantMeds = !onMetformin.has(p.id) && !onStatins.has(p.id);
  const hasAbnormalLab = patientHasAbnormalScreeningLab(p.id, labResults);
  return hasNoDiagnosis && hasNoRelevantMeds && hasAbnormalLab;
});

// Step 6: Break down by condition
const findings = {
  totalEligible: eligible.length,
  totalWithKnownConditions: knownDiabetes.size + knownHyperlipidemia.size + knownCKD.size,
  totalUndiagnosedAbnormal: undiagnosedAbnormal.length,
  byCondition: {
    diabetes: {
      undiagnosed: countUndiagnosedAbnormal('HbA1c', 6.0, labResults, knownDiabetes, onMetformin),
      prediabetes: countInRange('HbA1c', 6.0, 6.4, labResults, knownDiabetes, onMetformin),
      newDiabetes: countAboveThreshold('HbA1c', 6.5, labResults, knownDiabetes, onMetformin),
    },
    cholesterol: {
      highLDL: countAboveThreshold('LDL Cholesterol', 3.5, labResults, knownHyperlipidemia, onStatins),
      veryHighLDL: countAboveThreshold('LDL Cholesterol', 5.0, labResults, knownHyperlipidemia, onStatins),
    },
    kidney: {
      reducedEGFR: countBelowThreshold('eGFR', 60, labResults, knownCKD, onACEInhibitors),
      // Note: eGFR might need to be calculated from creatinine values in the data
    }
  },
  costImpact: {
    // Each undiagnosed diabetic costs an extra $11,400/year when they present to the ER
    // Each screening blood panel costs ~$25
    diabetesSavingsPerPatient: 11400,
    screeningCostPerPatient: 25,
    // ... calculated ROI
  }
};

fs.writeFileSync('data/analysis-results.json', JSON.stringify(findings, null, 2));
```

### Expected Findings (Based on Hackathon Data Patterns)

The hackathon data is medically coherent — diabetic patients have elevated glucose, etc. So we should find:

- **~1,200** patients are 40+ (screening-eligible)
- **~800** of those have lab results in the dataset
- Of those without a known diabetes diagnosis:
  - **~X%** have HbA1c ≥ 6.0% (pre-diabetes or diabetes range)
  - **~Y%** have LDL ≥ 3.5 mmol/L (high cholesterol)
  - **~Z%** have eGFR < 60 (reduced kidney function)

These numbers become the centerpiece of the pitch: **"Of 800 eligible patients, X% had undetected abnormal results."**

---

## Layer 2: Population Health Dashboard (`/analytics`)

A visually rich dashboard that presents the analysis results + community-level data.

### Section A: The Screening Gap Visualization

```
┌──────────────────────────────────────────────────────────────┐
│  POPULATION SCREENING ANALYSIS                               │
│  Based on 2,000 synthetic BC patients                        │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │   SCREENING-ELIGIBLE          ABNORMAL RESULTS         │  │
│  │   PATIENTS (40+)              UNDIAGNOSED              │  │
│  │                                                        │  │
│  │      ┌──────┐                 ┌──────┐                │  │
│  │      │ 1,247│ ────────────→  │  187  │                │  │
│  │      │      │                 │ (15%) │                │  │
│  │      └──────┘                 └──────┘                │  │
│  │                                                        │  │
│  │   Of these, 187 had abnormal lab results              │  │
│  │   with NO diagnosis on file and NO relevant meds.     │  │
│  │                                                        │  │
│  │   These are the patients ScreenWell BC would catch.   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  BY CONDITION:                                               │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │ DIABETES  │  │CHOLESTEROL│  │  KIDNEY   │               │
│  │           │  │           │  │           │               │
│  │  73       │  │  89       │  │  25       │               │
│  │ undetected│  │ high LDL  │  │ reduced   │               │
│  │           │  │ no statin │  │ eGFR      │               │
│  │           │  │           │  │           │               │
│  │ 34 pre-   │  │ 12 with   │  │ 8 need    │               │
│  │ diabetes  │  │ LDL > 5.0 │  │ urgent    │               │
│  │ 39 likely │  │ (FH risk) │  │ referral  │               │
│  │ diabetic  │  │           │  │           │               │
│  └───────────┘  └───────────┘  └───────────┘               │
│                                                              │
│  (Numbers are illustrative — actual values come from the     │
│   analysis script run against hackathon data)                │
└──────────────────────────────────────────────────────────────┘
```

### Section B: Community Heat Map

Same BC map as Spec 3, but now with TWO layers:
1. **Layer 1 (base):** % without family doctor (from `bc_health_indicators.csv`)
2. **Layer 2 (overlay):** ER visits per 1,000 (from same dataset)

The visual correlation tells the story: "No doctor → no screening → ER visits spike."

```typescript
// Interactive chart using Recharts or Plotly
// X-axis: % without family doctor
// Y-axis: ER visits per 1,000
// Each dot = a BC community
// Hover: community name, both values, chronic disease prevalence

// This scatter plot visually PROVES the correlation
```

### Section C: Cost Impact Calculator

An interactive widget:

```
┌──────────────────────────────────────────────────────┐
│  COST IMPACT CALCULATOR                              │
│                                                      │
│  Patients screened:        [  500  ] (slider)        │
│  Detection rate:           15.0%                     │
│  Patients caught early:    75                        │
│                                                      │
│  ┌─────────────────────────────────────────────────┐ │
│  │  SCREENING COST        $12,500                  │ │
│  │  ($25 × 500 patients)                           │ │
│  │                                                 │ │
│  │  ER COSTS AVOIDED      $1,125,000               │ │
│  │  ($15,000 × 75 patients)                        │ │
│  │                                                 │ │
│  │  NET SAVINGS           $1,112,500               │ │
│  │  ROI: 89:1                                      │ │
│  └─────────────────────────────────────────────────┘ │
│                                                      │
│  * Based on published cost data:                     │
│    Managed diabetes: $3,600/yr                       │
│    Unmanaged diabetes ER: $15,000/yr                 │
│    Dialysis (late-stage CKD): $90,000/yr             │
└──────────────────────────────────────────────────────┘
```

### Section D: Correlation Analysis

A small section showing the statistical correlation between unattached rates and chronic disease burden:

```typescript
// Calculate Pearson correlation between:
// pct_without_family_doctor AND er_visits_per_1000
// pct_without_family_doctor AND diabetes_prevalence
// pct_without_family_doctor AND hypertension_prevalence

// Display as a mini correlation matrix or just key stats:
// "Communities with >25% unattached patients have 1.4x higher ER visit rates"
```

---

## Layer 1: Patient Portal (Lean Build)

Use Spec 2's lean build for the patient-facing portal. The analytics dashboard is the differentiator, not the patient flow.

Quick summary of patient portal:
- Login with PHN + DOB
- Dashboard (screening due / waiting / results)
- Requisition page
- Results with traffic lights
- AI summary

No chat companion. No complex registration flow. Keep it lean.

---

## The Demo Flow (Hybrid: Patient + Analytics)

### Revised Demo Script (3 minutes)

**Beat 1: The Data Story (45 seconds)**

*Open the analytics dashboard.*

> "We took the hackathon dataset — 2,000 synthetic BC patients — and ran our screening algorithm against it. Of the 1,247 patients over 40 who are eligible for screening..."

*Point to the funnel visualization.*

> "...187 had abnormal lab results with no diagnosis on file and no relevant medications. That's 15% of the eligible population with undetected conditions that a single blood test would catch."

*Point to the condition breakdown.*

> "73 undetected diabetes cases. 89 high cholesterol without a statin. 25 with declining kidney function. In a real population, these people would end up in the ER."

*Point to the scatter plot.*

> "And look at this — the communities with the highest rates of unattached patients also have the highest ER visit rates. The correlation is [r = 0.XX]. This is preventable."

**Beat 2: The Cost (15 seconds)**

*Slide the cost calculator to 10,000 patients.*

> "Screen 10,000 patients. Cost: $250,000. Detected early: 1,500 patients. ER costs avoided: over $22 million. The ROI is 89 to 1."

**Beat 3: The Patient Experience (60 seconds)**

*Switch to patient portal.*

> "So what does this look like for a patient?"

*Walk through the flow: Dashboard → Requisition → Results → Summary. Same as Spec 2 lean demo, condensed.*

**Beat 4: The Trigger (30 seconds)**

*Trigger age advance, show email arriving.*

> "And the system runs automatically. When you hit a screening milestone, you get notified."

**Beat 5: The Close (30 seconds)**

> "BC Cancer Screening already does this for cancer. We're applying the same model to the chronic conditions that fill our ERs. The data proves it works. The infrastructure exists. ScreenWell BC."

---

## Charts & Visualizations (Technical Specs)

### Chart Library: Recharts

Use Recharts (comes with shadcn/ui charts). It's React-native, easy to customize, and looks professional.

```bash
npx shadcn@latest add chart
```

### Chart 1: Screening Funnel (Bar Chart)

```typescript
// Horizontal bar chart
const funnelData = [
  { label: "Total Patients", value: 2000, color: "#013366" },
  { label: "Screening Eligible (40+)", value: 1247, color: "#1E5189" },
  { label: "Have Lab Results", value: 823, color: "#3470B1" },
  { label: "No Known Diagnosis", value: 456, color: "#5595D9" },
  { label: "Abnormal Results Detected", value: 187, color: "#CE3E39" },
];
```

### Chart 2: Community Scatter Plot

```typescript
// Scatter plot: X = pct_without_family_doctor, Y = er_visits_per_1000
// Each point = one BC community
// Color = diabetes_prevalence
// Size = population

import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Data from bc_health_indicators.csv
const communityData = indicators.map(c => ({
  name: c.community_name,
  x: c.pct_without_family_doctor,
  y: c.er_visits_per_1000,
  diabetes: c.diabetes_prevalence,
  population: c.population,
}));
```

### Chart 3: Condition Breakdown (Donut Charts)

Three donut charts side by side — one for each condition. Inner number = count of undetected cases.

### Chart 4: Cost Impact (Animated Counter)

Use a counting animation when the cost calculator renders. Numbers roll up from 0 to the final value over 2 seconds.

```typescript
// components/animated-counter.tsx
'use client';
import { useEffect, useState } from 'react';

export function AnimatedCounter({ target, prefix = '$' }: { target: number; prefix?: string }) {
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{prefix}{value.toLocaleString()}</span>;
}
```

---

## File Structure

```
screenwell-bc/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                      # Landing page
│   ├── login/page.tsx
│   ├── dashboard/page.tsx
│   ├── requisition/page.tsx
│   ├── results/page.tsx
│   ├── summary/page.tsx
│   ├── analytics/                    # Population health dashboard ← NEW
│   │   └── page.tsx
│   ├── demo/page.tsx
│   └── api/
│       ├── login/route.ts
│       ├── screening/start/route.ts
│       ├── results/receive/route.ts
│       ├── summary/generate/route.ts
│       └── demo/
│           ├── age-change/route.ts
│           └── send-email/route.ts
├── components/
│   ├── ui/                           # shadcn/ui + charts
│   ├── charts/
│   │   ├── screening-funnel.tsx      # Funnel bar chart
│   │   ├── community-scatter.tsx     # X: unattached, Y: ER visits
│   │   ├── condition-donuts.tsx      # Three condition breakdown donuts
│   │   ├── cost-calculator.tsx       # Interactive cost slider
│   │   └── animated-counter.tsx      # Rolling number animation
│   ├── bc-map.tsx
│   ├── header.tsx
│   ├── result-row.tsx
│   └── status-badge.tsx
├── scripts/
│   └── analyze-hackathon-data.ts     # Runs analysis, outputs JSON
├── lib/
│   ├── screening.ts
│   ├── email.ts
│   ├── demo-data.ts
│   └── analysis.ts                   # Helpers for data analysis
├── data/
│   ├── patients.json                 # Demo patients
│   ├── analysis-results.json         # Output of analysis script
│   ├── hackathon/                    # Raw CSV files
│   │   ├── patients.csv
│   │   ├── lab_results.csv
│   │   ├── encounters.csv
│   │   ├── medications.csv
│   │   ├── vitals.csv
│   │   └── bc_health_indicators.csv
│   └── result-sets.json
├── tailwind.config.ts
└── package.json
```

---

## Build Priority

| Priority | What | Time | Demo Impact |
|---|---|---|---|
| 1 | Analysis script (crunch hackathon data) | 2 hr | Produces THE numbers for the pitch |
| 2 | Analytics dashboard (charts + visualizations) | 2.5 hr | Visual centerpiece |
| 3 | Project setup + BC styling | 30 min | Foundation |
| 4 | Patient portal (lean build from Spec 2) | 3 hr | Complete patient flow |
| 5 | Email integration | 45 min | The "real" moment |
| 6 | Demo controls | 30 min | Enables live demo |
| 7 | Polish + animations | 1 hr | Professional finish |

**Total: ~10 hours**

---

## Why This Approach Could Win

1. **Shows analytical depth.** Most hackathon teams build an app. You built an app AND proved it works with data.
2. **Bridges both tracks.** If the hackathon has Track 1 (Clinical AI) and Track 2 (Population Health), this entry credibly spans both.
3. **The numbers are the pitch.** "15% of eligible patients have undetected abnormal results" is a headline the judges will remember.
4. **Cost analysis sells to decision-makers.** If a judge is a healthcare administrator, the ROI calculator speaks directly to them.
5. **The scatter plot is unforgettable.** A clear visual correlation between "no doctor" and "ER visits" is the kind of insight that wins awards.

## What This Spec Sacrifices

1. Less polish on the patient portal (uses Spec 2 lean build)
2. More complex codebase (analysis script + dashboard + patient app)
3. Risk of spending too much time on data analysis and not enough on the demo
4. If the hackathon data doesn't show the expected patterns, the story weakens

## Risk Mitigation

Run the analysis script FIRST. If the numbers aren't compelling (e.g., very few undetected abnormal results), pivot to Spec 2 or 3 instead. The hackathon data is described as "medically coherent" (diabetics have elevated glucose, etc.), so the patterns should be there — but verify before committing.
