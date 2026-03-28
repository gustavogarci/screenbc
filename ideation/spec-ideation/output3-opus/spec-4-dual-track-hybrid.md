# Spec 4: ScreeningBC — Dual-Track Hybrid (Clinical AI + Population Health)

> **Approach:** Targets BOTH hackathon tracks simultaneously. The patient-facing screening portal is Track 1 (Clinical AI). The population analytics dashboard is Track 2 (Population Health). One product, two scoring angles. Maximum evaluation coverage.

---

## Strategic Rationale

The hackathon has two tracks:
- **Track 1: Clinical AI** — Build an AI tool that helps clinicians or patients
- **Track 2: Population Health & Health Equity** — Data-driven tool for health disparities and resource allocation

Most teams pick one track. This spec plays both — not by building two separate things, but by building one product with two faces:

1. **Patient Face (Track 1):** AI-powered screening, result interpretation, personalized health guidance
2. **System Face (Track 2):** Population analysis, health equity mapping, screening gap quantification, cost impact modeling

The judges for Track 1 see a clinical AI tool. The judges for Track 2 see a population health tool. It's the same product.

---

## Name: ScreeningBC

Same branding as other specs. The dual-track nature doesn't change the product identity.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         ScreeningBC                              │
│                                                                  │
│  ┌─────────────────────────────┐ ┌─────────────────────────────┐│
│  │    TRACK 1: CLINICAL AI     │ │  TRACK 2: POPULATION HEALTH ││
│  │                             │ │                             ││
│  │  Patient Portal             │ │  Analytics Dashboard        ││
│  │  • Onboarding & risk        │ │  • Provincial screening gap ││
│  │  • Lab requisition          │ │  • Community comparisons    ││
│  │  • AI result interpretation │ │  • Health equity mapping    ││
│  │  • Streaming health summary │ │  • Cost impact modeling     ││
│  │  • AI chat companion        │ │  • Correlation analysis     ││
│  │                             │ │  • Physician dashboard      ││
│  └──────────┬──────────────────┘ └──────────┬──────────────────┘│
│             │                               │                   │
│  ┌──────────▼───────────────────────────────▼──────────────────┐│
│  │                  SHARED DATA LAYER                          ││
│  │                                                             ││
│  │  Hackathon CSVs → Screening Engine → Risk Classification   ││
│  │  patients.csv + encounters.csv + lab_results.csv +          ││
│  │  medications.csv + vitals.csv + bc_health_indicators.csv    ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## Track 1 Components (Clinical AI)

### Same as Spec 1/3 patient portal, but streamlined:

**Patient Journey:**
1. Login with PHN + DOB → pull from mock provincial records
2. Risk profile with self-reported factors
3. Screening eligibility determination (algorithmic)
4. Lab requisition generation (printable)
5. Results dashboard with traffic-light classification
6. AI-generated streaming health summary (personalized)
7. AI chat companion for follow-up questions

**AI Integration Points:**
- `streamText` for real-time health summary generation
- `useChat` for the conversational chat companion
- System prompts grounded in Canadian clinical guidelines
- Patient-specific context (their actual lab values, age, risk factors)

**Clinical Logic:**
Same as Spec 1 — diabetes/cholesterol/CKD thresholds, Framingham Risk Score, screening eligibility rules per BC Lifetime Prevention Schedule.

---

## Track 2 Components (Population Health) — THIS IS THE DIFFERENTIATOR

### 2A: Provincial Screening Gap Analysis

**Page: `/analytics`**

Uses the hackathon data to answer: "How big is the chronic disease screening gap in BC?"

**Data pipeline:**
```
patients.csv (2,000 patients)
  → Filter: age >= 40 (diabetes eligible), age >= 50 (CKD eligible), etc.
  → Cross-reference encounters.csv: exclude patients WITH existing diagnoses
    (Type 2 diabetes: ICD E11.9, Hyperlipidemia: E78.x, CKD: N18.x)
  → Cross-reference medications.csv: exclude patients ON treatment
    (metformin, statins, ACE inhibitors, ARBs)
  → Result: "Screening-eligible, undiagnosed" population
  
  → Cross-reference lab_results.csv: for this population, who has abnormal results?
    (HbA1c >= 6.0, Fasting Glucose >= 6.1, LDL >= 3.5, Creatinine/eGFR < 60)
  → Result: "People with undetected abnormalities" = the screening yield
```

