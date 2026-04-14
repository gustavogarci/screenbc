# Spec 5: The Recommended Hybrid (My Pick)

**Approach:** Cherry-picks the strongest elements from Specs 1-4 into the approach I'd actually build if I were competing. This is the spec I'd hand to a developer and say "build this."

The core insight: **the demo IS the product.** At a hackathon, you have 3 minutes. Everything must serve those 3 minutes. Build only what you show, show only what lands.

**Read `00-research-and-context.md` first for design tokens, data paths, and clinical logic.**

---

## What I Took from Each Spec

| From | What | Why |
|---|---|---|
| Spec 1 | Email notifications (simplified) | The "email arrives" moment is a great demo beat. But use Resend with a pre-sent email, not live sending during demo. |
| Spec 2 | 4-screen discipline + impact dashboard | Polish > features. The impact dashboard is the strongest closer. |
| Spec 3 | AI chat on the results page (not the whole app) | Chat is great for follow-up questions, but a full conversational flow is fragile during a live demo. Embed chat within the results page instead. |
| Spec 4 | Physician notification concept (simplified) | Don't build a full physician dashboard. Instead, show ONE notification card on the results page: "Your supervising physician has been notified." And have a simple `/physician` page with an alert feed. |

---

## Product Name

**ScreenBC** — Preventive Health Screening for British Columbians

---

## The 5 Things You Build

