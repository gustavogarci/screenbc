# Pick One: Spec Comparison

Read this first. Pick a spec. Hand it to your developer. Go.

---

## The Five Specs at a Glance

| # | Name | Core Idea | Pages | Build Time | Best For |
|---|---|---|---|---|---|
| 1 | Email-Driven Full Flow | Gustavo's original vision. Complete email → portal → requisition → results → chat → physician dashboard lifecycle. | 8 pages | ~13 hrs | Maximum feature coverage. Higher risk of rough edges. |
| 2 | Minimal Killer Demo | Only 4 screens, all polished to perfection. No email, no chat, no physician view. | 4 pages | ~11.5 hrs | Safest bet. Polish > features. Leaves time for rehearsal. |
| 3 | Conversational AI-First | Entire patient experience is a chat. AI agent with tool calling walks the patient through everything. | 3 pages | ~13 hrs | Most technically impressive "AI" angle. Highest demo risk (AI can go off-script). |
| 4 | Split-Screen Dual View | Patient portal + physician dashboard side by side. Real-time updates between them. | 7 pages | ~14 hrs | Most ambitious. Highest demo impact if it works. Requires the most build time. |
| **5** | **Recommended Hybrid** | **Best of all specs. Landing + requisition + results (with AI summary + chat) + lightweight physician alerts + impact dashboard.** | **5 pages** | **~12 hrs** | **My pick. Balanced risk/reward. Every page earns its place in the demo.** |

---

## Decision Matrix

| Criterion | Spec 1 | Spec 2 | Spec 3 | Spec 4 | Spec 5 |
|---|---|---|---|---|---|
| **Demo Impact** | Good | Great | Great | Best | Great |
| **Build Risk** | Medium | Low | High | High | Low-Medium |
| **AI Impressiveness** | Medium | Medium | High | Medium | Medium-High |
| **Polish Potential** | Low (too many pages) | High | Medium | Low (too much to build) | High |
| **Narrative Strength** | Good | Good | Good | Best | Great |
| **Physician Story** | Yes (dashboard) | No | No | Yes (live) | Yes (light) |
| **Resilience to Bugs** | Medium | High | Low | Low | High |

---

## My Recommendation

**Build Spec 5 (Recommended Hybrid).**

Here's why:
- It has all the demo beats that matter (email, results, AI, physician, impact)
- It's buildable in 12 hours with buffer
- Every page earns its place in the 3-minute pitch
- The physician page is lightweight (1 hour to build) but adds enormous credibility
- If time runs short, you can cut the physician page and the email and still have a complete demo (falling back to Spec 2 essentially)

**If you have a weaker developer or less time:** Build Spec 2. It's the safest bet.

**If your developer is strong and you want to swing for the fences:** Build Spec 4. The split-screen dual view with your partner clicking "Approve" live is the most memorable possible demo.

**If the judges are deeply technical:** Build Spec 3. The AI agent with tool calling is the most technically impressive.

---

## Files in This Directory

```
specs/
├── PICK-ONE.md                      ← You are here
├── 00-research-and-context.md       ← Shared research (all specs reference this)
├── spec-1-email-driven-full-flow.md ← Gustavo's original vision
├── spec-2-minimal-killer-demo.md    ← 4 screens, max polish
├── spec-3-conversational-ai-first.md← Chat-based AI agent
├── spec-4-split-screen-dual-view.md ← Patient + physician side by side
└── spec-5-recommended-hybrid.md     ← My pick: best of all specs
```

All specs reference `00-research-and-context.md` for:
- BC Gov design tokens (colors, typography)
- Clinical screening logic (thresholds, eGFR formula, Framingham score)
- Hackathon data paths and column names
- BC Cancer Screening model details
- Naming decision (ScreenBC, not CheckUp/GetChecked)

---

## First 30 Minutes Tomorrow

1. Read `PICK-ONE.md` (this file) — 5 minutes
2. Pick a spec — 5 minutes
3. Developer reads the chosen spec + `00-research-and-context.md` — 15 minutes
4. Developer starts scaffolding — minute 31

Good luck. Win this thing.
