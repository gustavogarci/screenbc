# Spec 2: ScreenWell BC — Lean Build (Ship in 6 Hours)

> **What this is:** A stripped-down version that gets the core flow working in half the time. Same concept, same design, but ruthlessly scoped. Every feature either serves the demo or gets cut. Estimated build time: 5-7 hours.

> **When to pick this over Spec 1:** Your developer has limited time, or you want a polished core flow rather than a wide-but-rough feature set.

---

## What's Different From Spec 1

| Spec 1 (Full Vision) | Spec 2 (Lean Build) |
|---|---|
| Full database with Drizzle ORM + schema | JSON files + in-memory state (no DB setup) |
| Mock CareConnect EHR service | Pre-loaded patient profiles (skip the "pull from EHR" flow) |
| Self-reported risk factors form | Hardcoded risk factors for demo patients |
| Email via Resend + React Email | Email via Resend but simpler templates (plain HTML) |
| AI Chat companion page | Cut entirely (show in slides as "future feature") |
| Demo control panel | Simple API endpoint, trigger from browser console |
| 5 pre-seeded demo patients | 2 demo patients (one borderline, one critical) |
| Requisition PDF generation | Styled HTML page with Print button |
| Framingham Risk Score calculation | Hardcoded risk category for demo patients |

## What's Kept (Non-Negotiable)

1. BC Design System look and feel (colors, fonts, layout)
2. Landing page with the "why" story
3. Login with PHN + DOB
4. Dashboard showing screening status
5. Lab requisition page (printable)
6. Results dashboard with traffic-light indicators
7. AI-generated health summary (the personalized one-pager)
8. At least one working email notification
9. Demo flow: age trigger → email → requisition → results → summary

---

## Tech Stack (Simplified)

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | shadcn/ui + Tailwind CSS |
| Data | JSON files in `/data` folder + React state |
| AI | OpenAI via Vercel AI SDK (summary generation only) |
| Email | Resend (simple send, no React Email needed) |
| Auth | Cookie-based session (no JWT library needed) |

**No database.** Patient data lives in JSON files that are read/written with `fs`. For a hackathon demo, this is perfectly fine and saves 1-2 hours of DB setup.

---

## Data Architecture

```
data/
├── patients.json          # 2 demo patients with full profiles
├── screenings.json        # Screening records (updated at runtime)
├── results.json           # Lab results for each screening
└── hackathon/             # Raw CSV files (read-only, for EHR simulation)
    ├── patients.csv
    ├── lab_results.csv
    └── encounters.csv
```

### patients.json (Pre-populated)

```json
[
  {
    "id": "PAT-000001",
    "phn": "9698658215",
    "firstName": "Margaret",
    "lastName": "Johnson",
    "dob": "1974-09-22",
    "age": 51,
    "sex": "F",
    "email": "demo@youremail.com",
    "postalCode": "V8S 6G3",
    "riskFactors": {
      "familyHistoryDiabetes": true,
      "familyHistoryHeartDisease": false,
      "smokingStatus": "never"
    },
    "screeningStatus": "none"
  },
  {
    "id": "PAT-000008",
    "phn": "3285389354",
    "firstName": "Danielle",
    "lastName": "Hoffman",
    "dob": "1987-12-01",
    "age": 38,
    "sex": "F",
    "email": "demo2@youremail.com",
    "postalCode": "V9B 7R5",
    "riskFactors": {
      "familyHistoryDiabetes": false,
      "familyHistoryHeartDisease": false,
      "smokingStatus": "never"
    },
    "screeningStatus": "none"
  }
]
```

### Pre-built Result Sets

Instead of uploading results, have pre-built result sets that get "applied" during the demo:

```json
{
  "borderline-diabetes-high-cholesterol": {
    "patientId": "PAT-000001",
    "results": [
      { "test": "HbA1c", "value": 6.3, "unit": "%", "status": "borderline" },
      { "test": "Fasting Glucose", "value": 6.4, "unit": "mmol/L", "status": "borderline" },
      { "test": "Total Cholesterol", "value": 6.1, "unit": "mmol/L", "status": "borderline" },
      { "test": "LDL Cholesterol", "value": 4.2, "unit": "mmol/L", "status": "abnormal" },
      { "test": "HDL Cholesterol", "value": 1.4, "unit": "mmol/L", "status": "normal" },
      { "test": "Triglycerides", "value": 1.8, "unit": "mmol/L", "status": "normal" },
      { "test": "Creatinine", "value": 72, "unit": "umol/L", "status": "normal" },
      { "test": "eGFR", "value": 85, "unit": "mL/min", "status": "normal" }
    ]
  }
}
```

---

## Pages (Reduced Set)

### 1. Landing Page (`/`)
Same as Spec 1 but simpler — hero + three stats + how-it-works steps + CTA button. No animations. Static content.

