# Spec 2: The Minimal Killer Demo

**Approach:** Ruthlessly stripped down to 4 screens. Every pixel is polished. No email integration, no chat, no physician dashboard. The demo is a guided walkthrough of one patient's journey, optimized for maximum emotional impact in 3 minutes. Build in 6-8 hours, spend the rest on polish and rehearsal.

**Why this approach:** Hackathon judges see 20+ demos. Most are half-built feature lists. This spec bets that 4 beautiful screens with a tight narrative beats 8 screens with rough edges. You cannot lose points for features you don't show — you lose points for features that look broken.

**Read `00-research-and-context.md` first for design tokens, data paths, and clinical logic.**

---

## Product Name

**ScreenBC** — Preventive Health Screening for British Columbians

---

## The 4 Screens

### Screen 1: The Landing + Eligibility Check (Combined)

**URL:** `/`

**What it does:** Hero page that doubles as the entry form. Patient enters their PHN and DOB right on the landing page — no separate registration page.

**Layout:**
- Full-bleed BC blue header: "ScreenBC"
- Large hero text: "No family doctor? No problem. Get screened for diabetes, cholesterol, and kidney disease — free."
- Subtext: "Over 1 million British Columbians don't have a family doctor. ScreenBC brings preventive screening to you, modeled after BC Cancer Screening."
- Inline form (white card, centered):
  - PHN input (formatted)
  - Date of Birth picker
  - Button: "Check My Eligibility"
- Below the fold: 3-column explainer (What we screen for / How it works / What happens next)

**On submit:**
- Look up patient in curated data
- Show inline result: "Hi Margaret, you're 54 and due for screening. Based on your age and profile, we recommend: HbA1c, Lipid Panel, Creatinine/eGFR."
- Button: "Get My Lab Requisition →"

**Design note:** This page should feel like an official BC government service. Blue header, gold accent, clean typography, lots of whitespace.

### Screen 2: The Lab Requisition

**URL:** `/requisition/[patientId]`

**What it does:** A clean, printable lab requisition. This is the tangible artifact that makes the demo feel real.

**Layout:**
- Print-optimized. White background, clean borders.
- ScreenBC header + program description
- Patient demographics block: Name, PHN, DOB, Sex, Address
- Ordering clinician: "Dr. [Partner's Name] — ScreenBC Preventive Screening Program"
- Tests ordered:
  - ☑ Hemoglobin A1c (HbA1c)
  - ☑ Fasting Glucose
  - ☑ Lipid Panel (Total Cholesterol, LDL Cholesterol, HDL Cholesterol, Triglycerides)
  - ☑ Creatinine with estimated GFR
- Clinical indication: "Preventive screening per Canadian guidelines. Asymptomatic."
- Patient instructions: "Bring this form to any LifeLabs location. Fast for 10-12 hours before your appointment for accurate results."
- Nearest LifeLabs (3 locations based on postal code)
- Print button (large, obvious)
- "Continue to demo →" link (for presentation flow — simulates time passing)

### Screen 3: The Results Dashboard

**URL:** `/results/[patientId]`

**What it does:** Lab results are "in." This is where the magic happens. The patient sees their results interpreted in traffic-light colors, then the AI-generated health summary.

**Layout — Top Section: Results Table**

Full-width card with results table:

| Test | Your Result | Status | What This Means |
|---|---|---|---|
| HbA1c | 6.3% | ⚠️ Borderline | Your blood sugar is slightly elevated |
| Fasting Glucose | 6.4 mmol/L | ⚠️ Borderline | Consistent with pre-diabetes |
| Total Cholesterol | 6.1 mmol/L | 🔴 High | Above recommended range |
| LDL Cholesterol | 4.2 mmol/L | ⚠️ High | Needs further assessment |
| Creatinine / eGFR | 85 mL/min | ✅ Normal | Kidney function is healthy |

