# Healthcare & AI Hackathon -- Aligned Idea List (v2)

> Generated using the [Idea Generation Plan](idea-generation-plan.md), grounded in Zen Garani's keynote on system alignment, filtered through the four investment pillars, and scored for doctor panel review.

## Scoring Rubric

Each idea is scored on the same two criteria as the v1 ranked list:

- **Clinical Relevance (30 pts)** -- Does it address a real, meaningful healthcare problem? Is the target population clearly defined and would they actually benefit?
- **Feasibility & Safety (25 pts)** -- Could this realistically be deployed in a healthcare setting? Did your team consider risks, privacy, and patient safety?

**Total: 55 points max.**

### Additional Tags

Each idea is also tagged on five qualitative dimensions:

- **System Alignment** -- Is money/attention actively flowing here?
- **White Space** -- Does this already exist in BC?
- **Demo-ability** -- Can judges see and feel the value in 3 minutes?
- **Technical Feasibility** -- Can this be built with Synthea + AI in 12 hours?
- **Narrative Power** -- Does this have a built-in human story for the pitch?

---

## The Ranked List

### #1. Follow-Up Gap Detector

**Pillar:** Healthcare as Operations
**Persona:** Patient + Clinician (bridges both)
**Pitch:** Flags patients whose test results, referrals, or follow-up appointments have fallen through the cracks -- before the patient suffers for it.

**BC problem it addresses:**
This IS Zen Garani's broken elbow story. A 10-year-old gets an x-ray after a fracture. Results come back blurry. Nobody calls the family. The next available appointment is 3 weeks out. The kid wears a cast for 6 extra weeks. This happens constantly across BC's system: a specialist referral that was faxed but never received, a lab result that arrived but nobody reviewed it, a post-surgical follow-up that was never scheduled. The system generates tasks at every step, and there is no tool that tracks whether those tasks were completed. The operational failure cascades into real patient harm. BC physicians spend 9.1 hours/week on admin -- much of it chasing exactly these gaps manually. (Source: Zen Garani keynote, Doctors of BC 2026 survey)

**What it does:**
Analyzes every patient's encounter history and identifies gaps in the expected care sequence. For each encounter that generates a downstream action (test ordered, referral made, follow-up needed, prescription changed), checks whether the corresponding follow-up encounter occurred within the clinically expected timeframe. Surfaces a prioritized list of "dropped balls": patients with overdue results reviews, referrals that never resulted in a specialist visit, post-procedure follow-ups that were never scheduled. Clinician view: "these 12 patients have unresolved care gaps." Patient view: "your x-ray results from March 15 have not been reviewed -- here's what to do."

**What already exists (and why this is different):**
Nothing in BC does this. BC Health Gateway shows patients their records but does not track whether follow-up actions happened. EMRs store data but do not analyze sequential care logic. This is a fundamentally new capability: treating the care pathway as a process with checkpoints, not just a collection of records.

**Human story for the pitch:**
"A father takes his 10-year-old to the ER with a broken elbow. They get an x-ray, told to come back in two weeks. They do. The x-ray is blurry. The next appointment is April 7th -- six weeks away. The kid is stuck in a cast. This tool would have flagged on day 3: 'X-ray results for this patient have not been reviewed. Action needed.' One alert. Six weeks of suffering prevented."

**Why the system is ready for it:**
Healthcare operations is Zen's fourth investment pillar. Fraser Health is already investing $1.5M in AI scheduling. The Administrative Burdens Working Group exists specifically to reduce coordination overhead. This tool doesn't require behavior change -- it surfaces information that was previously invisible.

**Synthea data used:**
Encounter (timestamps, types, reason codes), Condition (diagnoses driving encounters), Procedure (what was ordered), Observation (results), Claim (referral tracking via Referring Provider ID), Provider, Organization

**AI role:** Pattern detection across sequential encounters. NLP to generate human-readable gap descriptions. Prioritization of gaps by clinical urgency.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **29/30** | Directly from the keynote speaker's personal story. Addresses the operational cascade that causes preventable harm across every specialty and care setting. Target population: every patient with a pending action in the system. Universal applicability. |
| Feasibility & Safety | **23/25** | Read-only detection of gaps in encounter sequences. Does not make medical decisions -- flags that a follow-up didn't happen, the clinician decides what to do. Worst case: false positive (flags a gap that was intentionally closed). No patient interaction required. Synthetic data. |
| **Total** | **52/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- operations investment, admin burden reduction |
| White Space | Complete -- nothing in BC does this |
| Demo-ability | Excellent -- click a patient, see the gap, tell the story |
| Technical Feasibility | High -- sequential encounter analysis on FHIR data |
| Narrative Power | Maximum -- Zen literally told this story in the keynote |

---

### #2. Unattached Patient Risk Stratifier

**Pillar:** Access Redesign
**Persona:** Leader
**Pitch:** Of the 1 million+ British Columbians without a family doctor, identifies who is at highest medical risk so the system can prioritize attachment for the most vulnerable.

**BC problem it addresses:**
Over 1 million BC residents don't have a family doctor. The Health Connect Registry is a simple waitlist -- first come, first served. But a healthy 25-year-old and a 72-year-old with diabetes, COPD, and 8 medications are treated the same. There is no risk stratification. Meanwhile, unattached patients with complex chronic conditions use the ER as their primary care, driving overcrowding and burnout. 15% of ED visits nationally could be managed in primary care. The sickest unattached patients generate the most system cost and the most preventable harm. (Source: BC Health Data, CIHI, Health Connect Registry)

**What it does:**
Takes a population of unattached patients and computes a medical risk score based on: age, number of active chronic conditions, medication count and complexity, ER visit frequency, recent hospitalizations, and gaps in preventive care (missing screenings, immunizations). Outputs a ranked list: these are the 500 patients who most urgently need a family doctor. Drill down into any patient to see their risk profile. Aggregate view shows the distribution of risk across regions and demographics.

**What already exists (and why this is different):**
Health Connect Registry is a waitlist, not a prioritization tool. No BC tool risk-stratifies the unattached population. This applies validated risk scoring (similar to LACE index principles) to a population that the system currently treats as homogeneous.

**Human story for the pitch:**
"There are 43,000 people on the waitlist in one Primary Care Network alone. One of them is a 74-year-old woman with heart failure, diabetes, and 9 medications who uses the ER every month because she has nowhere else to go. Another is a 28-year-old who goes to walk-in clinics for a sore throat once a year. The system treats them identically. This tool says: attach the 74-year-old first -- it will save her life and save the system $50,000 a year in ER visits."

**Why the system is ready for it:**
Access redesign is Zen's first pillar. The goal is not more volume into bad pathways but matching patients to the right care. Prioritizing attachment by medical need is the logical next step for the Health Connect Registry, and leaders are already under pressure to improve access metrics.

**Synthea data used:**
Patient (age, demographics), Condition (chronic diseases, count), Medication (count, types), Encounter (ER frequency, hospitalization history), Observation (lab values indicating poorly managed conditions), Immunization (gaps in preventive care), Organization (regional distribution)

**AI role:** Risk scoring model combining clinical factors. AI-generated narrative summaries of high-risk patient profiles. Regional analysis and visualization.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **28/30** | 1M+ unattached BCers is the most visible access crisis. Risk stratification is clinically validated and operationally essential. Target population is precisely defined. The benefit is both individual (sickest patients get care first) and systemic (reduced ER burden). |
| Feasibility & Safety | **24/25** | Read-only analytics on aggregate synthetic data. No patient interaction. No medical decisions -- produces a prioritized list for human decision-makers. Privacy: synthetic data. Risk: a low-risk patient who actually needs urgent attachment could be deprioritized, but this is additive to the existing first-come-first-served model (which has no prioritization at all). |
| **Total** | **52/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- access redesign, Health Connect Registry, attachment targets |
| White Space | Complete -- no risk stratification exists for unattached population |
| Demo-ability | Excellent -- show the ranked list, click a high-risk patient, tell their story |
| Technical Feasibility | High -- risk scoring on standard FHIR resources |
| Narrative Power | Strong -- "who gets a doctor first?" is an instantly understood question |

---

### #3. Remote Monitoring Triage Dashboard

**Pillar:** Decentralized Care
**Persona:** Clinician
**Pitch:** For clinicians managing dozens of home-monitored patients, shows who needs attention right now -- before the data buries them.

**BC problem it addresses:**
BC is actively deploying remote patient monitoring (RPM) through TELUS Home Health Monitoring across Fraser Health, VCH, and other health authorities. Patients with CHF, COPD, diabetes, and hypertension get tablets and equipment to track vitals at home. The problem: clinicians now have 50-200 patients sending daily data, and there is no tool to prioritize who needs attention. A nurse opens a dashboard of 150 patients, all with numbers. Which ones are deteriorating? Which ones missed a reading (and is that concerning or just Tuesday)? Without triage, RPM becomes a data flood that burns out the very workforce it's supposed to help. (Source: Fraser Health RPM program, TELUS Home Health Monitoring, Zen keynote on workforce constraints)

**What it does:**
Ingests patient observation data (blood pressure, weight, oxygen saturation, blood glucose, heart rate) and stratifies patients into three tiers: **Needs Attention Now** (values trending dangerously, missed readings after stable period, acute changes), **Watch** (gradual trends, borderline values), **Stable** (within expected ranges, consistent readings). Each patient card shows: current values vs their personal baseline, trend direction, days since last reading, and number of active conditions. Click any patient for a detailed trend view. AI generates a one-line clinical summary: "BP trending up over 7 days, now 165/95, up from baseline 135/85. On 3 antihypertensives."

**What already exists (and why this is different):**
TELUS provides the monitoring platform (data collection, patient-facing app, basic alerts). But the clinical triage layer -- prioritizing across an entire panel of monitored patients -- does not exist. This is the missing piece between "we have the data" and "we can act on it efficiently."

**Human story for the pitch:**
"A home care nurse starts her day with 120 patients on remote monitoring. She can spend 8 hours scrolling through individual readings, or she can open this dashboard and see: 4 patients need attention now, 11 to watch, 105 stable. She calls the 4 critical patients first. One of them has gained 8 pounds in 3 days -- classic heart failure decompensation. She arranges a same-day virtual visit. That patient avoids the ER."

