# Spec 1: The Email-Driven Full Flow

**Approach:** Gustavo's original vision. A complete patient journey from notification email through lab results interpretation, with a mock provincial data backend. The demo walks through the full lifecycle of a screening event.

**Read `00-research-and-context.md` first for design tokens, data paths, and clinical logic.**

---

## Product Name

**ScreenBC** — Preventive Health Screening for British Columbians

URL for demo: `screenbc.ca` (or localhost for hackathon)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                     │
│                                                           │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌───────┐ │
│  │ Landing    │ │ Patient    │ │ Results    │ │ AI    │ │
│  │ Page       │ │ Portal     │ │ Dashboard  │ │ Chat  │ │
│  └────────────┘ └────────────┘ └────────────┘ └───────┘ │
│  ┌────────────┐ ┌────────────┐                           │
│  │ Lab Req    │ │ Physician  │                           │
│  │ Page       │ │ Dashboard  │                           │
│  └────────────┘ └────────────┘                           │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                    BACKEND (API Routes)                    │
│                                                           │
│  /api/patient/lookup    → PHN + DOB → patient record      │
│  /api/screening/check   → eligibility + due tests         │
│  /api/screening/results → interpret labs, generate summary│
│  /api/email/send        → trigger notification emails     │
│  /api/chat              → AI chat for result questions    │
│  /api/admin/trigger-age → demo: simulate age change       │
│  /api/admin/upload-labs → demo: simulate lab results in   │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                 MOCK DATA SERVICE                          │
│  "Provincial Health Registry" — JSON/SQLite               │
│  Pre-loaded with ~20 curated patients from hackathon CSV  │
│  Each patient has: demographics, conditions, meds, labs   │
│  Unattached patients (no family doctor) are the focus     │
└───────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14+ (App Router) | Fast setup, API routes built-in, SSR for demo |
| Styling | Tailwind CSS + shadcn/ui | Quick, professional look. Apply BC Gov colors. |
| AI | OpenAI GPT-4o (or Anthropic Claude) via AI SDK | Summary generation + chat companion |
| Email | Resend (free tier: 100 emails/day) | Real emails for the demo. Free, fast to set up. |
| Data | JSON files in `/data` directory | No database setup. Load hackathon CSVs into curated JSON at build time. |
| Deployment | Vercel (free) or localhost | For the demo presentation |

---

## Data Preparation (Pre-Build Step)

Before building the app, the developer should prepare a curated dataset from the hackathon CSVs.

### Script: `scripts/prepare-data.ts`

1. Load `patients.csv` — filter to ages 40+ (screening eligible)
2. For each patient, join:
   - Their lab results from `lab_results.csv`
   - Their encounters from `encounters.csv` (to know existing diagnoses)
   - Their medications from `medications.csv` (to know if already being treated)
   - Their vitals from `vitals.csv` (for BP in Framingham calc)
3. Classify each patient:
   - **Unattached + Unscreened:** No diabetes/cholesterol/CKD diagnosis, no relevant meds, no recent relevant labs → these are our demo patients
   - **Unattached + Abnormal:** Same as above but lab values are outside normal range → these are the patients the system would CATCH
   - **Known condition:** Has diagnosis and/or meds → excluded from screening (already managed)
4. Output: `data/patients.json` — array of ~20 curated patient objects with all their data pre-joined

### Demo Patient Shape

```typescript
interface DemoPatient {
  id: string;                    // e.g. "PAT-000027"
  firstName: string;
  lastName: string;
  dateOfBirth: string;           // "1971-01-20"
  age: number;
  sex: "M" | "F";
  postalCode: string;
  insuranceNumber: string;       // PHN equivalent
  email: string;                 // generated for demo
  
  // From encounters - existing known conditions
  knownConditions: string[];     // e.g. ["Essential hypertension"]
  
  // From medications - current active meds
  activeMedications: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
  
  // From lab_results - historical labs
  labHistory: {
    testName: string;
    value: number;
    unit: string;
    date: string;
    abnormalFlag: string;
  }[];

  // From vitals - most recent
  latestVitals: {
    systolicBp: number;
    diastolicBp: number;
    heartRate: number;
  } | null;
  
  // Computed
  hasFamilyDoctor: boolean;      // always false for demo patients
  screeningStatus: "due" | "not-due" | "overdue";
  riskFactors: string[];         // computed from data
}
```

### Pick 5 "Star" Patients for the Demo

From the curated set, hand-pick 5 patients with interesting stories:

