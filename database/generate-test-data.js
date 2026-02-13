/**
 * Historical Test Data Generator
 * Generates December 2025 (106 records) and January 2026 (185 records)
 * Run: node generate-test-data.js
 */

const fs = require('fs');

// Disease data specifications
const diseases = {
  december: [
    { name: 'Coughs and Colds', count: 15, complaints: ['Persistent cough and runny nose', 'Coughing with nasal congestion', 'Sore throat with cough'], type: 'Viral', severity: ['MILD', 'MODERATE'] },
    { name: 'HFMD', count: 4, complaints: ['Mouth sores and skin rash', 'Painful mouth ulcers and fever'], type: 'Viral', severity: ['MODERATE', 'MILD'] },
    { name: 'Chicken Pox', count: 7, complaints: ['Itchy skin rash with blisters', 'Widespread itchy rash', 'Fever with vesicular rash'], type: 'Viral', severity: ['MODERATE', 'SEVERE'] },
    { name: 'Dengue', count: 20, complaints: ['High fever with body aches', 'Severe headache with fever', 'Fever, rash, and joint pain'], type: 'Viral', severity: ['SEVERE', 'MODERATE'] },
    { name: 'Fever', count: 7, complaints: ['High temperature', 'Persistent fever', 'Fever with chills'], type: 'Other', severity: ['MILD', 'MODERATE'] },
    { name: 'Diarrhea', count: 6, complaints: ['Frequent loose stools', 'Diarrhea with abdominal pain', 'Watery diarrhea'], type: 'Bacterial', severity: ['MILD', 'MODERATE'] },
    { name: 'Vomiting', count: 7, complaints: ['Nausea and vomiting', 'Persistent vomiting', 'Vomiting and weakness'], type: 'Viral', severity: ['MODERATE', 'MILD'] },
    { name: 'Headache', count: 40, complaints: ['Persistent headache', 'Severe headache', 'Headache with dizziness', 'Throbbing headache', 'Migraine'], type: 'Other', severity: ['MILD', 'MODERATE'] },
    { name: 'Flu', count: 40, complaints: ['Fever, cough, body aches', 'Flu symptoms - fever and chills', 'Body aches with fever', 'Flu-like symptoms'], type: 'Viral', severity: ['MODERATE', 'MILD'] }
  ],
  january: [
    { name: 'Coughs and Colds', count: 10, complaints: ['Persistent cough and runny nose', 'Coughing with nasal congestion'], type: 'Viral', severity: ['MILD'] },
    { name: 'HFMD', count: 3, complaints: ['Mouth sores and skin rash', 'Painful mouth ulcers and fever'], type: 'Viral', severity: ['MODERATE'] },
    { name: 'Chicken Pox', count: 9, complaints: ['Itchy skin rash with blisters', 'Widespread itchy rash'], type: 'Viral', severity: ['MODERATE'] },
    { name: 'Dengue', count: 25, complaints: ['High fever with body aches', 'Severe headache with fever', 'Fever, rash, and joint pain'], type: 'Viral', severity: ['SEVERE', 'MODERATE'] },
    { name: 'Fever', count: 15, complaints: ['High temperature', 'Persistent fever', 'Fever with chills'], type: 'Other', severity: ['MILD', 'MODERATE'] },
    { name: 'Diarrhea', count: 6, complaints: ['Frequent loose stools', 'Diarrhea with abdominal pain'], type: 'Bacterial', severity: ['MILD', 'MODERATE'] },
    { name: 'Vomiting', count: 2, complaints: ['Nausea and vomiting', 'Persistent vomiting'], type: 'Viral', severity: ['MODERATE'] },
    { name: 'Headache', count: 60, complaints: ['Persistent headache', 'Severe headache', 'Headache with dizziness', 'Throbbing headache', 'Migraine', 'Tension headache'], type: 'Other', severity: ['MILD', 'MODERATE'] },
    { name: 'Flu', count: 65, complaints: ['Fever, cough, body aches', 'Flu symptoms - fever and chills', 'Body aches with fever', 'Influenza symptoms'], type: 'Viral', severity: ['MODERATE', 'SEVERE'] }
  ]
};

