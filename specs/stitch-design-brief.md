# ScreenBC — Stitch Prompts (Copy-Paste in Order)

Instructions: Copy each prompt below into Google Stitch one at a time. Wait for the result, refine if needed, then move to the next prompt. For Prompt 1, also upload the BC Services Card login screenshot (`assets/CleanShot_2026-03-28_at_09.56.26_2x-*.png`) as an image reference.

---

## Prompt 1: Login Page + Patient Portal (Foundation)

Upload the BC Services Card screenshot with this prompt.

```
Design a web app for a government health screening service in British Columbia, Canada called "ScreenBC." The design must look official, trustworthy, and clinical — like a real BC Government digital service. Not a startup. Not a wellness app.

Design system:
- Dark navy blue header bar (#013366) on every page with a thin gold accent line (#FCBA19) underneath. "ScreenBC" in white text on the left. "Log out" link on the right.
- Page background: light warm gray (#FAF9F8)
- Content in white cards with light borders (#D8D8D8)
- Font: Inter. Large body text for older adults (50+).
- Primary buttons: navy blue (#013366). Links: #255A90.
- Footer on every page: "ScreenBC Pilot Program · This is not a substitute for medical advice. Call 8-1-1."
- No decorative illustrations, no stock photos. Clean, minimal, lots of whitespace.

Screen 1 — Login Page:
Mirrors the attached BC Services Card Login screenshot exactly, but branded for ScreenBC. Blue header bar with British Columbia logo (gold sun over mountains) and text "BC Services Card Login". Below: "Log in to: ScreenBC". Small text: "This service will receive your: name, email address, PHN". White centered card with heading "Continue with:" and two large rectangular outlined buttons stacked vertically: "BC Services Card app" (with phone icon) and "Username/password + BC Token" (with key icon). Below buttons: "No account? Find out how to get the mobile app. Or, how to get a BC Token." with a link "Set up a BC Services Card account". Footer with privacy disclaimer. Very official government feel.

Screen 2 — Patient Portal Dashboard:
Blue header bar with "ScreenBC" and "Log out" link. Welcome message: "Welcome back, Margaret." in large text. Light blue banner card (#F1F8FE): "Help us tailor your results — fill out a 2-minute health questionnaire." with blue "Fill Out Questionnaire" button and gray "Maybe Later" button. White profile card showing: Name: Margaret Johnson, Date of Birth: January 20, 1971 (Age 55), Sex: Female, PHN: 8241 595 268, Postal Code: V8N 7P5 (Victoria, BC). Screening status card with gold/amber background (#FEF1D8): "You're due for preventive screening for diabetes and cholesterol." with button "Get Your Lab Requisition →". Footer.
```

---

## Prompt 2: Consent Page

```
Add a new screen to this app: Consent Page.

ScreenBC blue header bar at top. Centered white card on light gray background, moderately wide for reading. Heading: "ScreenBC Preventive Screening Program" in large text. Subheading: "Terms and Consent" in smaller text. Body text with clear section headings: "What This Program Is" — short paragraph explaining it's a pilot screening program for people without a family doctor, covering diabetes and cholesterol. "What You Need to Understand" — numbered list of 5 points: 1. Results interpreted by AI following Canadian clinical guidelines — results are not individually reviewed by a physician. 2. If a result requires attention, the system will direct you to appropriate care resources (UPCC, walk-in clinic, HealthLink BC). 3. Does not replace staying on the waitlist for a family doctor. 4. Patient is responsible for following up on results. 5. If feeling unwell, call 8-1-1 or go to nearest emergency department. "Consent" — paragraph stating that by clicking accept, the patient confirms they understand. Large blue primary button at the bottom: "I Accept and Continue". No skip or decline button. Formal, clinical feel — like a real medical consent form. Footer.
```

---

## Prompt 3: Health Questionnaire

