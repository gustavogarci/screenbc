# PRD Option 2: CareCatch (The "Virtual Clinic" Back-Office)

## The Core Concept
Instead of focusing purely on the patient portal, this approach flips the script. It builds a **Population Health Dashboard** for a single supervising physician or a regional health authority. It shows how AI can monitor a pool of 10,000 unattached patients, identify who is due for screening, bulk-generate requisitions, and triage the returning lab results so the human doctor only has to look at the top 5% most critical cases.

**Why it wins:** Judges love "system-level" thinking. It proves scalability. It shows that one physician could effectively "manage" preventative screening for a whole city of unattached patients because the AI is doing the heavy lifting of sorting the normal from the abnormal.

## 1. User Journey (Demo Flow)
1. **The System Dashboard:** The demo starts on a beautiful "Population Health" dashboard. The user is a Supervising Physician. The dashboard shows: *"1,200 unattached patients in your region. 340 are due for screening this month."*
2. **The AI Batch Run:** The physician clicks "Run Screening Engine." The AI analyzes the 340 patients (using the synthetic CSV data), determines exactly what tests each needs, and automatically sends out 340 emails/requisitions. 
3. **Patient Perspective (Brief):** You briefly show the patient getting the email, downloading the requisition, and going to the lab.
4. **The Triage Engine:** Fast forward. 300 lab results come back via API. The AI automatically ingests them and triages them:
    *   250 are **Normal**. AI auto-sends an "All good, see you in 3 years" email.
    *   45 are **Borderline**. AI auto-sends a personalized lifestyle guide.
    *   5 are **Critical/Red Flag**. 
5. **The Physician Review:** The physician dashboard now shows an alert: *5 Patients Require Human Review*. The doctor clicks in, sees the AI's summary of the critical lab results, and clicks "Refer to Urgent Primary Care Centre (UPCC)."

## 2. Technical Architecture & Mock Services
*   **Frontend:** Next.js + shadcn/ui. Complex data tables, metric cards, and a robust admin layout.
*   **Data Pipeline:** A robust backend (Python/FastAPI or Next.js Route Handlers) that processes the CSVs. 
*   **The AI Triage Agent:** This is the core IP. An AI prompt designed strictly to intake JSON lab results and output a classification (`NORMAL`, `BORDERLINE`, `CRITICAL`) along with a reasoning string.
*   **Patient Notification Mock:** A simple view that shows the outgoing queue of emails/SMS.

## 3. Developer Execution Plan (Tomorrow)
*   [ ] **Phase 1: Data Ingestion.** Create a script to load the hackathon CSVs and filter for patients > 50 years old without a family doctor flag.
*   [ ] **Phase 2: Admin Dashboard.** Build a "command center" UI showing aggregate stats (e.g., total unattached, total due for screening).
*   [ ] **Phase 3: Batch Screening Logic.** Implement the logic that maps age/gender to specific lab panels (HbA1c, Lipids, eGFR).
*   [ ] **Phase 4: AI Triage Queue.** Feed a subset of `lab_results.csv` through an LLM to categorize them, then render the "needs human review" table.

## 4. Pitch Angle
*"We don't have enough family doctors, and we never will. But we don't need a doctor to tell a 50-year-old they need a cholesterol check, and we don't need a doctor to read a perfectly normal lab result. CareCatch is an AI-powered virtual clinic that allows one supervising physician to provide baseline preventative care for 10,000 unattached patients."*