1. **The Catch:** 55-year-old, no doctor, no diagnosis, but has HbA1c of 6.3% (pre-diabetes) and LDL of 4.2 (high). The system catches them.
2. **The All-Clear:** 52-year-old, no doctor, gets screened, everything normal. "You're healthy, see you in 3 years."
3. **The Urgent:** 62-year-old, no doctor, creatinine is very high (eGFR < 60). Kidney function is impaired. System escalates immediately.
4. **The Young FH:** 35-year-old, no doctor, gets one-time cholesterol screen, LDL > 5.0. Familial hypercholesterolemia flag.
5. **The Complex:** 68-year-old, no doctor, has multiple borderline results. Gets a comprehensive action plan.

If the hackathon data doesn't have patients matching these profiles exactly, **tweak the JSON values slightly** to create compelling demo stories. It's synthetic data — this is acceptable.

---

## Screens & Pages

### Page 1: Landing Page (`/`)

**Purpose:** Explains what ScreenBC is. Entry point for patients.

**Layout:**
- BC Gov-style blue header bar with gold accent. "ScreenBC" logo text.
- Hero section: "Preventive health screening for all British Columbians — no family doctor required."
- Subheadline: "We screen for diabetes, high cholesterol, and kidney disease. The conditions that cost the most when caught too late."
- Three feature cards (icons + short text):
  1. "Find out if you're due for screening"
  2. "Get a free lab requisition"
  3. "Understand your results with AI-powered interpretation"
- CTA button: "Check Your Eligibility" → goes to `/register`
- Footer: "Modeled after BC Cancer Screening. A pilot by Dr. [Partner's Name]."

**Inspiration:** BC Cancer Screening landing page + Health Gateway landing page.

### Page 2: Register / Login (`/register`)

**Purpose:** Patient identifies themselves. We look them up in the mock provincial data.

**Layout:**
- Card-centered form:
  - **Personal Health Number (PHN)** — text input, formatted as `XXXX XXX XXX`
  - **Date of Birth** — date picker
  - **Email Address** — for notifications
  - Submit button: "Look Me Up"
- Below: "Don't have your PHN? You can still sign up manually." → expands to show manual entry fields (name, age, sex, postal code, self-reported conditions)

**Backend Logic (`/api/patient/lookup`):**
1. Match PHN + DOB against `data/patients.json`
2. If found → return patient profile with pre-loaded health data
3. If not found → allow manual registration (creates a new record in memory)
4. Redirect to `/portal`

**Demo Flow:** The presenter enters a known demo patient's PHN + DOB. The system "finds" them in the provincial registry and loads their profile.

### Page 3: Patient Portal (`/portal`)

**Purpose:** The patient's home screen. Shows their profile, screening status, and any results.

**Layout:**
- Top: Welcome banner — "Welcome, Margaret. Here's your health screening status."
- Profile card: Name, age, sex, PHN, postal code. "Edit" button for self-reported data.
- **Self-Reported Health Info section:**
  - Family history checkboxes: diabetes, heart disease, high cholesterol, kidney disease
  - Smoking status: never / former / current
  - Known conditions: free text or select from common list
  - Weight and height (optional, for BMI)
  - "Save" button → recalculates eligibility
- **Screening Status Card:** Traffic-light style
  - If screening is DUE: yellow/orange banner — "You're due for preventive screening. [View your lab requisition →]"
  - If results are PENDING: blue banner — "Your lab results haven't arrived yet. We'll email you when they're ready."
  - If results are IN: green/yellow/red banner depending on results — "Your results are ready. [View your results →]"
  - If not yet due: green banner — "You're up to date. Next screening: March 2029."
- **Past Screenings section** (table): date, tests, status, link to view

### Page 4: Lab Requisition (`/portal/requisition`)

**Purpose:** The generated lab requisition the patient takes to LifeLabs.

**Layout:**
- Clean, printable document. "Print" button at top.
- Header: ScreenBC logo + "Laboratory Requisition"
- Patient info: Name, PHN, DOB, Sex
- Ordering physician: "Dr. [Partner's Name], ScreenBC Pilot Program"
- Tests ordered (checkboxes, pre-checked):
  - ☑ Hemoglobin A1c (HbA1c) — LOINC 4548-4
  - ☑ Fasting Glucose — LOINC 1558-6
  - ☑ Lipid Panel (Total Cholesterol, LDL, HDL, Triglycerides) — LOINC 2093-3, 2089-1
  - ☑ Creatinine with eGFR — LOINC 2160-0
- Clinical indication: "Preventive screening — no symptoms"
- Instructions for patient: "Take this form to any LifeLabs location. Fasting for 10-12 hours is recommended for accurate glucose and lipid results."
- Nearest LifeLabs locations: 2-3 locations based on patient's postal code (hardcoded for demo)
- QR code (optional): links back to the patient's portal page

