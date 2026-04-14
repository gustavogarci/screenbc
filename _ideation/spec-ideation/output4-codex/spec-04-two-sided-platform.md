 # Spec 04: Two-Sided Platform (Patient + Operations)
 
 ## Goal
 Build a convincing system with both a patient portal and a provincial operations view. The ops view makes the product feel like an official program.
 
 ## System Components
 - Patient Portal (public facing)
 - Provincial Operations Console (internal)
 - Mock Provincial Data Exchange (records + labs)
 
 ## Patient Portal
 ### Features
 - PHN-based login
 - Risk factor intake
 - Requisition download
 - Results dashboard
 - Explanation pages
 
 ### User Journey
 1. Sign in with PHN
 2. Consent to connect to provincial record
 3. Verify details
 4. See eligibility and requisition
 5. Get results and guidance
 
 ## Ops Console
 ### Key Views
 - Recall Queue: list of people due for screening
 - Requisition Queue: status of issued requisitions
 - Results Review: flagged abnormal results
 - Metrics: completion rate, abnormal rate, communities served
 
 ### Demo Actions
 - "Trigger recall" button
 - "Send reminder" button
 - "Upload lab results" button
 
 ## Mock Provincial Data Exchange
 - Simulated "PHR API" that returns patient profile + prior labs.
 - Simulated "Lab Exchange" for uploading results.
 - Use synthea CSVs to back both systems.
 
 ## Data Objects
 - PatientRecord: demographics, conditions, labs
 - RecallEvent: patientId, dueAt, status
 - Requisition: patientId, tests, provider
 - LabResult: testName, value, unit, status
 
 ## Experience Goals
 - Patient experience feels like Health Gateway.
 - Ops console feels like a provincial program dashboard.
 - The demo clearly shows an official, scalable program.
 
 ## Visual Guidance
 - Use BC Design System patterns and clean government styling.
 - Keep the ops console slightly more data-dense, with tables and filters.
 
 ## Success Criteria
 - Judges can see the system works end-to-end.
 - A program manager could understand how to operate it.
