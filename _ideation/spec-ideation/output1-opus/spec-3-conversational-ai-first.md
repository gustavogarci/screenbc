# Spec 3: The Conversational AI-First Approach

**Approach:** The entire patient experience is a conversation with an AI health screening companion. No forms, no dashboard, no tables — just a chat. The AI walks the patient through eligibility, collects their info conversationally, explains what screening they need, generates the requisition inline, and later interprets their results through the same conversation. Think of it as 811 reimagined as an AI.

**Why this approach:** This is the most "wow" approach for judges. A single chat interface that does everything is visually simple but technically impressive. It also mirrors the actual patient experience — people don't want to fill out forms, they want to talk to someone who understands. And for patients without a family doctor, this IS the substitute for "asking your doctor."

**Read `00-research-and-context.md` first for design tokens, data paths, and clinical logic.**

---

## Product Name

**ScreenBC** — Your Personal Health Screening Companion

---

## Core Concept

One page. One chat interface. The AI guides the patient through the entire screening journey:

1. "Hi, I'm your ScreenBC health companion. Let's check if you're due for preventive screening. Can you share your Personal Health Number?"
2. Patient provides PHN → AI looks them up → "I found your record. You're Margaret, 54, from Sooke. Is that right?"
3. AI asks about risk factors conversationally → "Does anyone in your family have diabetes or heart disease?"
4. AI determines eligibility → "Based on your age and profile, you're due for screening for diabetes, cholesterol, and kidney function."
5. AI explains the tests → "Here's what each test checks for and why it matters..."
6. AI generates requisition → "I've prepared your lab requisition. You can print it and take it to any LifeLabs." (Renders inline card with print button)
7. [Time passes — patient gets blood work done]
8. Patient returns to chat → "My lab results are back."
9. AI interprets results → "Let me walk you through what we found..." (streams interpretation with inline colored cards for each result)
10. Patient asks follow-up questions → conversation continues naturally

---

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                  FRONTEND (Next.js)                    │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Landing Page (/)                     │  │
│  │  Hero + "Start Your Screening" button             │  │
│  └──────────────────┬───────────────────────────────┘  │
│                     │                                  │
│  ┌──────────────────▼───────────────────────────────┐  │
│  │              Chat Page (/chat)                     │  │
│  │                                                    │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │  AI Message: "Hi! Let's check if you're    │  │  │
│  │  │  due for screening..."                      │  │  │
│  │  ├─────────────────────────────────────────────┤  │  │
│  │  │  User Message: "My PHN is 2074 916 154"    │  │  │
│  │  ├─────────────────────────────────────────────┤  │  │
│  │  │  AI Message: "I found your record..."       │  │  │
│  │  │  ┌───────────────────────────────────────┐  │  │  │
│  │  │  │ [INLINE CARD: Patient Profile]        │  │  │  │
│  │  │  └───────────────────────────────────────┘  │  │  │
│  │  ├─────────────────────────────────────────────┤  │  │
│  │  │  AI Message: "You're due for screening..."  │  │  │
│  │  │  ┌───────────────────────────────────────┐  │  │  │
│  │  │  │ [INLINE CARD: Lab Requisition + Print]│  │  │  │
│  │  │  └───────────────────────────────────────┘  │  │  │
│  │  ├─────────────────────────────────────────────┤  │  │
│  │  │  AI Message: "Your results are in..."       │  │  │
│  │  │  ┌───────────────────────────────────────┐  │  │  │
│  │  │  │ [INLINE CARD: Results Traffic Light]  │  │  │  │
│  │  │  └───────────────────────────────────────┘  │  │  │
│  │  │  "Let me explain what this means..."        │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │  [Message Input + Send Button]              │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Impact Page (/impact) — same as Spec 2   │  │
│  └──────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) | API routes + streaming |
| Styling | Tailwind CSS + shadcn/ui | Fast, professional |
| AI | Vercel AI SDK with tool calling | The AI needs to call tools (lookup patient, check eligibility, generate requisition, interpret results) |
| Chat UI | AI Elements or custom chat bubbles | Rich message rendering with inline cards |
| Charts | Recharts | Impact page only |
| Data | Static JSON | Pre-curated patients |

---

## The AI Agent (Tool-Calling Architecture)

This is the key technical differentiator. The AI isn't just generating text — it's an agent that calls tools to look up patients, check eligibility, and interpret results.

### Tools Available to the AI

