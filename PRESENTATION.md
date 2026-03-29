# ScreenBC — 5-Minute Hackathon Presentation

## STRUCTURE (5:00 total)

| Section | Time | Duration |
|---------|------|----------|
| The Problem (Slide 1) | 0:00–0:45 | 45 sec |
| Demo: Margaret's Journey | 0:45–3:15 | 2 min 30 sec |
| Demo: The Other Two | 3:15–4:00 | 45 sec |
| Feasibility (Slide 3) + What's Next (Slide 4) | 4:00–4:45 | 45 sec |
| Buffer | 4:45–5:00 | 15 sec |

---

## SLIDES

### Slide 1 — The Problem (show during 0:00–0:45)

**On the slide:**
- Headline: **700,000 British Columbians have no family doctor.**
- Subline: **No one is ordering their blood work.**
- Bottom stat: **8-dollar blood test vs. 15,000-dollar ER visit.**

**Speaker notes:**
"700,000 British Columbians don't have a family doctor. That means no one is ordering their blood work. No one is checking their blood sugar. No one is catching their cholesterol before it becomes a heart attack. A single HbA1c test costs 8 dollars. An undiagnosed diabetic who ends up in the ER with a foot ulcer costs the system 15,000 dollars. Multiply that by tens of thousands of people who simply don't know they're sick. 1 in 3 Canadians has diabetes or pre-diabetes — most don't know it. BC already solved this for cancer. BC Cancer Screening sends you a letter when you're due for a mammogram. Nobody waits for their family doctor to order that. But for diabetes and high cholesterol — the two conditions that quietly fill our hospitals — nothing like that exists. Until now. We built ScreenBC."

### Slide 2 — How It Works (flash during demo ~15 sec, or skip)

**On the slide:**
- Headline: **ScreenBC**
- Four words in a horizontal flow: **Identify → Notify → Test → Interpret**

**Speaker notes:**
"The provincial registry identifies patients overdue for screening. They get an email saying they're due. They print a lab requisition and walk into any LifeLabs — no referral needed. When results come back, AI interprets them using Canadian clinical guidelines from Diabetes Canada and the Canadian Cardiovascular Society. Green, yellow, or red — with personalized plain-language guidance and next steps."

### Slide 3 — Why This Is Feasible (show during 4:00–4:20)

**On the slide:**
- Headline: **Why this works today**
- BC Cancer Screening already does this exact model — for cancer
- Diabetes and cholesterol screening never produce emergency results — safe for AI
- Addresses the root cause — people aren't sick because they lack treatment, they're sick because no one is screening them

**Speaker notes:**
"We started with diabetes and cholesterol for a reason. No screening result from these tests is ever an emergency. An HbA1c of 7 means you're diabetic, but you're not going to the ER today. That means AI interpretation is safe — no physician on call needed. The model already exists. BC Cancer Screening sends you a letter when you're due for a mammogram. They don't wait for your family doctor. We're doing the same thing for the chronic conditions that actually fill our hospitals. And this addresses the root cause — these people aren't ending up in the ER because they can't be treated. They end up there because nobody screened them in the first place."

### Slide 4 — What's Next (show during 4:20–4:45)

**On the slide:**
- Headline: **What's next**
- **Phase 2:** Add kidney disease screening — requires a physician-on-call loop for critical results
- **Health Connect Registry:** Offer screening when patients join the family doctor waitlist
- Bottom: **Same platform. One more test. One more tier.**

**Speaker notes:**
"Phase 2 adds kidney disease — that's where you CAN get a critical result that means go to the ER today, so you add a physician-on-call notification loop. Same platform, one more test on the requisition, one more tier in the logic. And when someone registers for the family doctor waitlist through Health Connect, they get offered screening automatically — catch them while they're waiting. BC does this for cancer. ScreenBC does it for everything else."

---

## 0:00–0:45 — THE PROBLEM (Slide 1)

> Seven hundred thousand British Columbians don't have a family doctor.
>
> That means no one is ordering their blood work. No one is checking
> their blood sugar. No one is catching their cholesterol before it
> becomes a heart attack.
>
> Here's the thing — a single HbA1c test costs eight dollars. An
> undiagnosed diabetic who ends up in the ER with a foot ulcer costs
> the system fifteen thousand. Multiply that by tens of thousands of
> people who simply don't know they're sick.
>
> BC already solved this for cancer. BC Cancer Screening sends you a
> letter when you're due for a mammogram or a colonoscopy. Nobody waits
> for their family doctor to order that.
>
> But for diabetes and high cholesterol — the two conditions that
> quietly fill our hospitals — nothing like that exists. Until now.
>
> We built ScreenBC.

**Key stats to weave in if judges ask:**
- ~700,000 BCers without a family doctor (BC Gov data, 2025)
- Diabetes Canada: 1 in 3 Canadians has diabetes or pre-diabetes
- Pre-diabetes is reversible with lifestyle changes — 58% risk reduction (Diabetes Prevention Program study)
- HbA1c test: ~8 dollars. ER visit for diabetic emergency: 15,000+ dollars
- BC Cancer Screening already does population-level outreach — this is the same model for chronic disease

---

## 0:45–3:15 — DEMO: MARGARET'S FULL JOURNEY

### Setup (before you start presenting)
- `/admin` tab open, all patients reset
- Gmail open in another tab (with the screening due email visible for Margaret)
- Browser ready at Gmail

### The Email (0:45–1:00)

*Switch to Gmail. Show the "screening due" email for Margaret.*

> Margaret is 55, lives in Victoria, no family doctor. She gets this
> email: "You may be overdue for preventive health screening." She
> didn't ask for this — the system found her, just like BC Cancer
> Screening finds you when you're due for a mammogram.

