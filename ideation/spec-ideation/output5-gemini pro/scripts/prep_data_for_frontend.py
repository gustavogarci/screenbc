import pandas as pd
import json
import os
import math

# ==============================================================================
# CheckUp BC - Data Prep Script for Frontend
# Run this script to convert the heavy hackathon CSV/Excel files into a clean, 
# nested JSON array that the Next.js frontend can import directly.
# ==============================================================================

def prep_data():
    print("🔄 Loading Hackathon Data...")
    
    # Paths to the raw data
    base_dir = "../Data Sources for Hackathon/hackathon-data/track-1-clinical-ai/synthea-patients"
    patients_path = os.path.join(base_dir, "patients.xlsx")
    labs_path = os.path.join(base_dir, "lab_results.csv")
    
    # Check if data exists
    if not os.path.exists(patients_path):
        print(f"❌ Could not find {patients_path}. Make sure you are running this from the scripts folder.")
        return

    # Load data
    patients_df = pd.read_excel(patients_path)
    labs_df = pd.read_csv(labs_path)
    
    # Filter for patients 50+ (our target demographic for screening)
    # Assuming the current year is roughly 2026 based on the hackathon context
    patients_df['age'] = 2026 - pd.to_datetime(patients_df['BIRTHDATE']).dt.year
    target_patients = patients_df[patients_df['age'] >= 50].copy()
    
    # We only need a sample for the demo (let's take 50 realistic patients)
    target_patients = target_patients.head(50)
    
    print(f"📊 Processing {len(target_patients)} target patients...")
    
    mock_db = []
    
    for _, patient in target_patients.iterrows():
        patient_id = patient['Id']
        
        # Get labs for this patient
        patient_labs = labs_df[labs_df['PATIENT'] == patient_id]
        
        # Format labs cleanly
        clean_labs = []
        for _, lab in patient_labs.iterrows():
            # Clean up NaN values for JSON serialization
            val = lab['VALUE']
            if pd.isna(val):
                continue
                
            clean_labs.append({
                "date": str(lab['DATE']),
                "test_code": str(lab['CODE']),
                "description": str(lab['DESCRIPTION']),
                "value": float(val),
                "units": str(lab['UNITS']) if not pd.isna(lab['UNITS']) else "",
            })
            
        # Build the nested JSON object for the frontend
        patient_record = {
            "id": str(patient_id),
            "phn": str(patient.get('SSN', '000-000-000')), # Mocking PHN using SSN field
            "first_name": str(patient['FIRST']),
            "last_name": str(patient['LAST']),
            "dob": str(patient['BIRTHDATE'])[:10],
            "age": int(patient['age']),
            "gender": str(patient['GENDER']),
            "city": str(patient['CITY']),
            "is_unattached": True, # Forcing to True for our use case
            "labs": clean_labs
        }
        
        mock_db.append(patient_record)

    # Save to JSON
    output_path = "../mock_database.json"
    with open(output_path, "w") as f:
        json.dump(mock_db, f, indent=2)
        
    print(f"✅ Success! Wrote {len(mock_db)} patients and their lab histories to {output_path}")
    print("The frontend developer can now simply do: `import mockDb from './mock_database.json'`")

if __name__ == "__main__":
    prep_data()
