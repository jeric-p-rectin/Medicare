-- =====================================================
-- MEDICARE School Clinic - REDUCED Test Data
-- Simplified dataset for manual alert testing
-- =====================================================
--
-- PREREQUISITES:
-- 1. Run schema.sql first to create table structure
-- 2. Run seed.sql to create sections and superadmin user
--
-- PURPOSE:
-- Reduced test data focused on 3 key diseases for manual alert testing
--
-- DATASET SIZE:
-- - 15 students (distributed across grades 7-12)
-- - 46 medical records (21 recent + 25 historical)
-- - 3 diseases for alerts: Headache, Flu, Dengue
--
-- EXPECTED ALERTS (when triggered manually):
-- - 1 CRITICAL alert: Headache (12 cases, threshold: 10)
-- - 2 HIGH alerts: Flu (6 cases, threshold: 5), Dengue (3 cases, threshold: 3)
--

-- =====================================================
-- Admin User for Recording Medical Records
-- =====================================================
INSERT INTO users (id, username, password, role, first_name, last_name, middle_name, email, is_active)
VALUES
  (UUID(), 'nurseadmin', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'ADMIN', 'Maria', 'Santos', 'Reyes', 'nurse.admin@school.edu.ph', TRUE);

SET @admin_id = (SELECT id FROM users WHERE username = 'nurseadmin');

-- =====================================================
-- GRADE 7 STUDENTS (3 students)
-- =====================================================
INSERT INTO users (id, username, password, role, first_name, last_name, middle_name, email, is_active)
VALUES
  (UUID(), 'miguel2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Miguel', 'Santos', 'Cruz', NULL, TRUE),
  (UUID(), 'sofia2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Sofia', 'Reyes', 'Garcia', NULL, TRUE),
  (UUID(), 'gabriel2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Gabriel', 'Mendoza', 'Torres', NULL, TRUE);

SET @miguel_id = (SELECT id FROM users WHERE username = 'miguel2024');
SET @sofia_id = (SELECT id FROM users WHERE username = 'sofia2024');
SET @gabriel_id = (SELECT id FROM users WHERE username = 'gabriel2024');

INSERT INTO students (id, user_id, lrn, student_number, date_of_birth, age, sex, grade_level, section, address, parent_guardian_name, parent_guardian_contact, bmi, health_history, created_by_id)
VALUES
  (UUID(), @miguel_id, '123456789012', '2024-001234', '2011-03-15', 13, 'MALE', '7', 'A', '123 Rizal Avenue, Manila', 'Juan Santos', '09171234567', 18.5, NULL, @admin_id),
  (UUID(), @sofia_id, '123456789013', '2024-001235', '2011-07-20', 13, 'FEMALE', '7', 'B', '456 Bonifacio St, Quezon City', 'Rosa Reyes', '09181234567', 19.0, NULL, @admin_id),
  (UUID(), @gabriel_id, '123456789014', '2024-001236', '2011-05-10', 13, 'MALE', '7', 'A', '789 Luna St, Makati', 'Carlos Mendoza', '09191234567', 19.5, NULL, @admin_id);

-- =====================================================
-- GRADE 8 STUDENTS (3 students)
-- =====================================================
INSERT INTO users (id, username, password, role, first_name, last_name, middle_name, email, is_active)
VALUES
  (UUID(), 'diego2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Diego', 'Morales', 'Gomez', NULL, TRUE),
  (UUID(), 'valentina2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Valentina', 'Lopez', 'Hernandez', NULL, TRUE),
  (UUID(), 'lucas2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Lucas', 'Ramos', 'Silva', NULL, TRUE);

SET @diego_id = (SELECT id FROM users WHERE username = 'diego2024');
SET @valentina_id = (SELECT id FROM users WHERE username = 'valentina2024');
SET @lucas_id = (SELECT id FROM users WHERE username = 'lucas2024');

INSERT INTO students (id, user_id, lrn, student_number, date_of_birth, age, sex, grade_level, section, address, parent_guardian_name, parent_guardian_contact, bmi, health_history, created_by_id)
VALUES
  (UUID(), @diego_id, '123456789018', '2024-002134', '2010-06-18', 14, 'MALE', '8', 'A', '147 Taft Ave, Pasay', 'Antonio Morales', '09231234567', 20.3, NULL, @admin_id),
  (UUID(), @valentina_id, '123456789019', '2024-002135', '2010-09-12', 14, 'FEMALE', '8', 'B', '258 EDSA, Mandaluyong', 'Gloria Lopez', '09241234567', 19.1, NULL, @admin_id),
  (UUID(), @lucas_id, '123456789020', '2024-002136', '2010-04-20', 14, 'MALE', '8', 'A', '369 Quezon Ave, QC', 'Fernando Ramos', '09251234567', 21.5, NULL, @admin_id);

