export default function ToastStack({ toasts }) {
  if (!toasts.length) return null
  return (
    <div className="toast-stack">
      {toasts.map(t => (
        <div className="toast" key={t.id}>
          <span>🔔</span>
          <span><strong>{t.title}</strong><br />{t.body}</span>
        </div>
      ))}
    </div>
  )
}
