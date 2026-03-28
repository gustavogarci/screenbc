# ScreenBC

**Preventive health screening for every British Columbian — especially the 1M+ without a family doctor.**

An $8 blood test catches diabetes and high cholesterol years before they become a $15,000 ER visit. BC already does centralized screening for cancer. ScreenBC does it for everything else.

---

## The Problem

Preventive screening for diabetes and high cholesterol saves lives — but it only happens when a family doctor orders it. Over **one million British Columbians** are on waitlists or have no doctor at all. They fall through the cracks. By the time they show up in an emergency department with a diabetic foot ulcer, kidney failure, or a heart attack, the cost — human and financial — is orders of magnitude higher than the simple blood test that would have caught it early.

There is no population-level screening program for chronic disease in BC. Cancer screening exists (BC Cancer). Nothing like it exists for diabetes or cardiovascular risk.

## What ScreenBC Does

ScreenBC is a **passive outreach** screening service — modeled after BC Cancer Screening — that:

1. **Identifies** British Columbians overdue for preventive screening from provincial health records
2. **Notifies** them by email or text — "You may be due for free screening"
3. **Enrolls** them through a BC Services Card login (the same auth used by Health Gateway)
4. **Generates** a lab requisition they take to any LifeLabs location (no referral needed)
5. **Interprets** results using AI grounded in Canadian clinical guidelines (Diabetes Canada, Canadian Cardiovascular Society)
6. **Guides** them with plain-language next steps — lifestyle resources for borderline results, nearby walk-in clinics and UPCCs for abnormal results

No physician reviews individual results in Phase 1 — by design. Diabetes and cholesterol screening **never produce a same-day emergency**. The clinical logic is deterministic (guideline thresholds decide the tier), and the AI writes the human-readable explanation within strict guardrails.

## How It Works

```
Provincial Registry ──→ Identifies overdue patients ──→ Email/text notification
                                                              │
                                                              ▼
                                                    Patient clicks link
                                                              │
                                                              ▼
                                                  BC Services Card login
                                                              │
                                                              ▼
                                                     Consent + enroll
                                                              │
                                                    ┌─────────┴──────────┐
                                                    ▼                    ▼
                                          Optional intake         Lab requisition
                                          questionnaire           (printable, any LifeLabs)
                                          (cardiovascular risk)         │
                                                    │                   ▼
                                                    │           Blood work done
                                                    │                   │
                                                    └─────────┬─────────┘
                                                              ▼
                                                    AI interprets results
                                                    (Canadian guidelines)
                                                              │
                                              ┌───────────────┼───────────────┐
                                              ▼               ▼               ▼
                                           GREEN           YELLOW            RED
                                          Normal         Borderline        Abnormal
                                       "See you in      Resources +     "See a doctor.
                                        3 years."       lifestyle tips   Here are UPCCs
                                                        Rescreen 6mo.    near you."
```

## What Gets Screened

| Condition | Tests | Guideline Source |
|---|---|---|
| **Type 2 Diabetes** | HbA1c, Fasting Glucose | Diabetes Canada Clinical Practice Guidelines |
| **High Cholesterol** | Lipid Panel (Total, LDL, HDL, Triglycerides) | Canadian Cardiovascular Society 2021 Dyslipidemia Guidelines |
| **Cardiovascular Risk** | Framingham Risk Score (calculated from labs + optional questionnaire) | CCS Framingham Risk Score |

## The AI Layer

ScreenBC uses AI to generate **personalized, plain-language health summaries** — not to make clinical decisions. The clinical tier (green / yellow / red) is determined by deterministic threshold logic before the AI ever sees the data. The AI's job is to explain what the result means *for this patient*, in language a non-medical person can understand and act on.

The AI is constrained by a clinical system prompt that enforces Canadian guidelines, prohibits diagnosis, prohibits prescribing, and always includes a safety net directing patients to 8-1-1 (HealthLink BC) or their nearest emergency department.

Patients can ask follow-up questions through an embedded chat companion — "What foods should I avoid?" / "Is my cholesterol dangerous?" / "Where can I see a doctor near me?" — and receive grounded, guideline-consistent answers.

## Phased Rollout

| Phase | Screens For | Physician Oversight | Status |
|---|---|---|---|
| **Phase 1** (this demo) | Diabetes + Cholesterol | None needed — no results are ever emergencies | Built |
| **Phase 2** | + Kidney Disease (eGFR) | Active — critical eGFR < 30 requires same-day ER referral | Roadmap |

