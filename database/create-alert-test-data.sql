-- Test Medical Records for Alert System Testing
-- Creates 31 medical records across 7 diseases from the past week
-- User will manually adjust thresholds to trigger alerts

-- Get IDs for insertion
SET @student_id = (SELECT id FROM students ORDER BY created_at DESC LIMIT 1);
SET @admin_id = (SELECT id FROM users WHERE role = 'SUPER_ADMIN' LIMIT 1);

-- Define date range (past 7 days)
SET @today = CURDATE();
SET @day1 = DATE_SUB(@today, INTERVAL 1 DAY);
SET @day2 = DATE_SUB(@today, INTERVAL 2 DAY);
SET @day3 = DATE_SUB(@today, INTERVAL 3 DAY);
SET @day4 = DATE_SUB(@today, INTERVAL 4 DAY);
SET @day5 = DATE_SUB(@today, INTERVAL 5 DAY);
SET @day6 = DATE_SUB(@today, INTERVAL 6 DAY);

-- Insert records for each disease
-- Chicken Pox (4 records)
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, disease_category, severity, recorded_by_id)
VALUES
  (UUID(), @student_id, @day1, 'Itchy rash and blisters', 'Chicken Pox', 'Chicken Pox', 'MODERATE', @admin_id),
  (UUID(), @student_id, @day2, 'Red spots on skin', 'Chicken Pox', 'Chicken Pox', 'MILD', @admin_id),
  (UUID(), @student_id, @day3, 'Fever with rash', 'Chicken Pox', 'Chicken Pox', 'MODERATE', @admin_id),
  (UUID(), @student_id, @day4, 'Blisters and itching', 'Chicken Pox', 'Chicken Pox', 'MILD', @admin_id);

-- Cough (9 records)
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, disease_category, severity, recorded_by_id)
VALUES
  (UUID(), @student_id, @day1, 'Persistent dry cough', 'Cough', 'Cough', 'MILD', @admin_id),
  (UUID(), @student_id, @day1, 'Coughing fits', 'Cough', 'Cough', 'MODERATE', @admin_id),
  (UUID(), @student_id, @day2, 'Productive cough', 'Cough', 'Cough', 'MILD', @admin_id),
  (UUID(), @student_id, @day2, 'Sore throat and cough', 'Cough', 'Cough', 'MILD', @admin_id),
  (UUID(), @student_id, @day3, 'Night cough', 'Cough', 'Cough', 'MODERATE', @admin_id),
  (UUID(), @student_id, @day4, 'Chest congestion with cough', 'Cough', 'Cough', 'MODERATE', @admin_id),
  (UUID(), @student_id, @day5, 'Dry cough', 'Cough', 'Cough', 'MILD', @admin_id),
  (UUID(), @student_id, @day5, 'Cough with phlegm', 'Cough', 'Cough', 'MILD', @admin_id),
  (UUID(), @student_id, @day6, 'Severe coughing', 'Cough', 'Cough', 'SEVERE', @admin_id);

-- COVID-19 (1 record)
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, disease_category, severity, recorded_by_id)
VALUES
  (UUID(), @student_id, @day1, 'Fever, cough, loss of smell', 'COVID-19', 'COVID-19', 'MODERATE', @admin_id);

-- Dengue (2 records)
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, disease_category, severity, recorded_by_id)
VALUES
  (UUID(), @student_id, @day2, 'High fever and joint pain', 'Dengue fever', 'Dengue', 'SEVERE', @admin_id),
  (UUID(), @student_id, @day3, 'Severe headache and rash', 'Dengue fever', 'Dengue', 'SEVERE', @admin_id);

-- Diarrhea (4 records)
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, disease_category, severity, recorded_by_id)
VALUES
  (UUID(), @student_id, @day1, 'Frequent loose stools', 'Diarrhea', 'Diarrhea', 'MILD', @admin_id),
  (UUID(), @student_id, @day2, 'Watery diarrhea', 'Diarrhea', 'Diarrhea', 'MODERATE', @admin_id),
  (UUID(), @student_id, @day3, 'Stomach cramps with diarrhea', 'Diarrhea', 'Diarrhea', 'MODERATE', @admin_id),
  (UUID(), @student_id, @day4, 'Severe diarrhea', 'Diarrhea', 'Diarrhea', 'SEVERE', @admin_id);

-- Fever (7 records)
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, disease_category, severity, recorded_by_id)
VALUES
  (UUID(), @student_id, @day1, 'High fever', 'Fever', 'Fever', 'MODERATE', @admin_id),
  (UUID(), @student_id, @day1, 'Fever with chills', 'Fever', 'Fever', 'MODERATE', @admin_id),
  (UUID(), @student_id, @day2, 'Persistent fever', 'Fever', 'Fever', 'SEVERE', @admin_id),
  (UUID(), @student_id, @day3, 'Low-grade fever', 'Fever', 'Fever', 'MILD', @admin_id),
  (UUID(), @student_id, @day4, 'Fever and body aches', 'Fever', 'Fever', 'MODERATE', @admin_id),
  (UUID(), @student_id, @day5, 'High fever', 'Fever', 'Fever', 'SEVERE', @admin_id),
  (UUID(), @student_id, @day6, 'Intermittent fever', 'Fever', 'Fever', 'MILD', @admin_id);

-- Flu (4 records)
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, disease_category, severity, recorded_by_id)
VALUES
  (UUID(), @student_id, @day2, 'Flu symptoms', 'Influenza', 'Flu', 'MODERATE', @admin_id),
  (UUID(), @student_id, @day3, 'Fever, cough, body aches', 'Influenza', 'Flu', 'MODERATE', @admin_id),
  (UUID(), @student_id, @day4, 'Flu-like illness', 'Influenza', 'Flu', 'MILD', @admin_id),
  (UUID(), @student_id, @day5, 'Severe flu', 'Influenza', 'Flu', 'SEVERE', @admin_id);

-- Verification query (commented out - run separately to verify)
-- SELECT disease_category, COUNT(*) as count, MIN(visit_date) as earliest_date, MAX(visit_date) as latest_date
-- FROM medical_records
-- WHERE visit_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
-- GROUP BY disease_category
-- ORDER BY count DESC;
