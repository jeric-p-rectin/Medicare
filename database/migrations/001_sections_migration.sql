-- =====================================================
-- Migration: Rich Sections Implementation
-- Description: Extend sections table to support Special Education,
--              Junior High, and Senior High with rich naming
-- Date: 2026-01-30
-- =====================================================

-- =====================================================
-- PHASE 1: Schema Alterations
-- =====================================================

-- Modify sections table
ALTER TABLE sections
  MODIFY COLUMN grade_level VARCHAR(20) NOT NULL,
  ADD COLUMN alternative_level VARCHAR(50) NULL AFTER grade_level,
  ADD COLUMN display_name VARCHAR(100) NULL AFTER section_name,
  ADD COLUMN section_category ENUM('SPECIAL_EDUCATION', 'JUNIOR_HIGH', 'SENIOR_HIGH') NULL AFTER display_name;

-- Modify students table to support Non-Graded
ALTER TABLE students
  MODIFY COLUMN grade_level VARCHAR(20) NOT NULL;

-- =====================================================
-- PHASE 2: Clean Existing Data
-- =====================================================

-- Truncate sections table (approved by user - clean migration)
TRUNCATE TABLE sections;

-- =====================================================
-- PHASE 3: Populate Rich Section Data
-- =====================================================

-- Special Education Sections
INSERT INTO sections (grade_level, alternative_level, section_name, display_name, section_category, is_active) VALUES
('Non-Graded', NULL, 'SNED FAITHFUL', 'Sned Faithful', 'SPECIAL_EDUCATION', TRUE),
('Non-Graded', NULL, 'SNED GENEROUS', 'Sned Generous', 'SPECIAL_EDUCATION', TRUE),
('Non-Graded', NULL, 'SNED POLITE', 'Sned Polite', 'SPECIAL_EDUCATION', TRUE);

-- Junior High - Grade 7 (Year I)
INSERT INTO sections (grade_level, alternative_level, section_name, display_name, section_category, is_active) VALUES
('7', 'Year I', 'CAMIA', 'Camia', 'JUNIOR_HIGH', TRUE),
('7', 'Year I', 'CARNATION', 'Carnation', 'JUNIOR_HIGH', TRUE),
('7', 'Year I', 'DAHLIA', 'Dahlia', 'JUNIOR_HIGH', TRUE),
('7', 'Year I', 'DAMA DE NOCHE', 'Dama De Noche', 'JUNIOR_HIGH', TRUE),
('7', 'Year I', 'EVERLASTING - PILOT', 'Everlasting - Pilot', 'JUNIOR_HIGH', TRUE),
('7', 'Year I', 'GUMAMELA', 'Gumamela', 'JUNIOR_HIGH', TRUE),
('7', 'Year I', 'ILANG-ILANG', 'Ilang-Ilang', 'JUNIOR_HIGH', TRUE),
('7', 'Year I', 'JASMINE', 'Jasmine', 'JUNIOR_HIGH', TRUE),
('7', 'Year I', 'MAGNOLIA', 'Magnolia', 'JUNIOR_HIGH', TRUE),
('7', 'Year I', 'ROSAL', 'Rosal', 'JUNIOR_HIGH', TRUE),
('7', 'Year I', 'SAMPAGUITA - SPJ', 'Sampaguita - Spj', 'JUNIOR_HIGH', TRUE),
('7', 'Year I', 'STARGAZER LILY - STE', 'Stargazer Lily - Ste', 'JUNIOR_HIGH', TRUE),
('7', 'Year I', 'SUNFLOWER', 'Sunflower', 'JUNIOR_HIGH', TRUE),
('7', 'Year I', 'TULIP', 'Tulip', 'JUNIOR_HIGH', TRUE);

