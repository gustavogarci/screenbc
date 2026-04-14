# PRD Option 1: ScreenBC (The Gateway Extension)

## The Core Concept (Your Original Vision)
A seamless, patient-driven portal modeled after BC's Health Gateway. It allows unattached patients to log in with their PHN (Personal Health Number), pulls their data from a mock provincial repository, allows them to upload medical history, and automatically triggers screening workflows (lab requisitions) as they hit age or risk milestones. 

**Why it wins:** It's incredibly realistic. By modeling it directly off existing BC Health infrastructure (using their blue/gold standard design system), it looks like a real government pilot. It clearly answers the "how do we screen people without family doctors?" question.

## 1. User Journey (Demo Flow)
1. **The Trigger:** The demo begins with an email arriving in the user's inbox: *"BC Health Services: You are now eligible for routine preventative screening."* (Triggered because the user's mocked profile just turned 50).
2. **Authentication:** User clicks the link and logs into **ScreenBC** using a mock "BC Services Card" login (just a simple PHN + DOB form for the demo).
3. **Data Sync & Intake:** The system shows it is "Pulling your provincial health records..." (Mocking a pull from Pharmanet/PLIS). It shows the user's basic info. The user is then asked a few quick triage questions: *"Do you have a family history of diabetes or heart disease?"*
4. **The Requisition:** Based on age (50) and the intake, the system generates a downloadable PDF Lab Requisition for LifeLabs (HbA1c, Lipid Panel, eGFR). The UI explains *why* these tests are being ordered in plain, friendly language.
5. **The Time Skip (Simulating the Lab):** The developer clicks a "Simulate Lab Results Received" button in a hidden admin panel.
6. **The Result & Interpretation:** The user gets an SMS/Email: *"Your ScreenBC results are ready."* They log back in. The dashboard shows their results categorized by traffic light colors (Green = Normal, Yellow = Borderline, Red = Abnormal). An AI-generated summary explains that their HbA1c is borderline (pre-diabetic) and provides immediate, actionable lifestyle advice.

## 2. Technical Architecture & Mock Services
*   **Frontend:** Next.js + TailwindCSS. **Design Language:** BC Gov Design System (Primary Blue `#036`, Gold `#FCBA19`, White, clean typography).
*   **Mock Provincial EMR (Database):** A simple Supabase or Firebase database populated with the synthetic Hackathon data (`patients.csv`, `encounters.csv`). This acts as the "source of truth" we are pulling from.
*   **Trigger Engine:** A cron job or simple API endpoint that checks birthdays. If `current_date - DOB == 50 years`, fire a Resend email trigger.
*   **LLM Integration (AI SDK):** Use Vercel AI SDK to consume the raw lab values (e.g., HbA1c 6.3) and output the plain-English patient summary.

## 3. Developer Execution Plan (Tomorrow)
*   [ ] **Phase 1: Database Setup.** Load `patients.csv` into a lightweight DB. Build an endpoint to fetch a patient by PHN (insurance_number).
*   [ ] **Phase 2: UI Shell.** Build the mock "BC Services Card" login screen and the main dashboard. Use the BC Gov color palette.
*   [ ] **Phase 3: The Requisition Engine.** Build a component that evaluates the patient's age/sex against the screening algorithms (from the idea doc) and renders a visual "Lab Requisition".
*   [ ] **Phase 4: The Result Simulator.** Build a hidden developer button that injects a predefined row from `lab_results.csv` into the patient's profile.
*   [ ] **Phase 5: AI Summary.** Hook up the AI SDK to read that lab result and stream back the interpretation.

## 4. Pitch Angle
*"Cancer screening in BC is already centralized and automated. Why aren't we doing the same for the top three chronic diseases bankrupting our ERs? ScreenBC is a Health Gateway extension that acts as a digital family doctor for the 1 million unattached patients in BC, automatically triggering the labs they need, when they need them."*