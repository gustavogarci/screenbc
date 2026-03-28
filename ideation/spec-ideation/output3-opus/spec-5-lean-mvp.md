# Spec 5: ScreeningBC — Lean MVP (Ship It in 4 Hours)

> **Approach:** The smallest possible scope that still tells the complete screening story in 3 minutes. Ruthlessly cut everything that doesn't serve the demo. One patient, one journey, one AI moment, done. This is the "we absolutely will finish" spec.

---

## Why a Lean Spec?

Hackathons punish ambition that outpaces execution. The #1 reason teams lose:
- They built 70% of something ambitious instead of 100% of something focused.
- The demo has "and this part isn't finished yet" moments.
- The judge walks away thinking "good idea, poor execution."

This spec is insurance. If your developer picks this, you will have a finished, polished, fully working product with zero rough edges. Every screen is complete. Every button works. The demo flows without a single "imagine this would..." moment.

---

## What's IN

| Feature | Why |
|---------|-----|
| One pre-built patient (Margaret) | No registration flow, no auth complexity |
| Her screening eligibility (pre-calculated) | Shows the clinical logic without building an engine |
| A printable lab requisition | Tangible, real-world artifact |
| Her results (pre-loaded, one button to reveal) | Demo control without a complex admin panel |
| Traffic-light results table | Visual, instant comprehension |
| Streaming AI health summary | The "wow" moment |
| Population stats sidebar | Contextualizes the individual story |
| BC gov visual identity | Credibility and polish |

## What's OUT

| Feature | Why it's cut |
|---------|-------------|
| User registration / login | Time sink, zero demo value |
| Database (SQLite, Postgres, anything) | JSON in-memory is enough |
| Email sending | Just show a mock email screenshot |
| Self-report risk profile form | Pre-build Margaret's profile |
| Chat companion | One AI feature is enough |
| Admin panel | One button on screen to advance the demo |
| Multiple patients | One patient, one great story |
| Lab requisition PDF generation | Styled HTML page with print CSS |
| LifeLabs locator | Link to lifelabs.com, that's it |
| Physician dashboard | Mention in pitch, don't build |
| Mobile responsiveness | Demo is on a laptop |

---

## Architecture

```
screeningbc/
├── app/
│   ├── layout.tsx            # BC gov header + footer
│   ├── page.tsx              # Landing → Margaret's story
│   ├── screening/
│   │   └── page.tsx          # What Margaret needs + lab requisition
│   ├── results/
│   │   └── page.tsx          # Results table + streaming AI summary
│   └── api/
│       └── summary/
│           └── route.ts      # AI streaming endpoint
├── components/
│   ├── ui/                   # Minimal shadcn/ui components
│   ├── bc-header.tsx
│   ├── bc-footer.tsx
│   ├── result-row.tsx
│   └── stats-sidebar.tsx
├── lib/
│   ├── margaret.ts           # All of Margaret's data, hard-coded
│   ├── thresholds.ts         # Clinical thresholds
│   └── population-stats.ts   # Pre-calculated numbers
└── public/
    └── mock-email.png        # Screenshot of the notification email
```

**Total: ~12-15 files.** A developer can hold the entire codebase in their head.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | shadcn/ui (Card, Table, Badge, Button, Separator) |
| Styling | Tailwind CSS with BC gov color overrides |
| AI | Vercel AI SDK v6 + one model string via AI Gateway |
| Data | Hard-coded TypeScript objects (no database, no CSV parsing) |
| Deploy | Vercel (or just `next dev` locally) |

---

## The Data: Margaret's Complete Profile

Hard-code this in `lib/margaret.ts`:

