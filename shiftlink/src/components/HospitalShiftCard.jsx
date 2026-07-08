import { useState } from 'react'
import { doctors } from '../data/mockData'
import { formatDate, isUrgent, initials } from '../utils'
import { Stars, StarPicker } from './Stars'

export default function HospitalShiftCard({ shift, onConfirm, onRate }) {
  const [expanded, setExpanded] = useState(false)
  const applicants = shift.applicants.map(id => doctors.find(d => d.id === id)).filter(Boolean)
  const confirmedDoctor = doctors.find(d => d.id === shift.confirmedDoctorId)
  const urgent = shift.status === 'open' && isUrgent(shift.date)

  return (
    <div className="shift-card">
      <div className="shift-top">
        <div>
          <div className="shift-specialty">{shift.specialty}</div>
          <div className="shift-meta">
            <span>📅 {formatDate(shift.date)}</span>
            <span>🕐 {shift.startTime}–{shift.endTime}</span>
            <span>👥 {applicants.length} applicant{applicants.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
        <div className="pay-tag">
          {shift.payRate.toLocaleString()} EGP
          <small>per shift</small>
        </div>
      </div>

      <div className="requirements">{shift.requirements}</div>

      <div className="shift-actions">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span className={`badge ${shift.status}`}>{shift.status}</span>
          {urgent && <span className="badge urgent">Urgent</span>}
        </div>
        {shift.status === 'open' && applicants.length > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Hide applicants' : 'Review applicants'}
          </button>
        )}
      </div>

      {shift.status === 'open' && expanded && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px dashed var(--border)' }}>
          {applicants.map(doc => (
            <div className="applicant-row" key={doc.id}>
              <div className="applicant-info">
                <div className="avatar">{initials(doc.name)}</div>
                <div>
                  <div className="applicant-name">{doc.name}</div>
                  <div className="applicant-sub">
                    {doc.licenseGrade} · {doc.yearsExp}y exp · <Stars value={doc.rating} />
                  </div>
                </div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => onConfirm(shift.id, doc.id)}>
                Confirm
              </button>
            </div>
          ))}
        </div>
      )}

      {(shift.status === 'confirmed' || shift.status === 'completed') && confirmedDoctor && (
        <div className="applicant-row" style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--border)' }}>
          <div className="applicant-info">
            <div className="avatar">{initials(confirmedDoctor.name)}</div>
            <div>
              <div className="applicant-name">{confirmedDoctor.name}</div>
              <div className="applicant-sub">Confirmed for this shift</div>
            </div>
          </div>
        </div>
      )}

      {shift.status === 'completed' && shift.doctorRating === null && (
        <div className="rate-row">
          <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>Rate {confirmedDoctor?.name.split(' ')[1]}:</span>
          <StarPicker value={0} onChange={(n) => onRate(shift.id, n)} />
        </div>
      )}

      {shift.status === 'completed' && shift.doctorRating !== null && (
        <div className="rated-note">You rated this doctor {shift.doctorRating}★</div>
      )}
    </div>
  )
}
