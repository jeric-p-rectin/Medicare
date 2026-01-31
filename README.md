# MEDICARE - Medical Data and Information Community Alert Response Engine

A comprehensive Next.js web application for managing high school clinic operations, patient records, and health outbreak detection for Grades 7-12.

## 🚀 Features

### Core Functionality
- **Patient Registration & Management**: Complete student registration system with duplicate detection
- **Medical Records**: Track health visits, diagnoses, treatments, and medical history
- **Outbreak Detection**: Automated disease outbreak monitoring with configurable thresholds
- **Alert System**: Real-time notifications for outbreaks and duplicate records
- **Statistics Dashboard**: Visual analytics for disease trends and patient demographics
- **Role-Based Access Control**: Three-tier permission system (SUPER_ADMIN, ADMIN, PATIENT)

### New: Permission & Approval System 🆕
- **Admin Approval Workflow**: ADMIN users must request SUPER_ADMIN approval for:
  - Student registrations
  - User deactivation
  - User deletion (hard delete)
- **Pending Approvals Interface**: Dedicated tab for SUPER_ADMIN to review and approve/reject requests
- **Automated Notifications**: ADMIN receives credentials via system alerts after approval
- **User Management Access**: ADMIN now has access to User Management with approval workflow

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5
- **UI**: React 19.2.3 + Tailwind CSS 4 + shadcn/ui
- **Database**: MySQL (Aiven Cloud)
- **Authentication**: NextAuth 5 (JWT)
- **Validation**: Zod + React Hook Form
- **Data Fetching**: SWR (with 30-second polling)
- **Icons**: Lucide React
- **Charts**: Recharts

## 📋 Prerequisites

- Node.js 18+
- MySQL database (Aiven or local)
- npm/pnpm/yarn/bun

## 🚀 Getting Started

### 1. Clone and Install

```bash
cd medicare-app
npm install
```

### 2. Environment Setup

Create `.env.local` in the `medicare-app/` directory:

```env
# Database
DB_HOST=<your-aiven-host>.aivencloud.com
DB_PORT=3306
DB_USER=avnadmin
DB_PASSWORD=<your-password>
DB_NAME=defaultdb

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>

# Environment
NODE_ENV=development
```

### 3. Database Setup

```bash
# Run schema creation and seed data
node database/setup-database.js
```

This creates:
- 9 database tables (users, students, sections, medical_records, alerts, duplicate_detections, audit_logs, pending_actions)
- 24 academic sections (Grades 7-12 × Sections A-D)
- Default superadmin account

