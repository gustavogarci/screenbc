# Spec 5: ScreenWell BC — Patient Journey (Emotional Design + Full UX)

> **What this is:** A version centered on the *human experience*. Instead of optimizing for data or demo theatrics, this spec thinks about what it actually feels like to be a 54-year-old woman without a family doctor who just found out she might have pre-diabetes. Every screen is designed to reduce anxiety, build trust, and guide action. This is the "we actually care about patients" spec. Estimated build time: 9-11 hours.

> **When to pick this over other specs:** When you believe the judges will resonate with empathy and human-centered design. Healthcare hackathon judges are often clinicians — they know what patients go through. A prototype that feels like it was designed FOR patients, not AT patients, can be deeply persuasive.

---

## Design Philosophy: "Calm Health"

This spec borrows from the design language of:
- **Apple Health** — clean, generous white space, progressive disclosure
- **Headspace** — warm, reassuring, never alarming
- **BC Health Gateway** — official, trustworthy, accessible

The core principle: **Never alarm. Always guide.** A borderline result is not "a problem" — it's "something to keep an eye on." An abnormal result is not "bad" — it's "something that needs attention, and here's exactly what to do."

### Visual Language

| Element | Treatment |
|---|---|
| Normal results | Soft green background, checkmark icon, calm positive language |
| Borderline results | Warm amber background, info icon, encouraging but honest |
| Abnormal results | Soft red background, attention icon, clear action steps |
| Critical results | Prominent card with clear CTA, phone numbers, UPCC locations |

**Never use aggressive red or flashing indicators.** Use muted, warm tones from the BC Design System's support palette:
- Success: `#F6FFF8` background, `#42814A` border
- Warning: `#FEF1D8` background, `#F8BB47` border  
- Danger: `#F4E1E2` background, `#CE3E39` border
- Info: `#F7F9FC` background, `#053662` border

### Tone of Voice

Every piece of copy follows these rules:
1. **Grade 6 reading level.** No medical jargon without explanation.
2. **Second person.** "Your results" not "Patient results."
3. **Active voice.** "You can do X" not "X can be done."
4. **Reassuring first, honest second.** "Your kidney function is healthy. One result needs attention — here's what to do."
5. **Action-oriented.** Every page ends with a clear next step.
6. **Culturally sensitive.** Avoid assumptions about lifestyle, diet, or body.

---

## The Patient Journey (7 Steps)

### Step 1: Discovery — "I heard about this service"

**Page: Landing (`/`)**

The landing page tells THREE patient stories, not abstract statistics. Real (synthetic) people with real (synthetic) situations.

```
┌──────────────────────────────────────────────────────┐
│  [ScreenWell BC]                           [Sign In] │
│━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│                                                      │
│      Free preventive health screening                │
│      for British Columbians without                  │
│      a family doctor.                                │
│                                                      │
│      A simple blood test can catch diabetes,         │
│      high cholesterol, and kidney disease             │
│      before they become emergencies.                 │
│                                                      │
│      [Check if you're eligible →]                    │
│                                                      │
│  ─────────────────────────────────────────────────── │
│                                                      │
│  "I moved to Victoria 3 years ago and still         │
│   don't have a doctor. ScreenWell BC was the        │
│   first time anyone checked my blood sugar."        │
│                                             — M.J.  │
│                                                      │
│  ─────────────────────────────────────────────────── │
│                                                      │
│  HOW IT WORKS                                        │
│                                                      │
│  ① Check your eligibility (2 minutes)               │
│  ② Get a lab requisition                             │
│  ③ Visit any LifeLabs (10 minutes, free)            │
│  ④ Get your results explained clearly                │
│                                                      │
│  ─────────────────────────────────────────────────── │
│                                                      │
│  TRUSTED & SUPERVISED                                │
│                                                      │
│  ScreenWell BC is supervised by a licensed           │
│  BC physician and follows the same model as          │
│  BC Cancer Screening. Your information is            │
│  protected under BC privacy law.                     │
│                                                      │
│  [Learn More About the Program]                      │
└──────────────────────────────────────────────────────┘
```

