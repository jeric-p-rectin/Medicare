# MED-Alert: Medical Electronic Database with Alert System
## For Bajet-Castillo High School Clinic
### Complete Development Plan & Implementation Guide (RED & WHITE THEME)

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Design System & Color Palette](#design-system--color-palette)
3. [Technical Stack](#technical-stack)
4. [Page Mockups & UI Specifications](#page-mockups--ui-specifications)
5. [Development Timeline](#development-timeline)
6. [Complete Project Structure](#complete-project-structure)
7. [Database Schema Design](#database-schema-design)
8. [Step-by-Step Implementation Guide](#step-by-step-implementation-guide)
9. [Feature Implementation Details](#feature-implementation-details)
10. [Security & Best Practices](#security--best-practices)
11. [Testing Strategy](#testing-strategy)
12. [Deployment Guide](#deployment-guide)

---

## 🎯 Project Overview

**Project Name:** MED-Alert  
**Full Name:** Medical Electronic Database with Alert System  
**Target:** Bajet-Castillo High School Clinic  
**Type:** Web-based Medical Records Management System  
**Development Period:** 2-3 months  
**Estimated Cost:** ₱0-800 (using free tier services)

### Key Features
- Three-tier user access (Super Admin, Admin, Student/Patient)
- Electronic Medical Records (EMR)
- Medicine Inventory Management
- Health Trends Tracking
- Statistics Dashboard
- Automated Notifications & Alerts
- Duplicate Detection System

---

## 🎨 Design System & Color Palette

### Primary Color Palette (From Logo)
```css
/* Primary Reds */
--primary-red: #C41E3A;          /* Main brand red */
--bright-red: #E63946;           /* Bright accent red */
--dark-red: #8B1A2E;             /* Dark red for depth */
--crimson: #DC143C;              /* Vibrant crimson */
--maroon: #6B0F1A;               /* Deep maroon */

/* Supporting Colors */
--rose: #E57373;                 /* Light rose */
--red-tint-light: #FFF5F6;       /* Very light red tint */
--red-tint-medium: #FFEBEE;      /* Light red tint */

/* Neutral Colors */
--white: #FFFFFF;
--off-white: #FAFAFA;
--light-gray: #F5F5F5;
--medium-gray: #90A4AE;
--dark-gray: #263238;

/* Status Colors */
--success: #66BB6A;              /* Green for success */
--warning: #FFA726;              /* Orange for warnings */
--error: #EF5350;                /* Red for errors */
--info: #42A5F5;                 /* Blue for info */
```

### Typography System
```css
/* Font Family */
--font-primary: 'Inter', 'Segoe UI', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Component Styles

#### Buttons
```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, #C41E3A 0%, #E63946 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(196, 30, 58, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(196, 30, 58, 0.3);
}

/* Secondary Button */
.btn-secondary {
  background: white;
  color: #C41E3A;
  border: 2px solid #FFEBEE;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  border-color: #C41E3A;
  background: #FFF5F6;
}

/* Danger Button */
.btn-danger {
  background: #EF5350;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
}
```

#### Cards
```css
.card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(196, 30, 58, 0.08);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(196, 30, 58, 0.12);
  transform: translateY(-4px);
}

.card-header {
  border-bottom: 2px solid #FFF5F6;
  padding-bottom: 16px;
  margin-bottom: 16px;
}
```

#### Form Inputs
```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #F5F5F5;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  background: #FAFAFA;
}

.form-input:focus {
  outline: none;
  border-color: #C41E3A;
  background: white;
  box-shadow: 0 0 0 4px rgba(196, 30, 58, 0.1);
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #263238;
  margin-bottom: 8px;
}
```

---

## 📐 Page Mockups & UI Specifications

---

## 🔐 PAGE 1: LOGIN PAGE

### Visual Mockup
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                   [MED-Alert Logo]                       │
│                                                          │
│         Medical Electronic Database with Alert          │
│             Bajet-Castillo High School Clinic            │
│                                                          │
│     ┌────────────────────────────────────────┐          │
│     │                                        │          │
│     │    Username or Student ID              │          │
│     │    [___________________________]       │          │
│     │                                        │          │
│     │    Password                            │          │
│     │    [___________________________] 👁    │          │
│     │                                        │          │
│     │    [ ] Remember me     Forgot Password?│          │
│     │                                        │          │
│     │         [   Sign In Button   ]         │          │
│     │                                        │          │
│     │   🏫 For Bajet-Castillo High School     │          │
│     │                                        │          │
│     └────────────────────────────────────────┘          │
│                                                          │
│     Background: Subtle red gradient with particles      │
└──────────────────────────────────────────────────────────┘
```

### Implementation Code

```jsx
// app/login/page.tsx
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 p-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -ml-48 -mb-48" />
      
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl shadow-red-500/10 p-8 md:p-10">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <img 
                src="/logo.png" 
                alt="MED-Alert Logo" 
                className="w-20 h-20 mx-auto"
              />
            </div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#C41E3A] to-[#E63946] bg-clip-text text-transparent mb-2">
              MED-Alert
            </h1>
            <p className="text-sm text-gray-500 mb-1">
              Medical Electronic Database with Alert
            </p>
            <p className="text-xs text-gray-400 font-medium">
              Bajet-Castillo High School Clinic
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-5">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username or Student ID
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username or student ID"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#C41E3A] focus:ring-[#C41E3A]" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-[#C41E3A] font-semibold hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          {/* School Badge */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-sm font-medium">Bajet-Castillo High School</span>
            </div>
          </div>
        </div>

        {/* Version Info */}
        <p className="text-center mt-4 text-xs text-gray-400">
          Version 1.0 • Powered by MED-Alert System
        </p>
      </div>
    </div>
  );
}
```

---

## 📊 PAGE 2: DASHBOARD (Admin/Super Admin)

### Visual Mockup
```
┌─────────────────────────────────────────────────────────────────────────┐
│ [🏥 Logo] MED-Alert            🔔(3)  📊 Reports  👤 Admin Name ▼      │
├──────────┬──────────────────────────────────────────────────────────────┤
│          │  📊 Dashboard Overview                                        │
│  📊      │                                                               │
│Dashboard │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────┐│
│          │  │  👥 1,248   │ │  💊 342     │ │  ⚠️ 8       │ │ 📈 +12% ││
│  👥      │  │  Students   │ │  Medicines  │ │  Alerts     │ │ Growth  ││
│Students  │  │  Active     │ │  In Stock   │ │  Active     │ │ Rate    ││
│          │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────┘│
│  💊      │                                                               │
│Medicines │  Recent Clinic Visits                                        │
│          │  ┌─────────────────────────────────────────────────────────┐ │
│  📋      │  │ Student Name     | Grade | Complaint      | Time       │ │
│Records   │  │ Juan Dela Cruz   | 12-A  | Headache       | 10:30 AM  │ │
│          │  │ Maria Santos     | 11-B  | Fever          | 11:45 AM  │ │
│  📊      │  │ Pedro Reyes      | 10-C  | Stomach Pain   | 1:20 PM   │ │
│Reports   │  └─────────────────────────────────────────────────────────┘ │
│          │                                                               │
│  ⚙️      │  Low Stock Alerts                                            │
│Settings  │  ┌─────────────────────────────────────────────────────────┐ │
│          │  │ ⚠️ Paracetamol 500mg - Only 45 tablets left              │ │
│  🚪      │  │ ⚠️ Betadine Solution - Expiring in 15 days               │ │
│Logout    │  └─────────────────────────────────────────────────────────┘ │
│          │                                                               │
│          │  Common Health Issues (This Month)                          │
│          │  [Bar Chart: Headache, Fever, Stomach Pain, Injury...]     │
└──────────┴──────────────────────────────────────────────────────────────┘
```

### Implementation Code

```jsx
// app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-[#C41E3A] to-[#E63946] bg-clip-text text-transparent">
                MED-Alert
              </h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white rounded-xl font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Dashboard</span>
          </a>

          <a href="/students" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-[#C41E3A] rounded-xl font-medium transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Students</span>
          </a>

          <a href="/medicines" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-[#C41E3A] rounded-xl font-medium transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span>Medicines</span>
          </a>

          <a href="/records" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-[#C41E3A] rounded-xl font-medium transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Medical Records</span>
          </a>

          <a href="/reports" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-[#C41E3A] rounded-xl font-medium transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Reports</span>
          </a>

          <a href="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-[#C41E3A] rounded-xl font-medium transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </a>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium w-full transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Welcome back, Admin!</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">Admin Name</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#C41E3A] to-[#E63946] rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1 - Students */}
          <div className="bg-white rounded-2xl p-6 shadow-sm shadow-red-500/5 border border-red-50 hover:shadow-md hover:shadow-red-500/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#C41E3A]/10 to-[#E63946]/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#C41E3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-green-500 text-sm font-semibold">+5.2%</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">1,248</h3>
            <p className="text-gray-500 text-sm font-medium">Total Students</p>
          </div>

          {/* Card 2 - Medicines */}
          <div className="bg-white rounded-2xl p-6 shadow-sm shadow-red-500/5 border border-red-50 hover:shadow-md hover:shadow-red-500/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#C41E3A]/10 to-[#E63946]/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#C41E3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <span className="text-gray-400 text-sm font-semibold">In Stock</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">342</h3>
            <p className="text-gray-500 text-sm font-medium">Medicines Available</p>
          </div>

          {/* Card 3 - Alerts */}
          <div className="bg-white rounded-2xl p-6 shadow-sm shadow-red-500/5 border border-red-50 hover:shadow-md hover:shadow-red-500/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <span className="text-red-500 text-sm font-semibold">Active</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">8</h3>
            <p className="text-gray-500 text-sm font-medium">Active Alerts</p>
          </div>

          {/* Card 4 - Growth */}
          <div className="bg-white rounded-2xl p-6 shadow-sm shadow-red-500/5 border border-red-50 hover:shadow-md hover:shadow-red-500/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="text-green-500 text-sm font-semibold">This Month</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">+12%</h3>
            <p className="text-gray-500 text-sm font-medium">Clinic Visits Growth</p>
          </div>
        </div>

        {/* Recent Clinic Visits */}
        <div className="bg-white rounded-2xl p-6 shadow-sm shadow-red-500/5 border border-red-50 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Clinic Visits</h2>
            <button className="text-[#C41E3A] font-semibold text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Student Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Grade & Section</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Complaint</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-[#C41E3A] font-bold">
                        JD
                      </div>
                      <span className="font-medium text-gray-800">Juan Dela Cruz</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">Grade 12-A</td>
                  <td className="py-4 px-4 text-gray-600">Headache</td>
                  <td className="py-4 px-4 text-gray-600">10:30 AM</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Treated
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-[#C41E3A] font-bold">
                        MS
                      </div>
                      <span className="font-medium text-gray-800">Maria Santos</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">Grade 11-B</td>
                  <td className="py-4 px-4 text-gray-600">Fever</td>
                  <td className="py-4 px-4 text-gray-600">11:45 AM</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                      In Progress
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-[#C41E3A] font-bold">
                        PR
                      </div>
                      <span className="font-medium text-gray-800">Pedro Reyes</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">Grade 10-C</td>
                  <td className="py-4 px-4 text-gray-600">Stomach Pain</td>
                  <td className="py-4 px-4 text-gray-600">1:20 PM</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Treated
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Low Stock Alerts */}
          <div className="bg-white rounded-2xl p-6 shadow-sm shadow-red-500/5 border border-red-50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Low Stock Alerts</h2>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">3 Alerts</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Paracetamol 500mg</h3>
                  <p className="text-sm text-gray-600">Only 45 tablets remaining. Restock needed.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Betadine Solution</h3>
                  <p className="text-sm text-gray-600">Expiring in 15 days.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">Alcohol 70%</h3>
                  <p className="text-sm text-gray-600">Only 3 bottles left in stock.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Common Health Issues Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm shadow-red-500/5 border border-red-50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Common Health Issues</h2>
              <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600">
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="space-y-4">
              {/* Headache */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Headache</span>
                  <span className="text-sm font-bold text-[#C41E3A]">156</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-gradient-to-r from-[#C41E3A] to-[#E63946] h-3 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>

              {/* Fever */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Fever</span>
                  <span className="text-sm font-bold text-[#C41E3A]">124</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-gradient-to-r from-[#C41E3A] to-[#E63946] h-3 rounded-full" style={{width: '68%'}}></div>
                </div>
              </div>

              {/* Stomach Pain */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Stomach Pain</span>
                  <span className="text-sm font-bold text-[#C41E3A]">98</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-gradient-to-r from-[#C41E3A] to-[#E63946] h-3 rounded-full" style={{width: '53%'}}></div>
                </div>
              </div>

              {/* Injury */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Minor Injuries</span>
                  <span className="text-sm font-bold text-[#C41E3A]">76</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-gradient-to-r from-[#C41E3A] to-[#E63946] h-3 rounded-full" style={{width: '41%'}}></div>
                </div>
              </div>

              {/* Cough */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Cough/Cold</span>
                  <span className="text-sm font-bold text-[#C41E3A]">62</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-gradient-to-r from-[#C41E3A] to-[#E63946] h-3 rounded-full" style={{width: '34%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

## 👥 PAGE 3: STUDENTS LIST

### Visual Mockup
```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Sidebar Navigation]                                                     │
├──────────┬──────────────────────────────────────────────────────────────┤
│          │  👥 Students Management                                       │
│          │                                                               │
│          │  [Search Students...] 🔍   [Grade ▼] [Section ▼] [+ Add]   │
│          │                                                               │
│          │  ┌─────────────────────────────────────────────────────────┐ │
│          │  │ Photo | Name           | ID      | Grade | Section | ⚙ ││
│          │  ├───────────────────────────────────────────────────────────┤
│          │  │ [👤] | Juan Dela Cruz  | 2024001 | 12    | A      | ⋮ ││
│          │  │ [👤] | Maria Santos    | 2024002 | 11    | B      | ⋮ ││
│          │  │ [👤] | Pedro Reyes     | 2024003 | 10    | C      | ⋮ ││
│          │  │ [👤] | Ana Garcia      | 2024004 | 12    | A      | ⋮ ││
│          │  │ [👤] | Jose Cruz       | 2024005 | 11    | A      | ⋮ ││
│          │  └─────────────────────────────────────────────────────────┘ │
│          │                                                               │
│          │  [< Previous]  Page 1 of 42  [Next >]                       │
└──────────┴──────────────────────────────────────────────────────────────┘
```

### Implementation Code

```jsx
// app/students/page.tsx
export default function StudentsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (same as dashboard) */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        {/* ... sidebar content ... */}
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Students Management</h1>
            <p className="text-gray-500 mt-1">Manage student records and information</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Student
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm shadow-red-500/5 border border-red-50 mb-6">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, student ID..."
                  className="w-full px-4 py-3 pl-12 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Grade Filter */}
            <select className="px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:bg-white transition-all outline-none font-medium text-gray-700">
              <option>All Grades</option>
              <option>Grade 7</option>
              <option>Grade 8</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>

            {/* Section Filter */}
            <select className="px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:bg-white transition-all outline-none font-medium text-gray-700">
              <option>All Sections</option>
              <option>Section A</option>
              <option>Section B</option>
              <option>Section C</option>
              <option>Section D</option>
            </select>

            {/* Export Button */}
            <button className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-[#C41E3A] hover:text-[#C41E3A] hover:bg-red-50 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl shadow-sm shadow-red-500/5 border border-red-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#C41E3A] focus:ring-[#C41E3A]" />
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Student</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Student ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Grade & Section</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Contact</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Row 1 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#C41E3A] focus:ring-[#C41E3A]" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#C41E3A] to-[#E63946] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        JD
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Juan Dela Cruz</p>
                        <p className="text-sm text-gray-500">Male</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700 font-medium">2024001</td>
                  <td className="py-4 px-6 text-gray-700">Grade 12-A</td>
                  <td className="py-4 px-6 text-gray-600 text-sm">09171234567</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Active</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-yellow-50 rounded-lg transition-colors" title="Edit">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#C41E3A] focus:ring-[#C41E3A]" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#C41E3A] to-[#E63946] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        MS
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Maria Santos</p>
                        <p className="text-sm text-gray-500">Female</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700 font-medium">2024002</td>
                  <td className="py-4 px-6 text-gray-700">Grade 11-B</td>
                  <td className="py-4 px-6 text-gray-600 text-sm">09181234567</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Active</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-yellow-50 rounded-lg transition-colors" title="Edit">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Additional rows would follow the same pattern */}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-800">1-10</span> of <span className="font-semibold text-gray-800">1,248</span> students
            </p>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white rounded-lg font-medium">
                1
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                3
              </button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                42
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

## 📝 PAGE 4: STUDENT REGISTRATION FORM

### Visual Mockup
```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Sidebar]                                                                │
├──────────┬──────────────────────────────────────────────────────────────┤
│          │  ➕ Add New Student                                           │
│          │                                                               │
│          │  ① Personal Info  ② Contact  ③ Medical  ④ Review            │
│          │  ━━━━━━━━━━━━━━━  ─────────  ─────────  ───────            │
│          │                                                               │
│          │  Personal Information                                        │
│          │  ┌────────────────────────────────────────────────────────┐  │
│          │  │  First Name *          Middle Name                     │  │
│          │  │  [_____________]       [_____________]                 │  │
│          │  │                                                         │  │
│          │  │  Last Name *           Suffix                          │  │
│          │  │  [_____________]       [___]                           │  │
│          │  │                                                         │  │
│          │  │  Date of Birth *       Gender *                        │  │
│          │  │  [___/___/____]        ○ Male  ○ Female                │  │
│          │  │                                                         │  │
│          │  │  Grade Level *         Section *                       │  │
│          │  │  [Grade 12 ▼]         [Section A ▼]                   │  │
│          │  │                                                         │  │
│          │  │  LRN (Learner Reference Number) *                      │  │
│          │  │  [________________________]                            │  │
│          │  └────────────────────────────────────────────────────────┘  │
│          │                                                               │
│          │  [Cancel]                                      [Next Step →] │
└──────────┴──────────────────────────────────────────────────────────────┘
```

### Implementation Code

```jsx
// app/students/add/page.tsx
'use client';

import { useState } from 'react';

export default function AddStudentPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        {/* ... sidebar content ... */}
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Student</h1>
          <p className="text-gray-500">Fill in the student information below</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl p-6 shadow-sm shadow-red-500/5 border border-red-50 mb-6">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {/* Step 1 */}
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step === 1 
                  ? 'bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Personal Info</p>
                <p className="text-xs text-gray-500">Basic details</p>
              </div>
            </div>
            <div className={`h-0.5 w-full ${step > 1 ? 'bg-[#C41E3A]' : 'bg-gray-200'}`}></div>

            {/* Step 2 */}
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step === 2 
                  ? 'bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white' 
                  : step > 2 
                  ? 'bg-[#C41E3A] text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Contact</p>
                <p className="text-xs text-gray-500">Address & phone</p>
              </div>
            </div>
            <div className={`h-0.5 w-full ${step > 2 ? 'bg-[#C41E3A]' : 'bg-gray-200'}`}></div>

            {/* Step 3 */}
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step === 3 
                  ? 'bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white' 
                  : step > 3 
                  ? 'bg-[#C41E3A] text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Medical</p>
                <p className="text-xs text-gray-500">Health info</p>
              </div>
            </div>
            <div className={`h-0.5 w-full ${step > 3 ? 'bg-[#C41E3A]' : 'bg-gray-200'}`}></div>

            {/* Step 4 */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step === 4 
                  ? 'bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                4
              </div>
              <div>
                <p className="font-semibold text-gray-800">Review</p>
                <p className="text-xs text-gray-500">Confirm details</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl p-8 shadow-sm shadow-red-500/5 border border-red-50 max-w-4xl mx-auto">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
              <form className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Juan"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      placeholder="Santos"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Dela Cruz"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Suffix
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none">
                      <option value="">None</option>
                      <option>Jr.</option>
                      <option>Sr.</option>
                      <option>II</option>
                      <option>III</option>
                    </select>
                  </div>
                </div>

                {/* Date of Birth and Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Age will be calculated automatically</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-4 mt-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="gender" value="male" className="w-4 h-4 text-[#C41E3A] focus:ring-[#C41E3A]" />
                        <span className="font-medium text-gray-700">Male</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="gender" value="female" className="w-4 h-4 text-[#C41E3A] focus:ring-[#C41E3A]" />
                        <span className="font-medium text-gray-700">Female</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Grade and Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Grade Level <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none">
                      <option value="">Select Grade</option>
                      <option>Grade 7</option>
                      <option>Grade 8</option>
                      <option>Grade 9</option>
                      <option>Grade 10</option>
                      <option>Grade 11</option>
                      <option>Grade 12</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Section <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none">
                      <option value="">Select Section</option>
                      <option>Section A</option>
                      <option>Section B</option>
                      <option>Section C</option>
                      <option>Section D</option>
                    </select>
                  </div>
                </div>

                {/* LRN */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    LRN (Learner Reference Number) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="123456789012"
                    maxLength={12}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 transition-all outline-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">12-digit unique identifier</p>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-3 bg-gradient-to-r from-[#C41E3A] to-[#E63946] text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                  >
                    Next Step
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2, 3, 4 would follow similar patterns */}
        </div>
      </main>
    </div>
  );
}
```

---

Due to character limits, I'll continue this comprehensive document in the next part. Would you like me to continue with:

1. **Medicine Inventory Page** mockup
2. **Medical Records Page** mockup  
3. **Reports Page** mockup
4. **Complete Development Timeline with revised system name**
5. **Database Schema for school clinic**
6. **Full implementation guide**
/