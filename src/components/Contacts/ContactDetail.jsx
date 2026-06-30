import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Badge from '../UI/Badge'

function ScoreDisplay({ score }) {
  if (score == null) return <span className="text-3xl font-mono font-bold text-slate-500">—</span>
  let cls = 'text-3xl font-mono font-bold '
  if (score >= 70) cls += 'text-emerald-400'
  else if (score >= 40) cls += 'text-amber-400'
  else cls += 'text-red-400'
  return <span className={cls}>{score}<span className="text-lg text-slate-500">/100</span></span>
}

export default function ContactDetail({ contact, onUpdateNotes, onDelete, onUpdateStage, onScoreContact, isScoring }) {
  const navigate = useNavigate()
  const [notes, setNotes] = useState(contact.notes || '')
  const [saving, setSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [stageHistory] = useState(() => [
    { stage: contact.stage, date: contact.created_at || new Date().toISOString() },
  ])
  const saveTimer = useRef(null)

  useEffect(() => {
    setNotes(contact.notes || '')
  }, [contact.id, contact.notes])

  const handleNotesChange = (e) => {
    const val = e.target.value
    setNotes(val)
    setSaving(true)

    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      await onUpdateNotes(contact.id, val)
      setSaving(false)
    }, 800)
  }

  const handleDelete = async () => {
    await onDelete(contact.id)
    navigate('/contacts')
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate('/contacts')}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver a Contactos
      </button>

      {/* Header Card */}
      <div className="card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-white">
                {contact.name?.[0]?.toUpperCase() || '?'}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100">{contact.name}</h1>
              {contact.company && (
                <p className="text-slate-400 text-sm mt-0.5">{contact.company}</p>
              )}
              <div className="mt-2">
                <Badge stage={contact.stage} />
              </div>
            </div>
          </div>

          {/* Delete */}
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors"
              title="Eliminar contacto"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2">
              <span className="text-sm text-red-300">¿Eliminar?</span>
              <button
                onClick={handleDelete}
                className="text-xs font-medium text-red-300 hover:text-red-100 bg-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded-lg transition-colors"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contact.email && (
          <div className="card p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Email</p>
            <a
              href={`mailto:${contact.email}`}
              className="text-indigo-300 hover:text-indigo-200 text-sm transition-colors"
            >
              {contact.email}
            </a>
          </div>
        )}
        {contact.phone && (
          <div className="card p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Teléfono</p>
            <a
              href={`tel:${contact.phone}`}
              className="text-indigo-300 hover:text-indigo-200 text-sm transition-colors"
            >
              {contact.phone}
            </a>
          </div>
        )}
        {contact.value != null && (
          <div className="card p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Valor</p>
            <p className="text-slate-100 text-sm font-mono font-semibold">
              ${contact.value.toLocaleString()}
            </p>
          </div>
        )}
        {contact.created_at && (
          <div className="card p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Creado</p>
            <p className="text-slate-300 text-sm">
              {format(new Date(contact.created_at), "d 'de' MMMM yyyy", { locale: es })}
            </p>
          </div>
        )}
      </div>

      {/* Lead Score */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-300">Lead Score</h3>
          <button
            onClick={() => onScoreContact && onScoreContact(contact)}
            disabled={isScoring || !onScoreContact}
            className="btn-ghost text-xs px-3 py-1.5 flex items-center gap-1.5 disabled:opacity-50"
          >
            {isScoring ? (
              <>
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Calculando...
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Recalcular score
              </>
            )}
          </button>
        </div>
        <div className="flex items-start gap-6">
          <ScoreDisplay score={contact.score} />
          <div className="flex-1 min-w-0">
            {contact.score_reasoning ? (
              <p className="text-slate-400 text-sm leading-relaxed">{contact.score_reasoning}</p>
            ) : (
              <p className="text-slate-600 text-sm">Sin análisis disponible. Presiona "Recalcular score" para generar uno.</p>
            )}
            {contact.suggested_action && (
              <div className="flex items-start gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3 mt-3">
                <span className="text-sm flex-shrink-0">💡</span>
                <div>
                  <p className="text-xs font-medium text-indigo-300 mb-1">Próxima acción recomendada</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{contact.suggested_action}</p>
                </div>
              </div>
            )}
            {contact.last_score_update && (
              <p className="text-xs text-slate-600 mt-2">
                Actualizado {format(new Date(contact.last_score_update), "d MMM yyyy 'a las' HH:mm", { locale: es })}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-300">Notas</h3>
          {saving && (
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Guardando...
            </span>
          )}
          {!saving && notes !== (contact.notes || '') && (
            <span className="text-xs text-emerald-400">Guardado</span>
          )}
        </div>
        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder="Escribe notas sobre este contacto..."
          rows={5}
          className="input resize-none"
        />
      </div>

      {/* Stage History */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Historial de Stage</h3>
        <div className="space-y-2">
          {stageHistory.map((entry, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
              <Badge stage={entry.stage} />
              <span className="text-slate-500 text-xs">
                {format(new Date(entry.date), "d MMM yyyy 'a las' HH:mm", { locale: es })}
              </span>
            </div>
          ))}
          <p className="text-xs text-slate-600 mt-3">
            El historial completo requiere una tabla adicional en la base de datos.
          </p>
        </div>
      </div>
    </div>
  )
}