**Why this matters for the demo:** This is a real, tangible artifact. When the judges see a properly formatted lab requisition with LOINC codes and a physician name, it feels real.

### Page 5: Results Dashboard (`/portal/results`)

**Purpose:** The patient sees their interpreted lab results.

**Layout:**
- Header: "Your Screening Results — March 28, 2026"
- Results table with traffic-light colors:

| Test | Your Result | Status | Reference Range |
|---|---|---|---|
| HbA1c | 6.3% | ⚠️ Borderline | < 6.0% normal |
| Fasting Glucose | 6.4 mmol/L | ⚠️ Borderline | 3.9 – 6.1 normal |
| Total Cholesterol | 6.1 mmol/L | 🔴 High | < 5.2 desirable |
| LDL Cholesterol | 4.2 mmol/L | ⚠️ Borderline High | < 3.5 desirable |
| Creatinine / eGFR | 85 mL/min | ✅ Normal | ≥ 90 normal |

- Each row is expandable. Clicking shows a plain-language explanation (2-3 sentences).
- Below the table: "Your Personalized Health Summary" — full AI-generated one-pager (see next section)
- Action buttons: "Download Summary (PDF)" / "Ask Questions About Your Results" (→ chat)
- Escalation banner (if any red results): "Some of your results need medical attention. We recommend booking at your nearest UPCC." + list of nearby UPCCs

### Page 6: AI-Generated Health Summary (Embedded in Results Page)

**Purpose:** The "one-pager" — the single most important output of the system.

**How it's generated:**
- API route `/api/screening/results` takes the patient's profile + lab values
- Sends to LLM with a carefully crafted system prompt (see below)
- Streams the response into the page

**System Prompt for Summary Generation:**

```
You are a medical screening results interpreter for ScreenBC, a provincial 
preventive screening program in British Columbia, Canada. You generate clear, 
compassionate, plain-language health summaries for patients who may not have 
medical training.

Given the patient's screening results and profile, generate a personalized 
health summary. Follow this structure:

1. GREETING: Address the patient by first name. State the date of screening.

2. FOR EACH ABNORMAL OR BORDERLINE RESULT:
   - What was tested and what the result means in plain language
   - Whether this is "borderline" (pre-disease) or "abnormal" (needs attention)
   - What the patient can do (lifestyle changes, evidence-based)
   - When to rescreen
   - Whether they need to see a doctor

3. FOR NORMAL RESULTS:
   - Brief reassurance. "Your kidney function is healthy. No action needed."

4. IF CHOLESTEROL IS BORDERLINE OR HIGH:
   - Include a simplified Framingham risk assessment if you have the inputs
   - Explain what "low/intermediate/high risk" means in plain language

5. OVERALL NEXT STEPS:
   - Clear bullet points of what to do
   - If any result needs medical follow-up, provide: "Book an appointment at 
     your nearest UPCC or walk-in clinic. Bring this summary."

6. SAFETY NET:
   - "This summary is for informational purposes. If you feel unwell at any 
     time, call 811 or go to your nearest emergency department."

Tone: Warm, clear, not condescending. Like a knowledgeable friend who happens 
to be a doctor. Avoid medical jargon. When you must use a medical term, 
explain it in parentheses. Use "your" and "you."
```

### Page 7: AI Chat Companion (`/portal/chat`)

**Purpose:** Patient can ask follow-up questions about their results.

**Layout:**
- Chat interface (shadcn/ui chat components or simple message bubbles)
- Pre-loaded context: the patient's results + the generated summary
- Suggested questions as chips:
  - "What foods should I avoid?"
  - "Is my cholesterol dangerous?"
  - "Where's the nearest UPCC?"
  - "What does pre-diabetes mean?"
- AI responds conversationally. Always stays within evidence-based guidelines.
- Every response ends with a gentle safety net: "For personalized medical advice, speak with a healthcare provider."

**System Prompt for Chat:**

```
You are the ScreenBC health companion. The patient has received their 
preventive screening results and has questions. You have access to their 
results and health summary.

Rules:
- Answer questions about their specific results in plain language
- Provide evidence-based lifestyle recommendations
- NEVER diagnose conditions or prescribe medications
- NEVER contradict the screening summary
- If asked about symptoms or acute concerns, direct to 811 or their nearest UPCC
- Keep responses concise (2-4 paragraphs max)
- Be warm and reassuring, never alarming
```

### Page 8: Physician Dashboard (`/admin`)

**Purpose:** The supervising physician sees aggregate data and flagged patients.

