 # Spec 02: BC Cancer Modeled Workflow (Provincial Recall Program)
 
 ## Goal
 Mirror the proven BC Cancer Screening model: centralized recall, eligibility-based invitations, requisition workflow, and results communication. Use the same structure but for chronic disease screening.
 
 ## Rationale
 BC Cancer Screening already:
 - Tracks eligibility provincially.
 - Sends reminder letters.
 - Issues requisitions.
 - Communicates results.
 This program is the template for how BC can run screening without a family doctor.
 
 ## Naming Options (avoid conflict with "I Get Checked")
 - ScreenBC
 - HealthScreen BC
 - MyScreen BC
 - PreventBC
 - CareScreen BC
 - Upstream BC
 
 Recommendation: pick a name that sounds provincial and neutral, similar to "Health Gateway" and "BC Cancer Screening".
 
 ## Modeled Program Flow
 ### 1) Eligibility & Recall
 - System runs nightly eligibility check.
 - People due for screening are placed in a Recall Queue.
 - The system sends a digital "recall notice" (email for demo).
 
 ### 2) Request / Book
 - Recipient clicks a link to "Request a Screening Requisition".
 - A short eligibility form confirms identity and consent.
 - System creates a requisition or kit order code (simulated).
 
 ### 3) Requisition and Lab Visit
 - Requisition contains: tests, supervising physician, patient data.
 - Patient visits any lab; no primary care required.
 
 ### 4) Results + Communication
 - Lab uploads results (mock ingest).
 - Results categorized into risk tiers.
 - Patient receives a "results ready" notification.
 - If abnormal, an "urgent follow-up" notice is sent.
 
 ## Screening Triggers (Demo Defaults)
 Use the same age-based logic as common BC screening programs to make the model feel authentic:
 - 50-74 for high-priority screening flow (aligns with breast/colon program ages).
 - 25-69 for cervix (in BC Cancer program) to show flexibility.
 
 For demo, set the "due" trigger to age 50 to align with real recall programs.
 
 ## Data Model
 - Person: PHN, DOB, sex, contact, postal code
 - Recall: reason, due date, test set, status
 - Requisition: patient, tests, supervising physician
 - Result: lab values, status, summary
 
 ## Screens
 - Recall notice email page (CTA)
 - Eligibility confirmation
 - Requisition download
 - Results dashboard
 - "Your next recall date" card
 
 ## Ops Dashboard (Provincial View)
 - Recall queue size
 - Tests issued
 - Results rate (pending vs completed)
 - Abnormal flags needing follow-up
 
 ## UX / Visual
 - Use BC Design System pattern (clean government UI).
 - BC Sans font if available; fallback to system sans.
 - Link color similar to BC DS #255A90, text #2D2D2D.
 - Emphasize clarity and trust: big headings, minimal decoration.
 
 ## Implementation Notes (Prototype)
 - Schedule a "recall cron" (mocked or manual trigger).
 - Store a recall record to show lifecycle state.
 - Fake letters via email UI preview (no real mail).
 
 ## Success Criteria
 - Judges recognize the "BC Cancer Screening" model immediately.
 - The flow is easy to explain as "we used what BC already does."
