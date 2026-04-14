# Research & Context for All Specs

This document contains shared research findings. Each spec references this file.

---

## Name Decision

**Do NOT use "CheckUp" or "Get Checked."** GetCheckedOnline (getcheckedonline.com) is the BCCDC's existing STI/HIV testing service. It also uses LifeLabs. Using a similar name would cause confusion and look unprofessional to BC healthcare judges.

### Recommended Name: **ScreenBC** (or "BC Health Screen")

Rationale:
- Follows the BC Cancer Screening naming convention ("BC Cancer Screening" → "BC Health Screen")
- "Screen" is the correct clinical term for what this does (preventive screening, not diagnostic testing)
- Short, memorable, works as a URL: `screenbc.ca`
- Avoids conflict with GetCheckedOnline
- Sounds provincial/official, which is the point

Alternative: **MyScreenBC** (more patient-centered, like "My eHealth" became "MyCareCompass")

---

## BC Cancer Screening Model (What We're Emulating)

BC Cancer runs 4 screening programs: breast, cervix, colon, and lung. The cervix self-screening program is the closest model to what we're building because **it doesn't require a family doctor.**

### How BC Cancer Cervix Self-Screening Works

1. **Eligibility check:** Ages 25-69, no Pap in 3 years or self-screen in 5 years
2. **Request a kit:** Online at kitrequest.bccancer.bc.ca OR by phone (1-877-702-6566). You can leave the "primary care provider" field blank if you don't have one.
3. **Do the test at home:** Swab kit, takes 20 seconds
4. **Mail it back:** Prepaid envelope to the lab
5. **Get results:** 4-6 weeks later. Mailed to you. Also available on Health Gateway.
6. **If abnormal:** Linked to a follow-up clinic in your community. You don't fall through the cracks.
7. **Recall:** BC Cancer tracks your screening history and sends reminders when you're due again.

### What We Steal from This Model

- **No doctor required** for eligibility, requisition, or normal results
- **Centralized tracking** — the program follows up, not the patient
- **Results on Health Gateway** — patients can access digitally
- **Automatic recall** — reminders sent when rescreening is due
- **Escalation path** — abnormals get connected to care, not left hanging
- **One supervising physician** can cover a population (not 1:1 doctor-patient)

### Key Difference for Our Service

BC Cancer sends physical kits. We generate **lab requisitions** that patients take to LifeLabs. LifeLabs already does blood work for GetCheckedOnline (STI), BC Cancer (colon FIT), and every GP in the province. The infrastructure is already there.

---

## BC Health Gateway (Design Reference)

### What Health Gateway Shows

- Lab results (back to 2020, available 2-3 days after test)
- Medications (from BC pharmacies, back to 1995)
- Immunization records (since 2009)
- Health visits (MSP-billed, past 7 years)
- Hospital visits (since 2021)
- BC Cancer screening letters (available digitally)
- Imaging reports

### Authentication

- BC Services Card app (digital ID)
- OR username + password + BC Token

### URL

healthgateway.gov.bc.ca (refreshed September 2025)

---

## BC Government Design System (Visual Reference)

Our prototype should look like a legitimate BC government health service. Here are the design tokens:

### Colors

| Token | Value | Usage |
|---|---|---|
| Primary Blue | `#013366` | Headers, primary buttons, nav bar |
| Primary Gold | `#FCBA19` | Accents, highlights, active states |
| Link Blue | `#255A90` | All hyperlinks |
| Background | `#FAF9F8` | Page background (light gray) |
| White | `#FFFFFF` | Cards, content areas |
| Text Primary | `#2D2D2D` | Body text |
| Text Secondary | `#474543` | Secondary text |
| Success Green | `#42814A` | Normal results, positive status |
| Danger Red | `#CE3E39` | Abnormal results, alerts |
| Warning Gold | `#F8BB47` | Borderline results, caution |
| Border Light | `#D8D8D8` | Card borders, dividers |
| Border Medium | `#898785` | Form field borders |
| Light Blue BG | `#F1F8FE` | Info cards, highlight sections |

### Typography

- **Font:** BC Sans (the mandatory BC government typeface)
- Fallback: `'BC Sans', 'Noto Sans', system-ui, -apple-system, sans-serif`
- For the hackathon, using system fonts or Inter/Geist Sans is fine — BC Sans requires downloading the font files

### Layout Principles

- Clean, accessible, high-contrast
- White cards on light gray background
- Blue header bar with gold accent
- Traffic-light status indicators (green/yellow/red)
- Generous whitespace, large click targets
- Mobile-responsive (many patients will use phones)

---

## Hackathon Data Available

All paths relative to `Data Sources for Hackathon/hackathon-data/`

### Track 1 — Clinical (Patient-Level)

