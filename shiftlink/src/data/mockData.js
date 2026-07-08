export const specialties = [
  'General Practice', 'Radiology', 'ICU / Critical Care', 'Surgery',
  'Emergency Medicine', 'Anesthesiology', 'Pediatrics', 'Cardiology'
]

export const hospitals = [
  { id: 'h1', name: 'Nile Medical Center', area: 'Zamalek, Cairo' },
  { id: 'h2', name: 'Al Salam International Hospital', area: 'Maadi, Cairo' },
  { id: 'h3', name: 'Delta Care Hospital', area: 'Sheikh Zayed, Giza' },
]

export const doctors = [
  { id: 'd1', name: 'Dr. Sarah El-Masry', specialty: 'ICU / Critical Care', licenseGrade: 'Consultant', yearsExp: 9, rating: 4.9, shiftsCompleted: 41 },
  { id: 'd2', name: 'Dr. Omar Hassan', specialty: 'Radiology', licenseGrade: 'Specialist', yearsExp: 5, rating: 4.7, shiftsCompleted: 23 },
  { id: 'd3', name: 'Dr. Mona Zaki', specialty: 'General Practice', licenseGrade: 'Specialist', yearsExp: 4, rating: 4.8, shiftsCompleted: 30 },
  { id: 'd4', name: 'Dr. Karim Adly', specialty: 'Surgery', licenseGrade: 'Consultant', yearsExp: 12, rating: 5.0, shiftsCompleted: 58 },
]

// current logged-in personas for the demo role switcher
export const currentDoctor = doctors[0]
export const currentHospital = hospitals[0]

const today = new Date()
const inDays = (n) => {
  const d = new Date(today)
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

export const initialShifts = [
  {
    id: 's1',
    hospitalId: 'h1',
    specialty: 'ICU / Critical Care',
    date: inDays(2),
    startTime: '19:00',
    endTime: '07:00',
    payRate: 1800,
    requirements: 'Consultant grade, 5+ years ICU experience',
    status: 'open',
    applicants: ['d1'],
    confirmedDoctorId: null,
    doctorRating: null,
    hospitalRating: null,
  },
  {
    id: 's2',
    hospitalId: 'h1',
    specialty: 'Radiology',
    date: inDays(-3),
    startTime: '08:00',
    endTime: '16:00',
    payRate: 1200,
    requirements: 'Specialist grade, CT + MRI reporting',
    status: 'completed',
    applicants: ['d2'],
    confirmedDoctorId: 'd2',
    doctorRating: 5,
    hospitalRating: 4,
  },
  {
    id: 's3',
    hospitalId: 'h2',
    specialty: 'General Practice',
    date: inDays(1),
    startTime: '09:00',
    endTime: '17:00',
    payRate: 900,
    requirements: 'Any grade, outpatient clinic coverage',
    status: 'open',
    applicants: [],
    confirmedDoctorId: null,
    doctorRating: null,
    hospitalRating: null,
  },
  {
    id: 's4',
    hospitalId: 'h3',
    specialty: 'Surgery',
    date: inDays(4),
    startTime: '07:00',
    endTime: '15:00',
    payRate: 2200,
    requirements: 'Consultant grade, general surgery on-call',
    status: 'open',
    applicants: ['d4'],
    confirmedDoctorId: null,
    doctorRating: null,
    hospitalRating: null,
  },
  {
    id: 's5',
    hospitalId: 'h2',
    specialty: 'ICU / Critical Care',
    date: inDays(-1),
    startTime: '19:00',
    endTime: '07:00',
    payRate: 1900,
    requirements: 'Consultant grade, ventilator management',
    status: 'confirmed',
    applicants: ['d1'],
    confirmedDoctorId: 'd1',
    doctorRating: null,
    hospitalRating: null,
  },
]