**Default Login Credentials:**
- Username: `superadmin`
- Password: `admin123`

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
medicare-app/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Public auth pages (login)
│   │   ├── (dashboard)/              # Protected dashboard routes
│   │   │   ├── dashboard/            # Main dashboard
│   │   │   ├── registration/         # Student registration
│   │   │   ├── patients/             # Patient list
│   │   │   ├── alerts/               # Alerts & Pending Approvals
│   │   │   ├── statistics/           # Analytics
│   │   │   └── account/              # User settings & management
│   │   └── api/                      # API route handlers
│   │       ├── students/             # Student operations
│   │       ├── alerts/               # Alert management
│   │       ├── pending-actions/      # Approval workflow (NEW)
│   │       └── users/                # User management
│   ├── components/                   # React components
│   │   ├── alerts/                   # Alert UI components
│   │   ├── pending-actions/          # Approval workflow UI (NEW)
│   │   ├── registration/             # Registration forms
│   │   ├── account/                  # User management
│   │   └── ui/                       # shadcn base components
│   ├── lib/                          # Business logic
│   │   ├── db.ts                     # Database connection & helpers
│   │   ├── auth.ts                   # NextAuth configuration
│   │   ├── queries/                  # Type-safe database queries
│   │   ├── alert-system.ts           # Outbreak detection logic
│   │   ├── duplicate-detection.ts    # Duplicate matching
│   │   ├── pending-action-executor.ts # Approval execution (NEW)
│   │   ├── audit-logger.ts           # Compliance logging
│   │   └── validations/              # Zod schemas
│   ├── types/                        # TypeScript definitions
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAlerts.ts
│   │   └── usePendingActions.ts      # (NEW)
│   └── middleware.ts                 # Route protection
├── database/
│   ├── schema.sql                    # Database schema
│   ├── seed.sql                      # Initial data
│   └── migrations/                   # Database migrations (NEW)
└── public/                           # Static assets
```

## 🔑 User Roles & Permissions

### SUPER_ADMIN
- Full system access
- Direct execution of all operations (no approval needed)
- Can approve/reject ADMIN requests
- Access to User Management
- Access to Pending Approvals tab

### ADMIN (Clinic Staff)
- Register students (requires SUPER_ADMIN approval)
- View and manage patient records
- Access statistics and alerts
- User management with approval workflow
- Deactivate/delete users (requires SUPER_ADMIN approval)

### PATIENT (Students)
- View own medical records
- Update email address only
- Limited dashboard access

## 📊 Database Schema

### Core Tables
1. **users** - System users with role-based access
2. **students** - Patient records (1:1 with users)
3. **sections** - Academic sections (Grades 7-12)
4. **medical_records** - Health visit records with disease tracking
5. **alerts** - System notifications (outbreak, duplicate)
6. **duplicate_detections** - Potential duplicate records
7. **audit_logs** - Compliance tracking for all operations
8. **pending_actions** - Approval workflow for ADMIN requests (NEW)

### New: pending_actions Table
Stores approval requests with:
- Action type (REGISTER_STUDENT, DEACTIVATE_USER, DELETE_USER)
- Requester and reviewer information
- Status (PENDING, APPROVED, REJECTED)
- Action-specific data as JSON
- Priority levels (LOW, MEDIUM, HIGH)

## 🔄 Permission & Approval Workflow

### Registration Approval Flow
1. **ADMIN** submits student registration form
2. System creates `pending_action` with registration data
3. **SUPER_ADMIN** reviews in "Pending Approvals" tab
4. **Approve**:
   - Student account created
   - Credentials generated
   - **ADMIN** receives notification with credentials
5. **Reject**:
   - **ADMIN** receives rejection reason via alert

### User Management Approval Flow
1. **ADMIN** requests user deactivation/deletion
2. System creates `pending_action` for approval
3. **SUPER_ADMIN** approves/rejects from Pending Approvals
4. **ADMIN** receives notification of decision

### Direct Actions (No Approval)
- **SUPER_ADMIN** can perform all operations directly
- Patient registrations by SUPER_ADMIN show credentials immediately
- User management actions are instant

## 🎨 Key Features

### Outbreak Detection
- Monitors 8 disease categories with configurable thresholds
- Automatic alert generation when cases exceed weekly limits
- 24-hour spam prevention per disease
- Severity levels: CRITICAL (2x threshold), HIGH (1x threshold)

### Duplicate Detection
- Similarity matching on: first name, last name, DOB, LRN
- 25 points per match, 50%+ triggers alert
- Manual resolution by admins (MERGED, KEPT_BOTH, DELETED_ONE)

### Audit Logging
- All CRUD operations logged
- Tracks IP address, user agent, old/new values
- Provides compliance audit trail

## 🔐 Security Features

- JWT authentication with 24-hour expiration
- Password hashing with bcryptjs (10 salt rounds)
- SQL injection prevention via parameterized queries
- Role-based route protection
- CSRF protection via NextAuth
- Approval workflow for sensitive operations

## 📱 API Endpoints

### Students
- `GET /api/students` - List with search/filter/pagination
- `POST /api/students` - Create student (with approval for ADMIN)
- `GET /api/students/[id]` - Get single student
- `PUT /api/students/[id]` - Update student

### Alerts
- `GET /api/alerts` - List alerts (filter by unread/type)
- `POST /api/alerts` - Create alert
- `PATCH /api/alerts/[id]/read` - Mark as read
- `DELETE /api/alerts/[id]` - Delete alert

### Pending Actions (NEW)
- `GET /api/pending-actions` - List pending actions
- `POST /api/pending-actions` - Create pending action
- `PATCH /api/pending-actions/[id]/approve` - Approve (SUPER_ADMIN only)
- `PATCH /api/pending-actions/[id]/reject` - Reject (SUPER_ADMIN only)
- `DELETE /api/pending-actions/[id]` - Cancel request

### Users
- `GET /api/users` - List all users (SUPER_ADMIN only)
- `POST /api/users` - Create user (SUPER_ADMIN only)
- `PATCH /api/users/[id]` - Update status (with approval for ADMIN)
- `DELETE /api/users/[id]` - Delete user (with approval for ADMIN)

## 🧪 Testing

### Manual Testing Flow
1. Login as superadmin
2. Navigate to `/dashboard` - verify grade cards render
3. Create test ADMIN user in User Management
4. Logout and login as ADMIN
5. Register test student - verify pending approval message
6. Logout and login as SUPER_ADMIN
7. Go to `/alerts` → "Pending Approvals" tab
8. Approve registration - verify success
9. Login as ADMIN - check alerts for credentials
10. Verify student appears in `/patients` list

### Database Verification
```sql
-- Check pending actions
SELECT * FROM pending_actions WHERE status = 'PENDING';

-- Check users
SELECT id, username, role, is_active FROM users;

-- Check students
SELECT s.*, u.username FROM students s
JOIN users u ON s.user_id = u.id;

-- Check audit logs
SELECT * FROM audit_logs
WHERE action IN ('CREATE', 'UPDATE', 'DELETE')
ORDER BY created_at DESC LIMIT 10;
```

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `.env.local` credentials
- Check Aiven SSL settings
- Ensure database server is running

### Authentication Not Working
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches dev server URL
- Clear browser cookies and try again

### Build Errors
- Run `npm install` to update dependencies
- Delete `.next` folder and rebuild
- Check Node.js version (18+ required)

## 📝 Development Guidelines

### Adding New Features
1. Create database migration in `database/migrations/`
2. Update schema.sql
3. Add TypeScript types in `src/types/`
4. Create query functions in `src/lib/queries/`
5. Build API routes in `src/app/api/`
6. Create UI components in `src/components/`
7. Add validation schemas in `src/lib/validations/`
8. Update CLAUDE.md for AI assistance

### Code Style
- Use TypeScript for type safety
- Follow Next.js 13+ conventions (App Router)
- Server Components by default, Client Components when needed
- Tailwind for styling (avoid custom CSS)
- Zod for validation
- SWR for data fetching with polling

## 📚 Documentation

- **CLAUDE.md** - Detailed technical documentation and development guidelines
- **Database Schema** - See `database/schema.sql`
- **API Documentation** - Inline comments in route handlers

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Update documentation
5. Create pull request

## 📄 License

[Specify your license here]

## 👥 Authors

MEDICARE Development Team

---

**Version**: 2.0 with Permission & Approval System
**Last Updated**: January 2026
