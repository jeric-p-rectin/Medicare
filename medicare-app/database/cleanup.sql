-- =====================================================
-- MEDICARE CLEANUP SCRIPT
-- Removes all seed data from the database
-- Run this before re-seeding the database
-- =====================================================

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- DELETE SEED DATA (in reverse dependency order)
-- =====================================================

-- Delete activity logs
DELETE FROM activity_logs WHERE 1=1;

-- Delete system alerts
DELETE FROM system_alerts WHERE 1=1;

-- Delete disease trends
DELETE FROM disease_trends WHERE 1=1;

-- Delete inventory transactions
DELETE FROM inventory_transactions WHERE 1=1;

-- Delete vaccinations
DELETE FROM vaccinations WHERE 1=1;

-- Delete appointments
DELETE FROM appointments WHERE 1=1;

-- Delete prescription items
DELETE FROM prescription_items WHERE 1=1;

-- Delete prescriptions
DELETE FROM prescriptions WHERE 1=1;

-- Delete medical records
DELETE FROM medical_records WHERE 1=1;

-- Delete patients
DELETE FROM patients WHERE 1=1;

-- Delete vaccines
DELETE FROM vaccines WHERE 1=1;

-- Delete medicines
DELETE FROM medicines WHERE 1=1;

-- Delete users (this will cascade to related records)
DELETE FROM users WHERE 1=1;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- VERIFY CLEANUP
-- =====================================================

SELECT 'Cleanup complete. All tables emptied.' AS status;

-- =====================================================
-- END OF CLEANUP SCRIPT
-- =====================================================
