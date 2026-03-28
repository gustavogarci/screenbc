# Spec 4: The Split-Screen Dual View

**Approach:** The demo shows two perspectives simultaneously — patient on the left, supervising physician on the right. When the patient goes through screening, the physician dashboard updates in real time. This makes the "one doctor covering thousands of patients" concept visceral and immediate. It also lets you show the doctor's value prop (which is what gets real-world adoption) alongside the patient's experience.

**Why this approach:** Your partner is a real doctor who will be at the hackathon. The dual view lets you say "this is the patient's experience, and THIS is what the doctor sees." Having a real physician validate the tool live is an unfair advantage — lean into it. Also: split-screen demos are visually distinctive. When every other team shows a single app, you show a system with two sides.

**Read `00-research-and-context.md` first for design tokens, data paths, and clinical logic.**

---

## Product Name

**ScreenBC** — Preventive Health Screening for British Columbians

---

## Core Concept

The app has two modes accessed at two different URLs:

- **Patient Portal** (`/patient`) — What Margaret sees
- **Physician Console** (`/physician`) — What Dr. [Partner] sees

During the demo, these are shown side by side (split screen on a laptop, or two browser windows). When the patient takes an action, the physician dashboard updates in real time (via polling or WebSocket).

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SPLIT-SCREEN DEMO                      │
│                                                           │
│  ┌──────────────────────┐  ┌───────────────────────────┐ │
│  │   PATIENT PORTAL      │  │   PHYSICIAN CONSOLE       │ │
│  │                        │  │                           │ │
│  │ 1. Eligibility check   │  │ "847 patients enrolled"   │ │
│  │    → PHN lookup        │  │                           │ │
│  │                        │  │ [New patient registered!]  │ │
│  │ 2. Lab requisition     │  │ +1 to enrolled count      │ │
│  │    → print & go        │  │                           │ │
│  │                        │  │ [Lab results received!]    │ │
│  │ 3. Results + summary   │  │ Auto-interprets. Flags    │ │
│  │    → AI interpretation │  │ patient as "needs review"  │ │
│  │                        │  │                           │ │
│  │ 4. Follow-up questions │  │ Shows the interpreted     │ │
│  │    → AI chat           │  │ results + recommendation  │ │
│  │                        │  │ Doctor clicks "Reviewed"   │ │
│  └──────────────────────┘  └───────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## The Key Demo Moment

When the patient's lab results come in and show an abnormal result, the physician console gets a real-time notification:

**Patient side:** Results table with traffic lights. AI summary streaming.

**Physician side:** 🔔 Alert card pops up:

```
┌──────────────────────────────────────────┐
│ ⚠️ NEW FLAG: Margaret Johnson, 54        │
│                                          │
│ HbA1c: 6.3% (pre-diabetes)              │
│ LDL: 4.2 mmol/L (borderline high)       │
│ Framingham Risk: 12% (intermediate)      │
│                                          │
│ AI Recommendation: Lifestyle counseling  │
│ + rescreen 6 months. Consider referral   │
│ for lipid management discussion.         │
│                                          │
│ [Review Patient] [Approve & Continue]    │
└──────────────────────────────────────────┘
```

The doctor clicks "Approve & Continue" — this represents the minimal physician oversight that makes the system legally viable. One click. Not a 15-minute appointment. Scale.

---

## Pages

### Patient Side

#### `/patient` — Landing + Login

Same as Spec 2's landing page. PHN + DOB form. On submit, creates the patient record (which triggers a notification on the physician side).

#### `/patient/portal` — Portal

Simplified portal:
- Patient profile
- Screening status (due/pending/results ready)
- Link to requisition
- Link to results
- AI chat companion (inline at the bottom of the portal, collapsible)

#### `/patient/requisition` — Lab Requisition

Same as other specs. Clean, printable.

#### `/patient/results` — Results + AI Summary

Same as Spec 2. Traffic-light table + streaming AI summary.

### Physician Side

#### `/physician` — Dashboard

