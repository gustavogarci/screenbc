# CheckUp BC — Automated Preventive Screening for Unattached Patients

## The One-Liner

A web service that screens British Columbians without a family doctor for diabetes, high cholesterol, and chronic kidney disease — catching the conditions that cost the system the most when missed.

---

## The Problem

Over 1 million BC residents don't have a family doctor. When you don't have a doctor, nobody orders your routine blood work. Nobody screens you for the conditions that develop silently and explode expensively.

- **Diabetes:** 1 in 3 Canadians with diabetes are undiagnosed. Unmanaged diabetes leads to blindness, amputation, dialysis, and heart attacks. Average annual cost per patient: $3,600 managed vs $15,000+ in complications.
- **High cholesterol (dyslipidemia):** Familial hypercholesterolemia affects 1 in 250 Canadians. Most don't know. Untreated, it causes heart attacks in people as young as 30. One lipid panel catches it.
- **Chronic kidney disease:** 1 in 10 Canadians have some stage of CKD. Early stages are completely asymptomatic. A single creatinine test catches it. Once it progresses to dialysis: $90,000/year per patient.

These three conditions share something critical: they are **algorithmic to screen for, algorithmic to interpret, and algorithmic to act on.** The guidelines are clear. The thresholds are defined. The follow-up paths are well-established. This is exactly the kind of work AI can do reliably.

The cancer screening model already proves this works in BC. The BC Cancer Screening Program sends letters, generates requisitions, and recalls patients for cervical, breast, and colon cancer screening — all without a family doctor. But no equivalent exists for the chronic conditions that generate the most ER visits, the most hospitalizations, and the most long-term healthcare cost.

---

## The Solution

**CheckUp BC** is a web-based service that:

1. **Identifies who needs screening.** Any BC resident can sign up with their PHN (Personal Health Number) and date of birth. The system determines what screening is due based on age, sex, and self-reported risk factors (family history, smoking, known conditions).

2. **Generates a lab requisition.** When screening is due, the system generates a standardized lab requisition for the appropriate tests (HbA1c or fasting glucose, lipid panel, creatinine/eGFR). The patient takes it to any LifeLabs location.

3. **Interprets the results with AI.** When results come back, the system classifies each result into a clear risk tier:
   - **Normal** — "Your results are within the healthy range. Rescreen in 3 years."
   - **Borderline/Pre-disease** — "Your results suggest early risk. Here's what you can do, and when to rescreen."
   - **Abnormal** — "Your results need medical attention. Here's how to get it."

4. **Generates a personalized one-pager.** For each patient, a clear, plain-language summary: what was tested, what the results mean for THEM specifically, evidence-based lifestyle recommendations, and when to get tested again.

5. **Escalates when needed.** Critical or clearly abnormal results trigger immediate escalation: referral to a UPCC, notification to 811, or flagging for urgent follow-up.

6. **Provides an AI companion.** Patients can ask questions about their results in a chat interface. "What does an HbA1c of 6.2 mean?" "Should I be worried about my cholesterol?" The AI explains in plain language, provides context, and always directs to a clinician for anything beyond informational guidance.

---

## Why This Idea

### It aligns with every provincial priority

| Priority | How CheckUp BC addresses it |
|---|---|
| Reduce ER wait times | Catches conditions before they become emergencies |
| Serve unattached patients | Designed specifically for the 1M+ without a family doctor |
| Shift care to the community | Screening happens at LifeLabs, interpretation happens online |
| Reduce healthcare costs | Early detection of diabetes/CKD/cholesterol saves tens of thousands per patient |
| Expand access without adding physicians | Runs with minimal physician oversight (one supervising physician for requisitions) |

### It's radically feasible

- The screening criteria are well-defined Canadian clinical guidelines (Diabetes Canada, CCS Dyslipidemia, KDIGO)
- The lab interpretation is algorithmic — defined thresholds, defined risk tiers, defined follow-up intervals
- The infrastructure already exists: LifeLabs takes requisitions, BC has a PHN system, UPCCs exist for escalation
- The cancer screening program proves BC can run centralized screening without individual family doctors
- A pilot could start with a single supervising physician and a few hundred patients

### Your partner can be the physician on it

This was explicitly offered during the conversation. A single physician can supervise the requisitions for a pilot, making this legally viable within BC's current framework. As the pilot proves itself, the model can be adopted provincially — just like cancer screening.

---

## The Demo (3-Minute Walkthrough)

### Screen 1: Patient Onboarding
A patient lands on checkupbc.ca. They enter:
- PHN (Personal Health Number)
- Date of birth
- Optional: family history checkboxes (diabetes, heart disease, high cholesterol), smoking status, known conditions