-- Junior High - Grade 8 (Year II)
INSERT INTO sections (grade_level, alternative_level, section_name, display_name, section_category, is_active) VALUES
('8', 'Year II', 'APO - PILOT', 'Apo - Pilot', 'JUNIOR_HIGH', TRUE),
('8', 'Year II', 'ARAYAT - SPJ', 'Arayat - Spj', 'JUNIOR_HIGH', TRUE),
('8', 'Year II', 'BANAHAW', 'Banahaw', 'JUNIOR_HIGH', TRUE),
('8', 'Year II', 'BILIRAN', 'Biliran', 'JUNIOR_HIGH', TRUE),
('8', 'Year II', 'BULUSAN', 'Bulusan', 'JUNIOR_HIGH', TRUE),
('8', 'Year II', 'CAGUA', 'Cagua', 'JUNIOR_HIGH', TRUE),
('8', 'Year II', 'IRAYA', 'Iraya', 'JUNIOR_HIGH', TRUE),
('8', 'Year II', 'KANLAON', 'Kanlaon', 'JUNIOR_HIGH', TRUE),
('8', 'Year II', 'MAKILING', 'Makiling', 'JUNIOR_HIGH', TRUE),
('8', 'Year II', 'MALINDIG', 'Malindig', 'JUNIOR_HIGH', TRUE),
('8', 'Year II', 'MAYON', 'Mayon', 'JUNIOR_HIGH', TRUE),
('8', 'Year II', 'RAGANG', 'Ragang', 'JUNIOR_HIGH', TRUE),
('8', 'Year II', 'TAAL', 'Taal', 'JUNIOR_HIGH', TRUE);

-- Junior High - Grade 9 (Year III)
INSERT INTO sections (grade_level, alternative_level, section_name, display_name, section_category, is_active) VALUES
('9', 'Year III', 'ABOKADO', 'Abokado', 'JUNIOR_HIGH', TRUE),
('9', 'Year III', 'ATIS', 'Atis', 'JUNIOR_HIGH', TRUE),
('9', 'Year III', 'DALANDAN', 'Dalandan', 'JUNIOR_HIGH', TRUE),
('9', 'Year III', 'DURYAN', 'Duryan', 'JUNIOR_HIGH', TRUE),
('9', 'Year III', 'GUYABANO', 'Guyabano', 'JUNIOR_HIGH', TRUE),
('9', 'Year III', 'KAHEL', 'Kahel', 'JUNIOR_HIGH', TRUE),
('9', 'Year III', 'KAYMITO', 'Kaymito', 'JUNIOR_HIGH', TRUE),
('9', 'Year III', 'LANGKA', 'Langka', 'JUNIOR_HIGH', TRUE),
('9', 'Year III', 'MAKOPA', 'Makopa', 'JUNIOR_HIGH', TRUE),
('9', 'Year III', 'MANGGA - STE', 'Mangga - Ste', 'JUNIOR_HIGH', TRUE),
('9', 'Year III', 'MELON - PILOT', 'Melon - Pilot', 'JUNIOR_HIGH', TRUE),
('9', 'Year III', 'PINYA', 'Pinya', 'JUNIOR_HIGH', TRUE),
('9', 'Year III', 'SANTOL', 'Santol', 'JUNIOR_HIGH', TRUE);

-- Junior High - Grade 10 (Year IV)
INSERT INTO sections (grade_level, alternative_level, section_name, display_name, section_category, is_active) VALUES
('10', 'Year IV', 'AGUINALDO', 'Aguinaldo', 'JUNIOR_HIGH', TRUE),
('10', 'Year IV', 'BALTAZAR', 'Baltazar', 'JUNIOR_HIGH', TRUE),
('10', 'Year IV', 'BONIFACIO', 'Bonifacio', 'JUNIOR_HIGH', TRUE),
('10', 'Year IV', 'DAGOHOY', 'Dagohoy', 'JUNIOR_HIGH', TRUE),
('10', 'Year IV', 'DEL PILAR', 'Del Pilar', 'JUNIOR_HIGH', TRUE),
('10', 'Year IV', 'JACINTO', 'Jacinto', 'JUNIOR_HIGH', TRUE),
('10', 'Year IV', 'LUNA', 'Luna', 'JUNIOR_HIGH', TRUE),
('10', 'Year IV', 'MABINI', 'Mabini', 'JUNIOR_HIGH', TRUE),
('10', 'Year IV', 'MALVAR', 'Malvar', 'JUNIOR_HIGH', TRUE),
('10', 'Year IV', 'QUEZON', 'Quezon', 'JUNIOR_HIGH', TRUE),
('10', 'Year IV', 'RIZAL - STE', 'Rizal - Ste', 'JUNIOR_HIGH', TRUE),
('10', 'Year IV', 'SILANG', 'Silang', 'JUNIOR_HIGH', TRUE),
('10', 'Year IV', 'SULAYMAN', 'Sulayman', 'JUNIOR_HIGH', TRUE);