Phase 2 introduces a physician-on-call notification loop because kidney screening *can* produce emergency results. Phase 1 is intentionally scoped to conditions where it cannot.

## Demo

Three synthetic patients demonstrate the full spectrum of screening outcomes:

| Patient | Scenario | Key Results |
|---|---|---|
| **Margaret Johnson** (age 55, Victoria) | Borderline — caught early | Pre-diabetes (HbA1c 6.3%), borderline cholesterol, intermediate cardiovascular risk |
| **Sarah Chen** (age 52, Victoria) | All clear | Everything normal — "See you in 3 years" |
| **Robert Kim** (age 63, Abbotsford) | Needs attention | Diabetes (HbA1c 7.1%), LDL 5.4 (familial hypercholesterolemia flag), high cardiovascular risk |

Demo credentials:

| Patient | Username | Password |
|---|---|---|
| Margaret (yellow) | `margaret.johnson` | `demo1234` |
| Sarah (green) | `sarah.chen` | `demo1234` |
| Robert (red) | `robert.kim` | `demo1234` |

The `/admin` panel (not linked in UI) provides demo controls: simulate lab results arriving, view email previews, reset patient state.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | shadcn/ui + BC Government design tokens |
| AI | Vercel AI SDK + OpenAI (streaming summaries + chat) |
| Clinical Logic | Deterministic threshold engine (Diabetes Canada + CCS guidelines) |
| Risk Calculation | Framingham Risk Score (age, sex, cholesterol, HDL, BP, smoking, diabetes) |
| Data | In-memory store with curated synthetic patients (no database) |
| Auth | Mock BC Services Card login (cookie session) |

## Quick Start

```bash
git clone <repo-url>
cd screenbc
npm install
```

Create `.env.local`:

```env
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Log in as any demo patient. Use `/admin` to control demo state.

## Project Structure

```
screenbc/
├── app/
│   ├── login/            # BC Services Card-style login
│   ├── consent/          # Program consent (one-pager)
│   ├── portal/           # Patient dashboard
│   │   ├── questionnaire/  # Cardiovascular risk intake
│   │   ├── requisition/    # Printable lab requisition
│   │   └── results/        # Results + AI summary + chat
│   ├── admin/            # Demo control panel
│   └── api/              # Auth, screening, chat, admin routes
├── components/
│   ├── screening/        # Clinical UI (results table, chat, summary)
│   ├── auth/             # Login form
│   ├── layout/           # BC Gov header, footer, logo
│   └── ui/               # shadcn/ui primitives
├── lib/
│   ├── screening-logic.ts  # Guideline threshold classification
│   ├── framingham.ts       # Framingham Risk Score calculation
│   ├── prompts.ts          # AI system prompts (clinical guardrails)
│   ├── patient-store.ts    # In-memory patient state
│   └── auth.ts             # Mock session management
└── data/
    ├── demo-patients.json       # 3 curated patients (green/yellow/red)
    ├── upcc-locations.json      # UPCCs by postal code
    └── lifelabs-locations.json  # LifeLabs by postal code
```

## Clinical References

- [Diabetes Canada — Screening for Diabetes in Adults (Ch. 4)](https://diabetes.ca/health-care-providers/clinical-practice-guidelines/chapter-4)
- [Canadian Cardiovascular Society — 2021 Dyslipidemia Guidelines](https://ccs.ca/guideline/2021-lipids/)
- [CCS Framingham Risk Score Calculator](https://ccs.ca/frs/)
- [Canadian Task Force on Preventive Health Care — Type 2 Diabetes](https://canadiantaskforce.ca/type-2-diabetes-clinician-summary/)

## Known Limitations

- **Equity gap**: Patients without email, phone, or fixed address are missed by passive outreach. This is a known limitation shared with BC Cancer Screening. Community health centers and outreach workers would serve as physical access points.
- **Demo-only auth**: Real deployment would integrate with BC Services Card (OIDC) via the provincial identity provider.
- **No real lab integration**: Results are simulated. Production would connect to LifeLabs via HL7/FHIR interfaces.
- **AI is not a physician**: The system interprets against published guidelines and explicitly tells patients it is not a substitute for medical advice.

---

*BC already proved centralized screening works — for cancer. ScreenBC extends that model to the chronic conditions that fill our emergency rooms, reaching the people who need it most.*