**Dashboard cards:**
| Metric | Value | Visual |
|--------|-------|--------|
| Total patients in registry | 2,000 | Large number |
| Screening-eligible (age/risk criteria) | [calculated] | Funnel step 1 |
| No existing diagnosis or treatment | [calculated] | Funnel step 2 |
| Abnormal lab results detected | [calculated] | Funnel step 3 — red highlight |
| Detection rate | [calculated]% | Bold, large |

**Funnel visualization:**
A visual funnel showing: Total Population → Eligible → Undiagnosed → Abnormal Results Detected
This is powerful visually and tells the story in one image.

### 2B: Health Equity Mapping

**Page: `/analytics/equity`**

Uses `bc_health_indicators.csv` (78 BC communities) to map the screening gap across the province.

**Key correlations to visualize:**

1. **Unattached Rate vs. ER Visits**
   - X-axis: % without family doctor
   - Y-axis: ER visits per 1,000
   - Scatter plot with trend line
   - Label outlier communities (Mission, Sooke, Prince George)
   - Story: "Communities with more unattached patients have more ER visits"

2. **Unattached Rate vs. Chronic Disease Prevalence**
   - X-axis: % without family doctor
   - Y-axis: Diabetes prevalence (or hypertension prevalence)
   - Story: "Where people don't have doctors, chronic disease is higher — because nobody's catching it early"

3. **Community Risk Ranking**
   - Table ranking all 78 communities by a composite "screening need score":
     - Weight: unattached rate (40%) + chronic disease prevalence (30%) + ER visit rate (30%)
   - Top 10 highlighted as "priority communities for screening program rollout"
   - Story: "If ScreeningBC launched today, these are the 10 communities where it would save the most lives"

4. **Interactive Map** (if time permits)
   - BC map with communities colored by screening need score
   - Click to see community details
   - Use a simple mapping library (e.g., Leaflet or even a styled table if map is too complex)

### 2C: Cost Impact Modeling

**Page: `/analytics/impact`**

A simple but powerful calculator that estimates the financial impact of the screening program.

**Inputs (adjustable sliders):**
- Population size: 100 - 1,000,000 (default: number of unattached BC residents)
- Screening uptake rate: 10% - 80% (default: 40%)
- Detection rate: use the rate calculated from hackathon data

**Calculations:**
```
People screened = Population × Uptake rate
Abnormal detected = People screened × Detection rate

Cost of screening:
  Per-person cost = $50 (HbA1c + lipid panel + creatinine)
  Total screening cost = People screened × $50

Cost avoided (annual):
  Unmanaged diabetes → ER: $15,000/patient/year
  Managed diabetes: $3,600/patient/year
  Savings per detected diabetic: $11,400/year

  Dialysis (end-stage CKD): $90,000/patient/year
  Early CKD management: $5,000/patient/year
  Savings per detected CKD: $85,000/year

  Statin-prevented cardiac event: $40,000/event
  
ROI = Cost avoided / Cost of screening
```

**Display:**
- Clean card layout with the key numbers
- Sliders that update calculations in real-time
- "For every $1 spent on screening, $[X] in complications are prevented"
- Pull-quote format for the key stat

### 2D: Physician Operations Dashboard

**Page: `/analytics/physician`**

The supervising physician's view of the program:

- Screening volume this week/month
- Results requiring immediate escalation (red-flagged)
- Breakdown by condition: how many normal/borderline/abnormal per test
- Patient list with follow-up status
- Population-level insight: "Of 200 patients screened, 34 had pre-diabetes, 12 had high LDL"

---

## Shared Data Analysis Script

The developer should build a reusable analysis module that produces all the numbers both tracks need. This runs once at build time (or on demand from the admin panel).