**Layout:**
- Top stats cards:
  - "Patients Enrolled: 847"
  - "Screened This Month: 123"
  - "Abnormals Requiring Follow-Up: 18"
  - "Undetected Conditions Caught: 34"
- Flagged patients table:
  - Patient name, age, flag reason ("HbA1c 7.2% — undiagnosed diabetes"), date, status (new / reviewed / referred)
  - Click → see full patient profile + results
- Population insights (using Track 2 data):
  - Bar chart: "Unattached Rate by Community" (top 10 communities)
  - Scatter plot: "Unattached Rate vs. ER Visit Rate" (showing correlation)
  - Stat: "Of X patients screened, Y% had previously undetected abnormal results"

---

## The Demo Script (3-Minute Presentation)

### Setup (before presenting)

- App is running. One demo patient ("Margaret Johnson", age 54) is pre-loaded but hasn't been notified yet.
- Email client (Gmail) is open in another tab.

### Minute 0:00 – The Problem (30 seconds)

*Presenter talks.* Show the landing page.

> "Over a million British Columbians don't have a family doctor. When you don't have a doctor, nobody orders your blood work. Nobody screens you for the conditions that develop silently and cost the system the most — diabetes, high cholesterol, kidney disease. BC already does this for cancer. We built ScreenBC to do it for everything else."

### Minute 0:30 – The Trigger (30 seconds)

*Click a hidden "admin" button* (or use the API) to trigger the age-change simulation. Margaret turns 50 — the system detects she's due for screening and sends an email.

> "Margaret is 54 and unattached. The system knows her age and PHN. It sends her an email."

*Switch to Gmail tab.* Show the email: "You're due for preventive health screening. Click here to get started."

### Minute 1:00 – The Patient Journey (60 seconds)

*Click the email link.* It goes to `/register` pre-filled with Margaret's PHN.

> "Margaret clicks through, confirms her identity..."

*Show the portal.* Margaret's profile is loaded from the mock provincial data. She adds her family history (father had diabetes). Click "View Lab Requisition."

> "The system generates a lab requisition she can take to any LifeLabs."

*Show the requisition.* Clean, printable, with LOINC codes and a real physician name.

> "She gets her blood work done. A few days later..."

*Click admin button to simulate lab results arriving.* Switch to Gmail — new email: "Your screening results are ready."

### Minute 2:00 – The Results (45 seconds)

*Click through to results dashboard.* Show the traffic-light table.

> "The system interprets her results using Canadian clinical guidelines. Margaret's blood sugar is borderline — she has pre-diabetes. Her cholesterol is high. Her kidneys are fine."

*Scroll to the AI-generated summary.*

> "She gets a personalized, plain-language explanation. Not medical jargon — real guidance she can act on."

*Open the chat.* Ask "What should I eat to lower my blood sugar?"

> "And she can ask follow-up questions in plain language."

### Minute 2:45 – The Impact (15 seconds)

*Switch to physician dashboard.* Show the aggregate numbers.

> "In our hackathon data: of 800 patients over 50 with no known diagnosis, X% had abnormal results that this service would have caught. That's Y people who would have ended up in the ER. BC already does this for cancer. It's time to do it for the conditions that fill our ERs every single day."

---

## Email Templates

### Email 1: Screening Due Notification

**Subject:** You're due for preventive health screening — ScreenBC

**Body:**
```
Hi Margaret,

Based on your age and health profile, you're due for preventive 
screening for diabetes, cholesterol, and kidney function.

Getting screened is free and takes one blood test at any LifeLabs 
location. Early detection can prevent serious health problems.

→ Log in to get your lab requisition: [LINK]

This screening is provided by ScreenBC, a preventive health pilot 
program. No family doctor is required.

Questions? Reply to this email or call 811.
```

### Email 2: Results Ready Notification

**Subject:** Your screening results are ready — ScreenBC

**Body:**
```
Hi Margaret,

Your lab results from [DATE] have been processed. Your personalized 
health summary is ready to view.

→ View your results: [LINK]

If any results need attention, your summary will include clear 
next steps and nearby care options.

ScreenBC — Preventive Health Screening for British Columbians
```

---

## API Routes Detail

### `POST /api/patient/lookup`

**Input:** `{ phn: string, dob: string }`
**Logic:** Search `data/patients.json` for matching `insuranceNumber` + `dateOfBirth`
**Output:** `{ found: boolean, patient: DemoPatient | null }`

### `POST /api/screening/check`

**Input:** `{ patientId: string }`
**Logic:**
1. Get patient age, sex, risk factors
2. Apply screening eligibility rules (see `00-research-and-context.md`)
3. Check if any recent labs exist (within last 3 years for the relevant tests)
4. Return which tests are due
**Output:** `{ eligible: boolean, dueTests: string[], reason: string }`

