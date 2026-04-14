# Spec 1: ScreenWell BC — Full Vision (Developer-Ready PRD)

> **What this is:** A faithful, detailed implementation of Gustavo's full vision. This is the "build everything" spec — mock CareConnect backend, patient portal, email notifications, lab result upload, AI interpretation, and the full demo flow. Estimated build time: 10-14 hours.

---

## Name Decision

**ScreenWell BC** — Suggests wellness + screening. Avoids confusion with GetCheckedOnline (STD testing) and is distinct from BC Cancer Screening.

Alternative names if the team prefers:
- **BC HealthScreen** — Mirrors "BC Cancer Screening" naming convention
- **PreventiveBC** — Action-oriented, clear purpose
- **CheckUp BC** — Already in the idea doc, simple and clear (low risk of confusion with GetCheckedOnline since it's a different word)

---

## Design System

Mirror the **BC Government Design System** used by Health Gateway (healthgateway.gov.bc.ca). This gives the prototype instant credibility — it looks like it belongs in the BC health ecosystem.

### Colors (exact hex values from BC Design System)

| Token | Hex | Usage |
|---|---|---|
| Primary Blue | `#013366` | Header, primary buttons, navigation |
| Primary Gold | `#FCBA19` | Accent, call-to-action highlights, warning states |
| Blue Hover | `#1E5189` | Button hover states |
| Blue Light BG | `#F1F8FE` | Card backgrounds, info sections |
| Light Gray BG | `#FAF9F8` | Page background |
| White | `#FFFFFF` | Cards, content areas |
| Primary Text | `#2D2D2D` | Body text, headings |
| Secondary Text | `#474543` | Secondary labels |
| Link Blue | `#255A90` | Hyperlinks |
| Success Green | `#42814A` | Normal results, success states |
| Danger Red | `#CE3E39` | Abnormal results, errors |
| Warning Gold | `#F8BB47` | Borderline results, warnings |
| Border Light | `#D8D8D8` | Card borders, dividers |
| Border Medium | `#898785` | Input field borders |

### Typography

- **Font:** BC Sans (load from Google Fonts or CDN; fallback to system sans-serif)
- If BC Sans is unavailable, use **Inter** or **system-ui** — both are clean, accessible, and government-feeling
- Headings: 600 weight, primary text color
- Body: 400 weight, primary text color
- Small/labels: 400 weight, secondary text color

### Layout Principles

- Max content width: 1200px centered
- Cards with subtle borders (`#D8D8D8`), 8px border-radius
- Generous white space — this is a health service, not a SaaS dashboard
- Traffic light colors for results: Green (`#42814A`), Yellow/Gold (`#F8BB47`), Red (`#CE3E39`)
- BC government-style header: dark blue (`#013366`) with gold accent line beneath

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Fast to build, SSR, API routes built-in |
| UI | shadcn/ui + Tailwind CSS | Professional components, easy to customize to BC colors |
| Database | SQLite via Drizzle ORM (or Supabase if preferred) | Zero setup, good enough for a hackathon demo |
| AI | Vercel AI SDK + OpenAI (GPT-4o or Claude) | Chat companion + summary generation |
| Email | Resend + React Email | Beautiful transactional emails, free tier (3,000/month) |
| Auth | Simple PHN + DOB login (no real auth needed for demo) | Simulates BC Services Card login |
| Hosting | Vercel | One-click deploy, free tier |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        PATIENT PORTAL                           │
│                     (screenwell-bc.vercel.app)                  │
│                                                                 │
│  /login ──→ /dashboard ──→ /results ──→ /chat                  │
│     │           │              │           │                    │
│     │    /requisition    /summary     AI Companion              │
│     │                                                           │
├─────────────────────────────────────────────────────────────────┤
│                        API LAYER                                │
│                                                                 │
│  /api/auth/login          POST  { phn, dob }                   │
│  /api/patient/profile     GET   patient data from mock EHR     │
│  /api/screening/check     POST  determine what's due           │
│  /api/requisition/create  POST  generate lab requisition       │
│  /api/results/upload      POST  simulate lab results arriving  │
│  /api/results/interpret   POST  AI interprets results          │
│  /api/chat                POST  AI chat companion              │
│  /api/notify/trigger      POST  trigger email notification     │
│  /api/demo/age-advance    POST  advance a patient's age (demo) │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                     MOCK EHR SERVICE                            │
│              (simulates CareConnect / clinic records)           │
│                                                                 │
│  In-memory DB seeded with hackathon patient data                │
│  Provides: demographics, past labs, medications, encounters     │
│  Endpoint: /api/ehr/patient/:phn                                │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                      DATA LAYER                                 │
│                                                                 │
│  SQLite DB (or Supabase)                                        │
│  - patients (registered users + their self-reported data)       │
│  - screenings (what's been ordered, what's pending)             │
│  - results (lab results, interpreted)                           │
│  - notifications (email log)                                    │
│                                                                 │
│  Seed data: hackathon CSV files loaded at startup               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Database Schema

```sql
-- Registered patients (users who sign up on the portal)
CREATE TABLE patients (
  id TEXT PRIMARY KEY,           -- PAT-XXXXXX from hackathon data
  phn TEXT UNIQUE NOT NULL,      -- Personal Health Number (10 digits, starts with 9)
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  age INTEGER NOT NULL,
  sex TEXT NOT NULL,              -- M or F
  postal_code TEXT,
  email TEXT,                     -- For notifications
  phone TEXT,
  
  -- Self-reported risk factors (entered during onboarding)
  family_history_diabetes BOOLEAN DEFAULT FALSE,
  family_history_heart_disease BOOLEAN DEFAULT FALSE,
  family_history_kidney_disease BOOLEAN DEFAULT FALSE,
  smoking_status TEXT DEFAULT 'never', -- never, former, current
  known_conditions TEXT,          -- JSON array of self-reported conditions
  
  -- From mock EHR pull
  ehr_data_pulled BOOLEAN DEFAULT FALSE,
  ehr_medications TEXT,           -- JSON array
  ehr_past_labs TEXT,             -- JSON array
  ehr_encounters TEXT,            -- JSON array
  
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Screening episodes
CREATE TABLE screenings (
  id TEXT PRIMARY KEY,            -- SCR-XXXXXX
  patient_id TEXT NOT NULL REFERENCES patients(id),
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, requisition_generated, samples_collected, results_received, interpreted, escalated
  tests_ordered TEXT NOT NULL,    -- JSON array: ["HbA1c", "Lipid Panel", "Creatinine/eGFR"]
  requisition_pdf_url TEXT,
  triggered_by TEXT,              -- 'registration', 'recall', 'manual', 'demo_age_advance'
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lab results
CREATE TABLE results (
  id TEXT PRIMARY KEY,            -- RES-XXXXXX
  screening_id TEXT NOT NULL REFERENCES screenings(id),
  patient_id TEXT NOT NULL REFERENCES patients(id),
  test_name TEXT NOT NULL,        -- HbA1c, Fasting Glucose, Total Cholesterol, LDL, HDL, Triglycerides, Creatinine, eGFR
  value REAL NOT NULL,
  unit TEXT NOT NULL,
  reference_range_low REAL,
  reference_range_high REAL,
  status TEXT NOT NULL,           -- normal, borderline, abnormal, critical
  interpretation TEXT,            -- AI-generated plain-language interpretation
  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI-generated summaries
CREATE TABLE summaries (
  id TEXT PRIMARY KEY,
  screening_id TEXT NOT NULL REFERENCES screenings(id),
  patient_id TEXT NOT NULL REFERENCES patients(id),
  summary_html TEXT NOT NULL,     -- The personalized one-pager
  risk_scores TEXT,               -- JSON: { framingham: 12, diabetes_risk: "high", ... }
  recommendations TEXT,           -- JSON array of recommendations
  next_screening_date DATE,
  escalation_needed BOOLEAN DEFAULT FALSE,
  escalation_type TEXT,           -- 'upcc_referral', '811_notification', 'urgent_physician'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notification log
CREATE TABLE notifications (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id),
  type TEXT NOT NULL,             -- 'screening_due', 'results_ready', 'escalation', 'recall'
  channel TEXT NOT NULL,          -- 'email', 'sms'
  subject TEXT,
  sent_at TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP
);
```

---

## Page-by-Page Specification

### Page 1: Landing Page (`/`)

**Purpose:** Public-facing page explaining the service. Hero section with CTA to sign up.

**Layout:**
```
┌──────────────────────────────────────────┐
│  [BC Logo]  ScreenWell BC     [Sign In]  │  ← Dark blue header (#013366)
│━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│  ← Gold accent line (#FCBA19)
│                                          │
│   Free preventive screening for          │
│   British Columbians without a           │
│   family doctor                          │
│                                          │
│   Don't have a family doctor? You        │
│   still deserve to know if you're        │
│   at risk for diabetes, high             │
│   cholesterol, or kidney disease.        │
│                                          │
│   [Get Screened — It's Free]             │  ← Primary blue button
│                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ 1M+      │ │ 1 in 3   │ │ $8       │ │
│  │ BCers    │ │ diabetics│ │ for a    │ │
│  │ without  │ │ don't    │ │ test vs  │ │
│  │ a doctor │ │ know it  │ │ $15K ER  │ │
│  └──────────┘ └──────────┘ └──────────┘ │
│                                          │
│  HOW IT WORKS                            │
│  1. Sign up with your PHN               │
│  2. Get a lab requisition                │
│  3. Visit any LifeLabs                   │
│  4. Get your results explained by AI     │
│                                          │
│  ──────────────────────────────          │
│  Modeled after BC Cancer Screening.      │
│  Supervised by a licensed BC physician.  │
└──────────────────────────────────────────┘
```

### Page 2: Login / Registration (`/login`)

**Purpose:** Patient signs in with PHN + DOB, or registers for the first time.

**Login flow:**
1. Enter PHN (10-digit, starts with 9) + Date of Birth
2. If PHN found in system → log in, go to `/dashboard`
3. If PHN not found → create account flow

**Registration flow (new patients):**
1. Enter PHN + DOB + email + name
2. System calls mock EHR (`/api/ehr/patient/:phn`) to pull any existing records
3. Display: "We found some of your health records. We'll use these to determine your screening needs."
4. Self-reported risk factors form:
   - Family history checkboxes: diabetes, heart disease, kidney disease, high cholesterol
   - Smoking status: never / former / current
   - Known conditions: free text or checkboxes (hypertension, diabetes already diagnosed, etc.)
   - Optional: upload any medical documents (PDF/image) — stored but used only for demo context
5. → Redirect to `/dashboard`

**UI Notes:**
- BC Services Card icon/mention: "In a production system, you would log in with your BC Services Card"
- PHN field with format mask: `9XXX XXX XXX`
- Clean, centered card layout on light gray background

### Page 3: Patient Dashboard (`/dashboard`)

**Purpose:** The patient's home screen. Shows their screening status and next actions.

**States:**

**State A — Screening Due (just registered or age-triggered):**
```
┌──────────────────────────────────────────┐
│  Welcome back, Margaret                  │
│                                          │
│  ┌─────────────────────────────────────┐ │
│  │ 🔔 SCREENING RECOMMENDED           │ │  ← Gold accent card
│  │                                     │ │
│  │ Based on your age (54) and risk     │ │
│  │ profile, you're due for:           │ │
│  │                                     │ │
│  │ • Diabetes screening (HbA1c)       │ │
│  │ • Cholesterol panel                │ │
│  │ • Kidney function (Creatinine)     │ │
│  │                                     │ │
│  │ [Get Your Lab Requisition →]        │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  YOUR SCREENING HISTORY                  │
│  No previous screenings on file.         │
│                                          │
│  YOUR PROFILE                            │
│  Age: 54 | Sex: Female | Risk: Moderate  │
│  [Edit Profile]                          │
└──────────────────────────────────────────┘
```

**State B — Waiting for Results:**
```
│  ┌─────────────────────────────────────┐ │
│  │ ⏳ WAITING FOR LAB RESULTS         │ │  ← Blue info card
│  │                                     │ │
│  │ Requisition generated: Mar 15, 2026│ │
│  │ Tests: HbA1c, Lipid Panel, eGFR   │ │
│  │                                     │ │
│  │ We'll email you when your results  │ │
│  │ are ready.                          │ │
│  │                                     │ │
│  │ [View Requisition] [Upload Results] │ │  ← Upload = demo shortcut
│  └─────────────────────────────────────┘ │
```

**State C — Results Ready:**
```
│  ┌─────────────────────────────────────┐ │
│  │ ✅ YOUR RESULTS ARE IN             │ │  ← Green or mixed card
│  │                                     │ │
│  │ Screening completed: Mar 20, 2026  │ │
│  │                                     │ │
│  │ [View Your Results →]               │ │
│  │ [Chat with AI Health Companion →]   │ │
│  └─────────────────────────────────────┘ │
```

### Page 4: Lab Requisition (`/requisition/:id`)

**Purpose:** Display a printable/downloadable lab requisition.

**Content:**
```
┌──────────────────────────────────────────┐
│  LABORATORY REQUISITION                  │
│  ScreenWell BC Preventive Screening      │
│  ─────────────────────────────────────── │
│                                          │
│  Patient: Margaret Johnson               │
│  PHN: 9698 XXX XXX                       │
│  DOB: 1974-09-22                         │
│  Sex: Female                             │
│                                          │
│  Ordering Physician: Dr. [Partner Name]  │
│  License #: XXXXX                        │
│  Program: ScreenWell BC                  │
│  ─────────────────────────────────────── │
│                                          │
│  TESTS ORDERED:                          │
│  ☐ HbA1c (Glycated Hemoglobin)          │
│  ☐ Fasting Glucose                       │
│  ☐ Lipid Panel (Total, LDL, HDL, TG)   │
│  ☐ Creatinine with eGFR                 │
│  ─────────────────────────────────────── │
│                                          │
│  CLINICAL INDICATION:                    │
│  Preventive screening — age-appropriate  │
│  chronic disease screening per Canadian  │
│  clinical guidelines (Diabetes Canada,   │
│  CCS Dyslipidemia, KDIGO CKD)          │
│  ─────────────────────────────────────── │
│                                          │
│  INSTRUCTIONS FOR PATIENT:               │
│  • Fasting required: 10-12 hours         │
│  • Water is OK                           │
│  • Bring this form + your BC Services   │
│    Card to any LifeLabs location         │
│                                          │
│  [Print] [Download PDF]                  │
│                                          │
│  NEAREST LIFELABS LOCATIONS:             │
│  📍 LifeLabs Victoria — 1230 Hillside   │
│  📍 LifeLabs Saanich — 3995 Quadra St   │
│  📍 LifeLabs Langford — 2829 Peatt Rd   │
└──────────────────────────────────────────┘
```

### Page 5: Results Dashboard (`/results/:screeningId`)

**Purpose:** Display interpreted lab results with traffic-light indicators.

**Layout:**
```
┌──────────────────────────────────────────┐
│  YOUR SCREENING RESULTS                  │
│  March 20, 2026                          │
│                                          │
│  ┌──────────────────────────────────────┐│
│  │ Test         Result  Status    ▼     ││
│  │─────────────────────────────────────-││
│  │ HbA1c        6.3%   🟡 Borderline   ││
│  │ Fasting Glu  6.4    🟡 Borderline   ││
│  │ Total Chol   6.1    🟡 Borderline   ││
│  │ LDL Chol     4.2    🔴 High         ││
│  │ HDL Chol     1.4    🟢 Normal       ││
│  │ Triglycerides 1.8   🟢 Normal       ││
│  │ Creatinine   72     🟢 Normal       ││
│  │ eGFR         85     🟢 Normal       ││
│  └──────────────────────────────────────┘│
│                                          │
│  Click any result to learn more ↑        │
│                                          │
│  ┌─────────────────────────────────────┐ │
│  │ OVERALL ASSESSMENT                  │ │
│  │                                     │ │
│  │ 🟡 Some results need attention.     │ │
│  │                                     │ │
│  │ Your blood sugar levels suggest     │ │
│  │ pre-diabetes, and your LDL          │ │
│  │ cholesterol is above target.        │ │
│  │ Your kidney function is healthy.    │ │
│  │                                     │ │
│  │ [View Full Health Summary →]        │ │
│  │ [Chat with AI Companion →]          │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  [Download Summary PDF]                  │
│  [Print for Your Next Doctor Visit]      │
└──────────────────────────────────────────┘
```

**Expandable Row Detail (when clicking a result):**
```
│  │ HbA1c        6.3%   🟡 Borderline   ││
│  │ ┌────────────────────────────────┐   ││
│  │ │ What is HbA1c?                 │   ││
│  │ │ HbA1c measures your average    │   ││
│  │ │ blood sugar over 2-3 months.   │   ││
│  │ │                                │   ││
│  │ │ Your result: 6.3%             │   ││
│  │ │ Normal: below 6.0%            │   ││
│  │ │ Pre-diabetes: 6.0 – 6.4%     │   ││
│  │ │ Diabetes: 6.5% or above       │   ││
│  │ │                                │   ││
│  │ │ This means your blood sugar is │   ││
│  │ │ higher than normal. About 50%  │   ││
│  │ │ of people in this range develop│   ││
│  │ │ diabetes within 5-10 years     │   ││
│  │ │ without changes — but lifestyle│   ││
│  │ │ changes can reduce that risk   │   ││
│  │ │ by 58%.                        │   ││
│  │ └────────────────────────────────┘   ││
```

### Page 6: Personalized Health Summary (`/summary/:screeningId`)

**Purpose:** AI-generated one-pager in plain language. Printable.

This is generated by the LLM using the patient's results + risk factors. See the prompt template in the AI section below.

### Page 7: AI Chat Companion (`/chat`)

**Purpose:** Patient asks follow-up questions about their results.

**UI:** Standard chat interface using AI SDK's `useChat`.

- Left-aligned AI messages, right-aligned patient messages
- Suggested questions as chips: "What foods should I avoid?", "Is my cholesterol dangerous?", "Where's the nearest UPCC?"
- System prompt constrains the AI to evidence-based guidance and always recommends professional follow-up for clinical decisions
- Context: patient's results, summary, and risk profile are injected into the system prompt

### Page 8: Demo Control Panel (`/demo`) — HIDDEN, NOT SHOWN TO JUDGES

**Purpose:** Backstage controls for running the demo.

**Controls:**
- **Age Advance:** Select a patient, set their age to any value → triggers screening eligibility check → sends email if newly eligible
- **Simulate Lab Results:** Select a screening, paste or auto-generate results → triggers interpretation pipeline → sends "results ready" email
- **Reset Patient:** Clear a patient's screening history for re-demo
- **Send Test Email:** Trigger any email template to verify delivery

---

## API Endpoints (Detailed)

### `POST /api/auth/login`
```typescript
// Request
{ phn: string, dob: string } // dob: "YYYY-MM-DD"

// Response (success)
{ patient: PatientProfile, token: string } // Simple JWT or session

// Response (not found)
{ error: "not_found", message: "No account found. Would you like to register?" }
```

### `POST /api/auth/register`
```typescript
// Request
{
  phn: string,
  dob: string,
  email: string,
  firstName: string,
  lastName: string,
  riskFactors: {
    familyHistoryDiabetes: boolean,
    familyHistoryHeartDisease: boolean,
    familyHistoryKidneyDisease: boolean,
    smokingStatus: "never" | "former" | "current",
    knownConditions: string[]
  }
}

// Response
{ patient: PatientProfile, screening: ScreeningRecommendation | null }
```

### `GET /api/ehr/patient/:phn` (Mock CareConnect)
```typescript
// Simulates pulling data from BC's CareConnect system
// Seeded from hackathon CSV data

// Response
{
  found: boolean,
  demographics: { name, dob, sex, postalCode },
  recentLabs: LabResult[],      // From lab_results.csv
  medications: Medication[],     // From medications.csv  
  encounters: Encounter[],       // From encounters.csv
  vitals: Vital[]               // From vitals.csv
}
```

### `POST /api/screening/check`
```typescript
// Determines what screening is due based on guidelines

// Request
{ patientId: string }

// Response
{
  eligible: boolean,
  testsRecommended: string[],   // ["HbA1c", "Lipid Panel", "Creatinine/eGFR"]
  reasons: string[],            // ["Age 54, female — due for diabetes screening per Diabetes Canada guidelines"]
  urgency: "routine" | "priority" | "urgent",
  nextScreeningDate: string     // If not currently due
}
```

### `POST /api/results/interpret`
```typescript
// AI interprets lab results

// Request
{ screeningId: string }

// Response
{
  results: InterpretedResult[],
  overallAssessment: "normal" | "attention_needed" | "urgent",
  summary: string,              // AI-generated HTML summary
  recommendations: Recommendation[],
  framinghamScore: number | null,
  escalationNeeded: boolean,
  escalationType: string | null
}
```

### `POST /api/demo/age-advance`
```typescript
// Demo-only: changes a patient's age to trigger screening

// Request
{ patientId: string, newAge: number }

// Response
{ 
  patient: PatientProfile,
  screeningTriggered: boolean,
  emailSent: boolean
}
```

---

## Email Templates (React Email + Resend)

### Email 1: Screening Due Notification

**Subject:** `It's time for your free health screening — ScreenWell BC`

```
┌──────────────────────────────────────┐
│  [ScreenWell BC Logo]                │
│                                      │
│  Hi Margaret,                        │
│                                      │
│  Based on your age and health        │
│  profile, it's time for your free    │
│  preventive health screening.        │
│                                      │
│  We'll check for:                    │
│  ✓ Diabetes (HbA1c & glucose)       │
│  ✓ Cholesterol levels               │
│  ✓ Kidney function                   │
│                                      │
│  These are the conditions that       │
│  develop silently — but a simple     │
│  blood test can catch them early.    │
│                                      │
│  [Get Your Lab Requisition →]        │
│                                      │
│  The test is free and takes about    │
│  10 minutes at any LifeLabs.         │
│                                      │
│  ─────────────────────────────────── │
│  ScreenWell BC                       │
│  Supervised by Dr. [Name], MD       │
│  screenwell-bc.vercel.app            │
└──────────────────────────────────────┘
```

### Email 2: Results Ready Notification

**Subject:** `Your screening results are ready — ScreenWell BC`

```
┌──────────────────────────────────────┐
│  [ScreenWell BC Logo]                │
│                                      │
│  Hi Margaret,                        │
│                                      │
│  Your screening results are in.      │
│                                      │
│  Log in to see your personalized     │
│  health summary — what was tested,   │
│  what the results mean for you, and  │
│  what to do next.                    │
│                                      │
│  [View Your Results →]               │
│                                      │
│  ─────────────────────────────────── │
│  This is not a diagnosis. For        │
│  medical advice, consult a           │
│  healthcare provider.                │
│                                      │
│  ScreenWell BC                       │
└──────────────────────────────────────┘
```

### Email 3: Urgent Escalation

**Subject:** `Important: Your screening results need medical attention`

```
│  Your results indicate something     │
│  that needs prompt medical review.   │
│                                      │
│  Please visit your nearest Urgent    │
│  & Primary Care Centre (UPCC) or     │
│  call 811 for guidance.              │
│                                      │
│  Nearest UPCC:                       │
│  📍 Victoria UPCC — 1900 Richmond   │
│  📞 250-370-8000                    │
│                                      │
│  [View Results] [Find a UPCC]        │
```

---

## Clinical Logic (Screening Engine)

Implement this as a pure function — no AI needed. Deterministic logic based on Canadian guidelines.

### Who Gets Screened (Eligibility Rules)

```typescript
function determineScreening(patient: Patient): ScreeningRecommendation {
  const tests: string[] = [];
  const reasons: string[] = [];

  // DIABETES: Screen all adults 40+ every 3 years
  // Screen earlier if risk factors
  if (patient.age >= 40 || hasRiskFactors(patient, 'diabetes')) {
    tests.push('HbA1c', 'Fasting Glucose');
    reasons.push(`Age ${patient.age} — diabetes screening recommended per Diabetes Canada guidelines`);
  }

  // CHOLESTEROL: Men 40+, Women 50+ (or post-menopausal)
  // One-time screen for familial hypercholesterolemia at any age if family history
  if ((patient.sex === 'M' && patient.age >= 40) || 
      (patient.sex === 'F' && patient.age >= 50) ||
      patient.familyHistoryHeartDisease) {
    tests.push('Total Cholesterol', 'LDL Cholesterol', 'HDL Cholesterol', 'Triglycerides');
    reasons.push(`Cholesterol screening recommended per CCS Dyslipidemia guidelines`);
  }

  // KIDNEY: Everyone 50+ every 3 years
  // Earlier if diabetes, hypertension, or family history
  if (patient.age >= 50 || hasRiskFactors(patient, 'kidney')) {
    tests.push('Creatinine', 'eGFR');
    reasons.push(`Kidney function screening recommended per KDIGO guidelines`);
  }

  return { tests: [...new Set(tests)], reasons, eligible: tests.length > 0 };
}
```

### Result Interpretation (Deterministic Thresholds)

```typescript
function interpretResult(test: string, value: number, patient: Patient): InterpretedResult {
  const thresholds = {
    'HbA1c': { normal: [0, 5.9], borderline: [6.0, 6.4], abnormal: [6.5, Infinity] },
    'Fasting Glucose': { normal: [0, 6.0], borderline: [6.1, 6.9], abnormal: [7.0, Infinity] },
    'Total Cholesterol': { normal: [0, 5.19], borderline: [5.2, 6.2], abnormal: [6.21, Infinity] },
    'LDL Cholesterol': { normal: [0, 3.49], borderline: [3.5, 4.99], abnormal: [5.0, Infinity] },
    'HDL Cholesterol': { abnormal: [0, 0.99], borderline: [1.0, 1.19], normal: [1.2, Infinity] }, // inverted
    'Triglycerides': { normal: [0, 1.69], borderline: [1.7, 2.25], abnormal: [2.26, Infinity] },
    'Creatinine': { /* use eGFR instead */ },
    'eGFR': { normal: [90, Infinity], borderline: [60, 89], abnormal: [30, 59], critical: [0, 29] }
  };
  
  // ... classify into normal/borderline/abnormal/critical
}
```

### Framingham Risk Score

```typescript
function calculateFramingham(patient: Patient, results: Results): number {
  // Standard Framingham 10-year CVD risk calculator
  // Inputs: age, sex, total cholesterol, HDL, systolic BP, smoking, diabetes
  // Returns: percentage (0-100)
  // Use published coefficients from the Framingham Heart Study
}
```

---

## AI Prompts

### Summary Generation Prompt

```
You are a health communication specialist for ScreenWell BC, a preventive screening 
program in British Columbia, Canada. Generate a personalized health summary for this patient.

PATIENT CONTEXT:
- Name: {{firstName}}
- Age: {{age}}, Sex: {{sex}}
- Risk factors: {{riskFactors}}
- Medications: {{medications}}

LAB RESULTS:
{{results as formatted table}}

INTERPRETED THRESHOLDS:
{{each result with its status: normal/borderline/abnormal}}

FRAMINGHAM RISK SCORE: {{score}}% ({{category: low/intermediate/high}})

INSTRUCTIONS:
1. Address the patient by first name
2. Explain each abnormal or borderline result in plain language (Grade 6 reading level)
3. For each finding, explain: what was tested, what the result means, what they can do
4. Include specific, actionable lifestyle recommendations with evidence
5. State when they should get rescreened
6. If escalation is needed, provide clear next steps (UPCC location, 811)
7. End with: "This summary is for informational purposes. Please discuss with a healthcare provider."
8. Use warm, reassuring but honest tone
9. Do NOT use complex medical jargon
10. Format as clean HTML with headings, paragraphs, and bullet points
```

### Chat Companion System Prompt

```
You are a health information companion for ScreenWell BC. You help patients understand 
their preventive screening results.

PATIENT CONTEXT:
{{patient profile, results, summary}}

RULES:
1. Answer questions about lab results, screening guidelines, and general health in plain language
2. Always cite the specific result values when relevant
3. Provide evidence-based lifestyle guidance (diet, exercise, weight management)
4. For any clinical decision (should I take medication? do I have diabetes?), say: 
   "That's a decision to make with a healthcare provider. I can help you understand 
   your results, but I can't provide medical advice."
5. Know about BC healthcare resources: UPCCs, 811, LifeLabs locations, Health Gateway
6. Be warm, supportive, and reassuring — but honest about concerning results
7. If asked about something outside your scope, direct to 811 (HealthLink BC)
```

---

## Mock Data Seeding Strategy

At app startup, seed the database from the hackathon CSV files:

1. **Load `patients.csv`** → Create patient records. Use `insurance_number` as the PHN field (map format to 9XXX XXX XXX pattern).
2. **Load `lab_results.csv`** → Store as mock EHR data. Filter for relevant tests: HbA1c, Fasting Glucose, Total Cholesterol, LDL Cholesterol, Creatinine.
3. **Load `encounters.csv`** → Store as mock EHR encounter history. Used to identify existing diagnoses.
4. **Load `medications.csv`** → Store as mock EHR medication list. Used to determine if conditions are already managed.

**Pre-register 5 demo patients** with complete profiles and varying result scenarios:
1. **Margaret Johnson (PAT-000001)** — Age 51, Female. Will have borderline diabetes + high cholesterol. The "main character" of the demo.
2. **Michael Peterson (PAT-000003)** — Age 60, Male. Will have normal results across the board. Shows the "all clear" path.
3. **Renee Blair (PAT-000004)** — Age 63, Female. Will have abnormal results requiring escalation. Shows the urgent path.
4. **A younger patient (~38)** — Not yet eligible. Shows the "not due yet" state. Used for the age-advance demo.
5. **A patient with known conditions** — Already on metformin/statins. Shows the "already managed" path.

---

## Demo Script (3 Minutes)

### Setup (before demo)
- Pre-register Margaret Johnson in the system
- Have the demo control panel open in a hidden tab
- Have email inbox open (use a real email address with Resend)

### Beat 1: The Problem (30 seconds)
*Spoken:* "Over a million people in BC don't have a family doctor. When you don't have a doctor, nobody orders your blood work. Nobody screens you for diabetes or cholesterol. These conditions develop silently — and then they explode in the ER."

### Beat 2: Age Trigger → Email (30 seconds)
*Action:* On the demo panel, advance Danielle Hoffman (age 38) to age 40.
*Spoken:* "When a patient hits a screening milestone — like turning 40 — the system knows."
*Action:* Show the email arriving in real-time.
*Spoken:* "They get a notification. It's time for screening."

### Beat 3: Onboarding + Requisition (30 seconds)
*Action:* Click the email link. Show the patient dashboard with screening recommendation.
*Action:* Click "Get Your Lab Requisition." Show the printed requisition.
*Spoken:* "They get a lab requisition. They walk into any LifeLabs. No doctor appointment needed."

### Beat 4: Results Come In (45 seconds)
*Action:* On demo panel, simulate lab results arriving for Margaret (who has pre-existing borderline results).
*Action:* Show the email arriving: "Your results are ready."
*Action:* Click through to the results dashboard.
*Spoken:* "When results come back, AI interprets them — not in medical jargon, but in language you understand."
*Action:* Click on the HbA1c result to expand. Show the plain-language explanation.
*Action:* Show the full health summary.

### Beat 5: AI Chat (20 seconds)
*Action:* Open the chat. Ask: "What should I eat to lower my blood sugar?"
*Spoken:* "Patients can ask questions. The AI provides evidence-based guidance and always directs to a healthcare provider for clinical decisions."

### Beat 6: The Pitch (25 seconds)
*Spoken:* "BC already does this for cancer. BC Cancer Screening sends letters, generates requisitions, and recalls patients — all without a family doctor. We're applying the same proven model to the conditions that fill our ERs every day. One supervising physician. Existing LifeLabs infrastructure. And AI that makes the results understandable."

---

## File Structure

```
screenwell-bc/
├── app/
│   ├── layout.tsx                    # Root layout with BC design system
│   ├── page.tsx                      # Landing page
│   ├── login/
│   │   └── page.tsx                  # Login / registration
│   ├── dashboard/
│   │   └── page.tsx                  # Patient dashboard
│   ├── requisition/
│   │   └── [id]/page.tsx            # Lab requisition view
│   ├── results/
│   │   └── [id]/page.tsx            # Results dashboard
│   ├── summary/
│   │   └── [id]/page.tsx            # AI-generated health summary
│   ├── chat/
│   │   └── page.tsx                  # AI chat companion
│   ├── demo/
│   │   └── page.tsx                  # Demo control panel (hidden)
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts
│       │   └── register/route.ts
│       ├── ehr/
│       │   └── patient/[phn]/route.ts   # Mock CareConnect
│       ├── screening/
│       │   └── check/route.ts
│       ├── requisition/
│       │   └── create/route.ts
│       ├── results/
│       │   ├── upload/route.ts
│       │   └── interpret/route.ts
│       ├── chat/route.ts
│       ├── notify/
│       │   └── trigger/route.ts
│       └── demo/
│           └── age-advance/route.ts
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── layout/
│   │   ├── header.tsx                # BC-style header
│   │   ├── footer.tsx
│   │   └── bc-logo.tsx
│   ├── patient/
│   │   ├── risk-factor-form.tsx
│   │   ├── profile-card.tsx
│   │   └── screening-status.tsx
│   ├── results/
│   │   ├── result-row.tsx            # Traffic-light result row
│   │   ├── result-detail.tsx         # Expandable explanation
│   │   └── results-table.tsx
│   ├── requisition/
│   │   └── requisition-document.tsx
│   └── chat/
│       └── health-chat.tsx
├── lib/
│   ├── db/
│   │   ├── schema.ts                 # Drizzle schema
│   │   ├── seed.ts                   # Load hackathon CSVs
│   │   └── index.ts
│   ├── screening/
│   │   ├── eligibility.ts            # Screening eligibility logic
│   │   ├── interpret.ts              # Result interpretation
│   │   └── framingham.ts             # Framingham risk score
│   ├── ai/
│   │   ├── summary-prompt.ts         # Summary generation prompt
│   │   └── chat-prompt.ts            # Chat system prompt
│   ├── email/
│   │   ├── templates/
│   │   │   ├── screening-due.tsx     # React Email template
│   │   │   ├── results-ready.tsx
│   │   │   └── urgent-escalation.tsx
│   │   └── send.ts                   # Resend wrapper
│   └── constants.ts                  # Clinical thresholds, etc.
├── data/                             # Symlink or copy of hackathon CSVs
├── public/
│   └── bc-logo.svg
├── emails/                           # React Email preview
├── .env.local                        # API keys
├── tailwind.config.ts                # BC Design System colors
├── package.json
└── README.md
```

---

## Tailwind Config (BC Design System)

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        bc: {
          blue: {
            DEFAULT: '#013366',
            hover: '#1E5189',
            pressed: '#01264C',
            light: '#F1F8FE',
            50: '#F1F8FE',
            100: '#D8EAFD',
            200: '#C1DDFC',
            300: '#A8D0FB',
            400: '#91C4FA',
            500: '#7AB8F9',
            600: '#5595D9',
            700: '#3470B1',
            800: '#1E5189',
            900: '#013366',
          },
          gold: {
            DEFAULT: '#FCBA19',
            light: '#FEF8E8',
            50: '#FEF8E8',
            100: '#FEF0D8',
            200: '#FDE9C4',
            300: '#FCE2B0',
            400: '#FBDA9D',
            500: '#FBD389',
            600: '#FACC75',
            700: '#F9C462',
            800: '#F8BA47',
            900: '#FCBA19',
          },
          gray: {
            50: '#FAF9F8',
            100: '#F3F2F1',
            200: '#ECEAE8',
            300: '#E0DEDC',
            400: '#D1CFCD',
            500: '#C6C5C3',
            600: '#9F9D9C',
            700: '#605E5C',
            800: '#3D3C3B',
            900: '#353433',
            950: '#252423',
          },
        },
        status: {
          success: '#42814A',
          warning: '#F8BB47',
          danger: '#CE3E39',
          info: '#053662',
        },
        text: {
          primary: '#2D2D2D',
          secondary: '#474543',
          link: '#255A90',
          disabled: '#9F9D9C',
        },
      },
      fontFamily: {
        sans: ['BC Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: '#D8D8D8',
      },
    },
  },
};
```

---

## Environment Variables

```env
# .env.local