```typescript
export const margaret = {
  id: 'PAT-000001',
  firstName: 'Margaret',
  lastName: 'Chen',
  dateOfBirth: '1972-03-15',
  age: 54,
  sex: 'F',
  postalCode: 'V9Z 0A1', // Sooke
  phn: '9876 543 210',
  
  riskFactors: {
    familyHistoryDiabetes: true,
    familyHistoryHeartDisease: true,
    familyHistoryKidney: false,
    smokingStatus: 'never',
    hasFamilyDoctor: false,
    community: 'Sooke',
    communityUnattachedRate: '33.7%',
  },

  existingConditions: [],  // No known diagnoses — that's the point
  currentMedications: [],  // Not on any treatment
  
  screeningEligibility: {
    diabetes: {
      eligible: true,
      reason: 'Age 54 + family history of diabetes. Recommended per Diabetes Canada: screen all adults 40+ every 3 years.',
      tests: ['HbA1c', 'Fasting Glucose'],
    },
    cholesterol: {
      eligible: true,
      reason: 'Female, age 54 + family history of heart disease. Recommended per CCS Dyslipidemia Guidelines.',
      tests: ['Total Cholesterol', 'LDL Cholesterol', 'HDL Cholesterol', 'Triglycerides'],
    },
    kidneyFunction: {
      eligible: true,
      reason: 'Age 54 (screening recommended for all adults 50+). Per BC CKD Guidelines.',
      tests: ['Creatinine', 'eGFR'],
    },
  },

  labResults: {
    collectedDate: '2026-03-26',
    results: [
      { test: 'HbA1c', value: 6.3, unit: '%', refLow: null, refHigh: 5.6, status: 'borderline', tier: 'Pre-diabetes (6.0–6.4%)' },
      { test: 'Fasting Glucose', value: 6.4, unit: 'mmol/L', refLow: 3.9, refHigh: 6.0, status: 'borderline', tier: 'Impaired fasting glucose (6.1–6.9)' },
      { test: 'Total Cholesterol', value: 6.1, unit: 'mmol/L', refLow: null, refHigh: 5.2, status: 'borderline', tier: 'Borderline high (5.2–6.2)' },
      { test: 'LDL Cholesterol', value: 4.2, unit: 'mmol/L', refLow: null, refHigh: 3.5, status: 'abnormal', tier: 'Above target (>3.5)' },
      { test: 'HDL Cholesterol', value: 1.4, unit: 'mmol/L', refLow: 1.0, refHigh: null, status: 'normal', tier: 'Healthy' },
      { test: 'Triglycerides', value: 1.8, unit: 'mmol/L', refLow: null, refHigh: 1.7, status: 'normal', tier: 'Normal' },
      { test: 'Creatinine', value: 72, unit: 'µmol/L', refLow: 45, refHigh: 90, status: 'normal', tier: 'Normal' },
      { test: 'eGFR', value: 85, unit: 'mL/min/1.73m²', refLow: 90, refHigh: null, status: 'normal', tier: 'Normal kidney function' },
    ],
  },

  framinghamScore: {
    score: 12,
    riskLevel: 'Intermediate',
    inputs: 'Age 54, Female, Non-smoker, SBP 128, TC 6.1, HDL 1.4, No diabetes',
    interpretation: '12% chance of a cardiovascular event in the next 10 years.',
  },
};

export const populationStats = {
  totalPatients: 2000,
  eligibleForScreening: 842,
  noExistingDiagnosis: 427,
  abnormalResultsDetected: 243,
  detectionRate: 56.9,
  
  byCondition: {
    prediabetes: { count: 148, rate: 34.7 },
    highCholesterol: { count: 187, rate: 43.8 },
    impairedKidney: { count: 52, rate: 12.2 },
  },

  topCommunities: [
    { name: 'Mission', unattachedRate: 38.2, erVisits: 412 },
    { name: 'Sooke', unattachedRate: 33.7, erVisits: 367 },
    { name: 'East Kootenay', unattachedRate: 31.7, erVisits: 389 },
    { name: 'Prince George', unattachedRate: 29.0, erVisits: 401 },
  ],

  costComparison: {
    screeningCostPerPerson: 50,
    undetectedDiabetesAnnualCost: 15000,
    managedDiabetesAnnualCost: 3600,
    dialysisAnnualCost: 90000,
    managedCKDAnnualCost: 5000,
  },
};
```