```javascript
// lib/population-analysis.ts

interface ScreeningAnalysis {
  totalPatients: number;
  eligiblePatients: number;
  undiagnosedEligible: number;
  abnormalResults: {
    diabetes: { prediabetes: number; diabetes: number };
    cholesterol: { borderline: number; high: number; fh_suspected: number };
    ckd: { mild: number; moderate: number; severe: number };
  };
  detectionRate: number;
  communityBreakdown: CommunityAnalysis[];
  costImpact: CostProjection;
}

function runScreeningAnalysis(
  patients: Patient[],
  encounters: Encounter[],
  labs: LabResult[],
  medications: Medication[],
  communities: CommunityIndicator[]
): ScreeningAnalysis {
  // 1. Filter eligible patients by age
  // 2. Exclude already-diagnosed (encounters with relevant ICD codes)
  // 3. Exclude already-treated (medications matching relevant drug classes)
  // 4. For remaining patients, check lab values against thresholds
  // 5. Calculate detection rates
  // 6. Map to communities using postal codes
  // 7. Calculate cost projections
  return analysis;
}
```

---

## Demo Script (3 Minutes — Dual-Track Emphasis)

### 0:00-0:20 — The Problem (Population Lens)
"A million BC residents don't have a family doctor. We analyzed the screening gap."

*Show the population dashboard with funnel visualization*

"2,000 patients. 842 eligible for screening. 427 with no existing diagnosis. And 57% of those — 243 people — have abnormal lab results that nobody caught."

### 0:20-0:40 — The Equity Story (Track 2)
*Show the scatter plot: unattached rate vs ER visits*

"This isn't random. The communities where people can't find a doctor are the same communities with the highest ER visits. Mission, Sooke, Prince George. No screening means no early detection means more emergencies."

### 0:40-1:00 — The Solution
"So we built ScreeningBC. It works like BC Cancer Screening — but for diabetes, cholesterol, and kidney disease."

### 1:00-1:40 — Patient Journey (Track 1)
*Switch to patient portal*

- Log in as Margaret (54, Sooke, no doctor)
- Show screening eligibility
- Show lab requisition
- Trigger results injection
- Show results dashboard with traffic lights

### 1:40-2:10 — AI Interpretation (Track 1)
*Show streaming AI health summary*

"The AI interprets the results in plain language. Margaret's blood sugar is borderline — here's what that means for her. Her cholesterol is high — here's her cardiovascular risk score. Here's exactly what to do next."

### 2:10-2:30 — The Impact (Track 2)
*Show cost impact calculator*

*Adjust slider to 100,000 patients (realistic pilot)*

"If we screened 100,000 unattached British Columbians, at a 40% uptake rate and the detection rates we found in the data — we'd prevent an estimated $[X] million in complications annually. For every dollar spent on screening, [Y] dollars in ER visits and dialysis are prevented."

### 2:30-2:50 — The Physician View (Track 2)
*Show physician dashboard*

"And for the supervising physician, a real-time view of the program: who's been screened, what was found, who needs follow-up."

### 2:50-3:00 — The Close
"This isn't a new idea. It's an obvious extension of what BC already does for cancer. Same infrastructure, same model, bigger impact. Diabetes, cholesterol, and kidney disease are the conditions that fill our ERs and cost the system the most when missed. It's time to screen for them."

---

## Build Order (8 Hours)

### Hour 1-2: Data Foundation
1. Build the population analysis script (most critical — all numbers flow from this)
2. Load CSVs, run eligibility analysis, cross-reference labs
3. Get the real numbers. Verify they tell a compelling story.
4. Set up Next.js + shadcn/ui + BC gov colors

### Hour 2-3: Track 2 — Population Dashboard
5. Build the screening funnel visualization
6. Build the community ranking table
7. Build the scatter plot (unattached rate vs ER visits)
8. Build the cost impact calculator with sliders

### Hour 3-5: Track 1 — Patient Portal
9. Build login + patient profile
10. Build screening eligibility + requisition
11. Build results dashboard
12. Build admin panel + result injection

### Hour 5-6: AI Layer
13. Build streaming health summary
14. Build chat companion
15. Write system prompts

