const STAGE_COLORS = {
  Lead: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  Contactado: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Propuesta: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  Cerrado: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Perdido: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export const STAGE_DOT_COLORS = {
  Lead: 'bg-indigo-400',
  Contactado: 'bg-blue-400',
  Propuesta: 'bg-amber-400',
  Cerrado: 'bg-emerald-400',
  Perdido: 'bg-red-400',
}

export const STAGE_HEX = {
  Lead: '#818CF8',
  Contactado: '#60A5FA',
  Propuesta: '#FBBF24',
  Cerrado: '#34D399',
  Perdido: '#F87171',
}

export default function Badge({ stage, className = '' }) {
  const colorClass = STAGE_COLORS[stage] || 'bg-slate-500/20 text-slate-300 border-slate-500/30'
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${STAGE_DOT_COLORS[stage] || 'bg-slate-400'}`} />
      {stage}
    </span>
  )
}