**IMPORTANT NOTE FOR DEVELOPER:** The `populationStats` numbers above are placeholder estimates. Before finalizing, you MUST run the actual analysis on the hackathon CSVs to get real numbers. Use this script:

```python
import pandas as pd

patients = pd.read_csv('data/patients.csv')
encounters = pd.read_csv('data/encounters.csv')
labs = pd.read_csv('data/lab_results.csv')
meds = pd.read_csv('data/medications.csv')

# Eligible: age >= 40
eligible = patients[patients['age'] >= 40]

# Already diagnosed: check encounters for diabetes/lipid/CKD codes
diabetes_codes = ['E11.9', 'E11.0', 'E11.2', 'E11.4', 'E11.6', 'E13.9']
lipid_codes = ['E78.0', 'E78.1', 'E78.2', 'E78.5']
ckd_codes = ['N18.1', 'N18.2', 'N18.3', 'N18.4', 'N18.5', 'N18.9']

diagnosed_patients = encounters[
    encounters['diagnosis_code'].isin(diabetes_codes + lipid_codes + ckd_codes)
]['patient_id'].unique()

# Already treated
diabetes_drugs = ['metformin', 'glyburide', 'sitagliptin', 'empagliflozin', 'insulin']
statin_drugs = ['atorvastatin', 'rosuvastatin', 'simvastatin', 'pravastatin']
kidney_drugs = ['ramipril', 'lisinopril', 'enalapril', 'losartan', 'candesartan']

treated = meds[meds['drug_name'].str.lower().isin(
    [d.lower() for d in diabetes_drugs + statin_drugs + kidney_drugs]
)]['patient_id'].unique()

# Undiagnosed + untreated eligible patients
gap = eligible[
    ~eligible['patient_id'].isin(diagnosed_patients) & 
    ~eligible['patient_id'].isin(treated)
]

# Check their labs
hba1c_abnormal = labs[
    (labs['patient_id'].isin(gap['patient_id'])) & 
    (labs['test_name'] == 'HbA1c') & 
    (labs['value'] >= 6.0)
]

# ... similar for glucose, cholesterol, creatinine

print(f"Eligible: {len(eligible)}")
print(f"Gap (undiagnosed): {len(gap)}")
print(f"Abnormal HbA1c in gap: {len(hba1c_abnormal)}")
```

Replace placeholder numbers with real ones before building the dashboard.

---

## Screens (Only 3 Pages + Landing)

### Screen 1: Landing Page (`/`)

```
┌─────────────────────────────────────────────────────┐
│  [BC Gov Header - Blue #013366]                      │
│  ScreeningBC — Preventive Health Screening           │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌───────────────────────────────────────────────┐   │
│  │                                               │   │
│  │  No family doctor?                            │   │
│  │  Get screened for the conditions              │   │
│  │  that matter most.                            │   │
│  │                                               │   │
│  │  Diabetes • Cholesterol • Kidney Disease      │   │
│  │                                               │   │
│  │  [See How It Works →]                         │   │
│  │                                               │   │
│  └───────────────────────────────────────────────┘   │
│                                                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │  1 in 3     │ │  1 in 250   │ │  1 in 10    │   │
│  │  Canadians  │ │  Canadians  │ │  Canadians  │   │
│  │  with       │ │  have FH    │ │  have CKD   │   │
│  │  diabetes   │ │  (undetected│ │  (most don't│   │
│  │  are        │ │  high       │ │  know)      │   │
│  │  undiagnosed│ │  cholesterol│ │             │   │
│  └─────────────┘ └─────────────┘ └─────────────┘   │
│                                                      │
│  Context: Over 1 million BC residents don't have     │
│  a family doctor. Without a doctor, nobody orders    │
│  your routine blood work.                            │
│                                                      │
│  [View Margaret's Screening Journey →]               │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Demo note:** The "View Margaret's Screening Journey" button goes directly to `/screening`. No login.

### Screen 2: Screening Eligibility + Requisition (`/screening`)

Two-column layout. Left: Margaret's profile + eligibility. Right: Population context.

**Left column (70%):**
```
Patient: Margaret Chen
Age: 54  |  Sex: Female  |  Community: Sooke  |  PHN: 9876 543 210

