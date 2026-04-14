 # Spec 03: MVP in 48 Hours (Hackathon-Ready Build)
 
 ## Goal
 Ship the smallest credible product that still feels real: a complete onboarding -> requisition -> results -> guidance flow, with minimal integration risk.
 
 ## MVP Promise
 "We can run a centralized screening program for unattached patients using existing labs, with automated interpretation and recall."
 
 ## Core Assumptions
 - No real PHN validation.
 - Simulated provincial data via synthea CSVs.
 - No real lab API; upload from CSV.
 - Email notifications are mocked or sent via a transactional provider.
 
 ## Scope (Must Have)
 1) Patient onboarding (PHN + DOB)
 2) Screening eligibility rules (simple and deterministic)
 3) Lab requisition generator (PDF or HTML)
 4) Lab result ingest (admin upload)
 5) Results dashboard (traffic-light)
 6) Summary page (plain-language)
 7) "Results ready" email
 
 ## Scope (Cut if needed)
 - Provider dashboard
 - Geolocation of labs
 - AI chat
 - File upload storage
 
 ## Proposed Tech Stack
 - Frontend: Next.js + shadcn/ui
 - Backend: API routes + SQLite or simple JSON store
 - Data import: load synthea CSVs on seed
 - Email: Resend or SMTP mock
 
 ## Screening Rules (Simplified)
 - If age >= 50: due for screening.
 - Tests: HbA1c, Lipid Panel, Creatinine/eGFR.
 - Result thresholds: use existing values in idea doc.
 
 ## Data Model (Minimum)
 - User: id, PHN, DOB, email
 - Eligibility: due flags, reason
 - Requisition: test list, createdAt
 - Result: testName, value, status
 
 ## Demo Script (2-3 Minutes)
 - "We sign up with PHN and DOB."
 - "System says we are due for screening."
 - "We download a requisition and go to the lab."
 - "Lab uploads results."
 - "System interprets and tells us next steps."
 
 ## Success Criteria
 - Full end-to-end flow in the browser.
 - Visually looks like a provincial health service.
 - Demonstrates recall and prevention logic clearly.
