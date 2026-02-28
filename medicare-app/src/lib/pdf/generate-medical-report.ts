import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import type { MedicalRecord, MedicalRecordWithStudent } from '@/types/medical-record';
import type { Student } from '@/types/student';

// Brand colors
const PRIMARY = '#C41E3A';
const LIGHT_PINK = '#FFF5F6';
const DARK_GRAY = '#374151';
const MEDIUM_GRAY = '#6B7280';

// Severity colors
const SEVERITY_COLORS: Record<string, { bg: string; text: string }> = {
  MILD: { bg: '#DCFCE7', text: '#166534' },
  MODERATE: { bg: '#FEF3C7', text: '#92400E' },
  SEVERE: { bg: '#FEE2E2', text: '#991B1B' },
};

// Margins
const MARGIN = 15;

function drawHeader(doc: jsPDF): number {
  let y = MARGIN;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(PRIMARY);
  doc.text('MED-Alert', MARGIN, y + 7);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(MEDIUM_GRAY);
  doc.text('Medical Data & Information Community Alert Response Engine', MARGIN, y + 14);
  doc.text('School Clinic Medical Report', MARGIN, y + 20);

  // Generation timestamp - right aligned
  const pageWidth = doc.internal.pageSize.getWidth();
  const timestamp = `Generated: ${format(new Date(), 'MMMM dd, yyyy \'at\' h:mm a')}`;
  doc.setFontSize(8);
  doc.text(timestamp, pageWidth - MARGIN, y + 7, { align: 'right' });

  // Red separator line
  y += 25;
  doc.setDrawColor(PRIMARY);
  doc.setLineWidth(0.8);
  doc.line(MARGIN, y, pageWidth - MARGIN, y);

  return y + 8;
}

function drawFooter(doc: jsPDF): void {
  const pageCount = doc.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(MEDIUM_GRAY);

    // Page number - left
    doc.text(`Page ${i} of ${pageCount}`, MARGIN, pageHeight - 10);

    // Confidentiality note - right
    doc.text('CONFIDENTIAL - For clinic use only', pageWidth - MARGIN, pageHeight - 10, {
      align: 'right',
    });

    // Thin separator line above footer
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, pageHeight - 15, pageWidth - MARGIN, pageHeight - 15);
  }
}

function drawPatientInfo(doc: jsPDF, patient: Student, startY: number): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - MARGIN * 2;
  let y = startY;

  // Section label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(DARK_GRAY);
  doc.text('Patient Information', MARGIN, y);
  y += 6;

  // Info box background
  const boxHeight = 28;
  doc.setFillColor(249, 250, 251); // gray-50
  doc.roundedRect(MARGIN, y, contentWidth, boxHeight, 2, 2, 'F');

  y += 6;
  const col1X = MARGIN + 5;
  const col2X = pageWidth / 2 + 5;

  doc.setFontSize(9);

  // Row 1
  drawInfoField(doc, 'Patient', formatStudentName(patient), col1X, y);
  drawInfoField(doc, 'Student #', patient.studentNumber, col2X, y);
  y += 7;

  // Row 2
  drawInfoField(doc, 'Grade & Section', `Grade ${patient.gradeLevel} - Section ${patient.section}`, col1X, y);
  drawInfoField(doc, 'LRN', patient.lrn, col2X, y);
  y += 7;

  // Row 3
  const dobFormatted = format(new Date(patient.dateOfBirth), 'MMMM dd, yyyy');
  drawInfoField(doc, 'Date of Birth', `${dobFormatted}  |  Age: ${patient.age}  |  Sex: ${patient.sex}`, col1X, y);
  y += 7;

  return startY + boxHeight + 14;
}

function drawInfoField(doc: jsPDF, label: string, value: string, x: number, y: number): void {
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(MEDIUM_GRAY);
  doc.text(`${label}: `, x, y);
  const labelWidth = doc.getTextWidth(`${label}: `);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(DARK_GRAY);
  doc.text(value, x + labelWidth, y);
}

function formatStudentName(patient: Student): string {
  const middle = patient.middleName ? ` ${patient.middleName.charAt(0)}.` : '';
  return `${patient.lastName}, ${patient.firstName}${middle}`;
}

function formatDate(dateStr: string): string {
  return format(new Date(dateStr), 'MMM dd, yyyy');
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9-_]/g, '_').replace(/_+/g, '_');
}

function buildRecordsTable(
  doc: jsPDF,
  records: MedicalRecord[],
  startY: number,
  includeStudentColumn: boolean = false,
  studentNames?: Map<string, string>
): void {
  const head = includeStudentColumn
    ? [['#', 'Student', 'Visit Date', 'Complaint', 'Diagnosis', 'Treatment', 'Category', 'Severity']]
    : [['#', 'Visit Date', 'Chief Complaint', 'Diagnosis', 'Treatment', 'Category', 'Severity']];

  const body = records.map((record, index) => {
    const row = [
      String(index + 1),
      ...(includeStudentColumn
        ? [studentNames?.get(record.studentId) ?? '—']
        : []),
      formatDate(record.visitDate),
      record.chiefComplaint,
      record.diagnosis || '—',
      record.treatment || '—',
      record.diseaseCategory || '—',
      record.severity,
    ];
    return row;
  });

  autoTable(doc, {
    head,
    body,
    startY,
    margin: { left: MARGIN, right: MARGIN },
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 3,
      lineColor: [220, 220, 220],
      lineWidth: 0.3,
      textColor: [55, 65, 81],
    },
    headStyles: {
      fillColor: PRIMARY,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
    },
    alternateRowStyles: {
      fillColor: LIGHT_PINK,
    },
    columnStyles: includeStudentColumn
      ? {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 30 },
          2: { cellWidth: 22 },
          7: { cellWidth: 20, halign: 'center' },
        }
      : {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 22 },
          6: { cellWidth: 20, halign: 'center' },
        },
    didParseCell(data) {
      // Color severity cells
      const sevColIndex = includeStudentColumn ? 7 : 6;
      if (data.section === 'body' && data.column.index === sevColIndex) {
        const severity = data.cell.raw as string;
        const colors = SEVERITY_COLORS[severity];
        if (colors) {
          data.cell.styles.fillColor = colors.bg;
          data.cell.styles.textColor = colors.text;
          data.cell.styles.fontStyle = 'bold';
        }
      }
    },
  });
}