```
Add a new screen: Health Questionnaire form.

Blue header bar. Heading: "Health Questionnaire". Subtext: "This helps us calculate your cardiovascular risk score for more specific cholesterol guidance. All fields are optional." White card with 5 questions, each with a brief label and radio/input options:

1. "Do you have a first-degree relative (parent, sibling) with diabetes?" — three radio buttons: Yes / No / Not sure
2. "Do you have a first-degree relative (parent, sibling) who was diagnosed with heart disease at an early age — before 55 for men or before 65 for women?" — three radio buttons: Yes / No / Not sure
3. "Do you currently smoke cigarettes?" — three radio buttons: Yes / No / Former smoker
4. "Do you know your blood pressure? If yes, what is the top number (systolic)?" — number input field with placeholder "e.g., 120" and helper text: "This is the top number when your blood pressure is taken (e.g., 120/80 → enter 120)"
5. "Are you currently taking medication for blood pressure?" — three radio buttons: Yes / No / Not sure

Blue "Submit" button at bottom. Small note below: "This information is used only to calculate your cardiovascular risk score. It is not shared with anyone outside the ScreenBC program." Simple, non-threatening — like a quick form at a doctor's office. Footer.
```

---

## Prompt 4: Lab Requisition (Printable Document)

```
Add a new screen: Printable Lab Requisition.

Two buttons at the top (not part of the document): blue "Print Requisition" button and "← Back to Portal" text link. Below that, a clean white document with a thin border — formal medical document style, black and white, designed to print well.

Document content: Centered header "SCREENBC — PREVENTIVE HEALTH SCREENING PROGRAM" with horizontal rule. Subtitle: "Laboratory Requisition". Patient Information section: Name: Margaret Johnson, PHN: 8241 595 268, DOB: January 20, 1971 (Age 55), Sex: Female, Address: Victoria, BC V8N 7P5. Ordering Clinician section: Dr. [Name], ScreenBC Preventive Screening Program, License #: [Number]. Tests Ordered section with checked checkboxes: ☑ Hemoglobin A1c (HbA1c), ☑ Fasting Glucose, ☑ Lipid Panel (Total Cholesterol, LDL, HDL, Triglycerides). Clinical Indication: "Preventive screening per Canadian clinical guidelines. Patient is asymptomatic. No family physician on record." Patient Instructions: Bring this form to any LifeLabs, Fast for 10-12 hours, Drink water normally, Bring BC Services Card or photo ID. Nearest LifeLabs Locations: 3 locations with addresses and phone numbers. Bottom horizontal rule. Clinical, formal, monospaced feel.
```

---

## Prompt 5: Results Page — Yellow/Borderline (Margaret)

```
Add a new screen: Results Page for a patient with borderline/yellow results. This is the most important screen in the app. The patient is Margaret Johnson, 55, female, from Victoria BC.

Blue header bar. Small light blue notification banner at top of page: "Your results were interpreted using Canadian clinical guidelines (Diabetes Canada, CCS). For health questions, call 8-1-1 (HealthLink BC)."

Page heading: "Your Screening Results — March 28, 2026"

Results Table in a white card. 5 rows, each with four columns: Test name, Your Result, Status badge, Reference Range. Use traffic-light colored badges:
- HbA1c: 6.3% — amber "Borderline" badge (#F8BB47 background) — Reference: < 6.0% normal
- Fasting Glucose: 6.4 mmol/L — amber "Borderline" badge — Reference: < 6.1 normal
- Total Cholesterol: 6.1 mmol/L — amber "Borderline High" badge — Reference: < 5.2 desirable
- LDL Cholesterol: 4.2 mmol/L — amber "Borderline High" badge — Reference: < 3.5 desirable
- HDL Cholesterol: 1.4 mmol/L — green "Normal" badge (#42814A background) — Reference: > 1.0 desirable
Each row has a small expand/accordion arrow on the right for more details.

Below the table: Cardiovascular Risk Score card with amber/gold background (#FEF1D8). Heading: "Your Cardiovascular Risk Score". Large text: "12% (Intermediate Risk)". Subtext: "Based on: age 55, female, non-smoker, BP 128/82, total cholesterol 6.1, HDL 1.4." Explanation paragraph: "This means you have approximately a 12% chance of a cardiovascular event in the next 10 years. This is in the intermediate range. It may be a good idea to speak with a doctor about whether cholesterol medication is appropriate for you."

Below that: AI Health Summary in a white card with a subtle blue left border (#255A90). Heading: "Your Personalized Health Summary". Plain-language text written as if speaking to Margaret directly: "Hi Margaret, here are your ScreenBC screening results." Two subheadings: "Blood Sugar" — explains her HbA1c of 6.3% means pre-diabetes, that lifestyle changes can reduce diabetes risk by 58%, mentions diet and exercise, says to consider booking at a walk-in clinic to discuss but this is not an emergency, rescreen in 6 months. Links to Diabetes Canada prediabetes page (diabetes.ca/about-diabetes/prediabetes-1) and the Prediabetes Toolkit (diabetes.ca/recently-diagnosed/prediabetes-toolkit). "Cholesterol" — explains her LDL is borderline high and her intermediate Framingham score means she should discuss statin therapy with a doctor. Links to Heart & Stroke Foundation (heartandstroke.ca). Bullet-point next steps at the bottom. Small safety disclaimer: "This is not a diagnosis. If you feel unwell, call 8-1-1 or visit your nearest emergency department."

Below that: Follow-Up Chat section in a white card. Heading: "Have questions about your results?" Four suggested question chips in a horizontal row: "What foods should I avoid?" / "Is my cholesterol dangerous?" / "What does pre-diabetes mean?" / "Where can I see a doctor near me?" Below the chips: a text input field with placeholder "Ask a question about your results..." and a blue send button.

Below that: Next Steps card with amber background (#FEF1D8). Heading: "What to Do Next". Bullet points: "Your results suggest early risk that lifestyle changes can address" / "Review the resources linked in your summary above" / "Consider booking at a walk-in clinic to discuss (not urgent)" / "Your next screening is recommended in 6 months". Subheading: "Helpful Resources" with three links: "Diabetes Canada: Understanding Prediabetes (diabetes.ca/about-diabetes/prediabetes-1)" / "Heart & Stroke Foundation: Healthy Eating (heartandstroke.ca)" / "HealthLink BC: 8-1-1". Blue outlined "Print This Summary" button at the bottom.

Footer.
```

