import { currentDoctor, currentHospital } from '../data/mockData'
import { initials } from '../utils'

export default function Header({ role, setRole }) {
  const persona = role === 'hospital'
    ? { label: currentHospital.name, sub: currentHospital.area, avatar: 'NM' }
    : { label: currentDoctor.name, sub: currentDoctor.specialty, avatar: initials(currentDoctor.name) }

  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark">S</div>
        <div>
          <div className="brand-name">ShiftLink</div>
          <div className="brand-tag">Verified shift marketplace for Egyptian hospitals</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div className="role-switch">
          <button
            className={`role-btn ${role === 'hospital' ? 'active' : ''}`}
            onClick={() => setRole('hospital')}
          >
            Hospital
          </button>
          <button
            className={`role-btn ${role === 'doctor' ? 'active' : ''}`}
            onClick={() => setRole('doctor')}
          >
            Doctor
          </button>
        </div>
        <div className="persona-chip">
          <span className="persona-avatar">{persona.avatar}</span>
          <span>{persona.label}</span>
        </div>
      </div>
    </header>
  )
}
