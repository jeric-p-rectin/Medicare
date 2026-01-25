# MEDICARE - Medical Data and Information Community Alert Response Engine
## Revised Development Plan (Based on FEATURES-2.0)
### For School Clinic Management System

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [System Features](#system-features)
4. [Development Timeline](#development-timeline)
5. [Database Schema Design](#database-schema-design)
6. [Implementation Guide](#implementation-guide)
7. [Deployment Guide](#deployment-guide)

---

## 🎯 Project Overview

**Project Name:** MEDICARE  
**Type:** Web-based School Clinic Medical Records System  
**Target Users:** School Clinic (Grades 7-12)  
**Development Period:** 2-3 months  
**Estimated Cost:** ₱0-800 (using free tier services)

### Core Features (Based on FEATURES-2.0)

#### User Access Levels
1. **Super Admin**
   - Manage Admin accounts
   - Confirm registration of new students (transferees or enrollees)
   - Monitor who accesses and edits records
   - Full system access

2. **Admin**
   - Manage student/patient individual accounts
   - Register new students
   - Edit patient records
   - Access all quick actions

3. **Patient** (Tentative)
   - View their own medical records
   - See dates of illnesses/diseases
   - Login required with password

#### Quick Actions

1. **Admin Dashboard**
   - **School Wide View:**
     - Total number of registered students
     - Grade level breakdown (7, 8, 9, 10, 11, 12)
     - Interactive grade level cards
   - **Grade Level View (when grade clicked):**
     - Total registered students per grade level
     - Section breakdown (multiple sections per grade)
     - Number of registered patients per section

2. **Patient Management**
   - **Patient Table:**
     - List all registered patients
     - Display: Student Name, Grade Level, Section
     - Search bar functionality
     - Pagination
   - **Individual Patient:**
     - Patient photo placeholder
     - Basic Information:
       - Name
       - Age
       - Birthday
       - Sex
       - Grade Level and Section
       - LRN (Learner Reference Number)
       - Parents or Guardian Contact
       - Address
       - BMI
       - Health History
     - Record section for updating patient information
     - Medical visit history

3. **Registration**
   - Create account for new students
   - Required Information:
     - Name (First, Middle, Last)
     - Age
     - Birthday
     - Sex
     - LRN
     - Parents or Guardian Information (Name and Contact)
     - Health History
     - BMI
     - Address
     - Grade Level and Section

4. **Statistics Dashboard**
   - Disease and illness statistics
   - Time period filtering
   - Visual charts:
     - Pie charts
     - Line graphs
     - Bar graphs
   - Cases count with date ranges

#### Special Features

1. **Alert System**
   - Monitors disease/illness frequency
   - Alerts Super Admin and Admin when frequency threshold reached
   - Suspected outbreak notifications
   - Real-time alerts

2. **Duplicate Detection**
   - Detects duplicate student files
   - Alerts Super Admin and Admin
   - Prevents duplicate registrations

#### Database
- **MySQL Database:** All information securely stored
- Secure patient data protection
- Regular backups

---

## 🛠 Technical Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts (for Statistics Dashboard)
- **Icons:** Lucide React

### Backend
- **API:** Next.js API Routes
- **Database Driver:** mysql2
- **Authentication:** NextAuth.js v5
- **Validation:** Zod

### Database
- **MySQL** (Aiven or similar)
- 1GB storage (free tier)
- SSL/TLS encryption

### Hosting
- **Vercel** (free tier)

---

## 📅 Development Timeline

**Total Duration:** 10-12 weeks  
**Work Schedule:** 10-15 hours per week

### Week 1-2: Project Setup & Authentication
- Next.js 15 project setup
- MySQL database setup
- User authentication system
- Login page for all user types
- Role-based access control

### Week 3-4: Admin Dashboard (School Wide & Grade Level Views)
- School wide statistics view
- Grade level cards (7-12)
- Grade level detail view with sections
- Student count per grade/section
- Navigation between views

### Week 5-6: Patient Management
- Patient table with search
- Patient list with pagination
- Individual patient view
- Patient profile display
- Medical record history

### Week 7-8: Registration System
- Multi-step registration form
- Personal information collection
- Health history form
- Duplicate detection integration
- Form validation

### Week 9: Statistics Dashboard
- Disease/illness tracking
- Chart implementations (Pie, Line, Bar)
- Time period filters
- Data visualization

### Week 10: Special Features
- Alert system implementation
- Outbreak detection logic
- Duplicate detection system
- Notification system

### Week 11-12: Testing & Deployment
- Comprehensive testing
- Bug fixes
- User acceptance testing
- Deployment to production
- Documentation

---

## 🗄 Database Schema Design

### Tables Overview

#### 1. users
```sql
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
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 2. students (patients)
```sql
CREATE TABLE students (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) UNIQUE NOT NULL,
  lrn VARCHAR(12) UNIQUE NOT NULL COMMENT 'Learner Reference Number',
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
  student_number VARCHAR(20) UNIQUE NOT NULL,
  created_by_id VARCHAR(36) NOT NULL,
  updated_by_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by_id) REFERENCES users(id),
  FOREIGN KEY (updated_by_id) REFERENCES users(id),
  INDEX idx_grade_section (grade_level, section),
  INDEX idx_lrn (lrn)
);
```

#### 3. medical_records
```sql
CREATE TABLE medical_records (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  student_id VARCHAR(36) NOT NULL,
  visit_date DATE NOT NULL,
  chief_complaint TEXT NOT NULL,
  diagnosis TEXT,
  treatment TEXT,
  notes TEXT,
  
  -- Disease/Illness Categorization
  disease_category VARCHAR(100),
  illness_type VARCHAR(100),
  is_outbreak_related BOOLEAN DEFAULT FALSE,
  
  recorded_by_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (recorded_by_id) REFERENCES users(id),
  INDEX idx_visit_date (visit_date),
  INDEX idx_disease (disease_category, illness_type)
);
```

#### 4. sections
```sql
CREATE TABLE sections (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  grade_level ENUM('7', '8', '9', '10', '11', '12') NOT NULL,
  section_name VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_grade_section (grade_level, section_name)
);
```

#### 5. alerts
```sql
CREATE TABLE alerts (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  alert_type ENUM('OUTBREAK_SUSPECTED', 'DUPLICATE_DETECTED', 'LOW_STOCK') NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  severity ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  related_disease VARCHAR(100),
  related_record_id VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP NULL,
  
  INDEX idx_alert_type (alert_type),
  INDEX idx_unread (is_read, created_at)
);
```

#### 6. duplicate_detections
```sql
CREATE TABLE duplicate_detections (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  student_id_1 VARCHAR(36) NOT NULL,
  student_id_2 VARCHAR(36) NOT NULL,
  similarity_score DECIMAL(5,2) NOT NULL,
  matching_fields JSON NOT NULL,
  is_resolved BOOLEAN DEFAULT FALSE,
  resolved_by_id VARCHAR(36),
  resolution_notes TEXT,
  detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,
  
  FOREIGN KEY (student_id_1) REFERENCES students(id),
  FOREIGN KEY (student_id_2) REFERENCES students(id),
  FOREIGN KEY (resolved_by_id) REFERENCES users(id),
  INDEX idx_unresolved (is_resolved, detected_at)
);
```

#### 7. audit_logs
```sql
CREATE TABLE audit_logs (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(50) NOT NULL,
  record_id VARCHAR(36),
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_action (user_id, action, created_at),
  INDEX idx_table_record (table_name, record_id)
);
```

---

## 🚀 Implementation Guide

### Phase 1: Authentication & User Management (Week 1-2)

#### 1. Setup Next.js Project
```bash
npx create-next-app@latest medicare --typescript --tailwind --app
cd medicare
npm install mysql2 next-auth@beta bcryptjs zod react-hook-form @hookform/resolvers
npx shadcn-ui@latest init
```

#### 2. Database Connection (`src/lib/db.ts`)
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
  keepAliveInitialDelay: 0,
});

export async function query<T>(sql: string, params?: any[]): Promise<T> {
  const [results] = await pool.execute(sql, params);
  return results as T;
}

export async function queryOne<T>(sql: string, params?: any[]): Promise<T | null> {
  const [results] = await pool.execute(sql, params);
  const rows = results as T[];
  return rows[0] || null;
}

export default pool;
```

#### 3. Authentication Setup
Follow NextAuth.js v5 setup for role-based authentication with MySQL.

### Phase 2: Admin Dashboard (Week 3-4)

#### School Wide Dashboard Component
```typescript
// src/app/(protected)/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GradeStats {
  grade: string;
  totalStudents: number;
}

export default function AdminDashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [gradeStats, setGradeStats] = useState<GradeStats[]>([]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    const response = await fetch('/api/dashboard/stats');
    const data = await response.json();
    setTotalStudents(data.totalStudents);
    setGradeStats(data.gradeStats);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        School Wide Dashboard
      </h1>

      {/* Total Students Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Total Registered Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-6xl font-bold text-[#C41E3A]">
            {totalStudents}
          </div>
        </CardContent>
      </Card>

      {/* Grade Level Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {['7', '8', '9', '10', '11', '12'].map((grade) => {
          const stats = gradeStats.find(g => g.grade === grade);
          return (
            <Card 
              key={grade}
              className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
              onClick={() => window.location.href = `/dashboard/grade/${grade}`}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#C41E3A] to-[#E63946] flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{grade}</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats?.totalStudents || 0}
                </div>
                <div className="text-sm text-gray-500">Students</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
```

#### Grade Level View Component
```typescript
// src/app/(protected)/dashboard/grade/[grade]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface SectionStats {
  sectionName: string;
  studentCount: number;
}

export default function GradeLevelView() {
  const params = useParams();
  const grade = params.grade as string;
  const [sections, setSections] = useState<SectionStats[]>([]);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    fetchGradeStats();
  }, [grade]);

  const fetchGradeStats = async () => {
    const response = await fetch(`/api/dashboard/grade/${grade}`);
    const data = await response.json();
    setSections(data.sections);
    setTotalStudents(data.totalStudents);
  };

  return (
    <div className="p-8">
      <Button 
        variant="ghost" 
        onClick={() => window.history.back()}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Grade {grade} - Level Wide
      </h1>

      {/* Total Students for Grade */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Total Registered Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold text-[#C41E3A]">
            {totalStudents}
          </div>
        </CardContent>
      </Card>

      {/* Sections Grid */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Sections</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sections.map((section) => (
          <Card 
            key={section.sectionName}
            className="cursor-pointer hover:shadow-lg transition-all"
            onClick={() => window.location.href = `/students?grade=${grade}&section=${section.sectionName}`}
          >
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFF5F6] flex items-center justify-center">
                <span className="text-2xl font-bold text-[#C41E3A]">
                  {section.sectionName}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-800">
                {section.studentCount}
              </div>
              <div className="text-sm text-gray-500">Registered Patients</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

### Phase 3: Patient Management (Week 5-6)

#### Patient Table with Search
```typescript
// src/app/(protected)/patients/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserPlus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gradeLevel: string;
  section: string;
  studentNumber: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPatients();
  }, [searchQuery, page]);

  const fetchPatients = async () => {
    const response = await fetch(
      `/api/patients?search=${searchQuery}&page=${page}&limit=20`
    );
    const data = await response.json();
    setPatients(data.patients);
    setTotalPages(data.pagination.totalPages);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
        <Button 
          className="bg-gradient-to-r from-[#C41E3A] to-[#E63946]"
          onClick={() => window.location.href = '/registration'}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Register New Student
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by name, grade, or section..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Grade Level and Section</TableHead>
              <TableHead>Student Number</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow 
                key={patient.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => window.location.href = `/patients/${patient.id}`}
              >
                <TableCell className="font-medium">
                  {patient.lastName}, {patient.firstName} {patient.middleName}
                </TableCell>
                <TableCell>
                  Grade {patient.gradeLevel} - {patient.section}
                </TableCell>
                <TableCell>{patient.studentNumber}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Record
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-4 flex justify-between items-center border-t">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
```

#### Individual Patient View
```typescript
// src/app/(protected)/patients/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Calendar, User, Phone, MapPin } from 'lucide-react';

interface PatientDetails {
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
  parentGuardianName: string;
  parentGuardianContact: string;
  address: string;
  bmi: number;
  healthHistory: string;
  medicalRecords: MedicalRecord[];
}

interface MedicalRecord {
  id: string;
  visitDate: string;
  chiefComplaint: string;
  diagnosis: string;
  treatment: string;
}

export default function IndividualPatientPage() {
  const params = useParams();
  const id = params.id as string;
  const [patient, setPatient] = useState<PatientDetails | null>(null);

  useEffect(() => {
    fetchPatientDetails();
  }, [id]);

  const fetchPatientDetails = async () => {
    const response = await fetch(`/api/patients/${id}`);
    const data = await response.json();
    setPatient(data);
  };

  if (!patient) return <div>Loading...</div>;

  const initials = `${patient.firstName[0]}${patient.lastName[0]}`;

  return (
    <div className="p-8">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()}
        >
          ← Back to Patient List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Patient Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <Avatar className="w-32 h-32">
                  <AvatarFallback className="text-4xl bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Name</div>
                  <div className="font-semibold text-lg">
                    {patient.firstName} {patient.middleName} {patient.lastName}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Age</div>
                    <div className="font-semibold">{patient.age}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Sex</div>
                    <div className="font-semibold">{patient.sex}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Birthday</div>
                  <div className="font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(patient.dateOfBirth).toLocaleDateString()}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">LRN</div>
                  <div className="font-semibold">{patient.lrn}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Grade Level and Section</div>
                  <div className="font-semibold">
                    Grade {patient.gradeLevel} - {patient.section}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Parents or Guardian Contact</div>
                  <div className="font-semibold">{patient.parentGuardianName}</div>
                  <div className="text-sm flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4" />
                    {patient.parentGuardianContact}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-semibold flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1" />
                    {patient.address}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">BMI</div>
                  <div className="font-semibold">{patient.bmi || 'Not recorded'}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500">Health History</div>
                  <div className="text-sm">
                    {patient.healthHistory || 'No health history recorded'}
                  </div>
                </div>
              </div>

              <Button 
                className="w-full mt-6 bg-gradient-to-r from-[#C41E3A] to-[#E63946]"
                onClick={() => window.location.href = `/patients/${id}/edit`}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Patient Info
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Medical Records */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Medical Records</CardTitle>
              <Button 
                className="bg-gradient-to-r from-[#C41E3A] to-[#E63946]"
                onClick={() => window.location.href = `/patients/${id}/new-record`}
              >
                Add New Record
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.medicalRecords.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No medical records yet
                  </div>
                ) : (
                  patient.medicalRecords.map((record) => (
                    <Card key={record.id} className="border-l-4 border-l-[#C41E3A]">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-semibold text-lg">
                            {record.chiefComplaint}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(record.visitDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-semibold">Diagnosis: </span>
                            {record.diagnosis}
                          </div>
                          <div>
                            <span className="font-semibold">Treatment: </span>
                            {record.treatment}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

### Phase 4: Statistics Dashboard (Week 9)

```typescript
// src/app/(protected)/statistics/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function StatisticsDashboard() {
  const [timePeriod, setTimePeriod] = useState('month');
  const [diseaseData, setDiseaseData] = useState([]);
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    fetchStatistics();
  }, [timePeriod]);

  const fetchStatistics = async () => {
    const response = await fetch(`/api/statistics?period=${timePeriod}`);
    const data = await response.json();
    setDiseaseData(data.diseaseBreakdown);
    setTrendData(data.trendData);
  };

  const COLORS = ['#C41E3A', '#E63946', '#DC143C', '#E57373', '#8B1A2E'];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Statistics Dashboard
        </h1>
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Past Week</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
            <SelectItem value="quarter">Past Quarter</SelectItem>
            <SelectItem value="year">Past Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Disease Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={diseaseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {diseaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Cases by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={diseaseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#C41E3A" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Trend Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="cases" 
                stroke="#C41E3A" 
                strokeWidth={2}
                dot={{ fill: '#C41E3A', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 🔔 Special Features Implementation

### Alert System
```typescript
// src/lib/alert-system.ts
import { query } from './db';

interface OutbreakThreshold {
  disease: string;
  casesPerWeek: number;
}

const OUTBREAK_THRESHOLDS: OutbreakThreshold[] = [
  { disease: 'Flu', casesPerWeek: 5 },
  { disease: 'Dengue', casesPerWeek: 3 },
  { disease: 'COVID-19', casesPerWeek: 2 },
  // Add more diseases as needed
];

export async function checkOutbreakThreshold(disease: string) {
  const threshold = OUTBREAK_THRESHOLDS.find(t => t.disease === disease);
  if (!threshold) return;

  // Count cases in the past week
  const sql = `
    SELECT COUNT(*) as caseCount
    FROM medical_records
    WHERE disease_category = ?
    AND visit_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
  `;

  const result = await query<{ caseCount: number }[]>(sql, [disease]);
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
  relatedDisease: string;
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
    alert.relatedDisease,
  ]);
}
```

### Duplicate Detection System
```typescript
// src/lib/duplicate-detection.ts
import { query } from './db';

export async function checkDuplicateStudent(
  firstName: string,
  lastName: string,
  dateOfBirth: string
) {
  const sql = `
    SELECT 
      s.id,
      u.first_name,
      u.last_name,
      u.middle_name,
      s.date_of_birth,
      s.lrn,
      s.grade_level,
      s.section
    FROM students s
    JOIN users u ON s.user_id = u.id
    WHERE u.first_name = ? AND u.last_name = ? AND s.date_of_birth = ?
  `;

  const duplicates = await query<any[]>(sql, [firstName, lastName, dateOfBirth]);

  if (duplicates.length > 0) {
    // Create duplicate detection alert
    await createDuplicateAlert(duplicates);
  }

  return duplicates;
}

async function createDuplicateAlert(duplicates: any[]) {
  const sql = `
    INSERT INTO alerts (id, alert_type, title, message, severity)
    VALUES (UUID(), 'DUPLICATE_DETECTED', ?, ?, 'MEDIUM')
  `;

  await query(sql, [
    'Duplicate Student Record Detected',
    `Potential duplicate found: ${duplicates[0].first_name} ${duplicates[0].last_name}`,
  ]);
}
```

---

## 🚀 Deployment Guide

### 1. Setup Aiven MySQL
1. Create account at aiven.io
2. Create MySQL service (free tier - 1GB)
3. Copy connection credentials
4. Run schema SQL to create tables

### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 3. Environment Variables (Vercel)
Add these in Vercel Project Settings:
```
DB_HOST=mysql-xxxxx.aivencloud.com
DB_PORT=xxxxx
DB_USER=avnadmin
DB_PASSWORD=xxxxx
DB_NAME=medicare
NEXTAUTH_SECRET=generate-random-secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

---

## 📝 API Routes Summary

### Dashboard
- `GET /api/dashboard/stats` - School-wide statistics
- `GET /api/dashboard/grade/[grade]` - Grade level statistics

### Patients
- `GET /api/patients` - List all patients with search and pagination
- `GET /api/patients/[id]` - Get patient details
- `POST /api/patients` - Create new patient
- `PUT /api/patients/[id]` - Update patient information
- `GET /api/patients/check-duplicate` - Check for duplicates

### Medical Records
- `GET /api/patients/[id]/records` - Get patient's medical records
- `POST /api/patients/[id]/records` - Add new medical record

### Statistics
- `GET /api/statistics` - Get disease/illness statistics
- `GET /api/statistics/trends` - Get trend data

### Alerts
- `GET /api/alerts` - Get all alerts
- `PUT /api/alerts/[id]` - Mark alert as read
- `DELETE /api/alerts/[id]` - Delete alert

---

## ✅ Implementation Checklist

### Week 1-2: Foundation
- [ ] Next.js 15 project setup
- [ ] MySQL database connection
- [ ] Authentication system
- [ ] User login page
- [ ] Role-based access

### Week 3-4: Dashboard
- [ ] School-wide dashboard
- [ ] Grade level cards
- [ ] Grade detail view with sections
- [ ] Navigation flow

### Week 5-6: Patient Management
- [ ] Patient list with search
- [ ] Individual patient view
- [ ] Patient profile display
- [ ] Medical records display

### Week 7-8: Registration
- [ ] Registration form (all fields from PDF)
- [ ] Form validation
- [ ] Duplicate check integration
- [ ] Success confirmation

### Week 9: Statistics
- [ ] Disease/illness tracking
- [ ] Pie chart implementation
- [ ] Line graph implementation
- [ ] Bar graph implementation
- [ ] Time period filters

### Week 10: Special Features
- [ ] Alert system logic
- [ ] Outbreak detection
- [ ] Duplicate detection system
- [ ] Alert notifications UI

### Week 11-12: Final
- [ ] Comprehensive testing
- [ ] Bug fixes
- [ ] Production deployment
- [ ] Documentation

---

## 📚 Additional Notes

### Key Design Principles
- **Red & White Theme:** All UI elements use the color palette from the logo
- **Simple Navigation:** Easy access to all quick actions
- **Data Security:** Password-required login for all users
- **Clear Hierarchy:** School Wide → Grade Level → Sections
- **Search Functionality:** Quick patient lookup by name, grade, section

### Important Features from PDF
1. **Login Required:** Every time users open their account, they need to log in with password
2. **Admin Dashboard:** Two-level hierarchy (School Wide → Grade Level)
3. **Patient Table:** List with search bar, showing names, grade, and section
4. **Individual Records:** Complete patient information with photo placeholder
5. **Statistics:** Visual charts (Pie, Line, Bar) showing disease/illness trends
6. **Alert System:** Automatic alerts for suspected outbreaks
7. **Duplicate Detection:** Automatic detection and alert for duplicate files

---

*Last Updated: January 2026*  
*Version: 2.0 - Revised based on FEATURES-2.0 PDF*
