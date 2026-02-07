-- =====================================================
-- Migration: Add DISEASE_TREND to alerts.alert_type ENUM
-- Version: 001
-- Date: 2026-02-06
-- Description: Extends the alert_type ENUM to support disease
--              trend alerts for month-over-month tracking.
--              Non-destructive operation that appends one value.
-- =====================================================

-- Add DISEASE_TREND to the alert_type ENUM
ALTER TABLE alerts
  MODIFY COLUMN alert_type
    ENUM('OUTBREAK_SUSPECTED', 'DUPLICATE_DETECTED', 'SYSTEM', 'DISEASE_TREND')
    NOT NULL;

-- Verify the change
SELECT COLUMN_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'alerts'
  AND COLUMN_NAME = 'alert_type';

-- =====================================================
-- Migration Notes:
-- =====================================================
-- This migration adds support for disease trend alerts that
-- automatically detect significant month-over-month changes
-- in disease case counts.
--
-- Threshold Rules:
-- - Increase >= 50% AND current month >= 2 cases AND absolute increase >= 2
-- - OR previous month was 0 AND current month >= 3 cases
-- - 24-hour spam prevention per disease
--
-- All DISEASE_TREND alerts are created with HIGH severity
-- and are visible to all staff (no recipient_user_id).
-- =====================================================
