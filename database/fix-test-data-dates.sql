-- ============================================
-- FIX TEST DATA DATES
-- ============================================
-- Shifts November 2024 records to November 2025
-- This makes them visible in the "Past Year" filter
-- ============================================

-- Verify current date range BEFORE update
SELECT
  'BEFORE UPDATE:' as status,
  MIN(visit_date) as earliest,
  MAX(visit_date) as latest,
  COUNT(*) as total_records
FROM medical_records;

-- Update all November 2024 records to November 2025
UPDATE medical_records
SET visit_date = DATE_ADD(visit_date, INTERVAL 12 MONTH)
WHERE visit_date >= '2024-11-01' AND visit_date <= '2024-11-30';

-- Verify AFTER update
SELECT
  'AFTER UPDATE:' as status,
  MIN(visit_date) as earliest,
  MAX(visit_date) as latest,
  COUNT(*) as total_records
FROM medical_records;

-- Verify monthly distribution
SELECT
  DATE_FORMAT(visit_date, '%Y-%m') as month,
  COUNT(*) as count
FROM medical_records
GROUP BY DATE_FORMAT(visit_date, '%Y-%m')
ORDER BY month DESC;