**Why the system is ready for it:**
Decentralized care is Zen's second pillar. RPM infrastructure is already deployed. The bottleneck has shifted from "can we collect data at home?" to "can we act on it efficiently?" This tool bridges that gap without requiring any new infrastructure.

**Synthea data used:**
Patient (age, demographics), Observation (vitals over time -- BP, weight, O2 sat, glucose, heart rate), Condition (chronic diseases determining baselines), Medication (current treatment context), Encounter (recent visits, hospitalizations)

**AI role:** Trend detection and anomaly identification across patient panels. Clinical summary generation. Personalized baseline calculation per patient.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **27/30** | Directly supports an active provincial investment (RPM deployment). Target population: clinicians managing home-monitored chronic disease patients. Clear benefit: prevents ER visits and hospitalizations through early detection. Addresses both decentralized care and workforce constraint pillars simultaneously. |
| Feasibility & Safety | **23/25** | Read-only triage of existing observation data. Clinician decides all actions. Does not generate medical advice for patients. Risk: false negative (a deteriorating patient scored as stable). Mitigated because this is additive -- clinicians currently have no triage at all. Synthetic data. |
| **Total** | **50/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- RPM already deployed, triage is the missing layer |
| White Space | Complete -- TELUS does collection, nobody does triage |
| Demo-ability | Excellent -- traffic-light dashboard, click into a patient, see the trend |
| Technical Feasibility | High -- observation trend analysis on FHIR data |
| Narrative Power | Strong -- "120 patients, which 4 need you right now?" |

---

### #4. Pre-Visit Encounter Brief

**Pillar:** Workforce as Bottleneck
**Persona:** Clinician
**Pitch:** A one-page AI-generated brief for the next patient walking in the door -- not their whole history, just what you need for THIS visit.

**BC problem it addresses:**
BC physicians spend 9.1 hours/week on administrative work, with 48% reporting the burden increased in the past year. 95% say it reduces professional fulfillment. 25% have considered leaving medicine because of it. A major chunk of that time: chart review before each patient encounter. A family doctor with 30 patients/day spends 3-5 minutes per patient reviewing the chart to figure out context. That's 90-150 minutes/day just reading before the visit even starts. The information exists in the chart, but it's unstructured, scattered across encounters, and the doctor has to mentally assemble it. (Source: Doctors of BC 2026 survey, CBC)

**What it does:**
Given a patient and their upcoming encounter reason, generates a focused one-page brief: **Why they're here today** (based on the appointment reason or recent condition trajectory), **What's changed since last visit** (new conditions, medication changes, recent ER visits, new lab results), **Active items requiring attention** (overdue follow-ups, recently abnormal observations, medication reconciliation needs), and **Quick context** (medication list, allergy count, condition count). This is NOT a full patient summary -- it's a visit-specific preparation tool. Different visit reasons produce different briefs.

**What already exists (and why this is different):**
BC's AI Scribe program captures conversations during visits. BC Health Gateway shows patients raw records. Neither prepares the clinician for the visit. EMRs display the chart but don't synthesize what matters for today's encounter. This is the "pre-flight checklist" for a patient visit.

**Human story for the pitch:**
"A family doctor has 28 patients today. Patient #14 is Mrs. Chen, 71, here for a blood pressure check. Instead of spending 4 minutes scrolling through her chart, the doctor glances at the brief: 'Last visit 6 weeks ago, BP was 155/95, started on amlodipine. New lab results: creatinine slightly elevated. ER visit 2 weeks ago for dizziness -- not related to BP per ER note. Currently on 7 medications.' Thirty seconds. She walks into the room prepared."

**Why the system is ready for it:**
Workforce constraint is Zen's third pillar. The system is already investing heavily in admin burden reduction (Administrative Burdens Working Group, AI scribes). This tool attacks a different part of the workflow -- preparation, not documentation. It saves time without requiring any behavior change.

**Synthea data used:**
Patient (demographics), Encounter (recent history, reason codes, types), Condition (active, new since last visit), Medication (current list, recent changes), Observation (recent lab values, vitals), AllergyIntolerance, Procedure (recent), CarePlan

**AI role:** Context-aware summarization -- selects relevant information based on visit reason. Generates human-readable brief. Identifies what changed since last encounter.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **28/30** | Documentation/admin burden is the #1 clinician complaint in BC. Target population: every doctor seeing any patient (universal). The benefit is immediate and daily: minutes saved per patient, better-prepared encounters, fewer things missed. Slightly lower than full patient summary because it's narrower in scope. |
| Feasibility & Safety | **22/25** | AI-generated summary of structured data that the clinician uses as preparation. Read-only -- doesn't change the chart or make decisions. Risk: brief omits a critical recent event. Mitigated because the full chart remains available and the clinician is trained to check. Higher AI involvement than pure analytics. |
| **Total** | **50/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- admin burden reduction, workforce investment |
| White Space | High -- AI scribes exist for DURING visit, nothing exists for BEFORE visit |
| Demo-ability | Excellent -- show a patient, generate the brief, clinician nods |
| Technical Feasibility | High -- encounter-aware summarization on FHIR data |
| Narrative Power | Strong -- "28 patients today, 4 minutes of chart review each, or 30 seconds" |

---

### #5. Smart Care Level Router

**Pillar:** Access Redesign
**Persona:** Patient
**Pitch:** A patient enters their symptoms and medical context. The tool tells them: this is an ER visit, this could be handled at a UPCC, this could be a virtual visit, or this could wait for your pharmacist.

**BC problem it addresses:**
Patients don't know where to go. "I don't know where to go, so I just go to the ER" was the first thing Zen said patients tell him. 15% of Canadian ED visits are for conditions manageable in primary care. Over half of those (9% of all ED visits) could be managed virtually. 141,961 patients left BC ERs without being seen in 2024-25. Meanwhile, UPCCs are expanding rapidly across BC, pharmacists have expanded scope, and virtual care is a funded entry point -- but patients don't know these options exist or when to use them. HealthLink BC 811 is phone-only with human navigators and a basic web symptom checker. (Source: CIHI, BC Health Data, HealthLink BC)

**What it does:**
Patient describes their concern (structured input: symptom, severity, duration, associated factors). The tool cross-references with their medical history (conditions, medications, age, recent encounters) to assess complexity. Outputs a recommendation with explanation: "Based on your symptoms and your history of COPD, this should be seen today. Your nearest UPCC is [X] and is open until 8pm. If you can't get there, call 811 for a virtual physician." Or: "This is something your pharmacist can help with -- they can now prescribe for minor ailments in BC." Includes a clear safety net: "If you experience [X, Y, Z], go to the ER immediately."

**What already exists (and why this is different):**
HealthLink BC 811 has human navigators (phone-only, wait times) and a basic symptom checker (generic, no medical history context). This is personalized navigation: it knows the patient has COPD and 6 medications, so a cough means something different than it does for a healthy 25-year-old.

**Human story for the pitch:**
"It's 9pm on a Saturday. Your 3-year-old has a fever of 38.5. You don't have a family doctor. Do you drive to the ER and wait 8 hours? This tool says: 'A fever of 38.5 in a 3-year-old without other symptoms can usually be managed at home. Give children's acetaminophen per package directions. Monitor for: [warning signs]. If no improvement in 24 hours, your nearest UPCC opens at 9am tomorrow. If [warning signs] appear, go to the ER.' One fewer unnecessary ER visit. One family that slept instead of waiting."

**Why the system is ready for it:**
Access redesign is Zen's first pillar. The entire system is trying to route patients to the right level of care. UPCCs are opening. Pharmacist scope is expanded. Virtual care is funded. The missing piece: patients don't know about these options. The HealthLink BC virtual physician program (HEiDi) already reduced ED visits by 16 per 1,000 patients.

**Synthea data used:**
Patient (age, demographics), Condition (active chronic conditions affecting triage), Medication (current meds affecting risk assessment), Encounter (recent visits), AllergyIntolerance, Observation (recent vitals)

**AI role:** Context-aware symptom assessment using patient history. Natural language generation of personalized guidance. Safety-net generation based on condition profile.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **28/30** | Addresses the most visible patient pain point ("I don't know where to go"). Target population: every patient without reliable primary care access -- over 1 million BCers. 15% of ED visits are avoidable. Direct alignment with system's #1 investment area. |
| Feasibility & Safety | **20/25** | AI-generated care routing recommendations that patients act on. This carries meaningful safety risk: if the tool tells someone "stay home" when they should go to the ER, harm could result. Mitigated by: conservative thresholds (when in doubt, recommend higher care level), explicit safety-net warnings, and "this is not medical advice" framing. Requires careful disclaimer design. Privacy: synthetic data for demo. |
| **Total** | **48/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Maximum -- this IS what "redesigning the front door" means |
| White Space | High -- 811 is phone-only, no AI-personalized routing |
| Demo-ability | Excellent -- enter symptoms, get recommendation, compare with/without history |
| Technical Feasibility | Moderate -- needs good symptom-to-acuity logic, but FHIR history helps |
| Narrative Power | Maximum -- "9pm Saturday, sick kid, no doctor, where do you go?" |

---

### #6. Patient Journey Status Tracker

**Pillar:** Healthcare as Operations
**Persona:** Patient
**Pitch:** Shows patients where they are in their care pathway and what's supposed to happen next -- like a package tracking number for healthcare.

**BC problem it addresses:**
Patients are in the dark. After every encounter, the patient goes home and waits. Was a referral sent? Did the specialist receive it? When will they hear back? Is the test result in? Who's reviewing it? There is no visibility. The broken elbow family had no idea their x-ray was blurry until they called repeatedly. 1.2 million BCers waiting for specialist consultations have no idea where they are in the queue. The Health Connect Registry waitlist has no real-time status. Patients cope by calling clinics repeatedly (adding to admin burden) or just giving up. (Source: Zen keynote, BC Health Data, Doctors of BC)

**What it does:**
For a given patient, maps their active care pathways: referrals in progress, tests awaiting results, follow-ups scheduled or pending, prescriptions due for renewal. Each item shows its status: "Referral sent March 10 → Specialist clinic received March 12 → Appointment pending." Timeline view shows the full journey. Alerts for items that appear stalled: "Your follow-up was expected by March 20 but has not been scheduled." Includes guidance: "If this seems overdue, contact [clinic phone number]."

