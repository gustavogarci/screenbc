# Spec 3: ScreenWell BC — Demo Optimized (Maximum Judge Impact)

> **What this is:** Every technical and design decision is optimized for a 3-minute live demo. This spec thinks about the demo FIRST and works backwards to what needs to be built. It's theatrical, it's punchy, and it's designed to make judges lean forward in their seats. Estimated build time: 7-9 hours.

> **When to pick this over Spec 1 or 2:** When you believe the demo presentation is worth more than technical depth. Hackathon wisdom: a mediocre product with a great demo beats a great product with a mediocre demo.

---

## The Core Insight

Judges watch 15-30 demos in a row. They're tired. They zone out. You need **moments** — visual, emotional beats that snap them to attention. This spec engineers those moments.

### The Five Beats

| Beat | Moment | What Makes It Hit |
|---|---|---|
| 1. The Problem | Map of BC lights up showing 1M+ unattached patients | Visual data, not words on a slide |
| 2. The Trigger | Real email arrives on a phone in the judge's line of sight | Live event happening in real-time |
| 3. The Requisition | One-click print-ready document appears | "This is real, not a mockup" |
| 4. The Results | Traffic lights flip from gray to green/yellow/red with animation | Visceral, instant comprehension |
| 5. The AI | Summary generates in real-time, streaming text | Shows the AI is real, not pre-written |

---

## Design Decisions (Demo-Driven)

### Use Dark Mode for Dashboard, Light Mode for Documents

Why: Dark mode dashboards look more impressive on projectors. The contrast between the dark dashboard and the white requisition/summary documents creates a visual "beat" when you switch between them.