1. **Landing page with inline eligibility** (from Spec 2)
2. **Lab requisition page** (from all specs — it's essential)
3. **Results page with AI summary + embedded chat** (combines Spec 2 + Spec 3)
4. **Lightweight physician alert page** (from Spec 4, simplified)
5. **Impact dashboard** (from Spec 2)

That's it. Five pages. Each one earns its place in the demo.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js)                    │
│                                                           │
│  /               → Landing + eligibility check            │
│  /requisition/id → Printable lab requisition              │
│  /results/id     → Results table + AI summary + chat      │
│  /physician      → Alert feed + flagged patients          │
│  /impact         → Population data + correlation charts   │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                     API ROUTES                            │
│                                                           │
│  POST /api/patient/lookup     → PHN lookup                │
│  POST /api/screening/check    → eligibility               │
│  POST /api/screening/interpret → AI summary (streaming)   │
│  POST /api/chat               → follow-up questions       │
│  POST /api/admin/receive-labs → simulate results arriving │
│  GET  /api/physician/alerts   → flagged patients list     │
│                                                           │
├───────────────────────────────────────────────────────────┤
│                     DATA LAYER                            │
│                                                           │
│  data/demo-patients.json      → 5 curated patients        │
│  data/bc-communities.json     → 78 communities from CSV   │
│  data/lifelabs.json           → 5 nearby locations        │
│  lib/screening-logic.ts       → thresholds + eGFR + FRS   │
│  lib/patient-store.ts         → in-memory state           │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14+ (App Router) | `npx create-next-app@latest screenbc --typescript --tailwind --app` |
| UI Components | shadcn/ui | `npx shadcn@latest init` then add: button, card, input, table, badge, separator, sheet, tabs |
| AI | Vercel AI SDK + OpenAI GPT-4o | `npm install ai @ai-sdk/openai @ai-sdk/react` |
| Email | Resend | `npm install resend` — free tier, 100 emails/day |
| Charts | Recharts | `npm install recharts` — for impact page |
| Data | JSON files | No database. Pre-curated. |

### Tailwind Config — BC Gov Colors

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        bc: {
          blue: '#013366',
          'blue-hover': '#1E5189',
          'blue-light': '#F1F8FE',
          gold: '#FCBA19',
          'gold-light': '#FEF1D8',
        },
        status: {
          success: '#42814A',
          'success-bg': '#F6FFF8',
          warning: '#F8BB47',
          'warning-bg': '#FEF1D8',
          danger: '#CE3E39',
          'danger-bg': '#F4E1E2',
        },
        text: {
          primary: '#2D2D2D',
          secondary: '#474543',
        },
        surface: {
          DEFAULT: '#FAF9F8',
          white: '#FFFFFF',
          border: '#D8D8D8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
};
```

---

## Data Preparation

### Step 1: Convert CSVs to Curated JSON

Create a script (`scripts/prepare-data.ts`) that:

1. Reads `patients.csv`, filters to ages 40+
2. For each patient, joins lab results, encounters, medications, vitals
3. Identifies "unscreened" patients: age 40+, no diabetes/cholesterol/CKD diagnosis (ICD codes E11.9, E78.5, N20.0), no relevant active medications (metformin, statins, ACE inhibitors)
4. From unscreened patients, picks 5 with interesting lab profiles
5. Outputs `data/demo-patients.json`

### Step 2: Hand-Curate 5 Demo Patients

If the automated filter doesn't produce perfect demo patients, manually adjust values in the JSON. This is synthetic data — it's fine.

**Patient 1: "The Catch" (PRIMARY DEMO PATIENT)**
```json
{
  "id": "PAT-000027",
  "firstName": "Margaret",
  "lastName": "Johnson",
  "dateOfBirth": "1971-01-20",
  "age": 55,
  "sex": "F",
  "postalCode": "V8N 7P5",
  "phn": "8241 595 268",
  "email": "margaret.johnson@demo.screenbc.ca",
  "hasFamilyDoctor": false,
  "knownConditions": [],
  "activeMedications": [],
  "selfReported": {
    "familyHistoryDiabetes": true,
    "familyHistoryHeartDisease": false,
    "smokingStatus": "never"
  },
  "screeningStatus": "due",
  "labResults": {
    "hba1c": { "value": 6.3, "unit": "%", "status": "borderline" },
    "fastingGlucose": { "value": 6.4, "unit": "mmol/L", "status": "borderline" },
    "totalCholesterol": { "value": 6.1, "unit": "mmol/L", "status": "high" },
    "ldlCholesterol": { "value": 4.2, "unit": "mmol/L", "status": "borderline-high" },
    "creatinine": { "value": 72, "unit": "umol/L", "status": "normal" },
    "egfr": { "value": 85, "unit": "mL/min", "status": "normal" }
  },
  "vitals": {
    "systolicBp": 128,
    "diastolicBp": 82
  },
  "framinghamRisk": {
    "score": 12,
    "category": "intermediate"
  }
}
```

**Patient 2: "The All-Clear"** — 52F, everything normal. Green across the board.
**Patient 3: "The Urgent"** — 63M, eGFR 48 (CKD Stage 3b). Immediate referral.
**Patient 4: "The Young FH"** — 35F, LDL 5.4. Familial hypercholesterolemia flag.
**Patient 5: "The Complex"** — 68M, pre-diabetes + high cholesterol + mildly reduced eGFR. Multiple action items.

### Step 3: BC Communities JSON

Extract from `bc_health_indicators.csv`:
```json
[
  {
    "name": "Mission",
    "healthAuthority": "Fraser",
    "population": 7429,
    "pctWithoutDoctor": 38.2,
    "diabetesPrevalence": 7.6,
    "erVisitsPer1000": 450
  },
  // ... all 78 communities
]
```

---

## Page-by-Page Specification

### Page 1: Landing (`/`)

**Layout:**

```
┌──────────────────────────────────────────────────────────┐
│  [BC Blue Header]  ScreenBC                              │
│  Preventive Health Screening for British Columbians       │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │                                                     │ │
│  │  No family doctor?                                  │ │
│  │  Get screened for diabetes, cholesterol,             │ │
│  │  and kidney disease — free.                         │ │
│  │                                                     │ │
│  │  Modeled after BC Cancer Screening.                 │ │
│  │  No doctor visit required.                          │ │
│  │                                                     │ │
│  │  ┌───────────────────────────────────────────────┐  │ │
│  │  │  Personal Health Number  [____________]       │  │ │
│  │  │  Date of Birth           [____/____/____]     │  │ │
│  │  │                                               │  │ │
│  │  │  [  Check My Eligibility  ]                   │  │ │
│  │  └───────────────────────────────────────────────┘  │ │
│  │                                                     │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌─────────┐  ┌──────────┐  ┌──────────────────────┐    │
│  │ Diabetes │  │ Cholest. │  │ Kidney Disease       │    │
│  │ Screen   │  │ Screen   │  │ Screen               │    │
│  │ HbA1c    │  │ Lipid    │  │ Creatinine/eGFR      │    │
│  │ test     │  │ panel    │  │ test                  │    │
│  └─────────┘  └──────────┘  └──────────────────────┘    │
│                                                          │
│  How it works:                                           │
│  1. Enter your health number                             │
│  2. Get a free lab requisition                           │
│  3. Visit any LifeLabs                                   │
│  4. Get AI-interpreted results                           │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  [Footer] ScreenBC Pilot Program · Dr. [Name]           │
│  This is not a substitute for medical advice.            │
└──────────────────────────────────────────────────────────┘
```

**On Submit:**
1. Call `POST /api/patient/lookup` with PHN + DOB
2. If found → show inline success card with patient name, age, screening status
3. Show eligibility result: "You're due for screening for: HbA1c, Lipid Panel, Creatinine/eGFR"
4. Show CTA: "Get My Lab Requisition →" (links to `/requisition/[id]`)

**If patient not in demo data:** Show "We couldn't find your record. You can still register manually." → expandable form with name, age, sex, postal code.

### Page 2: Lab Requisition (`/requisition/[patientId]`)

**Content:**

Printable page. Clean white background, formal layout.

```
──────────────────────────────────────────────────────
SCREENBC — PREVENTIVE HEALTH SCREENING PROGRAM
Laboratory Requisition
──────────────────────────────────────────────────────

PATIENT INFORMATION
Name:    Margaret Johnson
PHN:     8241 595 268
DOB:     January 20, 1971 (Age 55)
Sex:     Female
Address: Victoria, BC  V8N 7P5

ORDERING CLINICIAN
Dr. [Partner's Full Name]
ScreenBC Preventive Screening Program
License #: [Number]

TESTS ORDERED
☑ Hemoglobin A1c (HbA1c)
☑ Fasting Glucose  
☑ Lipid Panel (Total Cholesterol, LDL, HDL, Triglycerides)
☑ Creatinine with estimated Glomerular Filtration Rate (eGFR)

CLINICAL INDICATION
Preventive screening per Canadian clinical guidelines.
Patient is asymptomatic. No family physician on record.

PATIENT INSTRUCTIONS
• Bring this form to any LifeLabs location
• Fast for 10-12 hours before your appointment
• Drink water normally
• Bring your BC Services Card or photo ID

NEAREST LIFELABS LOCATIONS
1. LifeLabs — Victoria Hillside | 1640 Hillside Ave | 250-370-8510
2. LifeLabs — Victoria Shelbourne | 3553 Shelbourne St | 250-370-8509  
3. LifeLabs — Oak Bay | 2200 Oak Bay Ave | 250-370-8508

──────────────────────────────────────────────────────
```

Two buttons at the top (outside the printable area):
- `[🖨 Print Requisition]` — triggers `window.print()`
- `[← Back to Portal]`

A small link at the bottom: `[Results are back? Click here →]` (links to `/results/[id]`)

### Page 3: Results + AI Summary + Chat (`/results/[patientId]`)

This is the most important page. It has three sections.

**Section A: Results Table**

A `shadcn/ui` Table component with colored badges:

```typescript
// Result status badge colors
const statusStyles = {
  normal:    'bg-status-success-bg text-status-success border-status-success',
  borderline:'bg-status-warning-bg text-status-warning border-status-warning',
  high:      'bg-status-danger-bg text-status-danger border-status-danger',
  urgent:    'bg-status-danger-bg text-status-danger border-status-danger font-bold',
};
```

Each row is expandable (accordion style). When expanded, shows a 2-sentence plain-language explanation of that specific test result.

**Section B: AI Health Summary**

Below the table. A white card with a streaming AI-generated summary.

Implementation using Vercel AI SDK:

```typescript
// app/api/screening/interpret/route.ts
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { patient } = await req.json();
  
  const result = streamText({
    model: openai('gpt-4o'),
    system: SCREENING_SYSTEM_PROMPT,
    prompt: buildInterpretationPrompt(patient),
  });
  
  return result.toDataStreamResponse();
}

// app/results/[patientId]/page.tsx (client component)
'use client';
import { useCompletion } from '@ai-sdk/react';

function HealthSummary({ patient }) {
  const { completion, isLoading } = useCompletion({
    api: '/api/screening/interpret',
    body: { patient },
  });
  
  return (
    <div className="prose max-w-none">
      {isLoading && <SkeletonLoader />}
      <Markdown>{completion}</Markdown>
    </div>
  );
}
```

**Section C: Follow-Up Chat (Embedded)**

Below the summary. A collapsible chat panel ("Have questions about your results? Ask here.").

When expanded, shows a chat interface using `useChat` from the AI SDK. The chat has the patient's results and summary as context.

Suggested quick-reply chips: "What foods should I avoid?" / "Is this serious?" / "Where can I see a doctor?" / "When should I get tested again?"

**Section D: Next Steps Card**

At the bottom. A prominent card with clear actions:
- If any result is borderline/high: "We recommend booking at your nearest UPCC. Bring this summary."
  - List 2-3 UPCC locations
  - Link: "Find more care options on HealthLink BC (811)"
- Rescreen schedule: "Your next screening is recommended in [6 months / 1 year / 3 years]"
- "Download Your Summary (PDF)" button

**Section E: Physician Notification Banner**

Small, subtle banner at the top of the results page:
"Your results have been shared with our supervising physician, Dr. [Name]. If immediate follow-up is needed, they will contact you."

### Page 4: Physician Alerts (`/physician`)

**Purpose:** Lightweight page showing flagged patients. Not a full dashboard — just enough to prove the oversight model works.

**Layout:**
- Header: "ScreenBC — Physician Console"
- Stats row: Enrolled / Screened / Flagged / Cleared
- Alert cards (sorted by urgency):

```
┌──────────────────────────────────────────────────────┐
│ 🔴 URGENT — John Park, 63, M                         │
│                                                       │
│ eGFR: 48 mL/min (CKD Stage 3b)                      │
│ AI Recommendation: Urgent referral to nephrology      │
│                                                       │
│ [Review Full Results]  [Mark as Reviewed]             │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ ⚠️ REVIEW — Margaret Johnson, 55, F                   │
│                                                       │
│ HbA1c: 6.3% (pre-diabetes)                           │
│ LDL: 4.2 mmol/L (borderline high)                    │
│ Framingham: 12% (intermediate risk)                   │
│                                                       │
│ AI Recommendation: Lifestyle counseling,              │
│ rescreen 6 months, consider lipid referral            │
│                                                       │
│ [Review Full Results]  [Approve Recommendations]      │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ ✅ CLEARED — Sarah Chen, 52, F                        │
│                                                       │
│ All results within normal range                       │
│ Next screening: March 2029                            │
│ Auto-cleared (no physician action required)           │
└──────────────────────────────────────────────────────┘
```

This page is pre-populated with 4-5 patients (the curated demo set) to make it look like a living system.

### Page 5: Impact Dashboard (`/impact`)

Same as Spec 2. This page uses the Track 2 population health data.

**Components:**
1. Three stat cards (1M+ unattached, 18% avg rate, 38.2% in Mission)
2. Bar chart: top 15 communities by `pct_without_family_doctor` (color-coded by `er_visits_per_1000`)
3. Scatter plot: `pct_without_family_doctor` vs `er_visits_per_1000` with correlation line
4. Punchline card: "Of [X] patients over 50 with no diagnosis, [Y]% had abnormal results..."

---

## The Demo Script (3 Minutes, Tight)

### Pre-Demo Setup
- App running. Gmail tab open with pre-sent email for Margaret.
- Two browser tabs: patient side + physician side (don't show physician yet).

### 0:00 — The Problem (20 seconds)

*On landing page.*

> "A million British Columbians don't have a family doctor. No doctor means no one orders your blood work. No one screens you for diabetes, cholesterol, kidney disease. BC already does centralized screening for cancer. We built ScreenBC to do it for the silent conditions that fill our ERs."

### 0:20 — The Notification (15 seconds)

*Switch to Gmail.*

> "Margaret is 55, lives in Victoria, no family doctor. ScreenBC knows she's due for screening."

Show the email. Click the link.

### 0:35 — Eligibility + Requisition (25 seconds)

*Landing page, pre-filled with Margaret's PHN.* Click "Check My Eligibility."

> "She confirms her identity. The system finds her in the provincial registry, checks her age and risk profile."

Show eligibility result. Click "Get My Lab Requisition."

> "She gets a lab requisition she can print and take to any LifeLabs. Same infrastructure BC Cancer uses."

Flash the requisition briefly.

### 1:00 — The Results (60 seconds)

> "Margaret goes to LifeLabs, gets her blood work done. Results come back."

*Navigate to results page.* Show the traffic-light table.

> "The system interprets everything using Canadian clinical guidelines. Pre-diabetes. High cholesterol. Kidneys are fine."

*Scroll to the AI summary. Let it stream for 10 seconds.*

> "She gets a personalized health summary in plain language. What it means, what she can do, when to come back."

*Click a quick-reply in the chat: "What should I eat?"*

> "She can ask follow-up questions. The AI stays within guidelines."

Show the AI response briefly.

### 2:00 — The Doctor's View (30 seconds)

*Switch to physician tab.*

> "On the other side — the supervising physician."

*Show the alert cards. Point at Margaret's card.*

> "Margaret's results are automatically flagged. The AI has already triaged: pre-diabetes, intermediate cardiovascular risk. One click to approve the recommendation."

*Click "Approve."*

> "One click. Not a 15-minute appointment. One physician can oversee thousands of patients."

### 2:30 — The Impact (25 seconds)

*Navigate to impact page.*

> "Now zoom out."

Point at the chart. Point at the punchline stat.

> "In communities where 38% of people don't have a doctor, ER visits are among the highest in the province. In our data, [Y]% of unscreened patients over 50 had abnormal results a single blood test would have caught."

### 2:55 — The Close (5 seconds)

> "BC did this for cancer. This is ScreenBC."

---

## File Structure

```
screenbc/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                      # Landing + eligibility
│   ├── requisition/
│   │   └── [patientId]/page.tsx      # Printable requisition
│   ├── results/
│   │   └── [patientId]/page.tsx      # Results + summary + chat
│   ├── physician/
│   │   └── page.tsx                  # Alert feed
│   ├── impact/
│   │   └── page.tsx                  # Population dashboard
│   └── api/
│       ├── patient/
│       │   └── lookup/route.ts
│       ├── screening/
│       │   ├── check/route.ts
│       │   └── interpret/route.ts    # Streaming AI summary
│       ├── chat/route.ts             # Follow-up chat
│       └── admin/
│           └── receive-labs/route.ts  # Demo: simulate results
├── components/
│   ├── ui/                           # shadcn components
│   ├── layout/
│   │   ├── header.tsx                # BC blue header
│   │   └── footer.tsx                # Disclaimer footer
│   ├── screening/
│   │   ├── eligibility-form.tsx      # PHN + DOB form
│   │   ├── eligibility-result.tsx    # Inline result card
│   │   ├── requisition-doc.tsx       # Printable requisition
│   │   ├── results-table.tsx         # Traffic-light results
│   │   ├── result-row.tsx            # Individual result with expand
│   │   ├── health-summary.tsx        # Streaming AI summary
│   │   ├── follow-up-chat.tsx        # Embedded chat panel
│   │   └── next-steps.tsx            # Action items card
│   ├── physician/
│   │   ├── stats-row.tsx
│   │   └── alert-card.tsx
│   └── impact/
│       ├── stat-card.tsx
│       ├── community-chart.tsx
│       └── correlation-scatter.tsx
├── lib/
│   ├── screening-logic.ts            # All clinical thresholds
│   ├── egfr.ts                       # CKD-EPI eGFR calculation
│   ├── framingham.ts                 # Framingham Risk Score
│   ├── patients.ts                   # Load + query patient data
│   ├── prompts.ts                    # AI system prompts
│   └── types.ts                      # TypeScript interfaces
├── data/
│   ├── demo-patients.json            # 5 curated patients
│   ├── bc-communities.json           # 78 communities
│   └── lifelabs-locations.json       # Hardcoded locations
├── scripts/
│   └── prepare-data.ts               # CSV → JSON converter
├── public/
│   └── screenbc-logo.svg             # Simple text logo
├── tailwind.config.ts                # BC Gov colors
├── package.json
├── tsconfig.json
└── .env.local
```

---

## Environment Variables

```env
# AI
OPENAI_API_KEY=sk-...

# Email (optional — can skip if time is tight)
RESEND_API_KEY=re_...
RESEND_FROM=noreply@screenbc.ca

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Build Order (For the Developer)

### Hour 1-2: Scaffolding + Data
1. `npx create-next-app@latest screenbc --typescript --tailwind --app`
2. `npx shadcn@latest init` → add components: button, card, input, table, badge, separator, tabs
3. Set up BC Gov color tokens in `tailwind.config.ts`
4. Build `components/layout/header.tsx` and `footer.tsx`
5. Run `prepare-data.ts` to create `demo-patients.json` from hackathon CSVs
6. Create `bc-communities.json` from `bc_health_indicators.csv`

### Hour 3-4: Landing Page + Eligibility
7. Build the landing page (`app/page.tsx`)
8. Build `eligibility-form.tsx` (PHN + DOB inputs)
9. Build `POST /api/patient/lookup` API route
10. Build `eligibility-result.tsx` (inline success/failure card)
11. Test: enter PHN → find patient → show eligibility

### Hour 5: Lab Requisition
12. Build `requisition-doc.tsx` (printable document component)
13. Build `app/requisition/[patientId]/page.tsx`
14. Style for print (`@media print` CSS)

### Hour 6-8: Results Page (The Core)
15. Build `lib/screening-logic.ts` — all threshold classifications
16. Build `lib/egfr.ts` — CKD-EPI formula
17. Build `lib/framingham.ts` — risk score calculation
18. Build `results-table.tsx` with traffic-light badges
19. Build `result-row.tsx` with expandable explanations
20. Build `POST /api/screening/interpret` — streaming AI summary
21. Build `health-summary.tsx` — renders streaming markdown
22. Build `follow-up-chat.tsx` — embedded chat with `useChat`
23. Build `POST /api/chat` — chat API with patient context
24. Build `next-steps.tsx` — action items + UPCC locations

### Hour 9: Physician Page
25. Build `app/physician/page.tsx`
26. Build `alert-card.tsx` — flagged patient cards
27. Pre-populate with all 5 demo patients

### Hour 10-11: Impact Dashboard
28. Build `stat-card.tsx`
29. Build `community-chart.tsx` — Recharts bar chart
30. Build `correlation-scatter.tsx` — scatter plot with trend line
31. Calculate the punchline stat from demo data

### Hour 12: Polish + Demo Prep
32. Email template (Resend) — send test emails for Margaret
33. Responsive check on all pages
34. Demo admin button (hidden) to simulate lab results arriving
35. Write the pitch script
36. Rehearse 3 times

---

## Estimated Build Time

| Phase | Hours |
|---|---|
| Scaffolding + data prep | 2 |
| Landing + eligibility | 2 |
| Lab requisition | 1 |
| Results page (table + AI + chat) | 3 |
| Physician alerts | 1 |
| Impact dashboard | 1.5 |
| Polish + demo prep | 1.5 |
| **Total** | **~12 hours** |

Leaves buffer in a ~16 hour hackathon for unexpected issues.

---

## What Makes This Spec Win

1. **The email moment** — showing a real email arrive makes it feel like a production system.
2. **The streaming AI summary** — watching the interpretation appear in real-time is the "wow" moment for judges.
3. **The physician alert** — neutralizes the "but who's responsible?" objection. And having a real doctor click "approve" during the demo is memorable.
4. **The impact dashboard** — ends on population-level data that makes the pitch feel evidence-based, not just a cool demo.
5. **The one-liner:** "BC does this for cancer. This is ScreenBC." — memorable, clear, immediately understood.
6. **It's buildable.** 12 hours. Real AI. Real email. Real data. Not vaporware.