**Top Row: Live Stats Cards**
- Patients Enrolled (counter, updates in real time during demo)
- Screened This Month
- Pending Review (flagged abnormals)
- Cleared This Month (normal results, auto-closed)

**Middle: Activity Feed (real-time)**

A feed of events that updates live:
```
🔵 10:42 AM — Margaret Johnson (54, F) enrolled in screening program
🔵 10:43 AM — Lab requisition generated for Margaret Johnson
🟡 10:45 AM — Lab results received for Margaret Johnson
🔴 10:45 AM — FLAGGED: Margaret Johnson — HbA1c 6.3% (pre-diabetes), LDL 4.2 (borderline high)
🟢 10:46 AM — Dr. [Name] reviewed and approved recommendations for Margaret Johnson
```

**Bottom: Flagged Patients Table**

| Patient | Age | Flags | Risk Level | Status | Actions |
|---|---|---|---|---|---|
| Margaret Johnson | 54 | Pre-diabetes, High LDL | Intermediate | ⚠️ New | [Review] |
| John Park | 62 | eGFR 52 (CKD Stage 3a) | High | 🔴 Urgent | [Review] |
| Lisa Barnes | 48 | LDL 5.3 (FH?) | High | ⚠️ New | [Review] |

Clicking "Review" opens a slide-over panel with the patient's full profile, results, AI-generated summary, and two buttons: "Approve Recommendations" / "Override & Add Notes."

**Side Panel: Population View**

Small panel or tab showing aggregate data from `bc_health_indicators.csv`:
- Top 10 communities by `pct_without_family_doctor`
- "Patients caught by screening" count

---

## Real-Time Updates (Implementation)

For a hackathon, don't build real WebSockets. Use **polling** or **server-sent events (SSE):**

### Option A: Simple Polling (Easiest)

Physician dashboard polls `/api/events` every 2 seconds. Events are stored in a simple in-memory array on the server.

```typescript
// In-memory event store
let events: Event[] = [];

// When patient registers, add event
events.push({ type: 'enrolled', patient: '...', timestamp: Date.now() });

// When labs arrive, add event  
events.push({ type: 'results', patient: '...', flagged: true, timestamp: Date.now() });

// Physician dashboard polls
// GET /api/events?since=<timestamp>
```

### Option B: Server-Sent Events (Better UX)

Use Next.js API route that returns an SSE stream. The physician dashboard listens and updates the feed in real time. More impressive during demo.

---

## Demo Script (3 Minutes)

### Setup

Two browser windows side by side. Left: patient portal. Right: physician dashboard.

### 0:00 — The Frame (20 seconds)

> "Over a million BCers don't have a family doctor. Nobody screens them. We built ScreenBC — a centralized screening service modeled after BC Cancer Screening. Let me show you both sides: on the left, the patient's experience. On the right, what the supervising physician sees."

Show both windows.

### 0:20 — Patient Enrolls (30 seconds)

Left side: Enter Margaret's PHN. System finds her.

> "Margaret is 54, lives in Sooke. No family doctor. She enters her health number..."

Right side: The activity feed updates — "New patient enrolled." The counter ticks up.

> "Instantly, the supervising physician sees a new patient has entered the program."

### 0:50 — Requisition (20 seconds)

Left side: Show the requisition briefly.

> "Margaret gets her lab requisition. She takes it to LifeLabs. A few days later..."

### 1:10 — Results Arrive (60 seconds)

Press the demo admin button to simulate lab results arriving.

Left side: Results dashboard appears with traffic-light table. AI summary starts streaming.

> "Her results come back. The system interprets them automatically. Pre-diabetes. High cholesterol. Normal kidneys."

Right side: Simultaneously, the activity feed shows "Results received" → "FLAGGED" alert. An alert card appears.

> "And on the physician's side — an immediate flag. The AI has already triaged it: pre-diabetes with intermediate cardiovascular risk. The doctor doesn't need to look at the raw numbers or read the chart. One click to approve the recommendations."

Partner (real doctor) clicks "Approve" live.

> "That's it. One click. Not a 15-minute appointment. One physician can oversee thousands of patients this way."

### 2:10 — Patient Follow-Up (20 seconds)