Status indicators use BC Gov support colors:
- ✅ Normal: `#42814A` (success green) with `#F6FFF8` background
- ⚠️ Borderline: `#F8BB47` (warning gold) with `#FEF1D8` background  
- 🔴 High/Abnormal: `#CE3E39` (danger red) with `#F4E1E2` background

**Layout — Bottom Section: AI Health Summary**

Streaming AI-generated text (use AI SDK `useChat` or `useCompletion`). Appears below the table, formatted as a clean letter:

> **Your Health Summary — March 28, 2026**
>
> Hi Margaret,
>
> Thank you for getting screened. Here's what we found...
> [Streamed content — see Spec 1 for the system prompt]

Below the summary:
- "Download as PDF" button
- "Find Care Near You" → small section with 2-3 nearby UPCC locations
- Framingham risk score visualization (if applicable): a simple gauge/semicircle showing 10-year cardiovascular risk

### Screen 4: The Population Impact Dashboard

**URL:** `/impact`

**What it does:** Shows WHY this matters at scale. This is the "pitch closer" — the screen you show in the last 30 seconds to hit the judges with the systemic impact.

**Layout:**
- Header: "Why ScreenBC Matters"
- Stat cards (big numbers):
  - "1,000,000+ BCers without a family doctor"
  - "18% average unattached rate across BC"
  - "38.2% in Mission — the highest in the province"
- Interactive choropleth map of BC (or simple bar chart of top 15 communities):
  - X-axis: community names
  - Y-axis: `pct_without_family_doctor`
  - Color-coded by `er_visits_per_1000`
  - Label: "Communities with the most unattached patients also have the highest ER visit rates"
- Scatter plot: `pct_without_family_doctor` vs `er_visits_per_1000` across 78 communities
  - Draw the correlation line
  - Label: "No doctor → no screening → conditions worsen → ER visits spike"
- Bottom card — the punchline:
  - "In our hackathon data: Of [X] patients over 50 with no known diagnosis, **[Y]% had abnormal results** that would have been caught by a single screening blood test."
  - "Estimated annual cost of undetected diabetes per patient: **$15,000+** in complications vs **$8** for an HbA1c test."

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) | Fast, API routes built-in |
| Styling | Tailwind CSS + shadcn/ui | Professional, fast to style |
| AI | OpenAI or Anthropic via Vercel AI SDK | Summary generation only (no chat needed) |
| Charts | Recharts or chart.js | Simple, good-looking charts for impact page |
| Data | Static JSON files | Pre-curated from hackathon CSVs |
| Deploy | Vercel or localhost | |

No email integration. No database. No authentication. These 4 screens are the entire product.

---

## File Structure

```
screenbc/
├── app/
│   ├── layout.tsx                # BC Gov shell
│   ├── page.tsx                  # Landing + eligibility check
│   ├── requisition/
│   │   └── [patientId]/page.tsx  # Lab requisition
│   ├── results/
│   │   └── [patientId]/page.tsx  # Results + AI summary
│   ├── impact/
│   │   └── page.tsx              # Population impact dashboard
│   └── api/
│       ├── patient/lookup/route.ts
│       └── screening/interpret/route.ts  # AI streaming endpoint
├── components/
│   ├── ui/                       # shadcn components
│   ├── header.tsx
│   ├── result-row.tsx            # Traffic-light result display
│   ├── health-summary.tsx        # Streaming AI text
│   ├── risk-gauge.tsx            # Framingham score viz
│   └── impact-chart.tsx          # Bar/scatter charts
├── lib/
│   ├── screening-logic.ts        # Clinical thresholds + eGFR + Framingham
│   └── patients.ts               # Load and query patient JSON
├── data/
│   ├── demo-patients.json        # 3-5 curated patients
│   └── bc-communities.json       # Extracted from bc_health_indicators.csv
├── tailwind.config.ts
└── .env.local
```

---

## Demo Script (3 Minutes)

### 0:00 — The Hook (20 seconds)

