# Spec 2: ScreeningBC — Modeled After BC Cancer Screening

> **Approach:** Closely mirrors how BC Cancer Screening actually works. Invitation-based, government-branded, emphasis on the system rather than the AI. Less feature breadth, more institutional credibility. This is the "this could actually be deployed in BC" version.

---

## Key Difference from Spec 1

Spec 1 is a patient-initiated portal. This spec is a **program-initiated screening system** — the system identifies who needs screening and reaches out to them, just like BC Cancer Screening does. The patient doesn't come to us; we come to the patient.

This is a critical distinction because it's how BC Cancer Screening actually works:
1. BC Cancer identifies eligible residents based on age/sex from provincial records
2. BC Cancer sends an invitation letter/email
3. The patient acts on the invitation (goes to LifeLabs, gets a mammogram, etc.)
4. Results flow back through the program
5. The program sends follow-up letters and recall reminders

We replicate this exact model for chronic disease.

---

## Name: ScreeningBC (Chronic Disease Program)

The framing is: "ScreeningBC already screens you for cancer. Now it screens you for diabetes, cholesterol, and kidney disease too."

This positions the solution as an extension of an existing, trusted program rather than a new startup.

---

## Visual Identity

**Identical to Spec 1's BC government design system.** But with one important addition:

The UI should include a "program badge" that mirrors BC Cancer Screening's visual identity:
- A colored sidebar/header section identifying the screening program
- Similar to how screeningbc.ca organizes by: Breast | Cervix | Colon | Lung
- Our addition: **Diabetes | Cholesterol | Kidney**
- Same navigation pattern, same institutional feel

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    ScreeningBC Portal                            │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              POPULATION SCREENING ENGINE                   │  │
│  │                                                           │  │
│  │  1. Ingest patient population (hackathon CSV data)        │  │
│  │  2. Apply eligibility rules (age, sex, risk factors)      │  │
│  │  3. Generate screening invitations for eligible patients  │  │
│  │  4. Track invitation → lab → result → follow-up           │  │
│  └───────────────────┬───────────────────────────────────────┘  │
│                      │                                          │
│  ┌───────────────────▼───────────────────────────────────────┐  │
│  │              PATIENT-FACING PORTAL                         │  │
│  │                                                           │  │
│  │  • Invitation landing page (from email link)              │  │
│  │  • Identity verification (PHN + DOB)                      │  │
│  │  • View screening invitation & reason                     │  │
│  │  • Download lab requisition                               │  │
│  │  • View results when ready                                │  │
│  │  • Read personalized health letter                        │  │
│  └───────────────────┬───────────────────────────────────────┘  │
│                      │                                          │
│  ┌───────────────────▼───────────────────────────────────────┐  │
│  │              PROGRAM OPERATIONS DASHBOARD                  │  │
│  │                                                           │  │
│  │  • Population overview: how many eligible, invited,       │  │
│  │    screened, results received                             │  │
│  │  • Screening yield: % abnormal by condition               │  │
│  │  • Geographic breakdown by community                      │  │
│  │  • Individual patient tracking                            │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Tech Stack
Same as Spec 1: Next.js 16, shadcn/ui, Tailwind, SQLite, Vercel AI SDK (lighter usage), Resend for email.

---

## How It Works — The Full Cycle

### Step 1: Population Analysis (Background/Admin)

The system ingests the hackathon patient data (2,000 patients) and runs eligibility rules:

```
Input: 2,000 patients from patients.csv
Filter: age >= 40 (for diabetes), age >= 50 (for CKD), etc.
Cross-reference: encounters.csv for existing diagnoses
Cross-reference: medications.csv for existing treatment
Output: List of patients eligible for screening who are NOT already diagnosed/treated
```

**This is the analysis that produces the hackathon stat:** "Of X patients eligible for screening, Y% had no existing diagnosis or treatment on file."

### Step 2: Invitation Generation

