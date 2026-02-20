# MEDICARE System Development Documentation

**Medical Data and Information Community Alert Response Engine**

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [System Features](#2-system-features)
3. [How the System Works](#3-how-the-system-works)
4. [Technology Stack](#4-technology-stack)
5. [Security & Data Protection](#5-security--data-protection)
6. [Key Workflows](#6-key-workflows)
7. [Deployment & Hosting](#7-deployment--hosting)
8. [Future Enhancements](#8-future-enhancements)
9. [Glossary of Terms](#9-glossary-of-terms)

---

## 1. Introduction

### What is MEDICARE?

MEDICARE (Medical Data and Information Community Alert Response Engine) is a web-based system designed specifically for high school clinics (Grades 7-12) to manage student health records and detect potential disease outbreaks early.

Think of it as a **digital filing cabinet** combined with a **smart alert system** - it stores all student medical records electronically and automatically notifies clinic staff when there might be an outbreak of a disease like flu or dengue.

### The Problem It Solves

Traditional school clinics face several challenges:

1. **Paper-based record keeping** - Difficult to search, easy to lose, hard to analyze trends
2. **Manual outbreak detection** - Staff must manually count cases to identify patterns
3. **Delayed response** - By the time an outbreak is noticed, many students may already be sick
4. **Data security risks** - Physical files can be accessed by unauthorized persons
5. **Limited access** - Only available during clinic hours, only in the clinic office

### Who Benefits?

- **Clinic Staff (Administrators):** Easier record-keeping, automatic outbreak alerts, faster student lookup
- **School Administrators:** Real-time health statistics, better decision-making for school closures or interventions
- **Students:** Secure access to their own medical history, faster check-in at the clinic
- **Parents:** Confidence that health data is protected and accessible when needed

---

## 2. System Features

### A. Student Registration

**What it does:** Allows clinic staff to create accounts for students when they first visit the clinic.

**How it works:**
1. Staff opens a registration form on the website
2. Enters student information:
   - Full name (first name, middle name, last name)
   - Date of birth
   - Gender
   - Grade level (7-12)
   - Section (A, B, C, or D)
   - Learning Reference Number (LRN) - a unique identifier from the Department of Education
   - Contact information and emergency contacts

3. The system automatically:
   - Checks if the student is already registered (to prevent duplicates)
   - Generates a unique **Student Number** (e.g., `2026-AB1234`)
   - Creates a **username** (e.g., `juandelacruz7891`)
   - Creates a random **password** for security

4. Staff prints or writes down the credentials and gives them to the student

**Why it matters:** Every student gets a secure account that only they can access, preventing unauthorized viewing of medical records.

---

### B. Medical Records Management

**What it does:** Keeps a complete history of every clinic visit for every student.

**How it works:**

**Recording a Visit:**
1. When a student visits the clinic, staff searches for the student by name or student number
2. Opens the student's profile
3. Clicks "New Medical Record" button
4. Fills out the visit form:
   - Date and time of visit
   - Diagnosis (what the student is sick with - e.g., "Flu", "Headache", "Dengue")
   - Symptoms (fever, cough, rash, etc.)
   - Treatment provided (medicine given, advice, etc.)
   - Notes (any additional observations)

5. Saves the record → automatically stored in the database

**Viewing History:**
- Staff can see all previous visits for a student
- Can filter by date range or disease type
- Can search across all students (e.g., "Show me all flu cases this month")

**Privacy Protection:**
- **SUPER_ADMIN** (head nurse): Can see all records
- **ADMIN** (clinic staff): Can see all records but needs approval for deletions
- **PATIENT** (student): Can only see their own records

**Why it matters:** Complete medical history helps staff identify chronic conditions, allergies, or patterns. It also provides data for outbreak detection.

---

### C. Disease Alert System

**What it does:** Automatically detects when a disease might be spreading too fast and alerts administrators.

**How it works:**

1. **Thresholds are configured:** The system has alert settings for each disease. For example:
   - **Flu:** Alert if 5 or more cases in the last 7 days
   - **Dengue:** Alert if 3 or more cases in the last 7 days
   - **COVID-19:** Alert if 2 or more cases in the last 7 days

2. **Automatic counting:** Every time a medical record is saved, the system:
   - Counts how many students were diagnosed with that disease in the past week
   - Compares the count to the threshold
   - If the threshold is exceeded → Creates an alert

3. **Alert notification:**
   - Administrators see a red notification badge with the number of unread alerts
   - Click to view alert details (which disease, how many cases, when it started)
   - Can mark alerts as "read" or "resolved" after taking action

4. **Severity levels:**
   - **HIGH:** Threshold exceeded (e.g., 5 flu cases when limit is 5)
   - **CRITICAL:** Threshold doubled (e.g., 10 flu cases when limit is 5)

**Why it matters:** Early detection allows schools to respond quickly (notify parents, schedule deep cleaning, coordinate with the Department of Health) before many more students get sick.

---

### D. User Roles & Permissions

The system has three types of users, each with different levels of access:

#### 1. SUPER_ADMIN (Head Nurse / Clinic Director)
**Full system access** - Can do everything:
- Register new students ✓
- View/edit/delete all medical records ✓
- Create/edit/delete user accounts ✓
- Configure disease alert thresholds ✓
- Approve or reject requests from ADMIN users ✓
- View all statistics and reports ✓

**Think of them as:** The clinic manager with master keys to all rooms.

#### 2. ADMIN (Clinic Staff / School Nurses)
**Limited access** - Can do most things, but needs approval for sensitive actions:
- Register new students (requires SUPER_ADMIN approval) ⏳
- View/edit all medical records ✓
- View their own account ✓
- Deactivate or delete users (requires SUPER_ADMIN approval) ⏳
- View statistics and reports ✓
- Cannot configure disease thresholds ✗

**Think of them as:** Clinic staff with regular keys - can do daily work but need permission for big decisions.

#### 3. PATIENT (Students)
**View-only access to own data:**
- View their own medical records ✓
- Update their own profile (name, contact info) ✓
- Change their own password ✓
- Cannot see other students' records ✗
- Cannot create medical records ✗

**Think of them as:** Students who can see their own file but can't peek into others' files.

**Why it matters:** This prevents unauthorized access to sensitive health information and ensures only qualified staff can make medical decisions.

---

### E. Approval Workflow

**What it does:** Protects sensitive data by requiring SUPER_ADMIN approval for risky actions.

**How it works:**

1. **ADMIN makes a request:**
   - Example: ADMIN wants to register a new student
   - ADMIN fills out the registration form
   - Instead of immediately creating the account, the system creates a **pending action**

2. **SUPER_ADMIN receives notification:**
   - A notification appears in the "Pending Approvals" section
   - Shows: Who requested it, what they want to do, when they requested it

3. **SUPER_ADMIN reviews and decides:**
   - **Approve:** Action is executed immediately
     - For student registration: Account is created and credentials are sent to the ADMIN via alert
   - **Reject:** Action is cancelled and ADMIN is notified with a reason

4. **ADMIN gets feedback:**
   - If approved: Receives an alert with the student's login credentials
   - If rejected: Receives an alert explaining why (e.g., "Student already exists")

**Actions that require approval:**
- Student registration
- User account deletion
- User account deactivation

**Why it matters:** Prevents accidental deletions, duplicate registrations, and unauthorized data changes. Creates an audit trail for accountability.

---

## 3. How the System Works

### A. What Users See (Frontend)

The **frontend** is the part of the website you see and interact with in your web browser (Chrome, Firefox, Safari, etc.).

**Components:**

1. **Login Page:** Where users enter their username and password
2. **Dashboard:** Home screen showing statistics (total students, recent visits, active alerts)
3. **Navigation Sidebar:** Menu with links to different pages (Patients, Alerts, Statistics, etc.)
4. **Forms:** Data entry screens for registration, medical records, etc.
5. **Tables:** Lists of students, medical records, users, etc.
6. **Charts & Graphs:** Visual representations of health statistics

**Design Features:**
- **Responsive design:** Works on computers, tablets, and phones
- **Clean interface:** Professional medical theme with red accents
- **Fast loading:** Pages appear instantly without delays
- **Real-time updates:** New alerts appear automatically without refreshing the page

**Think of it as:** The storefront window and cashier counter of a shop - what customers see and interact with.

---

### B. Where Data is Stored (Database)

The **database** is like a massive digital filing cabinet that stores all information electronically.

**What is stored:**

1. **User accounts:** Usernames, encrypted passwords, roles
2. **Student records:** Names, birthdays, contact info, student numbers
3. **Medical records:** Clinic visits, diagnoses, treatments, notes
4. **Alerts:** Disease outbreak warnings, duplicate detections
5. **Audit logs:** History of who did what and when (for security)
6. **Pending actions:** Requests waiting for approval
7. **Disease thresholds:** Alert settings for each disease

**How data is organized:**

Information is stored in **tables** (like spreadsheets). Each table has rows and columns:

- **users table:** Each row = 1 user account
- **students table:** Each row = 1 student
- **medical_records table:** Each row = 1 clinic visit

**Connections between tables:**
- Each student is linked to a user account (so they can log in)
- Each medical record is linked to a student (so we know whose record it is)

**Think of it as:** A warehouse with organized shelves - everything has its place and can be found quickly.

---

### C. How Data Moves (API)

The **API** (Application Programming Interface) is the messenger between the frontend and the database.

**How it works:**

1. **User action:** You click a button on the website (e.g., "Save" on a medical record form)
2. **Frontend sends request:** The website sends a message to the API saying "Please save this data"
3. **API processes request:**
   - Checks if you're logged in (authentication)
   - Checks if you have permission (authorization)
   - Validates the data (e.g., "Is the date valid?")
   - Saves to the database
4. **API sends response:** Sends back a message saying "Success!" or "Error: Missing required field"
5. **Frontend updates:** The website shows a success message or error message

**Example flow:**

```
Student clicks "Save Medical Record"
    ↓
Frontend: "Send this data to /api/students/123/records"
    ↓
API: "Is user logged in? ✓"
API: "Does user have permission? ✓"
API: "Is data valid? ✓"
API: "Save to database" → Database: "Saved!"
    ↓
API: "Send success response"
    ↓
Frontend: "Show green checkmark - Record saved successfully!"
```

**Think of it as:** A waiter in a restaurant - takes your order to the kitchen, brings back your food.

---

## 4. Technology Stack

These are the software tools and frameworks used to build MEDICARE. Each serves a specific purpose:

### Next.js (Website Framework)
**What it is:** A toolkit for building modern websites
**What it does:** Provides the structure and organization for the entire application
**Why we use it:** Fast page loading, search engine optimization, automatic code optimization
**Analogy:** Like a blueprint and construction kit for building a house

### React (UI Library)
**What it is:** A library for creating interactive web pages
**What it does:** Makes the website responsive to user actions (clicking, typing, etc.)
**Why we use it:** Components can be reused (write once, use many times), updates are instant without page reloads
**Analogy:** Like LEGO blocks - build complex structures from simple, reusable pieces

### MySQL (Database System)
**What it is:** A system for storing and managing data
**What it does:** Saves all student records, medical visits, user accounts, etc.
**Why we use it:** Reliable, fast, handles large amounts of data, widely used in healthcare
**Analogy:** Like a library catalog system - organizes and retrieves information quickly

### Tailwind CSS (Styling System)
**What it is:** A design system for making websites look professional
**What it does:** Controls colors, fonts, spacing, layouts
**Why we use it:** Consistent design, responsive (adapts to screen size), easy to customize
**Analogy:** Like a professional interior designer's color palette and furniture catalog

### NextAuth (Authentication System)
**What it is:** A security system for user login
**What it does:** Manages user sessions, verifies passwords, protects pages
**Why we use it:** Industry-standard security, prevents unauthorized access, automatic session management
**Analogy:** Like a security guard at a building entrance - checks ID badges before letting people in

### TypeScript (Programming Language)
**What it is:** A programming language that adds safety features to JavaScript
**What it does:** Catches errors before the code runs, makes code easier to understand
**Why we use it:** Fewer bugs, better code quality, easier to maintain
**Analogy:** Like spell-check for programming - catches mistakes as you type

---

## 5. Security & Data Protection

Protecting student health information is a top priority. Here's how MEDICARE keeps data secure:

### A. Password Security

**Problem:** If passwords are stored in plain text, hackers who access the database can see everyone's passwords.

**Solution: Password Hashing**

1. **What is hashing?**
   A one-way encryption process that scrambles the password so it can't be reversed.

   Example:
   - Original password: `myPassword123`
   - After hashing: `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`

2. **Why is it secure?**
   - Even if a hacker steals the database, they only see the scrambled version
   - It's mathematically impossible to reverse-engineer the original password
   - Each password is unique even if two users have the same password (thanks to "salt")

3. **What is salt?**
   Random data added to each password before hashing to make each hash unique.

   **Analogy:** Think of it like shredding a document - once shredded, you can't un-shred it to read the original. You can only shred another document and compare if the shredded pieces look the same.

---

### B. Access Control

**Role-Based Access Control (RBAC):** Users can only access features allowed for their role.

**How it works:**

1. **Authentication (Who are you?):**
   - User logs in with username + password
   - System creates a **JWT token** (like a digital badge)
   - Token is valid for 24 hours

2. **Authorization (What can you do?):**
   - Before every action, system checks the user's role
   - Example: If a PATIENT tries to view another student's records → Access denied

**Protected Routes:**
- If you're not logged in and try to access `/dashboard` → Redirected to `/login`
- If you're logged in as PATIENT and try to access `/registration` → Error message

**Session Management:**
- Sessions expire after 24 hours of inactivity
- User must log in again after expiration
- Prevents unauthorized access if someone leaves their computer unlocked

**Analogy:** Like a hotel key card - it only opens the doors you're allowed to enter, and it expires after checkout.

---

### C. Audit Trail

**What it is:** A complete log of every action taken in the system.

**What is logged:**
- **Who:** User ID and username
- **What:** Action taken (CREATE, READ, UPDATE, DELETE)
- **When:** Exact timestamp
- **Where:** IP address and device information
- **Details:** Old value and new value (for updates)

**Example audit log entry:**
```
User: admin_jane (ID: 5)
Action: UPDATE
Table: students
Record ID: 234
Timestamp: 2026-02-14 10:35:22
IP Address: 192.168.1.45
Changes:
  - grade: 10 → 11
  - section: A → B
```

**Why it matters:**
- **Accountability:** Know who made changes if there's a mistake
- **Compliance:** Required by data protection laws (like GDPR, HIPAA)
- **Security:** Detect suspicious activity (e.g., someone accessing records at 3 AM)
- **Dispute resolution:** Prove what happened if there's a disagreement

**Analogy:** Like a security camera recording - you can review what happened at any time.

---

### D. Data Encryption

**In Transit (Data Moving):**
- All data sent between your browser and the server is encrypted using **SSL/TLS**
- HTTPS (the padlock icon in your browser) ensures no one can intercept and read the data
- Like sending a locked briefcase instead of an open envelope

**At Rest (Data Stored):**
- Database is hosted on a secure cloud platform (Aiven) with encryption
- Automatic backups are also encrypted
- Like storing files in a locked safe instead of a desk drawer

---

### E. Duplicate Detection (Data Integrity)

**Problem:** Same student might be registered multiple times (typos, different staff members, etc.)

**Solution: Automatic duplicate checking**

**How it works:**
1. When registering a new student, system compares:
   - First name
   - Last name
   - Date of birth
   - Learning Reference Number (LRN)

2. If there's a strong match (e.g., same name + same birthday):
   - System creates a "DUPLICATE_DETECTED" alert
   - SUPER_ADMIN reviews the two records
   - Decides: Merge them, keep both (not actually duplicates), or delete one

**Why it matters:** Prevents duplicate medical records, ensures data accuracy, saves storage space.

---

## 6. Key Workflows

### Workflow 1: Registering a New Student

**Step-by-step process:**

1. **Student visits clinic for the first time**
   - Clinic staff (ADMIN or SUPER_ADMIN) greets the student

2. **Staff opens registration form**
   - Navigates to `/registration` page
   - Clicks "New Student Registration"

3. **Staff enters student information**
   - Personal info: First name, middle name, last name
   - Date of birth: MM/DD/YYYY
   - Gender: Male / Female
   - Academic info: Grade (7-12), Section (A-D)
   - LRN: Learning Reference Number from DepEd
   - Contact: Phone, email, address, emergency contact

4. **System validates data**
   - Checks for required fields (name, birthday, grade)
   - Validates formats (e.g., birthday must be a valid date)
   - Runs duplicate detection

5. **Approval process:**
   - **If user is SUPER_ADMIN:** Account created immediately (skip to step 7)
   - **If user is ADMIN:** Request sent for SUPER_ADMIN approval

6. **SUPER_ADMIN reviews request** (ADMIN only)
   - Receives notification of pending registration
   - Reviews student information
   - Clicks "Approve" or "Reject"

7. **Account creation** (if approved)
   - System creates user account with:
     - **Username:** `firstname` + `lastname` + 4 random digits (e.g., `juandelacruz7891`)
     - **Password:** Random 12-character string (e.g., `x7Kp3mQw9Lz2`)
     - **Student Number:** Year + 6 random digits (e.g., `2026-AB1234`)
   - Links user account to student record

8. **Credentials displayed**
   - Staff sees a credential card with:
     - Student Number
     - Username
     - Temporary password
   - Staff prints or writes down credentials
   - Gives credentials to student (advise to change password after first login)

9. **Student can now log in**
   - Student visits the website
   - Logs in with provided credentials
   - Can view their own medical records

**Diagram:**
```
Staff → Open Form → Enter Info → Submit
    ↓
Duplicate Check → Validation → Approval (if ADMIN)
    ↓
Account Created → Credentials Generated
    ↓
Credentials Given to Student → Student Logs In
```

---

### Workflow 2: Recording a Clinic Visit

**Step-by-step process:**

1. **Student comes to clinic with symptoms**
   - Staff asks for student number or name

2. **Staff searches for student**
   - Navigates to `/patients` page
   - Types student name or number in search bar
   - Clicks on student from search results

3. **Opens student profile**
   - Sees student's basic info (name, grade, section)
   - Sees past medical records (if any)

4. **Clicks "New Medical Record" button**
   - Form opens for new visit entry

5. **Staff fills out visit form**
   - **Visit date:** Auto-filled with today's date (can change if recording a past visit)
   - **Diagnosis:** Selects from dropdown (Flu, Dengue, COVID-19, Headache, etc.)
   - **Symptoms:** Checks boxes (Fever, Cough, Runny Nose, Rash, etc.)
   - **Temperature:** Enters temperature reading (if taken)
   - **Treatment:** Describes what was done (e.g., "Gave paracetamol, advised to rest")
   - **Notes:** Any additional observations (e.g., "Student looks very tired")

6. **Clicks "Save Medical Record"**
   - System saves record to database
   - Automatically logs this action in audit trail

7. **System checks for outbreak**
   - Counts recent cases of the selected diagnosis (last 7 days)
   - Compares count to disease alert threshold
   - **If threshold exceeded:** Creates automatic alert

8. **Alert notification** (if outbreak detected)
   - SUPER_ADMIN and ADMIN users see notification badge
   - Alert shows: Disease name, case count, severity level

9. **Staff can view saved record**
   - Record appears in student's medical history
   - Can be edited or deleted later (if needed)

**Diagram:**
```
Student visits clinic → Staff searches student → Opens profile
    ↓
Clicks "New Record" → Fills form → Saves
    ↓
System counts cases → Checks threshold
    ↓
If exceeded → Create Alert → Notify admins
```

---

### Workflow 3: Managing Disease Alerts

**Step-by-step process:**

1. **Alert is automatically created**
   - Trigger: Disease case count exceeds threshold
   - Example: 5 students diagnosed with flu in the past week (threshold: 5)

2. **Administrators receive notification**
   - Red badge appears on navbar with number of unread alerts
   - Badge shows count (e.g., "3" means 3 unread alerts)

3. **Admin clicks notification icon**
   - Dropdown shows recent alerts
   - Each alert shows:
     - Disease name (e.g., "Flu Disease Trend Alert")
     - Severity level (HIGH or CRITICAL)
     - Time created (e.g., "2 hours ago")

4. **Admin clicks "View All Alerts"**
   - Navigates to `/alerts` page
   - Sees full list of alerts (sorted by newest first)

5. **Admin clicks on specific alert**
   - Opens alert detail page (`/alerts/[id]`)
   - Shows:
     - Full alert message (e.g., "5 cases of Flu detected in the last 7 days")
     - Timestamp
     - Status (Unread / Read / Resolved)
     - List of affected students (with links to their records)

6. **Admin marks alert as read**
   - Clicks "Mark as Read" button
   - Alert badge count decreases by 1

7. **Admin takes action**
   - Reviews the list of affected students
   - Decides on response:
     - Notify parents of affected students
     - Coordinate with principal for possible class suspension
     - Schedule deep cleaning of classrooms
     - Report to Department of Health (if required)

8. **Admin resolves alert**
   - After taking action, clicks "Resolve Alert"
   - Enters resolution notes (e.g., "Notified parents, scheduled classroom disinfection")
   - Clicks "Save"

9. **Alert is marked as resolved**
   - Status changes to "Resolved"
   - No longer appears in active alerts
   - Remains in history for record-keeping

**Diagram:**
```
System detects outbreak → Creates alert → Notifies admins
    ↓
Admin views alert → Reviews details → Takes action
    ↓
Admin resolves alert → Enters notes → Saves
    ↓
Alert archived → Remains in history
```

---

### Workflow 4: Approval Process (ADMIN Requesting Permission)

**Step-by-step process:**

1. **ADMIN wants to perform a restricted action**
   - Example: Delete a user account
   - ADMIN navigates to User Management page
   - Clicks "Delete" button next to a user

2. **System creates pending action**
   - Instead of deleting immediately, system creates a request
   - Request includes:
     - Action type: "DELETE_USER"
     - Requester: ADMIN's name and ID
     - Target: User to be deleted
     - Reason: Optional text field (e.g., "Duplicate account")
     - Timestamp: When request was made

3. **SUPER_ADMIN receives notification**
   - Pending actions appear in the "Pending Approvals" tab on Account page
   - Badge shows count (e.g., "2 pending")

4. **SUPER_ADMIN reviews request**
   - Navigates to `/account` → "Pending Approvals" tab
   - Sees list of all pending actions
   - Clicks on specific request to view details

5. **SUPER_ADMIN makes decision**

   **Option A: Approve**
   - Clicks "Approve" button
   - System executes the action (deletes the user)
   - Creates a success alert for the ADMIN who requested it
   - ADMIN receives notification: "Your request to delete user XYZ has been approved"

   **Option B: Reject**
   - Clicks "Reject" button
   - Enters rejection reason (e.g., "User account is still active and needed")
   - System marks request as rejected
   - Creates an alert for the ADMIN with rejection reason
   - ADMIN receives notification: "Your request was rejected. Reason: User account is still active"

6. **ADMIN is notified**
   - ADMIN sees alert notification
   - Clicks to view alert
   - Reads approval/rejection message
   - If approved (and action was student registration): Receives auto-generated credentials

7. **Request is closed**
   - Pending action is marked as "APPROVED" or "REJECTED"
   - Removed from active pending list
   - Remains in history for audit purposes

**Diagram:**
```
ADMIN requests action → System creates pending action
    ↓
SUPER_ADMIN notified → Reviews request
    ↓
SUPER_ADMIN decides → Approve OR Reject
    ↓
Action executed / cancelled → ADMIN notified
    ↓
Request archived → History preserved
```

---

## 7. Deployment & Hosting

### Where the System Lives

**Frontend (Website):**
- **Platform:** Vercel (cloud hosting service)
- **Location:** Distributed globally across edge servers (fast loading anywhere in the world)
- **URL:** Custom domain (e.g., `medicare.school.edu.ph`)
- **SSL Certificate:** Automatic HTTPS encryption

**Backend (Database):**
- **Platform:** Aiven (managed MySQL cloud database)
- **Location:** Cloud servers (specific region can be chosen for data residency laws)
- **Connection:** Encrypted SSL connection from website to database
- **Backup:** Automatic daily backups with 7-day retention

**Analogy:** It's like having your storefront on a busy street (Vercel edge servers) with your warehouse in a secure facility (Aiven database).

---

### How Updates Are Applied

**Development Process:**

1. **Developer makes changes**
   - Edits code on local computer
   - Tests locally to ensure it works

2. **Code is committed to Git**
   - Changes are saved to version control system
   - Git: Like track changes in Microsoft Word, but for code

3. **Automatic deployment**
   - Vercel detects new code changes
   - Automatically builds and deploys the new version
   - Takes ~2-5 minutes
   - Old version remains active until new version is ready (zero downtime)

4. **Testing**
   - Developer tests the live website
   - If bugs found → Rollback to previous version (instant)
   - If working correctly → Keep new version

**Analogy:** Like updating an app on your phone - happens in the background, you just see the new version when it's ready.

---

### Backup & Recovery

**Database Backups:**
- **Frequency:** Automatic daily backups at 2:00 AM
- **Retention:** 7 days of backup history
- **Storage:** Encrypted backups stored separately from main database
- **Recovery:** Can restore to any point in the last 7 days

**Disaster Recovery Plan:**

1. **If database server fails:**
   - Aiven automatically fails over to backup server (1-2 minutes downtime)
   - Users might see "Loading..." for a minute, then back to normal

2. **If data is accidentally deleted:**
   - Contact Aiven support to restore from backup
   - Specify which backup point to restore (e.g., "Yesterday at 2 AM")
   - Takes 15-30 minutes depending on database size

3. **If entire system is compromised:**
   - Deploy backup from Git repository
   - Restore database from most recent backup
   - Verify data integrity before making system live again

**Analogy:** Like having a fire-proof safe for important documents - if the building burns down, you can retrieve the documents from the safe.

---

### Monitoring & Maintenance

**What is monitored:**
- **Server uptime:** Is the website accessible?
- **Response time:** How fast do pages load?
- **Error rate:** How many requests fail?
- **Database performance:** Is the database responding quickly?

**Alerts for problems:**
- If website is down for > 1 minute → Email alert to admin
- If error rate > 5% → Email alert
- If database connection fails → SMS alert (urgent)

**Regular maintenance:**
- **Weekly:** Review error logs
- **Monthly:** Update security patches
- **Quarterly:** Review performance and optimize slow queries
- **Yearly:** Audit security settings and user permissions

---

## 8. Future Enhancements

### Planned Features (Roadmap)

1. **Email/SMS Notifications**
   - Automatically send text messages to parents when student visits clinic
   - Email alerts to administrators when outbreak detected
   - Appointment reminders for follow-up visits

2. **Mobile App**
   - iOS and Android apps for easier access
   - Push notifications for alerts
   - Offline mode (view data without internet, sync later)

3. **Advanced Analytics**
   - Graphs showing disease trends over time
   - Predictive analytics (predict outbreaks before they happen based on patterns)
   - Export reports to PDF for Department of Health

4. **Integration with Department of Health**
   - Automatic reporting of notifiable diseases (dengue, COVID-19, etc.)
   - Sync with national health database
   - Receive outbreak alerts from nearby schools

5. **Telemedicine Features**
   - Video consultations with students
   - Online prescription system
   - Chat support for health questions

6. **Vaccine Tracking**
   - Record immunization history
   - Send reminders for booster shots
   - Generate vaccine certificates

7. **Parent Portal**
   - Parents can log in to view their child's medical records
   - Consent forms for treatments
   - Health tips and newsletters

8. **Multi-Language Support**
   - Interface in Filipino and English
   - Automatic translation of medical terms

---

## 9. Glossary of Terms

### Technical Terms

**API (Application Programming Interface)**
A messenger that allows different software systems to communicate. In MEDICARE, the API connects the website (frontend) to the database (backend).
_Analogy:_ Like a waiter taking orders from customers to the kitchen.

**Authentication**
The process of verifying who you are. In MEDICARE, this happens when you log in with your username and password.
_Analogy:_ Like showing your ID at airport security.

**Authorization**
The process of verifying what you're allowed to do. Even if you're logged in, you can only access features allowed for your role.
_Analogy:_ Like having different keys on your keyring - each opens specific doors.

**Backend**
The server-side part of the system that users don't see. Includes the database, API, and business logic.
_Analogy:_ Like the kitchen in a restaurant - customers don't see it, but it's where the work happens.

**Bcrypt**
A password hashing algorithm that scrambles passwords so they can't be reversed.
_Analogy:_ Like shredding a document - you can't un-shred it.

**CRUD**
Acronym for Create, Read, Update, Delete - the four basic database operations.
_Example:_ Create a student, Read student details, Update student info, Delete a student.

**Database**
A structured collection of data stored electronically. MEDICARE uses MySQL database.
_Analogy:_ Like a digital filing cabinet with organized folders.

**Deployment**
The process of making the website live and accessible on the internet.
_Analogy:_ Like opening a store - moving from building/decorating to actually serving customers.

**Encryption**
Scrambling data so only authorized parties can read it. MEDICARE uses encryption for passwords and data transmission.
_Analogy:_ Like writing a message in secret code that only you and the recipient can decode.

**Frontend**
The part of the system users see and interact with. Includes web pages, forms, buttons, etc.
_Analogy:_ Like the storefront of a shop - what customers see.

**Git**
A version control system that tracks code changes over time.
_Analogy:_ Like "track changes" in Microsoft Word, but for code.

**Hashing**
A one-way encryption process. You can hash data, but you can't unhash it.
_Example:_ Password → Hash → `$2a$10$N9qo...` (can't reverse)

**HTTPS**
Secure version of HTTP (web protocol) that encrypts data in transit.
_Indicator:_ Padlock icon in browser address bar.

**JWT (JSON Web Token)**
A secure way to transmit user information between systems. Used for session management in MEDICARE.
_Analogy:_ Like a digital badge that proves you're logged in.

**Localhost**
Your own computer when used as a server for development/testing.
_URL:_ `http://localhost:3000`

**Middleware**
Software that sits between the frontend and backend, often used for authentication and authorization.
_Example:_ MEDICARE's middleware checks if you're logged in before showing protected pages.

**MySQL**
A type of database system used to store MEDICARE's data.
_Alternative systems:_ PostgreSQL, MongoDB, Oracle.

**Next.js**
A framework for building React-based websites. Provides structure, routing, and optimization.
_Why we use it:_ Fast loading, search engine friendly, easy deployment.

**React**
A JavaScript library for building interactive user interfaces.
_Concept:_ Breaks UI into reusable components (like LEGO blocks).

**Responsive Design**
Website design that adapts to different screen sizes (desktop, tablet, mobile).
_How it works:_ Layout changes automatically based on screen width.

**Role-Based Access Control (RBAC)**
Security model where permissions are assigned based on user roles (SUPER_ADMIN, ADMIN, PATIENT).
_Benefit:_ Easier to manage than assigning permissions individually to each user.

**Session**
A period of time when a user is logged in. MEDICARE sessions last 24 hours.
_What happens when it expires:_ User is automatically logged out.

**SQL (Structured Query Language)**
Language used to communicate with databases.
_Example:_ `SELECT * FROM students WHERE grade = 10` (get all grade 10 students)

**SSL/TLS**
Security protocols that encrypt data sent over the internet.
_Where used:_ HTTPS connections, database connections.

**Tailwind CSS**
A styling framework that provides pre-made design classes.
_Example:_ `bg-red-500` means "red background color".

**Threshold**
A limit or boundary that, when exceeded, triggers an action.
_Example:_ Disease alert threshold - when case count exceeds this number, create an alert.

**TypeScript**
A programming language that adds type safety to JavaScript.
_Benefit:_ Catches errors during development instead of in production.

**Vercel**
Cloud platform for deploying Next.js websites.
_Features:_ Automatic deployment, global edge network, free SSL certificates.

---

### Medical/Healthcare Terms

**Audit Trail**
A complete log of all actions taken in the system (who did what, when).
_Purpose:_ Accountability, compliance, security.

**Disease Outbreak**
When the number of disease cases exceeds what is normally expected.
_Example:_ 10 flu cases in one week when average is 2-3.

**Duplicate Detection**
Automatic checking to prevent the same student from being registered multiple times.
_How:_ Compares names, birthdates, and LRN.

**Learning Reference Number (LRN)**
A unique 12-digit number assigned to each student by the Department of Education.
_Format:_ `123456789012`

**Medical Record**
Documentation of a clinic visit, including diagnosis, symptoms, treatment, and notes.
_Retention:_ Stored permanently for historical reference.

**Notifiable Disease**
A disease that must be reported to health authorities (e.g., dengue, COVID-19, measles).
_Requirement:_ Schools must report cases to Department of Health.

**Patient Confidentiality**
Legal and ethical requirement to keep patient information private.
_Enforcement:_ Role-based access control, audit logs, encryption.

---

### System-Specific Terms

**ADMIN**
User role for clinic staff. Can perform most operations but needs SUPER_ADMIN approval for sensitive actions.

**Disease Alert Threshold**
Configurable setting that defines when an alert should be created for a specific disease.
_Example:_ Flu threshold = 5 cases per week.

**MEDICARE**
Acronym: Medical Data and Information Community Alert Response Engine.

**Pending Action**
A request from an ADMIN user that requires SUPER_ADMIN approval before execution.
_Examples:_ Student registration, user deletion.

**PATIENT**
User role for students. Can view their own medical records only.

**Student Number**
Auto-generated unique identifier for each student.
_Format:_ `YYYY-XXXXXX` (year + 6 random digits)

**SUPER_ADMIN**
User role with full system access. Typically the head nurse or clinic director.

---

## Conclusion

MEDICARE is a comprehensive health information system designed to modernize school clinic operations, improve student health outcomes, and enable early detection of disease outbreaks.

By combining secure data storage, automatic outbreak alerts, and role-based access control, MEDICARE provides a reliable, efficient, and safe platform for managing student health records in high schools.

This documentation provides a non-technical overview suitable for project papers, thesis documentation, and stakeholder presentations. For technical details, refer to the `CLAUDE.md` file in the project repository.

---

**Document Information:**
- **Version:** 1.0
- **Last Updated:** February 14, 2026
- **Prepared for:** Project documentation and non-technical stakeholders
- **Contact:** [Your contact information here]

