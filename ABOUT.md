# About ScreenBC

## The Team

**ScreenBC** was built by **Gustavo Garcia** (product & engineering) in collaboration with **Dr. Sally Carver**, Family Physician.

We also consulted with multiple physicians across British Columbia throughout the research and design process.

---

## The Problem

Over 700,000 British Columbians don't have a family doctor. For these people, nobody is ordering routine blood work. Nobody is checking for diabetes or high cholesterol — two conditions that develop silently over years and, when caught late, lead to heart attacks, strokes, kidney failure, amputations, and emergency room visits that cost the system tens of thousands of dollars each.

Here's the thing: catching these conditions early is trivial. An HbA1c test costs $8. A lipid panel costs about the same. The tests are available at any LifeLabs in the province. The clinical guidelines for interpreting results are well-established. The infrastructure exists.

But without a family doctor to order the test, it never happens.

The result is a healthcare system that spends billions treating advanced disease that could have been caught with an $8 blood test — if someone had just told the patient they were due.

---

## The Insight

**BC already solved this problem — for cancer.**

BC Cancer Screening proactively identifies patients who are overdue for mammograms, cervical screening, and colon cancer screening. It sends them a notification. It doesn't wait for a family doctor to order the test. The program has been running for years, and it works.

Nobody has done the same thing for chronic disease.

ScreenBC applies the exact same model to diabetes and high cholesterol screening. The infrastructure is already there. The clinical guidelines exist. The labs are everywhere. It just hasn't been connected yet.

---

## Why This Idea

We evaluated over 30 ideas with input from multiple physicians. We kept coming back to the same conclusion: the healthcare system isn't overwhelmed because people can't be treated — it's overwhelmed because nobody is screening them. By the time patients show up, their conditions are advanced, expensive, and harder to manage.

We picked ScreenBC because it was:

- **The most impactful.** It targets a root cause of system stress — unscreened chronic disease — not just a symptom.
- **The most realistic.** It doesn't require new infrastructure, new physician workflows, or new patient behavior. The model is already proven with BC Cancer Screening.
- **A genuine low-hanging fruit.** The tests are cheap. The guidelines are clear. The labs already exist in every community. The registry data to identify overdue patients already exists.
- **Actionable today.** There's a clear path from pilot to province-wide implementation. No moonshot technology required.

---

## Why It Works

**For patients:** It's passive. You get a notification. You walk into a LifeLabs with a requisition. You get your results interpreted in plain language with clear next steps — even if you don't have a doctor. No apps to learn, no new habits to build.

**For physicians:** There's nothing new to learn and no added workload. For Phase 1 conditions (diabetes and cholesterol), no physician is needed in the loop at all — these screening results are never emergencies, and the clinical guidelines are unambiguous enough for automated interpretation.

**For the system:** Every early catch is a downstream ER visit, hospitalization, or surgery that doesn't happen. The economics are compelling: an $8 test versus a $15,000+ emergency admission.

---

## How It Works

1. **Identify** — The system uses provincial health registry data (age, PHN, lab history) to identify patients who are overdue for preventive screening.
2. **Notify** — The patient receives an email or text: "You may be due for preventive health screening."
3. **Enroll** — The patient logs in (via BC Services Card), reviews consent, and optionally fills out a brief health questionnaire.
4. **Screen** — The patient receives a lab requisition and takes it to any LifeLabs location. Standard blood tests: HbA1c, fasting glucose, lipid panel.
5. **Interpret** — Results are interpreted using AI grounded in Canadian clinical guidelines (Diabetes Canada, Canadian Cardiovascular Society). Each result is categorized as Normal, Borderline, or Needs Attention.
6. **Guide** — The patient receives a personalized, plain-language summary: what their results mean, what they can do, when to come back, and — if needed — where to find care near them (UPCCs, walk-in clinics, HealthLink BC 8-1-1).

---

## The Roadmap

### Phase 0 — Pilot Program

A small, independent trial that can be run by individual physicians in their own practices or small communities.

- **Conditions screened:** Diabetes (HbA1c) and cholesterol (lipid panel) only
- **Patient enrollment:** Patients opt in and register directly on the platform (not connected to the BC health registry)
- **Physician involvement:** A physician approves and signs lab requisitions
- **Scale:** Small — a handful of practices or one community
- **Goal:** Validate the model, gather patient feedback, measure engagement

This phase requires minimal approvals and can be launched quickly. It proves the concept works in practice before seeking broader support.

### Phase 1 — Sanctioned Pilot

The program becomes officially approved and supported at a provincial level. It runs in targeted communities where screening gap data indicates the highest potential impact.

- **Conditions screened:** Diabetes and cholesterol (same as Phase 0)
- **Patient enrollment:** Connected to the BC health registry — patients are identified and notified proactively, no manual registration needed
- **Physician involvement:** None required. Lab requisitions are generated programmatically under program authority. No physician signs individual requisitions.
- **Scale:** Select communities across BC with high unscreened populations
- **Goal:** Measure clinical impact — how many patients were identified, how many completed screening, how many conditions were caught, what was the downstream effect on ER visits and specialist referrals

This is where we start generating real data on whether the model works at scale.

### Phase 2 — Provincial Expansion

Expand to more communities across British Columbia based on Phase 1 results.

- **Conditions screened:** Diabetes and cholesterol
- **Scale:** Province-wide rollout to all communities
- **Goal:** Make preventive screening for diabetes and cholesterol available to every British Columbian, with priority outreach to those without a family doctor

### Phase 3 — Add Kidney Disease Screening

Introduce chronic kidney disease (CKD) screening via creatinine/eGFR testing.

- **Why this is a separate phase:** Unlike diabetes and cholesterol, kidney function tests can return critical results that require same-day emergency intervention (e.g., eGFR < 30 indicates severe kidney impairment). This requires building a physician-on-call notification loop — a physician is alerted immediately and contacts the patient directly.
- **New infrastructure needed:** Real-time physician notification system, on-call rotation, escalation protocols
- **Goal:** Extend the screening model to a condition that requires active physician oversight for critical results, proving the system can handle both passive and active care pathways

### Phase 4 — Evaluate and Expand

With the platform proven across multiple conditions and both passive and active care pathways, evaluate additional conditions that could benefit from population-level screening.

- **Potential additions:** Determined by clinical advisory input, guideline review, and impact analysis
- **Goal:** Establish ScreenBC as the preventive screening platform for British Columbia — the chronic disease equivalent of BC Cancer Screening

---

## Validation

- **Clinical grounding.** Every screening threshold, interpretation rule, and patient recommendation follows published Canadian clinical guidelines — Diabetes Canada, the Canadian Cardiovascular Society, and (for Phase 3) KDIGO.
- **Proven model.** BC Cancer Screening has been running centralized, proactive screening for years. ScreenBC applies the same approach to a different set of conditions.
- **Tested with BC Cancer.** The outreach model — identify overdue patients from registry data, notify them, give them a requisition, interpret results — is exactly how BC Cancer Screening works today.
- **Physician-validated.** The clinical logic, phasing, and risk stratification were developed and reviewed in collaboration with practicing physicians in BC.

---

## Try It

- **Working prototype:** [screenbc.vercel.app](https://screenbc.vercel.app)
- **Contact:** [gustavo@example.com](mailto:gustavo@example.com)