### 2. Login (`/login`)
- Two fields: PHN (text input) + Date of Birth (date picker)
- On submit: check if PHN matches a patient in `patients.json`
  - Match → set cookie, redirect to `/dashboard`
  - No match → show error "Patient not found" (no registration flow — demo patients are pre-seeded)
- For demo, show a hint: "Demo PHN: 9698 658 215"

### 3. Dashboard (`/dashboard`)
- Pull patient from cookie
- Check screening status from `screenings.json`
- Show appropriate state card (due / waiting / ready)
- "Get Requisition" or "View Results" button depending on state

### 4. Requisition (`/requisition`)
- Styled HTML document (no PDF generation)
- Patient info + tests ordered + physician name + instructions
- Print button: `window.print()` with print-friendly CSS
- Nearest LifeLabs locations (hardcoded Victoria area)

### 5. Results (`/results`)
- Table with traffic-light colored status badges
- Each row expandable (accordion) with plain-language explanation
- "View Full Summary" button at bottom

### 6. Summary (`/summary`)
- AI-generated page: call OpenAI on page load, stream the summary
- Cache the generated summary in `screenings.json` so it doesn't regenerate on refresh
- Styled as a printable document with patient name, date, and ScreenWell BC branding

---

## API Endpoints (Minimal Set)

```
POST /api/login           — { phn, dob } → set cookie, return patient
GET  /api/patient         — Read patient from cookie
POST /api/screening/start — Create screening record, return requisition data
POST /api/results/receive — Apply pre-built result set to a screening
GET  /api/results/:id     — Get results for a screening
POST /api/summary/generate — Generate AI summary, return streamed text
POST /api/demo/age-change — Change patient age, trigger screening check
POST /api/demo/send-email — Trigger a specific email
```

### Key Implementation: `/api/results/receive`

This is the "lab results come back" simulation. Instead of a file upload flow:

```typescript
export async function POST(req: Request) {
  const { screeningId, resultSet } = await req.json();
  
  // Load pre-built results from the result set
  const results = RESULT_SETS[resultSet];
  
  // Write to screenings.json
  updateScreening(screeningId, { status: 'results_received', results });
  
  // Send "results ready" email via Resend
  await sendResultsReadyEmail(patient.email, patient.firstName);
  
  return Response.json({ success: true });
}
```

---

## Email (Simplified)

Use Resend's simple API — no React Email library needed:

```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendScreeningDueEmail(to: string, name: string) {
  await resend.emails.send({
    from: 'ScreenWell BC <screening@updates.screenwell-bc.ca>',
    to,
    subject: "It's time for your free health screening — ScreenWell BC",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #013366; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">ScreenWell BC</h1>
        </div>
        <div style="padding: 30px;">
          <p>Hi ${name},</p>
          <p>Based on your age and health profile, it's time for your free preventive health screening.</p>
          <p><strong>We'll check for:</strong></p>
          <ul>
            <li>Diabetes (HbA1c & glucose)</li>
            <li>Cholesterol levels</li>
            <li>Kidney function</li>
          </ul>
          <p>These conditions develop silently — but a simple blood test can catch them early.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
             style="display: inline-block; background: #013366; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; margin: 16px 0;">
            Get Your Lab Requisition →
          </a>
          <p style="color: #474543; font-size: 14px;">The test is free and takes about 10 minutes at any LifeLabs.</p>
        </div>
        <div style="background: #FAF9F8; padding: 16px; text-align: center; border-top: 1px solid #D8D8D8;">
          <p style="color: #474543; font-size: 12px; margin: 0;">
            ScreenWell BC — Supervised by Dr. [Name], MD
          </p>
        </div>
      </div>
    `
  });
}
```

Just two email functions needed:
1. `sendScreeningDueEmail()` — "You're due for screening"
2. `sendResultsReadyEmail()` — "Your results are in"

---

## AI Summary (Single LLM Call)

One server action that generates the health summary:

```typescript
// app/api/summary/generate/route.ts
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { patient, results } = await req.json();
  
  const result = streamText({
    model: 'openai/gpt-4o',
    system: `You are a health communication specialist for ScreenWell BC...`,
    prompt: buildSummaryPrompt(patient, results),
  });

  return result.toUIMessageStreamResponse();
}
```

Use the same prompt template from Spec 1, but call it once and cache. No chat companion needed.

---

## Screening Logic (Same as Spec 1, Copy-Paste)

The clinical thresholds and eligibility rules are identical to Spec 1. Just implemented as simple functions in `lib/screening.ts`:

```typescript
// lib/screening.ts

export function isEligibleForScreening(patient: Patient): ScreeningResult {
  const tests: string[] = [];
  
  if (patient.age >= 40) tests.push('HbA1c', 'Fasting Glucose');
  if ((patient.sex === 'M' && patient.age >= 40) || (patient.sex === 'F' && patient.age >= 50))
    tests.push('Total Cholesterol', 'LDL', 'HDL', 'Triglycerides');
  if (patient.age >= 50) tests.push('Creatinine', 'eGFR');
  
  return { eligible: tests.length > 0, tests };
}