**What already exists (and why this is different):**
BC Health Gateway shows historical records (past visits, lab results, medications) but does not track pending actions or expected timelines. There is no patient-facing tool that answers "what's supposed to happen next?" This turns the patient from a passive waiter into an informed participant.

**Human story for the pitch:**
"You've been referred to a cardiologist. Your GP said 'you'll hear from them in a few weeks.' It's been 6 weeks. You don't know if the referral was sent, received, lost, or if you're in a queue. You call your GP -- they're booked for 3 weeks. You call the specialist -- they have no record of you. This tool would show: 'Referral sent February 14. Status: not received by specialist clinic. Action: contact your GP to resend.' One lookup. Problem identified. Weeks of anxiety avoided."

**Why the system is ready for it:**
Operations is Zen's fourth pillar. The system generates tasks at every step but has no patient-facing tracking. The Digital Referrals & Orders (DRO) program is building infrastructure for referral tracking, but it's in 20 clinics only. This tool demonstrates the patient-facing value of that infrastructure.

**Synthea data used:**
Patient (demographics), Encounter (timestamps, types, outcomes), Condition (driving conditions), Claim (referral tracking via Referring Provider ID), Procedure (ordered procedures), Observation (pending results), CarePlan (active plans with milestones)

**AI role:** Care pathway inference from encounter sequences. Status determination based on expected vs actual timelines. Natural language status descriptions.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **26/30** | Addresses a universal patient pain point (lack of visibility). Target population: anyone in an active care pathway (millions of BCers). Reduces anxiety, prevents lost referrals, and decreases redundant phone calls. Slightly less acute than clinical tools because it's informational, not clinical. |
| Feasibility & Safety | **23/25** | Read-only display of encounter history and inferred status. No medical decisions. No treatment recommendations. Risk: inaccurate status inference (says "on track" when it's actually stalled). Mitigated by conservative language and "contact your provider" fallback. Synthetic data. |
| **Total** | **49/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- operations investment, DRO program, patient experience |
| White Space | Complete -- Health Gateway shows history, nothing shows pending status |
| Demo-ability | Excellent -- "track my referral" is immediately understood |
| Technical Feasibility | Moderate -- pathway inference requires encounter sequence logic |
| Narrative Power | Strong -- "6 weeks waiting, is my referral lost?" |

---

### #7. Medication Reconciliation at Transitions

**Pillar:** Workforce as Bottleneck + Healthcare as Operations
**Persona:** Clinician
**Pitch:** At every care transition -- admission, discharge, referral -- automatically compares what the patient was on before versus what they're prescribed now, and flags every discrepancy.

**BC problem it addresses:**
Medication errors at care transitions are a top patient safety issue. When a patient is admitted to hospital, their home medications may be continued, changed, or accidentally dropped. At discharge, new medications are added and old ones may not be restarted. When referred to a specialist, the specialist may prescribe something that conflicts with the GP's prescriptions. 62% of BC residents over 65 take 5+ medications. Adverse drug events are a top contributor to readmissions (BC's readmission rate: 9.7%, 2nd highest in Canada). Manual medication reconciliation is time-consuming and error-prone -- clinicians compare lists across different systems, often on paper. (Source: Shared Care BC, BCMJ, CIHI)

**What it does:**
Given two points in time (pre-admission vs discharge, or pre-referral vs post-referral), compares the patient's medication lists and generates a reconciliation report: **New** (medications started), **Stopped** (medications discontinued), **Changed** (dose or frequency modifications), **Unchanged** (carried forward). Flags potential issues: "Stopped: metformin (was on since 2019 for diabetes) -- was this intentional?" AI highlights high-risk discrepancies: medications stopped without documented reason, new medications in the same class as existing ones, and gaps in chronic disease maintenance medications.

**What already exists (and why this is different):**
BC's polypharmacy initiatives focus on deprescribing for elderly patients. EMRs store medication lists but don't compare across transitions automatically. This is the operational step between "the patient was transferred" and "their medications are correct."

**Human story for the pitch:**
"An 78-year-old is discharged from hospital after a hip replacement. She was on 9 medications at home. The discharge summary lists 7. Two were dropped -- her thyroid medication and her blood pressure medication. Nobody noticed. Three days later, her BP spikes and she's back in the ER. This tool would have flagged at discharge: 'Two chronic medications were discontinued without documented reason. Review needed.' Thirty seconds of clinician review. One readmission prevented."

**Why the system is ready for it:**
Workforce and operations pillars. Medication reconciliation is a recognized patient safety standard (Accreditation Canada Required Organizational Practice). Every hospital is supposed to do it. The tools to make it fast and reliable don't exist. Zen's warning about workforce: "save time, simplify decisions, remove friction."

**Synthea data used:**
Patient (age), Medication (drug name, start/stop dates, dosages, reason codes across time), MedicationRequest (active prescriptions), Encounter (admission and discharge encounters, timestamps), Condition (underlying diagnoses for each medication)

**AI role:** Temporal comparison of medication lists across transition points. Discrepancy classification and risk flagging. Natural language explanation of each discrepancy.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **28/30** | Medication errors at transitions are a leading cause of preventable readmissions and adverse events. Target population: every patient being admitted, discharged, or referred (high volume). Direct patient safety benefit. Supports a mandated safety standard. |
| Feasibility & Safety | **22/25** | Comparison of structured medication data across time points. Flags discrepancies for clinician review -- does not make prescribing decisions. Risk: false positive (flags an intentional change) is low-harm. Risk: false negative (misses a dangerous omission) -- mitigated because this is additive to existing manual reconciliation. |
| **Total** | **50/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- patient safety standard, polypharmacy initiatives, admin burden |
| White Space | High -- mandated process with no automated tooling |
| Demo-ability | Good -- show two medication lists, highlight the gaps, tell the story |
| Technical Feasibility | High -- medication list comparison on FHIR MedicationRequest data |
| Narrative Power | Strong -- "two medications silently dropped at discharge" |

---

### #8. UPCC Impact Dashboard

**Pillar:** Access Redesign
**Persona:** Leader
**Pitch:** Shows whether BC's new Urgent and Primary Care Centres are actually doing what they were built to do -- diverting patients from the ER and providing continuity.

**BC problem it addresses:**
BC is aggressively expanding UPCCs -- new centres opened in Abbotsford, Port Coquitlam, Cowichan, and Elkford in 2025-2026 alone. These are the centerpiece of BC's access redesign strategy: team-based care, walk-in + longitudinal, 7-day availability. But leaders have no consolidated tool to measure impact. Are UPCCs actually reducing ER visits in their catchment area? Are patients getting attached to longitudinal care, or just using walk-in? What conditions are being seen -- are they the right ones, or are ER-level cases showing up? Health authority directors are under pressure to justify this investment. (Source: Fraser Health, BC Gov News, Zen keynote)

**What it does:**
For a given community or region, analyzes patient flow before and after a UPCC opens: ER visit volume changes, types of conditions seen at UPCC vs ER, patient demographics served, attachment rates (patients who return to the same UPCC for follow-up), and time-to-care comparison (UPCC wait vs ER wait for the same condition types). Interactive dashboard lets leaders compare regions, filter by condition type, and see trends over time. AI generates narrative summaries: "Since the Elkford UPCC opened, ER visits for CTAS 4-5 conditions in the catchment area decreased by 18%."

**What already exists (and why this is different):**
BC Health Data publishes aggregate ER statistics and UPCC visit counts. But there is no tool that connects the two -- showing the causal story of "UPCC opened → ER usage changed." Individual health authorities track their own metrics in siloed spreadsheets. This creates a unified, cross-regional impact view.

**Human story for the pitch:**
"The Elkford UPCC opened in May 2025 and served 1,500 people by December. But did it reduce ER visits? Did it serve the right patients? The health authority director opens this dashboard and sees: 'CTAS 4-5 ER visits in the Elkford catchment dropped 22% in 6 months. 340 patients used the UPCC more than once, suggesting longitudinal attachment. Top conditions: respiratory infections, minor injuries, chronic disease follow-up -- all appropriate for UPCC.' The investment is working. Here's the proof."

**Why the system is ready for it:**
Access redesign is Zen's first pillar. UPCCs are the system's primary delivery mechanism. Leaders need evidence. Funding decisions depend on demonstrated impact.

**Synthea data used:**
Encounter (timestamps, class, reason codes, facility), Patient (demographics, location), Organization (facility type, location), Condition (diagnosis codes per encounter), Provider (specialty)

**AI role:** Before/after impact analysis. Narrative generation of regional summaries. Condition classification for UPCC-appropriate vs ER-appropriate visits.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **25/30** | Directly measures the flagship access initiative. Target: health authority leaders and planners. Impact is indirect (informs investment decisions that affect patient access) but critical for system improvement. |
| Feasibility & Safety | **24/25** | Pure aggregate analytics on synthetic data. No patient interaction. No medical decisions. Zero safety risk. Computationally straightforward. |
| **Total** | **49/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Maximum -- measures the system's #1 access investment |
| White Space | High -- no unified cross-regional UPCC impact tool |
| Demo-ability | Good -- before/after charts, regional comparison, narrative |
| Technical Feasibility | High -- encounter analytics with facility filtering |
| Narrative Power | Moderate -- "is the billion-dollar investment working?" |

---

### #9. Patient Panel Complexity Dashboard

**Pillar:** Workforce as Bottleneck
**Persona:** Clinician
**Pitch:** Shows a clinician their entire patient panel stratified by medical complexity -- so they can plan their time where it matters most.

**BC problem it addresses:**
BC clinicians report "seeing more patients than I can safely manage." But not all patients require the same attention. A family doctor with a panel of 1,200 patients might have 200 who are complex (elderly, multimorbid, polypharmacy) and 1,000 who are relatively straightforward. Without visibility into panel composition, every appointment gets the same 15-minute slot, and the complex patients -- who need 30 minutes -- get rushed. Meanwhile, 60% of BC seniors have multimorbidity, and that number is rising 1.5-2.9% annually. The incoming complexity tsunami is invisible at the individual clinic level. (Source: Statistics Canada, BCCDC, Doctors of BC)

