# MEDICARE

**Medical Data and Information Community Alert Response Engine** — a web application for managing school clinic operations, patient records, and health outbreak detection for high schools (Grades 7–12).

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **NextAuth 5** (beta) — JWT-based authentication
- **MySQL** on Aiven (cloud-hosted database)
- **Tailwind CSS 4** + **shadcn/ui** (Radix UI primitives)
- **React Hook Form** + **Zod** — form handling and validation
- **SWR** — data fetching with polling
- **Recharts** — statistics dashboards

## Prerequisites

- Node.js 18 or later
- npm
- Access to the Aiven MySQL instance (credentials required for `.env.local`)

## Getting Started

### 1. Install dependencies

```bash
cd medicare-app
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in `medicare-app/`:

```env
DB_HOST=<aiven-host>.aivencloud.com
DB_PORT=3306
DB_USER=avnadmin
DB_PASSWORD=<password>
DB_NAME=defaultdb
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generated-secret>
NODE_ENV=development
```

### 3. Set up the database

Run the setup script to apply the schema, seed data, and test data:

```bash
node database/setup-database.js
```

This creates the 9 core tables and seeds 24 academic sections (Grades 7–12, Sections A–D) plus a default `superadmin` user and 8 default disease thresholds.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Default Credentials

| Username    | Password |
|-------------|----------|
| superadmin  | admin123 |

## Available Scripts

| Script        | Description                          |
|---------------|--------------------------------------|
| `npm run dev` | Start development server             |
| `npm run build` | Build for production               |
| `npm start`   | Start production server              |
| `npm run lint`| Run ESLint                           |

## Project Structure

```
medicare-app/
├── src/
│   ├── app/                      # Next.js App Router pages & API routes
│   │   ├── (auth)/               # Public routes (login)
│   │   ├── (dashboard)/          # Protected dashboard routes
│   │   ├── patient-portal/       # Patient self-service portal
│   │   └── api/                  # API route handlers
│   ├── components/               # React components (feature-based + ui/)
│   ├── lib/                      # Business logic, DB helpers, query modules
│   ├── hooks/                    # Custom React hooks (SWR-based)
│   ├── types/                    # TypeScript type definitions
│   └── middleware.ts             # Auth route protection
├── database/                     # SQL schema, seeds, migrations, setup script
└── public/                       # Static assets
```

## Key Features

- **Student registration** with automatic duplicate detection
- **Outbreak alert system** — disease-threshold monitoring with severity levels
- **Disease threshold management** — SUPER_ADMIN can configure outbreak detection thresholds dynamically
- **Role-based access control** — SUPER_ADMIN, ADMIN, PATIENT roles
- **Pending approval workflow** — ADMIN actions require SUPER_ADMIN sign-off
- **Audit logging** — compliance trail for all CRUD operations
- **Medical records & statistics** — per-student records and grade-level dashboards
- **Disease filtering & trend visualization** — 12-month histograms with month-over-month change tracking
- **Patient self-service portal** — limited student-facing access

## Recent Feature Additions

### Disease Thresholds Management
SUPER_ADMIN users can now dynamically configure outbreak detection thresholds via the Account page. The system supports:
- Creating thresholds for new diseases
- Editing threshold values and descriptions
- Activating/deactivating thresholds without deletion
- Automatic threshold creation when new diseases are recorded

### Enhanced Statistics Dashboard
The statistics page now includes:
- Disease filtering with persistent selections (localStorage)
- 12-month trend histograms for individual diseases
- Month-over-month change indicators (% increase/decrease)
- Time period selector (week/month/quarter/year)

### Medical Records Management
- Medical record deletion with audit trail logging
- Confirmation dialogs with record preview before deletion
- Role-based access (ADMIN/SUPER_ADMIN only)

### Alert System Improvements
- "Mark all as read" bulk operation for alerts
- Dynamic threshold loading from database instead of hardcoded values
- Automatic outbreak detection when medical records are created

## Database Schema

The application uses 9 core tables:

| Table | Purpose |
|-------|---------|
| `users` | System users with role-based access |
| `students` | Patient records linked to users |
| `sections` | Academic sections (Grades 7–12, Sections A–D) |
| `medical_records` | Health visit records with disease tracking |
| `alerts` | System notifications and outbreak alerts |
| `duplicate_detections` | Potential duplicate student detection |
| `audit_logs` | Compliance trail for all operations |
| `pending_actions` | Approval workflow for ADMIN requests |
| `disease_thresholds` | Configurable outbreak detection thresholds |