*Click the link in the email (or navigate to /login).*

### Login + Consent (1:00–1:30)

*Login page appears — looks like BC Services Card.*

> She logs in the same way she'd access Health Gateway — with her BC
> Services Card. For the demo, I'll use the credential fallback.

*Type `margaret.johnson` / `demo1234`. Hit enter. Consent page appears.*

> First time in, she sees the program terms. This is important — we're
> transparent that results are AI-interpreted using Canadian clinical
> guidelines, not reviewed by a physician. She accepts.

*Click "I Accept and Continue."*

### Portal + Requisition (1:30–2:00)

*Portal loads.*

> She sees her profile and a lab requisition ready to print. The system
> already knows what tests she needs — HbA1c for diabetes, lipid panel
> for cholesterol — based on her age and screening history.

*Click to view requisition. Show it briefly — point out the tests, LifeLabs locations near her postal code.*

> She prints this and walks into any LifeLabs in BC. No referral needed.

*Click "Print Requisition" (or just gesture at it). Then go back to portal.*

### Results Arrive (2:00–2:15)

> A few days later, her results come back.

*Switch to the `/admin` tab. Click "Simulate Lab Results" for Margaret. Then switch back to Margaret's portal — or navigate to her results.*

*If you're showing the email flow: switch to Gmail, show the "results ready" email, click the link.*

### Results Page — THE MONEY SHOT (2:15–3:15)

*Results page loads. Give it a moment to land visually.*

> The system interprets everything using Canadian clinical guidelines —
> Diabetes Canada and the Canadian Cardiovascular Society. No
> physician needed for these tests.

*Point at the traffic-light table.*

> Yellow across the board. Her HbA1c is 6.3 — that's the pre-diabetes
> range. Her LDL cholesterol is above target. Her cardiovascular risk
> score is 12% — intermediate.

*Scroll to the AI summary. Let it stream for a few seconds.*

> She gets a personalized summary in plain language. Not medical jargon.
> What it means, what she can do about it, links to Diabetes Canada
> resources, and when to come back for rescreening.

*Scroll to chat. Click a suggested question like "What foods should I avoid?"*

> And she can ask follow-up questions. The AI stays strictly within
> clinical guidelines.

*Let the chat response stream for a couple seconds, then move on.*

---

## 3:15–4:00 — THE OTHER TWO PATIENTS

### Sarah — The Green (3:15–3:30)

*Log out. Log in as `sarah.chen` / `demo1234`. Skip to results (she should already have results simulated from admin).*

> Not everyone gets bad news. Sarah is 52 — everything is normal. Green
> across the board. The system tells her: "You're healthy. See you in
> three years." That's it. No physician appointment needed. No wasted
> clinic time.

### Robert — The Red (3:30–4:00)

*Log out. Log in as `robert.kim` / `demo1234`. Navigate to results.*

> But then there's Robert. 63, Abbotsford. HbA1c of 7.1 — that's
> diabetes. LDL of 5.4 — possible familial hypercholesterolemia. Every
> guideline says this person needs to be on a statin.

*Point at the red rows. Scroll to the next steps card with UPCC locations.*

> The system doesn't just flag it. It tells him exactly where to go —
> three Urgent and Primary Care Centres near his postal code, with
> phone numbers. "Book an appointment. Bring this summary."
>
> Without ScreenBC, Robert doesn't find out until he has a heart
> attack.

---

## 4:00–4:45 — THE CLOSE (Slides 3 + 4)

*Show Slide 3 — Why This Is Feasible.*

> We started with diabetes and cholesterol for a reason. No screening
> result is ever an emergency. AI interpretation is safe. The model
> already exists — BC Cancer does this for mammograms. And this addresses
> the root cause — these people aren't in the ER because they can't be
> treated. They're there because nobody screened them.

*Switch to Slide 4 — What's Next.*

> Phase 2 adds kidney disease — that's where critical results happen,
> so you add a physician-on-call loop. Same platform, one more test,
> one more tier. And when someone joins the family doctor waitlist
> through Health Connect, they get offered screening automatically.
>
> BC does this for cancer. ScreenBC does it for everything else.

---

## PRE-DEMO CHECKLIST

- [ ] All 3 patients reset via `/admin` → "Reset Entire Demo"
- [ ] Gmail open with Margaret's "screening due" email visible
- [ ] Simulate results for Sarah and Robert BEFORE presenting (so their results are ready when you log in as them)
- [ ] Only Margaret goes through the full flow live — Sarah and Robert skip straight to results
- [ ] Browser zoom set to ~110-125% so judges can read the screen
- [ ] Practice the whole thing at least twice — target 4:30 to leave buffer

## TIPS FOR WINNING

1. **Lead with the human story, not the tech.** Judges remember "Robert doesn't find out he's diabetic until he has a heart attack" more than "we used Next.js and the AI SDK."
2. **The 8 dollars vs 15,000 dollars contrast is your most powerful stat.** Use it early and come back to it at the end.
3. **"BC already does this for cancer" is your credibility anchor.** It proves the model works — you're extending it.
4. **Don't explain the tech unless asked.** If judges ask: "Next.js, Vercel AI SDK, Canadian clinical guidelines baked into the AI prompts, no database — this is a prototype that could plug into the provincial health registry."
5. **The three-color demo is visceral.** Green/yellow/red is immediately understood. Let the visuals do the work.
6. **Pace yourself on Margaret.** She's your main demo — don't rush. Sarah and Robert are fast confirmations of the three tiers.
7. **If the AI summary is slow, keep talking over it.** "While that streams in, notice the resources linked below..."