**What it does:**
Takes a clinician's patient panel and stratifies every patient into complexity tiers: **Simple** (0-1 chronic conditions, <3 medications, no recent hospitalization), **Moderate** (2-3 conditions, 3-5 medications), **Complex** (4+ conditions, 6+ medications, recent ER/hospital visits), **Highly Complex** (5+ conditions, 10+ medications, frequent hospitalizations, multiple active care plans). Dashboard view: pie chart of panel composition, list of highly complex patients with summary cards, trend over time (is the panel getting more complex?). Compare against regional averages.

**What already exists (and why this is different):**
EMRs list patients but don't stratify by complexity. BC's chronic disease dashboard (BCCDC) tracks population-level prevalence but not individual clinic panels. This gives each clinician a view they've never had: "how complex is my practice, and who needs the most attention?"

**Human story for the pitch:**
"Dr. Patel has 1,100 patients. She feels overwhelmed but can't articulate why. This tool shows: 23% of her panel is complex or highly complex -- significantly above the regional average of 15%. She has 42 patients on 10+ medications. Now she knows: she doesn't need to see more patients faster. She needs support for her complex patients -- a pharmacist, a nurse, a longer appointment block."

**Why the system is ready for it:**
Workforce is Zen's third pillar. The system is building team-based care models -- but teams need data to know where to deploy. Panel complexity is the foundation for rational resource allocation.

**Synthea data used:**
Patient (age, demographics), Condition (count, types, duration), Medication (count, types), Encounter (frequency, ER/hospital visits), Observation (lab values for chronic disease severity), CarePlan (active plans), Provider (panel assignment)

**AI role:** Complexity scoring based on clinical factors. Trend analysis over time. AI-generated panel summary for each clinician.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **26/30** | Addresses "seeing more patients than I can safely manage" directly. Target: every family doctor and clinic. Reveals the invisible complexity burden that drives burnout. Foundational for team-based care planning. |
| Feasibility & Safety | **23/25** | Read-only analytics on patient characteristics. No medical decisions. No patient interaction. Clinician uses the information for planning, not treatment. Low risk. |
| **Total** | **49/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- workforce, team-based care, panel management |
| White Space | Complete -- no clinic-level panel complexity tool exists |
| Demo-ability | Good -- pie chart, patient cards, "your panel vs average" |
| Technical Feasibility | High -- condition/medication counting on FHIR data |
| Narrative Power | Moderate -- "23% of your panel is complex, that's why you're drowning" |

---

### #10. Surgical Pathway Optimizer

**Pillar:** Healthcare as Operations
**Persona:** Leader
**Pitch:** Traces every surgical patient from referral to recovery, identifies exactly where the delays are, and shows which pathways are most and least efficient.

**BC problem it addresses:**
BC's specialist wait times are the 2nd longest ever recorded by the Fraser Institute (median 28.6 weeks). Hip replacement waits are up 72%, knee replacements up 61%. But "wait time" is a single number that hides multiple delays: time from GP referral to specialist consultation, consultation to OR booking, booking to actual surgery, surgery to discharge, discharge to follow-up. Which step is the bottleneck? It varies by procedure, hospital, and surgeon. Without granular pathway data, leaders throw money at "wait times" without knowing where the delay actually sits. (Source: Fraser Institute, BCMJ, BC Surgical Wait Times)

**What it does:**
Select a procedure type (hip replacement, cardiac surgery, cataract surgery). The tool traces every patient with that procedure through the full surgical pathway: referral date → specialist encounter → pre-operative workup → surgical procedure → discharge → post-operative follow-up. For each step, shows: median time, variance, and comparison across facilities. Highlights bottlenecks (the step with the longest wait). Shows "pathway efficiency score" per facility. AI generates insight: "At Facility A, the bottleneck is pre-op to surgery (median 14 weeks). At Facility B, it's referral to consultation (median 18 weeks). Same total wait, completely different problems."

**What already exists (and why this is different):**
BC publishes surgical wait times as aggregate numbers (referral to treatment). The provincial strategy mentions "operating room efficiency" and "waitlist optimization." But there is no tool that decomposes the pathway into steps and identifies the specific bottleneck per facility. This is the diagnostic tool for the surgical backlog.

**Human story for the pitch:**
"1.2 million British Columbians are waiting for specialist consultations. A patient needing a knee replacement waits 61% longer than five years ago. But where is the actual delay? This tool shows: at one hospital, patients wait 4 months just for the pre-operative assessment. At another, the pre-op is fast but the OR is booked 6 months out. Same wait, different problem, different solution. Fix the right bottleneck and you move thousands of patients through faster."

**Why the system is ready for it:**
Operations is Zen's fourth pillar. The Ministry of Health's provincial strategy explicitly includes "improving operating room efficiency" and "measuring and monitoring wait times." Budget is allocated. The tool that decomposes wait times into actionable segments does not exist.

**Synthea data used:**
Encounter (timestamps, types, facility), Procedure (surgical procedures, dates), Condition (diagnosis driving the surgery), Claim (referral dates, provider IDs), Organization (facility comparison), Provider (surgeon), Patient (demographics)

**AI role:** Pathway inference from encounter/procedure sequences. Bottleneck identification. Cross-facility comparison and narrative generation.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **26/30** | Surgical wait times are BC's most visible healthcare crisis. Direct impact on patient outcomes (delayed surgery = prolonged pain, deterioration). Target: health system leaders and surgical program directors. Indirect patient benefit through system improvement. |
| Feasibility & Safety | **24/25** | Pure aggregate analytics on synthetic data. No patient interaction. No clinical decisions. Computationally clean: sort encounters by date, match procedures to referrals. Zero safety risk. |
| **Total** | **50/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- surgical backlog is a top provincial priority |
| White Space | High -- wait times published as aggregates, not decomposed |
| Demo-ability | Good -- pathway visualization, bottleneck highlighted, facility comparison |
| Technical Feasibility | High -- temporal analysis of procedure and encounter data |
| Narrative Power | Strong -- "same wait time, completely different problem" |

---

### #11. Discharge Medication Safety Check

**Pillar:** Healthcare as Operations
**Persona:** Clinician
**Pitch:** At the moment of discharge, scans for the medication errors that cause 25-50% of preventable readmissions.

**BC problem it addresses:**
BC's 30-day readmission rate is 9.7% (2nd highest in Canada). 25-50% of readmissions are preventable. Top causes: adverse drug reactions from medication changes at discharge, inadequate follow-up, and poor care coordination. When a patient is discharged, their medication list has often changed -- new drugs added (pain management, antibiotics), chronic medications potentially omitted (accidentally), doses adjusted. The discharge summary may not reflect these changes accurately. Manual checking is rushed -- discharge is one of the busiest moments in a hospital workflow. (Source: BCMJ, CIHI, Fraser Health)

**What it does:**
At discharge, compares the patient's pre-admission medication list against the discharge medication list. Generates a safety report: medications that were stopped (with flag for chronic medications stopped without documented reason), new medications that duplicate existing drug classes, potential interactions between new and existing medications, and chronic disease maintenance medications that should be continued but are missing. Color-coded: green (expected changes), yellow (review recommended), red (potential safety issue).