-- =====================================================
-- GRADE 9 STUDENTS (3 students)
-- =====================================================
INSERT INTO users (id, username, password, role, first_name, last_name, middle_name, email, is_active)
VALUES
  (UUID(), 'andres2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Andres', 'Navarro', 'Ramirez', NULL, TRUE),
  (UUID(), 'luna2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Luna', 'Gutierrez', 'Flores', NULL, TRUE),
  (UUID(), 'santiago2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Santiago', 'Herrera', 'Rivera', NULL, TRUE);

SET @andres_id = (SELECT id FROM users WHERE username = 'andres2024');
SET @luna_id = (SELECT id FROM users WHERE username = 'luna2024');
SET @santiago_id = (SELECT id FROM users WHERE username = 'santiago2024');

INSERT INTO students (id, user_id, lrn, student_number, date_of_birth, age, sex, grade_level, section, address, parent_guardian_name, parent_guardian_contact, bmi, health_history, created_by_id)
VALUES
  (UUID(), @andres_id, '123456789024', '2024-003134', '2009-03-10', 15, 'MALE', '9', 'B', '159 Espana Blvd, Manila', 'Pedro Navarro', '09291234567', 20.8, NULL, @admin_id),
  (UUID(), @luna_id, '123456789025', '2024-003135', '2009-07-22', 15, 'FEMALE', '9', 'C', '267 Magsaysay Ave, QC', 'Elena Gutierrez', '09301234567', 19.4, NULL, @admin_id),
  (UUID(), @santiago_id, '123456789026', '2024-003136', '2009-11-05', 15, 'MALE', '9', 'B', '378 Recto Ave, Manila', 'Jose Herrera', '09311234567', 21.2, NULL, @admin_id);

-- =====================================================
-- GRADE 10 STUDENTS (2 students)
-- =====================================================
INSERT INTO users (id, username, password, role, first_name, last_name, middle_name, email, is_active)
VALUES
  (UUID(), 'nicolas2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Nicolas', 'Medina', 'Solis', NULL, TRUE),
  (UUID(), 'aria2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Aria', 'Pena', 'Ortega', NULL, TRUE);

SET @nicolas_id = (SELECT id FROM users WHERE username = 'nicolas2024');
SET @aria_id = (SELECT id FROM users WHERE username = 'aria2024');

INSERT INTO students (id, user_id, lrn, student_number, date_of_birth, age, sex, grade_level, section, address, parent_guardian_name, parent_guardian_contact, bmi, health_history, created_by_id)
VALUES
  (UUID(), @nicolas_id, '123456789030', '2024-004134', '2008-04-12', 16, 'MALE', '10', 'A', '713 C5 Road, Taguig', 'Ricardo Medina', '09351234567', 21.5, NULL, @admin_id),
  (UUID(), @aria_id, '123456789031', '2024-004135', '2008-08-18', 16, 'FEMALE', '10', 'C', '824 Pasong Tamo, Makati', 'Luz Pena', '09361234567', 19.6, NULL, @admin_id);

-- =====================================================
-- GRADE 11 STUDENTS (2 students)
-- =====================================================
INSERT INTO users (id, username, password, role, first_name, last_name, middle_name, email, is_active)
VALUES
  (UUID(), 'leo2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Leo', 'Cortez', 'Molina', NULL, TRUE),
  (UUID(), 'aurora2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Aurora', 'Campos', 'Villarreal', NULL, TRUE);

SET @leo_id = (SELECT id FROM users WHERE username = 'leo2024');
SET @aurora_id = (SELECT id FROM users WHERE username = 'aurora2024');

INSERT INTO students (id, user_id, lrn, student_number, date_of_birth, age, sex, grade_level, section, address, parent_guardian_name, parent_guardian_contact, bmi, health_history, created_by_id)
VALUES
  (UUID(), @leo_id, '123456789034', '2024-005134', '2007-02-08', 17, 'MALE', '11', 'B', '157 Ayala Ave, Makati', 'Alberto Cortez', '09391234567', 21.0, NULL, @admin_id),
  (UUID(), @aurora_id, '123456789035', '2024-005135', '2007-10-14', 17, 'FEMALE', '11', 'D', '268 Gil Puyat, Makati', 'Patricia Campos', '09401234567', 19.8, NULL, @admin_id);

