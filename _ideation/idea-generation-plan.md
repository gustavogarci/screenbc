# Winning Healthcare Hackathon Idea Generation Plan

> A structured research-then-ideate process to generate hackathon ideas that are deeply aligned with where BC's healthcare system is actively investing, grounded in Zen Garani's four investment pillars, and filtered through adoption reality.

---

## The Core Insight from Zen's Talk

The keynote was not about technology. It was about **alignment**. The single thesis:

> "The difference between something that feels like a good idea and something that actually gets traction comes down to alignment."

Most hackathon teams build "right solutions to wrong problems." Zen gave us an explicit filter: **does your idea align with what the system is trying to solve right now?** And he told us exactly where the money and attention are going.

---

## Phase 1: Extract the Intent (What Zen Actually Told Us)

Before any research, we need to crystallize the four investment pillars Zen outlined and the anti-patterns he warned against. This is the "lens" through which all ideas must pass.

### The Four Pillars of Active Investment

1. **Access Redesign** -- The front door is being rebuilt. Not "add more doctors" but "route patients to the right level of care." Team-based care, expanded pharmacist/NP roles, virtual care as entry point, centralized intake. The goal: **navigation and matching, not volume.**

2. **Decentralized Care** -- Care is moving out of hospitals. Home monitoring, community-based models, virtual follow-ups. Hospital-only solutions have narrower impact. The goal: **care that works where the patient already is.**

3. **Workforce as Bottleneck** -- Not "reduce admin" generically, but specifically: save time, simplify decisions, remove friction. The critical warning: "if you're automating a bad process, what are you really doing?" The goal: **reduce complexity, don't add tools.**

4. **Healthcare as Operations** -- Wait times, scheduling, coordination, capacity. The broken elbow story: a 10-year-old waits weeks because of scheduling gaps, blurry x-rays, and no information flow. The goal: **small operational fixes compound into huge patient benefit.**

### The Anti-Patterns (What Zen Warned Against)

- Building in isolation without understanding real constraints
- Assuming you know what patients/clinicians need
- Adding steps, cognitive load, or behavior change without clear payoff
- Automating bad processes instead of rethinking them
- Complexity for its own sake -- "the best ideas won't be the most complex, they'll be the ones the system is ready for"

### The Adoption Filter

Every idea must pass: **Would a real person actually use this?** Zen said the healthcare system is "a graveyard of innovation." 56% of Canada's 176 documented AI healthcare initiatives haven't left pilot. Only 5% went system-wide. Adoption beats cleverness.

---

## Phase 2: Research Before Ideation

We need to build a knowledge base across six dimensions before generating any ideas. This prevents us from either duplicating existing work or building something misaligned.

### Research Area 1: What Already Exists in BC (Overlap Avoidance)

Map existing tools and initiatives so we do not re-build them:

- **AI Scribes** -- 8,000 providers, 6 vendors, PHSA-run trial. Captures visit conversations into SOAP notes. Saves ~5.7 hrs/week. Do NOT build another scribe.
- **BC Health Gateway** -- Patient-facing portal. Raw records (meds, labs, visits). No summary or intelligence layer.
- **HealthLink BC 811** -- Telephone triage + symptom checker. Human navigators. No AI-driven routing.
- **TELUS Home Health Monitoring** -- RPM for chronic disease (CHF, COPD, diabetes). Tablet-based. Already deployed in Fraser Health, VCH.
- **Digital Referrals & Orders (DRO)** -- Only 20 early-adopter clinics in Vancouver/Burnaby. Barely rolled out.
- **UPCCs** -- Team-based urgent + primary care centres. Expanding rapidly (new ones in Abbotsford, Port Coquitlam, Cowichan, Elkford).
- **Fraser Health AI scheduling** -- Three AI models for ED volume forecasting, hospitalist workload prediction, and baseline scheduling. Pilot stage at Eagle Ridge/Burnaby.
- **Health Connect Registry** -- Provincial waitlist for primary care attachment. Over 1 million people without a family doctor.

This map reveals **white space**: areas where the system is investing but tooling doesn't yet exist.

### Research Area 2: The Compounding Pressure Points

Zen's most important framing: healthcare isn't dealing with one problem -- it's dealing with **compounding pressure**. The best ideas live at the intersection of multiple pillars.

