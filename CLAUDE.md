# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Project Rules & Context

## Tech Stack
- **Framework:** Next.js (App Router)
- **UI Library:** shadcn/ui + Tailwind CSS
- **Database:** MySQL (accessed via MCP Server)
- **State Management:** React Hooks / Server Actions

## Rules

### 1. MySQL & Database Interaction (MCP)
- **Schema First:** Before writing any SQL query, ALWAYS inspect the database schema using the MCP tool. Do not guess column names or table relationships.
- **🛡️ DESTRUCTIVE ACTION PROTOCOL (Strict):**
  - **Permission Required:** For any `DELETE`, `DROP`, `TRUNCATE`, or `ALTER` (DDL) operations, you **MUST** pause and ask for explicit user permission first.
  - **Show SQL First:** Before asking for permission, display the exact SQL query you intend to run.
  - **No Auto-Execution:** Never execute these destructive commands in the same turn as the plan. Wait for the user to type "Confirm" or "Yes".
- **Safety Check:** For any `INSERT` or `UPDATE` operations, double-check the `WHERE` clause to avoid accidental massive data changes.
- **Read-Only Default:** Prefer reading data to answer questions. Only suggest data modification if explicitly requested.
- **Verification:** After running a complex query, briefly explain how the results answer the user's question.

### 2. Next.js Development
- **App Router:** Use the Next.js App Router (`app/` directory) conventions.
- **Server vs. Client:**
  - Default to **Server Components** for data fetching and database interactions.
  - Use `'use client'` only for interactive components (forms, buttons, hooks).
- **Server Actions:** Use Server Actions for database mutations instead of API routes where possible.
- **Naming:** Use `page.tsx`, `layout.tsx`, `loading.tsx`, and `error.tsx` correctly.

### 3. shadcn/ui & Styling
- **Installation:** When adding new components, prefer using the CLI command: `npx shadcn@latest add [component-name]`.
- **Customization:** Don't overwrite shadcn base components directly unless necessary; compose them or wrap them.
- **Tailwind:** Use utility classes for layout and spacing. Avoid custom CSS files unless absolutely necessary.
- **Lucide Icons:** Use `lucide-react` for icons as per standard shadcn setup.

### 4. Security & User Management
- **SUPER_ADMIN Privileges:** Only SUPER_ADMIN can create users (including other SUPER_ADMIN accounts)
- **User Creation Audit Trail:** All user creation operations are logged in `audit_logs` table with:
  - Creator ID and name
  - Created user details (username, email, role)
  - Enhanced logging for SUPER_ADMIN account creation
  - IP address and timestamp
- **Visual Warnings:** UI displays ⚠️ warning indicator when creating SUPER_ADMIN accounts to emphasize elevated privileges

## Common Commands
- **Add Component:** `npx shadcn@latest add`
- **Database Check:** (Ask Claude) "Inspect schema for [table_name]"

## Project Overview

**MEDICARE** (Medical Data and Information Community Alert Response Engine) is a Next.js 16 web application for managing school clinic operations, patient records, and health outbreak detection for high schools (Grades 7-12).

**Tech Stack:**
- Next.js 16.1.1 + React 19.2.3 + TypeScript 5
- NextAuth 5 (beta.30) for JWT authentication
- MySQL on Aiven (cloud database)
- Tailwind CSS 4 + Radix UI components
- React Hook Form + Zod validation
- SWR for data fetching

## Development Commands