For each eligible patient, the system generates a screening invitation:
- Invitation code (unique, like BC Cancer's kit order codes)
- Which tests are recommended and why
- Link to the portal

**Email invitation:**
```
Subject: ScreeningBC — You're Invited for Preventive Health Screening

Dear Margaret Johnson,

The ScreeningBC Chronic Disease Screening Program has identified that 
you may benefit from preventive blood work based on your age and 
health profile.

We recommend screening for:
  • Diabetes (blood sugar levels)
  • Cholesterol (heart disease risk)
  • Kidney function

This screening involves a simple blood test at any LifeLabs location. 
It is free and covered by MSP.

To get started:
  1. Visit screeningbc.ca/invitation
  2. Enter your invitation code: SCR-2026-04821
  3. Verify your identity with your PHN and date of birth
  4. Download your lab requisition
  5. Visit any LifeLabs location

This program is supervised by Dr. [Name] and follows BC Clinical 
Practice Guidelines.

If you have questions, call HealthLink BC at 8-1-1.

— ScreeningBC Chronic Disease Screening Program
   A partnership with BC Health
```

### Step 3: Patient Portal (Invitation-Based)

The patient clicks the link → lands on the portal → enters invitation code + PHN + DOB.

**Screen: Invitation Page** (`/invitation`)
- "Welcome to the ScreeningBC Chronic Disease Screening Program"
- Enter invitation code
- Verify identity: PHN + DOB
- If valid → show the screening details

**Screen: Your Screening** (`/screening/[invitation-code]`)
- Clean, letter-style layout (like a formal medical letter)
- "Based on your profile, we recommend the following screening tests:"
- Table of tests with clear explanations of why each is recommended
- "Your lab requisition" section with print/download
- "What to expect" section: where to go, what to bring, fasting requirements
- "After your blood work" section: results typically available in 2-3 days, you'll receive an email

### Step 4: Lab Requisition

Same as Spec 1 — clean, printable format. But styled more like an official program requisition:
- "ScreeningBC Chronic Disease Screening Program"
- Program reference number
- Supervising physician
- Tests ordered with LOINC codes
- Standard LifeLabs-compatible format

### Step 5: Results & Follow-Up Letter

When results are available (simulated in the demo):

**Screen: Your Results** (`/results/[invitation-code]`)
- Styled as a formal results letter, similar to what BC Cancer sends:

```
ScreeningBC Chronic Disease Screening Program
Results Letter

Dear Margaret Johnson,

Thank you for participating in the ScreeningBC screening program.
Your blood work has been reviewed. Here are your results:

DIABETES SCREENING
  HbA1c: 6.3% — BORDERLINE (pre-diabetes range: 6.0–6.4%)
  Fasting Glucose: 6.4 mmol/L — BORDERLINE (6.1–6.9 mmol/L)
  
  What this means: Your blood sugar levels are higher than normal 
  but not yet in the diabetes range. This is called pre-diabetes.
  
  Recommended action: 
  • Lifestyle modifications (diet, exercise — details below)
  • Rescreen in 6 months
  • Consider visiting a UPCC for further discussion

CHOLESTEROL SCREENING
  LDL Cholesterol: 4.2 mmol/L — ABOVE TARGET (target: <3.5 mmol/L)
  Total Cholesterol: 6.1 mmol/L — BORDERLINE (5.2–6.2 mmol/L)
  HDL Cholesterol: 1.4 mmol/L — NORMAL
  Triglycerides: 1.8 mmol/L — NORMAL
  
  Framingham 10-Year Cardiovascular Risk: 12% (INTERMEDIATE)
  
  Recommended action:
  • Book an appointment at a UPCC or walk-in clinic to discuss 
    whether statin therapy is appropriate
  • Bring this letter with you

KIDNEY FUNCTION
  eGFR: 85 mL/min — NORMAL
  
  No action required. Rescreen in 3 years.

YOUR NEXT SCREENING: September 2026 (6 months — due to 
borderline diabetes results)

You will receive a reminder when your next screening is due.

Questions? Call HealthLink BC at 8-1-1.

Supervised by: Dr. [Name], ScreeningBC Medical Director
```

- Below the letter: expandable sections with detailed explanations
- "Lifestyle Recommendations" section (evidence-based, condition-specific)
- "Find a UPCC Near You" section
- Print button for taking to appointments

### Step 6: AI Component (Lighter Than Spec 1)

Instead of a full chat interface, this spec uses AI more conservatively:

**AI-generated personalized summary:** Below the formal results letter, an optional "Understand Your Results" section that uses AI to generate a plain-language explanation tailored to the patient. This streams in when the patient clicks "Explain my results in plain language."

**No chat interface.** The rationale: BC Cancer Screening doesn't have a chatbot. Keeping the AI usage minimal makes it feel more like a real government program and less like a tech demo. The formal letter format is what patients trust.

---

## Program Operations Dashboard (The "Physician View")

**Screen: Program Dashboard** (`/dashboard`)

This is where the program tells its population-level story:

### Overview Cards
- **Total Population:** 2,000 patients in registry
- **Screening Eligible:** [calculated] patients meeting age/risk criteria
- **Already Diagnosed:** [calculated] patients with existing diagnoses
- **Screening Gap:** [calculated] eligible patients with NO diagnosis and NO relevant medications — the people this program would catch
- **Invitations Sent:** [count]
- **Screened:** [count with results]
- **Abnormal Results:** [count needing follow-up]

### Screening Yield Table
| Condition | Screened | Normal | Borderline | Abnormal | Detection Rate |
|-----------|----------|--------|------------|----------|---------------|
| Diabetes | 340 | 210 | 89 | 41 | 38% |
| High Cholesterol | 340 | 180 | 102 | 58 | 47% |
| CKD | 340 | 290 | 38 | 12 | 15% |

### Geographic View
Using postal codes from patients.csv, map eligible patients to communities. Cross-reference with `bc_health_indicators.csv` to show:
- Communities with highest % unattached patients
- Communities with highest screening gap
- Projected screening yield by community

### Individual Patient List
Filterable table of all patients in the program:
- Name, age, sex, invitation status, screening status, result status
- Click to see individual patient detail
- Filter by: needs follow-up, abnormal results, overdue for screening

---

## Demo Script (3 Minutes)

### Minute 0:00-0:30 — The Model That Already Works
"BC Cancer Screening saves lives by reaching out to people before they know they're sick. They send you a letter, you get screened, results come back through the program. No family doctor needed. We built the same model for the chronic diseases that fill our ERs every day: diabetes, cholesterol, kidney disease."

### Minute 0:30-1:00 — The Program Dashboard
- Show the operations dashboard
- "We loaded 2,000 synthetic patients. The system identified [X] who are eligible for screening but have no existing diagnosis."
- Show the geographic breakdown: "In communities like Mission, where 38% don't have a doctor, [Y] patients would receive screening invitations."

### Minute 1:00-1:30 — The Patient Experience
- "Let's follow Margaret Johnson. She's 54, no family doctor, no screening history."
- Show the invitation email
- Walk through the portal: invitation code → identity verification → screening details → lab requisition

### Minute 1:30-2:15 — Results
- "Two days later, Margaret's results are back."
- Show the results letter — formal, clear, trustworthy
- Point out the traffic-light classification
- Show the Framingham risk calculation
- "She doesn't need to interpret anything. The program tells her exactly what to do."

### Minute 2:15-2:45 — The Screening Yield
- Back to the dashboard
- "Of [X] patients we screened, [Y]% had undetected pre-diabetes. [Z]% had high cholesterol needing follow-up. That's [N] people who would have walked around not knowing until they ended up in the ER."
- Show the cost comparison: "Early detection costs $50 in blood work. A diabetes complication costs $15,000."

### Minute 2:45-3:00 — The Ask
"BC already does this for cancer. The infrastructure is there — LifeLabs, UPCCs, MSP. We just need to extend the model to chronic disease. One supervising physician, standardized requisitions, algorithmic interpretation. This isn't a startup idea. It's an obvious gap in a system that already works."

---

## Screens Summary

| Screen | Route | Purpose |
|--------|-------|---------|
| Landing | `/` | Program overview, "Check if you have an invitation" |
| Invitation | `/invitation` | Enter invitation code + PHN + DOB |
| Screening Details | `/screening/[code]` | What tests, why, and lab requisition |
| Results Letter | `/results/[code]` | Formal results + plain-language explanation |
| AI Explanation | (within results page) | Optional "Explain in plain language" AI generation |
| Program Dashboard | `/dashboard` | Population statistics, screening yield, patient tracking |
| Admin | `/admin` | Demo controls: generate invitations, simulate results |

---

## Build Order (6-8 Hours)

### Hour 1-2: Data Analysis + Foundation
1. Load all CSV data, run the eligibility analysis, get the real numbers
2. Set up Next.js + shadcn/ui with BC gov styling
3. Build the program dashboard with real statistics from the data

### Hour 2-3: Invitation System
4. Build invitation generation logic
5. Build the email template
6. Build the invitation landing page + identity verification

### Hour 3-4: Screening & Requisition
7. Build the screening details page
8. Build the printable lab requisition
9. Wire up email sending

### Hour 4-5: Results
10. Build the results letter page
11. Build result classification engine
12. Build admin panel for simulating results
13. Wire up results-ready email

### Hour 5-6: Dashboard Polish
14. Add geographic breakdown using postal codes
15. Add screening yield calculations
16. Add patient tracking table
17. Cross-reference with bc_health_indicators.csv for community stats

### Hour 6-7: AI + Polish
18. Add the "Explain in plain language" AI generation
19. Responsive design pass
20. Pre-seed demo scenario

### Hour 7-8: Demo Prep
21. Rehearse the demo flow
22. Deploy to Vercel
23. Prepare backup screenshots

---

## Why This Spec Might Win

1. **Institutional credibility.** It looks and feels like a real government program, not a tech demo. Judges (especially healthcare professionals) will trust it more.
2. **Proven model.** "We didn't invent this — BC Cancer already does it. We just applied it to chronic disease." This is a much stronger argument than "we built an app."
3. **Population-level story.** The dashboard shows the system-level impact, not just one patient's journey. This resonates with health planners and administrators who are often on hackathon judging panels.
4. **Less AI risk.** By using AI only for the plain-language explanation (not a chatbot), you avoid the "what if the AI says something dangerous" question.
5. **Cleaner demo.** Fewer screens, fewer things to go wrong. The demo flow is tighter and more focused.

## Why This Spec Might Lose

1. **Less technically impressive.** Judges who value technical depth might find this less ambitious than a full chat companion + streaming summaries.
2. **Less interactive.** The patient experience is more passive (receive letter, read letter) vs. Spec 1's interactive dashboard + chat.
3. **The dashboard needs real numbers.** If the hackathon data doesn't produce compelling screening yield statistics, the dashboard falls flat. (Mitigation: pre-calculate the numbers and verify they tell a good story before committing to this approach.)
