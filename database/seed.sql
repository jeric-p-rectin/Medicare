-- =====================================================
-- MEDICARE School Clinic - Initial Data
-- Seed data for sections and super admin user
-- =====================================================

-- =====================================================
-- Sections for Grades 7-12 (Sections A, B, C, D)
-- =====================================================
INSERT INTO sections (id, grade_level, section_name) VALUES
  -- Grade 7
  (UUID(), '7', 'A'),
  (UUID(), '7', 'B'),
  (UUID(), '7', 'C'),
  (UUID(), '7', 'D'),

  -- Grade 8
  (UUID(), '8', 'A'),
  (UUID(), '8', 'B'),
  (UUID(), '8', 'C'),
  (UUID(), '8', 'D'),

  -- Grade 9
  (UUID(), '9', 'A'),
  (UUID(), '9', 'B'),
  (UUID(), '9', 'C'),
  (UUID(), '9', 'D'),

  -- Grade 10
  (UUID(), '10', 'A'),
  (UUID(), '10', 'B'),
  (UUID(), '10', 'C'),
  (UUID(), '10', 'D'),

  -- Grade 11
  (UUID(), '11', 'A'),
  (UUID(), '11', 'B'),
  (UUID(), '11', 'C'),
  (UUID(), '11', 'D'),

  -- Grade 12
  (UUID(), '12', 'A'),
  (UUID(), '12', 'B'),
  (UUID(), '12', 'C'),
  (UUID(), '12', 'D');

-- =====================================================
-- Super Admin User
-- Username: superadmin
-- Password: admin123 (bcrypt hashed)
-- =====================================================
-- Note: The password hash below is for "admin123"
-- Generated with: bcrypt.hash('admin123', 10)
INSERT INTO users (id, username, password, role, first_name, last_name, email, is_active) VALUES
  (UUID(), 'superadmin', '$2a$10$rOzWz8tHFZ1L1qF7x8qK4.vJxVqYQXqGqZ1hXkFqYvZQqZ1hXkFqY', 'SUPER_ADMIN', 'Super', 'Admin', 'admin@medicare.local', TRUE);

-- =====================================================
-- Verification Query
-- Run this to verify the seed data was inserted
-- =====================================================
-- SELECT COUNT(*) as section_count FROM sections;
-- Expected: 24 (6 grades × 4 sections)
--
-- SELECT username, role FROM users WHERE role = 'SUPER_ADMIN';
-- Expected: 1 row (superadmin)
