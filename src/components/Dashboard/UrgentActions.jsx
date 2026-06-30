import { Link } from 'react-router-dom'

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000

function getScoreColor(score) {
  if (score >= 70) return '#10B981'
  if (score >= 40) return '#F59E0B'
  return '#EF4444'
}

export default function UrgentActions({ contacts }) {
  const now = Date.now()

  const urgent = contacts
    .filter((c) => {
      if (!c.score || c.score < 70) return false
      const lastActivity = new Date(c.last_score_update || c.updated_at || c.created_at).getTime()
      return now - lastActivity > THREE_DAYS_MS
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-slate-300 mb-4">Acciones Urgentes</h3>

      {urgent.length === 0 ? (
        <p className="text-slate-500 text-sm py-4 text-center">
          Todo al día, no hay acciones urgentes
        </p>
      ) : (
        <ul className="space-y-3">
          {urgent.map((c) => (
            <li key={c.id}>
              <Link
                to={`/contacts/${c.id}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 hover:bg-slate-700 transition-colors group"
              >
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-bold"
                  style={{ backgroundColor: getScoreColor(c.score) + '33', color: getScoreColor(c.score) }}
                >
                  {c.score}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-slate-200 text-sm font-medium truncate group-hover:text-slate-100">
                    {c.name}
                    {c.company && (
                      <span className="text-slate-500 font-normal"> · {c.company}</span>
                    )}
                  </p>
                  {c.suggested_action && (
                    <p className="text-slate-500 text-xs truncate mt-0.5">
                      {c.suggested_action.length > 50
                        ? c.suggested_action.slice(0, 50) + '…'
                        : c.suggested_action}
                    </p>
                  )}
                </div>
                <svg
                  className="flex-shrink-0 w-4 h-4 text-slate-600 group-hover:text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