export function classifyResult(test: string, value: number): 'normal' | 'borderline' | 'abnormal' {
  const thresholds: Record<string, { borderline: number; abnormal: number }> = {
    'HbA1c': { borderline: 6.0, abnormal: 6.5 },
    'Fasting Glucose': { borderline: 6.1, abnormal: 7.0 },
    'Total Cholesterol': { borderline: 5.2, abnormal: 6.2 },
    'LDL Cholesterol': { borderline: 3.5, abnormal: 5.0 },
    'eGFR': { borderline: 89, abnormal: 59 }, // inverted: lower is worse
  };
  // ... classify
}
```

---

## Demo Script (3 Minutes — Simplified)

### Pre-Demo Setup
1. Danielle Hoffman is registered, age 38 (not yet eligible)
2. Margaret Johnson is registered, age 51, screening completed with borderline results
3. Email inbox open in split screen

### The Demo

**0:00 — The Problem (20s)**
"A million BCers have no family doctor. No doctor means no blood work. No blood work means diabetes, cholesterol, and kidney disease develop silently until they explode in the ER."

**0:20 — The Trigger (30s)**
*Open demo endpoint in browser: `/api/demo/age-change?patient=PAT-000008&age=40`*
"When Danielle turns 40, the system knows she's due for screening."
*Show email arriving.* "She gets a notification."

**0:50 — The Flow (40s)**
*Click email link → Dashboard shows "Screening Recommended"*
*Click "Get Requisition" → Show printable req*
"She takes this to any LifeLabs. No appointment, no referral, no doctor needed."

**1:30 — The Results (40s)**
*Switch to Margaret's account (pre-loaded results)*
*Show results dashboard with traffic lights*
"When results come back, the system interprets them in plain language."
*Click to expand the HbA1c row*
"Margaret's HbA1c is 6.3% — pre-diabetes. The system explains exactly what that means."

**2:10 — The Summary (30s)**
*Click "View Full Summary"*
"She gets a personalized health summary she can print and take to any clinic."
*Scroll through the AI-generated summary*

**2:40 — The Close (20s)**
"BC already does this for cancer. We're doing it for the conditions that actually fill our ERs. One supervising physician. Existing LifeLabs infrastructure. AI that makes results understandable. This is ScreenWell BC."

---

## File Structure (Minimal)

```
screenwell-bc/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Landing
│   ├── login/page.tsx
│   ├── dashboard/page.tsx
│   ├── requisition/page.tsx
│   ├── results/page.tsx
│   ├── summary/page.tsx
│   └── api/
│       ├── login/route.ts
│       ├── patient/route.ts
│       ├── screening/start/route.ts
│       ├── results/receive/route.ts
│       ├── summary/generate/route.ts
│       └── demo/
│           ├── age-change/route.ts
│           └── send-email/route.ts
├── components/
│   ├── ui/                   # shadcn/ui (Button, Card, Badge, Table, Input)
│   ├── header.tsx
│   ├── footer.tsx
│   ├── result-row.tsx
│   └── status-badge.tsx
├── lib/
│   ├── screening.ts          # Eligibility + interpretation logic
│   ├── email.ts              # Resend send functions
│   ├── data.ts               # Read/write JSON files
│   └── patients.ts           # Patient data helpers
├── data/
│   ├── patients.json
│   ├── screenings.json
│   └── result-sets.json
├── public/
│   └── bc-logo.svg
├── tailwind.config.ts        # BC colors (same as Spec 1)
├── .env.local
└── package.json
```

**Total files to write: ~20.** Compare to Spec 1's ~40+.

---

## Build Priority (Time-Boxed)

| Hour | What to Build | Deliverable |
|---|---|---|
| 0-1 | Project setup + layout + landing page | Deployed to Vercel with BC styling |
| 1-2 | Login + dashboard + patient data | Can log in as Margaret, see dashboard |
| 2-3 | Requisition page + screening logic | Can generate and print a requisition |
| 3-4 | Results page + traffic-light UI | Can view interpreted results |
| 4-5 | AI summary + Resend email | Can generate summary + receive one email |
| 5-6 | Demo flow: age-change endpoint + polish | Full demo flow working end-to-end |

**If you finish early:** Add the AI chat companion (1 hr), add a second email template (30 min), add animations/transitions (30 min).

---

## What You're Trading Off

| Gain | Cost |
|---|---|
| Ship in half the time | No database (harder to extend after hackathon) |
| Fewer moving parts to break | Only 2 demo patients (less variety) |
| Focus on polish of core flow | No chat companion |
| Simpler mental model for dev | Hardcoded data paths instead of dynamic queries |
| More time for presentation prep | Less impressive "depth" if judges poke around |

**My recommendation:** If you have one developer and 8 hours or less, use this spec. If you have more time or a second dev, use Spec 1.
