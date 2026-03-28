# Pick Your Spec — ScreenWell BC

> **Context:** 5 specs for the same product (ScreenWell BC — preventive screening for unattached BC patients). Each takes a different approach. Pick one, hand it to your developer, and build.

---

## Name Decision: ScreenWell BC

**Why not CheckUp BC or GetChecked?**
- `GetCheckedOnline` is BC's existing STD testing service (getcheckedonline.com) — too close, wrong association
- `CheckUp BC` was the working name — it's fine but generic
- `ScreenWell BC` — suggests wellness + screening, distinct from any existing BC service, pairs well with the BC Cancer Screening branding family

All specs use "ScreenWell BC" but the name is easy to swap.

---

## Quick Comparison

| | Spec 1: Full Vision | Spec 2: Lean Build | Spec 3: Demo Optimized | Spec 4: Data Forward | Spec 5: Patient Journey |
|---|---|---|---|---|---|
| **Build time** | 10-14 hrs | 5-7 hrs | 7-9 hrs | 9-12 hrs | 9-11 hrs |
| **Pages** | 8 + demo panel | 6 + demo API | 6 + demo panel | 7 + analytics | 9 + learn pages |
| **Database** | SQLite/Supabase | JSON files | Hardcoded constants | JSON + analysis | JSON files |
| **AI features** | Chat + Summary | Summary only | Pre-generated summary | Summary only | Chat + Summary |
| **Email** | React Email + Resend | Resend (simple HTML) | Resend (simple) | Resend (simple) | Resend (warm copy) |
| **Data analysis** | Basic | None | None | Deep (all CSVs) | None |
| **Charts** | None | None | BC map | 4+ charts + map | None |
| **Strength** | Completeness | Speed to ship | Demo theatrics | Data-backed pitch | Emotional impact |
| **Risk** | Too much to build | Too thin if judges poke | Fragile (hardcoded) | Analysis may not show patterns | Needs good narrator |

---

## Decision Matrix: When to Pick What

### Pick **Spec 1** (Full Vision) if:
- You have 2 developers OR 12+ hours of build time
- Judges will ask "can you show me another patient?"
- You want the most complete, extensible prototype
- You're confident in execution speed

### Pick **Spec 2** (Lean Build) if:
- You have 1 developer and ≤8 hours
- You want a polished core flow over breadth
- You'd rather have 6 great pages than 10 okay ones
- **This is the safest choice for a solo developer**

### Pick **Spec 3** (Demo Optimized) if:
- You believe presentation matters more than depth
- You're a confident speaker/presenter
- You want the email-on-phone moment and animated results
- You're willing to hardcode everything for a perfect 3-minute show

### Pick **Spec 4** (Data Forward) if:
- Judges score "use of hackathon data" heavily
- You want to bridge Track 1 (Clinical AI) and Track 2 (Population Health)
- The correlation scatter plot + cost calculator will be your "mic drop"
- You have someone who can run the analysis script quickly
- **Best for impressing data-savvy judges**

### Pick **Spec 5** (Patient Journey) if:
- Judges include clinicians who care about patient experience
- You want the demo to tell a human story, not a tech story
- You believe empathy wins hackathons
- Your presenter is a good storyteller
- **Best for impressing clinician judges**

---

## My Recommendation

**If you can only build one thing: Spec 2 + elements from Spec 3.**

Specifically:
1. Use Spec 2's lean architecture (JSON files, no DB, 6 pages)
2. Add Spec 3's animated results reveal (the staggered traffic lights)
3. Add Spec 3's real email delivery during the demo
4. Use Spec 5's patient-facing copy (warm, reassuring tone)
5. If you have extra time, add ONE chart from Spec 4 (the cost calculator or scatter plot)

This hybrid gives you: fast build + visual wow + emotional resonance + data credibility.

**Estimated build time for this hybrid: 7-9 hours.**

---

## Shared Across All Specs

These elements are identical in every spec:

### 1. BC Design System Colors
```
Primary Blue:  #013366
Primary Gold:  #FCBA19
Success Green: #42814A
Warning Amber: #F8BB47
Danger Red:    #CE3E39
Text Primary:  #2D2D2D
Text Secondary:#474543
Link Blue:     #255A90
Light BG:      #FAF9F8
Card BG:       #FFFFFF
Border:        #D8D8D8
```

### 2. Clinical Thresholds
| Test | Normal | Borderline | Abnormal |
|---|---|---|---|
| HbA1c | < 6.0% | 6.0 – 6.4% | ≥ 6.5% |
| Fasting Glucose | < 6.1 mmol/L | 6.1 – 6.9 | ≥ 7.0 |
| Total Cholesterol | < 5.2 mmol/L | 5.2 – 6.2 | > 6.2 |
| LDL Cholesterol | < 3.5 mmol/L | 3.5 – 4.9 | ≥ 5.0 |
| eGFR | ≥ 90 mL/min | 60 – 89 | < 60 |

### 3. Screening Eligibility
- Diabetes: Everyone 40+ every 3 years (earlier with risk factors)
- Cholesterol: Men 40+, Women 50+ (or family history at any age)
- Kidney: Everyone 50+ every 3 years (earlier with diabetes/hypertension)

### 4. Tech Stack
- Next.js 16 (App Router)
- shadcn/ui + Tailwind CSS
- Vercel AI SDK (for summaries)
- Resend (for emails)
- Deploy to Vercel

### 5. BC Healthcare Context (for the pitch)
- **CareConnect** = BC's clinical viewer / EHR (what doctors use to see patient records)
- **Health Gateway** = BC's patient portal (healthgateway.gov.bc.ca — patients see their own records)
- **BC Cancer Screening / CASCADE** = The model we're following (centralized screening without a family doctor)
- **UPCC** = Urgent & Primary Care Centres (where unattached patients go for urgent care, walk-in)
- **PHN** = Personal Health Number (10 digits, starts with 9, on BC Services Card)
- **LifeLabs** = The lab chain where patients get blood drawn
- **811 / HealthLink BC** = Health information phone line
- **Health Connect Registry** = The waitlist for family doctors (1M+ people on it)

---

## Research Findings (Inform the Pitch)

From my research tonight, key facts for the pitch narrative:

1. **BC Cancer Screening uses CASCADE** — a unified browser-based system that replaced multiple legacy systems. It sends ~200,000 screening letters per month. Our system is directly modeled on this.

2. **BC Cancer cervical screening now works WITHOUT a family doctor** — patients can self-register and request a screening kit online. This proves the model works for self-referral.

3. **Health Gateway** shows lab results, medications, immunizations, and BC Cancer screening letters. Our prototype could logically be a new section within Health Gateway.

4. **CareConnect** is BC's clinical viewer — the system doctors use. It's view-only and provides encounters, lab results, diagnostic imaging, and clinical documents. This is what we're simulating with our "mock EHR."

5. **UPCCs** specifically serve unattached patients — 65% of UPCC visitors have no family doctor. They're the natural escalation path for abnormal results.

6. **As of April 1, 2026** (3 days from now!), BC Cancer is moving to digital-only result letters for normal breast screening results via Health Gateway. This shows BC is actively digitizing the screening workflow — our project rides that wave.

7. **Over 240,000 British Columbians have CKD** (4.1% of adults), but the expected prevalence is 10% — meaning more than half of CKD cases are undetected. This is exactly the gap our screening would fill.

8. **PHN format:** 10 digits, starts with 9, last digit is MOD-11 check digit. For demo patients, use the `insurance_number` field from the hackathon data.

---

## One More Thing: The Name on Screen

During the demo, the app should look like it COULD be a real BC government service. That means:

- Use the BC Design System faithfully (dark blue header, gold accent, BC Sans font)
- Include a subtle "Supervised by [Physician Name], MD" in the footer
- Include "Powered by ScreenWell BC" not "Built at UVic Hackathon"
- The domain should ideally be `screenwell-bc.vercel.app` (or similar)
- If judges see a URL bar, it should look professional

The goal is that for 3 minutes, judges forget they're at a hackathon and think they're looking at a real service that BC Health could deploy.

---

Good luck. Go win this thing.