**Key design choices:**
- No scary statistics on the landing page. Save the "1M without a doctor" for the pitch, not the patient.
- The testimonial is warm and relatable.
- "Check if you're eligible" is less intimidating than "Get Screened."
- Trust signals at the bottom: physician supervision, privacy law, BC Cancer comparison.

### Step 2: Eligibility Check — "Am I eligible?"

**Page: Eligibility (`/check`)**

Instead of "Login" or "Register," the entry point is a friendly eligibility checker. This reduces friction — the patient doesn't commit to "signing up for a health service" — they're just "checking if they're eligible."

```
┌──────────────────────────────────────────────────────┐
│  CHECK YOUR ELIGIBILITY                              │
│                                                      │
│  This takes about 2 minutes. We'll ask a few        │
│  questions to see if preventive screening is         │
│  recommended for you.                                │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  Step 1 of 4: About You                       │  │
│  │                                                │  │
│  │  What is your date of birth?                   │  │
│  │  [    /    /      ]                            │  │
│  │                                                │  │
│  │  What is your sex assigned at birth?           │  │
│  │  This is needed for screening guidelines.      │  │
│  │  ( ) Female  ( ) Male                          │  │
│  │                                                │  │
│  │  Do you currently have a family doctor or      │  │
│  │  nurse practitioner?                           │  │
│  │  ( ) No  ( ) Yes, but they don't do screening │  │
│  │  ( ) Yes → "Great! Ask your doctor about      │  │
│  │            screening at your next visit."       │  │
│  │                                                │  │
│  │                            [Next →]            │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ● ○ ○ ○  Progress dots                             │
└──────────────────────────────────────────────────────┘
```

**Step 2: Family History**
```
│  │  Step 2 of 4: Family History                  │  │
│  │                                                │  │
│  │  Has anyone in your immediate family           │  │
│  │  (parent, sibling) been diagnosed with:        │  │
│  │                                                │  │
│  │  [ ] Diabetes (type 1 or type 2)              │  │
│  │  [ ] Heart disease or stroke                   │  │
│  │  [ ] High cholesterol                          │  │
│  │  [ ] Kidney disease                            │  │
│  │  [ ] None of these                             │  │
│  │  [ ] I'm not sure                              │  │
│  │                                                │  │
│  │  "I'm not sure" is perfectly fine. We'll       │  │
│  │  recommend standard screening for your age.    │  │
```

**Step 3: Lifestyle**
```
│  │  Step 3 of 4: A Few More Questions            │  │
│  │                                                │  │
│  │  Do you smoke?                                 │  │
│  │  ( ) Never  ( ) I used to  ( ) Currently      │  │
│  │                                                │  │
│  │  Have you been told you have any of these?     │  │
│  │  [ ] High blood pressure                       │  │
│  │  [ ] Pre-diabetes or insulin resistance        │  │
│  │  [ ] Polycystic ovary syndrome (PCOS)         │  │
│  │  [ ] None of these                             │  │
```

**Step 4: Your Health Number**
```
│  │  Step 4 of 4: Your Health Number              │  │
│  │                                                │  │
│  │  To generate your lab requisition, we          │  │
│  │  need your Personal Health Number (PHN).       │  │
│  │                                                │  │
│  │  Your PHN is the 10-digit number on your      │  │
│  │  BC Services Card.                             │  │
│  │                                                │  │
│  │  PHN: [9___  ___  ___]                        │  │
│  │                                                │  │
│  │  Email: [____________________]                 │  │
│  │  We'll email you when your results are ready. │  │
│  │                                                │  │
│  │  🔒 Your information is encrypted and          │  │
│  │  protected under BC's Personal Information     │  │
│  │  Protection Act (PIPA).                        │  │
│  │                                                │  │
│  │                       [Check Eligibility →]    │  │
```

### Step 3: Result — "Am I eligible?"

**Page: Eligibility Result**

After submitting, an immediate result:

