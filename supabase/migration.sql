-- ScreenBC: Create patients table and seed demo data
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

CREATE TABLE IF NOT EXISTS patients (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  age INTEGER NOT NULL,
  sex TEXT NOT NULL CHECK (sex IN ('M', 'F')),
  postal_code TEXT NOT NULL,
  phn TEXT NOT NULL,
  email TEXT NOT NULL,
  has_family_doctor BOOLEAN NOT NULL DEFAULT FALSE,
  consent_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  questionnaire_completed BOOLEAN NOT NULL DEFAULT FALSE,
  questionnaire JSONB DEFAULT NULL,
  screening_status TEXT NOT NULL DEFAULT 'due'
    CHECK (screening_status IN ('due', 'awaiting-results', 'results-ready', 'up-to-date')),
  lab_results JSONB DEFAULT NULL,
  framingham_risk JSONB DEFAULT NULL,
  cached_summary TEXT DEFAULT NULL
);

-- Seed 3 demo patients
INSERT INTO patients (id, first_name, last_name, date_of_birth, age, sex, postal_code, phn, email, has_family_doctor, consent_accepted, questionnaire_completed, questionnaire, screening_status, lab_results, framingham_risk, cached_summary)
VALUES
  ('PAT-001', 'Margaret', 'Johnson', '1971-01-20', 55, 'F', 'V8N 7P5', '8241 595 268', 'margaret.johnson.screenbc2026@gmail.com', FALSE, FALSE, FALSE, NULL, 'due', NULL, NULL, NULL),
  ('PAT-002', 'Sarah', 'Chen', '1974-06-15', 52, 'F', 'V9A 1K3', '9172 483 651', 'sarah.chen.screenbc2026@gmail.com', FALSE, FALSE, FALSE, NULL, 'due', NULL, NULL, NULL),
  ('PAT-003', 'Robert', 'Kim', '1963-03-08', 63, 'M', 'V2S 4N7', '7635 291 847', 'robert.kim.screenbc2026@gmail.com', FALSE, FALSE, FALSE, NULL, 'due', NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;
