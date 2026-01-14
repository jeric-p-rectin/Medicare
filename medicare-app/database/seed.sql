-- =====================================================
-- MEDICARE SEED DATA
-- Initial data for the Medical Records Management System
-- =====================================================

-- =====================================================
-- SUPER ADMIN USER
-- =====================================================
-- Password: admin123
-- Hashed with bcrypt (10 rounds)

INSERT INTO users (id, username, email, password, role, first_name, last_name, is_active)
VALUES (
    UUID(),
    'superadmin',
    'superadmin@medicare.com',
    '$2a$10$yYV8tfHXDvVCYHarkx.LUOcfDJEzgVIGHbNT7GSgHmLKlUfkDdLxC',
    'SUPER_ADMIN',
    'Super',
    'Admin',
    TRUE
);

-- =====================================================
-- SAMPLE ADMIN USER
-- =====================================================
-- Password: admin123

INSERT INTO users (id, username, email, password, role, first_name, last_name, is_active)
VALUES (
    UUID(),
    'admin',
    'admin@medicare.com',
    '$2a$10$yYV8tfHXDvVCYHarkx.LUOcfDJEzgVIGHbNT7GSgHmLKlUfkDdLxC',
    'ADMIN',
    'Health',
    'Worker',
    TRUE
);

-- =====================================================
-- SAMPLE MEDICINES
-- =====================================================

INSERT INTO medicines (id, name, generic_name, brand_name, category, dosage_form, strength, stock_quantity, unit_of_measure, reorder_level, stock_status, expiry_date)
VALUES
    (UUID(), 'Paracetamol', 'Acetaminophen', 'Biogesic', 'Analgesic', 'Tablet', '500mg', 100, 'pieces', 20, 'IN_STOCK', DATE_ADD(CURDATE(), INTERVAL 1 YEAR)),
    (UUID(), 'Amoxicillin', 'Amoxicillin', 'Amoxil', 'Antibiotic', 'Capsule', '500mg', 50, 'pieces', 15, 'IN_STOCK', DATE_ADD(CURDATE(), INTERVAL 1 YEAR)),
    (UUID(), 'Ibuprofen', 'Ibuprofen', 'Advil', 'Anti-inflammatory', 'Tablet', '400mg', 75, 'pieces', 20, 'IN_STOCK', DATE_ADD(CURDATE(), INTERVAL 1 YEAR)),
    (UUID(), 'Cetirizine', 'Cetirizine', 'Zyrtec', 'Antihistamine', 'Tablet', '10mg', 60, 'pieces', 15, 'IN_STOCK', DATE_ADD(CURDATE(), INTERVAL 1 YEAR)),
    (UUID(), 'Losartan', 'Losartan Potassium', 'Cozaar', 'Antihypertensive', 'Tablet', '50mg', 40, 'pieces', 15, 'IN_STOCK', DATE_ADD(CURDATE(), INTERVAL 1 YEAR)),
    (UUID(), 'Metformin', 'Metformin HCl', 'Glucophage', 'Antidiabetic', 'Tablet', '500mg', 80, 'pieces', 20, 'IN_STOCK', DATE_ADD(CURDATE(), INTERVAL 1 YEAR)),
    (UUID(), 'Salbutamol', 'Salbutamol', 'Ventolin', 'Bronchodilator', 'Nebule', '2.5mg/2.5ml', 30, 'pieces', 10, 'IN_STOCK', DATE_ADD(CURDATE(), INTERVAL 6 MONTH)),
    (UUID(), 'Omeprazole', 'Omeprazole', 'Losec', 'Antacid', 'Capsule', '20mg', 45, 'pieces', 15, 'IN_STOCK', DATE_ADD(CURDATE(), INTERVAL 1 YEAR));

-- =====================================================
-- SAMPLE VACCINES
-- =====================================================

INSERT INTO vaccines (id, name, manufacturer, disease_target, doses_required, interval_days, stock_quantity, unit_of_measure, reorder_level, stock_status, storage_temp, expiry_date)
VALUES
    (UUID(), 'BCG Vaccine', 'Sanofi Pasteur', 'Tuberculosis', 1, NULL, 30, 'vials', 10, 'IN_STOCK', '2-8°C', DATE_ADD(CURDATE(), INTERVAL 6 MONTH)),
    (UUID(), 'Hepatitis B Vaccine', 'GSK', 'Hepatitis B', 3, 30, 25, 'vials', 10, 'IN_STOCK', '2-8°C', DATE_ADD(CURDATE(), INTERVAL 1 YEAR)),
    (UUID(), 'Measles Vaccine', 'Serum Institute', 'Measles', 2, 28, 20, 'vials', 10, 'IN_STOCK', '2-8°C', DATE_ADD(CURDATE(), INTERVAL 6 MONTH)),
    (UUID(), 'Polio Vaccine (OPV)', 'Sanofi Pasteur', 'Poliomyelitis', 4, 28, 35, 'vials', 10, 'IN_STOCK', '2-8°C', DATE_ADD(CURDATE(), INTERVAL 6 MONTH)),
    (UUID(), 'DPT Vaccine', 'Sanofi Pasteur', 'Diphtheria/Pertussis/Tetanus', 3, 28, 25, 'vials', 10, 'IN_STOCK', '2-8°C', DATE_ADD(CURDATE(), INTERVAL 1 YEAR)),
    (UUID(), 'Tetanus Toxoid', 'Sanofi Pasteur', 'Tetanus', 5, 30, 40, 'vials', 15, 'IN_STOCK', '2-8°C', DATE_ADD(CURDATE(), INTERVAL 1 YEAR));

-- =====================================================
-- END OF SEED DATA
-- =====================================================