**If eligible:**
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  ✓ Screening is recommended for you.                │
│                                                      │
│  Based on your age (54) and health profile,          │
│  we recommend checking for:                          │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  🩸 Diabetes                                  │   │
│  │  A blood sugar test (HbA1c) checks for       │   │
│  │  diabetes and pre-diabetes.                   │   │
│  │  Recommended for: Adults 40 and older         │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  🫀 Cholesterol                               │   │
│  │  A lipid panel measures cholesterol and       │   │
│  │  triglycerides — key heart health markers.    │   │
│  │  Recommended for: Women 50+, Men 40+          │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  🫘 Kidney Function                           │   │
│  │  A creatinine test checks how well your       │   │
│  │  kidneys filter waste from your blood.        │   │
│  │  Recommended for: Adults 50 and older         │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  All three are checked with one blood draw.          │
│  It takes about 10 minutes at LifeLabs and is free. │
│                                                      │
│  [Get Your Lab Requisition →]                        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**If NOT eligible (too young, no risk factors):**
```
│  Based on your age (35) and health profile,          │
│  routine screening is not recommended right now.     │
│                                                      │
│  Canadian guidelines recommend starting at:          │
│  • Diabetes screening: age 40                        │
│  • Cholesterol screening: age 40 (men) / 50 (women) │
│  • Kidney screening: age 50                          │
│                                                      │
│  We'll let you know when you're eligible.            │
│  [Remind me when it's time →]                        │
│                                                      │
│  ⚠️ If you have concerns about your health,          │
│  please call 811 (HealthLink BC) for guidance.       │
```

### Step 4: Lab Requisition — "What do I do now?"

**Page: Requisition (`/requisition`)**

Same requisition as Spec 1, but with added patient-friendly elements:

```
┌──────────────────────────────────────────────────────┐
│  YOUR LAB REQUISITION                                │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  WHAT TO EXPECT AT LIFELABS                   │  │
│  │                                                │  │
│  │  1. Bring this form (print or show on phone)  │  │
│  │  2. You'll need to fast 10-12 hours before    │  │
│  │     (water is fine)                            │  │
│  │  3. A technician will draw a small blood      │  │
│  │     sample from your arm                       │  │
│  │  4. The whole visit takes about 10 minutes    │  │
│  │  5. Results usually take 2-5 business days    │  │
│  │                                                │  │
│  │  💡 Tip: Book a morning appointment so the    │  │
│  │  fasting is easier (skip breakfast, go first  │  │
│  │  thing).                                       │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  [Print Requisition]  [Save to Phone]                │
│                                                      │
│  NEAREST LIFELABS TO V8S 6G3:                        │
│                                                      │
│  📍 LifeLabs — 1230 Hillside Ave (1.2 km)          │
│     Mon-Fri 7am-4pm, Sat 8am-12pm                   │
│     📞 250-370-XXXX | [Book Online]                  │
│                                                      │
│  📍 LifeLabs — 3995 Quadra St (3.4 km)             │
│     Mon-Fri 7:30am-3:30pm                            │
│     📞 250-479-XXXX | [Book Online]                  │
│                                                      │
│  📍 LifeLabs — 2829 Peatt Rd, Langford (12 km)     │
│     Mon-Fri 7am-4pm, Sat 8am-12pm                   │
│     📞 250-478-XXXX | [Book Online]                  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Step 5: Waiting — "When will I hear back?"

**Page: Dashboard — Waiting State**

Most apps ignore the waiting state. But for a patient waiting for health results, this is an ANXIOUS time. Design for it.

```
┌──────────────────────────────────────────────────────┐
│  YOUR SCREENING STATUS                               │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │                                                │  │
│  │  ◉─────────●─────────○─────────○              │  │
│  │  Requisition  Lab Visit  Results   Summary     │  │
│  │  Generated    (You're     Coming   Ready       │  │
│  │  Mar 15       here)       Soon                 │  │
│  │                                                │  │
│  │  We're waiting for your lab results.           │  │
│  │  This usually takes 2-5 business days.         │  │
│  │                                                │  │
│  │  We'll email you at m***@gmail.com             │  │
│  │  as soon as your results are ready.            │  │
│  │                                                │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  WHILE YOU WAIT                                      │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  📖 What is diabetes screening?               │   │
│  │  Learn what HbA1c and fasting glucose          │   │
│  │  tests measure and why they matter.            │   │
│  │  [Read →]                                      │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  📖 Understanding cholesterol                  │   │
│  │  What LDL, HDL, and triglycerides mean         │   │
│  │  for your heart health.                        │   │
│  │  [Read →]                                      │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  📖 How your kidneys work                      │   │
│  │  What creatinine and eGFR tell us about        │   │
│  │  kidney function.                              │   │
│  │  [Read →]                                      │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

