import { STAGE_DOT_COLORS } from '../UI/Badge'
import ContactCard from './ContactCard'

export default function PipelineColumn({ stage, contacts, onMoveStage, onScoreContact, scoringIds }) {
  const totalValue = contacts.reduce((sum, c) => sum + (c.value || 0), 0)

  return (
    <div className="flex flex-col min-w-[85vw] sm:min-w-[260px] max-w-[260px] bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
      {/* Column Header */}
      <div className="px-4 py-3 border-b border-slate-800">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STAGE_DOT_COLORS[stage]}`} />
            <h3 className="text-sm font-semibold text-slate-200">{stage}</h3>
          </div>
          <span className="text-xs font-mono bg-slate-700 text-slate-400 rounded-full px-2 py-0.5">
            {contacts.length}
          </span>
        </div>
        {totalValue > 0 && (
          <p className="text-xs font-mono text-slate-500 pl-4">
            ${totalValue.toLocaleString()}
          </p>
        )}
      </div>

      {/* Cards */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-[calc(100vh-180px)] lg:max-h-[calc(100vh-220px)]">
        {contacts.length === 0 ? (
          <div className="flex items-center justify-center h-24 border-2 border-dashed border-slate-800 rounded-lg">
            <p className="text-xs text-slate-600">Sin contactos</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onMoveStage={onMoveStage}
              onScoreContact={onScoreContact}
              scoringIds={scoringIds}
            />
          ))
        )}
      </div>
    </div>
  )
}
