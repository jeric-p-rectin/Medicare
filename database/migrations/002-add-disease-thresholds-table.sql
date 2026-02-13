-- =====================================================
-- Migration: Add disease_thresholds table
-- Version: 002
-- Date: 2026-02-10
-- Description: Creates disease_thresholds table for
--              dynamic outbreak detection configuration
-- =====================================================

CREATE TABLE IF NOT EXISTS disease_thresholds (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  disease_name VARCHAR(100) UNIQUE NOT NULL,
  cases_per_week INT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_by_id VARCHAR(36) NOT NULL,
  updated_by_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (created_by_id) REFERENCES users(id),
  FOREIGN KEY (updated_by_id) REFERENCES users(id),

  INDEX idx_disease_name (disease_name),
  INDEX idx_active (is_active),

  CONSTRAINT chk_cases_per_week_positive CHECK (cases_per_week > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Migrate existing hardcoded thresholds (using superadmin as creator)
INSERT INTO disease_thresholds (disease_name, cases_per_week, description, created_by_id)
SELECT 'Flu', 5, 'Influenza outbreak threshold based on seasonal patterns', users.id
FROM users WHERE username = 'superadmin' LIMIT 1
UNION ALL
SELECT 'Dengue', 3, 'Dengue fever outbreak threshold', users.id
FROM users WHERE username = 'superadmin' LIMIT 1
UNION ALL
SELECT 'COVID-19', 2, 'COVID-19 outbreak threshold - heightened monitoring', users.id
FROM users WHERE username = 'superadmin' LIMIT 1
UNION ALL
SELECT 'Headache', 10, 'Headache outbreak threshold', users.id
FROM users WHERE username = 'superadmin' LIMIT 1
UNION ALL
SELECT 'Stomach Ache', 7, 'Stomach ache outbreak threshold', users.id
FROM users WHERE username = 'superadmin' LIMIT 1
UNION ALL
SELECT 'Fever', 8, 'Fever outbreak threshold', users.id
FROM users WHERE username = 'superadmin' LIMIT 1
UNION ALL
SELECT 'Cough', 10, 'Cough outbreak threshold', users.id
FROM users WHERE username = 'superadmin' LIMIT 1
UNION ALL
SELECT 'Diarrhea', 5, 'Diarrhea outbreak threshold', users.id
FROM users WHERE username = 'superadmin' LIMIT 1;

-- Verify migration
SELECT COUNT(*) as threshold_count FROM disease_thresholds;
SELECT disease_name, cases_per_week, is_active FROM disease_thresholds ORDER BY disease_name;