---

## Prompt 6: Results Page — Green/Normal (Sarah)

```
Add a new screen: Results Page for a patient where all results are normal/green. The patient is Sarah Chen, 52, female, from Victoria BC. Use the same design system and page structure as the previous results page.

Blue header bar. Small light blue notification banner at top: "Your results were interpreted using Canadian clinical guidelines (Diabetes Canada, CCS). For health questions, call 8-1-1 (HealthLink BC)."

Page heading: "Your Screening Results — March 28, 2026"

Results Table in a white card. 5 rows, same four-column layout (Test, Your Result, Status, Reference). All rows have green "Normal" badges (#42814A background, white text):
- HbA1c: 5.4% — green "Normal" badge — Reference: < 6.0% normal
- Fasting Glucose: 5.1 mmol/L — green "Normal" badge — Reference: < 6.1 normal
- Total Cholesterol: 4.8 mmol/L — green "Normal" badge — Reference: < 5.2 desirable
- LDL Cholesterol: 2.9 mmol/L — green "Normal" badge — Reference: < 3.5 desirable
- HDL Cholesterol: 1.6 mmol/L — green "Normal" badge — Reference: > 1.0 desirable
Each row has a small expand/accordion arrow.

Below the table: Cardiovascular Risk Score card with green background (#F6FFF8, green border). Heading: "Your Cardiovascular Risk Score". Large text: "4% (Low Risk)". Subtext: "Based on: age 52, female, non-smoker, BP 118/76, total cholesterol 4.8, HDL 1.6." Short explanation: "This means your 10-year cardiovascular risk is low. No medication is recommended. Keep up the good work."

Below that: AI Health Summary in a white card with a subtle green left border (#42814A). Heading: "Your Personalized Health Summary". Short and positive text: "Hi Sarah, great news — all of your screening results are within normal range. Your blood sugar and cholesterol levels are healthy. No action is needed at this time. Because you're at average risk, your next screening will be recommended in 3 years. We'll send you a reminder when it's time." Small safety disclaimer at the bottom.

No follow-up chat section (or show it collapsed/minimized with just the heading "Have questions?" and a small expand arrow).

Below that: Next Steps card with green background (#F6FFF8). Heading: "You're Up to Date". Text: "All your results are normal. Next screening recommended: March 2029. We'll send you a reminder when it's time." No clinic referral section. Blue outlined "Print This Summary" button. Clean, reassuring, brief.

Footer.
```

---

## Prompt 7: Results Page — Red/Abnormal (Robert)

