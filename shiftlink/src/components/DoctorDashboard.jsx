import { useState } from 'react'
import { specialties, currentDoctor, hospitals } from '../data/mockData'
import DoctorShiftCard from './DoctorShiftCard'
import { formatDate } from '../utils'
import { StarPicker } from './Stars'

export default function DoctorDashboard({ shifts, onApply, onRateHospital }) {
  const [filter, setFilter] = useState('All')

  const openShifts = shifts.filter(s => s.status === 'open')
  const feed = filter === 'All' ? openShifts : openShifts.filter(s => s.specialty === filter)

  const myShifts = shifts
    .filter(s => s.applicants.includes(currentDoctor.id))
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="dashboard-grid">
      <div>
        <div className="section-title">
          Open shifts
          <span className="count">{feed.length} matching</span>
        </div>
        <div className="filters">
          {['All', ...specialties].map(s => (
            <button
              key={s}
              className={`filter-chip ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
        {feed.length === 0 ? (
          <div className="panel empty-state">No open shifts match this filter right now.</div>
        ) : (
          <div className="shift-list">
            {feed.map(s => (
              <DoctorShiftCard
                key={s.id}
                shift={s}
                applied={s.applicants.includes(currentDoctor.id)}
                onApply={onApply}
              />
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 28 }}>
        <div className="section-title">
          My applications
          <span className="count">{myShifts.length} total</span>
        </div>
        {myShifts.length === 0 ? (
          <div className="panel empty-state">You haven't applied to any shifts yet.</div>
        ) : (
          <div className="shift-list">
            {myShifts.map(s => {
              const hospital = hospitals.find(h => h.id === s.hospitalId)
              return (
                <div className="shift-card" key={s.id}>
                  <div className="shift-top">
                    <div>
                      <div className="shift-specialty">{s.specialty}</div>
                      <div className="shift-meta">
                        <span>🏥 {hospital?.name}</span>
                        <span>📅 {formatDate(s.date)}</span>
                      </div>
                    </div>
                    <span className={`badge ${s.status === 'open' ? 'pending' : s.status}`} style={s.status === 'open' ? { background: 'var(--surface-alt)', color: 'var(--ink-soft)' } : undefined}>
                      {s.status === 'open' ? 'pending' : s.status}
                    </span>
                  </div>
                  {s.status === 'completed' && s.hospitalRating === null && (
                    <div className="rate-row">
                      <span style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>Rate {hospital?.name}:</span>
                      <StarPicker value={0} onChange={(n) => onRateHospital(s.id, n)} />
                    </div>
                  )}
                  {s.status === 'completed' && s.hospitalRating !== null && (
                    <div className="rated-note">You rated this hospital {s.hospitalRating}★</div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