- Landing page: Light mode (welcoming, trustworthy)
- Login: Light mode
- Dashboard: Dark mode with BC Blue (`#013366`) as the primary dark surface
- Requisition: Light mode (it's a medical document — white paper feel)
- Results: Dark mode (traffic lights pop against dark backgrounds)
- Summary: Light mode (printable document feel)

### Animated Transitions

- Results row: When results "arrive," animate them sliding in one by one with a 200ms stagger
- Traffic lights: Fade from gray → color as each result is classified
- Summary: Stream the text word-by-word (use AI SDK streaming)
- Email: Use a phone mockup embedded in the demo page that shows the email arriving

### Sound Design (Optional but Powerful)

A subtle notification sound when the email arrives. If your demo environment supports audio, this is a 10x moment. One soft "ding" when the screening notification comes in.

---

## The Demo Script (Detailed, Rehearsed)

### Pre-Demo Checklist
- [ ] App deployed to Vercel, loaded on presenter laptop
- [ ] Demo control panel open in a hidden tab (`/demo`)
- [ ] Real email inbox open in split-screen or on a phone
- [ ] Two browser tabs ready: Tab 1 = landing page, Tab 2 = demo panel
- [ ] Danielle Hoffman loaded, age 38 (pre-trigger)
- [ ] Margaret Johnson loaded, screening completed, results ready but not yet "revealed"

---

### SCENE 1: "The Problem" (0:00 - 0:30)

**What's on screen:** Landing page with an animated map of BC.

The landing page has a hero section with an interactive BC map visualization. Communities are dots, sized by population. Color = percentage without a family doctor (darker = more unattached). Hover shows community name and stats.

**Narrator speaks:**
> "There are one million British Columbians without a family doctor. [Gesture to map.] In Mission, 38% of people are unattached. In Sooke, 34%. When you don't have a doctor, nobody orders your blood work. Nobody screens you for the conditions that develop silently."

**On screen:** Three animated stat cards fade in below the map:
```
[1 in 3 diabetics don't know it]  [A blood test costs $8]  [An ER visit costs $15,000]
```

---

### SCENE 2: "The Trigger" (0:30 - 1:00)

**What's on screen:** The demo control panel (or a stylized "system view").

**Narrator speaks:**
> "ScreenWell BC monitors age milestones. When Danielle turns 40, the system knows she's due for screening."

**Action:** Click "Advance Age to 40" on the demo panel.

**On screen:** A notification animation plays: "📧 Screening notification sent to Danielle Hoffman"

**The money moment:** The real email arrives on a phone or in the email tab. Hold the phone up or switch to the email tab.

> "She gets this email. 'It's time for your free health screening.'"

**Action:** Click the link in the email. It opens the dashboard.

---

### SCENE 3: "The Requisition" (1:00 - 1:30)

**What's on screen:** Danielle's dashboard showing "Screening Recommended" card.

**Narrator speaks:**
> "The system tells her exactly what's needed and why."

**Action:** Click "Get Your Lab Requisition."

**On screen:** The requisition page loads — clean, medical, official-looking.

> "She gets a lab requisition — signed by a supervising physician, exactly like cancer screening works today. She takes this to any LifeLabs. No appointment. No referral. No doctor needed."

**Action:** Click "Print" to show the print dialog briefly (don't actually print).

---

### SCENE 4: "The Results" (1:30 - 2:20)

**What's on screen:** Switch to Margaret Johnson's account (pre-logged-in tab).

**Narrator speaks:**
> "When the lab results come back, this is where the magic happens."

**Action:** Click "View Results."

**On screen:** The results table appears, but all indicators are gray/loading. Then, one by one, each result's traffic light animates into color:

```
HbA1c          6.3%    ⬜ → 🟡 Borderline
Fasting Glucose 6.4    ⬜ → 🟡 Borderline  
Total Chol     6.1     ⬜ → 🟡 Borderline
LDL Chol       4.2     ⬜ → 🔴 High
HDL Chol       1.4     ⬜ → 🟢 Normal
Creatinine/eGFR 85     ⬜ → 🟢 Normal
```

**Narrator speaks:**
> "Each result is classified instantly. Green means healthy. Yellow means pay attention. Red means take action. No medical jargon — just clear, actionable information."

**Action:** Click on "HbA1c" to expand.

> "Margaret's HbA1c is 6.3% — that's pre-diabetes. The system explains what that means in plain language, what she can do about it, and when to get retested."

**Action:** Click "View Full Health Summary."

**On screen:** The AI summary streams in real-time — text appearing word by word.

> "An AI-generated health summary. Personalized. Evidence-based. Written at a Grade 6 reading level. She can print this and take it to any walk-in clinic or UPCC."

---

### SCENE 5: "The Pitch" (2:20 - 3:00)

**What's on screen:** Split view — results on left, the BC map on right (now showing communities that would benefit).

**Narrator speaks:**
> "BC already does this for cancer. The BC Cancer Screening Program sends letters, generates requisitions, and recalls patients for cervical, breast, colon, and lung screening — all without a family doctor. Their system is called CASCADE. It works.
>
> But no equivalent exists for the chronic conditions that actually fill our emergency rooms. Diabetes. Cholesterol. Kidney disease. These three conditions are completely algorithmic to screen for, algorithmic to interpret, and algorithmic to act on.
>
> We ran this against 2,000 synthetic patients: [X]% of adults over 50 had undetected abnormal results that a single blood test would have caught.
>
> One supervising physician. Existing LifeLabs infrastructure. AI that makes results understandable. This is ScreenWell BC."

---

## What to Build (Demo-Critical Items Only)

### Priority 1: The Visual Landing Page with BC Map

This is your opening shot. Build a simple SVG or canvas-based map of BC with dots for communities. Data from `bc_health_indicators.csv`.

```typescript
// components/bc-map.tsx
// Use a simplified BC SVG outline
// Plot communities as circles:
//   - Size = population (proportional)
//   - Color = pct_without_family_doctor (gradient: green → yellow → red)
//   - Hover tooltip: "Mission: 38.2% without a family doctor, 287 ER visits per 1,000"

// Data: Load from bc_health_indicators.csv at build time
// Libraries: D3.js or even just positioned SVG circles on a BC outline
```

If D3 is too complex, use a simple grid of community cards sorted by unattached percentage. Still visually impactful.

### Priority 2: The Email Flow (Must Work Live)

This is the "wow" moment. The email MUST arrive during the demo.

**Setup:**
- Use Resend with a verified domain or Resend's test domain
- Send to a REAL email address that you control
- Test this 10 times before the demo

**Timing concern:** Resend delivers in 1-3 seconds. But email clients may have inbox delays. Mitigations:
- Use Gmail web (fastest to show new emails)
- Have the inbox pre-loaded, just refresh
- If email is delayed, have a backup: show the email in the app's notification center

### Priority 3: The Animated Results Table

The staggered animation of results appearing one by one is the visual centerpiece.

```typescript
// components/results/animated-results.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AnimatedResults({ results }: { results: Result[] }) {
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    // Reveal one result every 400ms
    const interval = setInterval(() => {
      setRevealedCount(prev => {
        if (prev >= results.length) { clearInterval(interval); return prev; }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [results.length]);

  return (
    <div className="space-y-2">
      {results.map((result, i) => (
        <motion.div
          key={result.test}
          initial={{ opacity: 0, x: -20 }}
          animate={i < revealedCount ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.3 }}
        >
          <ResultRow result={result} revealed={i < revealedCount} />
        </motion.div>
      ))}
    </div>
  );
}
```

### Priority 4: The Streaming AI Summary

Use Vercel AI SDK's `streamText` + `useChat` or a custom streaming setup. The summary must visibly stream — not load all at once.

```typescript
// The summary page streams text using useCompletion or similar
// The visual of text appearing word-by-word is critical for the demo
// It proves the AI is real, not pre-written
```

### Priority 5: Everything Else

- Login (simple, pre-filled for demo)
- Dashboard (one state: results ready)
- Requisition (styled HTML)
- Demo control panel (age advance + trigger results)

---

## The "Phone as Prop" Technique

If you have a phone available during the demo:

1. Open your email inbox on the phone
2. Set the phone on the table, screen visible
3. When you trigger the screening notification, the phone lights up with the email
4. Judges SEE a real notification arrive on a real device

This is devastatingly effective. It breaks the fourth wall of "hackathon demo" and makes it feel real.

**Alternative:** Use a picture-in-picture email mockup in your app. A small iPhone frame in the corner of the dashboard that shows the email arriving. Less real, but still effective.

---

## The BC Map Component

This is the opening visual. Options from simplest to most impressive:

### Option A: Static Image + Overlay (30 min)
- Use a BC map SVG from the internet
- Overlay HTML-positioned community dots
- Click dots to show stats

### Option B: Interactive D3 Map (2 hrs)
- TopoJSON BC boundaries
- D3 projection for lat/long → screen coordinates
- Animated dots that pulse when you hover
- Color gradient for unattached percentage

### Option C: Simple Card Grid (15 min) — The Fallback
- Skip the map entirely
- Show a grid of community cards sorted by urgency
- Each card: community name, % unattached, ER visits
- Still tells the story, just less visual

**Recommendation:** Option A gives 80% of the impact with 20% of the effort. Use a pre-made BC SVG outline and position circles for the top 10 communities.

---

## Technical Shortcuts for Speed

### 1. Skip Auth Entirely
Pre-logged-in states for demo patients. Use URL parameters:
```
/dashboard?patient=PAT-000001  → Margaret (results ready)
/dashboard?patient=PAT-000008  → Danielle (pre-trigger)
```

### 2. Pre-Generate the AI Summary
Generate Margaret's summary once during dev and save it as HTML. During the demo, "stream" it with a client-side typewriter effect. This avoids LLM latency issues during a live demo.

```typescript
// lib/pre-generated-summaries.ts
export const MARGARET_SUMMARY = `
  <h2>Your ScreenWell BC Results — March 28, 2026</h2>
  <p>Hi Margaret. Here's what your screening found:</p>
  <h3>🟡 Diabetes Screening: Borderline (Pre-diabetes)</h3>
  <p>Your HbA1c is 6.3%, which falls in the pre-diabetes range...</p>
  ...
`;

// In the component, use a typewriter effect to reveal the pre-generated text
// This guarantees consistent quality and avoids LLM hallucination during demo
```

### 3. Hardcode Demo Data
No database reads. Everything is in TypeScript constants:

```typescript
export const DEMO_PATIENTS = { ... };
export const DEMO_RESULTS = { ... };
export const DEMO_SUMMARY = { ... };
```

### 4. Pre-Warm the Email
Send a test email 5 minutes before the demo to "warm" the Resend connection and verify delivery. During the demo, the email will arrive faster because the connection is already established.

---

## Design Notes for Maximum Impact

### The Header
```
┌──────────────────────────────────────────────────────┐
│  🏥 ScreenWell BC              [About] [Login]       │
│▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬│  ← 3px gold line
```

Gold accent line (`#FCBA19`) beneath the dark blue header is the signature BC government visual element. Instantly signals "official BC service."

### Traffic Light Badges
Use filled circles, not just text colors:
```
🟢 Normal      → Green circle badge (#42814A) with white text
🟡 Borderline  → Amber circle badge (#F8BB47) with dark text
🔴 High        → Red circle badge (#CE3E39) with white text
⚫ Pending     → Gray circle badge (#9F9D9C) with white text
```

### Typography Scale
- Page titles: 32px, 600 weight
- Section headings: 24px, 600 weight
- Body: 16px, 400 weight
- Labels: 14px, 400 weight, secondary color
- Stats on landing page: 48px, 700 weight (the big numbers grab attention)

---

## File Structure

```
screenwell-bc/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  # Landing page with BC map
│   ├── login/page.tsx            # Simple login (can skip for demo)
│   ├── dashboard/page.tsx        # Dashboard with ?patient= param
│   ├── requisition/page.tsx
│   ├── results/page.tsx          # Animated results reveal
│   ├── summary/page.tsx          # Streaming (or fake-streaming) summary
│   ├── demo/page.tsx             # Demo control panel
│   └── api/
│       ├── demo/
│       │   ├── age-change/route.ts
│       │   ├── trigger-results/route.ts
│       │   └── send-email/route.ts
│       └── summary/generate/route.ts
├── components/
│   ├── ui/                       # shadcn/ui
│   ├── bc-map.tsx                # BC community map visualization
│   ├── animated-results.tsx      # Staggered result reveal
│   ├── typewriter-text.tsx       # Streaming text effect
│   ├── header.tsx
│   ├── result-row.tsx
│   ├── status-badge.tsx
│   ├── phone-mockup.tsx          # Optional: phone frame showing email
│   └── stat-card.tsx             # Big number + label
├── lib/
│   ├── demo-data.ts              # All hardcoded demo data
│   ├── screening.ts              # Eligibility + interpretation logic
│   ├── email.ts                  # Resend functions
│   └── bc-communities.ts         # Map data from bc_health_indicators.csv
├── data/
│   └── bc_health_indicators.csv  # For the map
├── public/
│   ├── bc-outline.svg            # BC map outline
│   └── bc-logo.svg
├── tailwind.config.ts
└── package.json
```

---

## Build Priority

| Priority | What | Time | Why It Matters for Demo |
|---|---|---|---|
| 1 | Project setup + BC styling + header | 30 min | Foundation for everything |
| 2 | Landing page + BC map or stat cards | 1.5 hr | Opening visual impact |
| 3 | Results page with animated reveal | 1.5 hr | The centerpiece visual |
| 4 | Email integration (Resend) | 1 hr | The "real" moment |
| 5 | Demo control panel (age advance) | 45 min | Enables the trigger flow |
| 6 | Dashboard + requisition page | 1 hr | Completes the flow |
| 7 | AI summary (streaming or typewriter) | 1 hr | Shows AI is real |
| 8 | Polish: animations, transitions, copy | 1 hr | Makes it feel finished |

**Total: ~8 hours**

---

## Backup Plans (Things That Go Wrong During Demos)

| Risk | Mitigation |
|---|---|
| Email doesn't arrive in time | Have a pre-arrived email in the inbox. "As you can see, the email arrived." |
| AI generates bad summary | Pre-generate and cache. Stream from cache, not live LLM. |
| Network dies | Deploy to Vercel, but also have a local dev server ready. |
| App crashes | Pre-record a video of the demo flow. "Let me show you the recording." |
| Run over time | Practice the 3-minute version AND a 2-minute emergency version. |

---

## What This Spec Does Better Than Spec 1

1. **Opens with a visual, not words.** The BC map is instantly compelling.
2. **Creates a live event.** The email arrival is a moment, not a screenshot.
3. **Uses animation to control attention.** Staggered result reveals guide the judges' eyes.
4. **Pre-generates critical content.** No risk of LLM failure during demo.
5. **Has backup plans.** Because demos always break.

## What This Spec Sacrifices

1. No patient registration flow (pre-seeded demo patients)
2. No real database (all hardcoded)
3. No chat companion
4. Less impressive if judges ask "can you show me another patient?"
5. Harder to extend after the hackathon