The system responds: *"Based on your age (54) and risk profile, you're due for screening for diabetes, cholesterol, and kidney function. Here's your lab requisition."*

### Screen 2: Lab Requisition
A clean, printable requisition is generated:
- Patient name, PHN, date of birth
- Tests ordered: HbA1c, Lipid Panel (Total Cholesterol, LDL, HDL, Triglycerides), Creatinine with eGFR
- Supervising physician name
- LifeLabs locations near the patient's postal code

### Screen 3: Results Dashboard
The patient logs back in after getting blood work. They see a clear dashboard:

| Test | Your Result | Status | What It Means |
|---|---|---|---|
| HbA1c | 6.3% | Borderline | Pre-diabetes range. Lifestyle changes recommended. |
| LDL Cholesterol | 4.2 mmol/L | High | Above target. Further assessment recommended. |
| Creatinine / eGFR | 85 mL/min | Normal | Kidney function is healthy. |
| Fasting Glucose | 6.4 mmol/L | Borderline | Consistent with pre-diabetes. |
| Total Cholesterol | 6.1 mmol/L | High | Above recommended range. |

Each result has a traffic-light color (green/yellow/red) and an expandable explanation.

### Screen 4: Your Personalized Health Summary
A one-page AI-generated summary:

> **Your CheckUp BC Results — March 28, 2026**
>
> Hi Margaret. Here's what your screening found:
>
> **Diabetes Screening: Borderline (Pre-diabetes)**
> Your HbA1c is 6.3%, which falls in the pre-diabetes range (6.0-6.4%). This means your blood sugar is higher than normal but not yet in the diabetes range. About 50% of people with pre-diabetes develop diabetes within 5-10 years without intervention — but lifestyle changes can reduce that risk by 58%.
>
> What you can do:
> - 150 minutes of moderate exercise per week
> - Reduce refined carbohydrates and added sugars
> - Aim for 5-7% weight loss if overweight
>
> **Rescreen: 6 months**
>
> **Cholesterol: High — Further Assessment Recommended**
> Your LDL cholesterol is 4.2 mmol/L (target: below 3.5 for most adults). Combined with your age and risk factors, we recommend booking an appointment to discuss whether treatment is appropriate.
>
> Your Framingham Risk Score: **Intermediate (12%)**
> Based on: age 54, female, non-smoker, BP 128/82, total cholesterol 6.1, LDL 4.2
>
> **Next Step:** Book an appointment at your nearest UPCC or walk-in clinic. Bring this summary.
>
> **Kidney Function: Normal**
> Your eGFR is 85 mL/min — healthy kidney function. No action needed. Rescreen in 3 years.

### Screen 5: AI Chat Companion
The patient can ask follow-up questions:
- "What foods should I avoid for pre-diabetes?"
- "Is 4.2 LDL really that bad?"
- "Where's the nearest UPCC?"

The AI responds conversationally, always within evidence-based guidelines, and always with a "talk to a healthcare provider" safety net for anything clinical.

### Screen 6: Physician Dashboard (Optional)
A supervising physician sees:
- Total requisitions generated this week
- Results requiring escalation (red-flagged patients)
- Population-level stats: "Of 200 patients screened this month, 34 had undetected pre-diabetes, 12 had high LDL requiring follow-up, 3 had impaired kidney function"

---

## How It Uses the Hackathon Data

### Track 1 (Clinical AI) — Simulating the Screening Pipeline

The synthetic patient data is a perfect match:

| Data | What We Use It For |
|---|---|
| **patients.csv** (2,000 patients) | Patient profiles with age, sex, PHN (insurance_number), postal code. Filter to ages 50+ to create the screening-eligible population. |
| **lab_results.csv** (3,000 results) | Contains exactly the tests we need: **HbA1c** (257 results), **Fasting Glucose** (270), **Total Cholesterol** (256), **LDL Cholesterol** (218), **Creatinine** (237). Each has values, units, reference ranges, and abnormal flags. |
| **encounters.csv** (10,000 encounters) | Identify patients with existing diagnoses of Type 2 diabetes (862), Hypertension (976), Hyperlipidemia (59) to validate the screening model against known conditions. |
| **medications.csv** (5,000 records) | Cross-reference: patients on metformin/statins/ACE inhibitors already have managed conditions. Patients NOT on these medications with abnormal labs are the "missed" ones — exactly what screening would catch. |
| **vitals.csv** (2,000 readings) | Blood pressure data feeds into the Framingham Risk Score calculation for cholesterol risk stratification. |
| **canadian_drug_reference.csv** | Map drug names to indications for the medication context layer. |

