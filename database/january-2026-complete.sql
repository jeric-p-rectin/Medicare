-- ============================================
-- JANUARY 2026 MEDICAL RECORDS
-- ============================================

SET @admin_id = (SELECT id FROM users WHERE username = 'superadmin' LIMIT 1);

-- ============================================
-- Coughs and Colds (10 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-01', 'Persistent cough and runny nose', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-01', 'Persistent cough and runny nose', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-01', 'Coughing with nasal congestion', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-01', 'Persistent cough and runny nose', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-01', 'Coughing with nasal congestion', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-01', 'Persistent cough and runny nose', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-01', 'Coughing with nasal congestion', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-02', 'Coughing with nasal congestion', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-02', 'Coughing with nasal congestion', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-02', 'Persistent cough and runny nose', 'Upper respiratory infection', 'Rest, fluids, and decongestants', 'Coughs and Colds', 'Viral', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;

-- ============================================
-- HFMD (3 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-02', 'Mouth sores and skin rash', 'Hand, foot, and mouth disease', 'Supportive care, pain relief', 'HFMD', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-02', 'Painful mouth ulcers and fever', 'Hand, foot, and mouth disease', 'Supportive care, pain relief', 'HFMD', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-02', 'Mouth sores and skin rash', 'Hand, foot, and mouth disease', 'Supportive care, pain relief', 'HFMD', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;

-- ============================================
-- Chicken Pox (9 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-03', 'Widespread itchy rash', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-03', 'Widespread itchy rash', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-03', 'Itchy skin rash with blisters', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-03', 'Itchy skin rash with blisters', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-03', 'Itchy skin rash with blisters', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-03', 'Widespread itchy rash', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-04', 'Itchy skin rash with blisters', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-04', 'Widespread itchy rash', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-04', 'Itchy skin rash with blisters', 'Varicella', 'Antiviral medication, calamine lotion', 'Chicken Pox', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;

-- ============================================
-- Dengue (25 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-04', 'Fever, rash, and joint pain', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-04', 'Fever, rash, and joint pain', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-04', 'Fever, rash, and joint pain', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-04', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-05', 'Fever, rash, and joint pain', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-05', 'High fever with body aches', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-05', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-05', 'Fever, rash, and joint pain', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-05', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-05', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-06', 'High fever with body aches', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-06', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-06', 'High fever with body aches', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-06', 'Fever, rash, and joint pain', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-06', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-06', 'Fever, rash, and joint pain', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-07', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-07', 'Fever, rash, and joint pain', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-07', 'Fever, rash, and joint pain', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-07', 'High fever with body aches', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-07', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-07', 'High fever with body aches', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-07', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-08', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-08', 'Severe headache with fever', 'Dengue fever', 'IV fluids, monitoring', 'Dengue', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;

-- ============================================
-- Fever (15 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-08', 'High temperature', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-08', 'Fever with chills', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-08', 'High temperature', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-08', 'Persistent fever', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-09', 'High temperature', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-09', 'High temperature', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-09', 'Fever with chills', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-09', 'High temperature', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-09', 'Fever with chills', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-09', 'Persistent fever', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-10', 'Persistent fever', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-10', 'Fever with chills', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-10', 'Persistent fever', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-10', 'Persistent fever', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-10', 'Fever with chills', 'Viral fever', 'Antipyretics, rest', 'Fever', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;

-- ============================================
-- Diarrhea (6 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-10', 'Frequent loose stools', 'Gastroenteritis', 'Oral rehydration salts', 'Diarrhea', 'Bacterial', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-11', 'Frequent loose stools', 'Gastroenteritis', 'Oral rehydration salts', 'Diarrhea', 'Bacterial', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-11', 'Diarrhea with abdominal pain', 'Gastroenteritis', 'Oral rehydration salts', 'Diarrhea', 'Bacterial', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-11', 'Diarrhea with abdominal pain', 'Gastroenteritis', 'Oral rehydration salts', 'Diarrhea', 'Bacterial', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-11', 'Diarrhea with abdominal pain', 'Gastroenteritis', 'Oral rehydration salts', 'Diarrhea', 'Bacterial', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-11', 'Diarrhea with abdominal pain', 'Gastroenteritis', 'Oral rehydration salts', 'Diarrhea', 'Bacterial', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;

-- ============================================
-- Vomiting (2 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-11', 'Nausea and vomiting', 'Viral gastroenteritis', 'Anti-emetics, IV fluids', 'Vomiting', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-11', 'Persistent vomiting', 'Viral gastroenteritis', 'Anti-emetics, IV fluids', 'Vomiting', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;

-- ============================================
-- Headache (60 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-12', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-12', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-12', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-12', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-12', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-12', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-13', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-13', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-13', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-13', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-13', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-13', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-14', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-14', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-14', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-14', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-14', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-14', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-14', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-15', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-15', 'Tension headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-15', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-15', 'Tension headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-15', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-15', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-16', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-16', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-16', 'Tension headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-16', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-16', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-16', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-17', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-17', 'Tension headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-17', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-17', 'Tension headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-17', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-17', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-18', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-18', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-18', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-18', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-18', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-18', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-18', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-19', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-19', 'Tension headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-19', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-19', 'Tension headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-19', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-19', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-20', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-20', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-20', 'Migraine', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-20', 'Headache with dizziness', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-20', 'Severe headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-20', 'Tension headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-21', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-21', 'Persistent headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-21', 'Throbbing headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-21', 'Tension headache', 'Tension headache', 'Ibuprofen, rest', 'Headache', 'Other', 'MILD', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;

-- ============================================
-- Flu (65 records)
-- ============================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-21', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-21', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-21', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-22', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-22', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-22', 'Influenza symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-22', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-22', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-22', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-23', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-23', 'Influenza symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-23', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-23', 'Influenza symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-23', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-23', 'Influenza symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-24', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-24', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-24', 'Influenza symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-24', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-24', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-24', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-25', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-25', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-25', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-25', 'Influenza symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-25', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-25', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-25', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-26', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-26', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-26', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-26', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-26', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-26', 'Influenza symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-27', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-27', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-27', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-27', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-27', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-27', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-28', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-28', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-28', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-28', 'Influenza symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-28', 'Influenza symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-28', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-28', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-29', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-29', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-29', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-29', 'Influenza symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-29', 'Influenza symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '11' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-29', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-30', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-30', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-30', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-30', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-30', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-30', 'Influenza symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-31', 'Influenza symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-31', 'Body aches with fever', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-31', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '8' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-31', 'Flu symptoms - fever and chills', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-31', 'Fever, cough, body aches', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'SEVERE', @admin_id FROM students s WHERE s.grade_level = '12' ORDER BY RAND() LIMIT 1;
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)
SELECT UUID(), s.id, '2026-01-31', 'Influenza symptoms', 'Influenza', 'Antiviral medication, rest', 'Flu', 'Viral', 'MODERATE', @admin_id FROM students s WHERE s.grade_level = '7' ORDER BY RAND() LIMIT 1;