| File | Path | Records | Key Columns |
|---|---|---|---|
| Patients | `track-1-clinical-ai/synthea-patients/patients.csv` | 2,000 | `patient_id`, `first_name`, `last_name`, `date_of_birth`, `age`, `sex`, `postal_code`, `blood_type`, `insurance_number` |
| Lab Results | `track-1-clinical-ai/synthea-patients/lab_results.csv` | 3,000 | `patient_id`, `test_name`, `test_code`, `value`, `unit`, `reference_range_low`, `reference_range_high`, `abnormal_flag`, `collected_date` |
| Encounters | `track-1-clinical-ai/synthea-patients/encounters.csv` | 10,000 | `patient_id`, `encounter_date`, `encounter_type`, `facility`, `chief_complaint`, `diagnosis_code`, `diagnosis_description`, `triage_level`, `disposition` |
| Medications | `track-1-clinical-ai/synthea-patients/medications.csv` | 5,000 | `patient_id`, `drug_name`, `drug_code`, `dosage`, `frequency`, `active`, `start_date`, `end_date` |
| Vitals | `track-1-clinical-ai/synthea-patients/vitals.csv` | 2,000 | `patient_id`, `heart_rate`, `systolic_bp`, `diastolic_bp`, `temperature_celsius`, `o2_saturation` |

### Screening-Relevant Lab Tests in the Data

| Test | LOINC Code | Count | Unit | Normal Range |
|---|---|---|---|---|
| HbA1c | 4548-4 | 257 | % | — |
| Fasting Glucose | 1558-6 | 270 | mmol/L | 3.9 – 6.1 |
| Total Cholesterol | 2093-3 | 256 | mmol/L | 3.5 – 5.2 |
| LDL Cholesterol | 2089-1 | 218 | mmol/L | 1.5 – 3.4 |
| Creatinine | 2160-0 | 237 | umol/L | 60 – 110 |

### Screening-Relevant Diagnoses

| Diagnosis | ICD-10 | Encounters |
|---|---|---|
| Type 2 diabetes | E11.9 | 862 |
| Essential hypertension | I10 | 976 |
| Hyperlipidemia | E78.5 | 59 |
| Calculus of kidney | N20.0 | 66 |

### Track 2 — Population Health

| File | Path | Records | Key Columns |
|---|---|---|---|
| BC Health Indicators | `track-2-population-health/bc-community-profiles/bc_health_indicators.csv` | 78 communities | `chsa_name`, `health_authority`, `population`, `median_age`, `pct_over_65`, `diabetes_prevalence`, `hypertension_prevalence`, `pct_without_family_doctor`, `er_visits_per_1000` |

### Communities with Highest Unattached Rates

| Community | Health Authority | No Doctor (%) | Diabetes (%) | ER/1000 |
|---|---|---|---|---|
| Mission | Fraser | 38.2% | 7.6% | 450 |
| Sooke | Island Health | 33.7% | 9.6% | 462 |
| East Kootenay | Interior | 31.7% | 11.3% | 331 |
| Snow Country | Northern | 29.8% | 12.5% | 331 |
| Prince George | Northern | 29.0% | 12.4% | 408 |

### Drug Reference

| File | Path | Records |
|---|---|---|
| Canadian Drug Reference | `shared/drug-database/canadian_drug_reference.csv` | 100 drugs with DIN, class, indication |

Key drugs for screening context: metformin (diabetes), atorvastatin/rosuvastatin (cholesterol), ramipril/lisinopril (hypertension/kidney protection).

---

## Clinical Screening Logic (Shared Across All Specs)

### Diabetes

| Test | Normal | Pre-diabetes | Diabetes |
|---|---|---|---|
| HbA1c | < 6.0% | 6.0 – 6.4% | ≥ 6.5% |
| Fasting Glucose | < 6.1 mmol/L | 6.1 – 6.9 mmol/L | ≥ 7.0 mmol/L |

**Who:** All adults 40+, every 3 years. More often with risk factors.
**Action if pre-diabetes:** Lifestyle counseling, rescreen 6 months.
**Action if diabetes:** Refer to UPCC for confirmation + management.

### Cholesterol

| Test | Desirable | Borderline | High |
|---|---|---|---|
| Total Cholesterol | < 5.2 mmol/L | 5.2 – 6.2 mmol/L | > 6.2 mmol/L |
| LDL Cholesterol | < 3.5 mmol/L | 3.5 – 4.9 mmol/L | ≥ 5.0 mmol/L |

**Who:** Men 40+, women 50+ (or post-menopausal). All adults once for familial hypercholesterolemia.
**If borderline:** Calculate Framingham Risk Score → low/intermediate/high.
**If LDL > 5.0:** Immediate referral (possible familial hypercholesterolemia).

### Kidney (CKD)

| Metric | Normal | Mildly Reduced | Moderate | Severe |
|---|---|---|---|---|
| eGFR (mL/min) | ≥ 90 | 60 – 89 | 30 – 59 | < 30 |

**eGFR calculation:** Use CKD-EPI formula from serum creatinine + age + sex.
**Who:** Everyone 50+, every 3 years. Earlier if diabetes/hypertension.
**If mildly reduced:** Rescreen 1 year, monitor BP.
**If moderate+:** Refer urgently.

### Framingham Risk Score (for cholesterol risk stratification)

**Inputs:** age, sex, total cholesterol, HDL (estimate from total if unavailable), systolic BP, smoking status, diabetes status.
**Output:** 10-year cardiovascular risk %.
- Low (< 10%): Lifestyle, rescreen 5 years.
- Intermediate (10-19%): Discuss statin, rescreen 1 year.
- High (≥ 20%): Statin recommended, refer.