The "While You Wait" educational cards reduce anxiety by turning waiting into learning. They're also a great demo moment — shows you thought about the full journey.

### Step 6: Results — "What did they find?"

**Page: Results (`/results`)**

**THE KEY UX INSIGHT:** Don't just show numbers. Lead with the overall assessment, then let the patient dig into details IF they want to.

```
┌──────────────────────────────────────────────────────┐
│  YOUR RESULTS                                        │
│  March 20, 2026                                      │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │                                                │  │
│  │  Hi Margaret,                                  │  │
│  │                                                │  │
│  │  Your screening found one area that's          │  │
│  │  healthy, and two that need attention.          │  │
│  │  Here's what we found — and what you           │  │
│  │  can do about it.                              │  │
│  │                                                │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  🟢 KIDNEY FUNCTION — HEALTHY                  │  │  ← Lead with good news
│  │                                                │  │
│  │  Your kidneys are working well. Your eGFR      │  │
│  │  is 85 mL/min, which is in the healthy range.  │  │
│  │                                                │  │
│  │  No action needed. Rescreen in 3 years.        │  │
│  │                                    [Details ▸] │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  🟡 BLOOD SUGAR — KEEP AN EYE ON THIS         │  │  ← Warm, not scary
│  │                                                │  │
│  │  Your HbA1c is 6.3% — this is in the          │  │
│  │  "pre-diabetes" range. It doesn't mean you     │  │
│  │  have diabetes. It means your blood sugar is   │  │
│  │  a bit higher than ideal.                      │  │
│  │                                                │  │
│  │  The good news: lifestyle changes can          │  │
│  │  reduce your risk of developing diabetes       │  │
│  │  by 58%.                                       │  │
│  │                                                │  │
│  │  WHAT YOU CAN DO:                              │  │
│  │  • 150 min of moderate exercise per week       │  │
│  │  • Reduce refined carbs and added sugars       │  │
│  │  • Aim for 5-7% weight loss if overweight      │  │
│  │                                                │  │
│  │  Rescreen in 6 months.                         │  │
│  │                                    [Details ▸] │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  🔴 CHOLESTEROL — NEEDS ATTENTION              │  │  ← "Needs attention" not "abnormal"
│  │                                                │  │
│  │  Your LDL cholesterol is 4.2 mmol/L — this    │  │
│  │  is above the target for your age and risk     │  │
│  │  profile.                                      │  │
│  │                                                │  │
│  │  WHAT TO DO NEXT:                              │  │
│  │  We recommend booking an appointment at        │  │
│  │  your nearest walk-in clinic or UPCC to        │  │
│  │  discuss whether treatment is right for you.   │  │
│  │                                                │  │
│  │  📍 Victoria UPCC — 1900 Richmond Ave         │  │
│  │  📞 Call 811 for guidance                      │  │
│  │                                                │  │
│  │  Bring this summary with you ↓                 │  │
│  │                                    [Details ▸] │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ─────────────────────────────────────────────────── │
│                                                      │
│  [Download Full Summary (PDF)]                       │
│  [Ask a Question About Your Results →]               │
│                                                      │
│  ─────────────────────────────────────────────────── │
│  This is not a diagnosis. Please discuss your        │
│  results with a healthcare provider.                 │
└──────────────────────────────────────────────────────┘
```

**Key UX choices:**
1. **Lead with good news.** Green result first. Reduces initial anxiety.
2. **Group by condition, not by test.** The patient cares about "diabetes" not "HbA1c."
3. **Plain language headings.** "Keep an eye on this" not "Borderline."
4. **Embedded action items.** Don't make them navigate somewhere else to find out what to do.
5. **UPCC address + 811 number inline.** Remove all friction from the "get help" path.

### Step 7: Follow-Up — "What happens now?"

**Page: Next Steps (`/next-steps`)**