-- =====================================================
-- GRADE 12 STUDENTS (2 students)
-- =====================================================
INSERT INTO users (id, username, password, role, first_name, last_name, middle_name, email, is_active)
VALUES
  (UUID(), 'pablo2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Pablo', 'Villegas', 'Carrillo', NULL, TRUE),
  (UUID(), 'clara2024', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'PATIENT', 'Clara', 'Bautista', 'Montoya', NULL, TRUE);

SET @pablo_id = (SELECT id FROM users WHERE username = 'pablo2024');
SET @clara_id = (SELECT id FROM users WHERE username = 'clara2024');

INSERT INTO students (id, user_id, lrn, student_number, date_of_birth, age, sex, grade_level, section, address, parent_guardian_name, parent_guardian_contact, bmi, health_history, created_by_id)
VALUES
  (UUID(), @pablo_id, '123456789038', '2024-006134', '2006-03-05', 18, 'MALE', '12', 'A', '591 Jupiter St, Makati', 'Eduardo Villegas', '09431234567', 21.8, NULL, @admin_id),
  (UUID(), @clara_id, '123456789039', '2024-006135', '2006-07-16', 18, 'FEMALE', '12', 'C', '602 Rockwell Dr, Makati', 'Angelica Bautista', '09441234567', 19.3, NULL, @admin_id);

-- Get all student IDs for medical records
SET @miguel_student_id = (SELECT id FROM students WHERE user_id = @miguel_id);
SET @sofia_student_id = (SELECT id FROM students WHERE user_id = @sofia_id);
SET @gabriel_student_id = (SELECT id FROM students WHERE user_id = @gabriel_id);
SET @diego_student_id = (SELECT id FROM students WHERE user_id = @diego_id);
SET @valentina_student_id = (SELECT id FROM students WHERE user_id = @valentina_id);
SET @lucas_student_id = (SELECT id FROM students WHERE user_id = @lucas_id);
SET @andres_student_id = (SELECT id FROM students WHERE user_id = @andres_id);
SET @luna_student_id = (SELECT id FROM students WHERE user_id = @luna_id);
SET @santiago_student_id = (SELECT id FROM students WHERE user_id = @santiago_id);
SET @nicolas_student_id = (SELECT id FROM students WHERE user_id = @nicolas_id);
SET @aria_student_id = (SELECT id FROM students WHERE user_id = @aria_id);
SET @leo_student_id = (SELECT id FROM students WHERE user_id = @leo_id);
SET @aurora_student_id = (SELECT id FROM students WHERE user_id = @aurora_id);
SET @pablo_student_id = (SELECT id FROM students WHERE user_id = @pablo_id);
SET @clara_student_id = (SELECT id FROM students WHERE user_id = @clara_id);

-- =====================================================
-- RECENT MEDICAL RECORDS (PAST 7 DAYS)
-- These will trigger alerts when checked manually
-- Total: 21 records
-- =====================================================