Cross-reference matrix to identify:
- Where access problems create workforce problems (e.g., ERs as default care = burned out ER staff)
- Where operational failures create access problems (e.g., scheduling gaps = unnecessary visits, like the broken elbow)
- Where decentralized care creates new operational challenges (e.g., remote monitoring generates data nobody acts on)
- Where workforce constraints block access redesign (e.g., team-based care requires coordination tools that don't exist)

### Research Area 3: The Three User Personas

Zen explicitly named three voices hearing different things:

| Persona | What they say | Core pain |
|---------|--------------|-----------|
| Patient | "I can't find a doctor. I waited 8-10 hours. I don't know where to go." | Navigation, confusion, time wasted |
| Clinician | "Too many patients. Too much documentation. System doesn't match how care happens." | Cognitive overload, friction, misaligned workflows |
| Leader | "Under pressure to improve access. Funding tied to wait times. Adoption is slow." | Accountability without tools, investment without ROI |

Ideas should target at least one persona deeply, ideally bridge two.

### Research Area 4: Synthea/FHIR Technical Possibilities

Understand what data types are available and what they enable:
- Patient, Condition, Encounter, Medication, Observation, AllergyIntolerance, Procedure, CarePlan, Claim, Organization, Provider, Immunization
- What patterns can be extracted: care journeys, utilization, risk stratification, medication timelines, referral chains, encounter gaps, cost modeling

### Research Area 5: Judging Criteria Alignment

From prior UVic Hacks events and healthcare hackathon norms:
- **Problem grounding** (25%): Is this a real problem with evidence from real people?
- **Technical execution** (30%): Does it work? Is AI used meaningfully, not gratuitously?
- **Impact and ethics** (25%): Who benefits? Does it address equity? Does it consider safety?
- **Presentation** (20%): Can you tell a clear story in 3 minutes?

Implication: the *story* matters as much as the code. The broken elbow anecdote was more powerful than any statistic. Ideas that come with a built-in narrative ("imagine you're a 75-year-old with COPD trying to figure out where to go") win.

### Research Area 6: The "System Readiness" Filter

Zen's most underappreciated insight: "the best ideas will be the ones the system is ready for." This means:
- The problem is already acknowledged by leadership
- Budget is already allocated to the space
- Existing workflows would accommodate the solution
- No regulatory/privacy barriers block adoption
- The solution doesn't require behavior change from 10 different stakeholders

---

## Phase 3: Idea Generation Framework

With research complete, generate ideas using a structured process, NOT free association.

### Step 1: Intersection Mapping

Create a 4x3 matrix: 4 investment pillars x 3 personas. For each cell, ask: "What specific friction exists here that the system is actively trying to solve, where tooling is absent or immature?"

```
              | Patient           | Clinician             | Leader
--------------+-------------------+-----------------------+------------------
Access        | ?                 | ?                     | ?
Decentralized | ?                 | ?                     | ?
Workforce     | ?                 | ?                     | ?
Operations    | ?                 | ?                     | ?
```

### Step 2: Generate As Many Ideas As Possible Per Cell

For each promising cell (not all cells will yield strong ideas), generate as many candidate ideas as the intersection supports. Each idea must be stated as: **[Who] can [do what] so that [measurable outcome]**. Aim for 20-30+ raw candidates across the full matrix -- quantity matters here because the doctor panel will do the final selection. Do not self-censor at this stage.

### Step 3: Filter Through the Zen Test

Every candidate idea goes through:
1. Does it align with one of the four investment pillars?
2. Does it save time, simplify decisions, or remove friction?
3. Would a real person actually use this without behavior change?
4. Is it rethinking a process, or just automating a bad one?
5. Does it work outside the hospital (bonus)?
6. Can you demo it compellingly in 3 minutes?
7. Can you build a working prototype in ~12 hours?
8. Does it have a built-in narrative (a human story)?

### Step 4: Score Every Idea on the Clinical Rubric

Every idea that survives the Zen Test gets formally scored on the same rubric used in the existing ideas document, so the doctor panel can compare all ideas on equal footing:

- **Clinical Relevance (30 pts)** -- Does it address a real, meaningful healthcare problem? Is the target population clearly defined and would they actually benefit?
- **Feasibility & Safety (25 pts)** -- Could this realistically be deployed in a healthcare setting? Did your team consider risks, privacy, and patient safety?

Each idea gets a numerical score with a written justification for each criterion, exactly like the existing ranked list.

### Step 5: Rank All Ideas

Sort all scored ideas by total score (out of 55). Do NOT cap the list -- the goal is maximum volume for the doctor panel to review. Expect 15-25 fully scored ideas.

Additionally, tag each idea with:
- System alignment (is the money already flowing here?)
- White space (does this exist already in BC?)
- Demo-ability (can judges see and feel the value in 3 minutes?)
- Technical feasibility (can this be built with Synthea + AI in 12 hours?)
- Narrative power (does this have a "broken elbow story"?)

---

## Output

A ranked list of **all viable ideas** (target: 15-25), each with:
- The investment pillar it serves
- The persona it targets
- The specific BC problem (with data)
- What already exists (and why this is different)
- The human story for the pitch
- What it does (one paragraph)
- Why the system is ready for it
- Technical sketch (Synthea resources used, AI role)
- **Clinical Relevance score (X/30) with justification**
- **Feasibility & Safety score (X/25) with justification**
- **Total score (X/55)**

This document is designed to be handed directly to the doctor panel for review and feedback.