### Setup and Running
```bash
cd medicare-app

# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Database Setup
```bash
# Initial database setup (runs schema.sql, seed.sql, test-data.sql)
node database/setup-database.js
```

**Note:** Requires `.env.local` file in `medicare-app/` directory with:
```
DB_HOST=<aiven-host>.aivencloud.com
DB_PORT=3306
DB_USER=avnadmin
DB_PASSWORD=<password>
DB_NAME=defaultdb
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generated-secret>
NODE_ENV=development
```

**Default Login:** username: `superadmin`, password: `admin123`

## Architecture Overview

### Directory Structure
```
medicare-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth route group (login)
│   │   ├── (dashboard)/       # Protected dashboard routes
│   │   │   ├── dashboard/     # Main dashboard + grade/[grade] sub-route
│   │   │   ├── account/       # User account & management
│   │   │   ├── alerts/        # Alert list + [id] detail view
│   │   │   ├── patients/      # Patient list + [id] detail, edit, new-record
│   │   │   ├── registration/  # Student registration form
│   │   │   └── statistics/    # Statistics dashboard
│   │   ├── patient-portal/    # Patient self-service portal
│   │   ├── api/               # API route handlers
│   │   └── layout.tsx         # Root layout with SessionProvider
│   ├── components/            # React components
│   │   ├── layout/           # Navbar, Sidebar, Header
│   │   ├── landing/          # Landing page sections
│   │   ├── auth/             # Auth components (logout buttons)
│   │   ├── alerts/           # Alert system UI
│   │   ├── account/          # Profile form, user management, password, create-user
│   │   ├── registration/     # Registration forms, credential card, section combobox
│   │   ├── pending-actions/  # Pending action list, card, approve modal, status badge
│   │   ├── animations/       # ParticleBackground, ScrollIndicator (landing page)
│   │   ├── forms/            # Login form
│   │   ├── providers/        # SessionProvider wrapper
│   │   └── ui/               # shadcn-style UI primitives
│   ├── lib/                   # Business logic & utilities
│   │   ├── db.ts             # Database connection pool & query helpers
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── rbac.ts           # Role-based access control
│   │   ├── queries/          # Domain-specific query functions
│   │   ├── validations/      # Zod schemas (auth, account, pending-actions)
│   │   ├── alert-system.ts   # Outbreak detection logic
│   │   ├── duplicate-detection.ts
│   │   ├── pending-action-executor.ts
│   │   └── audit-logger.ts
│   ├── types/                 # TypeScript type definitions
│   ├── hooks/                 # Custom React hooks
│   └── middleware.ts          # Auth route protection
├── database/                  # SQL schema, seeds, migrations, setup script
└── public/                    # Static assets
```

### Database Layer

**Connection:** MySQL connection pool in `src/lib/db.ts` with Aiven-compatible SSL settings (5 connection limit for free tier).

**Core Query Functions:**
- `query<T>(sql, params)` - SELECT returning multiple rows
- `queryOne<T>(sql, params)` - SELECT returning single row
- `execute(sql, params)` - INSERT/UPDATE/DELETE operations
- `transaction(callback)` - Atomic transactions with auto-commit/rollback

**Query Modules:** Domain-specific queries are organized in `src/lib/queries/`:
- `students.ts` - Student CRUD, search, filtering
- `alerts.ts` - Alert management
- `medical-records.ts` - Medical record operations
- `statistics.ts` - Dashboard statistics
- `sections.ts` - Academic sections
- `users.ts` - User authentication
- `dashboard.ts` - Dashboard statistics queries
- `pending-actions.ts` - Pending action database operations
- `disease-thresholds.ts` - Disease threshold CRUD and auto-creation

**Database Schema:** 9 core tables:
- `users` - System users with role-based access (SUPER_ADMIN, ADMIN, PATIENT)
- `students` - Patient records linked to users (one-to-one)
- `sections` - Academic sections (Grades 7-12, Sections A-D)
- `medical_records` - Health visit records with disease tracking
- `alerts` - System notifications (outbreak alerts, duplicate detection)
- `duplicate_detections` - Potential duplicate student records
- `audit_logs` - Compliance tracking for all CRUD operations, including user creation with enhanced logging for SUPER_ADMIN account creation
- `pending_actions` - Approval workflow for ADMIN requests
- `disease_thresholds` - Dynamic outbreak detection thresholds (configurable per disease)

### Authentication & Authorization

**NextAuth 5 Configuration** (`src/lib/auth.ts`):
- Credentials provider (username/password)
- JWT sessions with 24-hour expiration
- Password hashing via bcryptjs
- Last login timestamp tracking

**Middleware Protection** (`src/middleware.ts`):
- Public routes: `/`, `/login`, `/api/auth/*`
- Protected routes: `/dashboard/*` (redirects to `/login` if unauthorized)

**Role Hierarchy:**
- SUPER_ADMIN - Full system access
- ADMIN - Clinic staff operations
- PATIENT - Limited student access

### Key System Features

#### 1. Alert System (`src/lib/alert-system.ts`)
**Outbreak Detection:**
- Disease-specific thresholds (e.g., Flu: 5 cases/week)
- Automatic alerts when thresholds exceeded
- 24-hour spam prevention per disease
- Severity: CRITICAL (2x threshold) or HIGH (1x threshold)

**Alert Management:**
- Real-time polling via SWR (30-second refresh)
- Mark as read/unread
- Resolve with notes
- Unread count tracking

#### 2. Duplicate Detection (`src/lib/duplicate-detection.ts`)
**Matching Logic:**
- Checks: first name + last name + DOB + LRN
- Similarity scoring: 25 points per match, min 50% to flag
- Creates DUPLICATE_DETECTED alerts
- Resolution tracking (MERGED, KEPT_BOTH, DELETED_ONE)

#### 3. Audit Logging (`src/lib/audit-logger.ts`)
- Logs all CRUD operations (CREATE, READ, UPDATE, DELETE)
- Captures IP address and user agent
- Stores old/new values as JSON
- Provides compliance audit trail

#### 4. Student Registration
**Workflow:**
1. Admin submits registration form (Zod validated)
2. Duplicate detection runs automatically
3. If approved → transaction creates user + student record
4. Generates credentials (username, password, student number)
5. Displays credentials to admin for communication to student

**Auto-generated Data:**
- Username: `<firstname><lastname><random4digits>`
- Student Number: `<year>-<random6digits>`
- Password: Randomly generated 12-character string

#### 5. Permission & Approval System (`src/lib/pending-action-executor.ts`)
**Workflow:**
- **ADMIN Role:** Must request SUPER_ADMIN approval for:
  - Student registrations (POST /api/students)
  - User deactivation (PATCH /api/users/[id])
  - User deletion (DELETE /api/users/[id])
  - **Note:** ADMINs cannot create users - only SUPER_ADMIN can create users of any type
- **SUPER_ADMIN Role:** Can perform all actions directly without approval, including:
  - Creating any user type (PATIENT, ADMIN, or SUPER_ADMIN)
  - Immediate execution of all restricted operations

**Pending Actions Table:**
- Stores action type, requester details, target user, status (PENDING/APPROVED/REJECTED)
- Action-specific data stored as JSON for flexibility
- Priority levels: LOW, MEDIUM, HIGH

**Approval Flow:**
1. ADMIN submits request → Creates pending action
2. SUPER_ADMIN reviews in "Pending Approvals" tab
3. Approve: Executes action + notifies ADMIN with credentials (for registrations)
4. Reject: Marks as rejected + notifies ADMIN with reason

**Notification System:**
- Automatic SYSTEM alerts created for approval/rejection
- For approved registrations: ADMIN receives credentials via alert
- For rejections: ADMIN receives rejection reason

**User Management:**
- ADMIN now has access to User Management page
- Delete functionality implemented (hard delete with cascade)
- All destructive actions require SUPER_ADMIN approval

#### 6. Disease Thresholds Management System (`src/lib/queries/disease-thresholds.ts`)

**Purpose:** Dynamic configuration of outbreak detection thresholds via database instead of hardcoded values.

**Database Table:** `disease_thresholds`
- `id` (UUID) - Primary key
- `disease_name` (VARCHAR 100, UNIQUE) - Disease identifier
- `cases_per_week` (INT, CHECK > 0) - Alert trigger threshold
- `description` (TEXT) - Optional administrative notes
- `is_active` (BOOLEAN) - Soft enable/disable flag
- `created_by_id`, `updated_by_id` - Audit trail
- `created_at`, `updated_at` - Timestamps

**Key Query Functions:**
- `getActiveThresholds()` - Returns active thresholds for alert system
- `getAllThresholds()` - Returns all thresholds for admin UI
- `createThreshold(data)` - Create new threshold with audit logging
- `updateThreshold(id, data)` - Partial updates with timestamp tracking
- `deleteThreshold(id)` - Hard delete threshold
- `ensureThresholdExists(name, userId)` - Auto-create default threshold (5 cases/week) for new diseases

**Integration:**
- Alert system (`src/lib/alert-system.ts`) now fetches thresholds dynamically instead of using hardcoded array
- Medical record creation auto-creates missing thresholds via `ensureThresholdExists()`
- SUPER_ADMIN can manage thresholds via Account page → "Disease Thresholds" tab

**UI Components:**
- `DiseaseThresholdTable` - CRUD interface for threshold management
- `CreateThresholdDialog` - Modal with disease combobox and validation
- `EditThresholdDialog` - Edit cases/week and description

**Default Thresholds:** 8 diseases seeded (Flu: 5, Dengue: 3, COVID-19: 2, Headache: 10, Stomach Ache: 7, Fever: 8, Cough: 10, Diarrhea: 5)

### API Routes

All API routes in `src/app/api/`:

**Students:**
- `GET /api/students` - List with search/filter/pagination
- `POST /api/students` - Create new student
- `GET /api/students/[id]` - Get single student
- `PUT /api/students/[id]` - Update student
- `GET /api/students/[id]/records` - Medical records for student
- `GET /api/students/user/[userId]` - Get student record by user ID

**Alerts:**
- `GET /api/alerts` - List alerts (filter by unread)
- `POST /api/alerts` - Create alert
- `GET /api/alerts/[id]` - Alert details
- `DELETE /api/alerts/[id]` - Delete alert
- `PUT /api/alerts/[id]/read` - Mark as read
- `POST /api/alerts/trigger` - Manually trigger outbreak alert check
- `POST /api/alerts/mark-all-read` - Mark all user's alerts as read (bulk operation)

**Dashboard:**
- `GET /api/dashboard/stats` - School-wide statistics
- `GET /api/dashboard/grade/[grade]` - Grade-level breakdown

**Statistics:**
- `GET /api/statistics` - Disease statistics with time filtering

**Pending Actions:**
- `GET /api/pending-actions` - List pending actions (SUPER_ADMIN: all, ADMIN: own only)
- `POST /api/pending-actions` - Create pending action (ADMIN, SUPER_ADMIN)
- `GET /api/pending-actions/[id]` - Get pending action details
- `DELETE /api/pending-actions/[id]` - Cancel pending action
- `PATCH /api/pending-actions/[id]/approve` - Approve action (SUPER_ADMIN only)
- `PATCH /api/pending-actions/[id]/reject` - Reject action (SUPER_ADMIN only)

**Users:**
- `GET /api/users` - List all users (SUPER_ADMIN only)
- `POST /api/users` - Create user (SUPER_ADMIN only)
- `GET /api/users/[id]` - Get user details
- `PUT /api/users/[id]` - Update user profile
- `PATCH /api/users/[id]` - Update user status (deactivate/activate)
- `DELETE /api/users/[id]` - Delete user (hard delete with pending approval for ADMIN)
- `PATCH /api/users/[id]/password` - Update user password

**Disease Thresholds:**
- `GET /api/disease-thresholds` - List all thresholds + existing diseases (SUPER_ADMIN only)
- `POST /api/disease-thresholds` - Create threshold (SUPER_ADMIN only)
- `PUT /api/disease-thresholds/[id]` - Update threshold (SUPER_ADMIN only)
- `DELETE /api/disease-thresholds/[id]` - Delete threshold (SUPER_ADMIN only)

**Medical Records:**
- `DELETE /api/students/[id]/records/[recordId]` - Delete medical record with audit trail (ADMIN/SUPER_ADMIN)

**Sections & Categories:**
- `GET /api/sections` - List academic sections
- `GET /api/disease-categories` - List disease categories

**Auth:**
- `/api/auth/[...nextauth]` - NextAuth endpoints

**Debug (dev only):**
- `GET /api/debug/session` - Current session info

### Component Patterns

**UI Components:** shadcn-style components in `src/components/ui/` (Button, Card, Input, Table, Select, Badge, etc.)

**Hooks:**
- `useAlerts()` - Alert fetching with SWR, returns: `{ alerts, error, isLoading, unreadCount, markAsRead(), dismissAlert() }`
- `usePendingActions()` - Pending actions with SWR, returns: `{ pendingActions, pendingCount, isLoading, approvePendingAction(), rejectPendingAction(), cancelPendingAction() }`
- `useSections()` - Fetches academic sections/grades via SWR
- `useDiseaseFilters()` - Disease filter state with localStorage persistence, returns: `{ selectedDiseases, searchQuery, debouncedSearch, filteredDiseases, selectAll(), clearAll(), toggleDisease() }`
- `use-scroll-animation` - Scroll-triggered animation state for landing page sections

**Layout Components:**
- `navbar.tsx` - Landing page navigation
- `sidebar.tsx` - Dashboard sidebar (grade links 7-12)
- `dashboard-header.tsx` - Header with user info & alert popover

**Account Components** (`src/components/account/`):
- `profile-form.tsx` - User profile editing
- `password-form.tsx` - Password change form
- `user-management-table.tsx` - User list table (ADMIN/SUPER_ADMIN)
- `create-user-dialog.tsx` - Modal for creating new users
- `account-info-card.tsx` - Read-only account info display
- `patient-info-section.tsx` - Patient-specific info within account page
- `disease-threshold-table.tsx` - Threshold CRUD table (SUPER_ADMIN only)
- `create-threshold-dialog.tsx` - Create new threshold modal with disease combobox
- `edit-threshold-dialog.tsx` - Edit threshold configuration modal

**Pending Actions Components** (`src/components/pending-actions/`):
- `pending-action-list.tsx` - List of pending approval requests
- `pending-action-card.tsx` - Individual action card
- `approve-action-modal.tsx` - Confirmation modal for approval
- `action-status-badge.tsx` - Status indicator badge

**Medical Records Components** (`src/components/medical-records/`):
- `delete-record-dialog.tsx` - Confirmation dialog for medical record deletion with preview

**Statistics Components** (`src/components/statistics/`):
- `disease-filter-card.tsx` - Disease selection filter with search and select all/clear
- `disease-histogram.tsx` - 12-month bar chart for individual disease trends with change badges

**Animation Components** (`src/components/animations/`):
- `ParticleBackground.tsx` - Animated particle backdrop (landing page)
- `ScrollIndicator.tsx` - Scroll-triggered animation indicator

**Form Validation:**
- React Hook Form + Zod schemas
- Validation schemas in `src/lib/validations/`: `auth.ts`, `account.ts`, `pending-actions.ts`

## Important Architectural Patterns

### 1. Route Groups
- `(auth)` - Public authentication pages
- `(dashboard)` - Protected dashboard with shared layout
- `patient-portal` - Patient self-service portal (limited access)

### 2. Database Transactions
Always use `transaction()` wrapper for multi-table operations:
```typescript
import { transaction } from '@/lib/db';

await transaction(async (conn) => {
  const [userResult] = await conn.execute(userInsertSQL, userParams);
  const [studentResult] = await conn.execute(studentInsertSQL, studentParams);
  return { userId: userResult.insertId, studentId: studentResult.insertId };
});
```

### 3. Query Organization
- Keep raw SQL in `src/lib/queries/` modules
- Export typed functions, not inline queries
- Use prepared statements (? placeholders) to prevent SQL injection

### 4. API Route Pattern
```typescript
// Always check auth first
const session = await auth();
if (!session) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

// Validate request body with Zod
const body = await request.json();
const validated = schema.parse(body);

// Perform operation
const result = await queryFunction(validated);

// Return response
return NextResponse.json(result);
```

### 5. Real-time Updates
Use SWR for polling endpoints that need real-time data:
```typescript
const { data, error, mutate } = useSWR(
  '/api/alerts',
  fetcher,
  { refreshInterval: 30000 } // 30-second polling
);
```

## Design System

**Colors:**
- Primary: `#C41E3A` (deep red)
- Accent: `#E63946` (bright red)
- Background: `#FAFAFA` (off-white)

**Typography:**
- Primary font: Inter
- Monospace: Geist Mono

**Component Style:**
- Gradient effects on buttons/cards
- Shadow with red tint: `shadow-[0_4px_20px_rgba(196,30,58,0.15)]`
- Rounded corners: `rounded-xl`, `rounded-2xl`

## Testing & Verification

### Manual Testing Flow
1. Start dev server: `npm run dev`
2. Login with superadmin credentials
3. Navigate to /dashboard - verify grade cards render
4. Go to /registration - register a test student
5. Check /patients - verify student appears in list
6. Go to /alerts - verify alert system loads
7. Check /statistics - verify charts render

### Database Verification
```bash
# After running setup-database.js, verify:
# - 24 sections (Grades 7-12 × Sections A-D)
# - 1+ users (superadmin)
# - Test students (if test-data.sql was loaded)
```

### Common Issues
- **Database connection fails:** Check `.env.local` credentials and Aiven SSL settings
- **Auth not working:** Verify `NEXTAUTH_SECRET` is set and `NEXTAUTH_URL` matches dev server
- **Build errors:** Run `npm install` to ensure dependencies are current

## Key Files Reference

**Configuration:**
- `medicare-app/package.json` - Dependencies & scripts
- `medicare-app/.env.local` - Environment variables (not in git)
- `database/schema.sql` - Table definitions
- `database/seed.sql` - Initial data (sections, superadmin)

**Core Logic:**
- `src/lib/db.ts` - Database abstraction
- `src/lib/auth.ts` - NextAuth config
- `src/lib/rbac.ts` - Role-based access control
- `src/lib/alert-system.ts` - Outbreak detection
- `src/lib/duplicate-detection.ts` - Duplicate matching
- `src/lib/pending-action-executor.ts` - Approval workflow execution
- `src/lib/queries/pending-actions.ts` - Pending action database operations
- `src/lib/queries/disease-thresholds.ts` - Disease threshold database operations
- `src/hooks/useDiseaseFilters.ts` - Disease filter state management with localStorage
- `src/middleware.ts` - Route protection

**Main Pages:**
- `src/app/(dashboard)/dashboard/page.tsx` - Main dashboard
- `src/app/(dashboard)/dashboard/grade/[grade]/page.tsx` - Grade-specific dashboard
- `src/app/(dashboard)/registration/page.tsx` - Student registration
- `src/app/(dashboard)/patients/page.tsx` - Patient list
- `src/app/(dashboard)/patients/[id]/page.tsx` - Patient detail view
- `src/app/(dashboard)/patients/[id]/edit/page.tsx` - Patient edit form
- `src/app/(dashboard)/patients/[id]/new-record/page.tsx` - New medical record
- `src/app/(dashboard)/alerts/page.tsx` - Alert management
- `src/app/(dashboard)/alerts/[id]/page.tsx` - Alert detail view
- `src/app/(dashboard)/account/page.tsx` - Account & user management
- `src/app/(dashboard)/statistics/page.tsx` - Statistics dashboard with disease filtering and trend histograms
- `src/app/(auth)/login/page.tsx` - Login page
- `src/app/patient-portal/page.tsx` - Patient self-service portal
