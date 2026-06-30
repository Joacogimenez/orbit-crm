import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Badge from '../UI/Badge'
import { SkeletonRow } from '../UI/Skeleton'

const STAGES = ['Lead', 'Contactado', 'Propuesta', 'Cerrado', 'Perdido']

function ScoreBadge({ score, isScoring }) {
  if (isScoring) {
    return (
      <svg className="w-4 h-4 animate-spin text-slate-400 inline" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    )
  }
  if (score == null) return <span className="text-slate-500 font-mono text-sm">—</span>
  let cls = 'text-xs font-mono font-semibold px-1.5 py-0.5 rounded '
  if (score >= 70) cls += 'bg-emerald-500/20 text-emerald-400'
  else if (score >= 40) cls += 'bg-amber-500/20 text-amber-400'
  else cls += 'bg-red-500/20 text-red-400'
  return <span className={cls}>{score}</span>
}

export default function ContactsList({ contacts, loading, onScoreContact, scoringIds }) {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [stageFilter, setStageFilter] = useState('')
  const [sortBy, setSortBy] = useState('date_desc')

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  const filtered = useMemo(() => {
    let result = [...contacts]

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.company?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q)
      )
    }

    if (stageFilter) {
      result = result.filter((c) => c.stage === stageFilter)
    }

    result.sort((a, b) => {
      if (sortBy === 'date_desc') return new Date(b.created_at) - new Date(a.created_at)
      if (sortBy === 'date_asc') return new Date(a.created_at) - new Date(b.created_at)
      if (sortBy === 'value_desc') return (b.value || 0) - (a.value || 0)
      if (sortBy === 'value_asc') return (a.value || 0) - (b.value || 0)
      if (sortBy === 'name') return a.name?.localeCompare(b.name)
      return 0
    })

    return result
  }, [contacts, debouncedSearch, stageFilter, sortBy])

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <div className="relative min-w-0 w-full sm:flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre, empresa o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input pl-9"
          />
        </div>
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="input w-full sm:w-auto sm:min-w-[120px]"
        >
          <option value="">Todos los stages</option>
          {STAGES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="input w-full sm:w-auto sm:min-w-[130px]"
        >
          <option value="date_desc">Más recientes</option>
          <option value="date_asc">Más antiguos</option>
          <option value="value_desc">Mayor valor</option>
          <option value="value_asc">Menor valor</option>
          <option value="name">Nombre A-Z</option>
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Nombre</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Empresa</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3">Stage</th>
                <th className="text-center text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Score</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Valor</th>
                <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6}><SkeletonRow /></td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500 text-sm">
                    {search || stageFilter ? 'Sin resultados para tu búsqueda' : 'Sin contactos aún'}
                  </td>
                </tr>
              ) : (
                filtered.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="px-4 py-3">
                      <Link
                        to={`/contacts/${contact.id}`}
                        className="font-medium text-slate-100 hover:text-indigo-300 transition-colors text-sm"
                      >
                        {contact.name}
                      </Link>
                      {contact.email && (
                        <p className="text-xs text-slate-500 truncate max-w-[200px]">{contact.email}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-sm text-slate-400 truncate max-w-[150px] block">
                        {contact.company || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge stage={contact.stage} />
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <ScoreBadge score={contact.score} isScoring={scoringIds?.has(contact.id)} />
                    </td>
                    <td className="px-4 py-3 text-right hidden sm:table-cell">
                      <span className="text-sm font-mono text-slate-300">
                        {contact.value != null ? `$${contact.value.toLocaleString()}` : '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell">
                      <span className="text-xs text-slate-500">
                        {contact.created_at
                          ? format(new Date(contact.created_at), 'd MMM yyyy', { locale: es })
                          : '—'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-700/50 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              {filtered.length} de {contacts.length} contacto{contacts.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