```typescript
const tools = {
  lookupPatient: {
    description: "Look up a patient by their Personal Health Number (PHN)",
    parameters: {
      phn: { type: "string", description: "Patient's PHN, e.g. '2074 916 154'" }
    },
    // Returns: patient profile from data/demo-patients.json
  },
  
  checkEligibility: {
    description: "Check what screening tests are due for a patient",
    parameters: {
      patientId: { type: "string" }
    },
    // Returns: { dueTests: [...], reason: "..." }
  },
  
  generateRequisition: {
    description: "Generate a lab requisition for the patient's due tests",
    parameters: {
      patientId: { type: "string" },
      tests: { type: "array", items: { type: "string" } }
    },
    // Returns: requisition data (rendered as inline card by frontend)
  },
  
  loadLabResults: {
    description: "Load and interpret the patient's lab results",
    parameters: {
      patientId: { type: "string" }
    },
    // Returns: interpreted results with traffic-light classification
  },
  
  calculateFramingham: {
    description: "Calculate 10-year cardiovascular risk score",
    parameters: {
      patientId: { type: "string" }
    },
    // Returns: { riskPercent: number, category: "low"|"intermediate"|"high" }
  },
  
  findNearbycare: {
    description: "Find nearby LifeLabs locations or UPCCs",
    parameters: {
      postalCode: { type: "string" },
      type: { type: "string", enum: ["lifelabs", "upcc"] }
    },
    // Returns: array of nearby locations
  }
};
```

### System Prompt

```
You are the ScreenBC health screening companion, an AI assistant for a 
preventive health screening program in British Columbia, Canada. You help 
British Columbians — especially those without a family doctor — get screened 
for diabetes, high cholesterol, and chronic kidney disease.

Your personality: Warm, clear, patient. Like a knowledgeable nurse who has 
all the time in the world. You explain medical concepts simply without 
being condescending.

Your workflow:
1. GREETING: Introduce yourself and explain what ScreenBC does.
2. IDENTIFICATION: Ask for their PHN. Use the lookupPatient tool to find them.
   If not found, collect their info conversationally (name, DOB, sex, postal code).
3. RISK ASSESSMENT: Ask about family history and lifestyle factors conversationally.
   Don't make it feel like a form. "Does anyone in your family have diabetes 
   or heart disease?" "Do you smoke?"
4. ELIGIBILITY: Use checkEligibility to determine what tests are due. Explain 
   each test in plain language — what it checks for and why it matters.
5. REQUISITION: Use generateRequisition to create their lab form. Tell them 
   to print it and take it to LifeLabs. Use findNearbycare to show locations.
6. WAITING: If the patient says they've done the blood work, use loadLabResults.
7. INTERPRETATION: Walk through each result conversationally. Use plain language.
   Use calculateFramingham if cholesterol results need risk assessment.
   Be reassuring for normal results. Be clear but not alarming for abnormals.
8. FOLLOW-UP: For abnormal results, use findNearbycare to show UPCCs.
   For borderline results, explain what they can do (lifestyle changes).
   Always provide a clear "rescreen in X months/years" recommendation.

Rules:
- NEVER diagnose. Say "your results suggest" not "you have."
- NEVER prescribe medications. Say "discuss with a healthcare provider."
- If the patient describes acute symptoms, direct them to 811 or ER immediately.
- Always include a safety net: "For personalized medical advice, speak with 
  a healthcare provider or call 811."
- Keep messages concise. Don't dump walls of text. 2-3 paragraphs max per message.
- When showing results, call the loadLabResults tool which renders the 
  traffic-light card inline.
```

---

## Inline Cards (Rich Chat Messages)

The chat doesn't just show text — it renders rich cards for key moments. These are React components that render inside the chat stream.

### Patient Profile Card
```
┌─────────────────────────────────────────────┐
│ ✓ Patient Found                              │
│                                              │
│ Margaret Johnson                             │
│ Age 54 · Female · V8N 7P5                   │
│ PHN: 2074 916 154                            │
│                                              │
│ No family doctor on record                   │
│ No previous screening on file                │
└─────────────────────────────────────────────┘
```

### Lab Requisition Card
```
┌─────────────────────────────────────────────┐
│ 📋 Lab Requisition — ScreenBC               │
│                                              │
│ Patient: Margaret Johnson (PHN: 2074...)     │
│ Ordering: Dr. [Name], ScreenBC Program       │
│                                              │
│ Tests:                                       │
│ ☑ HbA1c         ☑ Fasting Glucose           │
│ ☑ Lipid Panel   ☑ Creatinine/eGFR           │
│                                              │
│ Fast for 10-12 hours before your test.       │
│                                              │
│ [🖨 Print Requisition]  [📍 Find LifeLabs]  │
└─────────────────────────────────────────────┘
```

### Results Card
```
┌─────────────────────────────────────────────┐
│ Your Screening Results                       │
│                                              │
│ 🟡 HbA1c          6.3%     Borderline       │
│ 🟡 Fasting Glucose 6.4     Borderline       │
│ 🔴 Total Chol.    6.1     High              │
│ 🟡 LDL Chol.      4.2     Borderline High   │
│ 🟢 Creatinine     85      Normal             │
│                                              │
│ Let me explain what each of these means...   │
└─────────────────────────────────────────────┘
```

---

## Pages

### Page 1: Landing (`/`)

Simple hero page:
- "ScreenBC — Preventive Health Screening for British Columbians"
- "No family doctor? No problem."
- 3 quick bullets: what we screen, how it works, no cost
- CTA: "Start Your Screening →" → navigates to `/chat`

### Page 2: Chat (`/chat`)

The main experience. Full-screen chat interface:
- Chat messages area (scrollable)
- Message input at bottom
- Quick-reply chips for common responses (e.g., "Yes" / "No" / "I've done my blood work")
- Inline cards render within the message stream