# AI (use one)
OPENAI_API_KEY=sk-...
# or
ANTHROPIC_API_KEY=sk-ant-...

# Email
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=screening@screenwell-bc.ca  # or use Resend's test domain

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
SUPERVISING_PHYSICIAN_NAME="Dr. [Partner Name]"
SUPERVISING_PHYSICIAN_LICENSE="XXXXX"

# Database (if using Supabase instead of SQLite)
# DATABASE_URL=postgresql://...
```

---

## What to Build First (Priority Order)

1. **Project setup** — Next.js + shadcn/ui + Tailwind with BC colors + basic layout (header/footer) — 30 min
2. **Mock EHR + data seeding** — Load CSVs, create the `/api/ehr/patient/:phn` endpoint — 1 hr
3. **Login + Registration** — PHN/DOB form, risk factor form, EHR data pull — 1 hr
4. **Screening engine** — Eligibility check + result interpretation (pure functions) — 1 hr
5. **Dashboard** — Three states (due/waiting/ready) — 1 hr
6. **Requisition page** — Printable lab req — 30 min
7. **Results dashboard** — Traffic-light table + expandable details — 1.5 hr
8. **AI summary** — LLM generates personalized one-pager — 1 hr
9. **Email notifications** — Resend + React Email, 3 templates — 1 hr
10. **Demo control panel** — Age advance + result simulation — 1 hr
11. **AI chat** — useChat + system prompt with patient context — 1 hr
12. **Polish** — Landing page, transitions, edge cases — 1 hr

**Total estimated: ~12 hours.** Can be parallelized if multiple devs.

**If short on time, cut:** Chat companion (nice-to-have), demo control panel (can use API directly), email templates (can show mockups instead of real emails).

---

## Key Differentiators for Judges

1. **Not a concept — it's a working pipeline.** Data flows from patient registration → screening eligibility → lab requisition → result interpretation → AI summary → email notification.
2. **Uses real clinical guidelines.** Diabetes Canada, CCS Dyslipidemia, KDIGO CKD — not made-up thresholds.
3. **Modeled after a system that already works.** BC Cancer Screening proves centralized screening without a family doctor is viable in BC.
4. **Quantifiable impact.** Run the screening logic against the 2,000 hackathon patients and report: "X% had undetected abnormal results."
5. **One supervising physician makes it legal.** This isn't a regulatory fantasy — it's the same model as cancer screening.