-- CRITICAL ALERT: Headache (12 cases, threshold: 10)
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, notes, disease_category, illness_type, severity, recorded_by_id)
VALUES
  -- Day -1 (2 cases)
  (UUID(), @miguel_student_id, CURDATE() - INTERVAL 1 DAY, 'Severe headache', 'Tension headache', 'Paracetamol 500mg, rest', NULL, 'Headache', 'Other', 'MILD', @admin_id),
  (UUID(), @sofia_student_id, CURDATE() - INTERVAL 1 DAY, 'Headache and dizziness', 'Migraine', 'Ibuprofen, cold compress', NULL, 'Headache', 'Other', 'MODERATE', @admin_id),
  -- Day -2 (2 cases)
  (UUID(), @gabriel_student_id, CURDATE() - INTERVAL 2 DAY, 'Throbbing headache', 'Tension headache', 'Paracetamol, rest in clinic', NULL, 'Headache', 'Other', 'MILD', @admin_id),
  (UUID(), @diego_student_id, CURDATE() - INTERVAL 2 DAY, 'Headache with nausea', 'Migraine', 'Ibuprofen, antiemetic', NULL, 'Headache', 'Other', 'MODERATE', @admin_id),
  -- Day -3 (2 cases)
  (UUID(), @valentina_student_id, CURDATE() - INTERVAL 3 DAY, 'Frontal headache', 'Sinus headache', 'Paracetamol, steam inhalation', NULL, 'Headache', 'Other', 'MILD', @admin_id),
  (UUID(), @lucas_student_id, CURDATE() - INTERVAL 3 DAY, 'Severe headache', 'Tension headache', 'Ibuprofen, rest', NULL, 'Headache', 'Other', 'MODERATE', @admin_id),
  -- Day -4 (2 cases)
  (UUID(), @andres_student_id, CURDATE() - INTERVAL 4 DAY, 'Severe headache', 'Cluster headache', 'Paracetamol, rest', NULL, 'Headache', 'Other', 'MODERATE', @admin_id),
  (UUID(), @luna_student_id, CURDATE() - INTERVAL 4 DAY, 'Headache with fatigue', 'Tension headache', 'Rest, hydration', NULL, 'Headache', 'Other', 'MILD', @admin_id),
  -- Day -5 (2 cases)
  (UUID(), @santiago_student_id, CURDATE() - INTERVAL 5 DAY, 'Throbbing headache', 'Migraine', 'Ibuprofen, dark room rest', NULL, 'Headache', 'Other', 'MODERATE', @admin_id),
  (UUID(), @nicolas_student_id, CURDATE() - INTERVAL 5 DAY, 'Headache after exams', 'Stress headache', 'Paracetamol, counseling', NULL, 'Headache', 'Other', 'MILD', @admin_id),
  -- Day -6 (2 cases)
  (UUID(), @aria_student_id, CURDATE() - INTERVAL 6 DAY, 'Severe headache', 'Migraine', 'Paracetamol, rest', NULL, 'Headache', 'Other', 'MODERATE', @admin_id),
  (UUID(), @leo_student_id, CURDATE() - INTERVAL 6 DAY, 'Headache and neck pain', 'Tension headache', 'Ibuprofen, massage', NULL, 'Headache', 'Other', 'MILD', @admin_id);

-- HIGH ALERT: Flu (6 cases, threshold: 5)
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, notes, disease_category, illness_type, severity, recorded_by_id)
VALUES
  (UUID(), @aurora_student_id, CURDATE() - INTERVAL 1 DAY, 'Fever, cough, body aches', 'Influenza', 'Rest, fluids, paracetamol', NULL, 'Flu', 'Viral', 'MODERATE', @admin_id),
  (UUID(), @pablo_student_id, CURDATE() - INTERVAL 2 DAY, 'Flu symptoms, fatigue', 'Flu', 'Paracetamol, rest, hydration', NULL, 'Flu', 'Viral', 'MODERATE', @admin_id),
  (UUID(), @clara_student_id, CURDATE() - INTERVAL 3 DAY, 'Fever, cough, sore throat', 'Influenza A', 'Antiviral if needed, rest', NULL, 'Flu', 'Viral', 'SEVERE', @admin_id),
  (UUID(), @miguel_student_id, CURDATE() - INTERVAL 3 DAY, 'Cough, fever, weakness', 'Flu', 'Paracetamol, fluids, rest', NULL, 'Flu', 'Viral', 'MODERATE', @admin_id),
  (UUID(), @sofia_student_id, CURDATE() - INTERVAL 4 DAY, 'Body aches, fever, dry cough', 'Influenza', 'Rest, paracetamol, monitor', NULL, 'Flu', 'Viral', 'MODERATE', @admin_id),
  (UUID(), @gabriel_student_id, CURDATE() - INTERVAL 6 DAY, 'Fever with cough and headache', 'Flu', 'Paracetamol, rest', NULL, 'Flu', 'Viral', 'MODERATE', @admin_id);

-- HIGH ALERT: Dengue (3 cases, threshold: 3)
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, notes, disease_category, illness_type, severity, recorded_by_id)
VALUES
  (UUID(), @diego_student_id, CURDATE() - INTERVAL 1 DAY, 'High fever, joint pain, rash', 'Suspected dengue fever', 'CBC test ordered, hydration, monitor platelet count', 'Dengue NS1 test ordered', 'Dengue', 'Viral', 'SEVERE', @admin_id),
  (UUID(), @valentina_student_id, CURDATE() - INTERVAL 3 DAY, 'Fever, headache, muscle pain, rash', 'Dengue fever', 'Hospital referral, CBC monitoring', 'Platelet count low', 'Dengue', 'Viral', 'SEVERE', @admin_id),
  (UUID(), @lucas_student_id, CURDATE() - INTERVAL 5 DAY, 'High fever, body pain, petechiae', 'Suspected dengue', 'CBC test, hydration, close monitoring', 'Possible dengue hemorrhagic fever', 'Dengue', 'Viral', 'SEVERE', @admin_id);

