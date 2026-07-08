export function Stars({ value }) {
  const full = Math.round(value)
  return <span className="stars">{'★'.repeat(full)}{'☆'.repeat(5 - full)} <span style={{ color: 'var(--ink-soft)' }}>{value.toFixed(1)}</span></span>
}

export function StarPicker({ value, onChange }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          className={`star-btn ${n <= value ? 'filled' : ''}`}
          onClick={() => onChange(n)}
          aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </span>
  )
}
