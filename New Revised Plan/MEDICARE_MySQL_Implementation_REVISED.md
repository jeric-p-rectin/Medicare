# MEDICARE - MySQL Implementation (Based on FEATURES-2.0)
## Simplified Database Schema & Query Helpers

---

## 📋 Table of Contents
1. [Database Schema](#database-schema)
2. [Query Helper Functions](#query-helper-functions)
3. [API Routes](#api-routes)
4. [Special Features Implementation](#special-features-implementation)

---

## 🗄 Database Schema

### Complete SQL Schema
```sql
-- =====================================================
-- MEDICARE Database Schema (Based on FEATURES-2.0)
-- =====================================================

-- Users Table (Super Admin, Admin, Patient)
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

-- Students Table (Patients)
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

-- Sections Table
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

-- Medical Records Table
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

-- Alerts Table (Special Feature: Alert System)
CREATE TABLE alerts (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  alert_type ENUM('OUTBREAK_SUSPECTED', 'DUPLICATE_DETECTED', 'SYSTEM') NOT NULL,
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

-- Duplicate Detections Table (Special Feature: Duplicate Detection)
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
  
  FOREIGN KEY (student_id_1) REFERENCES students(id),
  FOREIGN KEY (student_id_2) REFERENCES students(id),
  FOREIGN KEY (resolved_by_id) REFERENCES users(id),
  
  INDEX idx_unresolved (is_resolved, detected_at),
  INDEX idx_student1 (student_id_1),
  INDEX idx_student2 (student_id_2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Audit Logs Table (Track who accesses and edits records)
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

-- =====================================================
-- Initial Data (Sample Sections)
-- =====================================================

INSERT INTO sections (id, grade_level, section_name) VALUES
  (UUID(), '7', 'A'),
  (UUID(), '7', 'B'),
  (UUID(), '7', 'C'),
  (UUID(), '7', 'D'),
  (UUID(), '8', 'A'),
  (UUID(), '8', 'B'),
  (UUID(), '8', 'C'),
  (UUID(), '8', 'D'),
  (UUID(), '9', 'A'),
  (UUID(), '9', 'B'),
  (UUID(), '9', 'C'),
  (UUID(), '9', 'D'),
  (UUID(), '10', 'A'),
  (UUID(), '10', 'B'),
  (UUID(), '10', 'C'),
  (UUID(), '10', 'D'),
  (UUID(), '11', 'A'),
  (UUID(), '11', 'B'),
  (UUID(), '11', 'C'),
  (UUID(), '11', 'D'),
  (UUID(), '12', 'A'),
  (UUID(), '12', 'B'),
  (UUID(), '12', 'C'),
  (UUID(), '12', 'D');

-- =====================================================
-- Sample Super Admin User (Default Login)
-- =====================================================
-- Password: admin123 (hashed with bcrypt)
INSERT INTO users (id, username, password, role, first_name, last_name, email) VALUES
  (UUID(), 'superadmin', '$2a$10$YourHashedPasswordHere', 'SUPER_ADMIN', 'Super', 'Admin', 'admin@medicare.local');
```

---

## 📝 Query Helper Functions

### Database Connection (`src/lib/db.ts`)
```typescript
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  ssl: {
    rejectUnauthorized: true
  }
});

export async function query<T>(sql: string, params?: any[]): Promise<T[]> {
  const [results] = await pool.execute(sql, params);
  return results as T[];
}

export async function queryOne<T>(sql: string, params?: any[]): Promise<T | null> {
  const results = await query<T>(sql, params);
  return results[0] || null;
}

export async function transaction<T>(callback: (conn: any) => Promise<T>): Promise<T> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export default pool;
```

### Dashboard Queries (`src/lib/queries/dashboard.ts`)
```typescript
import { query, queryOne } from '../db';

export interface DashboardStats {
  totalStudents: number;
  gradeStats: GradeStats[];
}

export interface GradeStats {
  grade: string;
  totalStudents: number;
}

export interface SectionStats {
  sectionName: string;
  studentCount: number;
}

// Get school-wide statistics
export async function getSchoolWideStats(): Promise<DashboardStats> {
  // Total students
  const totalResult = await queryOne<{ total: number }>(
    'SELECT COUNT(*) as total FROM students WHERE 1=1'
  );

  // Students per grade
  const gradeResults = await query<GradeStats>(
    `SELECT 
      grade_level as grade,
      COUNT(*) as totalStudents
    FROM students
    GROUP BY grade_level
    ORDER BY grade_level ASC`
  );

  return {
    totalStudents: totalResult?.total || 0,
    gradeStats: gradeResults
  };
}

// Get grade level statistics with sections
export async function getGradeLevelStats(grade: string): Promise<{
  totalStudents: number;
  sections: SectionStats[];
}> {
  // Total students in grade
  const totalResult = await queryOne<{ total: number }>(
    'SELECT COUNT(*) as total FROM students WHERE grade_level = ?',
    [grade]
  );

  // Students per section in grade
  const sectionResults = await query<SectionStats>(
    `SELECT 
      section as sectionName,
      COUNT(*) as studentCount
    FROM students
    WHERE grade_level = ?
    GROUP BY section
    ORDER BY section ASC`,
    [grade]
  );

  return {
    totalStudents: totalResult?.total || 0,
    sections: sectionResults
  };
}
```

### Student/Patient Queries (`src/lib/queries/students.ts`)
```typescript
import { query, queryOne, transaction } from '../db';
import { ResultSetHeader } from 'mysql2';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  age: number;
  dateOfBirth: string;
  sex: string;
  gradeLevel: string;
  section: string;
  lrn: string;
  studentNumber: string;
  parentGuardianName: string;
  parentGuardianContact: string;
  address: string;
  bmi: number;
  healthHistory: string;
}

// Get all students with search and pagination
export async function findStudents(options: {
  page?: number;
  limit?: number;
  search?: string;
  grade?: string;
  section?: string;
}): Promise<{ students: Student[]; total: number }> {
  const { page = 1, limit = 20, search = '', grade = '', section = '' } = options;
  const offset = (page - 1) * limit;

  let whereClauses: string[] = [];
  let params: any[] = [];

  // Search filter
  if (search) {
    whereClauses.push(`(
      u.first_name LIKE ? OR 
      u.last_name LIKE ? OR 
      s.student_number LIKE ? OR
      s.lrn LIKE ?
    )`);
    const searchPattern = `%${search}%`;
    params.push(searchPattern, searchPattern, searchPattern, searchPattern);
  }

  // Grade filter
  if (grade) {
    whereClauses.push('s.grade_level = ?');
    params.push(grade);
  }

  // Section filter
  if (section) {
    whereClauses.push('s.section = ?');
    params.push(section);
  }

  const whereClause = whereClauses.length > 0 
    ? `WHERE ${whereClauses.join(' AND ')}` 
    : '';

  // Get students
  const sql = `
    SELECT 
      s.id,
      u.first_name as firstName,
      u.last_name as lastName,
      u.middle_name as middleName,
      s.age,
      s.date_of_birth as dateOfBirth,
      s.sex,
      s.grade_level as gradeLevel,
      s.section,
      s.lrn,
      s.student_number as studentNumber,
      s.parent_guardian_name as parentGuardianName,
      s.parent_guardian_contact as parentGuardianContact,
      s.address,
      s.bmi,
      s.health_history as healthHistory
    FROM students s
    JOIN users u ON s.user_id = u.id
    ${whereClause}
    ORDER BY u.last_name, u.first_name
    LIMIT ? OFFSET ?
  `;

  const students = await query<Student>(sql, [...params, limit, offset]);

  // Get total count
  const countSql = `
    SELECT COUNT(*) as total
    FROM students s
    JOIN users u ON s.user_id = u.id
    ${whereClause}
  `;
  const countResult = await queryOne<{ total: number }>(countSql, params);

  return {
    students,
    total: countResult?.total || 0
  };
}

// Get single student by ID
export async function findStudentById(id: string): Promise<Student | null> {
  const sql = `
    SELECT 
      s.id,
      u.first_name as firstName,
      u.last_name as lastName,
      u.middle_name as middleName,
      s.age,
      s.date_of_birth as dateOfBirth,
      s.sex,
      s.grade_level as gradeLevel,
      s.section,
      s.lrn,
      s.student_number as studentNumber,
      s.parent_guardian_name as parentGuardianName,
      s.parent_guardian_contact as parentGuardianContact,
      s.address,
      s.bmi,
      s.health_history as healthHistory
    FROM students s
    JOIN users u ON s.user_id = u.id
    WHERE s.id = ?
    LIMIT 1
  `;

  return queryOne<Student>(sql, [id]);
}

// Create new student
export async function createStudent(data: {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth: Date;
  age: number;
  sex: string;
  gradeLevel: string;
  section: string;
  lrn: string;
  studentNumber: string;
  parentGuardianName: string;
  parentGuardianContact: string;
  address: string;
  bmi?: number;
  healthHistory?: string;
  createdById: string;
}): Promise<string> {
  return transaction(async (connection) => {
    // Create user
    await connection.execute(
      `INSERT INTO users (id, username, password, role, first_name, last_name, middle_name)
       VALUES (UUID(), ?, ?, 'PATIENT', ?, ?, ?)`,
      [
        data.username,
        data.password,
        data.firstName,
        data.lastName,
        data.middleName || null
      ]
    );

    // Get user ID
    const [userRows] = await connection.execute(
      'SELECT id FROM users WHERE username = ? LIMIT 1',
      [data.username]
    );
    const userId = userRows[0].id;

    // Create student
    await connection.execute(
      `INSERT INTO students (
        id, user_id, lrn, student_number, date_of_birth, age, sex,
        grade_level, section, address, parent_guardian_name, parent_guardian_contact,
        bmi, health_history, created_by_id
      ) VALUES (
        UUID(), ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?
      )`,
      [
        userId,
        data.lrn,
        data.studentNumber,
        data.dateOfBirth,
        data.age,
        data.sex,
        data.gradeLevel,
        data.section,
        data.address,
        data.parentGuardianName,
        data.parentGuardianContact,
        data.bmi || null,
        data.healthHistory || null,
        data.createdById
      ]
    );

    // Get student ID
    const [studentRows] = await connection.execute(
      'SELECT id FROM students WHERE user_id = ? LIMIT 1',
      [userId]
    );

    return studentRows[0].id;
  });
}

// Check for duplicate students (Special Feature: Duplicate Detection)
export async function checkDuplicateStudent(
  firstName: string,
  lastName: string,
  dateOfBirth: Date
): Promise<Student[]> {
  const sql = `
    SELECT 
      s.id,
      u.first_name as firstName,
      u.last_name as lastName,
      u.middle_name as middleName,
      s.lrn,
      s.grade_level as gradeLevel,
      s.section
    FROM students s
    JOIN users u ON s.user_id = u.id
    WHERE u.first_name = ? 
    AND u.last_name = ? 
    AND s.date_of_birth = ?
  `;

  return query<Student>(sql, [firstName, lastName, dateOfBirth]);
}
```

### Medical Records Queries (`src/lib/queries/medical-records.ts`)
```typescript
import { query, queryOne } from '../db';

export interface MedicalRecord {
  id: string;
  studentId: string;
  visitDate: string;
  chiefComplaint: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  diseaseCategory: string;
  illnessType: string;
  severity: string;
  recordedByName: string;
}

// Get student's medical records
export async function getStudentMedicalRecords(studentId: string): Promise<MedicalRecord[]> {
  const sql = `
    SELECT 
      mr.id,
      mr.student_id as studentId,
      mr.visit_date as visitDate,
      mr.chief_complaint as chiefComplaint,
      mr.diagnosis,
      mr.treatment,
      mr.notes,
      mr.disease_category as diseaseCategory,
      mr.illness_type as illnessType,
      mr.severity,
      CONCAT(u.first_name, ' ', u.last_name) as recordedByName
    FROM medical_records mr
    JOIN users u ON mr.recorded_by_id = u.id
    WHERE mr.student_id = ?
    ORDER BY mr.visit_date DESC
  `;

  return query<MedicalRecord>(sql, [studentId]);
}

// Create new medical record
export async function createMedicalRecord(data: {
  studentId: string;
  visitDate: Date;
  chiefComplaint: string;
  diagnosis?: string;
  treatment?: string;
  notes?: string;
  diseaseCategory?: string;
  illnessType?: string;
  severity?: string;
  recordedById: string;
}): Promise<string> {
  const sql = `
    INSERT INTO medical_records (
      id, student_id, visit_date, chief_complaint, diagnosis, treatment,
      notes, disease_category, illness_type, severity, recorded_by_id
    ) VALUES (
      UUID(), ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?
    )
  `;

  await query(sql, [
    data.studentId,
    data.visitDate,
    data.chiefComplaint,
    data.diagnosis || null,
    data.treatment || null,
    data.notes || null,
    data.diseaseCategory || null,
    data.illnessType || null,
    data.severity || 'MILD',
    data.recordedById
  ]);

  // Check for outbreak (Special Feature: Alert System)
  if (data.diseaseCategory) {
    await checkOutbreakThreshold(data.diseaseCategory);
  }

  // Get the created record ID
  const result = await queryOne<{ id: string }>(
    'SELECT id FROM medical_records WHERE student_id = ? ORDER BY created_at DESC LIMIT 1',
    [data.studentId]
  );

  return result?.id || '';
}
```

### Statistics Queries (`src/lib/queries/statistics.ts`)
```typescript
import { query } from '../db';

export interface DiseaseStats {
  name: string;
  value: number;
}

export interface TrendData {
  date: string;
  cases: number;
}

// Get disease distribution for time period
export async function getDiseaseDistribution(timePeriod: string): Promise<DiseaseStats[]> {
  let dateFilter = '';
  
  switch(timePeriod) {
    case 'week':
      dateFilter = 'DATE_SUB(CURDATE(), INTERVAL 7 DAY)';
      break;
    case 'month':
      dateFilter = 'DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
      break;
    case 'quarter':
      dateFilter = 'DATE_SUB(CURDATE(), INTERVAL 90 DAY)';
      break;
    case 'year':
      dateFilter = 'DATE_SUB(CURDATE(), INTERVAL 365 DAY)';
      break;
    default:
      dateFilter = 'DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
  }

  const sql = `
    SELECT 
      disease_category as name,
      COUNT(*) as value
    FROM medical_records
    WHERE visit_date >= ${dateFilter}
    AND disease_category IS NOT NULL
    GROUP BY disease_category
    ORDER BY value DESC
  `;

  return query<DiseaseStats>(sql);
}

// Get trend data over time
export async function getTrendData(timePeriod: string): Promise<TrendData[]> {
  let dateFilter = '';
  let groupBy = '';
  
  switch(timePeriod) {
    case 'week':
      dateFilter = 'DATE_SUB(CURDATE(), INTERVAL 7 DAY)';
      groupBy = 'DATE(visit_date)';
      break;
    case 'month':
      dateFilter = 'DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
      groupBy = 'DATE(visit_date)';
      break;
    case 'quarter':
      dateFilter = 'DATE_SUB(CURDATE(), INTERVAL 90 DAY)';
      groupBy = 'WEEK(visit_date)';
      break;
    case 'year':
      dateFilter = 'DATE_SUB(CURDATE(), INTERVAL 365 DAY)';
      groupBy = 'MONTH(visit_date)';
      break;
    default:
      dateFilter = 'DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
      groupBy = 'DATE(visit_date)';
  }

  const sql = `
    SELECT 
      DATE_FORMAT(visit_date, '%Y-%m-%d') as date,
      COUNT(*) as cases
    FROM medical_records
    WHERE visit_date >= ${dateFilter}
    GROUP BY ${groupBy}
    ORDER BY visit_date ASC
  `;

  return query<TrendData>(sql);
}
```

---

## 🔔 Special Features Implementation

### 1. Alert System (`src/lib/alert-system.ts`)
```typescript
import { query } from './db';

interface OutbreakThreshold {
  disease: string;
  casesPerWeek: number;
}

const OUTBREAK_THRESHOLDS: OutbreakThreshold[] = [
  { disease: 'Flu', casesPerWeek: 5 },
  { disease: 'Dengue', casesPerWeek: 3 },
  { disease: 'COVID-19', casesPerWeek: 2 },
  { disease: 'Headache', casesPerWeek: 10 },
  { disease: 'Stomach Ache', casesPerWeek: 7 },
];

export async function checkOutbreakThreshold(disease: string) {
  const threshold = OUTBREAK_THRESHOLDS.find(t => 
    t.disease.toLowerCase() === disease.toLowerCase()
  );
  
  if (!threshold) return;

  // Count cases in the past week
  const sql = `
    SELECT COUNT(*) as caseCount
    FROM medical_records
    WHERE disease_category = ?
    AND visit_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
  `;

  const result = await query<{ caseCount: number }>(sql, [disease]);
  const caseCount = result[0]?.caseCount || 0;

  if (caseCount >= threshold.casesPerWeek) {
    await createAlert({
      type: 'OUTBREAK_SUSPECTED',
      title: `Suspected ${disease} Outbreak`,
      message: `${caseCount} cases detected in the past week (threshold: ${threshold.casesPerWeek})`,
      severity: 'HIGH',
      relatedDisease: disease,
    });
  }
}

async function createAlert(alert: {
  type: string;
  title: string;
  message: string;
  severity: string;
  relatedDisease?: string;
}) {
  const sql = `
    INSERT INTO alerts (id, alert_type, title, message, severity, related_disease)
    VALUES (UUID(), ?, ?, ?, ?, ?)
  `;

  await query(sql, [
    alert.type,
    alert.title,
    alert.message,
    alert.severity,
    alert.relatedDisease || null,
  ]);
}
```

### 2. Duplicate Detection (`src/lib/duplicate-detection.ts`)
```typescript
import { query } from './db';

export async function detectDuplicate(
  studentId: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  lrn: string
) {
  // Find potential duplicates
  const sql = `
    SELECT 
      s.id,
      u.first_name,
      u.last_name,
      s.date_of_birth,
      s.lrn
    FROM students s
    JOIN users u ON s.user_id = u.id
    WHERE s.id != ?
    AND (
      (u.first_name = ? AND u.last_name = ? AND s.date_of_birth = ?)
      OR s.lrn = ?
    )
  `;

  const duplicates = await query<any>(sql, [
    studentId,
    firstName,
    lastName,
    dateOfBirth,
    lrn
  ]);

  for (const duplicate of duplicates) {
    // Calculate similarity
    let matchingFields: string[] = [];
    let similarityScore = 0;

    if (duplicate.first_name === firstName) {
      matchingFields.push('first_name');
      similarityScore += 25;
    }
    if (duplicate.last_name === lastName) {
      matchingFields.push('last_name');
      similarityScore += 25;
    }
    if (duplicate.date_of_birth === dateOfBirth) {
      matchingFields.push('date_of_birth');
      similarityScore += 25;
    }
    if (duplicate.lrn === lrn) {
      matchingFields.push('lrn');
      similarityScore += 25;
    }

    if (similarityScore >= 50) {
      // Record duplicate detection
      await query(
        `INSERT INTO duplicate_detections (
          id, student_id_1, student_id_2, similarity_score, matching_fields
        ) VALUES (UUID(), ?, ?, ?, ?)`,
        [studentId, duplicate.id, similarityScore, JSON.stringify(matchingFields)]
      );

      // Create alert
      await query(
        `INSERT INTO alerts (id, alert_type, title, message, severity, related_student_id)
         VALUES (UUID(), 'DUPLICATE_DETECTED', ?, ?, 'MEDIUM', ?)`,
        [
          'Duplicate Student Record Detected',
          `Potential duplicate found: ${firstName} ${lastName} (${similarityScore}% match)`,
          studentId
        ]
      );
    }
  }
}
```

---

## 🚀 API Routes

### Dashboard Stats (`/api/dashboard/stats`)
```typescript
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getSchoolWideStats } from '@/lib/queries/dashboard';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await getSchoolWideStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Grade Level Stats (`/api/dashboard/grade/[grade]`)
```typescript
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getGradeLevelStats } from '@/lib/queries/dashboard';

export async function GET(
  request: Request,
  { params }: { params: { grade: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stats = await getGradeLevelStats(params.grade);
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Students/Patients List (`/api/students`)
```typescript
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { findStudents } from '@/lib/queries/students';

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const grade = searchParams.get('grade') || '';
    const section = searchParams.get('section') || '';

    const { students, total } = await findStudents({
      page,
      limit,
      search,
      grade,
      section
    });

    return NextResponse.json({
      students,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

---

## ✅ Implementation Checklist

### Database Setup
- [ ] Create MySQL database
- [ ] Run schema SQL
- [ ] Insert initial sections data
- [ ] Create super admin user
- [ ] Test database connection

### Query Functions
- [ ] Dashboard queries (school-wide, grade level)
- [ ] Student queries (list, search, create)
- [ ] Medical records queries
- [ ] Statistics queries
- [ ] Alert system queries
- [ ] Duplicate detection queries

### API Routes
- [ ] `/api/dashboard/stats`
- [ ] `/api/dashboard/grade/[grade]`
- [ ] `/api/students`
- [ ] `/api/students/[id]`
- [ ] `/api/students/[id]/records`
- [ ] `/api/statistics`
- [ ] `/api/alerts`

### Special Features
- [ ] Alert system implementation
- [ ] Duplicate detection implementation
- [ ] Audit logging implementation

---

*Last Updated: January 2026*  
*Version: 2.0 - Based on FEATURES-2.0 PDF*