-- =====================================================
-- HISTORICAL MEDICAL RECORDS (8-60 DAYS AGO)
-- These are outside the 7-day detection window
-- Purpose: Populate trend analysis
-- Total: 25 records
-- =====================================================
INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, notes, disease_category, illness_type, severity, recorded_by_id)
VALUES
  -- Common Cold (5 cases)
  (UUID(), @andres_student_id, CURDATE() - INTERVAL 10 DAY, 'Runny nose, sneezing', 'Common cold', 'Rest, fluids, decongestant', NULL, 'Common Cold', 'Viral', 'MILD', @admin_id),
  (UUID(), @luna_student_id, CURDATE() - INTERVAL 12 DAY, 'Cough and colds', 'Upper respiratory infection', 'Cough syrup, vitamin C', NULL, 'Common Cold', 'Viral', 'MILD', @admin_id),
  (UUID(), @santiago_student_id, CURDATE() - INTERVAL 15 DAY, 'Nasal congestion, sore throat', 'Common cold', 'Decongestant, throat lozenges', NULL, 'Common Cold', 'Viral', 'MILD', @admin_id),
  (UUID(), @nicolas_student_id, CURDATE() - INTERVAL 18 DAY, 'Sneezing, watery eyes', 'Allergic rhinitis', 'Antihistamine', NULL, 'Common Cold', 'Other', 'MILD', @admin_id),
  (UUID(), @aria_student_id, CURDATE() - INTERVAL 20 DAY, 'Runny nose', 'Common cold', 'Rest, fluids', NULL, 'Common Cold', 'Viral', 'MILD', @admin_id),

  -- Tonsillitis (3 cases)
  (UUID(), @leo_student_id, CURDATE() - INTERVAL 14 DAY, 'Sore throat, difficulty swallowing', 'Acute tonsillitis', 'Antibiotics, throat gargle', 'White patches on tonsils', 'Tonsillitis', 'Bacterial', 'MODERATE', @admin_id),
  (UUID(), @aurora_student_id, CURDATE() - INTERVAL 22 DAY, 'Throat pain, fever', 'Tonsillitis', 'Amoxicillin 500mg TID, gargle', NULL, 'Tonsillitis', 'Bacterial', 'MODERATE', @admin_id),
  (UUID(), @pablo_student_id, CURDATE() - INTERVAL 28 DAY, 'Severe sore throat', 'Acute tonsillitis', 'Antibiotics, pain relief', NULL, 'Tonsillitis', 'Bacterial', 'MODERATE', @admin_id),

  -- Stomach Ache (4 cases)
  (UUID(), @clara_student_id, CURDATE() - INTERVAL 11 DAY, 'Abdominal pain', 'Gastritis', 'Antacid, light meals', NULL, 'Stomach Ache', 'Other', 'MILD', @admin_id),
  (UUID(), @miguel_student_id, CURDATE() - INTERVAL 16 DAY, 'Stomach cramps', 'Indigestion', 'Antacid, rest', NULL, 'Stomach Ache', 'Other', 'MILD', @admin_id),
  (UUID(), @sofia_student_id, CURDATE() - INTERVAL 25 DAY, 'Upper abdominal pain', 'Dyspepsia', 'Antacid, avoid spicy food', NULL, 'Stomach Ache', 'Other', 'MILD', @admin_id),
  (UUID(), @gabriel_student_id, CURDATE() - INTERVAL 35 DAY, 'Cramping stomach pain', 'Gastroenteritis', 'ORS, rest', NULL, 'Stomach Ache', 'Bacterial', 'MODERATE', @admin_id),

  -- Fever (4 cases)
  (UUID(), @diego_student_id, CURDATE() - INTERVAL 13 DAY, 'High fever and weakness', 'Viral fever', 'Paracetamol, rest, hydration', 'Monitor temperature', 'Fever', 'Viral', 'MODERATE', @admin_id),
  (UUID(), @valentina_student_id, CURDATE() - INTERVAL 19 DAY, 'Fever with chills', 'Pyrexia', 'Paracetamol 500mg, fluids', NULL, 'Fever', 'Viral', 'MODERATE', @admin_id),
  (UUID(), @lucas_student_id, CURDATE() - INTERVAL 27 DAY, 'Low-grade fever', 'Viral infection', 'Paracetamol, monitor', NULL, 'Fever', 'Viral', 'MILD', @admin_id),
  (UUID(), @andres_student_id, CURDATE() - INTERVAL 40 DAY, 'Fever and body pain', 'Viral infection', 'Paracetamol, rest', NULL, 'Fever', 'Viral', 'MODERATE', @admin_id),

  -- Cough (3 cases)
  (UUID(), @luna_student_id, CURDATE() - INTERVAL 21 DAY, 'Dry cough', 'Upper respiratory infection', 'Cough syrup, hydration', NULL, 'Cough', 'Viral', 'MILD', @admin_id),
  (UUID(), @santiago_student_id, CURDATE() - INTERVAL 30 DAY, 'Persistent cough', 'Bronchitis', 'Cough suppressant, rest', NULL, 'Cough', 'Viral', 'MODERATE', @admin_id),
  (UUID(), @nicolas_student_id, CURDATE() - INTERVAL 45 DAY, 'Cough with phlegm', 'Common cold', 'Expectorant, fluids', NULL, 'Cough', 'Viral', 'MILD', @admin_id),

  -- Skin Infections (2 cases)
  (UUID(), @aria_student_id, CURDATE() - INTERVAL 24 DAY, 'Itchy rash on arms', 'Allergic dermatitis', 'Antihistamine cream, avoid allergen', NULL, 'Skin Infection', 'Other', 'MILD', @admin_id),
  (UUID(), @leo_student_id, CURDATE() - INTERVAL 38 DAY, 'Red rash, itching', 'Contact dermatitis', 'Hydrocortisone cream', NULL, 'Skin Infection', 'Other', 'MILD', @admin_id),

  -- Minor Injuries (3 cases)
  (UUID(), @aurora_student_id, CURDATE() - INTERVAL 17 DAY, 'Sprained ankle during PE', 'Ankle sprain', 'RICE protocol, pain relief', NULL, 'Minor Injury', 'Other', 'MODERATE', @admin_id),
  (UUID(), @pablo_student_id, CURDATE() - INTERVAL 33 DAY, 'Cut on hand', 'Laceration', 'Wound cleaning, bandage, tetanus check', NULL, 'Minor Injury', 'Other', 'MILD', @admin_id),
  (UUID(), @clara_student_id, CURDATE() - INTERVAL 50 DAY, 'Bruise from basketball', 'Contusion', 'Ice pack, rest', NULL, 'Minor Injury', 'Other', 'MILD', @admin_id),

  -- Other (1 case)
  (UUID(), @miguel_student_id, CURDATE() - INTERVAL 29 DAY, 'Nosebleed', 'Epistaxis', 'Nasal packing, head tilt forward', NULL, 'Other', 'Other', 'MILD', @admin_id);

