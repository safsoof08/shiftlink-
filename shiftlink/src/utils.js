export function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

export function daysUntil(iso) {
  const target = new Date(iso + 'T00:00:00')
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return Math.round((target - now) / 86400000)
}

export function isUrgent(iso) {
  const d = daysUntil(iso)
  return d >= 0 && d <= 2
}

export function initials(name) {
  return name.replace('Dr. ', '').split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
}
