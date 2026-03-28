# Healthcare & AI Hackathon -- Ranked Idea List

## What We're Optimizing For

Each idea is scored on the two criteria that most determine whether a project is worth building:

- **Clinical Relevance (30 pts)** -- Does it address a real, meaningful healthcare problem? Is the target population clearly defined and would they actually benefit?
- **Feasibility & Safety (25 pts)** -- Could this realistically be deployed in a healthcare setting? Did your team consider risks, privacy, and patient safety?

**Total: 55 points max.** Ideas scoring 45+ are shortlisted. Top 3 are recommended.

### Scoring Principles

- Ideas grounded in **BC-specific data** (with citable numbers) score higher on clinical relevance.
- **Read-only analytics** tools score highest on feasibility & safety -- no medical decisions, no patient interaction.
- **AI-generated content** that a patient reads or acts on carries moderate safety risk (even with clinician review).
- Ideas that **overlap with solutions already deployed in BC** (AI scribes, Health Gateway portal) are penalized on relevance.

---

## The Ranked List

### #1. Patient Story at a Glance

**Track:** Clinical AI
**Pitch:** A one-page visual patient summary that lets a doctor see the whole story in 10 seconds instead of flipping through charts.

**BC problem it addresses:**
BC physicians spend ~10 hours/week on admin work. 3 million hours/year are spent on unnecessary admin tasks province-wide -- the equivalent of 1,400 full-time doctors. One Victoria family physician reports 17 hours/week on paperwork. 95% of BC physicians say admin work reduces professional fulfillment. (Source: Doctors of BC 2026 survey, CBC)

**What it does:**
Takes a patient's Synthea FHIR record and generates a visual dashboard: interactive timeline of diagnoses and encounters, current medication list with durations, active allergies, recent lab trends (vitals over time), upcoming care plan items, and a quick-glance risk summary (age, condition count, medication count). Think of it as the "Google Maps overview" for a patient chart.

**Synthea data used:**
Patient (demographics, age), Condition (diagnosis timeline), Medication (current + historical), Encounter (visit history, types), Observation (lab values, vitals), Allergy (allergies), Procedure (surgical history), CarePlan (active plans)

**Why this is NOT the same as BC's existing tools:**
- BC Health Gateway gives patients raw records (med list, lab results, visit dates). No visual summary, no timeline, no risk context.
- BC's AI Scribe program (6 vendors, 8,000 providers) transcribes live conversations into SOAP notes. Completely different function -- it captures what's said in a visit, not what exists in the chart.
- This tool summarizes the patient's ENTIRE structured history visually. Nothing in BC does this today.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **28/30** | Documentation burden is the #1 clinician complaint in BC. Target population is razor-sharp: any doctor seeing a patient they don't know well (specialists getting referrals, ER docs, locums). The benefit is immediate and tangible -- minutes saved per patient, every day. |
| Feasibility & Safety | **23/25** | Read-only visualization of existing structured data. No AI interpretation of medical meaning -- it organizes and displays, the doctor interprets. Worst case: a field is missing from the summary, but the doctor still has the full chart. Uses synthetic data. No patient interaction. Clinician-in-the-loop by default. |
| **Total** | **51/55** | |

---

### #2. ER Diversion Intelligence

**Track:** Population Health
**Pitch:** An analytics dashboard that reveals which ER visits didn't need to be ER visits -- and what alternative care could have served those patients.

**BC problem it addresses:**
141,961 patients left BC ERs without being seen in 2024-25 -- an 86% increase since 2018-19. Vancouver Island Health Authority saw 160% growth (from 11,513 to 29,997 cases). There have been 1,800+ unplanned ER closures across BC between January 2023 and April 2025. 100 Mile House's ER closed 6 times in Q1 2026 alone. (Source: BC Health Data FOI, CBC, CFJC Today)

