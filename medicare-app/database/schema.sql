-- =====================================================
-- MEDICARE DATABASE SCHEMA
-- MySQL Database for Medical Records Management System
-- =====================================================

-- Note: Using the existing 'defaultdb' database on Aiven
-- Run this script to create all tables

-- =====================================================
-- USER MANAGEMENT TABLES
-- =====================================================

-- Users table (Super Admin, Admin, Patient)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('SUPER_ADMIN', 'ADMIN', 'PATIENT') NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    last_login DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- INVENTORY TABLES (Created first due to FK dependencies)
-- =====================================================

-- Medicines table
CREATE TABLE IF NOT EXISTS medicines (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(200) NOT NULL,
    generic_name VARCHAR(200),
    brand_name VARCHAR(200),
    description TEXT,

    category VARCHAR(100) NOT NULL,
    dosage_form VARCHAR(50) NOT NULL,
    strength VARCHAR(50) NOT NULL,

    stock_quantity INT DEFAULT 0,
    unit_of_measure VARCHAR(20) NOT NULL,
    reorder_level INT DEFAULT 10,
    stock_status ENUM('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'EXPIRED') DEFAULT 'IN_STOCK',

    expiry_date DATE,
    supplier VARCHAR(200),
    is_active BOOLEAN DEFAULT TRUE,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_name (name),
    INDEX idx_stock_status (stock_status),
    INDEX idx_expiry_date (expiry_date),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Vaccines table
CREATE TABLE IF NOT EXISTS vaccines (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(200) NOT NULL,
    manufacturer VARCHAR(200),
    description TEXT,

    disease_target VARCHAR(100) NOT NULL,
    doses_required INT DEFAULT 1,
    interval_days INT,

    stock_quantity INT DEFAULT 0,
    unit_of_measure VARCHAR(20) NOT NULL,
    reorder_level INT DEFAULT 10,
    stock_status ENUM('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'EXPIRED') DEFAULT 'IN_STOCK',

    storage_temp VARCHAR(50),
    expiry_date DATE,
    supplier VARCHAR(200),
    is_active BOOLEAN DEFAULT TRUE,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_name (name),
    INDEX idx_stock_status (stock_status),
    INDEX idx_expiry_date (expiry_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PATIENT MANAGEMENT TABLES
-- =====================================================

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) UNIQUE NOT NULL,

    -- Personal Information
    date_of_birth DATE NOT NULL,
    age INT NOT NULL,
    gender ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    civil_status VARCHAR(50),

    -- Contact Information
    phone_number VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    barangay VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,

    -- Emergency Contact
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relation VARCHAR(50),

    -- Medical Information
    blood_type VARCHAR(5),
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    allergies TEXT,

    -- Classification
    is_pwd BOOLEAN DEFAULT FALSE,
    pwd_id_number VARCHAR(50),
    is_senior BOOLEAN DEFAULT FALSE,
    senior_id_number VARCHAR(50),
    is_pregnant BOOLEAN DEFAULT FALSE,
    expected_due_date DATE,

    -- System Fields
    patient_number VARCHAR(20) UNIQUE NOT NULL,
    category JSON,

    created_by_id VARCHAR(36) NOT NULL,
    updated_by_id VARCHAR(36),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by_id) REFERENCES users(id),
    FOREIGN KEY (updated_by_id) REFERENCES users(id),

    INDEX idx_patient_number (patient_number),
    INDEX idx_user_id (user_id),
    INDEX idx_date_of_birth (date_of_birth),
    INDEX idx_barangay (barangay),
    INDEX idx_created_by (created_by_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- MEDICAL RECORDS TABLES
-- =====================================================

-- Medical Records table
CREATE TABLE IF NOT EXISTS medical_records (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    patient_id VARCHAR(36) NOT NULL,

    visit_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    chief_complaint TEXT NOT NULL,
    diagnosis TEXT NOT NULL,
    symptoms JSON,
    vital_signs JSON,

    notes TEXT,
    treatment TEXT,
    follow_up_date DATE,

    recorded_by_id VARCHAR(36) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by_id) REFERENCES users(id),

    INDEX idx_patient_id (patient_id),
    INDEX idx_visit_date (visit_date),
    INDEX idx_recorded_by (recorded_by_id),
    INDEX idx_diagnosis (diagnosis(100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PRESCRIPTION TABLES
-- =====================================================

-- Prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    patient_id VARCHAR(36) NOT NULL,
    medical_record_id VARCHAR(36),
    prescribed_by_id VARCHAR(36) NOT NULL,

    prescription_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    status ENUM('ACTIVE', 'COMPLETED', 'CANCELLED') DEFAULT 'ACTIVE',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (medical_record_id) REFERENCES medical_records(id) ON DELETE SET NULL,
    FOREIGN KEY (prescribed_by_id) REFERENCES users(id),

    INDEX idx_patient_id (patient_id),
    INDEX idx_medical_record (medical_record_id),
    INDEX idx_prescribed_by (prescribed_by_id),
    INDEX idx_prescription_date (prescription_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Prescription Items table
CREATE TABLE IF NOT EXISTS prescription_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    prescription_id VARCHAR(36) NOT NULL,
    medicine_id VARCHAR(36) NOT NULL,

    dosage VARCHAR(50) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    instructions TEXT,

    quantity_prescribed INT NOT NULL,
    quantity_dispensed INT DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (prescription_id) REFERENCES prescriptions(id) ON DELETE CASCADE,
    FOREIGN KEY (medicine_id) REFERENCES medicines(id),

    INDEX idx_prescription_id (prescription_id),
    INDEX idx_medicine_id (medicine_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- APPOINTMENT TABLES
-- =====================================================

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    patient_id VARCHAR(36) NOT NULL,
    scheduled_by_id VARCHAR(36) NOT NULL,

    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(10) NOT NULL,
    type VARCHAR(50) NOT NULL,
    purpose TEXT,

    status ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW') DEFAULT 'SCHEDULED',
    notes TEXT,

    reminder_sent BOOLEAN DEFAULT FALSE,
    reminder_sent_at DATETIME,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (scheduled_by_id) REFERENCES users(id),

    INDEX idx_patient_id (patient_id),
    INDEX idx_scheduled_by (scheduled_by_id),
    INDEX idx_appointment_date (appointment_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- VACCINATION TABLES
-- =====================================================

-- Vaccinations table
CREATE TABLE IF NOT EXISTS vaccinations (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    patient_id VARCHAR(36) NOT NULL,
    vaccine_id VARCHAR(36) NOT NULL,

    administered_date DATE NOT NULL,
    next_dose_date DATE,
    dose_number INT NOT NULL,

    batch_number VARCHAR(50),
    lot_number VARCHAR(50),
    expiry_date DATE,

    administered_by VARCHAR(100),
    site VARCHAR(100),
    notes TEXT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (vaccine_id) REFERENCES vaccines(id),

    INDEX idx_patient_id (patient_id),
    INDEX idx_vaccine_id (vaccine_id),
    INDEX idx_administered_date (administered_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- INVENTORY TRANSACTION TABLE
-- =====================================================

-- Inventory Transactions table
CREATE TABLE IF NOT EXISTS inventory_transactions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),

    item_type ENUM('MEDICINE', 'VACCINE') NOT NULL,
    medicine_id VARCHAR(36),
    vaccine_id VARCHAR(36),

    transaction_type ENUM('IN', 'OUT', 'ADJUSTMENT', 'EXPIRED') NOT NULL,
    quantity INT NOT NULL,
    reason TEXT,

    batch_number VARCHAR(50),
    expiry_date DATE,

    performed_by_id VARCHAR(36) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE SET NULL,
    FOREIGN KEY (vaccine_id) REFERENCES vaccines(id) ON DELETE SET NULL,
    FOREIGN KEY (performed_by_id) REFERENCES users(id),

    INDEX idx_item_type (item_type),
    INDEX idx_transaction_type (transaction_type),
    INDEX idx_medicine_id (medicine_id),
    INDEX idx_vaccine_id (vaccine_id),
    INDEX idx_performed_by (performed_by_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- DISEASE TRENDS TABLES
-- =====================================================

-- Disease Trends table
CREATE TABLE IF NOT EXISTS disease_trends (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    disease_name VARCHAR(200) NOT NULL,
    icd_code VARCHAR(20),

    month INT NOT NULL,
    year INT NOT NULL,
    case_count INT DEFAULT 0,

    barangay VARCHAR(100),
    age_group VARCHAR(50),

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY unique_disease_trend (disease_name, month, year, barangay),
    INDEX idx_disease_name (disease_name),
    INDEX idx_year_month (year, month),
    INDEX idx_barangay (barangay)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- SYSTEM LOGS TABLES
-- =====================================================

-- Activity Logs table
CREATE TABLE IF NOT EXISTS activity_logs (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,

    action VARCHAR(100) NOT NULL,
    entity VARCHAR(100),
    entity_id VARCHAR(36),
    details JSON,
    ip_address VARCHAR(45),

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- System Alerts table
CREATE TABLE IF NOT EXISTS system_alerts (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    type VARCHAR(100) NOT NULL,
    severity ENUM('INFO', 'WARNING', 'CRITICAL') NOT NULL,

    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,

    is_read BOOLEAN DEFAULT FALSE,
    read_at DATETIME,
    metadata JSON,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_type (type),
    INDEX idx_severity (severity),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- END OF SCHEMA
-- =====================================================
