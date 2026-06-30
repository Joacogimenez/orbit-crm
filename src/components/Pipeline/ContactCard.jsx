import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const STAGES = ['Lead', 'Contactado', 'Propuesta', 'Cerrado', 'Perdido']

function ScoreBadge({ score, isScoring }) {
  if (isScoring) {
    return (
      <svg className="w-4 h-4 animate-spin text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    )
  }
  if (score == null) {
    return <span className="text-xs text-slate-500 font-mono">—</span>
  }
  let cls = 'text-xs font-mono font-semibold px-1.5 py-0.5 rounded '
  if (score >= 70) cls += 'bg-emerald-500/20 text-emerald-400'
  else if (score >= 40) cls += 'bg-amber-500/20 text-amber-400'
  else cls += 'bg-red-500/20 text-red-400'
  return <span className={cls}>{score}</span>
}

export default function ContactCard({ contact, onMoveStage, onScoreContact, scoringIds }) {
  const currentIdx = STAGES.indexOf(contact.stage)
  const canMoveLeft = currentIdx > 0
  const canMoveRight = currentIdx < STAGES.length - 1
  const isScoring = scoringIds?.has(contact.id) ?? false

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-colors group shadow-card">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <Link
          to={`/contacts/${contact.id}`}
          className="font-semibold text-slate-100 text-sm hover:text-indigo-300 transition-colors line-clamp-1"
        >
          {contact.name}
        </Link>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <ScoreBadge score={contact.score} isScoring={isScoring} />
          {onScoreContact && !isScoring && (
            <button
              onClick={() => onScoreContact(contact)}
              className="btn-ghost p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Recalcular score"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Value */}
      {contact.value != null && contact.value > 0 && (
        <p className="text-xs font-mono font-semibold text-emerald-400 mb-1">
          ${contact.value.toLocaleString()}
        </p>
      )}

      {/* Company */}
      {contact.company && (
        <p className="text-xs text-slate-500 mb-3 truncate">{contact.company}</p>
      )}

      {/* Date */}
      <p className="text-xs text-slate-600 mb-4">
        {contact.created_at
          ? format(new Date(contact.created_at), 'd MMM yyyy', { locale: es })
          : '—'}
      </p>

      {/* Move Stage Arrows */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onMoveStage(contact.id, -1)}
          disabled={!canMoveLeft}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-700 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          title="Mover atrás"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <span className="text-xs text-slate-600 font-mono">
          {currentIdx + 1}/{STAGES.length}
        </span>

        <button
          onClick={() => onMoveStage(contact.id, 1)}
          disabled={!canMoveRight}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-700 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          title="Mover adelante"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