-- Senior High - Grade 11
INSERT INTO sections (grade_level, alternative_level, section_name, display_name, section_category, is_active) VALUES
('11', NULL, 'STEM - NARRA', 'Stem - Narra', 'SENIOR_HIGH', TRUE),
('11', NULL, 'ABM - ACACIA', 'Abm - Acacia', 'SENIOR_HIGH', TRUE),
('11', NULL, 'HUMSS - MOLAVE', 'Humss - Molave', 'SENIOR_HIGH', TRUE),
('11', NULL, 'HUMSS - TALISAY', 'Humss - Talisay', 'SENIOR_HIGH', TRUE),
('11', NULL, 'HUMSS - ALS - CAMAGONG', 'Humss - Als - Camagong', 'SENIOR_HIGH', TRUE),
('11', NULL, 'TVL (HE) - YAKAL', 'Tvl (He) - Yakal', 'SENIOR_HIGH', TRUE),
('11', NULL, 'TVL (HE) - APITONG', 'Tvl (He) - Apitong', 'SENIOR_HIGH', TRUE),
('11', NULL, 'TVL (ICT) - MAHOGANY', 'Tvl (Ict) - Mahogany', 'SENIOR_HIGH', TRUE);

-- Senior High - Grade 12
INSERT INTO sections (grade_level, alternative_level, section_name, display_name, section_category, is_active) VALUES
('12', NULL, 'STEM - LAUREL', 'Stem - Laurel', 'SENIOR_HIGH', TRUE),
('12', NULL, 'STEM - RAMOS', 'Stem - Ramos', 'SENIOR_HIGH', TRUE),
('12', NULL, 'ABM - QUIRINO', 'Abm - Quirino', 'SENIOR_HIGH', TRUE),
('12', NULL, 'HUMSS - MAGSAYSAY', 'Humss - Magsaysay', 'SENIOR_HIGH', TRUE),
('12', NULL, 'HUMSS - ROXAS', 'Humss - Roxas', 'SENIOR_HIGH', TRUE),
('12', NULL, 'HUMSS - OSMEÑA', 'Humss - Osmeña', 'SENIOR_HIGH', TRUE),
('12', NULL, 'TVL (HE) - MACAPAGAL', 'Tvl (He) - Macapagal', 'SENIOR_HIGH', TRUE),
('12', NULL, 'TVL (HE) - AQUINO', 'Tvl (He) - Aquino', 'SENIOR_HIGH', TRUE),
('12', NULL, 'TVL (ICT) - GARCIA', 'Tvl (Ict) - Garcia', 'SENIOR_HIGH', TRUE);

-- =====================================================
-- PHASE 4: Verification
-- =====================================================

-- Count total sections (should be ~70)
SELECT 'Total Sections' as metric, COUNT(*) as value FROM sections
UNION ALL
SELECT 'Special Education', COUNT(*) FROM sections WHERE section_category = 'SPECIAL_EDUCATION'
UNION ALL
SELECT 'Junior High', COUNT(*) FROM sections WHERE section_category = 'JUNIOR_HIGH'
UNION ALL
SELECT 'Senior High', COUNT(*) FROM sections WHERE section_category = 'SENIOR_HIGH'
UNION ALL
SELECT 'Active Sections', COUNT(*) FROM sections WHERE is_active = TRUE;