**What already exists (and why this is different):**
Similar to Medication Reconciliation at Transitions (#7) but focused specifically on the discharge moment and designed as a safety check rather than a reconciliation workflow. The Bridge-to-Home collaborative (Health Quality BC) focuses on discharge communication and patient education but does not automate medication comparison. The Patient-Oriented Discharge Summary (PODS) is patient-facing; this is clinician-facing.

**Human story for the pitch:**
"A 68-year-old man is discharged after pneumonia treatment. He was on 8 medications at home. At discharge, his statin and his diabetes medication are both missing from the list -- they were held during the acute stay and never restarted. The safety check flags: 'Atorvastatin (prescribed since 2018 for hyperlipidemia) -- discontinued without documented reason. Metformin (prescribed since 2020 for diabetes) -- discontinued without documented reason.' The discharge nurse catches both. Two medication errors prevented."

**Why the system is ready for it:**
Operations pillar, directly targeting readmission prevention. Medication reconciliation is an Accreditation Canada Required Organizational Practice. Every hospital must do it. Automated support for this mandatory process is immediately adoptable.

**Synthea data used:**
Patient (age), Medication (pre-admission list, discharge list, start/stop dates, reason codes), MedicationRequest, Encounter (admission, discharge), Condition (underlying diagnoses)

**AI role:** Medication list comparison. Classification of changes. Risk flagging based on clinical context (chronic medications, drug classes).

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **27/30** | Targets a top cause of preventable readmissions. Direct patient safety impact. Target: every discharging clinician and patient. BC readmission data is presentation-ready. |
| Feasibility & Safety | **22/25** | Comparison of structured medication data. Flags for clinician review, does not prescribe. Risk: false sense of security if tool misses something. Mitigated by being additive to existing manual process. |
| **Total** | **49/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- readmission prevention, patient safety standard |
| White Space | Moderate -- Bridge-to-Home exists but doesn't automate medication comparison |
| Demo-ability | Good -- side-by-side medication lists, red/yellow/green flags |
| Technical Feasibility | High -- medication list comparison on FHIR data |
| Narrative Power | Strong -- "two medications silently disappeared at discharge" |

---

### #12. Care Team Visibility Map

**Pillar:** Decentralized Care
**Persona:** Clinician + Leader
**Pitch:** Visualizes the full care team around each patient -- who is involved, who's doing what, and where the coordination gaps are.

**BC problem it addresses:**
As care moves into the community (Zen's second pillar), patients see more providers in more settings: GP, specialist, pharmacist, home care nurse, physiotherapist, mental health counsellor. But none of these providers can see the full picture. The GP doesn't know the home care nurse adjusted the care plan. The specialist doesn't know the pharmacist flagged a drug interaction. BC's Primary Care Networks are designed to coordinate team-based care, but the coordination tools are largely phone, fax, and shared EMR access (where it exists). For complex patients, fragmented care leads to duplicated tests, conflicting prescriptions, and missed signals. (Source: FPSC, BC PCN documentation, Zen keynote)

**What it does:**
For any patient, generates a network map of their care team: every provider who has seen them in the past 12 months, grouped by role (primary care, specialist, allied health, hospital). Shows: frequency of contact with each provider, when they last saw the patient, and whether the patient's care plan is consistent across providers. Highlights "orphaned" patients (no consistent primary care provider) and "fragmented" patients (many providers, low coordination signals). At population level: which patients have the most fragmented care, and which provider networks have the worst coordination?

**What already exists (and why this is different):**
EMRs show encounters per patient but don't visualize the care team as a network. BC's PCN infrastructure creates geographic networks but doesn't show individual patient-level team composition. This makes the invisible coordination problem visible.

**Human story for the pitch:**
"Mrs. Thompson, 79, sees 6 different providers. Her GP prescribed a blood thinner. Her cardiologist adjusted the dose. Her pharmacist flagged a potential interaction with her new anti-inflammatory. Her home care nurse doesn't know about any of this. This map shows all 6 providers, when they last saw Mrs. Thompson, and that 3 of them made medication changes in the past month without apparent coordination. The GP can now see: 'I need to call the cardiologist.'"

**Why the system is ready for it:**
Decentralized care and workforce pillars. Team-based care is the explicit model for PCNs and UPCCs. But "team" implies visibility and coordination -- the tools for which barely exist.

**Synthea data used:**
Patient (demographics), Encounter (provider, timestamps, types), Provider (specialty, organization), Organization (facility), Medication (prescribing provider), CarePlan (managing provider), Condition (managing provider)

**AI role:** Network analysis to identify fragmentation patterns. Coordination gap detection. AI-generated summary of each patient's care team composition.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **25/30** | Care fragmentation is a documented source of error and waste. Target: clinicians managing complex patients with multiple providers, and leaders designing team-based care models. Benefit is real but somewhat structural. |
| Feasibility & Safety | **23/25** | Read-only visualization of encounter/provider relationships. No medical decisions. No patient interaction. Analytics only. Synthetic data. |
| **Total** | **48/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- PCNs, team-based care, care coordination |
| White Space | Complete -- no patient-level care team visualization exists |
| Demo-ability | Excellent -- network graph is visually striking, click any node |
| Technical Feasibility | High -- provider/encounter join queries on FHIR data |
| Narrative Power | Good -- "6 providers, 3 medication changes, nobody coordinating" |

---

### #13. Team Handoff Brief

**Pillar:** Workforce as Bottleneck
**Persona:** Clinician
**Pitch:** When a patient at a UPCC or team-based clinic sees a different provider than last time, generates a brief: what happened last visit, what was the plan, and what's outstanding.

**BC problem it addresses:**
UPCCs and team-based primary care are built on rotating providers -- patients may see a different doctor, NP, or nurse each visit. This means every visit starts with "so, what brings you in today?" even if the patient was here last week with the same issue. The new provider spends minutes catching up on what the last provider did and decided. For patients, it feels like "starting over." For clinicians, it's redundant work. For the system, it's lost continuity. The Elkford UPCC saw 1,500 patients in 7 months with a team of ~9 clinical staff -- each patient potentially seeing a different provider each time. (Source: BC Gov News, UPCCs, Zen keynote)

**What it does:**
When a patient arrives for an encounter and their assigned provider is different from their last encounter's provider, generates a handoff brief: **Last visit** (date, provider, reason, key findings), **Plan from last visit** (medications started/changed, tests ordered, follow-ups requested), **Outstanding items** (pending test results, referrals in progress), **Patient's ongoing concerns** (active conditions and care plans). One page. The new provider reads it in 30 seconds and walks in informed.

**What already exists (and why this is different):**
EMRs show encounter notes, but reading a previous provider's full note takes minutes. This is a structured, synthesized handoff -- the minimum viable context to maintain continuity without the full chart review.

**Human story for the pitch:**
"A patient with back pain saw Dr. Lee at the UPCC on Monday. Dr. Lee ordered an x-ray and prescribed a muscle relaxant. The patient returns Thursday -- Dr. Lee isn't in. Dr. Nakamura picks up the chart and sees 4 months of encounter notes. The handoff brief says: 'Seen Monday for acute low back pain. X-ray ordered (results pending). Started cyclobenzaprine 10mg. Plan: follow up in one week for x-ray review.' Thirty seconds. Continuity maintained."

**Why the system is ready for it:**
Workforce pillar. UPCCs are the system's flagship care model, and they structurally create the handoff problem. This tool makes team-based care work better without changing the model.

**Synthea data used:**
Patient, Encounter (recent, with provider, reason codes, outcomes), Condition (active), Medication (recent changes), Procedure (recent orders), Observation (recent results), CarePlan, Provider

**AI role:** Last-encounter summarization focused on continuity-relevant information. Outstanding item detection. Structured brief generation.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **26/30** | Directly enables the team-based care model BC is investing in. Target: every provider at a UPCC or rotating clinic. Benefit: maintained continuity, saved time, reduced patient frustration. |
| Feasibility & Safety | **22/25** | AI-generated summary of last encounter. Risk: misses a critical detail from the previous visit. Mitigated by full chart access remaining available. Read-only. |
| **Total** | **48/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- UPCCs create this problem structurally |
| White Space | Complete -- no automated handoff tool for team-based care |
| Demo-ability | Good -- show the brief, show the alternative (scrolling through notes) |
| Technical Feasibility | High -- last-encounter summarization on FHIR data |
| Narrative Power | Good -- "back pain patient, different doctor, 30 seconds to catch up" |

---

### #14. ER Wait Transparency & Alternative Finder

**Pillar:** Access Redesign
**Persona:** Patient
**Pitch:** Before you drive to the ER, see estimated wait times and discover alternatives you didn't know existed -- the UPCC that's open until 8pm, the pharmacist who can prescribe for your condition, the 811 virtual doctor.

**BC problem it addresses:**
141,961 patients left BC ERs without being seen in 2024-25 -- an 86% increase since 2018-19. These patients waited hours and then left, meaning the ER absorbed the triage cost but the patient got no care. Many of these patients had conditions that could have been managed elsewhere -- but they didn't know the alternatives existed. UPCCs are expanding, pharmacist scope has been broadened, and HealthLink BC added virtual physicians (reducing ED visits by 16 per 1,000 patients). The information exists but isn't reaching patients at the moment of decision. (Source: BC Health Data, CIHI, HealthLink BC HEiDi study)

**What it does:**
Patient selects their general concern type (e.g., "infection/cold symptoms," "injury," "abdominal pain," "mental health," "chronic disease flare"). The tool shows: (1) Nearby care options by type: ER, UPCC, walk-in clinic, pharmacy (with current hours), virtual care (811 virtual doctor). (2) Typical wait time ranges by care type and time of day. (3) What each level can handle: "Pharmacists in BC can now prescribe for: UTIs, pink eye, cold sores, allergic rhinitis, and 20+ other minor conditions." (4) Clear guidance on when ER IS the right choice: "Go to the ER if you experience chest pain, difficulty breathing, severe bleeding, or loss of consciousness."

**What already exists (and why this is different):**
HealthLink BC 811 provides phone-based navigation. The Health Service Finder shows facility locations but not wait times or capability matching. No tool combines real-time availability with capability matching at the moment of patient decision. This is the "Google Maps for healthcare" -- not just where, but which level, and what can they do.

**Human story for the pitch:**
"It's Sunday afternoon. You have a painful UTI. You think: 'I need to go to the ER.' This tool says: 'For UTIs, your pharmacist can now prescribe antibiotics directly. Shoppers Drug Mart on Cook Street is open until 6pm.' You walk to the pharmacy, get treated in 15 minutes, and the ER has one fewer patient in its 6-hour queue."

**Why the system is ready for it:**
Access redesign pillar. The system has built the alternatives (UPCCs, expanded pharmacy scope, virtual physicians). The missing piece is patient awareness at the moment of decision.

**Synthea data used:**
Patient (demographics, location), Encounter (historical ER usage, condition patterns), Organization (facility types, locations), Condition (for population-level care-seeking pattern analysis)

**AI role:** Concern-to-care-level matching. Natural language explanation of care options. Population analytics showing which conditions are most commonly seen in ER that have alternatives.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **26/30** | Addresses "I don't know where to go" directly. Target: every patient seeking care (universal). 15% of ED visits are avoidable. Reduces ER burden and gets patients care faster. |
| Feasibility & Safety | **22/25** | Informational tool showing options and capability. Does not diagnose or triage (lower risk than Smart Care Level Router #5). Clear ER safety-net messaging. Risk: patient chooses wrong level because of incomplete info. Mitigated by conservative framing. |
| **Total** | **48/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Maximum -- the system built alternatives, patients don't know about them |
| White Space | High -- 811 is phone-only, no real-time capability matching |
| Demo-ability | Excellent -- "I have a UTI" → "go to your pharmacist" is instantly powerful |
| Technical Feasibility | High -- facility/capability matching with population analytics |
| Narrative Power | Strong -- "Sunday afternoon UTI, pharmacy vs 6-hour ER wait" |

---

### #15. Care Continuity Score

**Pillar:** Healthcare as Operations
**Persona:** Leader
**Pitch:** Measures how fragmented a patient's care is -- and aggregates it to show which communities, conditions, and populations have the most broken continuity.

**BC problem it addresses:**
Canada's healthcare system is notoriously fragmented. A patient with multiple chronic conditions might see 6 different providers across 3 organizations with no coordination. Studies consistently link care fragmentation to worse outcomes, higher costs, and more ER visits. BC is investing in PCNs specifically to improve coordination -- but there is no metric for "how coordinated is care for this population?" Without measurement, there is no accountability. (Source: FPSC, BC PCN documentation, CIHI)

**What it does:**
For each patient, computes a Care Continuity Score based on: number of unique providers seen, consistency of primary care provider (same GP vs rotating), gaps between encounters for chronic conditions, coordination signals (referral completion rates, follow-up after hospitalization), and medication consistency across providers. Aggregate to population level: which regions have the highest fragmentation? Which conditions? Which age groups? Trend over time: is the PCN making care more continuous?

**What already exists (and why this is different):**
BC Health Data tracks some access metrics but not continuity. CIHI publishes national indicators. No tool measures patient-level care continuity and aggregates it for system planning. This creates the metric that PCNs need to prove their value.

**Human story for the pitch:**
"A Primary Care Network director asks: 'Is our coordination getting better?' Today, they have no answer. This tool shows: 'Your network's average Care Continuity Score improved from 42 to 58 over the past year. Patients with diabetes saw the biggest improvement. Patients with mental health conditions remain highly fragmented.' Now they know where to focus."

**Why the system is ready for it:**
Operations pillar. PCNs are being built specifically to improve continuity. Leaders need metrics to measure progress and justify investment.

**Synthea data used:**
Patient, Encounter (provider, timestamps, facility), Provider (continuity tracking), Condition (chronic disease follow-up patterns), Medication (prescribing consistency), Organization, CarePlan

**AI role:** Continuity metric computation. Population aggregation and trend analysis. AI-generated insights on fragmentation drivers.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **24/30** | Care continuity is a validated predictor of outcomes. Target: leaders and PCN directors. Indirect patient benefit through system improvement. Important but one step removed from individual care. |
| Feasibility & Safety | **24/25** | Pure analytics on aggregate synthetic data. No patient interaction. No medical decisions. Read-only. Zero safety risk. |
| **Total** | **48/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- PCNs exist to improve continuity, need to measure it |
| White Space | Complete -- no patient-level continuity metric exists |
| Demo-ability | Moderate -- metrics dashboard, less visceral than patient-facing tools |
| Technical Feasibility | High -- encounter/provider analysis on FHIR data |
| Narrative Power | Moderate -- "is our $X million PCN investment working?" |

---

### #16. Clinic Demand Forecaster

**Pillar:** Healthcare as Operations
**Persona:** Clinician + Leader
**Pitch:** Predicts next week's clinic demand based on panel characteristics, seasonal patterns, and chronic disease cycles -- so clinics can staff for what's actually coming.

**BC problem it addresses:**
Clinics staff based on historical averages and gut feeling. But demand is not uniform -- flu season spikes respiratory visits, spring brings allergy visits, post-holiday periods see mental health surges, chronic disease patients cluster follow-ups around lab cycles. When demand exceeds capacity, patients can't get in and go to the ER. When demand is below capacity, clinician time is wasted. Fraser Health has invested $1.5M in AI scheduling for ERs and hospitals -- but primary care and community clinics have nothing. (Source: Fraser Health, Zen keynote on operations)

**What it does:**
Analyzes a clinic's historical encounter data and patient panel composition to forecast demand by visit type for the next 1-4 weeks: acute visits (illness, injury), chronic disease follow-ups, preventive care (screenings, immunizations), mental health, and pediatric. Shows predicted volume by day with confidence intervals. Flags upcoming surges: "Diabetes follow-up cluster expected next week -- 15 patients due for A1C review." Suggests staffing adjustments: "Consider adding a nurse practitioner shift on Tuesday."

**What already exists (and why this is different):**
Fraser Health's AI scheduling is hospital/ER-focused. No community clinic demand forecasting tool exists. This brings operational intelligence to primary care -- where most care happens.

**Human story for the pitch:**
"A clinic manager looks at next week's schedule: 5 appointment slots left per day. Is that enough? This tool says: 'Based on your patient panel and seasonal patterns, expect 20% more respiratory visits this week. 12 diabetes patients are due for follow-up. Consider extending hours on Wednesday.' The manager adds a nurse practitioner shift. No patients are turned away."

**Why the system is ready for it:**
Operations pillar. The system is investing in scheduling optimization (Fraser Health $1.5M), but only for hospitals. Primary care is where most access happens and where demand forecasting would have the broadest impact.

**Synthea data used:**
Patient (demographics, panel assignment), Encounter (historical patterns, timestamps, reason codes), Condition (chronic disease cycles), Observation (lab timing patterns), Organization (clinic), Provider

**AI role:** Time-series forecasting on encounter patterns. Panel composition analysis. Natural language staffing recommendations.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **24/30** | Capacity mismatch is real and affects patient access directly. Target: clinic managers and primary care providers. Benefit: better-matched staffing → fewer patients turned away. More operational than clinical. |
| Feasibility & Safety | **24/25** | Forecasting model on historical data. No patient interaction. No medical decisions. Zero safety risk. |
| **Total** | **48/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- scheduling/capacity investment, primary care access |
| White Space | Complete -- AI scheduling exists for hospitals, not primary care |
| Demo-ability | Good -- forecast chart with staffing recommendations |
| Technical Feasibility | Moderate -- requires meaningful historical data patterns in Synthea |
| Narrative Power | Moderate -- "next week's demand, today's staffing decision" |

---

### #17. Community Health Pulse

**Pillar:** Decentralized Care
**Persona:** Leader
**Pitch:** Real-time health indicators for a community -- is ER usage spiking? Are chronic disease patients deteriorating? Is a flu wave incoming? -- so leaders can deploy resources before the crisis hits.

**BC problem it addresses:**
Health authority leaders manage resources across large geographies. By the time an ER reports a surge, it's too late to respond. By the time chronic disease hospitalizations spike in a community, the preventive window has closed. Rural and remote communities (100 Mile House, Elkford) are especially vulnerable -- a single ER closure cascade can leave an entire region without care. The system is reactive, not predictive. (Source: BC Health Data, CBC, Zen keynote on operations)

**What it does:**
For a defined geographic area, tracks and trends: ER visit volume by acuity level, chronic disease encounter frequency, hospitalization rates, encounters by condition category, and encounter gaps (patients who stopped showing up). Compares current week to historical baseline. Alerts: "ER visits for respiratory conditions in Region X are 40% above the 4-week average." "Diabetes-related encounters dropped 25% -- possible access issue." AI generates weekly pulse report for regional leaders.

**What already exists (and why this is different):**
BC Health Data publishes annual aggregate statistics. Hospital dashboards show real-time facility data. No tool provides community-level trend monitoring across multiple health indicators for proactive resource deployment.

**Human story for the pitch:**
"It's March. The Community Health Pulse for a small northern town shows: 'Respiratory ER visits up 45% this week. 3 COPD patients hospitalized, compared to 0 last month. Flu-like encounter codes trending up.' The regional director deploys a temporary virtual care team and sends additional medication supplies. The ER doesn't close."

**Why the system is ready for it:**
Decentralized care and operations pillars. BC is investing in community-based care delivery. Leaders need population-level visibility outside hospital walls.

**Synthea data used:**
Encounter (timestamps, types, reason codes, facility), Patient (demographics, location), Organization (geographic), Condition (diagnosis trends), Observation (vitals trends at population level)

**AI role:** Trend detection and anomaly identification. Weekly report generation. Predictive signals from encounter pattern changes.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **24/30** | Population health surveillance with direct resource allocation impact. Target: regional leaders. Indirect but significant patient benefit through proactive response. |
| Feasibility & Safety | **24/25** | Pure aggregate analytics. No individual patient decisions. No patient interaction. Zero safety risk. |
| **Total** | **48/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- community-based care, proactive resource deployment |
| White Space | High -- no community-level trend monitoring tool |
| Demo-ability | Good -- trend charts with alerts, geographic view |
| Technical Feasibility | High -- encounter trend analysis on FHIR data |
| Narrative Power | Moderate -- "the ER surge we could have seen coming" |

---

### #18. Post-Discharge Recovery Companion

**Pillar:** Decentralized Care
**Persona:** Patient
**Pitch:** A personalized post-discharge recovery tracker that tells patients what to expect each day, what to watch for, and when something isn't right -- bridging the gap between hospital and home.

**BC problem it addresses:**
BC's 30-day readmission rate is 9.7% (2nd highest in Canada), with 25-50% of readmissions preventable. The most dangerous moment: the first 72 hours after discharge, when patients are alone at home with new medications, post-surgical restrictions, and warning signs they may not recognize. The Bridge-to-Home collaborative has improved discharge communication, but once the patient leaves, they're on their own until their follow-up appointment (often 2+ weeks away). Home care services exist but serve only the most complex patients. (Source: Health Quality BC, BCMJ, CIHI)

**What it does:**
Given a patient's discharge encounter (diagnosis, procedures performed, medications changed, follow-up plan), generates a personalized day-by-day recovery timeline: **Day 1-3** (immediate post-discharge expectations, medication schedule, warning signs), **Day 4-7** (activity resumption guidance, what's normal vs concerning), **Week 2+** (milestone checks, when to contact provider). Each day includes a simple check-in: "How are you feeling today?" with structured options that flag concerning responses. AI tailors content to the patient's specific conditions and procedures.

**What already exists (and why this is different):**
Bridge-to-Home provides discharge summaries and teach-back. Patient-Oriented Discharge Summary (PODS) is a one-time document. Neither provides ongoing day-by-day guidance. This is the "recovery roadmap" that starts where PODS ends.

**Human story for the pitch:**
"A 65-year-old is discharged after a cardiac procedure. Day 3 at home, she checks the recovery companion: 'Day 3: some fatigue is normal. Watch for: increasing chest pain, shortness of breath at rest, swelling in legs. Your medication review: take all medications as listed. Your follow-up appointment is in 10 days.' Day 5: she reports increasing shortness of breath. The tool flags: 'This may need medical attention. Contact your care provider or call 811.' She calls 811. They arrange a virtual visit. Her medication dose is adjusted. She stays home."

**Why the system is ready for it:**
Decentralized care pillar. The system wants care at home. Bridge-to-Home exists but ends at discharge. This extends the support into the recovery period.

**Synthea data used:**
Patient (age, demographics), Encounter (discharge encounter, procedures, diagnosis), Condition (relevant conditions), Medication (discharge medication list, changes), Procedure (what was done), CarePlan (follow-up plan), Observation (baseline vitals)

**AI role:** Recovery timeline generation personalized to conditions and procedures. Symptom assessment against clinical warning signs. Escalation logic.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **27/30** | Directly targets the 72-hour post-discharge danger zone. Target: every discharged hospital patient. Clear readmission prevention benefit. Strong BC data. |
| Feasibility & Safety | **19/25** | AI-generated content that patients act on during a medically vulnerable period. Higher safety risk than analytics tools. Risk: patient relies on tool and ignores symptoms not covered. Mitigated by conservative thresholds, clear "when in doubt, seek care" messaging, and "this is not a substitute for medical advice" framing. But still carries more risk than read-only tools. |
| **Total** | **46/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- decentralized care, readmission prevention |
| White Space | Moderate -- Bridge-to-Home exists for discharge moment, not ongoing recovery |
| Demo-ability | Good -- day-by-day timeline, check-in interaction |
| Technical Feasibility | Moderate -- needs good recovery guideline logic per condition |
| Narrative Power | Strong -- "day 5 post-discharge, alone at home, something feels wrong" |

---

### #19. Patient-Generated Pre-Visit Summary

**Pillar:** Workforce as Bottleneck
**Persona:** Patient + Clinician (bridges both)
**Pitch:** Before the appointment, patients fill out structured questions about their concerns. The clinician gets an organized summary instead of spending the first 5 minutes asking "so, what brings you in?"

**BC problem it addresses:**
The average family doctor appointment in Canada is 10-15 minutes. The first 3-5 minutes are often spent on intake: "What brings you in? How long has this been going on? Any changes since last time? Are you taking your medications?" For patients with complex issues, this eats half the visit. Clinicians report that "the system is not designed around how care actually happens" (Zen keynote). Patients feel rushed and forget to mention important things. The visit starts unstructured and the clinician has to extract information manually. (Source: Zen keynote, Doctors of BC)

**What it does:**
Before a scheduled appointment, the patient receives a simple structured questionnaire: What are your top 3 concerns today? Any new symptoms since your last visit? Are you taking all your medications as prescribed? Any medication side effects? Anything else you want the doctor to know? Responses are structured into a one-page pre-visit summary for the clinician: concerns ranked by patient priority, symptom details, medication adherence notes, and open-ended items. The clinician walks in already knowing what the patient wants to talk about.

**What already exists (and why this is different):**
Some clinics use paper intake forms. No BC-wide digital tool structures patient input before the visit and presents it to the clinician in a useful format. This is the patient equivalent of the Pre-Visit Encounter Brief (#4) -- both attack the same problem from different sides.

**Human story for the pitch:**
"Mr. Kim, 72, has 4 things he wants to discuss at his 15-minute appointment. Usually, he forgets the most important one. He fills out the pre-visit summary: 'Main concern: chest tightness when climbing stairs (started 2 weeks ago). Also: knee pain is worse, need medication refill, and want to discuss sleep problems.' The doctor sees this before walking in. 'Let's start with the chest tightness.' The most important issue gets addressed first."

**Why the system is ready for it:**
Workforce pillar. Zen said: "save time, simplify decisions, remove friction." This removes the unstructured intake step. No behavior change for the clinician -- they just receive better information. Minimal behavior change for the patient -- similar to existing intake forms but digital and structured.

**Synthea data used:**
Patient (demographics), Encounter (appointment context), Condition (active conditions for contextual questions), Medication (current list for adherence questions)

**AI role:** Questionnaire generation personalized to patient profile. Response structuring and prioritization. Summary generation.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **25/30** | Improves visit quality for both patient and clinician. Target: every patient with a scheduled appointment. Time saved is modest per visit but compounds across thousands of visits. Dual benefit. |
| Feasibility & Safety | **22/25** | Patient-facing questionnaire → clinician-facing summary. No medical decisions. No AI-generated medical advice. Risk: patient discloses something critical in the form that gets buried in the summary. Low risk because clinician still conducts the visit. |
| **Total** | **47/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Moderate -- admin burden reduction, patient experience |
| White Space | High -- no standardized digital pre-visit intake in BC |
| Demo-ability | Good -- patient fills form, clinician sees structured summary |
| Technical Feasibility | High -- form builder with AI structuring |
| Narrative Power | Good -- "4 concerns, 15 minutes, the most important one first" |

---

### #20. Mental Health Access Navigator

**Pillar:** Access Redesign
**Persona:** Patient
**Pitch:** Helps patients -- especially youth -- find the right mental health service when they don't know where to start: intake clinics, IYS hubs, crisis lines, community counselling, or virtual options.

**BC problem it addresses:**
Mental health access in BC is a maze. Youth wait a median of 24 days for counselling; adults wait 34 days. But the bigger problem: most people don't even know what services exist. BC has 93 Child and Youth Mental Health intake clinics, Integrated Youth Services hubs, 811 counselling, crisis lines, community agencies, and private options. Fraser Health's Access Central offers same-day assessments. The services exist but are scattered across different organizations, websites, and phone numbers. A person in crisis has to navigate this fragmented landscape themselves. (Source: CIHI, BC CYMH, Fraser Health Access Central)

**What it does:**
Patient answers a few questions: age, general concern (anxiety, depression, substance use, crisis, relationship issues), urgency (crisis now vs looking for ongoing support), and location. The tool maps their answers to available services: "You're 19 and experiencing anxiety. Here are your options: (1) IYS hub at [location] -- walk-in, free, age 12-25. (2) Access Central -- same-day phone assessment, 8:30am-8:30pm. (3) 811 counselling -- call now, 24/7. (4) [Community agency] -- waitlist, but free long-term counselling." Shows what each service offers, hours, cost, and how to access.

**What already exists (and why this is different):**
HealthLink BC 811 provides phone-based counselling and referral. BC's online directories list services but require the user to know what to search for. No tool asks "what are you going through?" and responds with "here are the specific services that match your situation, ranked by how quickly you can access them."

**Human story for the pitch:**
"A 17-year-old is struggling with anxiety. They Google 'mental health help BC' and get 50 results. They don't know the difference between an intake clinic, a crisis line, and a community counsellor. This tool asks three questions and says: 'Your nearest IYS hub is at [address]. You can walk in Tuesday-Saturday. They offer free counselling for ages 12-25. If you need to talk to someone right now, call 811 and ask for counselling.'"

**Why the system is ready for it:**
Access redesign pillar. BC has invested in building mental health services. The problem is not availability but navigation -- exactly what Zen described as "the front door being rebuilt."

**Synthea data used:**
Patient (age, demographics, location), Condition (mental health conditions for population analysis), Encounter (mental health encounter patterns), Organization (service locations)

**AI role:** Needs-to-service matching. Natural language explanation of options. Population analytics showing mental health access patterns.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **26/30** | Mental health access is a recognized crisis. Youth are especially underserved. Target: anyone seeking mental health support (broad). Direct benefit: faster access to appropriate service. |
| Feasibility & Safety | **21/25** | Navigation tool pointing to existing services. Does not diagnose or treat. Risk: person in crisis uses tool instead of calling 911. Mitigated by prominent crisis messaging and "if you're in immediate danger" warnings. Synthea mental health data may be limited for demo. |
| **Total** | **47/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- mental health is a provincial priority, services built but hard to find |
| White Space | High -- no needs-based mental health navigation tool |
| Demo-ability | Good -- "I'm anxious" → here are your specific options |
| Technical Feasibility | Moderate -- limited by Synthea mental health modeling |
| Narrative Power | Strong -- "17-year-old, anxious, 50 Google results, doesn't know where to start" |

---

### #21. Cost of Delay Calculator

**Pillar:** Healthcare as Operations
**Persona:** Leader
**Pitch:** For any operational bottleneck, calculates the downstream cost in ER visits, hospitalizations, and patient harm -- making the business case for fixing it.

**BC problem it addresses:**
Every operational delay in the system generates downstream costs. Zen's broken elbow: 3 extra hospital visits, hours of waiting, weeks of unnecessary cast-wearing. Multiply that by thousands of patients. But health system leaders don't have a tool to quantify these cascading costs. They know wait times are bad but can't say: "this scheduling gap costs us $2.3M per year in avoidable ER visits." Without financial quantification, operational improvements compete poorly for budget against clinical priorities. (Source: Zen keynote, CIHI readmission costs, BC Health Data)

**What it does:**
Select a bottleneck type: diagnostic result delay, referral wait time, discharge scheduling gap, follow-up appointment delay. The tool models the downstream impact: for each day of delay, how many patients escalate to ER, how many get readmitted, how many have worsened conditions requiring more intensive treatment. Outputs a cost estimate: "A 7-day delay in diagnostic result review generates an estimated $X in additional ER visits per 1,000 patients." Comparison tool: "Reducing referral-to-specialist wait from 18 weeks to 12 weeks would prevent an estimated Y hospitalizations per year."

**What already exists (and why this is different):**
Health economics research exists in academic literature. BC publishes wait time statistics. No operational tool connects specific delays to specific downstream costs for decision-makers.

**Human story for the pitch:**
"The hospital CEO asks: 'Should we invest $500K in faster diagnostic reporting or $500K in more OR time?' This tool shows: 'Faster diagnostic reporting would prevent an estimated 340 ER visits per year ($680K in system costs). More OR time would reduce the surgical backlog by 200 patients ($1.2M in reduced wait-time burden). Both are worth it, but OR time has higher ROI.' Data-driven decision."

**Why the system is ready for it:**
Operations pillar. Leaders are under pressure to justify investments. "Funding tied to wait times" (Zen keynote). This tool translates operational data into financial language.

**Synthea data used:**
Encounter (timestamps, types, costs from Claims), Condition (diagnosis progression), Procedure (delayed procedures), Claim (cost data), Patient (outcomes following delays)

**AI role:** Causal modeling of delay-to-outcome chains. Cost estimation. Scenario comparison and narrative generation.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **22/30** | Important for system decision-making but one step removed from direct clinical impact. Target: executives and planners. Benefit is systemic and financial rather than individual clinical. |
| Feasibility & Safety | **24/25** | Pure analytics and modeling on synthetic data. No patient interaction. No medical decisions. Zero safety risk. |
| **Total** | **46/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Moderate -- supports investment decisions but not a direct clinical tool |
| White Space | Complete -- no operational cost-of-delay tool exists |
| Demo-ability | Moderate -- financial modeling is less visceral than patient stories |
| Technical Feasibility | Moderate -- causal modeling is harder than descriptive analytics |
| Narrative Power | Moderate -- "$680K in avoidable ER visits from one scheduling gap" |

---

### #22. "What If" Capacity Modeler

**Pillar:** Access Redesign + Healthcare as Operations
**Persona:** Leader
**Pitch:** What if we added a UPCC here? Extended clinic hours there? Added a virtual care team? Models the downstream impact on ER usage, wait times, and patient access.

**BC problem it addresses:**
Health authority leaders make resource allocation decisions with limited data. "Should we open a UPCC in this community?" involves guessing at demand, ER diversion potential, and staffing needs. The decision is often based on political pressure or crude population counts rather than modeled impact. Given that each UPCC costs millions to build and staff, the stakes are high. (Source: BC Gov News UPCC announcements, Zen keynote)

**What it does:**
Takes a community's population profile (age distribution, chronic disease prevalence, current ER usage, provider density) and models the impact of an intervention: "Add a UPCC → projected ER visits reduced by X%, projected patients attached to primary care = Y." "Extend clinic hours to 8pm → projected after-hours ER visits diverted = Z." "Add a virtual care team → projected cost savings = $W." Uses Synthea population data as the baseline and applies published evidence on intervention effectiveness.

**What already exists (and why this is different):**
Health authorities do internal modeling but it's ad hoc, not standardized, and not accessible to planners in real time. This creates an interactive "sandbox" for resource allocation decisions.

**Human story for the pitch:**
"A rural community has one ER that keeps closing due to staffing shortages. The health authority asks: 'What would happen if we put a UPCC here?' This tool models: 'Based on the population profile, a UPCC would serve an estimated 3,000 patients/year and divert 40% of CTAS 4-5 ER visits. Projected staffing: 4 FTE. Estimated cost savings vs ER care: $1.8M/year.' The business case writes itself."

**Why the system is ready for it:**
Access and operations pillars. UPCCs are being built rapidly. Leaders need tools to decide where next.

**Synthea data used:**
Patient (demographics, location, chronic disease profile), Encounter (ER usage by condition and acuity), Organization (current facility coverage), Condition (prevalence by region)

**AI role:** Population modeling and intervention impact simulation. Scenario comparison. Narrative generation of business cases.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **23/30** | Supports high-impact resource allocation decisions. But the tool itself doesn't deliver care -- it informs planning. Target: health authority planners. |
| Feasibility & Safety | **23/25** | Modeling on synthetic population data. No patient interaction. No medical decisions. Risk: model outputs are taken as precise predictions when they're estimates. Mitigated by confidence intervals and assumptions documentation. |
| **Total** | **46/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- directly supports UPCC expansion decisions |
| White Space | High -- no standardized capacity modeling tool |
| Demo-ability | Good -- interactive "what if" slider interface |
| Technical Feasibility | Moderate -- requires population modeling beyond simple analytics |
| Narrative Power | Moderate -- "what if we put a UPCC here?" |

---

### #23. Chronic Disease Home Action Plan

**Pillar:** Decentralized Care
**Persona:** Patient
**Pitch:** For patients managing chronic conditions at home, generates a simple, personalized action plan: what to monitor, what's normal, when to worry, and when to call.

**BC problem it addresses:**
60% of BC seniors have multimorbidity (2+ chronic conditions). The system wants these patients managed at home and in the community, not in the ER. TELUS Home Health Monitoring provides equipment and data collection, but not personalized guidance. A patient with diabetes knows to check blood sugar but doesn't know what number means "call your doctor today" vs "discuss at your next appointment." The gap between "data collection" and "patient understanding" is where preventable ER visits happen. (Source: Statistics Canada, BCCDC, TELUS RPM, Zen keynote)

**What it does:**
Given a patient's chronic conditions, medications, and recent observation trends, generates a personalized action plan: **What to monitor** (blood sugar, blood pressure, weight -- personalized to their conditions), **Your personal ranges** (based on their recent observations and clinical guidelines: "Your target BP is below 140/90"), **Yellow zone** (values that mean "contact your care team within 24 hours"), **Red zone** (values that mean "seek care immediately"). Updated as conditions and medications change. Simple language, large print option, available in multiple languages.

**What already exists (and why this is different):**
TELUS RPM collects data. Generic disease management brochures exist. No tool generates personalized thresholds and action plans based on the patient's specific medical profile and recent trends.

**Human story for the pitch:**
"Maria, 68, has diabetes and hypertension. She checks her blood sugar daily but doesn't know what 14 mmol/L means for HER. Her action plan says: 'Your target is 4-10 mmol/L. If above 14 for two days in a row, call your care team. If above 20 at any time, go to the ER.' She reads 14.5 today and 15.2 tomorrow. She calls her care team. They adjust her medication. She avoids a diabetic crisis."

**Why the system is ready for it:**
Decentralized care pillar. RPM infrastructure is deployed. Patient education is a recognized gap. This bridges the gap between monitoring and understanding.

**Synthea data used:**
Patient (age, demographics), Condition (chronic diseases), Medication (current treatment), Observation (recent values for baseline calculation), CarePlan (clinical targets)

**AI role:** Personalized threshold generation based on patient profile and clinical guidelines. Simple-language action plan generation. Multilingual support.

| Criterion | Score | Justification |
|---|---|---|
| Clinical Relevance | **26/30** | Directly supports home management of chronic disease. Target: patients with chronic conditions (25%+ of BC adults). Clear benefit: fewer preventable ER visits, better self-management. |
| Feasibility & Safety | **19/25** | AI-generated health thresholds and action guidance that patients act on. Meaningful safety risk: incorrect thresholds could cause patients to delay necessary care or seek unnecessary care. Requires clinician review and approval of personalized thresholds. "Not a substitute for medical advice" framing essential. |
| **Total** | **45/55** | |

| Tag | Rating |
|---|---|
| System Alignment | Strong -- decentralized care, RPM gap, chronic disease management |
| White Space | Moderate -- RPM exists, generic education exists, personalized plans do not |
| Demo-ability | Good -- patient profile → personalized action plan with color-coded zones |
| Technical Feasibility | Moderate -- needs clinical guideline logic for threshold generation |
| Narrative Power | Strong -- "what does 14.5 mean for ME?" |

---

## Summary Ranking

| Rank | Idea | Score | Pillar | Persona | Key Strength |
|---|---|---|---|---|---|
| 1 | Follow-Up Gap Detector | **52/55** | Operations | Patient + Clinician | Directly from Zen's keynote story. Universal applicability. Complete white space. |
| 2 | Unattached Patient Risk Stratifier | **52/55** | Access | Leader | 1M+ BCers without a doctor. No prioritization exists. Immediately actionable. |
| 3 | Remote Monitoring Triage Dashboard | **50/55** | Decentralized | Clinician | RPM is deployed, triage is the missing layer. Dual-pillar (workforce + decentralized). |
| 4 | Pre-Visit Encounter Brief | **50/55** | Workforce | Clinician | 9.1 hrs/week admin burden. Attacks preparation, not documentation. Every visit, every day. |
| 5 | Medication Reconciliation at Transitions | **50/55** | Workforce + Operations | Clinician | Top patient safety issue. Mandated process without automated tooling. |
| 6 | Surgical Pathway Optimizer | **50/55** | Operations | Leader | 28.6-week median wait. Decomposes wait times into actionable segments. |
| 7 | Smart Care Level Router | **48/55** | Access | Patient | "I don't know where to go." 15% of ED visits avoidable. Personalized navigation. |
| 8 | Patient Journey Status Tracker | **49/55** | Operations | Patient | Package tracking for healthcare. Complete white space. |
| 9 | UPCC Impact Dashboard | **49/55** | Access | Leader | Measures BC's #1 access investment. Leaders need evidence. |
| 10 | Patient Panel Complexity Dashboard | **49/55** | Workforce | Clinician | "More patients than I can manage" → reveals panel composition. |
| 11 | Discharge Medication Safety Check | **49/55** | Operations | Clinician | Targets #1 cause of preventable readmissions at the moment it happens. |
| 12 | Care Team Visibility Map | **48/55** | Decentralized | Clinician + Leader | Makes invisible fragmentation visible. Visually striking demo. |
| 13 | Team Handoff Brief | **48/55** | Workforce | Clinician | UPCCs create the handoff problem structurally. Solves it in 30 seconds. |
| 14 | ER Wait Transparency & Alternative Finder | **48/55** | Access | Patient | "Go to the pharmacist, not the ER." Immediate behavior change. |
| 15 | Care Continuity Score | **48/55** | Operations | Leader | Creates the metric PCNs need to prove they're working. |
| 16 | Clinic Demand Forecaster | **48/55** | Operations | Clinician + Leader | AI scheduling for primary care (exists for hospitals, not clinics). |
| 17 | Community Health Pulse | **48/55** | Decentralized | Leader | Proactive community surveillance. Prevents ER surge cascades. |
| 18 | Post-Discharge Recovery Companion | **46/55** | Decentralized | Patient | Bridges hospital-to-home gap. Higher safety risk limits score. |
| 19 | Patient-Generated Pre-Visit Summary | **47/55** | Workforce | Patient + Clinician | Dual benefit: patient heard, clinician prepared. Low risk. |
| 20 | Mental Health Access Navigator | **47/55** | Access | Patient | Services exist but are unfindable. Youth especially underserved. |
| 21 | Cost of Delay Calculator | **46/55** | Operations | Leader | Translates operational delays into financial language. |
| 22 | "What If" Capacity Modeler | **46/55** | Access + Operations | Leader | Interactive sandbox for resource allocation. |
| 23 | Chronic Disease Home Action Plan | **45/55** | Decentralized | Patient | Personalized thresholds. Higher safety risk limits score. |

---

## How to Use This Document

This document is designed for your **doctor panel review**. Ask them:

1. **Which problems resonate?** Do they experience these frictions daily? Which ones would they pay attention to?
2. **Which scores would they adjust?** Their clinical judgment may rate some ideas higher or lower than this scoring.
3. **Which ideas would they actually use?** Zen's adoption filter: "Would a real person actually use this?"
4. **What's missing?** Are there frictions they experience that none of these ideas address?
5. **Which ideas combine well?** Some of these could be features of the same product (e.g., Pre-Visit Brief + Team Handoff Brief = a comprehensive "visit preparation" tool).

The top ideas from this list should then be evaluated against the v1 ideas (Patient Story at a Glance, ER Diversion Intelligence, Readmission Risk Radar, etc.) to produce a final shortlist for the hackathon.