-- =====================================================
-- VERIFICATION QUERIES (Run these to verify data)
-- =====================================================

-- Count students by grade (Expected: 15 students total)
-- SELECT grade_level, COUNT(*) as count
-- FROM students
-- GROUP BY grade_level
-- ORDER BY grade_level;

-- Count recent medical records by disease (Expected: 21 records)
-- SELECT disease_category, COUNT(*) as count
-- FROM medical_records
-- WHERE visit_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
-- GROUP BY disease_category
-- ORDER BY count DESC;

-- Count historical records (Expected: 25 records)
-- SELECT COUNT(*) as historical_count
-- FROM medical_records
-- WHERE visit_date < DATE_SUB(CURDATE(), INTERVAL 7 DAY);

-- Total medical records count (Expected: 46 records)
-- SELECT COUNT(*) as total_records FROM medical_records;

-- Verify which diseases meet alert thresholds (Expected: 3 diseases)
-- SELECT disease_category, COUNT(*) as cases
-- FROM medical_records
-- WHERE visit_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
-- GROUP BY disease_category
-- HAVING COUNT(*) >= (
--   CASE disease_category
--     WHEN 'Headache' THEN 10
--     WHEN 'Flu' THEN 5
--     WHEN 'Dengue' THEN 3
--     ELSE 999
--   END
-- )
-- ORDER BY cases DESC;

-- Count total users (Expected: 16 - superadmin + nurseadmin + 15 students)
-- SELECT role, COUNT(*) as count
-- FROM users
-- GROUP BY role;
