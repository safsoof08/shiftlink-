import { useState } from 'react'
import { specialties } from '../data/mockData'

const empty = {
  specialty: specialties[0],
  date: '',
  startTime: '08:00',
  endTime: '16:00',
  payRate: '',
  requirements: '',
}

export default function PostShiftForm({ onSubmit }) {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.date || !form.payRate) {
      setError('Date and pay rate are required.')
      return
    }
    setError('')
    onSubmit(form)
    setForm(empty)
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <div className="section-title">Post a shift</div>
      <div className="form-grid">
        <div className="field">
          <label>Specialty</label>
          <select value={form.specialty} onChange={update('specialty')}>
            {specialties.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Date</label>
          <input type="date" value={form.date} onChange={update('date')} />
        </div>
        <div className="field">
          <label>Start time</label>
          <input type="time" value={form.startTime} onChange={update('startTime')} />
        </div>
        <div className="field">
          <label>End time</label>
          <input type="time" value={form.endTime} onChange={update('endTime')} />
        </div>
        <div className="field">
          <label>Pay rate (EGP)</label>
          <input type="number" min="0" placeholder="e.g. 1200" value={form.payRate} onChange={update('payRate')} />
        </div>
        <div className="field full">
          <label>Requirements</label>
          <textarea placeholder="e.g. Consultant grade, 5+ years ICU experience" value={form.requirements} onChange={update('requirements')} />
        </div>
      </div>
      {error && <div style={{ color: 'var(--danger)', fontSize: 12.5, marginTop: 10 }}>{error}</div>}
      <div style={{ marginTop: 14 }}>
        <button className="btn btn-primary" type="submit">Post shift</button>
      </div>
    </form>
  )
}
