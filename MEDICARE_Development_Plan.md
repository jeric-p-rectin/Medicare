# MEDICARE - Medical Data and Information Community Alert Response Engine
## Complete Development Plan & Implementation Guide

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Development Timeline](#development-timeline)
4. [Complete Project Structure](#complete-project-structure)
5. [Database Schema Design](#database-schema-design)
6. [Step-by-Step Implementation Guide](#step-by-step-implementation-guide)
7. [Feature Implementation Details](#feature-implementation-details)
8. [Security & Best Practices](#security--best-practices)
9. [Testing Strategy](#testing-strategy)
10. [Deployment Guide](#deployment-guide)

---

## 🎯 Project Overview

**Project Name:** MEDICARE  
**Type:** Web-based Medical Records Management System  
**Target Users:** Barangay Health Centers, Clinics  
**Development Period:** 2-3 months  
**Estimated Cost:** ₱0-800 (using free tier services)

### Key Features
- Three-tier user access (Super Admin, Admin, Patient)
- Electronic Medical Records (EMR)
- Inventory Management (Medicine & Vaccines)
- Disease Trends Tracking
- Statistics Dashboard
- Automated Notifications & Alerts
- Duplicate Detection System

---

## 🛠 Technical Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts or Chart.js
- **Date Handling:** date-fns
- **Icons:** Lucide React

### Backend
- **API:** Next.js API Routes (App Router)
- **Database Driver:** mysql2 (native MySQL driver for Node.js)
- **Authentication:** NextAuth.js v5 (Auth.js)
- **Validation:** Zod
- **SQL Query Builder:** None (raw SQL queries)

### Database
**Choice:** Aiven MySQL (Free Tier)
- 1GB storage
- 30-day free trial, then limited free tier
- Automated backups
- SSL/TLS encryption
- Maximum 5 concurrent connections

### Hosting & Deployment
- **Frontend/Backend:** Vercel (free tier)
- **Database:** Aiven MySQL (free tier - 1GB storage)
- **Domain:** Optional (₱500-800/year)

---

## 📅 Development Timeline

**Total Duration:** 10-12 weeks (80-100 hours of work)  
**Work Schedule:** 10-15 hours per week  
**Team Size:** 3-4 members recommended

---

### 🗓️ Week-by-Week Feature Implementation

---

## **WEEK 1: Project Setup & Database Foundation**
**Goals:** Get everything installed and database ready  
**Hours:** 8-10 hours

### Day 1-2: Environment Setup (3-4 hours)
- [ ] Install Node.js, MySQL client, and development tools
- [ ] Create Next.js 15 project
- [ ] Install all dependencies (mysql2, shadcn/ui, etc.)
- [ ] Setup VS Code with extensions
- [ ] Initialize Git repository
- [ ] Create project folder structure

**Deliverables:**
- Working Next.js app that runs on localhost:3000
- All dependencies installed without errors

### Day 3-4: Database Setup (3-4 hours)
- [ ] Create Aiven MySQL account
- [ ] Provision MySQL service (wait for it to start)
- [ ] Download connection credentials
- [ ] Create `database/schema.sql` file
- [ ] Run schema on Aiven MySQL
- [ ] Create `database/seed.sql` file
- [ ] Test database connection from Node.js

**Deliverables:**
- Aiven MySQL database running with all tables created
- Can connect to database from local machine
- Tables visible in MySQL client

### Day 5-7: Core Database Layer (2-3 hours)
- [ ] Create `src/lib/db.ts` connection pool
- [ ] Test connection with sample query
- [ ] Create basic type definitions in `src/types/`
- [ ] Setup environment variables
- [ ] Document connection process

**Deliverables:**
- Working MySQL connection pool
- Successfully execute test queries
- `.env.local` properly configured

**Team Assignment:**
- Developer 1: Project setup, folder structure
- Developer 2: Aiven database setup
- Developer 3: Documentation, testing

---

## **WEEK 2: Authentication System**
**Goals:** Login system for all user types  
**Hours:** 10-12 hours

### Features to Implement:
- [ ] User login page UI
- [ ] NextAuth.js setup
- [ ] User query functions (`src/lib/queries/users.ts`)
- [ ] Session management
- [ ] Role-based access control
- [ ] Password hashing with bcrypt

### Specific Tasks:

**Day 1-2: Query Functions (3-4 hours)**
- [ ] `findUserByUsername()`
- [ ] `findUserById()`
- [ ] `updateUserLastLogin()`
- [ ] Type definitions for User

**Day 3-4: Authentication Logic (4-5 hours)**
- [ ] Setup NextAuth.js configuration
- [ ] Create credentials provider
- [ ] Implement authorize function
- [ ] Setup JWT callbacks
- [ ] Create auth API route

**Day 5-7: Login UI (3-4 hours)**
- [ ] Design login page with shadcn/ui
- [ ] Add form validation with Zod
- [ ] Handle login errors
- [ ] Add loading states
- [ ] Test with different user roles

**Testing Checklist:**
- [ ] Super Admin can login
- [ ] Admin can login
- [ ] Patient can login
- [ ] Wrong password shows error
- [ ] Non-existent user shows error
- [ ] Session persists after page refresh

**Deliverables:**
- Working login system
- Session management working
- Users redirected based on role

**Team Assignment:**
- Developer 1: Query functions & NextAuth setup
- Developer 2: UI components & forms
- Developer 3: Testing & bug fixes

---

## **WEEK 3: User Management (Super Admin)**
**Goals:** Super Admin can manage Admin accounts  
**Hours:** 10-12 hours

### Features to Implement:
- [ ] Super Admin dashboard
- [ ] Admin list view
- [ ] Create new Admin account
- [ ] Edit Admin details
- [ ] Deactivate/Activate Admin accounts
- [ ] View Admin activity

### Specific Tasks:

**Day 1-2: Dashboard UI (3-4 hours)**
- [ ] Create Super Admin layout with sidebar
- [ ] Dashboard with statistics cards
- [ ] Navigation menu
- [ ] Logout functionality

**Day 3-4: Admin Management Queries (3-4 hours)**
- [ ] `getAllUsers(role)` query
- [ ] `createUser()` query
- [ ] `updateUser()` query
- [ ] `deactivateUser()` query
- [ ] API route: `/api/users`

**Day 5-7: Admin Management UI (4-5 hours)**
- [ ] Admin list table with pagination
- [ ] "Create Admin" form modal
- [ ] Edit Admin form
- [ ] Confirmation dialogs
- [ ] Success/error toasts

**Testing Checklist:**
- [ ] Can view all admins
- [ ] Can create new admin
- [ ] Can edit admin details
- [ ] Can deactivate admin
- [ ] Deactivated admin cannot login
- [ ] Pagination works correctly

**Deliverables:**
- Super Admin can fully manage Admin accounts
- All CRUD operations working

**Team Assignment:**
- Developer 1: Database queries & API routes
- Developer 2: UI components & tables
- Developer 3: Forms & validation

---

## **WEEK 4: Patient Registration System**
**Goals:** Register new patients with complete information  
**Hours:** 12-15 hours

### Features to Implement:
- [ ] Patient registration form (multi-step)
- [ ] Duplicate detection
- [ ] Auto-generate patient number
- [ ] Calculate age from birthdate
- [ ] Determine patient categories
- [ ] Emergency contact information

### Specific Tasks:

**Day 1-2: Patient Queries (4-5 hours)**
- [ ] `createPatient()` with transaction
- [ ] `checkDuplicatePatient()`
- [ ] `findPatients()` with pagination
- [ ] `findPatientById()`
- [ ] Type definitions for Patient
- [ ] API route: `/api/patients`
- [ ] API route: `/api/patients/check-duplicate`

**Day 3-4: Registration Form - Part 1 (4-5 hours)**
- [ ] Personal Information section
  - First name, last name, middle name
  - Date of birth (with age calculation)
  - Gender selection
  - Civil status
- [ ] Contact Information section
  - Phone number
  - Complete address fields
  - Barangay, City, Province, Zip code

**Day 5-7: Registration Form - Part 2 (4-5 hours)**
- [ ] Emergency Contact section
- [ ] Medical Information section
  - Blood type
  - Height & weight
  - Allergies (textarea)
- [ ] Classification section
  - PWD checkbox + ID number
  - Senior checkbox + ID number
  - Pregnant checkbox + due date
- [ ] Form validation with Zod
- [ ] Duplicate check before submission
- [ ] Success message with patient number

**Testing Checklist:**
- [ ] All fields validate correctly
- [ ] Age calculates automatically
- [ ] Duplicate detection works
- [ ] Patient number generates uniquely
- [ ] Categories assigned correctly
- [ ] Data saves to database
- [ ] Can view registered patient

**Deliverables:**
- Complete patient registration system
- Duplicate detection working
- Patient data properly categorized

**Team Assignment:**
- Developer 1: Database queries & duplicate detection
- Developer 2: Form sections & validation
- Developer 3: UI components & testing

---

## **WEEK 5: Patient Management Dashboard**
**Goals:** View and manage all patients  
**Hours:** 10-12 hours

### Features to Implement:
- [ ] Patient list table with search
- [ ] Patient statistics cards
- [ ] Filter by category (PWD, Senior, etc.)
- [ ] View individual patient details
- [ ] Edit patient information
- [ ] Patient profile page

### Specific Tasks:

**Day 1-2: Dashboard Statistics (3-4 hours)**
- [ ] `getDashboardStats()` query
- [ ] API route: `/api/statistics/dashboard`
- [ ] Statistics cards component
  - Total patients
  - Infants, Minors, Adults, Seniors
  - PWD count
  - Pregnant count
- [ ] Charts with Recharts (patient breakdown)

**Day 3-4: Patient List (3-4 hours)**
- [ ] Patient table with columns:
  - Patient Number
  - Full Name
  - Age/Gender
  - Contact
  - Category badges
- [ ] Search functionality (by name, patient number)
- [ ] Pagination controls
- [ ] Filter by category dropdown

**Day 5-7: Patient Details & Edit (4-5 hours)**
- [ ] Individual patient page `/patients/[id]`
- [ ] Display all patient information
- [ ] Edit patient form (similar to registration)
- [ ] `updatePatient()` query
- [ ] Update API route: `/api/patients/[id]`

**Testing Checklist:**
- [ ] Statistics display correctly
- [ ] Search finds patients
- [ ] Pagination works
- [ ] Filters work correctly
- [ ] Can view patient details
- [ ] Can edit patient information
- [ ] Changes save correctly

**Deliverables:**
- Working patient management dashboard
- Search and filter working
- Patient editing functional

**Team Assignment:**
- Developer 1: Queries & API routes
- Developer 2: Dashboard & statistics
- Developer 3: Table & patient details

---

## **WEEK 6: Medical Records System**
**Goals:** Create and view patient medical records  
**Hours:** 12-15 hours

### Features to Implement:
- [ ] Create medical record form
- [ ] View patient medical history
- [ ] Record vital signs
- [ ] Track symptoms and diagnosis
- [ ] Treatment notes
- [ ] Follow-up scheduling

### Specific Tasks:

**Day 1-2: Medical Record Queries (4-5 hours)**
- [ ] `createMedicalRecord()` query
- [ ] `getMedicalRecordsByPatient()` query
- [ ] `getMedicalRecordById()` query
- [ ] Type definitions for MedicalRecord
- [ ] API route: `/api/medical-records`
- [ ] API route: `/api/medical-records/[id]`

**Day 3-4: Medical Record Form (4-5 hours)**
- [ ] Visit information section
- [ ] Chief complaint (textarea)
- [ ] Symptoms (multi-select or JSON input)
- [ ] Vital signs inputs:
  - Blood pressure
  - Temperature
  - Pulse rate
  - Respiratory rate
  - Weight, Height
- [ ] Diagnosis (textarea)
- [ ] Treatment notes (textarea)
- [ ] Follow-up date picker

**Day 5-7: Medical History View (4-5 hours)**
- [ ] Medical records timeline for patient
- [ ] View individual record details
- [ ] Filter by date range
- [ ] Print/export record option
- [ ] Add to patient profile page

**Testing Checklist:**
- [ ] Can create medical record
- [ ] Vital signs save correctly
- [ ] Symptoms save as JSON
- [ ] Can view patient's medical history
- [ ] Records display chronologically
- [ ] Can view individual record details

**Deliverables:**
- Medical record creation system
- Patient medical history view
- All data capturing correctly

**Team Assignment:**
- Developer 1: Queries & API routes
- Developer 2: Form components
- Developer 3: History view & timeline

---

## **WEEK 7: Prescription Management**
**Goals:** Create and manage prescriptions  
**Hours:** 12-15 hours

### Features to Implement:
- [ ] Prescription creation linked to medical record
- [ ] Medicine selection from inventory
- [ ] Dosage and frequency input
- [ ] Multiple medicines per prescription
- [ ] View patient prescriptions
- [ ] Print prescription

### Specific Tasks:

**Day 1-2: Prescription Queries (4-5 hours)**
- [ ] `createPrescription()` with transaction
- [ ] `createPrescriptionItems()` (multiple)
- [ ] `getPrescriptionsByPatient()` query
- [ ] `getPrescriptionById()` query
- [ ] Update medicine stock when dispensed
- [ ] Type definitions
- [ ] API routes: `/api/prescriptions`

**Day 3-4: Prescription Form (4-5 hours)**
- [ ] Medicine search/select dropdown
- [ ] Add multiple medicines
- [ ] For each medicine:
  - Dosage input (e.g., "500mg")
  - Frequency input (e.g., "3x daily")
  - Duration input (e.g., "7 days")
  - Instructions (textarea)
  - Quantity to dispense
- [ ] Remove medicine button
- [ ] Prescription notes
- [ ] Link to medical record (optional)

**Day 5-7: Prescription Views (4-5 hours)**
- [ ] Patient prescription list
- [ ] View prescription details
- [ ] Print prescription (printable format)
- [ ] Prescription status (Active/Completed)
- [ ] Update stock when marking completed

**Testing Checklist:**
- [ ] Can create prescription
- [ ] Multiple medicines can be added
- [ ] Can view patient prescriptions
- [ ] Print format looks professional
- [ ] Stock updates when dispensed
- [ ] Cannot prescribe out-of-stock medicine

**Deliverables:**
- Working prescription system
- Medicine inventory updates automatically
- Printable prescription format

**Team Assignment:**
- Developer 1: Queries, transactions & stock updates
- Developer 2: Prescription form
- Developer 3: Views & print layout

---

## **WEEK 8: Appointment Scheduling**
**Goals:** Schedule and manage appointments  
**Hours:** 10-12 hours

### Features to Implement:
- [ ] Schedule appointments for patients
- [ ] Appointment calendar view
- [ ] Appointment reminders
- [ ] Appointment status management
- [ ] View upcoming appointments

### Specific Tasks:

**Day 1-2: Appointment Queries (3-4 hours)**
- [ ] `createAppointment()` query
- [ ] `getAppointmentsByDate()` query
- [ ] `getAppointmentsByPatient()` query
- [ ] `updateAppointmentStatus()` query
- [ ] Type definitions
- [ ] API routes: `/api/appointments`

**Day 3-4: Appointment Form & Calendar (4-5 hours)**
- [ ] Schedule appointment form
  - Patient selection
  - Appointment date picker
  - Time slot selection
  - Appointment type (Check-up, Vaccination, etc.)
  - Purpose/notes
- [ ] Calendar view with shadcn/ui calendar
- [ ] Display appointments on calendar
- [ ] Today's appointments widget

**Day 5-7: Appointment Management (3-4 hours)**
- [ ] View all appointments (table view)
- [ ] Filter by date/patient/status
- [ ] Update appointment status
  - Scheduled → Completed
  - Scheduled → Cancelled
  - Scheduled → No Show
- [ ] Appointment reminders (mark as sent)
- [ ] Patient's appointment history

**Testing Checklist:**
- [ ] Can schedule appointment
- [ ] Calendar displays appointments
- [ ] Can view today's appointments
- [ ] Can update appointment status
- [ ] Patient can see their appointments
- [ ] No double-booking same time

**Deliverables:**
- Appointment scheduling system
- Calendar view working
- Status management functional

**Team Assignment:**
- Developer 1: Queries & API routes
- Developer 2: Calendar & scheduling form
- Developer 3: Appointment list & status management

---

## **WEEK 9: Inventory Management**
**Goals:** Manage medicine and vaccine inventory  
**Hours:** 12-15 hours

### Features to Implement:
- [ ] Medicine inventory list
- [ ] Vaccine inventory list
- [ ] Add new medicines/vaccines
- [ ] Update stock levels
- [ ] Track stock movements
- [ ] Low stock alerts
- [ ] Expiry date tracking

### Specific Tasks:

**Day 1-2: Inventory Queries (4-5 hours)**
- [ ] `getAllMedicines()` query
- [ ] `getAllVaccines()` query
- [ ] `createMedicine()` / `createVaccine()` queries
- [ ] `updateMedicineStock()` with transaction
- [ ] `createInventoryTransaction()` query
- [ ] `checkExpiringItems()` query
- [ ] `checkLowStockItems()` query
- [ ] API routes: `/api/inventory/medicines`, `/api/inventory/vaccines`

**Day 3-4: Inventory List & Management (4-5 hours)**
- [ ] Medicine table with columns:
  - Name, Generic Name, Brand
  - Category, Dosage Form, Strength
  - Stock Quantity
  - Status badge (In Stock/Low/Out)
  - Expiry Date
  - Actions (Edit, Stock In/Out)
- [ ] Vaccine table (similar structure)
- [ ] Filter by category/status
- [ ] Search functionality

**Day 5-7: Stock Management & Alerts (4-5 hours)**
- [ ] Add medicine/vaccine form
- [ ] Stock adjustment form
  - Stock IN (purchase)
  - Stock OUT (usage)
  - Adjustment (correction)
  - Expired (remove)
- [ ] Transaction history view
- [ ] Low stock alert widget
- [ ] Expiring soon alert widget
- [ ] Generate alert notifications

**Testing Checklist:**
- [ ] Can add new medicine/vaccine
- [ ] Can update stock levels
- [ ] Stock status updates automatically
- [ ] Low stock alerts show correctly
- [ ] Expiry alerts show correctly
- [ ] Transaction history logs correctly
- [ ] Cannot dispense out-of-stock items

**Deliverables:**
- Complete inventory management system
- Stock tracking working
- Alerts system functional

**Team Assignment:**
- Developer 1: Queries, transactions & alert logic
- Developer 2: Inventory tables & forms
- Developer 3: Alerts & transaction history

---

## **WEEK 10: Disease Trends & Analytics**
**Goals:** Track disease patterns and generate reports  
**Hours:** 8-10 hours

### Features to Implement:
- [ ] Record disease occurrences
- [ ] Monthly disease trends
- [ ] Disease frequency charts
- [ ] Barangay-wise disease distribution
- [ ] Alert for disease outbreaks

### Specific Tasks:

**Day 1-2: Disease Tracking Queries (3-4 hours)**
- [ ] `recordDiseaseTrend()` query (upsert)
- [ ] `getDiseaseTrends()` by month/year
- [ ] `getTopDiseases()` query
- [ ] `getDiseaseTrendsByBarangay()` query
- [ ] API routes: `/api/disease-trends`

**Day 3-4: Disease Trends Dashboard (3-4 hours)**
- [ ] Disease trends chart (line/bar chart)
- [ ] Top diseases widget
- [ ] Disease by barangay chart
- [ ] Filter by date range
- [ ] Export data option

**Day 5-7: Disease Recording & Alerts (2-3 hours)**
- [ ] Auto-record disease from medical records
- [ ] Manual disease entry form
- [ ] Alert when disease cases spike
- [ ] Disease outbreak warning

**Testing Checklist:**
- [ ] Disease trends record correctly
- [ ] Charts display data accurately
- [ ] Can filter by date
- [ ] Barangay breakdown works
- [ ] Alerts trigger on spike

**Deliverables:**
- Disease trends tracking system
- Analytics dashboard with charts
- Outbreak detection system

**Team Assignment:**
- Developer 1: Queries & analytics logic
- Developer 2: Charts & dashboard
- Developer 3: Alerts & reporting

---

## **WEEK 11: Additional Features & Polish**
**Goals:** Implement remaining features and improve UX  
**Hours:** 10-12 hours

### Features to Implement:
- [ ] Vaccination records
- [ ] Patient calendar (appointments + medicine reminders)
- [ ] Activity logs
- [ ] System notifications
- [ ] User preferences
- [ ] Duplicate patient detection improvements

### Specific Tasks:

**Day 1-3: Vaccination System (4-5 hours)**
- [ ] Vaccination queries
- [ ] Record vaccination
- [ ] Vaccination schedule
- [ ] Vaccine inventory integration
- [ ] Vaccination history view

**Day 4-5: Patient Portal Features (3-4 hours)**
- [ ] Patient dashboard
- [ ] View own medical records
- [ ] View prescriptions
- [ ] View appointments
- [ ] Medication reminders calendar

**Day 6-7: System Features (3-4 hours)**
- [ ] Activity logging (all actions)
- [ ] System notifications table
- [ ] Mark notifications as read
- [ ] Improve duplicate detection
- [ ] Add photo uploads (optional)

**Testing Checklist:**
- [ ] Vaccinations record correctly
- [ ] Patient can view their data
- [ ] Activity logs capture events
- [ ] Notifications display correctly

**Deliverables:**
- Vaccination system complete
- Patient portal functional
- Activity logging working

**Team Assignment:**
- Developer 1: Vaccination system
- Developer 2: Patient portal
- Developer 3: Activity logs & notifications

---

## **WEEK 12: Testing, Bug Fixes & Deployment**
**Goals:** Final testing and production deployment  
**Hours:** 12-15 hours

### Tasks:

**Day 1-2: Comprehensive Testing (4-5 hours)**
- [ ] Test all user roles
- [ ] Test all CRUD operations
- [ ] Test edge cases
- [ ] Test with large datasets
- [ ] Mobile responsiveness testing
- [ ] Browser compatibility testing
- [ ] Document all bugs found

**Day 3-4: Bug Fixes (4-5 hours)**
- [ ] Fix critical bugs
- [ ] Fix UI issues
- [ ] Fix validation errors
- [ ] Optimize slow queries
- [ ] Improve error messages

**Day 5-6: Documentation (2-3 hours)**
- [ ] User manual for each role
- [ ] API documentation
- [ ] Database schema documentation
- [ ] Installation guide
- [ ] Troubleshooting guide

**Day 7: Deployment (2-3 hours)**
- [ ] Deploy to Vercel
- [ ] Verify Aiven MySQL connection
- [ ] Run production migrations
- [ ] Seed production data
- [ ] Test production environment
- [ ] Setup monitoring

**Final Deliverables:**
- Bug-free application
- Complete documentation
- Deployed to production
- Ready for presentation

**Team Assignment:**
- All developers: Testing & bug fixing
- Developer 1: Deployment
- Developer 2: User documentation
- Developer 3: Technical documentation

---

## 📊 Feature Completion Checklist

### Core Features (Must Have)
- [ ] User Authentication (Super Admin, Admin, Patient)
- [ ] Patient Registration & Management
- [ ] Medical Records System
- [ ] Prescription Management
- [ ] Appointment Scheduling
- [ ] Inventory Management (Medicine & Vaccines)
- [ ] Dashboard Statistics

### Important Features (Should Have)
- [ ] Disease Trends Tracking
- [ ] Low Stock Alerts
- [ ] Expiry Date Alerts
- [ ] Duplicate Patient Detection
- [ ] Activity Logging
- [ ] System Notifications

### Nice to Have (Optional)
- [ ] Vaccination Records
- [ ] Patient Portal/Calendar
- [ ] Report Generation
- [ ] SMS/Email Notifications
- [ ] Barcode Scanner for Medicines
- [ ] Photo Uploads

---

## ⏱️ Time Tracking Estimate

| Feature | Estimated Hours |
|---------|----------------|
| Project Setup & Database | 8-10 |
| Authentication System | 10-12 |
| User Management | 10-12 |
| Patient Registration | 12-15 |
| Patient Management Dashboard | 10-12 |
| Medical Records | 12-15 |
| Prescriptions | 12-15 |
| Appointments | 10-12 |
| Inventory Management | 12-15 |
| Disease Trends | 8-10 |
| Additional Features | 10-12 |
| Testing & Deployment | 12-15 |
| **TOTAL** | **116-145 hours** |

**Recommended:** 12 weeks at 10-12 hours/week

---

## 🎯 Milestone Goals

### Month 1 (Weeks 1-4)
✅ Complete project setup  
✅ Authentication working  
✅ Patient registration functional  
✅ Basic patient management  

### Month 2 (Weeks 5-8)
✅ Medical records system  
✅ Prescription management  
✅ Appointment scheduling  
✅ Inventory management  

### Month 3 (Weeks 9-12)
✅ Disease trends & analytics  
✅ Additional features  
✅ Testing & bug fixes  
✅ Deployment & documentation  

---

## 💡 Tips for Staying On Schedule

1. **Daily Standup** (even if async): What did you do? What will you do? Any blockers?
2. **Weekly Code Review**: Review each other's code every week
3. **Test As You Build**: Don't wait until the end to test
4. **Use Git Branches**: Create branches for each feature
5. **Document As You Go**: Write documentation while coding
6. **Buffer Time**: Schedule includes buffer for unexpected issues
7. **MVP First**: Get core features working before adding extras
8. **Ask for Help**: Stuck for more than 2 hours? Ask for help!

---

## 📋 Weekly Deliverables Template

Each week, submit:
1. **Working Demo** - Show what features work
2. **Code Pushed to Git** - All code committed
3. **Documentation** - Update README with new features
4. **Bug List** - List any known issues
5. **Next Week Plan** - What you'll work on next

This keeps the project on track and ensures steady progress! 🚀

---

## 📁 Complete Project Structure

```
medicare/
├── .env.local                          # Environment variables
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── components.json                     # shadcn/ui config
├── database/
│   ├── schema.sql                      # Database schema creation script
│   ├── seed.sql                        # Seed data script
│   └── migrations/                     # Manual migration scripts
│       ├── 001_initial_schema.sql
│       └── 002_add_indexes.sql
├── public/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Landing page
│   │   ├── globals.css                 # Global styles
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (super-admin)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── admins/
│   │   │   │   ├── page.tsx           # Admin list
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx       # Admin details
│   │   │   └── patients/
│   │   │       ├── page.tsx
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   ├── (admin)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── patients/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx       # Register new patient
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx       # Patient overview
│   │   │   │       ├── edit/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── prescriptions/
│   │   │   │       │   └── page.tsx
│   │   │   │       └── appointments/
│   │   │   │           └── page.tsx
│   │   │   ├── inventory/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── medicines/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── vaccines/
│   │   │   │       └── page.tsx
│   │   │   ├── disease-trends/
│   │   │   │   └── page.tsx
│   │   │   └── statistics/
│   │   │       └── page.tsx
│   │   ├── (patient)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── medical-records/
│   │   │   │   └── page.tsx
│   │   │   ├── prescriptions/
│   │   │   │   └── page.tsx
│   │   │   ├── appointments/
│   │   │   │   └── page.tsx
│   │   │   └── calendar/
│   │   │       └── page.tsx
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts
│   │       ├── users/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── patients/
│   │       │   ├── route.ts
│   │       │   ├── [id]/
│   │       │   │   └── route.ts
│   │       │   └── check-duplicate/
│   │       │       └── route.ts
│   │       ├── medical-records/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── prescriptions/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── appointments/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── inventory/
│   │       │   ├── medicines/
│   │       │   │   └── route.ts
│   │       │   ├── vaccines/
│   │       │   │   └── route.ts
│   │       │   └── alerts/
│   │       │       └── route.ts
│   │       ├── disease-trends/
│   │       │   └── route.ts
│   │       └── statistics/
│   │           └── route.ts
│   ├── components/
│   │   ├── ui/                         # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── select.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── chart.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── footer.tsx
│   │   ├── dashboard/
│   │   │   ├── stats-card.tsx
│   │   │   ├── patient-chart.tsx
│   │   │   ├── disease-chart.tsx
│   │   │   └── recent-activity.tsx
│   │   ├── patients/
│   │   │   ├── patient-table.tsx
│   │   │   ├── patient-form.tsx
│   │   │   └── patient-card.tsx
│   │   ├── inventory/
│   │   │   ├── inventory-table.tsx
│   │   │   ├── stock-alert.tsx
│   │   │   └── expiry-alert.tsx
│   │   └── forms/
│   │       ├── login-form.tsx
│   │       ├── registration-form.tsx
│   │       └── prescription-form.tsx
│   ├── lib/
│   │   ├── db.ts                       # MySQL connection pool
│   │   ├── auth.ts                     # Auth configuration
│   │   ├── utils.ts                    # Utility functions
│   │   ├── queries/                    # SQL query functions
│   │   │   ├── users.ts
│   │   │   ├── patients.ts
│   │   │   ├── medical-records.ts
│   │   │   ├── prescriptions.ts
│   │   │   ├── appointments.ts
│   │   │   ├── inventory.ts
│   │   │   └── statistics.ts
│   │   ├── validations/
│   │   │   ├── user.ts
│   │   │   ├── patient.ts
│   │   │   ├── prescription.ts
│   │   │   └── inventory.ts
│   │   └── constants/
│   │       └── index.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── user.ts
│   │   ├── patient.ts
│   │   └── medical-record.ts
│   └── hooks/
│       ├── use-user.ts
│       ├── use-patients.ts
│       └── use-inventory.ts
└── README.md
```
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Landing page
│   │   ├── globals.css                 # Global styles
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (super-admin)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── admins/
│   │   │   │   ├── page.tsx           # Admin list
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx       # Admin details
│   │   │   └── patients/
│   │   │       ├── page.tsx
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   ├── (admin)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── patients/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx       # Register new patient
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx       # Patient overview
│   │   │   │       ├── edit/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── prescriptions/
│   │   │   │       │   └── page.tsx
│   │   │   │       └── appointments/
│   │   │   │           └── page.tsx
│   │   │   ├── inventory/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── medicines/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── vaccines/
│   │   │   │       └── page.tsx
│   │   │   ├── disease-trends/
│   │   │   │   └── page.tsx
│   │   │   └── statistics/
│   │   │       └── page.tsx
│   │   ├── (patient)/
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── medical-records/
│   │   │   │   └── page.tsx
│   │   │   ├── prescriptions/
│   │   │   │   └── page.tsx
│   │   │   ├── appointments/
│   │   │   │   └── page.tsx
│   │   │   └── calendar/
│   │   │       └── page.tsx
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts
│   │       ├── users/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── patients/
│   │       │   ├── route.ts
│   │       │   ├── [id]/
│   │       │   │   └── route.ts
│   │       │   └── check-duplicate/
│   │       │       └── route.ts
│   │       ├── medical-records/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── prescriptions/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── appointments/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       ├── inventory/
│   │       │   ├── medicines/
│   │       │   │   └── route.ts
│   │       │   ├── vaccines/
│   │       │   │   └── route.ts
│   │       │   └── alerts/
│   │       │       └── route.ts
│   │       ├── disease-trends/
│   │       │   └── route.ts
│   │       └── statistics/
│   │           └── route.ts
│   ├── components/
│   │   ├── ui/                         # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── select.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── chart.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── navbar.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── footer.tsx
│   │   ├── dashboard/
│   │   │   ├── stats-card.tsx
│   │   │   ├── patient-chart.tsx
│   │   │   ├── disease-chart.tsx
│   │   │   └── recent-activity.tsx
│   │   ├── patients/
│   │   │   ├── patient-table.tsx
│   │   │   ├── patient-form.tsx
│   │   │   └── patient-card.tsx
│   │   ├── inventory/
│   │   │   ├── inventory-table.tsx
│   │   │   ├── stock-alert.tsx
│   │   │   └── expiry-alert.tsx
│   │   └── forms/
│   │       ├── login-form.tsx
│   │       ├── registration-form.tsx
│   │       └── prescription-form.tsx
│   ├── lib/
│   │   ├── prisma.ts                   # Prisma client
│   │   ├── auth.ts                     # Auth configuration
│   │   ├── utils.ts                    # Utility functions
│   │   ├── validations/
│   │   │   ├── user.ts
│   │   │   ├── patient.ts
│   │   │   ├── prescription.ts
│   │   │   └── inventory.ts
│   │   └── constants/
│   │       └── index.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── user.ts
│   │   ├── patient.ts
│   │   └── medical-record.ts
│   └── hooks/
│       ├── use-user.ts
│       ├── use-patients.ts
│       └── use-inventory.ts
└── README.md
```

---

## 🗄 Database Schema Design

### Important MySQL Notes

**Direct MySQL Approach:**
- No ORM - Using raw SQL queries with mysql2
- Direct control over database operations
- Better performance for simple queries
- Easier to understand for beginners
- Full MySQL feature support

**Schema Best Practices:**
- Use appropriate data types
- Add indexes for foreign keys and frequently queried columns
- Use ENUM for fixed value lists
- UTF8MB4 charset for emoji support
- Proper constraints and relationships

### MySQL Database Schema (Complete SQL)

**File: `database/schema.sql`**

```sql
-- =====================================================
-- MEDICARE DATABASE SCHEMA
-- MySQL Database for Medical Records Management System
-- =====================================================

-- Create database
CREATE DATABASE IF NOT EXISTS medicare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE medicare;

-- =====================================================
-- USER MANAGEMENT TABLES
-- =====================================================

-- Users table (Super Admin, Admin, Patient)
CREATE TABLE users (
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
-- PATIENT MANAGEMENT TABLES
-- =====================================================

-- Patients table
CREATE TABLE patients (
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
    height DECIMAL(5,2),  -- in cm
    weight DECIMAL(5,2),  -- in kg
    allergies TEXT,       -- comma-separated or JSON
    
    -- Classification
    is_pwd BOOLEAN DEFAULT FALSE,
    pwd_id_number VARCHAR(50),
    is_senior BOOLEAN DEFAULT FALSE,
    senior_id_number VARCHAR(50),
    is_pregnant BOOLEAN DEFAULT FALSE,
    expected_due_date DATE,
    
    -- System Fields
    patient_number VARCHAR(20) UNIQUE NOT NULL,
    category JSON,  -- Array of categories: INFANT, MINOR, ADULT, SENIOR, PWD, PREGNANT
    
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
CREATE TABLE medical_records (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    patient_id VARCHAR(36) NOT NULL,
    
    visit_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    chief_complaint TEXT NOT NULL,
    diagnosis TEXT NOT NULL,
    symptoms JSON,  -- Array of symptoms
    vital_signs JSON,  -- { bp, temp, pulse, respRate, weight, height }
    
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
CREATE TABLE prescriptions (
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
CREATE TABLE prescription_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    prescription_id VARCHAR(36) NOT NULL,
    medicine_id VARCHAR(36) NOT NULL,
    
    dosage VARCHAR(50) NOT NULL,  -- e.g., "500mg"
    frequency VARCHAR(100) NOT NULL,  -- e.g., "3 times a day"
    duration VARCHAR(50) NOT NULL,  -- e.g., "7 days"
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
CREATE TABLE appointments (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    patient_id VARCHAR(36) NOT NULL,
    scheduled_by_id VARCHAR(36) NOT NULL,
    
    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(10) NOT NULL,  -- e.g., "09:00 AM"
    type VARCHAR(50) NOT NULL,  -- CHECK_UP, VACCINATION, FOLLOW_UP
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
CREATE TABLE vaccinations (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    patient_id VARCHAR(36) NOT NULL,
    vaccine_id VARCHAR(36) NOT NULL,
    
    administered_date DATE NOT NULL,
    next_dose_date DATE,
    dose_number INT NOT NULL,  -- 1st dose, 2nd dose, etc.
    
    batch_number VARCHAR(50),
    lot_number VARCHAR(50),
    expiry_date DATE,
    
    administered_by VARCHAR(100),
    site VARCHAR(100),  -- injection site
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
-- INVENTORY TABLES
-- =====================================================

-- Medicines table
CREATE TABLE medicines (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(200) NOT NULL,
    generic_name VARCHAR(200),
    brand_name VARCHAR(200),
    description TEXT,
    
    category VARCHAR(100) NOT NULL,  -- Antibiotic, Painkiller, etc.
    dosage_form VARCHAR(50) NOT NULL,  -- Tablet, Syrup, Capsule
    strength VARCHAR(50) NOT NULL,  -- e.g., "500mg"
    
    stock_quantity INT DEFAULT 0,
    unit_of_measure VARCHAR(20) NOT NULL,  -- pieces, bottles, boxes
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
CREATE TABLE vaccines (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(200) NOT NULL,
    manufacturer VARCHAR(200),
    description TEXT,
    
    disease_target VARCHAR(100) NOT NULL,  -- e.g., "COVID-19", "Measles"
    doses_required INT DEFAULT 1,
    interval_days INT,  -- days between doses
    
    stock_quantity INT DEFAULT 0,
    unit_of_measure VARCHAR(20) NOT NULL,
    reorder_level INT DEFAULT 10,
    stock_status ENUM('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK', 'EXPIRED') DEFAULT 'IN_STOCK',
    
    storage_temp VARCHAR(50),  -- storage temperature
    expiry_date DATE,
    supplier VARCHAR(200),
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_name (name),
    INDEX idx_stock_status (stock_status),
    INDEX idx_expiry_date (expiry_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inventory Transactions table
CREATE TABLE inventory_transactions (
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
CREATE TABLE disease_trends (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    disease_name VARCHAR(200) NOT NULL,
    icd_code VARCHAR(20),  -- International Classification of Diseases code
    
    month INT NOT NULL,  -- 1-12
    year INT NOT NULL,
    case_count INT DEFAULT 0,
    
    barangay VARCHAR(100),
    age_group VARCHAR(50),  -- infant, child, adult, senior
    
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
CREATE TABLE activity_logs (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    
    action VARCHAR(100) NOT NULL,  -- LOGIN, CREATE_PATIENT, UPDATE_RECORD, etc.
    entity VARCHAR(100),  -- Patient, MedicalRecord, etc.
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
CREATE TABLE system_alerts (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    type VARCHAR(100) NOT NULL,  -- LOW_STOCK, EXPIRING_SOON, DUPLICATE_PATIENT
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
```
### Database Relationships Diagram

```
User (1) -----> (0..1) Patient
User (1) -----> (0..*) MedicalRecord
User (1) -----> (0..*) Prescription
User (1) -----> (0..*) Appointment
User (1) -----> (0..*) InventoryTransaction

Patient (1) -----> (0..*) MedicalRecord
Patient (1) -----> (0..*) Prescription
Patient (1) -----> (0..*) Appointment
Patient (1) -----> (0..*) Vaccination

MedicalRecord (1) -----> (0..*) Prescription
Prescription (1) -----> (1..*) PrescriptionItem
PrescriptionItem (*) -----> (1) Medicine

Vaccination (*) -----> (1) Vaccine

Medicine (1) -----> (0..*) InventoryTransaction
Medicine (1) -----> (0..*) PrescriptionItem
Vaccine (1) -----> (0..*) InventoryTransaction
Vaccine (1) -----> (0..*) Vaccination

User (1) -----> (0..*) ActivityLog
```

---

## 📝 Step-by-Step Implementation Guide

### Step 1: Project Initialization

```bash
# Create Next.js project
npx create-next-app@latest medicare --typescript --tailwind --app --src-dir

# Navigate to project
cd medicare

# Install dependencies
npm install mysql2
npm install next-auth@beta
npm install zod react-hook-form @hookform/resolvers
npm install date-fns
npm install recharts
npm install bcryptjs
npm install @types/bcryptjs --save-dev

# Initialize shadcn/ui
npx shadcn@latest init

# Add shadcn/ui components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add select
npx shadcn@latest add calendar
npx shadcn@latest add form
npx shadcn@latest add dropdown-menu
npx shadcn@latest add toast
npx shadcn@latest add alert
npx shadcn@latest add badge
npx shadcn@latest add tabs
npx shadcn@latest add chart

# Create database folder for SQL scripts
mkdir database
mkdir database/migrations
```

### Step 2: Environment Setup

Create `.env.local`:

```env
# Database (Aiven MySQL) - Parse connection string
DB_HOST="your-aiven-host.aivencloud.com"
DB_PORT="3306"
DB_USER="avnadmin"
DB_PASSWORD="your-password-here"
DB_NAME="medicare"
DB_SSL="true"

# Alternative: Full connection string (if you prefer)
DATABASE_URL="mysql://avnadmin:password@your-aiven-host:port/medicare?ssl-mode=REQUIRED"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# App Config
NODE_ENV="development"
```

**To get your Aiven connection details:**
1. Log in to Aiven console
2. Select your MySQL service
3. Copy host, port, username, and password
4. Replace the values above

### Step 3: Database Setup

1. **Copy the complete SQL schema** (from above) to `database/schema.sql`

2. **Create seed data file** (`database/seed.sql`):

```sql
-- Seed data for MEDICARE database
USE medicare;

-- Insert Super Admin
INSERT INTO users (id, username, email, password, role, first_name, last_name, is_active) 
VALUES (
    UUID(),
    'superadmin',
    'superadmin@medicare.com',
    '$2a$10$YourHashedPasswordHere',  -- You'll generate this in Step 4
    'SUPER_ADMIN',
    'Super',
    'Admin',
    TRUE
);

-- Insert sample medicines
INSERT INTO medicines (id, name, generic_name, brand_name, category, dosage_form, strength, stock_quantity, unit_of_measure, reorder_level, stock_status)
VALUES
    (UUID(), 'Paracetamol', 'Acetaminophen', 'Biogesic', 'Analgesic', 'Tablet', '500mg', 100, 'pieces', 20, 'IN_STOCK'),
    (UUID(), 'Amoxicillin', 'Amoxicillin', 'Amoxil', 'Antibiotic', 'Capsule', '500mg', 50, 'pieces', 15, 'IN_STOCK'),
    (UUID(), 'Ibuprofen', 'Ibuprofen', 'Advil', 'Anti-inflammatory', 'Tablet', '400mg', 75, 'pieces', 20, 'IN_STOCK'),
    (UUID(), 'Cetirizine', 'Cetirizine', 'Zyrtec', 'Antihistamine', 'Tablet', '10mg', 60, 'pieces', 15, 'IN_STOCK');

-- Insert sample vaccines
INSERT INTO vaccines (id, name, disease_target, doses_required, stock_quantity, unit_of_measure, reorder_level, stock_status)
VALUES
    (UUID(), 'BCG Vaccine', 'Tuberculosis', 1, 30, 'vials', 10, 'IN_STOCK'),
    (UUID(), 'Hepatitis B Vaccine', 'Hepatitis B', 3, 25, 'vials', 10, 'IN_STOCK'),
    (UUID(), 'Measles Vaccine', 'Measles', 2, 20, 'vials', 10, 'IN_STOCK'),
    (UUID(), 'Polio Vaccine', 'Poliomyelitis', 4, 35, 'vials', 10, 'IN_STOCK');
```

3. **Connect to Aiven MySQL and run the schema:**

```bash
# Using MySQL client (after setting up Aiven)
mysql -h your-aiven-host -P port -u avnadmin -p --ssl-mode=REQUIRED < database/schema.sql

# Then run seed data
mysql -h your-aiven-host -P port -u avnadmin -p --ssl-mode=REQUIRED < database/seed.sql
```

**Note:** You'll need to hash the password first. Use the following Node.js script:

```javascript
// hash-password.js
const bcrypt = require('bcryptjs');

async function hashPassword() {
    const password = 'admin123';
    const hash = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hash);
}

hashPassword();
```

Run it:
```bash
node hash-password.js
```

Then replace `$2a$10$YourHashedPasswordHere` in seed.sql with the generated hash.

### Step 4: MySQL Database Connection Setup

Create `src/lib/db.ts`:

```typescript
import mysql from 'mysql2/promise';

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5, // Aiven free tier limit
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: true
  } : false
});

// Test connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err);
  });

// Helper function to execute queries
export async function query<T = any>(sql: string, params?: any[]): Promise<T[]> {
  try {
    const [results] = await pool.execute(sql, params);
    return results as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Helper function for single row queries
export async function queryOne<T = any>(sql: string, params?: any[]): Promise<T | null> {
  const results = await query<T>(sql, params);
  return results.length > 0 ? results[0] : null;
}

// Helper function for transactions
export async function transaction<T>(
  callback: (connection: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
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

### Step 5: Authentication Setup

Create `src/lib/auth.ts`:

```typescript
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { findUserByUsername, updateUserLastLogin } from './queries/users';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await findUserByUsername(credentials.username as string);

        if (!user || !user.is_active) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValidPassword) {
          return null;
        }

        // Update last login
        await updateUserLastLogin(user.id);

        return {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
});
```

Create `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;
```

**Note:** You'll need to create the `src/lib/queries/users.ts` file with the query functions. See the `MEDICARE_MySQL_Implementation.md` file for complete query implementations.

### Step 6: Type Definitions

Create `src/types/index.ts`:

```typescript
import { UserRole, Gender, PatientCategory } from '@prisma/client';

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: UserRole;
}

export interface PatientFormData {
  // User data
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email?: string;
  
  // Patient data
  dateOfBirth: Date;
  gender: Gender;
  phoneNumber: string;
  address: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;
  
  // Medical info
  bloodType?: string;
  allergies?: string;
  
  // Classification
  isPWD: boolean;
  pwdIdNumber?: string;
  isSenior: boolean;
  seniorIdNumber?: string;
  isPregnant: boolean;
  expectedDueDate?: Date;
}

export interface DashboardStats {
  totalPatients: number;
  infantCount: number;
  minorCount: number;
  adultCount: number;
  seniorCount: number;
  pwdCount: number;
  pregnantCount: number;
  todayAppointments: number;
  lowStockItems: number;
}
```

### Step 7: Validation Schemas

Create `src/lib/validations/patient.ts`:

```typescript
import { z } from 'zod';

export const patientSchema = z.object({
  // User data
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  middleName: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
  
  // Patient data
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  civilStatus: z.string().optional(),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address is required'),
  barangay: z.string().min(1, 'Barangay is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  zipCode: z.string().min(4, 'Zip code must be at least 4 digits'),
  
  // Emergency contact
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  emergencyContactRelation: z.string().optional(),
  
  // Medical info
  bloodType: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  allergies: z.string().optional(),
  
  // Classification
  isPWD: z.boolean().default(false),
  pwdIdNumber: z.string().optional(),
  isSenior: z.boolean().default(false),
  seniorIdNumber: z.string().optional(),
  isPregnant: z.boolean().default(false),
  expectedDueDate: z.date().optional(),
});

export type PatientFormValues = z.infer<typeof patientSchema>;
```

### Step 8: Utility Functions

Create `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

export function determinePatientCategories(
  age: number,
  isPWD: boolean,
  isPregnant: boolean
): string[] {
  const categories: string[] = [];
  
  if (age <= 1) categories.push('INFANT');
  else if (age <= 17) categories.push('MINOR');
  else if (age <= 59) categories.push('ADULT');
  else categories.push('SENIOR');
  
  if (isPWD) categories.push('PWD');
  if (isPregnant) categories.push('PREGNANT');
  
  return categories;
}

export function generatePatientNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `P${year}${random}`;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function checkStockStatus(quantity: number, reorderLevel: number) {
  if (quantity === 0) return 'OUT_OF_STOCK';
  if (quantity <= reorderLevel) return 'LOW_STOCK';
  return 'IN_STOCK';
}

export function isExpiringSoon(expiryDate: Date, daysThreshold: number = 30): boolean {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays <= daysThreshold && diffDays > 0;
}
```

### Step 9: API Routes Implementation

For this project, you'll need to create query helper files for database operations and implement API routes.

**Query Helper Files** (`src/lib/queries/`):
- `users.ts` - User management queries
- `patients.ts` - Patient CRUD operations
- `medical-records.ts` - Medical records queries
- `prescriptions.ts` - Prescription management
- `appointments.ts` - Appointment scheduling
- `inventory.ts` - Medicine and vaccine inventory
- `statistics.ts` - Dashboard statistics

**API Routes** (`src/app/api/`):
- `/api/users` - User management endpoints
- `/api/patients` - Patient registration and management
- `/api/medical-records` - Medical record operations
- `/api/prescriptions` - Prescription management
- `/api/appointments` - Appointment scheduling
- `/api/inventory` - Inventory management
- `/api/statistics` - Dashboard data

**📄 Complete implementation examples are available in the `MEDICARE_MySQL_Implementation.md` file**, which includes:
- All query helper functions with TypeScript types
- Complete API route implementations
- Transaction handling examples
- Error handling patterns
- Type-safe database operations

**Key Pattern for API Routes:**

```typescript
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { query, queryOne } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Your query logic here
    const results = await query('SELECT * FROM table WHERE condition = ?', [value]);

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```
### Step 10: UI Components

#### Login Page (`src/app/(auth)/login/page.tsx`):

```typescript
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: 'Error',
          description: 'Invalid username or password',
          variant: 'destructive',
        });
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">MEDICARE</CardTitle>
          <CardDescription>
            Medical Data and Information Community Alert Response Engine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
```

#### Dashboard Layout (`src/app/(admin)/layout.tsx`):

```typescript
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import Sidebar from '@/components/layout/sidebar';
import Navbar from '@/components/layout/navbar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  if (session.user.role === 'PATIENT') {
    redirect('/patient/dashboard');
  }

  return (
    <div className="flex h-screen">
      <Sidebar role={session.user.role} />
      <div className="flex flex-1 flex-col">
        <Navbar user={session.user} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

---

## 🎨 Feature Implementation Details

### 1. Duplicate Detection System

```typescript
// src/app/api/patients/check-duplicate/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, dateOfBirth } = await request.json();

    const duplicates = await prisma.patient.findMany({
      where: {
        user: {
          firstName: {
            equals: firstName,
            mode: 'insensitive',
          },
          lastName: {
            equals: lastName,
            mode: 'insensitive',
          },
        },
        dateOfBirth: new Date(dateOfBirth),
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            middleName: true,
          },
        },
      },
    });

    if (duplicates.length > 0) {
      return NextResponse.json({
        isDuplicate: true,
        matches: duplicates,
      });
    }

    return NextResponse.json({ isDuplicate: false });
  } catch (error) {
    return NextResponse.json({ error: 'Error checking duplicates' }, { status: 500 });
  }
}
```

### 2. Inventory Alerts System

```typescript
// src/lib/inventory-alerts.ts
import { prisma } from './prisma';
import { StockStatus } from '@prisma/client';

export async function checkInventoryAlerts() {
  const today = new Date();
  const thirtyDaysFromNow = new Date(today);
  thirtyDaysFromNow.setDate(today.getDate() + 30);

  // Check low stock medicines
  const lowStockMedicines = await prisma.medicine.findMany({
    where: {
      OR: [
        { stockQuantity: { lte: prisma.medicine.fields.reorderLevel } },
        { stockQuantity: 0 },
      ],
    },
  });

  // Check expiring medicines
  const expiringMedicines = await prisma.medicine.findMany({
    where: {
      expiryDate: {
        lte: thirtyDaysFromNow,
        gte: today,
      },
    },
  });

  // Create alerts
  for (const medicine of lowStockMedicines) {
    await prisma.systemAlert.create({
      data: {
        type: medicine.stockQuantity === 0 ? 'OUT_OF_STOCK' : 'LOW_STOCK',
        severity: medicine.stockQuantity === 0 ? 'CRITICAL' : 'WARNING',
        title: `${medicine.name} Stock Alert`,
        message: `${medicine.name} is ${medicine.stockQuantity === 0 ? 'out of stock' : 'running low'}. Current quantity: ${medicine.stockQuantity}`,
        metadata: { itemId: medicine.id, itemType: 'MEDICINE' },
      },
    });
  }

  for (const medicine of expiringMedicines) {
    const daysUntilExpiry = Math.ceil(
      (medicine.expiryDate!.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    await prisma.systemAlert.create({
      data: {
        type: 'EXPIRING_SOON',
        severity: daysUntilExpiry <= 7 ? 'CRITICAL' : 'WARNING',
        title: `${medicine.name} Expiring Soon`,
        message: `${medicine.name} will expire in ${daysUntilExpiry} days`,
        metadata: { itemId: medicine.id, itemType: 'MEDICINE' },
      },
    });
  }

  return {
    lowStockCount: lowStockMedicines.length,
    expiringCount: expiringMedicines.length,
  };
}
```

### 3. Disease Trends Tracking

```typescript
// src/app/api/disease-trends/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
    const month = searchParams.get('month') ? parseInt(searchParams.get('month')!) : undefined;

    const where = {
      year,
      ...(month && { month }),
    };

    const trends = await prisma.diseaseTrend.findMany({
      where,
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
        { caseCount: 'desc' },
      ],
    });

    // Group by disease
    const groupedTrends = trends.reduce((acc, trend) => {
      if (!acc[trend.diseaseName]) {
        acc[trend.diseaseName] = [];
      }
      acc[trend.diseaseName].push(trend);
      return acc;
    }, {} as Record<string, typeof trends>);

    return NextResponse.json({
      trends: groupedTrends,
      totalDiseases: Object.keys(groupedTrends).length,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching disease trends' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { diseaseName, icdCode, barangay } = await request.json();

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    // Upsert disease trend
    const trend = await prisma.diseaseTrend.upsert({
      where: {
        diseaseName_month_year_barangay: {
          diseaseName,
          month,
          year,
          barangay: barangay || '',
        },
      },
      update: {
        caseCount: {
          increment: 1,
        },
      },
      create: {
        diseaseName,
        icdCode,
        month,
        year,
        barangay,
        caseCount: 1,
      },
    });

    return NextResponse.json(trend);
  } catch (error) {
    return NextResponse.json({ error: 'Error recording disease trend' }, { status: 500 });
  }
}
```

### 4. Calendar Notifications

```typescript
// src/lib/notifications.ts
import { prisma } from './prisma';

export async function checkUpcomingAppointments() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(23, 59, 59);

  const upcomingAppointments = await prisma.appointment.findMany({
    where: {
      appointmentDate: {
        gte: today,
        lte: tomorrow,
      },
      status: 'SCHEDULED',
      reminderSent: false,
    },
    include: {
      patient: {
        include: {
          user: true,
        },
      },
    },
  });

  // Send reminders (you would integrate with email/SMS service here)
  for (const appointment of upcomingAppointments) {
    await prisma.appointment.update({
      where: { id: appointment.id },
      data: {
        reminderSent: true,
        reminderSentAt: new Date(),
      },
    });

    // TODO: Send actual notification via email/SMS
    console.log(`Reminder sent to ${appointment.patient.user.firstName} for appointment on ${appointment.appointmentDate}`);
  }

  return upcomingAppointments.length;
}
```

---

## 🔒 Security & Best Practices

### 1. Environment Variables
- Never commit `.env.local` to Git
- Use strong, randomly generated secrets
- Rotate database credentials regularly

### 2. Authentication
- Implement rate limiting for login attempts
- Use strong password requirements
- Enable session timeout

### 3. Data Validation
- Always validate input on both client and server
- Use Zod schemas for type-safe validation
- Sanitize user inputs

### 4. Database Security
- Use Prisma's parameterized queries (built-in SQL injection protection)
- Implement proper access controls
- Regular database backups

### 5. API Security
```typescript
// Example middleware for role-based access
export function requireRole(allowedRoles: UserRole[]) {
  return async (request: Request) => {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    if (!allowedRoles.includes(session.user.role as UserRole)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    return null;
  };
}
```

### 6. Data Privacy Compliance
- Implement audit logs
- Allow data export for patients
- Provide data deletion mechanisms
- Follow RA 10173 (Data Privacy Act of 2012)

---

## 🧪 Testing Strategy

### 1. Unit Tests
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

Test example:
```typescript
// __tests__/utils.test.ts
import { calculateAge, determinePatientCategories } from '@/lib/utils';

describe('calculateAge', () => {
  it('should calculate age correctly', () => {
    const birthDate = new Date('2000-01-01');
    const age = calculateAge(birthDate);
    expect(age).toBe(24); // Adjust based on current year
  });
});
```

### 2. Integration Tests
- Test API endpoints
- Test database operations
- Test authentication flows

### 3. E2E Tests
```bash
npm install -D @playwright/test
```

### 4. Manual Testing Checklist
- [ ] User registration and login
- [ ] Patient CRUD operations
- [ ] Prescription creation and viewing
- [ ] Inventory management
- [ ] Dashboard statistics
- [ ] Role-based access control
- [ ] Duplicate detection
- [ ] Calendar notifications

---

## 🚀 Deployment Guide

### 1. Prepare for Production

**Update `next.config.js`:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['your-domain.com'],
  },
};

module.exports = nextConfig;
```

### 2. Set Up Aiven MySQL Database

#### Step-by-Step Aiven Setup:

1. **Create Aiven Account**
   - Go to https://aiven.io
   - Sign up for a free account
   - Verify your email

2. **Create MySQL Service**
   - Click "Create Service"
   - Select "MySQL"
   - Choose a cloud provider (AWS, Google Cloud, or Azure)
   - Select region closest to your users (e.g., Singapore for PH)
   - Choose "Startup-4" plan (Free tier - 1GB storage)
   - Give your service a name (e.g., "medicare-db")
   - Click "Create Service"
   - Wait 3-5 minutes for service to start

3. **Get Connection String**
   - Once service is running, click on your service
   - Go to "Overview" tab
   - Find "Connection Information"
   - Copy the MySQL URI (it will look like):
     ```
     mysql://avnadmin:password@mysql-xxxxx.aivencloud.com:port/defaultdb?ssl-mode=REQUIRED
     ```

4. **Create Database**
   - Go to "Databases" tab
   - Click "Create Database"
   - Name it "medicare"
   - Click "Create"

5. **Update Connection String**
   - Replace `defaultdb` with `medicare` in your connection string:
     ```
     mysql://avnadmin:password@mysql-xxxxx.aivencloud.com:port/medicare?ssl-mode=REQUIRED
     ```

6. **Download SSL Certificate (Optional but Recommended)**
   - Go to "Overview" tab
   - Scroll to "Connection Information"
   - Download CA Certificate
   - Save as `ca-certificate.pem` in your project root
   - Update connection string to use certificate:
     ```
     mysql://avnadmin:password@mysql-xxxxx.aivencloud.com:port/medicare?ssl-mode=REQUIRED&ssl-ca=/path/to/ca-certificate.pem
     ```

#### Important Aiven Notes:
- **Free Trial**: 30 days, then $0/month for Startup-4 plan (limited features)
- **Connection Limit**: Maximum 5 concurrent connections on free tier
- **Storage**: 1GB total storage
- **Backups**: Automated backups included
- **SSL**: Always use SSL connections for security

#### Prisma with Aiven MySQL:

Update your `.env.local`:
```env
DATABASE_URL="mysql://avnadmin:your-password@mysql-xxxxx.aivencloud.com:port/medicare?ssl-mode=REQUIRED"
```

**Important**: If you get connection pool errors, update `schema.prisma`:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode = "prisma"
  // Add connection pool settings for Aiven free tier
}
```

And update your Prisma client initialization in `src/lib/prisma.ts`:
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Add connection pooling for production
if (process.env.NODE_ENV === 'production') {
  // Limit connections for Aiven free tier
  prisma.$connect();
}
```

### 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Set environment variables in Vercel:**
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`

### 4. Run Migrations in Production

```bash
# From local machine
npx prisma migrate deploy
```

### 5. Post-Deployment Checklist
- [ ] Test all features in production
- [ ] Verify database connectivity
- [ ] Check authentication flows
- [ ] Test file uploads (if any)
- [ ] Monitor error logs
- [ ] Set up monitoring (Vercel Analytics)

---

## 📊 Maintenance & Monitoring

### 1. Regular Tasks
- Daily: Check system alerts
- Weekly: Review inventory levels
- Monthly: Analyze disease trends
- Quarterly: Database cleanup and optimization

### 2. Monitoring Tools
- Vercel Analytics for performance
- Database monitoring in Neon dashboard
- Error tracking (consider Sentry)

### 3. Backup Strategy
```bash
# Aiven provides automated backups
# Manual export if needed (requires mysqldump):
mysqldump -h mysql-xxxxx.aivencloud.com -P port -u avnadmin -p medicare > backup.sql

# Or use Aiven's backup feature in the dashboard
# Go to Service → Backups → Download
```

---

## 📚 Additional Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- NextAuth.js: https://next-auth.js.org
- shadcn/ui: https://ui.shadcn.com

### Free Hosting Options
- **Vercel**: https://vercel.com (Best for Next.js)
- **Aiven**: https://aiven.io (MySQL - 1GB free tier)
- **PlanetScale**: https://planetscale.com (MySQL - limited free tier)
- **Neon**: https://neon.tech (PostgreSQL)
- **Supabase**: https://supabase.com (PostgreSQL + Auth)

### Learning Resources
- Next.js 15 Documentation
- Prisma Schema Best Practices
- React Hook Form Documentation
- Tailwind CSS Documentation

---

## 🎓 Research Notes

### For Your Documentation:
1. **System Architecture Diagram** - Create flowcharts showing data flow
2. **ER Diagram** - Use the Prisma schema to generate
3. **Use Case Diagrams** - Document user interactions
4. **Testing Results** - Document all test cases and results
5. **User Manual** - Create guides for each user role

### Ethical Considerations:
- Patient data privacy
- Informed consent
- Data security measures
- Compliance with health data regulations

---

## 💡 Tips for Success

1. **Start Small**: Implement features one at a time
2. **Test Often**: Test after each major feature
3. **Version Control**: Commit code regularly to Git
4. **Documentation**: Keep notes of decisions and changes
5. **Ask for Help**: Use community resources when stuck
6. **Time Management**: Follow the timeline but be flexible
7. **Code Quality**: Write clean, readable code
8. **User Feedback**: Test with potential users early

---

## 🤝 Support & Troubleshooting

### Common Issues:

**Database Connection Error:**
```bash
# Check connection string
# Verify Aiven MySQL service is running (check dashboard)
# Ensure SSL mode is set correctly
# Check if you've exceeded connection limit (5 for free tier)

# Test connection:
mysql -h your-host -P port -u avnadmin -p --ssl-mode=REQUIRED
```

**Prisma Migration Issues with MySQL:**
```bash
# MySQL doesn't support some PostgreSQL features
# Use relationMode = "prisma" in schema.prisma
# This emulates foreign keys at Prisma level

# If migration fails:
npx prisma db push --skip-generate
npx prisma generate
```

**Connection Pool Exhausted:**
```bash
# Aiven free tier has 5 connection limit
# Make sure to:
# 1. Close connections properly
# 2. Use connection pooling
# 3. Set shorter connection timeouts

# Update prisma client to handle this
```

**SSL Certificate Issues:**
```bash
# If SSL connection fails:
# 1. Try ssl-mode=REQUIRED in connection string
# 2. Download and use CA certificate from Aiven
# 3. Make sure certificate path is correct
```

**Emoji/Special Characters Error:**
```sql
-- MySQL utf8mb4 support
-- Ensure your tables use utf8mb4 charset
ALTER DATABASE medicare CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**MySQL/Database Issues:**
```bash
# Test connection
node -e "const mysql = require('mysql2/promise'); mysql.createConnection({host: 'your-host', user: 'avnadmin', password: 'your-pass', database: 'medicare'}).then(() => console.log('Connected!')).catch(console.error);"

# Check if tables exist
mysql -h your-host -P port -u avnadmin -p medicare -e "SHOW TABLES;"

# Re-run schema if needed
mysql -h your-host -P port -u avnadmin -p medicare < database/schema.sql
```

---

## ✅ Final Checklist Before Submission

- [ ] All features implemented and tested
- [ ] Documentation complete
- [ ] Code commented and clean
- [ ] Database properly seeded
- [ ] Deployed to production
- [ ] User manual created
- [ ] Research paper completed
- [ ] Presentation prepared
- [ ] Backup of all code and database

---

**Good luck with your research project!** 🎉

Remember: This is a learning experience. Don't hesitate to adapt the plan based on your team's progress and capabilities. Focus on creating a working system with core features first, then add advanced features if time permits.

For questions or clarifications, you can always refer back to this guide or reach out for additional assistance.

**Estimated Total Development Time**: 240-360 hours (2-3 months at 10-15 hours/week)

**Recommended Team Roles:**
- Frontend Developer (UI/UX)
- Backend Developer (API/Database)
- Tester/QA
- Documentation Lead

---

*Last Updated: January 2026*
*Version: 1.0*