```
Add a new screen: Results Page for a patient with abnormal/red results that need medical attention. The patient is Robert Kim, 63, male, from Abbotsford BC (postal code V2S). Use the same design system and page structure as the previous results pages.

Blue header bar. Small light blue notification banner at top: "Your results were interpreted using Canadian clinical guidelines (Diabetes Canada, CCS). For health questions, call 8-1-1 (HealthLink BC)."

Page heading: "Your Screening Results — March 28, 2026"

Results Table in a white card. 5 rows, same four-column layout (Test, Your Result, Status, Reference). Most rows have red "Needs Attention" badges (#CE3E39 background, white text):
- HbA1c: 7.1% — red "Needs Attention" badge — Reference: < 6.0% normal
- Fasting Glucose: 7.8 mmol/L — red "Needs Attention" badge — Reference: < 6.1 normal
- Total Cholesterol: 7.2 mmol/L — red "Needs Attention" badge — Reference: < 5.2 desirable
- LDL Cholesterol: 5.4 mmol/L — red "Needs Attention" badge — Reference: < 3.5 desirable
- HDL Cholesterol: 1.1 mmol/L — green "Normal" badge (#42814A) — Reference: > 1.0 desirable
Each row has a small expand/accordion arrow.

Below the table: Cardiovascular Risk Score card with red-tinted background (#F4E1E2, red border). Heading: "Your Cardiovascular Risk Score". Large text: "24% (High Risk)". Subtext: "Based on: age 63, male, former smoker, BP 145/92, total cholesterol 7.2, HDL 1.1, family history of heart disease." Explanation: "This means you have a 24% chance of a cardiovascular event in the next 10 years. This is in the high-risk range. Statin therapy is recommended. Please book a doctor's appointment to discuss treatment."

Below that: AI Health Summary in a white card with a subtle red left border (#CE3E39). Heading: "Your Personalized Health Summary". Text written in a more urgent but calm tone, addressed to Robert directly: "Hi Robert, some of your screening results need medical attention." Subheading "Blood Sugar": explains his HbA1c of 7.1% is in the diabetes range and needs confirmation and management by a doctor. Subheading "Cholesterol": explains his LDL of 5.4 mmol/L suggests possible familial hypercholesterolemia, that every person with this result should be on a statin, and that combined with his high Framingham score this is important to address soon. Reassuring note: "This is not an emergency, but it is important. These are treatable conditions." Bullet-point next steps. Small safety disclaimer at the bottom.

Below that: Follow-Up Chat section in a white card. Heading: "Have questions about your results?" Four suggested question chips: "What is familial hypercholesterolemia?" / "What does an HbA1c of 7.1 mean?" / "What will a doctor do next?" / "Where is the nearest UPCC?" Text input with send button.

Below that: Next Steps card with red-tinted background (#F4E1E2). Heading: "Important: Follow-Up Recommended". Text: "Some of your results need medical attention. Book an appointment at your nearest UPCC or walk-in clinic. Bring this summary with you." Subheading: "Care Options Near You (Abbotsford, BC)" listing 3 clinics: "1. Abbotsford UPCC | 34194 Marshall Rd | 604-851-4890" / "2. MSA Walk-In Clinic | 2040 McCallum Rd | 604-853-4514" / "3. Clearbrook Medical Clinic | 32660 George Ferguson Way | 604-853-3131". Links: "Find more locations: healthlinkbc.ca/primary-care/service-type/urgent-and-primary-care-centres" and "Or call 8-1-1 to speak with a nurse". Blue outlined "Print This Summary" button at the bottom. Tone is serious but not panic-inducing.

Footer.
```

---

## Prompt 8: Physician Console

