 # Spec 01: User Flow Prototype (Directly from Your Idea)
 
 ## Goal
 Build a convincing prototype that mirrors a real provincial screening workflow: patient onboarding with PHN, record retrieval from a simulated provincial source, lab requisition generation, lab results ingestion, interpretation, and automated email follow-ups.
 
 ## Name + Positioning (Working)
 - Working name: CheckUp BC (placeholder, to be renamed)
 - Positioning: A province-style screening service for unattached patients, modeled after BC Cancer Screening and Health Gateway UX patterns.
 
 ## Core Demo Story (3-5 minutes)
 1. Patient signs up with PHN + DOB.
 2. System pulls existing records from a simulated provincial record service.
 3. Patient adds missing history and uploads any files (PDFs, lab results).
 4. System calculates screening eligibility and generates lab requisition.
 5. "Lab service" uploads results to the system.
 6. System interprets results, generates plain-language summary, and emails patient.
 7. Patient logs in to view results and guidance.
 
 ## Scope for Hackathon Prototype
 Must-have screens:
 - Landing + value proposition
 - Login / sign-up (PHN + DOB)
 - Intake form (risk factors + uploads)
 - Screening eligibility + lab requisition
 - Results dashboard
 - Result detail page with recommendations
 - Email templates (screening reminder + results ready)
 
 Nice-to-have:
 - Provider / admin dashboard showing cohort metrics
 - "Lab uploader" view for demo
 - In-product chat Q&A
 
 ## Architecture (Prototype)
 - Patient Portal (Next.js)
 - Simulated Provincial Records API (mock service)
 - Screening Engine (rules + thresholds)
 - Lab Results Ingest (mock upload)
 - Notification Service (email)
 
 ## Data Sources (Hackathon)
 - Use synthea patients + labs to simulate provincial data store.
 - Use lab_results.csv as authoritative results for demo.
 - Use encounters.csv + medications.csv to populate "existing conditions" in mock records.
 
 ## Functional Requirements
 ### 1) Patient Onboarding
 - Input: PHN, DOB, name, optional email, postal code.
 - On submit: call mock "Provincial Record Service".
 - If record found: pre-fill demographics and conditions.
 - If not found: allow manual completion.
 
 ### 2) Risk Factor Intake
 - Simple checkboxes: family history, smoking, pregnancy, previous diagnoses.
 - Optional upload: patient can upload prior lab PDF (store and display only).
 
 ### 3) Screening Eligibility
 - Rules engine determines due tests based on age, sex, risk factors.
 - Output: "You are due for X tests."
 - Trigger: show lab requisition + send reminder email.
 
 ### 4) Lab Requisition
 - Generate printable requisition.
 - Include: patient details, test list, supervising physician (static for demo).
 - Provide list of nearby lab locations (static or lookup by postal code).
 
 ### 5) Lab Results Ingest (Mock)
 - Admin/lab view can upload a CSV or select a patient and load lab_results.csv.
 - Store results in patient record and set status: "Results Ready."
 - Trigger: send results-ready email.
 
 ### 6) Results Interpretation
 - Rules-based classification (Normal / Borderline / Abnormal).
 - For each test: threshold, plain-language explanation, next steps.
 - Show traffic-light status in a dashboard.
 
 ### 7) Summary Page
 - Generate a 1-page summary combining all tests.
 - Emphasize: what it means, what to do, and when to rescreen.
 - Include escalation guidance (go to UPCC / call 811).
 
 ## Non-Functional Requirements
 - Accessibility first (AA contrast).
 - No real PHN validation required for demo.
 - No real clinical decisions; use "informational only" copy.
 
 ## Email Templates (Demo)
 - "You are due for screening" with CTA button.
 - "Your results are ready" with CTA button.
 - "Action required" for abnormal results (optional).
 
 ## Visual Direction (Health Gateway-inspired)
 - Use BC Sans or an accessible substitute.
 - Link color similar to BC Design System link color (#255A90).
 - Text color similar to BC DS primary text (#2D2D2D).
 - Status colors use simple green/yellow/red.
 - Clean, government-like layout: large headings, modest spacing, high clarity.
 
 ## Success Criteria (Demo)
 - Judges see a full end-to-end workflow.
 - The demo clearly maps to real BC Cancer model (centralized screening).
 - The system feels like a real provincial service.
