-- ============================================
-- DECEMBER 2025 MEDICAL RECORDS
-- ============================================

SET @admin_id = (SELECT id FROM users WHERE username = 'superadmin' LIMIT 1);

-- ============================================
-- Coughs and Colds (15 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-01', 'Coughing with nasal congestion', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-01', 'Persistent cough and runny nose', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-01', 'Sore throat with cough', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-01', 'Sore throat with cough', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-01', 'Sore throat with cough', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-02', 'Persistent cough and runny nose', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-02', 'Persistent cough and runny nose', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-02', 'Persistent cough and runny nose', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-02', 'Persistent cough and runny nose', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-02', 'Sore throat with cough', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-03', 'Sore throat with cough', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-03', 'Coughing with nasal congestion', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-03', 'Persistent cough and runny nose', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-03', 'Coughing with nasal congestion', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-03', 'Coughing with nasal congestion', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;

-- ============================================
-- HFMD (4 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-04', 'Mouth sores and skin rash', 'Hand, foot, and mouth disease', 'Supportive care, pain relief', 'HFMD', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-04', 'Mouth sores and skin rash', 'Hand, foot, and mouth disease', 'Supportive care, pain relief', 'HFMD', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-04', 'Painful mouth ulcers and fever', 'Hand, foot, and mouth disease', 'Supportive care, pain relief', 'HFMD', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-04', 'Mouth sores and skin rash', 'Hand, foot, and mouth disease', 'Supportive care, pain relief', 'HFMD', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;

-- ============================================
-- Chicken Pox (7 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-05', 'Fever with vesicular rash', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-05', 'Fever with vesicular rash', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-05', 'Itchy skin rash with blisters', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-05', 'Fever with vesicular rash', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-05', 'Itchy skin rash with blisters', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-06', 'Fever with vesicular rash', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-06', 'Fever with vesicular rash', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;

-- ============================================
-- Dengue (20 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-06', 'High fever with body aches', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-06', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-06', 'High fever with body aches', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-07', 'Fever, rash, and joint pain', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-07', 'High fever with body aches', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-07', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-07', 'High fever with body aches', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-08', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-08', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-08', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-08', 'High fever with body aches', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-08', 'Fever, rash, and joint pain', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-09', 'Fever, rash, and joint pain', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-09', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-09', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-09', 'Fever, rash, and joint pain', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-09', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-10', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-10', 'High fever with body aches', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-10', 'Fever, rash, and joint pain', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;

-- ============================================
-- Fever (7 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-10', 'High temperature', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-10', 'High temperature', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-11', 'Fever with chills', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-11', 'Fever with chills', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-11', 'Persistent fever', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-11', 'Fever with chills', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-12', 'High temperature', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;

-- ============================================
-- Diarrhea (6 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-12', 'Frequent loose stools', 'Gastroenteritis', 'Oral rehydration salts', 'Diarrhea', 'Bacterial', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-12', 'Diarrhea with abdominal pain', 'Gastroenteritis', 'Oral rehydration salts', 'Diarrhea', 'Bacterial', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-12', 'Diarrhea with abdominal pain', 'Gastroenteritis', 'Oral rehydration salts', 'Diarrhea', 'Bacterial', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-12', 'Diarrhea with abdominal pain', 'Gastroenteritis', 'Oral rehydration salts', 'Diarrhea', 'Bacterial', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-13', 'Frequent loose stools', 'Gastroenteritis', 'Oral rehydration salts', 'Diarrhea', 'Bacterial', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-13', 'Diarrhea with abdominal pain', 'Gastroenteritis', 'Oral rehydration salts', 'Diarrhea', 'Bacterial', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;

-- ============================================
-- Vomiting (7 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-13', 'Vomiting and weakness', 'Viral gastroenteritis', 'Anti-emetics, IV fluids', 'Vomiting', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-13', 'Persistent vomiting', 'Viral gastroenteritis', 'Anti-emetics, IV fluids', 'Vomiting', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-13', 'Vomiting and weakness', 'Viral gastroenteritis', 'Anti-emetics, IV fluids', 'Vomiting', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-14', 'Vomiting and weakness', 'Viral gastroenteritis', 'Anti-emetics, IV fluids', 'Vomiting', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-14', 'Persistent vomiting', 'Viral gastroenteritis', 'Anti-emetics, IV fluids', 'Vomiting', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-14', 'Nausea and vomiting', 'Viral gastroenteritis', 'Anti-emetics, IV fluids', 'Vomiting', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-14', 'Vomiting and weakness', 'Viral gastroenteritis', 'Anti-emetics, IV fluids', 'Vomiting', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;

-- ============================================
-- Headache (40 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-15', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-15', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-15', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-15', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-15', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-16', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-16', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-16', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-16', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-16', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-17', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-17', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-17', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-17', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-17', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-18', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-18', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-18', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-18', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-19', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-19', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-19', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-19', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-19', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-20', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-20', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-20', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-20', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-20', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-21', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-21', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-21', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-21', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-22', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-22', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-22', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-22', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-22', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-23', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-23', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;

-- ============================================
-- Flu (40 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-23', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-23', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-23', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-24', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-24', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-24', 'Flu-like symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-24', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-24', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-25', 'Flu-like symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-25', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-25', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-25', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-26', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-26', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-26', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-26', 'Flu-like symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-26', 'Flu-like symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-27', 'Flu-like symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-27', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-27', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-27', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-27', 'Flu-like symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-28', 'Flu-like symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-28', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-28', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-28', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-29', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-29', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-29', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-29', 'Flu-like symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-29', 'Flu-like symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-30', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-30', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-30', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-30', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-30', 'Flu-like symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-31', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-31', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-31', 'Flu-like symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2025-12-31', 'Flu-like symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;