```
Add a new screen: Physician Console dashboard. This is for the supervising doctor, not the patient.

Blue header bar with "ScreenBC — Physician Console" instead of just "ScreenBC".

Stats row — four white cards in a horizontal row: "Enrolled: 847" (blue number), "Screened: 123" (blue number), "Flagged: 18" (amber number), "Auto-cleared: 105" (green number).

Three alert cards stacked vertically, sorted by urgency:

Red card (white card with thick left border in red #CE3E39): "REVIEW — Robert Kim, 63, M". Details: "LDL: 5.4 mmol/L (possible familial hypercholesterolemia)", "HbA1c: 7.1% (diabetes range)". "AI Recommendation: Refer for statin + diabetes confirmation. Urgent but not emergency." Two buttons: outlined "Review Full Results" and blue "Mark as Reviewed".

Amber card (white card with thick left border in amber #F8BB47): "REVIEW — Margaret Johnson, 55, F". Details: "HbA1c: 6.3% (pre-diabetes range)", "LDL: 4.2 mmol/L (borderline high)", "Framingham: 12% (intermediate risk)". "AI Recommendation: Lifestyle counseling, rescreen 6 months". Two buttons: "Review Full Results" and "Approve Recommendations".

Green card (white card with thick left border in green #42814A): "AUTO-CLEARED — Sarah Chen, 52, F". "All results within normal range. Next screening: March 2029. No physician action required." No action buttons.

Coming Soon section: light gray card with dashed border. "Coming Soon: Kidney (CKD) Screening — Phase 2 will add creatinine/eGFR screening. Critical results will trigger immediate physician notification." Footer.
```

---

## Prompt 9: Impact Dashboard

```
Add a new screen: Impact Dashboard showing population-level data about why this program matters.

Blue header bar. Page heading: "Why ScreenBC Matters".

Three large stat cards in a horizontal row on white cards: "1M+" with subtitle "British Columbians without a family doctor", "18%" with subtitle "average unattached rate across 78 communities", "38.2%" with subtitle "unattached in Mission — the highest in BC" (this one highlighted in amber).

Full-width white card with a horizontal bar chart. Title: "Percentage Without a Family Doctor — Top 15 BC Communities". Bars colored from amber to red based on severity. Communities on y-axis: Mission, Sooke, East Kootenay, Snow Country, Prince George, etc. X-axis: 0% to 40%.

Full-width white card with a scatter plot. Title: "No Family Doctor vs. ER Visit Rate by Community". X-axis: "% Without Family Doctor". Y-axis: "ER Visits per 1,000 People". Dots for each community with a trend line showing positive correlation. A few notable communities labeled.

Punchline card with dark blue background (#013366) and white text. Large text: "Of 800 patients over 50 with no known diagnosis, 34% had abnormal results that a single blood test would have caught." Subtext: "BC did this for cancer. This is ScreenBC."

Footer.
```

---

## Prompt 10: Outreach Email

```
Design an HTML email notification for the ScreenBC program. This is what patients receive in their inbox to notify them they're due for screening.

Blue header bar (#013366) at top with "ScreenBC" in white text. White background body.

Greeting: "Hi Margaret,"

Body text: "Our records show that you don't currently have a family doctor and you may be overdue for basic preventive health screening. ScreenBC is a pilot program that screens for type 2 diabetes and high cholesterol — two conditions that develop silently and are easy to catch with a simple blood test. Getting screened is free and available at any LifeLabs location in British Columbia."

Large blue button: "Learn More and Enroll"

Small text below: "If you're not interested, no action is needed. This is a one-time notification."

Footer: "ScreenBC — Preventive Health Screening for British Columbians. A pilot program under Dr. [Name]."

Official, warm, simple. Like a government health notification email.
```

---

## Prompt 11 (Optional): Portal Status Variants

```
Show me three variants of the screening status card on the patient portal:

Variant 1 — Awaiting results: Light blue background (#F1F8FE). Text: "Your lab requisition has been generated. Visit any LifeLabs to complete your blood work. We'll notify you when results are ready." No action button.

Variant 2 — Results ready: White card with amber left border. Text: "Your screening results are ready." Button: "View Your Results →"

Variant 3 — Up to date: Green background (#F6FFF8). Text: "You're up to date. Next screening recommended: March 2029. We'll send you a reminder."
```

---

## Tips

- **Prompt 1 is the most important.** It sets the visual system. Spend time refining it before moving on.
- **Upload the BC Services Card screenshot** with Prompt 1 — Stitch can match the style from an image.
- **If colors drift** in later prompts, paste this reminder at the top: "Use the same design system: navy header #013366, gold accent #FCBA19, gray background #FAF9F8, green #42814A, amber #F8BB47, red #CE3E39."
- **Refine incrementally** — if something is off, make one small adjustment per follow-up ("Make the status badges larger" or "Add more whitespace between sections").
- **Export to Figma** after you're happy with each screen for final tweaks, or export as code for development reference.