function buildSingleRecordDetail(doc: jsPDF, record: MedicalRecord, startY: number): number {
  let y = startY;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - MARGIN * 2;

  // Section label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(DARK_GRAY);
  doc.text('Medical Record Details', MARGIN, y);
  y += 8;

  // Visit info section
  const fields: [string, string][] = [
    ['Visit Date', formatDate(record.visitDate)],
    ['Severity', record.severity],
    ['Chief Complaint', record.chiefComplaint],
    ['Diagnosis', record.diagnosis || 'N/A'],
    ['Treatment', record.treatment || 'N/A'],
    ['Disease Category', record.diseaseCategory || 'N/A'],
    ['Illness Type', record.illnessType || 'N/A'],
    ['Notes', record.notes || 'N/A'],
    ['Recorded By', record.recordedByName || 'N/A'],
    ['Record Date', formatDate(record.createdAt)],
  ];

  // Use autoTable for clean field display
  autoTable(doc, {
    body: fields.map(([label, value]) => [label, value]),
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    theme: 'plain',
    styles: {
      fontSize: 10,
      cellPadding: { top: 4, bottom: 4, left: 6, right: 6 },
      textColor: [55, 65, 81],
    },
    columnStyles: {
      0: {
        cellWidth: 45,
        fontStyle: 'bold',
        textColor: MEDIUM_GRAY,
        fillColor: [249, 250, 251],
      },
      1: { cellWidth: contentWidth - 45 },
    },
    didParseCell(data) {
      if (data.section === 'body' && data.column.index === 1 && data.row.index === 1) {
        // Severity row - color it
        const severity = data.cell.raw as string;
        const colors = SEVERITY_COLORS[severity];
        if (colors) {
          data.cell.styles.textColor = colors.text;
          data.cell.styles.fontStyle = 'bold';
        }
      }
    },
  });

  return y;
}

// ── Public API ──────────────────────────────────────────────────────────────────

export function downloadSingleRecordPdf(
  record: MedicalRecord | MedicalRecordWithStudent,
  patient?: Student
): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  let y = drawHeader(doc);

  // If we have patient info, draw it
  if (patient) {
    y = drawPatientInfo(doc, patient, y);
  } else if ('studentName' in record) {
    // MedicalRecordWithStudent - show minimal student info
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(DARK_GRAY);
    doc.text('Patient Information', MARGIN, y);
    y += 6;

    doc.setFontSize(9);
    drawInfoField(doc, 'Patient', record.studentName, MARGIN + 5, y);
    const col2X = doc.internal.pageSize.getWidth() / 2 + 5;
    drawInfoField(doc, 'Grade & Section', `Grade ${record.gradeLevel} - Section ${record.section}`, col2X, y);
    y += 12;
  }

  buildSingleRecordDetail(doc, record, y);

  drawFooter(doc);

  // Generate filename
  const nameStr = patient
    ? sanitizeFilename(`${patient.lastName}-${patient.firstName}`)
    : 'studentName' in record
      ? sanitizeFilename(record.studentName)
      : 'unknown';
  const dateStr = format(new Date(), 'yyyy-MM-dd');
  doc.save(`medical-record-${nameStr}-${dateStr}.pdf`);
}

export function downloadPatientReportPdf(patient: Student, records: MedicalRecord[]): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  let y = drawHeader(doc);
  y = drawPatientInfo(doc, patient, y);

  // Records summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(DARK_GRAY);
  doc.text(`Medical Records (${records.length})`, MARGIN, y);
  y += 6;

  if (records.length === 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(MEDIUM_GRAY);
    doc.text('No medical records found for this patient.', MARGIN, y);
  } else {
    buildRecordsTable(doc, records, y);
  }

  drawFooter(doc);

  const nameStr = sanitizeFilename(`${patient.lastName}-${patient.firstName}`);
  const dateStr = format(new Date(), 'yyyy-MM-dd');
  doc.save(`medical-report-${nameStr}-${dateStr}.pdf`);
}

export function downloadBulkRecordsPdf(records: MedicalRecordWithStudent[]): void {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  let y = drawHeader(doc);

  // Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(DARK_GRAY);
  doc.text(`Medical Records Export (${records.length} records)`, MARGIN, y);
  y += 6;

  // Build student name map
  const studentNames = new Map<string, string>();
  for (const record of records) {
    if (!studentNames.has(record.studentId)) {
      studentNames.set(record.studentId, record.studentName);
    }
  }

  buildRecordsTable(doc, records, y, true, studentNames);

  drawFooter(doc);

  const dateStr = format(new Date(), 'yyyy-MM-dd');
  doc.save(`medical-records-export-${dateStr}.pdf`);
}