After reviewing results, a clear "what happens now" page:

```
┌──────────────────────────────────────────────────────┐
│  YOUR NEXT STEPS                                     │
│                                                      │
│  Based on your results, here's your plan:            │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  📅 IN THE NEXT 2 WEEKS                       │  │
│  │                                                │  │
│  │  [ ] Book an appointment at a UPCC or          │  │
│  │      walk-in clinic to discuss your            │  │
│  │      cholesterol results                       │  │
│  │      📍 Victoria UPCC: 250-370-8000           │  │
│  │                                                │  │
│  │  [ ] Bring your ScreenWell BC summary          │  │
│  │      (printed or on your phone)                │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  🏃 STARTING NOW                               │  │
│  │                                                │  │
│  │  [ ] Add 30 minutes of walking to your day    │  │
│  │  [ ] Reduce sugary drinks and refined carbs   │  │
│  │  [ ] Check out the Diabetes Canada meal       │  │
│  │      planning guide (link)                     │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  📆 IN 6 MONTHS                               │  │
│  │                                                │  │
│  │  We'll email you when it's time to rescreen   │  │
│  │  your blood sugar. Your cholesterol will be   │  │
│  │  managed by the clinic you visit.             │  │
│  │                                                │  │
│  │  Next screening: September 2026               │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ─────────────────────────────────────────────────── │
│  Questions? [Chat with our AI health companion →]    │
│  Health concerns? Call 811 (HealthLink BC) anytime.  │
└──────────────────────────────────────────────────────┘
```

---

## Emails Designed for Humans

### The Screening Notification Email

**Subject:** `A free health check is available for you`

Note the subject line: not "SCREENING DUE" or "ACTION REQUIRED." Soft, inviting, curiosity-provoking.

```
Hi Margaret,

A free preventive health check is now available
for you through ScreenWell BC.

It's a simple blood test that checks for:
• Diabetes
• Cholesterol
• Kidney health

These are things that often have no symptoms — 
but catching them early makes a big difference.

The test takes about 10 minutes at any LifeLabs,
and it's completely free.

  [Check your eligibility →]

Take care,
The ScreenWell BC Team

—
ScreenWell BC is supervised by a licensed 
BC physician and follows Canadian clinical 
guidelines. Learn more at screenwell-bc.ca
```

### The Results-Ready Email

**Subject:** `Your health check results are ready`

```
Hi Margaret,

Your ScreenWell BC results are ready.

Log in to see what was found, what it means
for you, and what to do next — all explained
in plain language.

  [View your results →]

If you have any questions, our AI health 
companion can help explain your results.

Take care,
The ScreenWell BC Team

—
This is not a medical diagnosis. For medical 
advice, call 811 (HealthLink BC) or visit 
your nearest walk-in clinic.
```

---

## Technical Implementation Notes

### Progressive Disclosure Pattern

