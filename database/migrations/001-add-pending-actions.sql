-- =====================================================
-- Migration: Add Pending Actions Table
-- Version: 001
-- Description: Adds approval workflow system for ADMIN users
--              requiring SUPER_ADMIN approval for registrations,
--              deactivations, and deletions.
-- =====================================================

-- Create pending_actions table
CREATE TABLE IF NOT EXISTS pending_actions (
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

-- Verify table creation
SELECT 'pending_actions table created successfully' AS status;
