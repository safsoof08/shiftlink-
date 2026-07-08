import { currentHospital } from '../data/mockData'
import PostShiftForm from './PostShiftForm'
import HospitalShiftCard from './HospitalShiftCard'

export default function HospitalDashboard({ shifts, onPost, onConfirm, onRate }) {
  const mine = shifts
    .filter(s => s.hospitalId === currentHospital.id)
    .sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="dashboard-grid two-col">
      <PostShiftForm onSubmit={onPost} />

      <div>
        <div className="section-title">
          Your posted shifts
          <span className="count">{mine.length} total</span>
        </div>
        {mine.length === 0 ? (
          <div className="panel empty-state">No shifts posted yet. Post your first one to see it here.</div>
        ) : (
          <div className="shift-list">
            {mine.map(s => (
              <HospitalShiftCard key={s.id} shift={s} onConfirm={onConfirm} onRate={onRate} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