### Hour 6-7: Physician Dashboard + Polish
16. Build physician operations view
17. Cross-reference with bc_health_indicators.csv
18. Responsive design pass

### Hour 7-8: Demo + Deploy
19. Email integration (Resend)
20. Pre-seed demo patient
21. Deploy to Vercel
22. Rehearse 3-minute demo

---

## File Structure

```
screeningbc/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                      # Landing page
│   ├── login/page.tsx                # PHN login
│   ├── profile/page.tsx              # Patient profile
│   ├── screening/page.tsx            # Eligibility
│   ├── requisition/page.tsx          # Lab req
│   ├── results/
│   │   ├── page.tsx                  # Results dashboard
│   │   └── summary/page.tsx          # AI summary
│   ├── chat/page.tsx                 # AI chat
│   ├── analytics/                    # TRACK 2
│   │   ├── page.tsx                  # Population screening gap
│   │   ├── equity/page.tsx           # Health equity mapping
│   │   ├── impact/page.tsx           # Cost calculator
│   │   └── physician/page.tsx        # Physician dashboard
│   ├── admin/page.tsx                # Demo controls
│   └── api/
│       ├── auth/route.ts
│       ├── patient/route.ts
│       ├── screening/route.ts
│       ├── results/route.ts
│       ├── analysis/route.ts         # Population analysis endpoint
│       ├── summary/route.ts          # AI streaming
│       ├── chat/route.ts
│       └── email/route.ts
├── components/
│   ├── ui/                           # shadcn/ui
│   ├── charts/                       # Recharts components
│   │   ├── screening-funnel.tsx
│   │   ├── scatter-plot.tsx
│   │   └── cost-calculator.tsx
│   ├── bc-header.tsx
│   ├── bc-footer.tsx
│   └── result-card.tsx
├── lib/
│   ├── population-analysis.ts        # Core analysis engine
│   ├── screening-engine.ts           # Eligibility + classification
│   ├── framingham.ts
│   ├── clinical-thresholds.ts
│   ├── data-loader.ts                # CSV loading
│   └── email.ts
├── data/                             # Hackathon CSVs
└── ...config files
```

---

## Visualization Library

For the Track 2 charts, use **Recharts** (lightweight, React-native, works with shadcn/ui):

```bash
npm install recharts
```

Charts needed:
1. **Funnel chart** — Population → Eligible → Undiagnosed → Abnormal
2. **Scatter plot** — Unattached rate vs ER visits (with labeled outliers)
3. **Bar chart** — Detection rate by condition
4. **Slider calculator** — Cost impact with live-updating numbers

---

## Why This Spec Might Win

1. **Double scoring opportunity.** If the hackathon lets teams compete in multiple tracks, you get judged twice.
2. **The most comprehensive use of hackathon data.** Uses ALL provided datasets: patients, encounters, labs, medications, vitals, AND bc_health_indicators. Judges love seeing all the data used.
3. **Both emotional and analytical.** Margaret's story (Track 1) makes judges feel. The population numbers (Track 2) make judges think. Together: devastating.
4. **The cost calculator is a killer feature.** Judges from health authority backgrounds will play with those sliders. "For every $1 spent..." is the kind of number that gets quoted in their reports.

## Why This Spec Might Lose

1. **Breadth vs. depth.** You're building more screens than any other spec. If execution is mediocre across the board, it loses to a team that did one thing brilliantly.
2. **Charts take time.** Recharts is fast but not instant. Each chart is 30-60 minutes of dev time including data formatting.
3. **Two tracks means two evaluations.** If the hackathon judges each track separately and you only enter one, the dual-track advantage is wasted.
4. **Data risk.** The population analysis depends on the hackathon data producing compelling numbers. If it doesn't, the Track 2 story falls flat.

## Mitigation

**If running out of time, cut in this order:**
1. Cut the interactive map (hardest chart, least demo impact)
2. Cut the chat companion (nice to have, not essential)
3. Simplify the cost calculator (static numbers instead of sliders)
4. Simplify the physician dashboard (table only, no charts)
5. NEVER cut: the population funnel, the scatter plot, the patient journey, the streaming AI summary