Risk Factors:
  ✓ Family history of diabetes (father)
  ✓ Family history of heart disease (mother)
  ✗ No family doctor

─────────────────────────────────────────────

SCREENING RECOMMENDED

┌─ Diabetes Screening ─────────────────────┐
│  Tests: HbA1c, Fasting Glucose           │
│  Why: Age 54 + family history.           │
│  Guideline: Diabetes Canada — all 40+    │
│  every 3 years                           │
└──────────────────────────────────────────┘

┌─ Cholesterol Screening ──────────────────┐
│  Tests: Total, LDL, HDL, Triglycerides   │
│  Why: Female 54 + family history of      │
│  heart disease.                          │
│  Guideline: CCS Dyslipidemia — women 50+│
└──────────────────────────────────────────┘

┌─ Kidney Function ────────────────────────┐
│  Tests: Creatinine, eGFR                 │
│  Why: Age 54 (recommended 50+)           │
│  Guideline: BC CKD Guidelines            │
└──────────────────────────────────────────┘

[📄 View Lab Requisition]  [🖨️ Print Requisition]

─────────────────────────────────────────────

📧 Screening Invitation Email (sent Mar 25)
[Show mock email screenshot]
```

**Right column (30%) — Stats sidebar:**
```
THE SCREENING GAP

In Margaret's community of Sooke:
  33.7% of residents don't have 
  a family doctor.

Across our dataset:
  842 patients eligible
  427 with no diagnosis
  57% with abnormal results
  that nobody caught

─────────────────

COST OF MISSING IT

Screening: $50/person
Unmanaged diabetes: $15,000/year
Dialysis: $90,000/year
```

### Screen 3: Results + AI Summary (`/results`)

This is the big screen. The demo spends the most time here.

**State 1: Before results (briefly shown)**
"Awaiting lab results. You'll receive an email when they're ready."

**State 2: Results revealed** (toggled by a button — visible during demo, could be hidden in "production")

```
YOUR SCREENING RESULTS — March 28, 2026

┌────────────────────────────────────────────────────────┐
│  Test              │ Result    │ Status     │ Range    │
│────────────────────│───────────│────────────│──────────│
│  HbA1c             │ 6.3%      │ 🟡 Border. │ <5.7%   │
│  Fasting Glucose   │ 6.4 mmol/L│ 🟡 Border. │ <6.1    │
│  LDL Cholesterol   │ 4.2 mmol/L│ 🔴 High    │ <3.5    │
│  Total Cholesterol  │ 6.1 mmol/L│ 🟡 Border. │ <5.2    │
│  HDL Cholesterol   │ 1.4 mmol/L│ 🟢 Normal  │ >1.0    │
│  Triglycerides     │ 1.8 mmol/L│ 🟢 Normal  │ <1.7    │
│  Creatinine / eGFR │ 85 mL/min │ 🟢 Normal  │ >60     │
└────────────────────────────────────────────────────────┘

Framingham 10-Year Risk: 12% — INTERMEDIATE
Based on: Age 54, Female, Non-smoker, SBP 128, TC 6.1, HDL 1.4

─────────────────────────────────────────────────────────

YOUR PERSONALIZED HEALTH SUMMARY
[AI-generated, streaming in real-time]

Hi Margaret. Here's what your screening found:

**Diabetes Screening: Borderline — Pre-diabetes**
Your HbA1c is 6.3%, which falls in the pre-diabetes range (6.0–6.4%). 
This means your blood sugar is higher than normal but not yet diabetes. 
About 50% of people with pre-diabetes develop type 2 diabetes within 
5–10 years without intervention — but the good news is that lifestyle 
changes can reduce that risk by up to 58%.

