import { useState } from 'react'
import './styles.css'
import { initialShifts, currentDoctor, hospitals, doctors } from './data/mockData'
import { useLocalStorage } from './hooks/useLocalStorage'
import Header from './components/Header'
import ToastStack from './components/ToastStack'
import HospitalDashboard from './components/HospitalDashboard'
import DoctorDashboard from './components/DoctorDashboard'

let toastId = 0

export default function App() {
  const [role, setRole] = useState('hospital')
  const [shifts, setShifts] = useLocalStorage('shiftlink_shifts', initialShifts)
  const [toasts, setToasts] = useState([])

  const pushToast = (title, body) => {
    const id = ++toastId
    setToasts(t => [...t, { id, title, body }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }

  const handlePost = (form) => {
    const newShift = {
      id: `s${Date.now()}`,
      hospitalId: hospitals[0].id, // demo: always posting as current hospital
      specialty: form.specialty,
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      payRate: Number(form.payRate),
      requirements: form.requirements || 'No specific requirements listed.',
      status: 'open',
      applicants: [],
      confirmedDoctorId: null,
      doctorRating: null,
      hospitalRating: null,
    }
    setShifts(s => [newShift, ...s])
    pushToast('Shift posted', `${form.specialty} on ${form.date} is now live.`)
  }

  const handleApply = (shiftId) => {
    setShifts(s => s.map(sh =>
      sh.id === shiftId && !sh.applicants.includes(currentDoctor.id)
        ? { ...sh, applicants: [...sh.applicants, currentDoctor.id] }
        : sh
    ))
    const shift = shifts.find(s => s.id === shiftId)
    pushToast('Application sent', `You applied for ${shift?.specialty}. The hospital has been notified.`)
  }

  const handleConfirm = (shiftId, doctorId) => {
    setShifts(s => s.map(sh =>
      sh.id === shiftId ? { ...sh, status: 'confirmed', confirmedDoctorId: doctorId } : sh
    ))
    const doc = doctors.find(d => d.id === doctorId)
    pushToast('Doctor confirmed', `${doc?.name} has been notified and locked in for this shift.`)
  }

  const handleRateDoctor = (shiftId, rating) => {
    setShifts(s => s.map(sh =>
      sh.id === shiftId ? { ...sh, doctorRating: rating } : sh
    ))
  }

  const handleRateHospital = (shiftId, rating) => {
    setShifts(s => s.map(sh =>
      sh.id === shiftId ? { ...sh, hospitalRating: rating } : sh
    ))
  }

  return (
    <div className="app-shell">
      <ToastStack toasts={toasts} />
      <Header role={role} setRole={setRole} />
      {role === 'hospital' ? (
        <HospitalDashboard
          shifts={shifts}
          onPost={handlePost}
          onConfirm={handleConfirm}
          onRate={handleRateDoctor}
        />
      ) : (
        <DoctorDashboard
          shifts={shifts}
          onApply={handleApply}
          onRateHospital={handleRateHospital}
        />
      )}
    </div>
  )
}
