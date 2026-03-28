# ScreeningBC — Spec Comparison & Recommendation

> **Read this first.** Five specs, one product idea, different approaches. Pick one and build it.

---

## The Idea (All Specs Share This)

**ScreeningBC** is a web service that screens British Columbians without a family doctor for diabetes, high cholesterol, and chronic kidney disease — modeled after BC Cancer Screening but for chronic disease.

**Why "ScreeningBC" and not "CheckUp BC":**
- "GetChecked" / "Get Checked" is already taken — it's the BCCDC's STI testing service at getcheckedonline.com
- "ScreeningBC" mirrors BC Cancer's actual screening program at screeningbc.ca
- It immediately signals "this is a government health program" — credibility with judges

---

## The Five Specs at a Glance

| # | Spec | Core Idea | Dev Time | Risk Level | Best For |
|---|------|-----------|----------|------------|----------|
| 1 | **Original Vision** | Full patient portal with mock EMR, email, lab upload, chat | 7-8 hrs | High | Team of 2-3 devs who want feature completeness |
| 2 | **BC Cancer Model** | Invitation-based, government-styled, program-operated | 7-8 hrs | Medium | Maximum institutional credibility, "this could really be deployed" |
| 3 | **Demo-Optimized** | Pre-seeded patients, real email, streaming AI, three memorable moments | 6-7 hrs | Medium | Maximum demo impact, "win the room" |
| 4 | **Dual-Track Hybrid** | Patient portal + population analytics dashboard | 7-8 hrs | High | Competing in both tracks, using all hackathon data |
| 5 | **Lean MVP** | One patient, one journey, one AI moment, fully polished | 4-5 hrs | Low | Solo dev, guaranteed completion, pitch > code |

---

## Decision Matrix

### If your developer is solo and you want guaranteed completion:
**→ Pick Spec 5 (Lean MVP)**

### If you have 2+ devs and want to maximize scoring across both hackathon tracks:
**→ Pick Spec 4 (Dual-Track Hybrid)**

### If you want the most impressive live demo with wow moments:
**→ Pick Spec 3 (Demo-Optimized)**

### If you want judges to think "this could actually be deployed in BC tomorrow":
**→ Pick Spec 2 (BC Cancer Model)**

### If you want the broadest feature set and have confidence in your dev speed:
**→ Pick Spec 1 (Original Vision)**

---

## My Recommendation: Spec 3 (Demo-Optimized) with Spec 4's Population Dashboard

Here's why:

1. **The demo wins the hackathon, not the code.** Spec 3 is designed around three memorable moments that judges will remember.

2. **The population analysis from Spec 4 should be the opening shot.** Starting with "we analyzed 2,000 patients and found 57% have undetected abnormalities" is more powerful than starting with a login screen.

3. **The streaming AI summary is the technical showcase.** This is the moment where judges go "okay, that's real." One powerful AI moment beats three mediocre ones.

4. **Real email delivery is a wow factor** that costs only 30 minutes of dev time (Resend free tier).

5. **Pre-seeded patients eliminate all auth/registration complexity** — the demo flows without friction.

**Suggested hybrid build order:**
1. Hours 1-2: Data analysis (get real numbers from CSVs) + Next.js setup + BC gov styling
2. Hours 2-3: Population dashboard (funnel chart, community table, cost stats)
3. Hours 3-5: Patient journey (Margaret's screening → requisition → results with traffic lights)
4. Hours 5-6: Streaming AI health summary
5. Hours 6-7: Email integration + admin panel for demo triggers
6. Hours 7-8: Polish, deploy, rehearse

**Cut list (if behind schedule):**
- Cut first: Chat companion, interactive cost calculator sliders
- Cut second: Real email (use screenshot instead)
- Cut third: Community scatter plot chart
- NEVER cut: Population numbers, patient results table, streaming AI summary

---

## Shared Across All Specs

### Visual Identity
All specs use BC government design system colors and styling. This is non-negotiable — it's what makes the prototype feel real.

| Element | Value |
|---------|-------|
| Primary Blue | `#013366` |
| Primary Gold | `#FCBA19` |
| Link Blue | `#255A90` |
| Success (Normal) | `#42814A` |
| Warning (Borderline) | `#F8BB47` |
| Danger (Abnormal) | `#CE3E39` |
| Background | `#FAF9F8` |
| Text | `#2D2D2D` |
| Font | Noto Sans (BC Sans substitute) |

### Clinical Logic
All specs use the same thresholds from Canadian clinical guidelines:

**Diabetes:** HbA1c <6.0% normal, 6.0-6.4% pre-diabetes, ≥6.5% diabetes
**Cholesterol:** LDL <3.5 normal, 3.5-4.9 borderline, ≥5.0 high
**CKD:** eGFR ≥90 normal, 60-89 mild, <60 moderate+

### Tech Stack
All specs: Next.js 16 + shadcn/ui + Tailwind CSS + Vercel AI SDK

### Data Source
All specs use the hackathon CSVs: patients.csv, encounters.csv, lab_results.csv, medications.csv, vitals.csv, bc_health_indicators.csv

---

## Critical First Step (Before Picking a Spec)

**Run the data analysis.** Before your developer writes a single line of UI code, they should:

1. Load all CSVs
2. Calculate: how many patients are eligible for screening?
3. Calculate: of those, how many have no existing diagnosis?
4. Calculate: of those, how many have abnormal lab results?
5. Get the actual numbers

If the numbers are compelling (>30% detection rate), every spec works great.
If the numbers are weak (<15% detection rate), you may need to adjust criteria or lean harder on the BC population-level statistics from bc_health_indicators.csv.

**The numbers are the foundation of the entire pitch.** Get them right first.

---

## Files in This Folder

| File | What It Is |
|------|-----------|
| `spec-1-original-vision.md` | Full patient portal with all features |
| `spec-2-bc-cancer-model.md` | Government-style invitation-based screening program |
| `spec-3-demo-optimized.md` | Maximum demo impact, three memorable moments |
| `spec-4-dual-track-hybrid.md` | Clinical AI + Population Health dual-track approach |
| `spec-5-lean-mvp.md` | Smallest scope, guaranteed completion |
| `00-README-pick-a-spec.md` | This file — comparison and recommendation |