### `POST /api/screening/results`

**Input:** `{ patientId: string, labResults: LabResult[] }`
**Logic:**
1. Classify each lab result against clinical thresholds
2. Calculate eGFR from creatinine + age + sex
3. Calculate Framingham score if cholesterol data + vitals available
4. Send to LLM for summary generation (streaming)
**Output:** Streamed AI response (summary text)

### `POST /api/chat`

**Input:** `{ patientId: string, message: string, history: Message[] }`
**Logic:** Standard AI chat with patient context injected into system prompt
**Output:** Streamed AI response

### `POST /api/admin/trigger-age` (Demo Only)

**Input:** `{ patientId: string, newAge: number }`
**Logic:** Updates patient age, runs screening check, sends email if due
**Output:** `{ emailSent: boolean }`

### `POST /api/admin/upload-labs` (Demo Only)

**Input:** `{ patientId: string }` (uses pre-loaded lab values for the patient)
**Logic:** Marks labs as "received," runs interpretation, sends results-ready email
**Output:** `{ interpreted: boolean, emailSent: boolean }`

---

## File Structure

```
screenbc/
├── app/
│   ├── layout.tsx              # BC Gov-style shell (blue header, footer)
│   ├── page.tsx                # Landing page
│   ├── register/
│   │   └── page.tsx            # PHN + DOB lookup / manual registration
│   ├── portal/
│   │   ├── page.tsx            # Patient home (profile + screening status)
│   │   ├── requisition/
│   │   │   └── page.tsx        # Lab requisition (printable)
│   │   ├── results/
│   │   │   └── page.tsx        # Results dashboard + AI summary
│   │   └── chat/
│   │       └── page.tsx        # AI chat companion
│   ├── admin/
│   │   └── page.tsx            # Physician dashboard
│   └── api/
│       ├── patient/
│       │   └── lookup/route.ts
│       ├── screening/
│       │   ├── check/route.ts
│       │   └── results/route.ts
│       ├── chat/route.ts
│       └── admin/
│           ├── trigger-age/route.ts
│           └── upload-labs/route.ts
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── header.tsx              # BC Gov blue header bar
│   ├── footer.tsx              # Footer with disclaimer
│   ├── result-card.tsx         # Traffic-light result row
│   ├── summary-stream.tsx      # Streaming AI summary display
│   └── chat-interface.tsx      # Chat UI
├── lib/
│   ├── screening-logic.ts      # Clinical thresholds, eGFR calc, Framingham
│   ├── patient-store.ts        # In-memory patient data management
│   └── email.ts                # Resend email sending
├── data/
│   ├── patients.json           # Curated demo patients
│   └── lifelabs-locations.json # Hardcoded nearby LifeLabs for demo
├── scripts/
│   └── prepare-data.ts         # CSV → curated JSON converter
├── public/
│   └── screenbc-logo.svg
├── tailwind.config.ts          # BC Gov color tokens
├── package.json
└── .env.local                  # OPENAI_API_KEY, RESEND_API_KEY
```

---

## Environment Variables

```
OPENAI_API_KEY=sk-...          # For AI summary + chat
RESEND_API_KEY=re_...          # For sending emails (free tier)
RESEND_FROM=screening@screenbc.ca  # Or use Resend's default domain
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Estimated Build Time

| Task | Hours |
|---|---|
| Data preparation script + curated patients | 1.5 |
| Project scaffolding + BC Gov styling | 1.5 |
| Landing page + registration flow | 1 |
| Patient portal + screening status | 1.5 |
| Lab requisition page | 0.5 |
| Results dashboard + AI summary (streaming) | 2 |
| AI chat companion | 1 |
| Email integration (Resend) | 1 |
| Physician dashboard | 1.5 |
| Demo admin controls (age trigger, lab upload) | 0.5 |
| Polish, testing, demo rehearsal | 1.5 |
| **Total** | **~13 hours** |

This is tight for a hackathon but doable with two people (one on frontend, one on backend/AI).

---

## Key Risks & Mitigations

| Risk | Mitigation |
|---|---|
| AI generates medically incorrect summary | Use a highly constrained system prompt + post-process for known thresholds |
| Email delivery fails during demo | Have a fallback: manually navigate to the results page |
| LLM API is slow during demo | Pre-generate summaries for demo patients, cache them, only stream for show |
| Judges question medical accuracy | Partner (real doctor) is present to validate clinical logic |
| "This already exists" challenge | Clearly state: "BC Cancer does this for cancer. Nothing does this for chronic disease." |