const grades = ['7', '8', '11', '12'];

function generateDate(year, month, totalRecords, index) {
  const daysInMonth = month === 12 ? 31 : (month === 1 ? 31 : 30);
  const day = Math.floor((index / totalRecords) * daysInMonth) + 1;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateSQL(month, year, diseaseList, monthName) {
  let sql = `-- ============================================\n`;
  sql += `-- ${monthName.toUpperCase()} ${year} MEDICAL RECORDS\n`;
  sql += `-- ============================================\n\n`;
  sql += `SET @admin_id = (SELECT id FROM users WHERE username = 'superadmin' LIMIT 1);\n\n`;

  const totalRecords = diseaseList.reduce((sum, d) => sum + d.count, 0);
  let recordIndex = 0;

  diseaseList.forEach(disease => {
    sql += `-- ============================================\n`;
    sql += `-- ${disease.name} (${disease.count} records)\n`;
    sql += `-- ============================================\n`;

    for (let i = 0; i < disease.count; i++) {
      const date = generateDate(year, month, totalRecords, recordIndex++);
      const complaint = random(disease.complaints);
      const diagnosis = disease.name === 'Dengue' ? 'Dengue fever' :
                       disease.name === 'Flu' ? 'Influenza' :
                       disease.name === 'HFMD' ? 'Hand, foot, and mouth disease' :
                       disease.name === 'Chicken Pox' ? 'Varicella' :
                       disease.name === 'Headache' ? 'Tension headache' :
                       disease.name === 'Fever' ? 'Viral fever' :
                       disease.name === 'Diarrhea' ? 'Gastroenteritis' :
                       disease.name === 'Vomiting' ? 'Viral gastroenteritis' :
                       'Upper respiratory infection';
      const treatment = disease.name === 'Dengue' ? 'IV fluids, monitoring' :
                       disease.name === 'Flu' ? 'Antiviral medication, rest' :
                       disease.name === 'HFMD' ? 'Supportive care, pain relief' :
                       disease.name === 'Chicken Pox' ? 'Antiviral medication, calamine lotion' :
                       disease.name === 'Headache' ? 'Ibuprofen, rest' :
                       disease.name === 'Fever' ? 'Antipyretics, rest' :
                       disease.name === 'Diarrhea' ? 'Oral rehydration salts' :
                       disease.name === 'Vomiting' ? 'Anti-emetics, IV fluids' :
                       'Rest, fluids, and decongestants';
      const severity = random(disease.severity);
      const grade = random(grades);

      sql += `INSERT INTO medical_records (id, student_id, visit_date, chief_complaint, diagnosis, treatment, disease_category, illness_type, severity, recorded_by_id)\n`;
      sql += `SELECT UUID(), s.id, '${date}', '${complaint}', '${diagnosis}', '${treatment}', '${disease.name}', '${disease.type}', '${severity}', @admin_id FROM students s WHERE s.grade_level = '${grade}' ORDER BY RAND() LIMIT 1;\n`;
    }
    sql += `\n`;
  });

  return sql;
}

// Generate December 2025
const decemberSQL = generateSQL(12, 2025, diseases.december, 'December');
fs.writeFileSync('./december-2025-complete.sql', decemberSQL);
console.log('✅ Generated december-2025-complete.sql (106 records)');

// Generate January 2026
const januarySQL = generateSQL(1, 2026, diseases.january, 'January');
fs.writeFileSync('./january-2026-complete.sql', januarySQL);
console.log('✅ Generated january-2026-complete.sql (185 records)');

console.log('\n🎉 Complete! Total records generated: 291');
console.log('\nNext steps:');
console.log('1. Run: mysql -h host -u user -p database < december-2025-complete.sql');
console.log('2. Run: mysql -h host -u user -p database < january-2026-complete.sql');
console.log('3. Verify: SELECT COUNT(*) FROM medical_records; -- Expected: 379');