**What it does:**
Analyzes every ER encounter in the Synthea dataset: what condition brought the patient in, what was the encounter outcome, what was their age and chronic disease profile. Classifies visits into tiers: "required ER care," "could have been urgent care," "could have been primary care," "could have been virtual care" -- using published clinical frameworks (CTAS triage categories, CIHI's avoidable ER visit definitions). Interactive dashboard shows volume by category, time-of-day patterns, demographic breakdowns, and a map of which communities generate the most divertible visits. AI generates a narrative brief for each region.

**Synthea data used:**
Encounter (class = emergency, timestamps, reason codes), Condition (diagnosis driving the visit), Patient (age, demographics, location, income), Organization (facility location), Provider

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **26/30** | ER overcrowding is a BC crisis with direct mortality implications (delayed care, closures). The numbers are staggering and presentation-ready. However, this is a system-level planning tool -- the target population is health planners and ER directors, not individual clinicians or patients. Judges may ask "who uses this day-to-day?" Slightly less immediate than a clinician-facing tool. |
| Feasibility & Safety | **24/25** | Pure analytics on aggregate synthetic data. No patient interaction, no medical decisions, no AI-generated medical advice. The classification of "divertible" uses published clinical frameworks, not custom AI judgment. Read-only dashboard. Essentially zero safety risk. Privacy: synthetic data, no real patients. |
| **Total** | **50/55** | |

---

### #3. Readmission Risk Radar

**Track:** Clinical AI
**Pitch:** Flags patients at highest risk of bouncing back to the hospital within 30 days so clinics can intervene before it happens.

**BC problem it addresses:**
BC has a 9.7% 30-day readmission rate -- the 2nd highest in Canada. 25-50% of readmissions are retrospectively preventable. Readmitted patients have a threefold increase in mortality within one year. Mission Memorial Hospital is at 14.6%, well above the 10% target. Common causes: inadequate discharge coordination, poor follow-up, adverse drug reactions. (Source: BCMJ, Vancouver Sun, CIHI, Fraser Health)

**What it does:**
Computes a readmission risk score for each patient using established clinical predictors: number of active conditions, recent hospitalization frequency, age, medication count, chronic disease burden (COPD, heart failure, diabetes), and encounter patterns. Dashboard view shows a clinic's recently discharged patients ranked by risk level (high/medium/low) with drill-down into each patient's risk factors. The model is based on validated approaches (LACE index components: Length of stay, Acuity, Comorbidities, ER visits in past 6 months).

**Synthea data used:**
Patient (age, demographics), Encounter (class = inpatient, timestamps, frequency), Condition (active chronic diseases), Medication (count, types), Observation (lab values indicating deterioration)

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **28/30** | Readmission prevention is a top-3 BC healthcare priority. Target population is precisely defined: recently discharged patients. The benefit is proven -- proactive follow-up for high-risk patients reduces readmissions by 20-30% in published studies. The BC numbers make this a devastating presentation slide. |
| Feasibility & Safety | **22/25** | Flagging tool only -- does not prescribe treatment or make discharge decisions. Clinician always decides on follow-up action. Risk model uses well-established clinical factors, not black-box AI. Main safety concern: false negatives (a high-risk patient scored as low-risk). Mitigated because the tool is additive -- it doesn't replace existing discharge processes, it augments them. Uses synthetic data. |
| **Total** | **50/55** | |

---

### #4. Polypharmacy Risk Dashboard

**Track:** Clinical AI
**Pitch:** Visualizes medication burden for elderly patients and flags who in a clinic's panel is at highest risk from too many drugs.

**BC problem it addresses:**
62% of BC residents over 65 take 5 or more medications. 24% take 10 or more (rising to 36% for those over 85). Each additional medication exponentially increases the risk of falls, confusion, and adverse events -- patients on 4-7 meds have double the fall risk. BC's 65+ population has grown 66% in a decade and will reach 1.5 million by 2036. BC's Shared Care Committee has a dedicated Polypharmacy Risk Reduction initiative. PharmaCare 2.0 is actively focused on deprescribing for 65+. (Source: Shared Care BC, BCMJ, BC Deprescribing Guidelines)

**What it does:**
For a clinic's elderly patient panel, visualizes each patient's medication profile: total count, duration of each medication, temporal overlaps, drug classes (sedatives, blood pressure meds, opioids, anticholinergics). Highlights patients with the highest medication burden using color-coded risk tiers. Drill-down into any patient shows their full medication timeline with reason codes. AI generates a plain-language summary of each high-risk patient's profile (e.g., "82-year-old on 11 medications including 3 sedatives and 2 blood pressure medications, prescribed across 4 different providers").

**Synthea data used:**
Patient (age, demographics), Medication (drug name, start/stop dates, dispenses, reason codes), Encounter (which visit prescribed each med), Provider (who prescribed), Condition (underlying diagnoses)

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **27/30** | Directly supports an active provincial health priority (Shared Care polypharmacy initiative, PharmaCare 2.0 deprescribing focus). Target population is clearly defined (65+ patients on 5+ medications). Direct patient benefit: fewer falls, fewer adverse drug events, fewer hospitalizations. The aging population data makes this increasingly urgent. |
| Feasibility & Safety | **22/25** | Does NOT check for specific drug interactions (that would require a validated drug database and carries high liability). Simply visualizes medication burden and flags high-count patients. The clinician and pharmacist decide whether to deprescribe. Privacy: synthetic data. Moderate risk: a doctor might use a "low" burden score as false reassurance, but this is additive to their existing knowledge. |
| **Total** | **49/55** | |

---

### #5. Care Journey Timeline

**Track:** Population Health
**Pitch:** Shows how patients move through BC's specialist waitlist system for a given condition -- and exactly where the journey breaks down.

**BC problem it addresses:**
1.2 million British Columbians are waiting for specialist consultations -- a 20% increase in 2 years. The median specialist wait is 28.6 weeks (2nd longest ever recorded by the Fraser Institute). Hip replacement waits are up 72%, knee replacements up 61%. The 2026 BC budget contains no dedicated funding for this crisis. (Source: Doctors of BC, Specialists of BC, Fraser Institute, Angus Reid)

**What it does:**
Select a condition (e.g., "hip replacement," "diabetes management," "cardiac surgery"). The tool traces every patient with that condition through their care journey: first diagnosis → GP visits → referral → specialist consultation → pre-operative workup → surgery → post-op recovery → follow-up. Visualizes the timeline as a flow diagram showing median time at each stage, where the longest gaps are, and where patients "fall off" (stop appearing in the data). Compare journeys by age, region, or provider.

**Synthea data used:**
Encounter (timestamps, types, providers), Condition (target diagnosis), Procedure (surgeries), Claims (Referring Provider ID for referral tracking), Provider (specialty), Organization (facility), Patient (demographics)

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **25/30** | The 1.2M waitlist is the single biggest number in BC healthcare. But this is a planning/policy tool -- it shows the system's problems, not individual patient treatment. Target "population" is the health system itself. Judges may find it compelling as a storytelling tool but ask who would use it daily. |
| Feasibility & Safety | **24/25** | Pure analytics on aggregate synthetic data. No patient interaction. No medical decisions. Read-only visualization. The flow analysis is computationally straightforward (sort encounters by date per patient, group by condition). Zero safety risk. |
| **Total** | **49/55** | |

---

### #6. Chronic Disease Compass

**Track:** Clinical AI / Population Health crossover
**Pitch:** A panel management tool that shows which chronic disease patients are stable, improving, or declining -- before they end up in the ER.

**BC problem it addresses:**
More than 25% of BC adults and 60% of seniors have multimorbidity (2+ chronic conditions). From 2001 to 2020, multimorbidity prevalence rose 1.5% annually for women and 2.9% for men. Complex multimorbidity (5+ conditions) rose even faster: 4.8% and 5.7% annually. Chronic disease drives the majority of healthcare costs and hospitalizations. (Source: Statistics Canada 2025 study on BC population, BCCDC Chronic Disease Dashboard)

**What it does:**
Select a chronic condition (diabetes, COPD, hypertension). See your patient population stratified into three buckets: **Stable** (lab values within range, regular visits), **Improving** (lab trends heading in the right direction), **Declining** (worsening labs, missed appointments, new comorbidities). Drill into any patient to see their observation trends over time (A1C for diabetes, blood pressure for hypertension, FEV1 for COPD). AI generates a brief summary of each declining patient's trajectory.

**Synthea data used:**
Patient (demographics), Condition (chronic disease diagnosis, start dates), Observation (lab values over time -- A1C, blood pressure, spirometry), Medication (treatment changes), Encounter (visit frequency, gaps), CarePlan (active care plans)

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **27/30** | Chronic disease management is the core of primary care. 60% of BC seniors have multimorbidity and that number is rising every year. Target population: primary care physicians managing panels of 100+ chronic disease patients. The "declining" bucket is where proactive intervention prevents hospitalizations. Direct patient benefit. |
| Feasibility & Safety | **22/25** | Analytics and trend visualization. The stable/improving/declining classification uses objective lab thresholds (e.g., A1C > 9% = poorly controlled diabetes). Clinician interprets and acts. Risk: AI-generated summaries could mischaracterize a trend, but clinician reviews. Privacy: synthetic data. No patient interaction. |
| **Total** | **49/55** | |

---

### #7. Elderly Fall Risk Screener

**Track:** Clinical AI
**Pitch:** Screens a clinic's elderly patients for fall risk using known factors already in their chart -- and flags who needs a medication review.

**BC problem it addresses:**
62% of BC residents over 65 take 5+ medications, doubling their fall risk. BC's 65+ population has grown 66% in a decade. 7,029 people are waiting for long-term care beds (200% increase since 2019/20). Falls are the leading cause of injury hospitalization for Canadian seniors, costing the healthcare system billions annually. Adverse drug events from polypharmacy are a top contributor to ER visits for the elderly. (Source: Shared Care BC, BCMJ, Vancouver Sun, CIHI)

**What it does:**
For each patient 65+ in the dataset, computes a fall risk score based on established clinical factors: age, medication count (with extra weight for sedatives, antihypertensives, antidepressants, opioids), history of fall-related encounters, mobility-related conditions, vision diagnoses, and balance/gait observations. Dashboard shows the panel ranked by risk, with drill-down showing which modifiable factors (especially medications) contribute most to each patient's score.

**Synthea data used:**
Patient (age), Medication (drug descriptions for class identification, count), Condition (mobility conditions, osteoporosis, vision, balance disorders), Encounter (ER visits for fall-related injuries), Observation (relevant clinical values)

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **26/30** | Fall prevention in seniors is a major clinical priority with strong evidence base. Target population is clear (65+ with polypharmacy). Benefit is proven: medication review reduces falls. Slightly narrower in scope than some other ideas, which limits the score ceiling. |
| Feasibility & Safety | **22/25** | Screening tool based on validated risk factors (Beers Criteria, STOPP criteria elements). Does not recommend stopping medications -- flags for clinician review. Risk: false sense of security for "low risk" patients, but additive to clinical judgment. Synthetic data. |
| **Total** | **48/55** | |

---

### #8. Referral Flow Visualizer

**Track:** Population Health
**Pitch:** A network map of BC's referral system that shows where patients get stuck between their GP and their specialist.

**BC problem it addresses:**
BC's referral system is still largely fax-based. Lost requisitions, no status tracking, and information gaps cause rework and delays. The Digital Referrals & Orders (DRO) program is only in 20 early-adopter clinics in Vancouver/Burnaby. Meanwhile, 1.2 million people wait for specialist consultations. (Source: Doctors of BC, PHSA, CBC)

**What it does:**
Builds a network graph from Synthea claims data: which GPs refer to which specialists, how many patients are in each referral pipeline, and how long patients wait between the referring encounter and the specialist encounter. Visualizes bottlenecks: which specialist practices have the longest queues, which referral pathways have the highest "lost patient" rate (referral made but no subsequent specialist encounter), and which regions have the most fragmented referral networks. Interactive -- click any node to see details.

**Synthea data used:**
Claims (Referring Provider ID, Provider ID, Service Date), Encounter (timestamps, class), Provider (specialty, location), Organization (facility), Patient (demographics, location)

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **24/30** | Referral delays are a well-documented BC problem, but DRO is already being rolled out (though slowly). This is a planning/visibility tool, not a clinical workflow tool. Judges might ask whether it duplicates DRO's analytics. The referral problem is real but the tool is one step removed from patient care. |
| Feasibility & Safety | **24/25** | Pure network analytics. Read-only. No patient interaction. No medical decisions. The referral tracking is computationally clean: match referring provider on claims to encounters with specialists. Zero safety risk. |
| **Total** | **48/55** | |

---

### #9. Discharge Safety Checklist Generator

**Track:** Clinical AI
**Pitch:** Generates a personalized, structured discharge checklist for each patient so nothing falls through the cracks when they go home.

**BC problem it addresses:**
BC has a 9.7% 30-day readmission rate (2nd highest in Canada). 25-50% of readmissions are preventable, with inadequate discharge coordination and poor post-discharge follow-up as top causes. Readmitted patients have 3x mortality within one year. Fraser Health's Mission Memorial Hospital is at 14.6%, well above the 10% target. (Source: BCMJ, Vancouver Sun, CIHI, Fraser Health)

**What it does:**
Given a patient's inpatient encounter, conditions, and medications, generates a structured discharge checklist (NOT free-text instructions -- a reviewable, checkable list): medication reconciliation items (new meds, stopped meds, dose changes), required follow-up appointments (by specialty, with recommended timeframe), warning signs specific to their conditions (e.g., "return to ER if you experience X"), and relevant community resources. The clinician reviews and checks each item before the patient leaves.

**Synthea data used:**
Patient (demographics), Encounter (inpatient stay, reason), Condition (active diagnoses), Medication (current list, recent changes), CarePlan (active plans), Observation (recent lab values)

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **27/30** | Directly targets a top-3 cause of preventable readmissions. Target population is precisely defined: patients being discharged from hospital. Every hospitalist and discharge planner would see the value. Strong BC numbers for the presentation. |
| Feasibility & Safety | **20/25** | Generates structured content that influences patient behavior post-discharge. Mitigated by being a checklist (binary items to review) rather than free-text AI instructions. Clinician must review and sign off before handing to patient. Risk: if a critical item is missing from the generated checklist, it might create false confidence. Higher safety bar than pure analytics tools. Privacy: synthetic data. |
| **Total** | **47/55** | |

---

### #10. Health Equity Atlas

**Track:** Population Health
**Pitch:** An interactive map showing where healthcare access breaks down across BC -- by region, by demographic, by condition.

**BC problem it addresses:**
Anti-Indigenous racism documented across 107 rural BC communities leads to preventable harm and avoidance of care. ER closures are concentrated in rural areas (100 Mile House: 6 closures in Q1 2026). ~400,000 BC residents are waiting for a family doctor. Northern Health and Interior Health have the highest overdose death rates per capita (58 and 40 per 100,000). (Source: Canadian Journal of Rural Medicine 2025, RCCbc, CBC, BC Coroner)

**What it does:**
Interactive map of BC (built from Synthea patient and organization locations) showing healthcare access metrics by region: provider density, average encounters per patient per year, ER utilization rates, chronic disease prevalence, and demographic breakdown (age, income). Click any region to see its health profile. AI generates a narrative summary of each region's challenges (e.g., "This region has 60% fewer providers per capita than the provincial average, with 3x the ER usage rate, suggesting a severe primary care gap"). Compare any two regions side by side.

**Synthea data used:**
Patient (location coordinates, demographics, income), Encounter (frequency, types per region), Organization (location, utilization), Provider (location, specialty, encounter count), Condition (prevalence by region)

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **22/30** | Addresses real and documented BC health disparities. The rural access crisis and Indigenous health gaps are important and timely. But the target audience is health planners and policy makers, not clinicians or patients. Judges will likely ask "who is the patient here?" -- the answer is indirect (communities that would benefit from better resource allocation). |
| Feasibility & Safety | **24/25** | Pure aggregate analytics on synthetic data. No individual patient identification. No medical decisions. Read-only visualization. The map and regional profiles are straightforward to build with geo-coded Synthea data. Zero safety risk. |
| **Total** | **46/55** | |

---

## Top 3 Shortlist

| Rank | Idea | Score | Track | Key Strength |
|---|---|---|---|---|
| 1 | Patient Story at a Glance | **51/55** | Clinical AI | Highest clinical relevance. Directly solves the #1 clinician complaint (documentation burden). Uses the most Synthea data types. Every doctor at the hackathon will nod. |
| 2 | ER Diversion Intelligence | **50/55** | Population Health | Most BC-specific. The 141K left-without-care number is a devastating presentation stat. Highest feasibility & safety (pure analytics). Strong visual dashboard format that matches Hackathon #1 winners. |
| 3 | Readmission Risk Radar | **50/55** | Clinical AI | Strongest clinical outcome link (3x mortality for readmitted patients). Based on validated clinical models (LACE index). Sharp target population (recently discharged). BC data (2nd highest readmission rate in Canada) is presentation gold. |

### Recommendation

**Build Patient Story at a Glance.** Here's why:

1. **Highest total score** (51/55) driven by top-tier clinical relevance.
2. **Uses the most Synthea data** (8 resource types) -- this demonstrates technical depth during the demo.
3. **Every judge can understand it immediately** -- "see a patient's whole story in 10 seconds" needs no explanation.
4. **Not already being done in BC** -- AI scribes transcribe conversations; Health Gateway shows raw records. Nobody is doing visual patient summaries from structured data.
5. **Natural demo flow** -- you click through patients, each one tells a different story. Judges at the table can interact with it.
6. **Matches the winning pattern** -- Hackathon #1's winner was "the most polished and feature-complete solution." A well-executed patient summary with timeline, medications, vitals charts, and risk indicators can be very polished in 8 hours.

**If your team has strong data visualization skills**, consider ER Diversion Intelligence instead -- it leans harder into the dashboard/analytics format that won Hackathon #1, and the BC-specific ER numbers will make judges emotional.

**If you want to play both tracks**, Readmission Risk Radar bridges Clinical AI and Population Health -- it's a clinical tool (flags individual patients) that also tells a system-level story (BC's readmission crisis).
