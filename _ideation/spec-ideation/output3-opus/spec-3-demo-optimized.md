# Spec 3: ScreeningBC — Demo-Optimized (Maximum Wow Factor)

> **Approach:** Every design decision is optimized for the 3-minute demo. Pre-seeded patient stories, dramatic reveals, real-time streaming AI, time-travel simulation, live email delivery. This is the "win the hackathon" spec — prioritizes demo impact over production realism.

---

## Core Philosophy

Hackathon judges watch 10-20 demos in a row. They remember:
1. The moment that made them feel something (the "aha")
2. The thing that looked the most polished
3. The team that showed real data and real numbers

This spec is built around creating **three memorable moments** in 3 minutes.

---

## The Three Moments

### Moment 1: "The Screening Gap" (0:00-0:45)
A live population analysis runs on the hackathon data. Real numbers appear on screen. The audience sees how many people are falling through the cracks.

### Moment 2: "The Email Arrives" (0:45-1:45)
During the demo, you trigger a real email to a real phone. The audience watches it arrive in real-time. The patient clicks through the entire screening journey.

### Moment 3: "The AI Reads Your Results" (1:45-2:45)
Streaming AI interpretation of lab results appears word by word on screen. The audience watches the system translate medical jargon into plain language in real-time. Then the chat answers a follow-up question live.

---

## Pre-Seeded Demo Patients

Create three pre-built patient personas that each tell a different story. The developer should hard-code these as "featured patients" with carefully crafted data.

### Patient A: Margaret Chen, 54, Female
**Story:** Pre-diabetes + high cholesterol. The "catch it early" case.
- HbA1c: 6.3% (borderline)
- Fasting Glucose: 6.4 mmol/L (borderline)
- LDL: 4.2 mmol/L (high)
- Total Cholesterol: 6.1 mmol/L (borderline)
- eGFR: 85 mL/min (normal)
- Framingham Risk Score: 12% (intermediate)
- No diabetes diagnosis in encounters. No statins in medications.
- Lives in a community where 33% don't have a doctor.

**Demo use:** Primary walkthrough patient. Shows the full journey.

### Patient B: Robert Williams, 62, Male
**Story:** Undetected CKD stage 3. The "silent killer" case.
- HbA1c: 5.4% (normal)
- Creatinine: elevated → eGFR: 48 mL/min (moderate CKD)
- LDL: 3.1 mmol/L (normal)
- Has hypertension in encounters but no CKD diagnosis
- No nephrologist referral, no kidney-protective medications

**Demo use:** Dramatic escalation case. "This patient has stage 3 kidney disease and doesn't know it. Without screening, the next stop is dialysis at $90,000 a year."

### Patient C: Sarah Park, 42, Female
**Story:** Familial hypercholesterolemia catch. The "saved a life" case.
- LDL: 5.8 mmol/L (very high — FH territory)
- Total Cholesterol: 7.4 mmol/L (very high)
- No cardiac history. Age 42. No statin therapy.
- Family history of heart disease (father died at 52)

**Demo use:** Flash on screen during the population analysis. "This 42-year-old has an LDL of 5.8 — strongly suggestive of familial hypercholesterolemia. Without screening, she could have a heart attack in the next decade. A single blood test catches it."

---

## Architecture

Same foundation as Spec 1, but with these demo-specific additions:

### Real-Time Simulation Engine
A WebSocket or polling-based system that lets the admin panel trigger events that update the patient-facing portal in real-time:

```
Admin Panel                          Patient Portal
─────────────                        ──────────────
[Trigger Invitation] ──────────────→ Email arrives on demo phone
                                     Patient opens portal
                                     
[Simulate Lab Results] ────────────→ Results appear on dashboard
                                     AI summary starts streaming
                                     
[Trigger Results Email] ───────────→ Email arrives on demo phone
```

