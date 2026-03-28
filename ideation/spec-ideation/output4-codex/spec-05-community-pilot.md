 # Spec 05: Community Pilot + Automated Recall
 
 ## Goal
 Deliver a pilotable version that a UPCC or community clinic could run with a single supervising physician, using automated recall and email workflows.
 
 ## Why This Variant
 - Centers on a community pilot, which judges often see as more "real".
 - Emphasizes operational feasibility: one supervising physician + centralized screening.
 - Demonstrates recall and prevention as a provincial program.
 
 ## Pilot Story
 - Target community with high unattached rates (e.g., Sooke or Mission).
 - Enroll 200-500 residents.
 - Run automated recall at age triggers.
 - Show measurable detection of undiagnosed risk.
 
 ## Key Features
 1) Cohort Enrollment
 - Invite users from a community list (import CSV).
 - Users confirm identity, opt in, and provide email.
 
 2) Automated Recall
 - Trigger "due for screening" when user hits age threshold.
 - Send email with link to requisition.
 - Allow manual "simulate birthday" for demo.
 
 3) Requisition + Results
 - Generate lab requisition.
 - Simulate lab result upload.
 - Send results-ready email.
 
 4) Guidance + Escalation
 - Plain-language result summary.
 - If abnormal, show "Book UPCC / call 811" guidance.
 - For demo, include a simple "Book clinic" CTA.
 
 ## Pilot Metrics (Displayed)
 - % invited who completed screening
 - % abnormal results
 - Estimated downstream ER visits avoided (demo copy)
 
 ## Data
 - Use synthea data for mock cohort.
 - Use bc_health_indicators.csv to justify community focus.
 
 ## Visual Direction
 - Use Health Gateway-inspired UI.
 - Strong emphasis on trust, clarity, and public service tone.
 
 ## Success Criteria
 - Feels like a real pilot in a real BC community.
 - Demonstrates automated recall and follow-up.
 - Clear path to provincial scale.
