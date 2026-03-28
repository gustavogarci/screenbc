# PRD Option 5: ProactiveHealth (The Consumer-Centric "Health Score" App)

## The Core Concept
Instead of feeling like a sterile government portal, this approaches the problem like a modern consumer health app (think Apple Health, Oura, or Zero). It calculates a "Preventative Health Score" for the user. To increase their score and move out of the "Risk Zone", they must complete their age-appropriate screenings. 

**Why it wins:** Gamification and user engagement. It changes the narrative from "doing a chore for the government" to "optimizing your own health longevity." It targets a younger/middle-aged demographic that is health-conscious but lacks a primary care doctor.

## 1. User Journey (Demo Flow)
1. **The Dashboard:** User logs in and sees a large, visual "Preventative Score: 65/100". Below it, a progress bar shows: *"Missing Data: Age 50+ Baseline Labs."*
2. **The Discovery:** The user clicks on the missing data alert. The app explains: *"Since you don't have a family doctor, we can order these for you directly through our supervising network."*
3. **The Intake:** The user goes through a slick, Typeform-style intake flow. *"Any family history of heart attacks before age 60?"*, *"Do you smoke?"*. The UI reacts dynamically.
4. **The "Unlock":** After answering, the app generates the LifeLabs requisition as a mobile pass (looks like an Apple Wallet pass). *"Take this to LifeLabs to unlock the rest of your health score."*
5. **The Reveal:** (Simulate labs received). The user gets a push notification. Their score updates to 85/100. 
6. **Visualized Results:** Instead of a boring table, their HbA1c and Cholesterol are shown on beautiful spectrum dials. The AI acts as a "health coach," giving them a customized 3-step action plan to get their score to 100/100 (e.g., "Reduce LDL by 0.5 mmol/L through fiber intake").

## 2. Technical Architecture & Mock Services
*   **Frontend:** React Native (Expo) or a highly mobile-optimized PWA using Next.js. Heavy use of animations, circular progress bars, and premium UI components (e.g., Framer Motion).
*   **Scoring Engine:** An algorithm that weights missing screenings heavily, and then adjusts the score based on the actual lab values (e.g., Normal = +10 pts, Borderline = +5 pts, High = 0 pts).
*   **Integration Mocks:** Mock the ability to pull in step counts or sleep data to show that the app is a holistic "health hub," even though the core value prop for the hackathon is the lab screening.

## 3. Developer Execution Plan (Tomorrow)
*   [ ] **Phase 1: The UI Shell.** Build the mobile-first dashboard with the big "Health Score" circle. Make it look like a high-end consumer startup.
*   [ ] **Phase 2: The Flow.** Build the Typeform-style questionnaire that collects the risk factors and ends in the requisition generation.
*   [ ] **Phase 3: The Scoring Logic.** Write a utility function that takes a patient row from the CSV and their associated lab results, and outputs a score from 0-100.
*   [ ] **Phase 4: Data Visualization.** Implement the result screens using charting libraries (Recharts) to show where their lab values sit on the normal-to-abnormal spectrum.

## 4. Pitch Angle
*"The current healthcare system is reactive. We wait for you to get sick, and then we treat you. ProactiveHealth shifts the paradigm. By combining the engagement mechanics of a modern fitness app with clinical-grade preventative screening protocols, we give unattached patients the power to own their health trajectory, catching chronic diseases years before they become a burden to the patient or the ER."*