What you can do:
• 150 minutes of moderate exercise per week
• Reduce refined carbohydrates and added sugars
• Aim for 5–7% weight loss if overweight

Rescreen: 6 months

**Cholesterol: Above Target — Further Assessment Recommended**
Your LDL cholesterol is 4.2 mmol/L (target for most adults: below 3.5). 
Combined with your age and family history of heart disease, your 
Framingham cardiovascular risk score is 12% — intermediate risk.

This means you have roughly a 1-in-8 chance of a cardiovascular event 
in the next 10 years. Canadian guidelines recommend discussing statin 
therapy with a healthcare provider when Framingham risk is 10% or higher.

Next step: Book an appointment at your nearest UPCC or walk-in clinic. 
Bring this summary.

**Kidney Function: Normal**
Your eGFR is 85 mL/min — healthy kidney function. No action needed.
Rescreen in 3 years.

─────────────────────────────────────────────────────────

NEXT STEPS
• Book at a UPCC: healthlinkbc.ca/find-care
• Call HealthLink BC: 8-1-1
• Next screening due: September 2026

[🖨️ Print This Summary]
```

---

## AI System Prompt

```
You are ScreeningBC's health summary generator. You produce personalized, 
plain-language health summaries for patients who have completed preventive 
screening blood work.

PATIENT CONTEXT (provided per request):
- Name, age, sex
- Risk factors (family history, smoking, etc.)
- Lab results with values and reference ranges
- Framingham risk score (if applicable)

GUIDELINES:
1. Address the patient by first name. Be warm but professional.
2. For each condition area (diabetes, cholesterol, kidney), explain:
   - What was tested
   - What their specific result means (not just "normal/abnormal" — explain the number)
   - Risk tier and clinical significance
   - Evidence-based lifestyle recommendations
   - When to rescreen
3. Use Canadian clinical guidelines (Diabetes Canada, CCS, KDIGO, BC CKD Guidelines).
4. If results are abnormal or borderline, provide specific next steps:
   - Recommend visiting a UPCC (Urgent and Primary Care Centre) or walk-in clinic
   - Mention HealthLink BC 8-1-1 as a resource
   - Suggest bringing the screening summary to the appointment
5. Include the Framingham Risk Score interpretation if cholesterol is elevated.
6. NEVER diagnose. Use language like "your results suggest" or "this falls in the range of."
7. ALWAYS include: "This summary is for informational purposes. Please consult a 
   healthcare provider for medical advice."
