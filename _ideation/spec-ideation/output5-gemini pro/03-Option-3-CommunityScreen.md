# PRD Option 3: CommunityScreen (The Pharmacy-Led Model)

## The Core Concept
BC recently expanded the scope of practice for Pharmacists, allowing them to prescribe for minor ailments and manage contraception. This concept leans into that real-world shift. Instead of waiting for an unattached patient to log into a portal, the system proactively routes screening alerts to the patient's local **Pharmacy**. When the patient comes in to pick up a regular medication, the pharmacist gets a prompt: *"This patient is unattached and due for diabetes screening. Print requisition?"*

**Why it wins:** It solves the "digital divide" and the "unengaged patient" problem. It integrates seamlessly into an existing, highly frequented community touchpoint (the pharmacy). Judges with health-systems backgrounds will love this because it utilizes community infrastructure.

## 1. User Journey (Demo Flow)
1. **The Pharmacist Dashboard:** The demo starts on a Pharmacist's POS/System screen (mocked). A patient walks in to pick up a basic prescription (e.g., an asthma inhaler).
2. **The Flag:** The pharmacist swipes the patient's CareCard (simulated by entering PHN). A clear, non-intrusive alert pops up: *"CommunityScreen Alert: Patient has no recorded Family GP and is 3 years overdue for a lipid panel."*
3. **The Interaction:** The pharmacist says, "I see you don't have a family doctor right now, and you're due for a routine cholesterol check. I can print the lab form for you right now, you just take it to LifeLabs."
4. **One-Click Requisition:** The pharmacist clicks "Generate Requisition" and hands the paper to the patient.
5. **The Results Loop:** The results come back to the pharmacy's secure portal. If normal, the system auto-texts the patient. If abnormal, the pharmacist is prompted to schedule a brief consult or refer them to a UPCC.

## 2. Technical Architecture & Mock Services
*   **Frontend:** A desktop-optimized web app that looks like clinical pharmacy software (clean, dense information, high contrast).
*   **Patient Matching API:** A service that takes a PHN, checks the mock `patients.csv` data, checks the `encounters.csv` to ensure they haven't had a lipid panel recently, and returns a `true/false` flag for "Due for Screening".
*   **Requisition Generator:** A PDF generation microservice.
*   **Automated SMS Service:** Twilio integration (or mocked UI) to show how normal results are communicated asynchronously to save the pharmacist time.

## 3. Developer Execution Plan (Tomorrow)
*   [ ] **Phase 1: The Pharmacy UI.** Build a simple "Search Patient by PHN" screen that mimics a pharmacy workflow.
*   [ ] **Phase 2: The Rules Engine.** Write the logic that cross-references the patient's age and past encounters to trigger the "Screening Due" flag.
*   [ ] **Phase 3: The Hand-off.** Build the UI that generates the requisition PDF with the Pharmacist listed as the authorizing provider.
*   [ ] **Phase 4: The Results Inbox.** A second tab for the pharmacist showing incoming lab results, sorted by severity, with AI-generated draft messages to send to the patient.

## 4. Pitch Angle
*"You can build the best patient portal in the world, but the hardest-to-reach patients won't log in. Who do they see? Their pharmacist. CommunityScreen turns every pharmacy in BC into a proactive screening hub for the 1 million people without a family doctor, leveraging the recent expansion of pharmacist scope to catch chronic diseases before they hit the ER."*