**The key analysis:** Find patients aged 50+ with no diabetes/cholesterol/CKD diagnosis in their encounters, no relevant medications — but who have abnormal lab values. These are the people the system would catch. We can quantify: "Of 800 patients aged 50+ without a known diagnosis, X% had undetected abnormal results."

### Track 2 (Population Health) — The Case for the Service

| Data | What We Use It For |
|---|---|
| **bc_health_indicators.csv** (78 communities) | `pct_without_family_doctor` identifies the target communities. `diabetes_prevalence` and `hypertension_prevalence` show where the unscreened burden is highest. `er_visits_per_1000` shows the downstream cost of not screening. |

**The key insight from the data:**
- Average 18% of BCers don't have a family doctor. In some communities: **Mission (38.2%), Sooke (33.7%), East Kootenay (31.7%), Prince George (29%)**
- These same communities often have high chronic disease prevalence and high ER visit rates
- The correlation between `pct_without_family_doctor` and `er_visits_per_1000` tells the story: no doctor → no screening → conditions worsen → ER visits spike

---

## Technical Architecture (For the Build)

```
┌─────────────────────────────────────────────────────┐
│                   checkupbc.ca                       │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │ Patient   │  │ Results  │  │ AI Chat           │  │
│  │ Onboard   │  │ Dashboard│  │ Companion         │  │
│  └────┬─────┘  └────┬─────┘  └────────┬──────────┘  │
│       │              │                 │              │
│  ┌────▼──────────────▼─────────────────▼──────────┐  │
│  │           Screening Engine                      │  │
│  │                                                 │  │
│  │  • Age/sex/risk → which tests are due           │  │
│  │  • Lab values → risk tier classification         │  │
│  │  • Risk factors → Framingham score              │  │
│  │  • Results → personalized summary (LLM)         │  │
│  │  • Abnormals → escalation routing               │  │
│  └────────────────────┬────────────────────────────┘  │
│                       │                              │
│  ┌────────────────────▼────────────────────────────┐  │
│  │           Data Layer                             │  │
│  │  • Patient profiles (patients.csv)              │  │
│  │  • Lab results (lab_results.csv)                │  │
│  │  • Medications (medications.csv)                │  │
│  │  • Population stats (bc_health_indicators.csv)  │  │
│  │  • Drug reference (canadian_drug_reference.csv) │  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Stack (suggested)

- **Frontend:** Next.js with shadcn/ui (clean, modern health UI)
- **AI:** Vercel AI SDK + AI Gateway for the chat companion and summary generation
- **Data:** Pandas for the screening engine logic, served via API routes
- **Visualization:** Recharts or Plotly for the results dashboard and population maps

---

## Clinical Logic (The Algorithms)

### Diabetes Screening
| Test | Normal | Pre-diabetes | Diabetes |
|---|---|---|---|
| HbA1c | < 6.0% | 6.0 – 6.4% | ≥ 6.5% |
| Fasting Glucose | < 6.1 mmol/L | 6.1 – 6.9 mmol/L | ≥ 7.0 mmol/L |

- **Screen who:** Everyone 40+ every 3 years. Earlier/more often if risk factors (family history, obesity, ethnicity at higher risk).
- **If pre-diabetes:** Lifestyle counseling, rescreen in 6 months.
- **If diabetes:** Refer to UPCC or physician for confirmation and management.

### Cholesterol (Dyslipidemia) Screening
| Metric | Desirable | Borderline | High |
|---|---|---|---|
| Total Cholesterol | < 5.2 mmol/L | 5.2 – 6.2 mmol/L | > 6.2 mmol/L |
| LDL Cholesterol | < 3.5 mmol/L | 3.5 – 4.9 mmol/L | ≥ 5.0 mmol/L |

- **Screen who:** All men 40+ and women 50+ (or post-menopausal). Consider all adults once for familial hypercholesterolemia (LDL > 5.0).
- **If borderline:** Calculate Framingham Risk Score using age, sex, BP, smoking, cholesterol. Stratify into low/intermediate/high risk.
- **If high + high Framingham risk:** Refer for statin consideration.
- **Familial hypercholesterolemia flag:** LDL > 5.0 mmol/L → immediate referral regardless of age.

### Kidney Function (CKD) Screening
| Metric | Normal | Mildly Reduced | Moderate | Severe |
|---|---|---|---|---|
| eGFR (mL/min) | ≥ 90 | 60 – 89 | 30 – 59 | < 30 |

- **Screen who:** Everyone 50+ every 3 years. Earlier if diabetes, hypertension, or family history of kidney disease.
- **If mildly reduced:** Rescreen in 1 year, monitor BP.
- **If moderate or worse:** Refer to physician/UPCC urgently.

### Framingham Risk Score (for cholesterol stratification)
Inputs: age, sex, total cholesterol, HDL cholesterol, systolic BP, smoking status, diabetes status.
Output: 10-year cardiovascular risk percentage.
- **Low risk (< 10%):** Lifestyle modification, rescreen in 5 years.
- **Intermediate (10-19%):** Discuss statin therapy, rescreen in 1 year.
- **High (≥ 20%):** Statin therapy recommended, refer to physician.

---

## The Pitch Narrative (For Judges)

> "There are over a million people in BC without a family doctor. When you don't have a doctor, nobody orders your blood work. Nobody checks your cholesterol. Nobody screens you for diabetes. These conditions develop silently — and then they explode.
>
> An undiagnosed diabetic ends up in the ER with a foot ulcer. That costs $15,000. A single HbA1c test costs $8.
>
> We built CheckUp BC. You sign up with your health number. The system knows your age, checks your risk factors, and generates a lab requisition. You walk into any LifeLabs. When your results come back, AI interprets them — not in medical jargon, but in language you understand. 'Your blood sugar is borderline. Here's exactly what that means for you, and here's what you can do about it.'
>
> If something is seriously wrong, the system escalates immediately — directs you to the nearest UPCC, flags it for a physician.
>
> We ran this against the hackathon data: of [X] patients over 50 with no known diagnosis, [Y]% had abnormal results that would have been caught by a single screening blood test. In communities like Mission, where 38% of people don't have a family doctor and ER visits are among the highest in the province, this service would have caught [Z] patients before they became emergencies.
>
> BC already does this for cancer. It's time to do it for the conditions that fill our ERs every single day.
>
> And unlike most hackathon ideas, this one has a path to reality. One supervising physician. A standardized lab requisition. LifeLabs infrastructure that already exists. We're not asking the system to change. We're using the system that's already there."

*(Fill in [X], [Y], [Z] after running the analysis on the hackathon data.)*

---

## Growth Path (Beyond the Hackathon)

**Phase 1 — Pilot (what we're building)**
- Single supervising physician (your partner)
- 200-500 patients in one community (e.g., Sooke, where 33.7% are unattached)
- Three screening tests: HbA1c, lipid panel, creatinine
- Web-based results + AI companion

**Phase 2 — Expand**
- Connect to LifeLabs API for automatic result retrieval (no manual entry)
- Add self-reported vitals from wearables (Apple Health, Fitbit) for richer risk assessment
- More nuanced risk models: incorporate family history, ethnicity, medication history
- Add pediatric lipid screening (one-time, to catch familial hypercholesterolemia — your partner's suggestion about the 6-year-old)

**Phase 3 — Provincial**
- Integration with BC Health Gateway / PHN system for automatic eligibility identification
- Provincial adoption similar to BC Cancer Screening
- Automated recall system: "It's been 3 years since your last screening — you're due"
- Expand to more conditions: thyroid (TSH), anemia (hemoglobin), liver function (ALT)

---

## Questions Your Partner Should Verify

1. **Does the Health Connect Registry already risk-stratify?** They offered to find out. If it doesn't, that strengthens the case.
2. **Can a physician legally sign off on screening requisitions for patients they haven't seen?** The cancer screening model suggests yes, but confirm.
3. **What's the LifeLabs requisition format?** Knowing whether there's a standard electronic format would help the demo.
4. **Would Tally/Med Access accept a CheckUp BC summary as patient context?** If a patient walks into a UPCC with their CheckUp BC one-pager, does that integrate into any existing workflow?

---

## Hackathon Evaluation Alignment

| Criterion | Score Rationale |
|---|---|
| **Clinical Relevance (30 pts)** | Addresses the #1 access crisis (1M unattached patients). Targets conditions with the highest long-term cost when missed. Evidence-based screening guidelines. Universal target population. Clear patient benefit: early detection, plain-language results, guided next steps. |
| **Feasibility & Safety (25 pts)** | Screening criteria are established clinical guidelines — not novel AI. Lab interpretation is algorithmic with well-defined thresholds. AI generates informational content, not diagnostic decisions. Clear escalation for abnormals. "Not a substitute for medical advice" framing throughout. Uses existing infrastructure (LifeLabs, UPCCs, 811). Synthetic data for demo. Pilot model with a real physician is immediately viable. |