8. Keep the tone empathetic and empowering. The patient should feel informed, not scared.
9. Format with markdown: bold for condition headings, bullet lists for recommendations.
```

---

## Build Order (4-5 Hours, Buffer Included)

### Hour 1: Skeleton (45 min)
1. `npx create-next-app@latest screeningbc --typescript --tailwind --app`
2. `npx shadcn@latest init` → configure BC gov colors in `globals.css`
3. Install: `npx shadcn@latest add card table badge button separator`
4. Build `bc-header.tsx` and `bc-footer.tsx`
5. Create `lib/margaret.ts` with all hard-coded data
6. Build the landing page (`/`)

### Hour 2: Screening Page (45 min)
7. Build `/screening` with two-column layout
8. Left: Margaret's profile + eligibility cards
9. Right: Population stats sidebar
10. Lab requisition section (styled HTML, not PDF — just use print CSS)
11. Mock email screenshot

### Hour 3: Results Page (60 min)
12. Build `/results` with results table
13. Traffic-light badges (green/yellow/red using shadcn Badge with custom colors)
14. Framingham Risk Score display
15. "Reveal Results" toggle button for demo
16. Set up AI SDK streaming endpoint (`/api/summary`)

### Hour 4: AI Summary (60 min)
17. Write the system prompt
18. Build the streaming summary section on the results page
19. Connect to AI Gateway (or direct provider if Gateway not set up)
20. Test the streaming — make sure it looks good, reads well, is accurate
21. Iterate on the system prompt until the output is consistently good

### Hour 5: Polish + Deploy (60 min)
22. Visual polish: spacing, alignment, transitions
23. Add subtle animations (fade-in for results rows)
24. Deploy to Vercel
25. Test the full demo flow end-to-end
26. Rehearse timing (fit in 3 minutes)

**Total estimated dev time: 4-5 hours.** Leaves 3+ hours of buffer in an 8-hour hackathon.

---

## Demo Script (3 Minutes, Tight)

### 0:00-0:30 — Problem + Solution
"Over a million BC residents don't have a family doctor. No doctor means no blood work, no screening, no early detection. BC screens for cancer — but not for diabetes, cholesterol, or kidney disease. We built ScreeningBC to close that gap."

*Show landing page briefly*

### 0:30-1:00 — Margaret's Story
"Meet Margaret. She's 54, lives in Sooke where a third of people don't have a doctor. She has a family history of diabetes and heart disease. Nobody has ever screened her."

*Show screening page: eligibility, the reasons, the requisition*

"The system determines she's due for three screening panels based on Canadian clinical guidelines. It generates a lab requisition. She walks into LifeLabs."

### 1:00-1:15 — Transition
"Two days later, her blood work comes back."

*Click the reveal button on the results page*

### 1:15-2:15 — Results + AI (The Money Minute)
"Green is healthy. Yellow is borderline. Red needs attention."

*Point to the traffic lights*

"Margaret's HbA1c is 6.3% — pre-diabetes. Her LDL is 4.2 — above target. Her Framingham risk is 12%, intermediate. Her kidneys are fine."

"Now watch this."

*Scroll to the AI summary section — it starts streaming*

*Let it stream for 15-20 seconds*

"The system generates a personalized explanation in real time. Not medical jargon — plain language. What pre-diabetes means for her. What her cholesterol numbers mean combined with her family history. What to do next. Where to go."

### 2:15-2:35 — The Numbers
*Point to the stats sidebar*

"Across our dataset, 57% of eligible but undiagnosed patients had abnormal results that nobody caught. In communities like Sooke, Mission, Prince George — where people can't find doctors — that's hundreds of people heading toward the ER."

### 2:35-3:00 — The Close
"Screening costs $50. Unmanaged diabetes costs $15,000 a year. Dialysis costs $90,000. BC Cancer Screening proves this model works. One supervising physician, standardized requisitions, LifeLabs infrastructure. We're not asking the system to change — we're filling the gap it doesn't know it has."

---

## Why This Spec Might Win

1. **It will be finished.** Every button works. Every screen is polished. Zero "imagine this would..." moments.
2. **The demo is tight.** 3 minutes, no wasted time, no fumbling between half-built screens.
3. **One powerful AI moment > three mediocre ones.** The streaming summary is the entire technical showcase, and it gets the full audience attention.
4. **Judge-proof.** There's nothing to poke holes in. The clinical logic is simple and defensible. The AI is scoped to explanation, not diagnosis. The data is synthetic.
5. **Buffer time = polish time.** While other teams debug their database connections at hour 7, you're adding animations and rehearsing your pitch.

## Why This Spec Might Lose

1. **Less technically impressive on paper.** Judges who value feature count might rank it lower than a team with chat + email + database + multiple patients.
2. **One patient is limiting.** If a judge asks "what about patient X?" you can only talk about Margaret.
3. **No email demo.** Other specs send real emails. This one shows a screenshot. Less dramatic.
4. **The population stats are stated, not proven.** You're showing hard-coded numbers in a sidebar instead of an interactive dashboard that analyzes the data live.

## When to Pick This Spec

- Your developer is working alone or with minimal help
- You want guaranteed completion over impressive ambition
- Your team is stronger at presentation/pitch than at coding
- You're worried about running out of time
- You want to spend more time rehearsing the pitch and less time debugging