The results page uses progressive disclosure — start with a high-level summary, let users drill into details. This is both good UX and less code (you don't need to render everything on first load).

```typescript
// components/results/condition-card.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ConditionCardProps {
  title: string;
  status: 'normal' | 'borderline' | 'abnormal';
  headline: string;
  summary: string;
  details: {
    tests: { name: string; value: string; unit: string; range: string; }[];
    actions: string[];
    rescreenDate: string;
  };
}

const statusConfig = {
  normal: {
    bg: 'bg-[#F6FFF8]',
    border: 'border-[#42814A]',
    badge: 'bg-[#42814A] text-white',
    label: 'Healthy',
  },
  borderline: {
    bg: 'bg-[#FEF1D8]',
    border: 'border-[#F8BB47]',
    badge: 'bg-[#F8BB47] text-[#2D2D2D]',
    label: 'Keep an Eye on This',
  },
  abnormal: {
    bg: 'bg-[#F4E1E2]',
    border: 'border-[#CE3E39]',
    badge: 'bg-[#CE3E39] text-white',
    label: 'Needs Attention',
  },
};

export function ConditionCard({ title, status, headline, summary, details }: ConditionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const config = statusConfig[status];

  return (
    <div className={`${config.bg} border-l-4 ${config.border} rounded-lg p-6`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-[#2D2D2D]">{title}</h3>
        <span className={`${config.badge} px-3 py-1 rounded-full text-sm font-medium`}>
          {config.label}
        </span>
      </div>
      <p className="text-[#2D2D2D] mb-2 font-medium">{headline}</p>
      <p className="text-[#474543]">{summary}</p>
      
      {details.actions.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold text-[#2D2D2D]">What You Can Do:</p>
          <ul className="list-disc list-inside text-[#474543] mt-1 space-y-1">
            {details.actions.map((action, i) => (
              <li key={i}>{action}</li>
            ))}
          </ul>
        </div>
      )}
      
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 text-[#255A90] flex items-center gap-1 text-sm"
      >
        {expanded ? 'Hide' : 'Show'} detailed results
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {expanded && (
        <div className="mt-4 bg-white/50 rounded p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[#474543]">
                <th className="text-left pb-2">Test</th>
                <th className="text-left pb-2">Your Result</th>
                <th className="text-left pb-2">Normal Range</th>
              </tr>
            </thead>
            <tbody>
              {details.tests.map(test => (
                <tr key={test.name} className="border-t border-[#D8D8D8]">
                  <td className="py-2">{test.name}</td>
                  <td className="py-2 font-medium">{test.value} {test.unit}</td>
                  <td className="py-2 text-[#474543]">{test.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

### Accessibility First

This spec prioritizes accessibility because:
1. It's a healthcare app — patients may have vision, cognitive, or motor impairments
2. BC government services must meet WCAG AA
3. Judges may specifically check for accessibility

**Requirements:**
- All text passes WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large)
- All interactive elements are keyboard-navigable
- Screen reader labels for all icons and status indicators
- No information conveyed by color alone — always include text labels
- Focus indicators on all interactive elements
- `aria-live` regions for dynamic content (result reveals, streaming text)

### The "Bring This Summary" CTA

One unique feature of this spec: the results page has a prominent "Print for Your Doctor Visit" button that generates a one-page summary specifically formatted for a clinician to read quickly:

```
┌──────────────────────────────────────────────────────┐
│  SCREENWELL BC — PATIENT SCREENING SUMMARY           │
│  For: Margaret Johnson | PHN: 9698 XXX XXX           │
│  Date: March 20, 2026 | Supervising: Dr. [Name]     │
│──────────────────────────────────────────────────────│
│                                                      │
│  SCREENING RESULTS:                                  │
│  HbA1c: 6.3% (PRE-DIABETES) | FG: 6.4 mmol/L      │
│  LDL: 4.2 mmol/L (ABOVE TARGET) | TC: 6.1 mmol/L  │
│  HDL: 1.4 mmol/L | TG: 1.8 mmol/L                  │
│  Creatinine/eGFR: 85 mL/min (NORMAL)               │
│  Framingham 10yr CVD Risk: 12% (INTERMEDIATE)       │
│                                                      │
│  RECOMMENDATIONS:                                    │
│  1. Lifestyle modification for pre-diabetes          │
│  2. Statin discussion (intermediate Framingham)      │
│  3. Rescreen HbA1c in 6 months                       │
│  4. Repeat lipid panel in 1 year                     │
│                                                      │
│  Generated by ScreenWell BC screening engine         │
│  Clinical guidelines: Diabetes Canada, CCS, KDIGO    │
└──────────────────────────────────────────────────────┘
```

This is formatted for a CLINICIAN — concise, uses medical terms, includes Framingham score. It's what the patient brings to the UPCC.

---

## Demo Script: The Empathy Demo

Instead of a technical demo, tell a story:

**"Meet Margaret."**

> "Margaret is 54. She moved to Victoria three years ago. She's been on the waitlist for a family doctor ever since. She feels healthy, but nobody has checked her blood work in years."

*Show landing page. Click "Check if you're eligible."*

> "Margaret heard about ScreenWell BC. She answers a few questions..."

*Walk through the 4-step eligibility check. Show the result: eligible.*

> "She's due for diabetes, cholesterol, and kidney screening. She gets a lab requisition and walks into any LifeLabs."

*Show the requisition page with the "what to expect" section.*

> "Five days later..."

*Show the email arriving: "Your results are ready."*

> "She logs in."

*Show the results page. Pause on each condition card.*

> "Her kidneys are healthy — that's good news. Her blood sugar is a bit high — pre-diabetes. The system explains what that means in plain language. And her cholesterol needs attention."

*Show the next steps page.*

> "She knows exactly what to do. Book an appointment at the UPCC. Start exercising more. Reduce sugar. Come back in 6 months."

> "Without ScreenWell BC, Margaret wouldn't have known any of this until she ended up in the ER. BC does this for cancer. It's time to do it for the conditions that fill our ERs every day."

---

## File Structure

```
screenwell-bc/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                      # Landing (with patient stories)
│   ├── check/                        # Eligibility checker
│   │   └── page.tsx                  # Multi-step form
│   ├── eligible/page.tsx             # Eligibility result
│   ├── dashboard/page.tsx            # Status tracking with progress bar
│   ├── requisition/page.tsx          # With "what to expect" section
│   ├── results/page.tsx              # Condition cards (progressive disclosure)
│   ├── next-steps/page.tsx           # Actionable checklist
│   ├── learn/                        # Educational content
│   │   ├── diabetes/page.tsx
│   │   ├── cholesterol/page.tsx
│   │   └── kidney/page.tsx
│   ├── chat/page.tsx                 # AI health companion
│   ├── demo/page.tsx
│   └── api/
│       ├── check-eligibility/route.ts
│       ├── create-screening/route.ts
│       ├── results/route.ts
│       ├── summary/generate/route.ts
│       ├── chat/route.ts
│       └── demo/
│           ├── age-change/route.ts
│           └── send-email/route.ts
├── components/
│   ├── ui/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── condition-card.tsx            # The core result component
│   ├── eligibility-form.tsx          # Multi-step form
│   ├── progress-tracker.tsx          # Step indicator
│   ├── requisition-doc.tsx
│   ├── next-steps-checklist.tsx
│   ├── clinician-summary.tsx         # Printable for doctor
│   └── educational-card.tsx          # "While you wait" cards
├── lib/
│   ├── screening.ts
│   ├── email.ts
│   ├── demo-data.ts
│   └── copy.ts                       # All patient-facing copy in one place
├── data/
│   ├── patients.json
│   └── result-sets.json
├── tailwind.config.ts
└── package.json
```

---

## Build Priority

| Priority | What | Time | Why |
|---|---|---|---|
| 1 | Setup + BC styling + header/footer | 30 min | Foundation |
| 2 | Eligibility checker (multi-step form) | 1.5 hr | Entry point for the journey |
| 3 | Results page (condition cards) | 2 hr | Emotional centerpiece |
| 4 | Requisition + "what to expect" | 1 hr | Completes the pre-lab journey |
| 5 | Dashboard with progress tracker | 1 hr | The waiting experience |
| 6 | Next steps page | 45 min | Completes the post-results journey |
| 7 | Landing page with stories | 1 hr | First impression |
| 8 | Email notifications | 45 min | The trigger moment |
| 9 | Demo controls | 30 min | Enables live demo |
| 10 | AI chat companion (if time) | 1 hr | Nice-to-have |

**Total: ~10 hours**

---

## Why This Approach Could Win

1. **Empathy sells.** Judges remember how the demo made them FEEL, not what tech stack you used.
2. **Clinician judges will notice the UX.** Doctors see patients struggle with health information every day. A prototype that genuinely helps patients understand their results is refreshing.
3. **The "bring this to your doctor" printout** bridges the gap between digital and clinical workflow.
4. **Progressive disclosure is sophisticated UX.** It shows you understand design principles, not just coding.
5. **The "While You Wait" educational content** shows you thought about the full journey, not just the happy path.
6. **Accessibility commitment** aligns with BC government standards and shows maturity.

## What This Spec Sacrifices

1. No population health analytics (that's Spec 4's strength)
2. Less "technical wow" — no animated charts, no interactive map
3. More pages to build (eligibility checker is 4 steps)
4. The demo is a story, which requires good narration — a bad speaker undermines this approach
5. Harder to quantify impact ("it feels better" is subjective)