### Page 3: Impact (`/impact`)

Same as Spec 2's impact dashboard. Population-level data. Used at the end of the pitch.

---

## Demo Script (3 Minutes)

### 0:00 — The Hook (15 seconds)

Show landing page briefly.

> "A million BCers don't have a family doctor. Nobody screens them. We built ScreenBC — an AI health companion that walks patients through preventive screening, no doctor required."

Click "Start Your Screening."

### 0:15 — The Conversation (90 seconds)

The AI greets the user. The presenter types or clicks through a pre-scripted conversation:

**AI:** "Hi! I'm your ScreenBC health companion. I can help you find out if you're due for preventive screening for diabetes, cholesterol, and kidney function. Can you share your Personal Health Number?"

**Patient:** "2074 916 154"

**AI:** [looks up patient] [shows profile card] "I found your record. You're Margaret Johnson, 54, from Victoria. Is that right?"

**Patient:** "Yes"

**AI:** "Great. A couple of quick questions — does anyone in your family have diabetes or heart disease?"

**Patient:** "My father had diabetes"

**AI:** "Thank you. Based on your age, sex, and family history, you're due for screening. Let me explain what we'll check..." [brief explanation] "I've prepared your lab requisition." [shows requisition card]

> Presenter: "Margaret prints the requisition, goes to LifeLabs, gets blood work done. A few days later, she comes back."

**Patient:** "My results are back"

**AI:** [loads results] [shows results card] "Let me walk you through your results. Your HbA1c came back at 6.3%. This is in the pre-diabetes range..." [streams explanation]

### 1:45 — The Follow-Up (30 seconds)

**Patient:** "Is this serious? What should I eat?"

**AI:** [responds with lifestyle recommendations, reassurance, and clear next steps]

> Presenter: "She can ask anything. The AI stays within evidence-based guidelines and always points to a healthcare provider for clinical decisions."

### 2:15 — The Impact (30 seconds)

Navigate to `/impact`.

> "Now zoom out." [Same closing as Spec 2 — show population data, correlation chart, the punchline stat]

### 2:45 — The Close (15 seconds)

> "One conversation. No forms, no portals, no waiting. BC did this for cancer. This is ScreenBC."

---

## File Structure

```
screenbc/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # Landing
│   ├── chat/
│   │   └── page.tsx              # Chat interface
│   ├── impact/
│   │   └── page.tsx              # Population impact
│   └── api/
│       └── chat/route.ts         # AI agent with tool calling
├── components/
│   ├── ui/                       # shadcn components
│   ├── header.tsx
│   ├── chat/
│   │   ├── chat-interface.tsx    # Main chat UI
│   │   ├── message-bubble.tsx    # Individual messages
│   │   ├── patient-card.tsx      # Inline profile card
│   │   ├── requisition-card.tsx  # Inline requisition card
│   │   ├── results-card.tsx      # Inline results card
│   │   └── quick-replies.tsx     # Suggested response chips
│   └── impact/
│       └── charts.tsx
├── lib/
│   ├── screening-logic.ts
│   ├── tools.ts                  # Tool definitions for the AI agent
│   └── patients.ts
├── data/
│   ├── demo-patients.json
│   └── bc-communities.json
├── tailwind.config.ts
└── .env.local
```

---

## Estimated Build Time

| Task | Hours |
|---|---|
| Data preparation | 1 |
| Scaffolding + BC Gov styling | 1 |
| Landing page | 0.5 |
| Chat UI (messages, input, scrolling) | 2 |
| Inline cards (patient, requisition, results) | 2 |
| AI agent with tool calling (backend) | 2.5 |
| Screening logic (thresholds, eGFR, Framingham) | 1 |
| Impact dashboard | 1.5 |
| Polish + demo rehearsal | 1.5 |
| **Total** | **~13 hours** |

---

## Key Risks & Mitigations

| Risk | Mitigation |
|---|---|
| AI goes off-script during demo | Pre-test the exact conversation flow 10 times. Keep demo inputs simple and predictable. Have a pre-recorded video backup. |
| Tool calling is slow/unreliable | Pre-cache tool results for demo patients. The tool "calls" can just return pre-loaded JSON. |
| Chat UI takes too long to build | Use a pre-built chat UI component (shadcn chat, or Vercel AI Elements). Don't build from scratch. |
| Conversation feels unnatural | Write and rehearse the demo conversation verbatim. Use quick-reply chips to control the flow. |

---

## Why This Spec Might Win

1. **"AI" is in the hackathon name.** A conversational AI agent is the most AI-forward approach. Judges came to see AI — give it to them.
2. **One interface does everything.** The simplicity is the selling point. No pages to navigate, no forms to fill out.
3. **It mirrors what patients actually want.** They want to talk to someone. Not fill out a form.
4. **Tool-calling is technically impressive.** If judges look under the hood, they'll see a proper AI agent with tools — not just a ChatGPT wrapper.
5. **The demo is naturally engaging.** A conversation is inherently more interesting to watch than clicking through pages.
