export default function KPICard({ icon, label, value, subValue, accent = false }) {
  return (
    <div className={`card p-5 flex items-start gap-4 ${accent ? 'border-indigo-500/40' : ''}`}>
      <div className={`p-2.5 rounded-xl flex-shrink-0 ${accent ? 'bg-indigo-600/20' : 'bg-slate-700/50'}`}>
        <span className={`block w-6 h-6 ${accent ? 'text-indigo-400' : 'text-slate-400'}`}>
          {icon}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-slate-400 truncate">{label}</p>
        <p className={`text-2xl font-semibold mt-0.5 ${accent ? 'text-indigo-300' : 'text-slate-100'} font-mono`}>
          {value}
        </p>
        {subValue && (
          <p className="text-xs text-slate-500 mt-1">{subValue}</p>
        )}
      </div>
    </div>
  )
}