Show landing page.

> "There are over a million people in BC without a family doctor. When you don't have a doctor, nobody screens you for diabetes, cholesterol, or kidney disease. These conditions are silent — and when they're finally caught, it's in the ER. BC already does centralized screening for cancer. We built ScreenBC to do it for everything else."

### 0:20 — The Patient (40 seconds)

Enter Margaret's PHN. The system finds her, shows eligibility.

> "Margaret is 54, lives in Sooke — where 34% of people don't have a doctor. She enters her health number. The system checks her age and profile, and tells her she's due for screening."

Click "Get My Lab Requisition."

> "She gets a real lab requisition, with LOINC codes and a supervising physician. She can take this to any LifeLabs location. The same infrastructure that BC Cancer uses for colon screening."

Show the requisition briefly. Don't linger.

### 1:00 — The Results (60 seconds)

Navigate to results page.

> "Margaret gets her blood work done. Results come back. The system interprets them using Canadian clinical guidelines."

Show the traffic-light table. Point at the yellow and red rows.

> "Her HbA1c is 6.3% — that's pre-diabetes. Her cholesterol is high. Her kidneys are fine. But here's what matters — she would NEVER have known this without screening."

Scroll to the AI summary. Let it stream for a few seconds.

> "She gets a personalized health summary in plain language. Not medical jargon — real guidance. What it means, what she can do, when to rescreen, and where to get help if she needs it."

### 2:00 — The Impact (40 seconds)

Navigate to impact dashboard.

> "Now zoom out. This isn't just about Margaret."

Point at the map/chart.

> "Communities with the highest unattached rates also have the highest ER visit rates. In Mission, 38% of people don't have a doctor and ER visits are among the highest in the province."

Point at the punchline stat.

> "In our data: of [X] patients over 50 with no known diagnosis, [Y]% had abnormal results a single blood test would have caught. That's [Z] people heading toward the ER."

### 2:40 — The Close (20 seconds)

> "The infrastructure already exists. LifeLabs is everywhere. The clinical guidelines are algorithmic. One supervising physician can cover thousands of patients. BC did this for cancer. It's time to do it for the conditions that fill our ERs every single day. This is ScreenBC."

---

## Estimated Build Time

| Task | Hours |
|---|---|
| Data preparation (curate 5 demo patients + community JSON) | 1 |
| Project scaffolding + BC Gov styling + header/footer | 1 |
| Landing page with inline eligibility form | 1.5 |
| Lab requisition page (printable) | 1 |
| Results dashboard with traffic-light table | 1.5 |
| AI summary streaming integration | 1.5 |
| Impact dashboard with charts | 1.5 |
| Screening logic (thresholds, eGFR, Framingham) | 1 |
| Polish + responsive + demo rehearsal | 1.5 |
| **Total** | **~11.5 hours** |

1.5 hours saved vs Spec 1. Those hours go into making these 4 screens perfect.

---

## What This Spec Sacrifices

| Feature | Why We Cut It | Impact |
|---|---|---|
| Email notifications | Demo time is limited; navigating between email + app wastes seconds | Low — we just narrate "she gets an email" |
| AI Chat | Cool but not essential to the story. Summary does the heavy lifting. | Low — summary answers the key questions |
| Physician dashboard | We have the impact dashboard instead, which is more compelling for judges | Low — one chart card on impact page shows physician value |
| User authentication | Unnecessary for a demo | None |
| Self-reported health info | Can mention in pitch without building it | Low |

---

## Why This Spec Might Win

1. **Polish > Features.** Four beautiful screens with a tight narrative beats eight half-built ones.
2. **The impact dashboard is a closer.** Ending with population data + correlation analysis is the kind of thing that makes judges think "this could actually work."
3. **Build time is reasonable.** Two people can build this in a day with time left for rehearsal.
4. **Every screen has a purpose in the demo.** No "let me skip past this page" moments.
