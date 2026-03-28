# Spec 1: ScreeningBC — The Full Patient Portal

> **Approach:** Your original vision. Full patient-facing portal with mock provincial health record system, email notification triggers, lab result ingestion, and AI interpretation. Maximum feature breadth.

---

## Name: ScreeningBC

**Why this name:**
- "CheckUp BC" is fine but generic. "GetChecked" is taken (BCCDC's STI testing service at getcheckedonline.com).
- "ScreeningBC" mirrors the real BC Cancer Screening program's branding at screeningbc.ca. It immediately communicates: "this is a government screening program." It feels official, trustworthy, and distinctly BC.
- Alternative names if ScreeningBC feels too close to the cancer program: **PreventBC**, **ScreenBC**, **MyScreening BC**

---

## Visual Identity & Design

### Match the BC Government Design System
This is critical for credibility with judges. The app should look like it could live on a `.gov.bc.ca` domain.

**Colors (exact hex codes from BC Design System v4.0.0):**
| Token | Hex | Use |
|-------|-----|-----|
| Primary Blue | `#013366` | Header, primary buttons, nav bar |
| Primary Blue Hover | `#1E5189` | Button hover states |
| Primary Gold | `#FCBA19` | Accent, highlights, notification badges |
| Link Blue | `#255A90` | All hyperlinks |
| Success Green | `#42814A` | Normal/healthy results |
| Danger Red | `#CE3E39` | Abnormal results, urgent alerts |
| Warning Gold | `#F8BB47` | Borderline results |
| Background | `#FAF9F8` | Page background (light gray) |
| Light Blue BG | `#F1F8FE` | Card backgrounds, info sections |
| Text Primary | `#2D2D2D` | Body text |
| Text Secondary | `#474543` | Secondary text |
| Border Light | `#D8D8D8` | Card borders, dividers |

**Typography:**
- Use `BC Sans` (the mandatory BC government font). It's open-source: https://www2.gov.bc.ca/gov/content/digital/design-system/foundations/typography
- For the hackathon prototype, use `Noto Sans` as a near-identical substitute (BC Sans is a modified Noto Sans). Available on Google Fonts.
- Heading 1: 36px/700, Heading 2: 32px/700, Body: 16px/400

**Logo/Header:**
- Top-left: BC government-style header bar in `#013366` with white text
- Include a simple shield or health-cross icon
- Text: "ScreeningBC" in white, subtitle: "Preventive Health Screening for British Columbians"

**Design Reference:**
- Look at healthgateway.gov.bc.ca for the general layout feel
- Look at screeningbc.ca for the screening-specific messaging tone
- Cards with light borders, clean white backgrounds, generous spacing
- Traffic-light color system for results: green (`#42814A`), yellow (`#F8BB47`), red (`#CE3E39`)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│                    Next.js App Router                            │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │ Patient   │ │ Lab Req  │ │ Results  │ │ AI Chat          │   │
│  │ Portal    │ │ Generator│ │ Dashboard│ │ Companion        │   │
│  └─────┬────┘ └─────┬────┘ └─────┬────┘ └────────┬─────────┘   │
│        │             │            │                │             │
│  ┌─────▼─────────────▼────────────▼────────────────▼──────────┐ │
│  │                    API Routes (Next.js)                     │ │
│  │  /api/auth      /api/patient    /api/screening              │ │
│  │  /api/results   /api/email      /api/chat                   │ │
│  └─────────────────────┬──────────────────────────────────────┘ │
│                        │                                        │
│  ┌─────────────────────▼──────────────────────────────────────┐ │
│  │                MOCK PROVINCIAL SYSTEM                       │ │
│  │    "CareConnect Lite" — Simulated EHR                      │ │
│  │    Pre-loaded with hackathon CSV data                      │ │
│  │    Patients, encounters, labs, medications, vitals          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              AI Layer (Vercel AI SDK + Gateway)             ││
│  │  • Result interpretation → personalized summaries           ││
│  │  • Chat companion → evidence-based Q&A                      ││
│  │  • Risk scoring → Framingham, screening eligibility         ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              Email Service (Resend or nodemailer)           ││
│  │  • Screening due notifications                              ││
│  │  • Results ready notifications                              ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Tech Stack
| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 16 (App Router) | SSR, API routes, server actions — one codebase |
| UI | shadcn/ui + Tailwind CSS | Closest to BC gov design system, fast to build |
| Database | SQLite via better-sqlite3 (or Postgres via Neon) | Zero-config for hackathon, pre-load CSVs |
| AI | Vercel AI SDK v6 + AI Gateway | Chat companion, summary generation |
| Email | Resend (free tier) or Nodemailer with Ethereal | Notification emails |
| Auth | Simple PHN + DOB login (no real auth needed for demo) | Simulates BC Services Card login |
| Deployment | Vercel | One-click deploy, free tier |

---

## Data Model

### Pre-loaded from hackathon CSVs
The "mock provincial system" is simply the hackathon CSV data loaded into a database at build time.

**patients table** (from patients.csv — 2,000 records):
- `patient_id`, `first_name`, `last_name`, `date_of_birth`, `age`, `sex`, `postal_code`, `blood_type`, `insurance_number` (this is the PHN), `primary_language`, `emergency_contact_phone`

**encounters table** (from encounters.csv — 10,000 records):
- `encounter_id`, `patient_id`, `encounter_date`, `encounter_type`, `facility`, `chief_complaint`, `diagnosis_code`, `diagnosis_description`, `triage_level`, `disposition`, `length_of_stay_hours`, `attending_physician`

**lab_results table** (from lab_results.csv — 3,000 records):
- `lab_id`, `patient_id`, `encounter_id`, `test_name`, `test_code`, `value`, `unit`, `reference_range_low`, `reference_range_high`, `abnormal_flag`, `collected_date`

**medications table** (from medications.csv — 5,000 records):
- `medication_id`, `patient_id`, `drug_name`, `drug_code`, `dosage`, `frequency`, `route`, `prescriber`, `start_date`, `end_date`, `active`

**vitals table** (from vitals.csv — 2,000 records):
- `vitals_id`, `patient_id`, `encounter_id`, `heart_rate`, `systolic_bp`, `diastolic_bp`, `temperature_celsius`, `respiratory_rate`, `o2_saturation`, `pain_scale`, `recorded_at`

### Application-specific tables (created by the app)
- **screening_profiles**: `patient_id`, `registered_at`, `email`, `family_history_diabetes`, `family_history_heart`, `family_history_kidney`, `smoking_status`, `self_reported_conditions`, `last_screening_date`, `next_screening_due`
- **screening_results**: `id`, `patient_id`, `screening_date`, `test_name`, `value`, `unit`, `risk_tier` (normal/borderline/abnormal), `interpretation`, `recommendation`, `next_screening_date`
- **notifications**: `id`, `patient_id`, `type` (screening_due/results_ready/urgent), `sent_at`, `email_content`, `status`

---

## Screens & User Flows

### Flow 1: Patient Registration & Onboarding

**Screen: Landing Page** (`/`)
- Hero section: "Preventive Health Screening for British Columbians"
- Subtitle: "No family doctor? No problem. Get screened for diabetes, high cholesterol, and kidney disease."
- CTA button: "Check Your Screening Status"
- Below: Brief explanation of the three conditions screened, with stats ("1 in 3 Canadians with diabetes are undiagnosed")
- Footer: "A service of ScreeningBC. Supervised by [Dr. Name]. This is not a substitute for medical advice."

**Screen: Login/Register** (`/login`)
- Simple form: PHN (insurance_number) + Date of Birth
- This simulates BC Services Card authentication
- On submit: look up patient in the `patients` table
- If found → pull all their data from the mock provincial system
- If not found → show "Register as a new patient" form

**Screen: Risk Profile** (`/profile`)
- Shows the data pulled from the "provincial system": name, age, sex, existing diagnoses, current medications
- Additional self-report form:
  - Family history checkboxes: diabetes, heart disease, kidney disease, high cholesterol
  - Smoking status: never / former / current
  - Known conditions not in the system
  - Upload section: "Upload any relevant medical documents" (PDF/image upload, stored as metadata)
  - Email address for notifications
- Save → system calculates screening eligibility

### Flow 2: Screening Eligibility & Lab Requisition

**Screen: Screening Status** (`/screening`)
- Based on age, sex, risk factors, and existing conditions, the system determines:
  - Which tests are due (HbA1c, lipid panel, creatinine/eGFR)
  - When they're due (now, in X months, in X years)
  - Why they're recommended (e.g., "You're 54 and female. Canadian guidelines recommend cholesterol screening for all women over 50.")
- Uses BC Lifetime Prevention Schedule criteria:
  - Diabetes (Type 2): Screen age 40+ every 3 years, or earlier with risk factors
  - Cardiovascular/Lipids: Screen age 40+ (men) or 50+ (women) every 1-5 years
  - CKD: Screen age 50+ every 3 years, or earlier if diabetes/hypertension
- Traffic-light indicators for each test: "Due now" (red), "Due soon" (yellow), "Up to date" (green)

**Screen: Lab Requisition** (`/requisition`)
- Clean, printable lab requisition PDF:
  - Patient name, PHN, DOB, sex
  - Tests ordered: HbA1c, Fasting Glucose, Lipid Panel (Total Cholesterol, LDL, HDL, Triglycerides), Creatinine with eGFR calculation
  - Ordering physician: "Dr. [Partner's Name], ScreeningBC Medical Director"
  - Date ordered
  - Note: "Please present this requisition at any LifeLabs location"
- Below the PDF: "Find a LifeLabs near you" with a link to lifelabs.com/locations
- Print button, download PDF button

### Flow 3: Demo Trigger — Age Advancement (The "Time Travel" Button)

**THIS IS THE KEY DEMO FEATURE.** During the live demo, you need to show the full cycle. You can't wait for someone to actually age.

**Admin Panel** (`/admin`)
- Simple control panel (password-protected or hidden behind a URL parameter)
- "Advance time" button: sets a patient's effective age to a specific value
  - Example: Set Margaret Johnson (currently 51) to age 54 → system recalculates screening eligibility → she's now due for screening
- "Trigger screening notification" button: sends the email immediately for any eligible patient
- "Simulate lab results" button: injects pre-crafted lab results into the system for a patient
  - Has preset scenarios: "Normal results", "Pre-diabetes + high cholesterol", "Urgent: very high blood sugar"
- Patient selector dropdown to pick which patient to demo with

### Flow 4: Email Notification — Screening Due

When screening becomes due (triggered by age advancement or time-based check):

**Email sent to patient:**
```
Subject: ScreeningBC — You're Due for Health Screening

Hi Margaret,

Based on your age and health profile, it's time for your preventive health screening.

BC guidelines recommend screening for:
• Diabetes (HbA1c and fasting glucose)  
• Cholesterol (lipid panel)
• Kidney function (creatinine/eGFR)

Your lab requisition is ready. Sign in to ScreeningBC to view and print it, 
then visit any LifeLabs location to complete your blood work.

→ View Your Requisition: [link to /requisition]

This screening is supervised by Dr. [Name] and follows Canadian clinical 
practice guidelines.

Questions? Visit screeningbc.ca or call HealthLink BC at 8-1-1.

— ScreeningBC
```

### Flow 5: Results Ingestion

**Two methods (for the demo, use method 2):**

1. **Simulated automatic ingestion**: The admin panel "simulate lab results" button injects results
2. **Manual upload**: Patient can upload a lab results document (or paste values) on a `/results/upload` page

When results arrive:
- System classifies each result using the clinical thresholds (see Clinical Logic below)
- If any result is abnormal → trigger urgent email
- Otherwise → trigger "results ready" email

**Email sent to patient:**
```
Subject: ScreeningBC — Your Lab Results Are Ready

Hi Margaret,

Your screening lab results are now available. Sign in to ScreeningBC to 
view your personalized health summary.

→ View Your Results: [link to /results]

If you have questions about your results, our AI health companion can 
help explain them in plain language.

— ScreeningBC
```

### Flow 6: Results Dashboard

**Screen: Results Dashboard** (`/results`)
- Summary card at top: "Screening completed on March 28, 2026"
- Results table with traffic-light colors:

| Test | Your Result | Status | What It Means |
|------|-------------|--------|---------------|
| HbA1c | 6.3% | 🟡 Borderline | Pre-diabetes range |
| Fasting Glucose | 6.4 mmol/L | 🟡 Borderline | Consistent with pre-diabetes |
| LDL Cholesterol | 4.2 mmol/L | 🔴 High | Above target |
| Total Cholesterol | 6.1 mmol/L | 🟡 Borderline | Slightly elevated |
| HDL Cholesterol | 1.4 mmol/L | 🟢 Normal | Healthy level |
| Triglycerides | 1.8 mmol/L | 🟢 Normal | Healthy level |
| Creatinine / eGFR | 85 mL/min | 🟢 Normal | Healthy kidney function |

- Each row expandable to show:
  - Reference range
  - What this test measures
  - What your specific value means
  - Canadian guideline source

### Flow 7: AI-Generated Personalized Health Summary

**Screen: Your Health Summary** (`/results/summary`)
- AI generates a plain-language one-page summary using the patient's results, age, sex, risk factors
- Uses the AI SDK `streamText` → streamed to the page in real-time (visually impressive for the demo)
- Content structure:
  1. Greeting with patient name
  2. For each condition area (diabetes, cholesterol, kidney):
     - What was tested
     - What the result means **for them specifically**
     - Risk tier and what it implies
     - Evidence-based lifestyle recommendations
     - Rescreen timeline
  3. If applicable: Framingham Risk Score calculation with explanation
  4. Next steps (book UPCC appointment, lifestyle changes, etc.)
  5. "Bring this summary to your next healthcare appointment" callout
- Print/PDF download button

### Flow 8: AI Chat Companion

**Screen: Chat** (`/chat`)
- Chat interface (use AI Elements from Vercel for the UI components)
- System prompt scoped to:
  - The patient's specific results
  - Canadian clinical guidelines
  - Lifestyle recommendations
  - Never diagnose, always refer to healthcare provider for clinical decisions
- Example questions pre-populated as suggestion chips:
  - "What does an HbA1c of 6.3% mean?"
  - "What foods should I avoid for pre-diabetes?"
  - "Where's the nearest UPCC?"
  - "Should I be worried about my cholesterol?"
- Safety footer: "This AI provides general health information only. It is not a substitute for medical advice."

---

## Clinical Logic (Algorithmic — No AI Needed)

### Screening Eligibility Rules

```javascript
function getScreeningEligibility(patient, riskFactors) {
  const tests = [];
  
  // Diabetes screening
  if (patient.age >= 40 || riskFactors.familyHistoryDiabetes || 
      riskFactors.obesity || riskFactors.previousPrediabetes) {
    tests.push({
      name: 'Diabetes Panel',
      tests: ['HbA1c', 'Fasting Glucose'],
      frequency: riskFactors.previousPrediabetes ? '6 months' : '3 years',
      reason: patient.age >= 40 
        ? 'Recommended for all adults 40+ (Diabetes Canada)'
        : 'Recommended due to risk factors'
    });
  }

  // Lipid screening
  if ((patient.sex === 'M' && patient.age >= 40) || 
      (patient.sex === 'F' && patient.age >= 50) ||
      riskFactors.familyHistoryHeart) {
    tests.push({
      name: 'Lipid Panel',
      tests: ['Total Cholesterol', 'LDL', 'HDL', 'Triglycerides'],
      frequency: '1-5 years based on risk',
      reason: 'Recommended per CCS Dyslipidemia Guidelines'
    });
  }

  // CKD screening
  if (patient.age >= 50 || riskFactors.diabetes || 
      riskFactors.hypertension || riskFactors.familyHistoryKidney) {
    tests.push({
      name: 'Kidney Function',
      tests: ['Creatinine', 'eGFR'],
      frequency: '3 years',
      reason: 'Recommended per BC CKD Guidelines'
    });
  }

  return tests;
}
```

### Result Classification Thresholds

```javascript
const THRESHOLDS = {
  'HbA1c': {
    unit: '%',
    normal: { max: 5.9 },
    borderline: { min: 6.0, max: 6.4, label: 'Pre-diabetes' },
    abnormal: { min: 6.5, label: 'Diabetes range' }
  },
  'Fasting Glucose': {
    unit: 'mmol/L',
    normal: { max: 6.0 },
    borderline: { min: 6.1, max: 6.9, label: 'Impaired fasting glucose' },
    abnormal: { min: 7.0, label: 'Diabetes range' }
  },
  'Total Cholesterol': {
    unit: 'mmol/L',
    normal: { max: 5.2 },
    borderline: { min: 5.2, max: 6.2, label: 'Borderline high' },
    abnormal: { min: 6.2, label: 'High' }
  },
  'LDL Cholesterol': {
    unit: 'mmol/L',
    normal: { max: 3.4 },
    borderline: { min: 3.5, max: 4.9, label: 'Above target' },
    abnormal: { min: 5.0, label: 'High — possible familial hypercholesterolemia' }
  },
  'Creatinine': {
    // Convert to eGFR using CKD-EPI equation
    unit: 'umol/L',
    // eGFR thresholds:
    normal: { eGFR_min: 90 },
    borderline: { eGFR_min: 60, eGFR_max: 89, label: 'Mildly reduced kidney function' },
    abnormal: { eGFR_max: 59, label: 'Moderate to severe kidney impairment' }
  }
};
```

### Framingham Risk Score

For cholesterol risk stratification. Inputs from patient data + vitals:
- Age, sex
- Total cholesterol, HDL cholesterol
- Systolic blood pressure (from vitals table)
- Smoking status (from risk profile)
- Diabetes status (from encounters/diagnoses)

Output: 10-year cardiovascular risk percentage.
- Low (< 10%): lifestyle only
- Intermediate (10-19%): discuss statin therapy
- High (≥ 20%): statin therapy recommended

---

## Demo Script (3 Minutes)

### Minute 0:00–0:30 — The Problem
"Over a million British Columbians don't have a family doctor. When you don't have a doctor, nobody orders your blood work. Nobody screens you for diabetes, high cholesterol, or kidney disease. These conditions develop silently — and then they explode in the ER. BC already runs centralized screening for cancer. We built the same thing for chronic disease."

### Minute 0:30–1:00 — Patient Onboarding
- Show landing page
- Log in as Margaret Johnson (PHN + DOB)
- System pulls her records from the "provincial system"
- She fills in family history (father had diabetes, mother had heart disease)
- System determines: "You're 54, female, with family history. You're due for diabetes, cholesterol, and kidney screening."

### Minute 1:00–1:30 — The Trigger & Requisition
- Show the generated lab requisition (clean, printable, looks real)
- "Margaret gets an email saying she's due for screening"
- Show the email (have it pre-sent to a real inbox for the demo)
- "She takes this to LifeLabs, gets her blood drawn"

### Minute 1:30–2:15 — Results Come Back
- Go to admin panel → "Simulate lab results" → select "Pre-diabetes + high cholesterol" scenario
- Switch back to patient view → refresh
- Show the results dashboard with traffic-light colors
- Click into the AI-generated health summary → stream it in real-time
- "The system explains in plain language: your blood sugar is borderline, here's what pre-diabetes means, here's what you can do"
- Show the Framingham Risk Score: "Intermediate risk — 12%. Combined with the cholesterol, she should see a doctor."

### Minute 2:15–2:45 — AI Chat + Escalation
- Open the chat: "What does pre-diabetes mean?"
- AI explains in plain language, provides dietary suggestions, always says "speak with a healthcare provider"
- Show the "Next Steps" section: nearest UPCC locations, HealthLink BC 811

### Minute 2:45–3:00 — The Pitch
"In our analysis of the hackathon data, X% of patients over 50 had abnormal results with no diagnosis on file. In communities like Mission, where 38% of people don't have a doctor, this service could catch thousands of people before they end up in the ER. The infrastructure already exists — LifeLabs, UPCCs, 811. We're not asking the system to change. We're filling the gap that nobody is filling."

---

## File Structure

```
screeningbc/
├── app/
│   ├── layout.tsx                    # Root layout with BC gov header/footer
│   ├── page.tsx                      # Landing page
│   ├── login/
│   │   └── page.tsx                  # PHN + DOB login
│   ├── profile/
│   │   └── page.tsx                  # Risk profile & self-report
│   ├── screening/
│   │   └── page.tsx                  # Screening eligibility status
│   ├── requisition/
│   │   └── page.tsx                  # Generated lab requisition (printable)
│   ├── results/
│   │   ├── page.tsx                  # Results dashboard (traffic-light table)
│   │   ├── summary/
│   │   │   └── page.tsx              # AI-generated health summary
│   │   └── upload/
│   │       └── page.tsx              # Manual result upload (for demo)
│   ├── chat/
│   │   └── page.tsx                  # AI chat companion
│   ├── admin/
│   │   └── page.tsx                  # Demo admin panel (time travel, result injection)
│   └── api/
│       ├── auth/
│       │   └── route.ts              # PHN lookup
│       ├── patient/
│       │   └── route.ts              # Patient data from mock provincial system
│       ├── screening/
│       │   └── route.ts              # Eligibility calculation
│       ├── results/
│       │   ├── route.ts              # Result storage & classification
│       │   └── simulate/
│       │       └── route.ts          # Admin: inject demo results
│       ├── email/
│       │   └── route.ts              # Send notification emails
│       ├── summary/
│       │   └── route.ts              # AI summary generation (streaming)
│       └── chat/
│           └── route.ts              # AI chat endpoint
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── bc-header.tsx                 # BC government-style header
│   ├── bc-footer.tsx                 # BC government-style footer
│   ├── result-card.tsx               # Traffic-light result display
│   ├── screening-status.tsx          # Eligibility indicator
│   ├── requisition-pdf.tsx           # Printable requisition layout
│   └── risk-badge.tsx                # Green/yellow/red badge
├── lib/
│   ├── db.ts                         # Database connection + CSV loading
│   ├── screening-engine.ts           # Eligibility rules + result classification
│   ├── framingham.ts                 # Framingham Risk Score calculation
│   ├── clinical-thresholds.ts        # All threshold constants
│   └── email.ts                      # Email sending utility
├── data/
│   ├── patients.csv                  # Copied from hackathon data
│   ├── encounters.csv
│   ├── lab_results.csv
│   ├── medications.csv
│   └── vitals.csv
├── public/
│   ├── bc-logo.svg                   # BC-style logo
│   └── fonts/                        # BC Sans / Noto Sans
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

---

## Build Order (Priority for the Hackathon)

If you only have 6-8 hours, build in this order:

### Hour 1-2: Foundation
1. `npx create-next-app@latest screeningbc --typescript --tailwind --app`
2. `npx shadcn@latest init` — set up with custom BC gov colors
3. Build the BC gov header/footer components
4. Load CSV data into SQLite (or just read from CSVs via a utility module)
5. Build the login page (PHN + DOB lookup)

### Hour 2-3: Core Screening Flow
6. Build the patient profile page (data pulled from mock system + self-report form)
7. Build the screening eligibility engine (the algorithmic rules)
8. Build the screening status page

### Hour 3-4: Lab Requisition + Email
9. Build the requisition page (printable layout)
10. Set up email service (Resend or Ethereal)
11. Build the admin panel with "trigger notification" button
12. Wire up screening-due email

### Hour 4-5: Results
13. Build the results dashboard with traffic-light cards
14. Build the admin "simulate results" feature
15. Build result classification engine (thresholds)
16. Wire up results-ready email

### Hour 5-6: AI Layer
17. Set up AI SDK with AI Gateway
18. Build the streaming health summary page
19. Build the AI chat companion
20. Write the system prompts

### Hour 6-7: Polish & Demo Prep
21. Responsive design pass
22. Pre-seed a demo patient with a compelling story
23. Pre-send demo emails to a real inbox
24. Rehearse the 3-minute demo flow
25. Add population statistics (from bc_health_indicators.csv) to a "Why This Matters" section

### Hour 7-8: Buffer
26. Bug fixes, edge cases
27. Deploy to Vercel
28. Final demo rehearsal

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Too many features to build in time | Build order is strictly prioritized. Cut chat and summary streaming first if behind. |
| Email deliverability in demo | Pre-send emails before the demo. Have screenshots as backup. Use Ethereal for guaranteed delivery. |
| AI hallucination in chat | Narrow system prompt. Only allow questions about the patient's specific results. Add disclaimer. |
| "This already exists" objection | Emphasize: BC Cancer Screening exists for cancer. Nothing exists for chronic disease screening for unattached patients. Health Gateway shows records but doesn't generate requisitions or interpret results. |
| Judges ask about privacy/HIPAA | "All data is synthetic. In production, this would use BC Services Card auth and PHN verification, the same infrastructure Health Gateway uses today." |

---

## What This Spec Does NOT Include (Deferred)

- Real BC Services Card OAuth integration
- LifeLabs API integration for automatic result retrieval
- Real physician sign-off workflow
- FHIR interoperability
- Multi-language support
- Wearable data integration

These are Phase 2/3 items mentioned in the pitch narrative but not needed for the hackathon demo.
