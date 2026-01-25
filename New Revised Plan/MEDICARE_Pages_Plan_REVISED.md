# MEDICARE - Complete Pages Plan (Based on FEATURES-2.0)
## UI/UX Specifications for School Clinic System

---

## 📋 Table of Contents
1. [Design System](#design-system)
2. [Page Structure Overview](#page-structure-overview)
3. [Login Page](#login-page)
4. [Admin Dashboard (School Wide)](#admin-dashboard-school-wide)
5. [Grade Level View](#grade-level-view)
6. [Patient Table](#patient-table)
7. [Individual Patient Page](#individual-patient-page)
8. [Registration Page](#registration-page)
9. [Statistics Dashboard](#statistics-dashboard)

---

## 🎨 Design System

### Color Palette (From Logo)
```css
/* Primary Reds */
--primary-red: #C41E3A;
--bright-red: #E63946;
--dark-red: #8B1A2E;

/* Supporting */
--rose: #E57373;
--red-tint-light: #FFF5F6;
--red-tint-medium: #FFEBEE;

/* Neutrals */
--white: #FFFFFF;
--off-white: #FAFAFA;
--light-gray: #F5F5F5;
--medium-gray: #90A4AE;
--dark-gray: #263238;
```

### Typography
- **Font Family:** Inter, Segoe UI, sans-serif
- **Sizes:** 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px
- **Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

---

## 📐 Page Structure Overview

```
MEDICARE System Pages (Based on FEATURES-2.0)
├── Login Page
├── Admin Dashboard
│   ├── School Wide View
│   │   ├── Total Students Card
│   │   └── Grade Level Cards (7-12)
│   └── Grade Level View
│       ├── Total Students per Grade
│       └── Section Cards
├── Patient Management
│   ├── Patient Table (with Search)
│   └── Individual Patient
│       ├── Personal Info
│       ├── Medical Info
│       └── Record Section
├── Registration
│   └── New Student Form
└── Statistics Dashboard
    ├── Disease Charts (Pie, Line, Bar)
    └── Time Period Filters
```

---

## 🔐 PAGE 1: LOGIN PAGE

### Visual Mockup
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                   [MEDICARE Logo]                        │
│                                                          │
│         Medical Data and Information Community           │
│                  Alert Response Engine                   │
│                                                          │
│     ┌────────────────────────────────────────┐          │
│     │                                        │          │
│     │    Username                            │          │
│     │    [___________________________]       │          │
│     │                                        │          │
│     │    Password                            │          │
│     │    [___________________________]       │          │
│     │                                        │          │
│     │              [Login Button]            │          │
│     │                                        │          │
│     └────────────────────────────────────────┘          │
│                                                          │
│  Note: Login required every time you open your account   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Implementation
```typescript
// src/app/login/page.tsx
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF5F6] to-white">
      <div className="w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-[#C41E3A] to-[#E63946] rounded-full flex items-center justify-center">
            <span className="text-white text-4xl font-bold">M</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C41E3A] to-[#E63946] bg-clip-text text-transparent">
            MEDICARE
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Medical Data and Information Community<br />
            Alert Response Engine
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl shadow-red-500/10 p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl 
                         focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 
                         transition-all outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl 
                         focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 
                         transition-all outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#C41E3A] to-[#E63946] 
                       text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 
                       hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-6">
            Note: Login required every time you open your account
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## 📊 PAGE 2: ADMIN DASHBOARD (SCHOOL WIDE)

### Visual Mockup
```
┌────────────────────────────────────────────────────────────────┐
│  MEDICARE    [Dashboard] [Patients] [Registration] [Stats]    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  School Wide Dashboard                                         │
│                                                                │
│  ┌──────────────────────────────────────────────────┐         │
│  │  Total Registered Students                       │         │
│  │                                                   │         │
│  │              1,234                                │         │
│  │                                                   │         │
│  └──────────────────────────────────────────────────┘         │
│                                                                │
│  Grade Levels                                                  │
│                                                                │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐       │
│  │  7  │  │  8  │  │  9  │  │ 10  │  │ 11  │  │ 12  │       │
│  │     │  │     │  │     │  │     │  │     │  │     │       │
│  │ 215 │  │ 203 │  │ 198 │  │ 210 │  │ 201 │  │ 207 │       │
│  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘       │
│                                                                │
│  Click on a grade level to view sections                       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Implementation
```typescript
// src/app/(protected)/dashboard/page.tsx
export default function SchoolWideDashboard() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-[#C41E3A]">MEDICARE</h1>
            <div className="flex gap-4">
              <a href="/dashboard" className="text-[#C41E3A] font-semibold">Dashboard</a>
              <a href="/patients" className="text-gray-600 hover:text-[#C41E3A]">Patients</a>
              <a href="/registration" className="text-gray-600 hover:text-[#C41E3A]">Registration</a>
              <a href="/statistics" className="text-gray-600 hover:text-[#C41E3A]">Statistics</a>
            </div>
          </div>
          <button className="text-gray-600 hover:text-[#C41E3A]">Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          School Wide Dashboard
        </h2>

        {/* Total Students Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-8 mb-8">
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">Total Registered Students</p>
            <div className="text-7xl font-bold bg-gradient-to-r from-[#C41E3A] to-[#E63946] bg-clip-text text-transparent">
              1,234
            </div>
          </div>
        </div>

        {/* Grade Level Cards */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Grade Levels</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['7', '8', '9', '10', '11', '12'].map((grade) => (
              <div
                key={grade}
                className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-6 
                         cursor-pointer hover:shadow-xl hover:-translate-y-2 
                         transition-all duration-300"
                onClick={() => window.location.href = `/dashboard/grade/${grade}`}
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full 
                              bg-gradient-to-r from-[#C41E3A] to-[#E63946] 
                              flex items-center justify-center shadow-lg shadow-red-500/30">
                    <span className="text-4xl font-bold text-white">{grade}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">
                    {Math.floor(Math.random() * 50) + 180}
                  </div>
                  <div className="text-sm text-gray-500">Students</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-6">
            Click on a grade level to view sections
          </p>
        </div>
      </main>
    </div>
  );
}
```

---

## 📚 PAGE 3: GRADE LEVEL VIEW

### Visual Mockup
```
┌────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                                           │
│                                                                │
│  Grade 7 - Level Wide                                          │
│                                                                │
│  ┌──────────────────────────────────────────────────┐         │
│  │  Total Registered Students                       │         │
│  │                                                   │         │
│  │              215                                  │         │
│  │                                                   │         │
│  └──────────────────────────────────────────────────┘         │
│                                                                │
│  Sections                                                      │
│                                                                │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐             │
│  │Section │  │Section │  │Section │  │Section │             │
│  │   A    │  │   B    │  │   C    │  │   D    │             │
│  │        │  │        │  │        │  │        │             │
│  │   35   │  │   38   │  │   36   │  │   37   │             │
│  │patients│  │patients│  │patients│  │patients│             │
│  └────────┘  └────────┘  └────────┘  └────────┘             │
│                                                                │
│  ┌────────┐  ┌────────┐  ┌────────┐                          │
│  │Section │  │Section │  │Section │                          │
│  │   E    │  │   F    │  │   G    │                          │
│  │        │  │        │  │        │                          │
│  │   34   │  │   35   │  │   0    │                          │
│  │patients│  │patients│  │patients│                          │
│  └────────┘  └────────┘  └────────┘                          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Implementation
```typescript
// src/app/(protected)/dashboard/grade/[grade]/page.tsx
export default function GradeLevelView({ params }: { params: { grade: string } }) {
  const sections = [
    { name: 'A', count: 35 },
    { name: 'B', count: 38 },
    { name: 'C', count: 36 },
    { name: 'D', count: 37 },
    { name: 'E', count: 34 },
    { name: 'F', count: 35 },
    { name: 'G', count: 0 },
  ];

  const totalStudents = sections.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-[#C41E3A] mb-8"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Grade {params.grade} - Level Wide
      </h2>

      {/* Total Students Card */}
      <div className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-8 mb-8">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Total Registered Students</p>
          <div className="text-6xl font-bold bg-gradient-to-r from-[#C41E3A] to-[#E63946] bg-clip-text text-transparent">
            {totalStudents}
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Sections</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <div
              key={section.name}
              className="bg-white rounded-2xl shadow-lg shadow-red-500/5 p-6 
                       cursor-pointer hover:shadow-xl transition-all"
              onClick={() => window.location.href = `/students?grade=${params.grade}&section=${section.name}`}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFF5F6] 
                            flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#C41E3A]">
                    {section.name}
                  </span>
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-1">
                  {section.count}
                </div>
                <div className="text-sm text-gray-500">
                  Registered Patients
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 📋 PAGE 4: PATIENT TABLE

### Visual Mockup
```
┌────────────────────────────────────────────────────────────────┐
│  Patient Management                    [+ Register New Student]│
│                                                                │
│  ┌──────────────────────────────────────────────────┐         │
│  │  🔍 Search by name, grade, or section...         │         │
│  └──────────────────────────────────────────────────┘         │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Student Name        │ Grade & Section │ Actions          │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │ Cruz, Juan Santos   │ Grade 7 - A     │ [View Record]    │ │
│  │ Reyes, Maria Lopez  │ Grade 8 - B     │ [View Record]    │ │
│  │ Santos, Pedro Ramos │ Grade 9 - C     │ [View Record]    │ │
│  │ Garcia, Ana Torres  │ Grade 10 - D    │ [View Record]    │ │
│  │ ...                 │ ...             │ ...              │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  [Previous]                    Page 1 of 10             [Next] │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Implementation
```typescript
// src/app/(protected)/patients/page.tsx
export default function PatientsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Patient Management</h1>
          <button
            onClick={() => window.location.href = '/registration'}
            className="px-6 py-3 bg-gradient-to-r from-[#C41E3A] to-[#E63946] 
                     text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 
                     hover:shadow-xl hover:-translate-y-0.5 transition-all 
                     flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Register New Student
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, grade, or section..."
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 rounded-xl 
                       focus:border-[#C41E3A] focus:ring-4 focus:ring-red-50 
                       transition-all outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Patient Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#FFF5F6]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Student Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Grade Level and Section
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'Cruz, Juan Santos', grade: '7', section: 'A' },
                { name: 'Reyes, Maria Lopez', grade: '8', section: 'B' },
                { name: 'Santos, Pedro Ramos', grade: '9', section: 'C' },
                { name: 'Garcia, Ana Torres', grade: '10', section: 'D' },
              ].map((patient, index) => (
                <tr 
                  key={index}
                  className="hover:bg-[#FFF5F6] cursor-pointer transition-colors"
                  onClick={() => window.location.href = `/patients/${index}`}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    Grade {patient.grade} - {patient.section}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-4 py-2 border-2 border-gray-200 rounded-lg 
                                     hover:border-[#C41E3A] hover:bg-[#FFF5F6] 
                                     transition-all text-sm font-semibold">
                      View Record
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
            <button className="px-4 py-2 border-2 border-gray-200 rounded-lg 
                             hover:border-[#C41E3A] transition-all font-semibold">
              Previous
            </button>
            <span className="text-gray-600">Page 1 of 10</span>
            <button className="px-4 py-2 border-2 border-gray-200 rounded-lg 
                             hover:border-[#C41E3A] transition-all font-semibold">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 👤 PAGE 5: INDIVIDUAL PATIENT

### Visual Mockup
```
┌────────────────────────────────────────────────────────────────┐
│  ← Back to Patient List                                        │
│                                                                │
│  ┌──────────────┐  ┌────────────────────────────────────────┐ │
│  │              │  │ Name: Juan Santos Cruz                  │ │
│  │   [Photo]    │  │ Age: 13 years old                       │ │
│  │              │  │ Birthday: January 15, 2011              │ │
│  │  Placeholder │  │ Sex: Male                               │ │
│  │              │  │ Grade Level and Section: Grade 7 - A   │ │
│  └──────────────┘  │ LRN: 123456789012                       │ │
│                    │ Parents or Guardian Contact:            │ │
│  [Edit Info]       │   Maria Cruz - 09123456789              │ │
│                    │ Address: 123 Main St, Quezon City      │ │
│                    │ BMI: 18.5                               │ │
│                    │ Health History:                         │ │
│                    │   Asthma (diagnosed 2019)               │ │
│                    │   Allergies: None                       │ │
│                    └────────────────────────────────────────┘ │
│                                                                │
│  Medical Records                               [Add Record]    │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Jan 10, 2025 - Headache                                  │ │
│  │ Diagnosis: Tension headache                              │ │
│  │ Treatment: Rest, paracetamol                             │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │ Dec 15, 2024 - Cough and Cold                            │ │
│  │ Diagnosis: Upper respiratory infection                    │ │
│  │ Treatment: Antibiotics, rest                             │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Implementation
```typescript
// src/app/(protected)/patients/[id]/page.tsx
export default function IndividualPatientPage({ params }: { params: { id: string } }) {
  const patient = {
    name: 'Juan Santos Cruz',
    age: 13,
    birthday: 'January 15, 2011',
    sex: 'Male',
    gradeLevel: '7',
    section: 'A',
    lrn: '123456789012',
    guardian: 'Maria Cruz',
    guardianContact: '09123456789',
    address: '123 Main St, Quezon City',
    bmi: 18.5,
    healthHistory: 'Asthma (diagnosed 2019)\nAllergies: None',
  };

  const records = [
    {
      date: 'Jan 10, 2025',
      complaint: 'Headache',
      diagnosis: 'Tension headache',
      treatment: 'Rest, paracetamol',
    },
    {
      date: 'Dec 15, 2024',
      complaint: 'Cough and Cold',
      diagnosis: 'Upper respiratory infection',
      treatment: 'Antibiotics, rest',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-[#C41E3A] mb-8"
      >
        ← Back to Patient List
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Patient Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Photo Placeholder */}
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-[#C41E3A] to-[#E63946] 
                          flex items-center justify-center shadow-lg">
                <span className="text-5xl font-bold text-white">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>

            {/* Patient Details */}
            <div className="space-y-4 text-sm">
              <div>
                <div className="text-gray-500 font-medium">Name:</div>
                <div className="text-gray-800 font-semibold">{patient.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-500 font-medium">Age:</div>
                  <div className="text-gray-800 font-semibold">{patient.age} years old</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium">Sex:</div>
                  <div className="text-gray-800 font-semibold">{patient.sex}</div>
                </div>
              </div>

              <div>
                <div className="text-gray-500 font-medium">Birthday:</div>
                <div className="text-gray-800 font-semibold">{patient.birthday}</div>
              </div>

              <div>
                <div className="text-gray-500 font-medium">Grade Level and Section:</div>
                <div className="text-gray-800 font-semibold">
                  Grade {patient.gradeLevel} - {patient.section}
                </div>
              </div>

              <div>
                <div className="text-gray-500 font-medium">LRN:</div>
                <div className="text-gray-800 font-semibold font-mono">{patient.lrn}</div>
              </div>

              <div>
                <div className="text-gray-500 font-medium">Parents or Guardian Contact:</div>
                <div className="text-gray-800 font-semibold">{patient.guardian}</div>
                <div className="text-gray-600 text-xs">{patient.guardianContact}</div>
              </div>

              <div>
                <div className="text-gray-500 font-medium">Address:</div>
                <div className="text-gray-800 font-semibold">{patient.address}</div>
              </div>

              <div>
                <div className="text-gray-500 font-medium">BMI:</div>
                <div className="text-gray-800 font-semibold">{patient.bmi}</div>
              </div>

              <div>
                <div className="text-gray-500 font-medium">Health History:</div>
                <div className="text-gray-800 text-xs whitespace-pre-line">
                  {patient.healthHistory}
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-[#C41E3A] to-[#E63946] 
                           text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 
                           hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Edit Patient Info
            </button>
          </div>
        </div>

        {/* Right Column - Medical Records */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Medical Records</h2>
              <button className="px-4 py-2 bg-gradient-to-r from-[#C41E3A] to-[#E63946] 
                             text-white rounded-lg font-semibold shadow-lg shadow-red-500/30 
                             hover:shadow-xl transition-all">
                Add Record
              </button>
            </div>

            <div className="space-y-4">
              {records.map((record, index) => (
                <div key={index} className="border-l-4 border-[#C41E3A] bg-[#FFF5F6] p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold text-lg text-gray-800">
                      {record.complaint}
                    </div>
                    <div className="text-sm text-gray-500">{record.date}</div>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <div><span className="font-semibold">Diagnosis:</span> {record.diagnosis}</div>
                    <div><span className="font-semibold">Treatment:</span> {record.treatment}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 📝 PAGE 6: REGISTRATION PAGE

### Visual Mockup
```
┌────────────────────────────────────────────────────────────────┐
│  Registration - New Student                                    │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ Personal Information                                    │   │
│  │                                                         │   │
│  │ First Name: [_________________]                         │   │
│  │ Middle Name: [_________________]                        │   │
│  │ Last Name: [_________________]                          │   │
│  │                                                         │   │
│  │ Date of Birth: [__/__/____]    Sex: ( ) Male ( ) Female│   │
│  │ Age will be calculated automatically                    │   │
│  │                                                         │   │
│  │ Grade Level: [Select ▼]                                │   │
│  │ Section: [Select ▼]                                    │   │
│  │                                                         │   │
│  │ LRN (12 digits): [____________]                         │   │
│  │                                                         │   │
│  │ Parents or Guardian Information                         │   │
│  │ Name: [_________________]                               │   │
│  │ Contact: [_________________]                            │   │
│  │                                                         │   │
│  │ Address: [__________________________]                   │   │
│  │                                                         │   │
│  │ BMI: [____]                                             │   │
│  │                                                         │   │
│  │ Health History:                                         │   │
│  │ [_____________________________________________]          │   │
│  │ [_____________________________________________]          │   │
│  │                                                         │   │
│  │              [Cancel]  [Register Student]              │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Implementation
```typescript
// src/app/(protected)/registration/page.tsx
export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Registration - New Student
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl 
                             focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 
                             transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl 
                             focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 
                             transition-all outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl 
                           focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 
                           transition-all outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl 
                             focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 
                             transition-all outline-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Age will be calculated automatically</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sex <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-6 mt-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="sex" value="male" className="w-4 h-4" />
                      <span className="font-medium text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="sex" value="female" className="w-4 h-4" />
                      <span className="font-medium text-gray-700">Female</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Grade Level <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl 
                                   focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 
                                   transition-all outline-none">
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
                  <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl 
                                   focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 
                                   transition-all outline-none">
                    <option value="">Select Section</option>
                    <option>Section A</option>
                    <option>Section B</option>
                    <option>Section C</option>
                    <option>Section D</option>
                  </select>
                </div>
              </div>

              {/* LRN */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  LRN (Learner Reference Number) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={12}
                  placeholder="123456789012"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl 
                           focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 
                           transition-all outline-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">12-digit unique identifier</p>
              </div>
            </div>

            {/* Guardian Information */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Parents or Guardian Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl 
                             focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 
                             transition-all outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="09123456789"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl 
                             focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 
                             transition-all outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="pt-6 border-t border-gray-200">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl 
                           focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 
                           transition-all outline-none"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  BMI
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl 
                           focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 
                           transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Health History
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter any relevant health history, allergies, medications, etc."
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl 
                           focus:border-[#C41E3A] focus:bg-white focus:ring-4 focus:ring-red-50 
                           transition-all outline-none resize-none"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="px-8 py-3 border-2 border-gray-200 rounded-xl font-semibold 
                         text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#C41E3A] to-[#E63946] 
                         text-white rounded-xl font-semibold shadow-lg shadow-red-500/30 
                         hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                Register Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
```

---

## 📊 PAGE 7: STATISTICS DASHBOARD

### Visual Mockup
```
┌────────────────────────────────────────────────────────────────┐
│  Statistics Dashboard                    [Time Period: Month ▼]│
│                                                                │
│  Disease and Illness Statistics                                │
│                                                                │
│  ┌──────────────────┐  ┌──────────────────┐                   │
│  │                  │  │                  │                   │
│  │   Pie Chart      │  │   Bar Graph      │                   │
│  │   Distribution   │  │   By Category    │                   │
│  │                  │  │                  │                   │
│  └──────────────────┘  └──────────────────┘                   │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                                                          │ │
│  │                Line Graph                                │ │
│  │                Trend Over Time                           │ │
│  │                                                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  Case Summary                                                  │
│  • Flu: 15 cases (Past Month)                                 │
│  • Dengue: 3 cases (Past Month)                              │
│  • Headache: 20 cases (Past Month)                           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Key Features
- **Time Period Filtering:** Week, Month, Quarter, Year
- **Chart Types:** Pie, Bar, Line
- **Disease Categories:** Automatic categorization
- **Case Counts:** Real-time statistics
- **Date Ranges:** Flexible time period selection

---

## 🔔 Special Features

### 1. Alert System
- **Purpose:** Detect suspected outbreaks
- **Triggers:** When disease frequency reaches threshold
- **Notification:** Real-time alerts to Super Admin and Admin
- **Display:** Banner alerts, notification center

### 2. Duplicate Detection
- **Purpose:** Prevent duplicate student registrations
- **Detection:** Name + DOB + LRN matching
- **Notification:** Alert Super Admin and Admin
- **Resolution:** Manual review and merge options

---

## ✅ Page Implementation Checklist

### Core Pages (Required)
- [ ] Login Page (password required)
- [ ] Admin Dashboard - School Wide
- [ ] Admin Dashboard - Grade Level View
- [ ] Patient Table with Search
- [ ] Individual Patient Page
- [ ] Registration Form
- [ ] Statistics Dashboard

### Navigation
- [ ] Top navigation bar
- [ ] Quick action buttons
- [ ] Breadcrumbs
- [ ] Back buttons

### Components
- [ ] Search bar
- [ ] Data tables
- [ ] Forms
- [ ] Charts (Pie, Bar, Line)
- [ ] Cards
- [ ] Alerts/Notifications

---

*Last Updated: January 2026*  
*Version: 2.0 - Based on FEATURES-2.0 PDF*
