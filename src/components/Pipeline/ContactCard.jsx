import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const STAGES = ['Lead', 'Contactado', 'Propuesta', 'Cerrado', 'Perdido']

export default function ContactCard({ contact, onMoveStage }) {
  const currentIdx = STAGES.indexOf(contact.stage)
  const canMoveLeft = currentIdx > 0
  const canMoveRight = currentIdx < STAGES.length - 1

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
        {contact.value != null && contact.value > 0 && (
          <span className="text-xs font-mono font-semibold text-emerald-400 whitespace-nowrap">
            ${contact.value.toLocaleString()}
          </span>
        )}
      </div>

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