### Demo Mode Toggle
A URL parameter `?demo=true` or a cookie that enables:
- Faster animations
- Pre-loaded patient data (no login required — just show Margaret's dashboard)
- "Time Travel" controls visible in a small floating panel
- Auto-advancing tutorial arrows showing where to click next

### Split-Screen Demo Layout
For the actual presentation, consider a split-screen layout:
- Left side: Patient portal (what Margaret sees)
- Right side: Program dashboard (what the health system sees)
- Both update simultaneously when events are triggered

This is technically just two browser windows side by side, but if time permits, build a `/demo` route that shows both in a split view.

---

## Screens (Prioritized for Demo Impact)

### 1. Population Analysis Dashboard (`/dashboard`)
**THE OPENING SHOT.** This is what's on screen when the demo starts.

Visual layout:
```
┌─────────────────────────────────────────────────────┐
│  ScreeningBC — Chronic Disease Screening Program     │
│  Population Analysis                                 │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │   2,000   │  │    842   │  │    427   │          │
│  │  patients │  │ eligible │  │  NO      │          │
│  │  in       │  │ for      │  │ existing │          │
│  │  registry │  │ screening│  │ diagnosis│          │
│  └──────────┘  └──────────┘  └──────────┘          │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  SCREENING GAP ANALYSIS                        │  │
│  │                                                │  │
│  │  Of 427 undiagnosed eligible patients:         │  │
│  │                                                │  │
│  │  🔴 Pre-diabetes detected    │  148 (34.7%)   │  │
│  │  🔴 High cholesterol         │  187 (43.8%)   │  │
│  │  🔴 Impaired kidney function │   52 (12.2%)   │  │
│  │                                                │  │
│  │  Total with ≥1 abnormal result: 243 (56.9%)   │  │
│  │                                                │  │
│  │  💰 Estimated annual cost if undetected:       │  │
│  │     $3.6M in preventable complications         │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  BC COMMUNITIES WITH HIGHEST SCREENING GAP     │  │
│  │                                                │  │
│  │  Mission        38.2% unattached   Est. gap: X │  │
│  │  Sooke          33.7% unattached   Est. gap: X │  │
│  │  East Kootenay  31.7% unattached   Est. gap: X │  │
│  │  Prince George  29.0% unattached   Est. gap: X │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  [Run Population Screening ▶]                        │
└─────────────────────────────────────────────────────┘
```

**IMPORTANT:** These numbers must be REAL, calculated from the hackathon data. The developer should run the analysis on the CSVs and hard-code the actual results. If the numbers don't look dramatic enough, adjust the patient selection criteria (e.g., look at patients 40+ instead of 50+, or include anyone with at least one risk factor).

### 2. Patient Portal — Margaret's Journey (`/patient/[id]`)

After the dashboard opening, the presenter says: "Let's follow one of these patients."

**Tabbed interface:**
- **Overview**: Margaret's profile, age, risk factors, "Last screened: Never"
- **Screening**: What she's eligible for, with clear reasons
- **Requisition**: The printable lab req
- **Results**: (initially empty — "Awaiting lab results")
- **Health Summary**: (initially empty — "Complete screening to view")

### 3. Live Email Demo

When the presenter clicks "Send Invitation" on the admin panel:
- A real email fires to a real email address (presenter's phone)
- The phone buzzes on stage (or on the demo table)
- The email is opened on screen
- It contains a deep link to Margaret's screening page

**Technical implementation:**
- Use Resend's free tier (100 emails/day)
- Pre-verify the email domain before the demo
- Have a backup: screenshot of the email in case deliverability fails
- The link in the email should go to `/invitation/[token]` which auto-logs in as Margaret

### 4. Streaming AI Results Interpretation (`/patient/[id]/results`)

When the presenter triggers "Results received" from the admin panel:

1. The results table populates with traffic-light colors (animated fade-in, row by row)
2. Below the table, a "Understanding Your Results" section appears
3. The AI-generated summary streams in word by word using Vercel AI SDK's streaming
4. The audience watches the AI write: "Hi Margaret. Here's what your screening found..."
5. Each condition section streams sequentially — diabetes first, then cholesterol, then kidney

**This is the money shot.** The streaming effect is visually impressive and demonstrates real AI integration. The audience watches the system "think" and produce personalized medical advice in real-time.

### 5. Chat Companion (Quick Demo)

After the summary streams in, the presenter opens a chat and types (or has pre-typed): "Is pre-diabetes serious? Should I be worried?"

The AI responds with:
- Empathetic tone
- Specific to Margaret's values
- Actionable lifestyle advice
- "Talk to a healthcare provider" safety net

One question, one answer. Don't linger — move to the closing.

---

## Admin Panel (`/admin`)

The admin panel is the backstage controller for the demo. It should be simple and reliable.

```
┌─────────────────────────────────────────────────────┐
│  DEMO CONTROL PANEL                                  │
├─────────────────────────────────────────────────────┤
│                                                      │
│  Patient: [Margaret Chen ▼]                          │
│                                                      │
│  ┌──────────────────────────┐                        │
│  │ 1. Send Screening Email  │  Status: ✅ Sent       │
│  └──────────────────────────┘                        │
│                                                      │
│  ┌──────────────────────────┐                        │
│  │ 2. Inject Lab Results    │  Scenario:             │
│  │    [Pre-diabetes + High  │  [Pre-diabetes + HC ▼] │
│  │     Cholesterol     ▼]   │                        │
│  └──────────────────────────┘                        │
│                                                      │
│  ┌──────────────────────────┐                        │
│  │ 3. Send Results Email    │  Status: ⏳ Ready      │
│  └──────────────────────────┘                        │
│                                                      │
│  ┌──────────────────────────┐                        │
│  │ 4. Reset Demo            │                        │
│  └──────────────────────────┘                        │
│                                                      │
│  Pre-built scenarios:                                │
│  • Pre-diabetes + High Cholesterol (Margaret)        │
│  • Undetected CKD Stage 3 (Robert)                   │
│  • Familial Hypercholesterolemia (Sarah)             │
└─────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 16 (App Router) | SSR + streaming + API routes |
| UI | shadcn/ui + Tailwind CSS | BC gov look, fast to build |
| Database | JSON files / in-memory (simplest possible) | Zero setup, fastest to build |
| AI | Vercel AI SDK v6 + AI Gateway | Streaming chat + summary |
| Email | Resend (free tier: 100 emails/day) | Real emails for demo |
| State | React state + URL params | No auth complexity |
| Deploy | Vercel | Free, fast |

**Key simplification vs Spec 1:** No database. Store everything in JSON files or in-memory. The hackathon data is read from CSVs at startup. Patient state (registered, screened, results) is stored in a simple JSON structure. This eliminates all database setup time.

---

## Build Order (Strictly Prioritized)

### Phase 1: The Numbers (Hour 1-2)
**Goal: Get the population analysis numbers right.**

1. Write a script that loads all CSVs and produces the screening gap analysis
2. Calculate: how many patients 40+ have no diabetes diagnosis but have abnormal HbA1c/glucose values
3. Calculate: how many patients have no lipid-related diagnosis but have high cholesterol
4. Calculate: how many patients have no CKD diagnosis but have concerning creatinine values
5. Cross-reference medications: exclude patients already on metformin, statins, ACE inhibitors
6. Produce the exact numbers that will appear on the dashboard
7. If the numbers aren't dramatic enough, adjust the criteria (this is synthetic data — the numbers might be surprising in a good way, or they might not tell a clear story)

### Phase 2: The Dashboard (Hour 2-3)
**Goal: The opening shot is ready.**

8. Set up Next.js + shadcn/ui + BC gov colors
9. Build the population analysis dashboard with the real numbers
10. Build the community breakdown using bc_health_indicators.csv
11. Make it look polished — this is the first thing judges see

### Phase 3: The Patient Journey (Hour 3-5)
**Goal: Margaret's full story is walkable.**

12. Build the patient profile page with pre-seeded Margaret data
13. Build the screening eligibility display
14. Build the lab requisition (printable)
15. Build the results dashboard with traffic-light cards
16. Build the admin panel with trigger buttons
17. Wire up result injection (admin clicks → results appear on patient page)

### Phase 4: The AI Magic (Hour 5-6)
**Goal: Streaming AI interpretation works.**

18. Set up AI SDK with AI Gateway
19. Build the streaming health summary endpoint
20. Build the results page with streaming summary section
21. Write the system prompt (include Margaret's specific data, clinical guidelines, empathetic tone)
22. Build the chat companion (one page, simple)

### Phase 5: The Email (Hour 6-7)
**Goal: Real email sends and arrives during demo.**

23. Set up Resend account + verify domain
24. Build the email templates (screening invitation + results ready)
25. Wire admin panel buttons to email sending
26. Test end-to-end: click button → email arrives → link works

### Phase 6: Polish (Hour 7-8)
**Goal: Everything looks professional and the demo is rehearsed.**

27. Animations: fade-in for results rows, smooth transitions between sections
28. Loading states: skeleton loaders while AI streams
29. Error states: graceful fallbacks
30. Mobile-friendly (judges may check on phones)
31. Deploy to Vercel
32. Full demo rehearsal with timing
33. Prepare backup materials (screenshots of emails, pre-recorded AI generation)

---

## Demo Script (Detailed, Timed)

### 0:00-0:15 — Open on the Dashboard
*Screen shows the population analysis dashboard*

"Over a million British Columbians don't have a family doctor. Without a doctor, nobody orders your blood work. We analyzed 2,000 patients from our synthetic dataset. [Point to numbers] 842 are eligible for chronic disease screening. 427 have no existing diagnosis. And of those 427 — here's the number that matters — [point] 57% have at least one abnormal lab result that nobody caught."

### 0:15-0:30 — Set the Stakes
"That's 243 people walking around with undetected pre-diabetes, high cholesterol, or impaired kidneys. The cost of catching this early? About $50 in blood work. The cost of missing it? [$3.6 million in point to number] in preventable complications. Dialysis alone is $90,000 per patient per year."

### 0:30-0:50 — Introduce Margaret
"Let me show you how we close this gap. Meet Margaret Chen. She's 54, lives in Sooke where a third of residents don't have a family doctor. She has never been screened for chronic disease."

*Click into Margaret's profile*

"The system sees her age, sex, and the family history she reported — father with diabetes, mother with heart disease. It determines she's due for screening and generates a lab requisition."

### 0:50-1:10 — The Email
"When screening is due, Margaret gets this:"

*Click "Send Invitation" on admin panel. Show the email arriving on the demo phone.*

"A real email, just like BC Cancer sends screening letters. It tells her what tests, why, and where to go. She takes the requisition to LifeLabs."

### 1:10-1:20 — Transition
"Two days later, her blood work comes back."

*Click "Inject Results" on admin panel*

### 1:20-2:00 — Results + Streaming AI
*Results table appears with traffic-light colors*

"Green is normal. Yellow is borderline. Red needs attention. Margaret's blood sugar is borderline — she's pre-diabetic. Her LDL cholesterol is above target. Her kidneys are healthy."

*Scroll down — AI summary starts streaming*

"And this is where the system goes beyond a raw lab report. Watch — it's generating a personalized explanation for Margaret right now."

*Let the audience watch 15-20 seconds of streaming text*

"It explains what pre-diabetes means for her specifically. It calculates her Framingham cardiovascular risk — 12%, intermediate. It gives her evidence-based recommendations and tells her exactly what to do next."

### 2:00-2:20 — Chat (Quick)
"And if Margaret has questions—"

*Open chat, type "What should I eat for pre-diabetes?"*

*AI responds with dietary guidance*

"She can ask in plain language and get evidence-based answers. Always with the safety net: talk to a healthcare provider for clinical decisions."

### 2:20-2:45 — The Bigger Picture
*Switch back to the dashboard*

"This isn't just Margaret's story. Of the communities in our data, the ones with the highest percentage of unattached patients also have the highest rates of chronic disease and ER visits. [Point to table] Mission. Sooke. Prince George. These are the communities where screening would save the most lives and the most money."

### 2:45-3:00 — The Close
"BC already does this for cancer. The BC Cancer Screening Program has been sending letters and generating requisitions for years — no family doctor needed. We built the same model for diabetes, cholesterol, and kidney disease. The infrastructure already exists: LifeLabs, UPCCs, MSP. We're not asking anyone to build something new. We're filling the gap that costs the system the most when it's missed."

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Email doesn't arrive during demo | Have email pre-opened on phone as backup. Show the email template on screen. |
| AI streaming is slow | Pre-generate the summary and use a fake streaming effect (reveal pre-generated text character by character). 90% of the visual impact, zero API risk. |
| Numbers from data aren't dramatic | Re-run analysis with looser criteria. Worst case, use clearly labeled "projected estimates based on BC population data" alongside the synthetic data analysis. |
| Chat says something wrong | Pre-test 5-10 likely questions. Use a very narrow system prompt. Have a pre-tested question ready as the demo question. |
| Vercel deploy fails | Run locally with `next dev` as backup. All data is local. |
| Demo runs long | Cut the chat section (least important). The dashboard → email → results → AI summary arc is the core. |

---

## What Makes This Spec Different

Compared to Spec 1:
- **No database setup.** JSON files. Zero config.
- **Pre-seeded patients.** No user registration flow to demo. Jump straight into the story.
- **Demo-first design.** Every screen is designed for how it looks during the 3-minute walkthrough, not for production usability.
- **Three memorable moments** instead of feature completeness.
- **Real email delivery** as a wow factor.
- **Streaming AI** as the technical showcase.

Compared to Spec 2:
- **More AI.** The streaming summary and chat are front and center.
- **More emotional.** The patient stories are crafted for impact.
- **Less institutional.** This is a demo, not a government proposal. The BC gov styling is there for credibility, but the energy is startup-meets-healthcare.
