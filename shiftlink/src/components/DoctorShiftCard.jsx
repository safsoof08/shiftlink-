import { hospitals } from '../data/mockData'
import { formatDate, isUrgent } from '../utils'

export default function DoctorShiftCard({ shift, applied, onApply }) {
  const hospital = hospitals.find(h => h.id === shift.hospitalId)
  const urgent = shift.status === 'open' && isUrgent(shift.date)

  return (
    <div className="shift-card">
      <div className="shift-top">
        <div>
          <div className="shift-specialty">{shift.specialty}</div>
          <div className="shift-meta">
            <span>🏥 {hospital?.name}</span>
            <span>📅 {formatDate(shift.date)}</span>
            <span>🕐 {shift.startTime}–{shift.endTime}</span>
          </div>
        </div>
        <div className="pay-tag">
          {shift.payRate.toLocaleString()} EGP
          <small>per shift</small>
        </div>
      </div>

      <div className="requirements">{shift.requirements}</div>

      <div className="shift-actions">
        {urgent ? <span className="badge urgent">Urgent</span> : <span />}
        {applied ? (
          <button className="btn btn-ghost btn-sm" disabled>Applied</button>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={() => onApply(shift.id)}>Apply</button>
        )}
      </div>
    </div>
  )
}
