-- =====================================================
-- MEDICARE Test Patient Accounts
-- =====================================================
-- Creates test PATIENT users for development and testing
-- Password for all test patients: patient123
-- Hashed with bcryptjs (10 rounds)
-- =====================================================

-- Get admin ID for created_by field
SET @admin_id = (SELECT id FROM users WHERE username = 'superadmin' LIMIT 1);

-- =====================================================
-- Test Patient 1: Grade 10 student with medical records
-- =====================================================
INSERT INTO users (id, username, password, role, first_name, last_name, middle_name, email, is_active)
VALUES (
  UUID(),
  'patient1',
  '$2b$10$E.urA8dn7l8bTNiHwSOYuu2RV31MkRkTCxkrcbITITpMk1og2P58u',
  'PATIENT',
  'Test',
  'Patient',
  'One',
  'patient1@test.local',
  TRUE
);

SET @patient1_user_id = (SELECT id FROM users WHERE username = 'patient1');

INSERT INTO students (
  id,
  user_id,
  lrn,
  student_number,
  date_of_birth,
  age,
  sex,
  grade_level,
  section,
  address,
  parent_guardian_name,
  parent_guardian_contact,
  bmi,
  health_history,
  created_by_id
)
VALUES (
  UUID(),
  @patient1_user_id,
  '999999999001',
  'TEST-PATIENT-001',
  '2008-01-15',
  16,
  'MALE',
  '10',
  'A',
  '123 Test Street, Test City, Test Province',
  'Test Parent One',
  '09991234567',
  20.5,
  'No known allergies',
  @admin_id
);

-- Add sample medical records for patient1
SET @patient1_student_id = (SELECT id FROM students WHERE lrn = '999999999001');

INSERT INTO medical_records (
  id,
  student_id,
  visit_date,
  chief_complaint,
  diagnosis,
  treatment,
  notes,
  disease_category,
  illness_type,
  severity,
  recorded_by_id
)
VALUES
  (
    UUID(),
    @patient1_student_id,
    CURDATE() - INTERVAL 7 DAY,
    'Headache and dizziness',
    'Tension Headache',
    'Rest, hydration, paracetamol 500mg',
    'Advised to return if symptoms persist beyond 48 hours',
    'Headache',
    'Other',
    'MILD',
    @admin_id
  ),
  (
    UUID(),
    @patient1_student_id,
    CURDATE() - INTERVAL 14 DAY,
    'Runny nose, sneezing, mild fever',
    'Upper Respiratory Infection (Common Cold)',
    'Vitamin C, rest, increase fluid intake',
    'No antibiotic needed. Symptomatic treatment only.',
    'Common Cold',
    'Viral',
    'MILD',
    @admin_id
  );

-- =====================================================
-- Test Patient 2: Grade 12 student without medical records
-- =====================================================
INSERT INTO users (id, username, password, role, first_name, last_name, middle_name, email, is_active)
VALUES (
  UUID(),
  'patient2',
  '$2b$10$E.urA8dn7l8bTNiHwSOYuu2RV31MkRkTCxkrcbITITpMk1og2P58u',
  'PATIENT',
  'Test',
  'Patient',
  'Two',
  'patient2@test.local',
  TRUE
);

SET @patient2_user_id = (SELECT id FROM users WHERE username = 'patient2');

INSERT INTO students (
  id,
  user_id,
  lrn,
  student_number,
  date_of_birth,
  age,
  sex,
  grade_level,
  section,
  address,
  parent_guardian_name,
  parent_guardian_contact,
  bmi,
  health_history,
  created_by_id
)
VALUES (
  UUID(),
  @patient2_user_id,
  '999999999002',
  'TEST-PATIENT-002',
  '2006-05-20',
  18,
  'FEMALE',
  '12',
  'B',
  '456 Test Avenue, Test City, Test Province',
  'Test Parent Two',
  '09991234568',
  19.8,
  'Asthma (controlled with inhaler)',
  @admin_id
);

-- =====================================================
-- Verification: Display created test accounts
-- =====================================================
SELECT
  '=== Test Patient Accounts Created ===' AS message;

SELECT
  u.username AS 'Username',
  'patient123' AS 'Password',
  u.role AS 'Role',
  CONCAT(u.first_name, ' ', u.middle_name, ' ', u.last_name) AS 'Full Name',
  u.email AS 'Email',
  s.student_number AS 'Student Number',
  CONCAT('Grade ', s.grade_level, ' - Section ', s.section) AS 'Grade/Section',
  s.lrn AS 'LRN',
  (SELECT COUNT(*) FROM medical_records WHERE student_id = s.id) AS 'Medical Records'
FROM users u
LEFT JOIN students s ON u.id = s.user_id
WHERE u.username IN ('patient1', 'patient2')
ORDER BY u.username;

SELECT
  '=== Test Patient Login Instructions ===' AS message;

SELECT
  'Use these credentials to test the Patient Portal:' AS instruction
UNION ALL
SELECT '  • Username: patient1, Password: patient123 (has 2 medical records)'
UNION ALL
SELECT '  • Username: patient2, Password: patient123 (no medical records yet)'
UNION ALL
SELECT ''
UNION ALL
SELECT 'After login, navigate to: http://localhost:3000/patient-portal';