Left side: Show a quick AI chat interaction. "What should I eat?"

> "Margaret can ask follow-up questions. The AI stays within guidelines and always points to 811 or a UPCC for clinical concerns."

### 2:30 — The Impact (30 seconds)

Switch physician dashboard to the population tab or navigate to `/impact`.

> "Zoom out. [Same closing pitch — population data, correlation, punchline stat]. BC did this for cancer. This is ScreenBC."

---

## Tech Stack

Same as Spec 1 with one addition:

| Layer | Choice | Why |
|---|---|---|
| Real-time | SSE (Server-Sent Events) or polling | Physician dashboard live updates |
| Everything else | Same as Spec 1/2 | |

---

## File Structure

```
screenbc/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # Redirect or landing
│   ├── patient/
│   │   ├── page.tsx              # Patient landing + login
│   │   ├── portal/page.tsx       # Patient portal
│   │   ├── requisition/page.tsx  # Lab requisition
│   │   └── results/page.tsx      # Results + AI summary + chat
│   ├── physician/
│   │   └── page.tsx              # Physician dashboard
│   ├── impact/
│   │   └── page.tsx              # Population impact
│   └── api/
│       ├── patient/lookup/route.ts
│       ├── screening/
│       │   ├── check/route.ts
│       │   └── interpret/route.ts
│       ├── chat/route.ts
│       ├── events/
│       │   ├── route.ts          # SSE stream for physician
│       │   └── push/route.ts     # Push new events (called by other routes)
│       └── admin/
│           └── simulate/route.ts # Demo controls
├── components/
│   ├── ui/
│   ├── patient/                  # Patient-side components
│   │   ├── result-card.tsx
│   │   ├── summary-stream.tsx
│   │   └── chat-inline.tsx
│   ├── physician/                # Physician-side components
│   │   ├── stats-cards.tsx
│   │   ├── activity-feed.tsx
│   │   ├── flagged-table.tsx
│   │   └── review-panel.tsx
│   └── shared/
│       ├── header.tsx
│       └── footer.tsx
├── lib/
│   ├── screening-logic.ts
│   ├── patients.ts
│   ├── events.ts                 # In-memory event store
│   └── email.ts                  # Optional
├── data/
│   ├── demo-patients.json
│   └── bc-communities.json
└── .env.local
```

---

## Estimated Build Time

| Task | Hours |
|---|---|
| Data preparation | 1 |
| Scaffolding + BC Gov styling | 1 |
| Patient side (landing, portal, requisition, results) | 3 |
| AI summary streaming + chat | 2 |
| Physician dashboard (stats, feed, flagged table, review panel) | 3 |
| Real-time events (SSE or polling) | 1 |
| Impact page | 1 |
| Demo admin controls | 0.5 |
| Polish + rehearsal | 1.5 |
| **Total** | **~14 hours** |

This is the most ambitious spec. It requires the most build time but has the most demo impact.

---

## Why This Spec Might Win

1. **Two perspectives = complete story.** Judges see both the patient value AND the physician value. Most healthcare hackathon projects only show one side.
2. **Real-time updates are viscerally impressive.** When the physician dashboard updates the instant lab results arrive on the patient side, judges go "oh, this is a real system."
3. **Having a real doctor click "Approve" during the demo is unforgettable.** It proves the human-in-the-loop model works.
4. **It answers the "but who's responsible?" question.** The physician console shows there's oversight. This neutralizes the biggest objection to AI in healthcare.
5. **The activity feed tells the story of scale.** Pre-populate it with 20+ events from "other patients" so it looks like a living system.

---

## Key Risks

| Risk | Mitigation |
|---|---|
| Building two UIs in hackathon time | Physician dashboard can be simpler — mostly cards and a table. Patient side reuses Spec 2. |
| Real-time sync breaks during demo | Pre-test extensively. Have a backup: manually refresh the physician page. |
| Split screen is hard to see on projector | Use a large font, high contrast. Test at the venue. |
| Too much to show in 3 minutes | Rehearse ruthlessly. Cut anything that doesn't land in 5 seconds. |
