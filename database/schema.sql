-- =====================================================
-- MEDICARE School Clinic Database Schema
-- Based on FEATURES-2.0 Revised Plan
-- =====================================================

-- Drop existing tables if they exist
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS pending_actions;
DROP TABLE IF EXISTS duplicate_detections;
DROP TABLE IF EXISTS alerts;
DROP TABLE IF EXISTS medical_records;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS sections;
DROP TABLE IF EXISTS users;

-- =====================================================
-- Users Table (Super Admin, Admin, Patient)
-- =====================================================
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100),
  password VARCHAR(255) NOT NULL,
  role ENUM('SUPER_ADMIN', 'ADMIN', 'PATIENT') NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  middle_name VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Sections Table (Grades 7-12, Sections A-D)
-- =====================================================
CREATE TABLE sections (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  grade_level ENUM('7', '8', '9', '10', '11', '12') NOT NULL,
  section_name VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY unique_grade_section (grade_level, section_name),
  INDEX idx_grade (grade_level),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Students Table (Patient Records)
-- =====================================================
CREATE TABLE students (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) UNIQUE NOT NULL,

  -- Student Identification
  lrn VARCHAR(12) UNIQUE NOT NULL COMMENT 'Learner Reference Number',
  student_number VARCHAR(20) UNIQUE NOT NULL,

  -- Personal Information
  date_of_birth DATE NOT NULL,
  age INT NOT NULL,
  sex ENUM('MALE', 'FEMALE') NOT NULL,

  -- Academic Information
  grade_level ENUM('7', '8', '9', '10', '11', '12') NOT NULL,
  section VARCHAR(50) NOT NULL,
  school_year VARCHAR(9) NULL COMMENT 'e.g. 2025-2026',

  -- Contact Information
  address TEXT NOT NULL,
  parent_guardian_name VARCHAR(100) NOT NULL,
  parent_guardian_contact VARCHAR(15) NOT NULL,

  -- Medical Information
  bmi DECIMAL(5,2),
  health_history TEXT,

  -- System Fields
  created_by_id VARCHAR(36) NOT NULL,
  updated_by_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by_id) REFERENCES users(id),
  FOREIGN KEY (updated_by_id) REFERENCES users(id),

  INDEX idx_grade_section (grade_level, section),
  INDEX idx_lrn (lrn),
  INDEX idx_student_number (student_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Medical Records Table
-- =====================================================
CREATE TABLE medical_records (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  student_id VARCHAR(36) NOT NULL,

  -- Visit Information
  visit_date DATE NOT NULL,
  chief_complaint TEXT NOT NULL,
  diagnosis TEXT,
  treatment TEXT,
  notes TEXT,

  -- Disease/Illness Categorization for Statistics
  disease_category VARCHAR(100) COMMENT 'e.g., Flu, Dengue, Headache',
  illness_type VARCHAR(100) COMMENT 'e.g., Viral, Bacterial, Other',
  severity ENUM('MILD', 'MODERATE', 'SEVERE') DEFAULT 'MILD',
  is_outbreak_related BOOLEAN DEFAULT FALSE,

  -- System Fields
  recorded_by_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (recorded_by_id) REFERENCES users(id),

  INDEX idx_student (student_id),
  INDEX idx_visit_date (visit_date),
  INDEX idx_disease (disease_category, visit_date),
  INDEX idx_outbreak (is_outbreak_related, disease_category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Alerts Table (Special Feature: Alert System)
-- =====================================================
CREATE TABLE alerts (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  alert_type ENUM('OUTBREAK_SUSPECTED', 'DUPLICATE_DETECTED', 'SYSTEM', 'DISEASE_TREND') NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  severity ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL,

  -- Related Information
  related_disease VARCHAR(100),
  related_record_id VARCHAR(36),
  related_student_id VARCHAR(36),

  -- Alert Status
  is_read BOOLEAN DEFAULT FALSE,
  is_resolved BOOLEAN DEFAULT FALSE,
  resolved_by_id VARCHAR(36),
  resolution_notes TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP NULL,
  resolved_at TIMESTAMP NULL,

  FOREIGN KEY (resolved_by_id) REFERENCES users(id),

  INDEX idx_alert_type (alert_type),
  INDEX idx_unread (is_read, created_at),
  INDEX idx_unresolved (is_resolved, severity, created_at),
  INDEX idx_disease (related_disease)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Pending Actions Table (Approval Workflow System)
-- =====================================================
CREATE TABLE pending_actions (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),

  -- Action Details
  action_type ENUM('REGISTER_STUDENT', 'DEACTIVATE_USER', 'DELETE_USER') NOT NULL,

  -- Requester Information
  requested_by_id VARCHAR(36) NOT NULL,
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Target Information (for user deactivation/deletion)
  target_user_id VARCHAR(36),

  -- Approval Status
  status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  reviewed_by_id VARCHAR(36),
  reviewed_at TIMESTAMP NULL,
  review_notes TEXT,

  -- Action-specific Data (JSON for flexibility across different action types)
  action_data JSON NOT NULL COMMENT 'Stores registration form data, user details, etc.',

  -- Priority
  priority ENUM('LOW', 'MEDIUM', 'HIGH') DEFAULT 'MEDIUM',

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Foreign Keys
  FOREIGN KEY (requested_by_id) REFERENCES users(id),
  FOREIGN KEY (reviewed_by_id) REFERENCES users(id),
  FOREIGN KEY (target_user_id) REFERENCES users(id) ON DELETE SET NULL,

  -- Indexes for query performance
  INDEX idx_status (status, created_at),
  INDEX idx_requester (requested_by_id),
  INDEX idx_action_type (action_type, status),
  INDEX idx_pending (status, priority, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Duplicate Detections Table (Special Feature)
-- =====================================================
CREATE TABLE duplicate_detections (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  student_id_1 VARCHAR(36) NOT NULL,
  student_id_2 VARCHAR(36) NOT NULL,

  -- Similarity Information
  similarity_score DECIMAL(5,2) NOT NULL COMMENT 'Percentage similarity',
  matching_fields JSON NOT NULL COMMENT 'Fields that match',

  -- Resolution
  is_resolved BOOLEAN DEFAULT FALSE,
  resolved_by_id VARCHAR(36),
  resolution_action ENUM('MERGED', 'KEPT_BOTH', 'DELETED_ONE') NULL,
  resolution_notes TEXT,

  detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,

  FOREIGN KEY (student_id_1) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id_2) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (resolved_by_id) REFERENCES users(id) ON DELETE SET NULL,

  INDEX idx_unresolved (is_resolved, detected_at),
  INDEX idx_student1 (student_id_1),
  INDEX idx_student2 (student_id_2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- Audit Logs Table (Track Access and Edits)
-- =====================================================
CREATE TABLE audit_logs (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  action VARCHAR(100) NOT NULL COMMENT 'CREATE, READ, UPDATE, DELETE',
  table_name VARCHAR(50) NOT NULL,
  record_id VARCHAR(36),
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),

  INDEX idx_user_action (user_id, action, created_at),
  INDEX idx_table_record (table_name, record_id),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
