import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import Badge from '../UI/Badge'

function Avatar({ name }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() || '')
    .join('')

  const colors = [
    'bg-indigo-500', 'bg-blue-500', 'bg-emerald-500',
    'bg-amber-500', 'bg-purple-500', 'bg-rose-500',
  ]
  const colorIdx = name.charCodeAt(0) % colors.length

  return (
    <div className={`w-9 h-9 rounded-full ${colors[colorIdx]} flex items-center justify-center flex-shrink-0`}>
      <span className="text-xs font-semibold text-white">{initials || '?'}</span>
    </div>
  )
}

export default function RecentActivity({ contacts }) {
  const recent = contacts.slice(0, 5)

  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-slate-300 mb-4">Actividad Reciente</h3>
      {recent.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-8">Sin contactos aún</p>
      ) : (
        <div className="space-y-1">
          {recent.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-slate-700/30 transition-colors"
            >
              <Avatar name={contact.name} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-100 truncate">{contact.name}</p>
                <p className="text-xs text-slate-500 truncate">{contact.company || 'Sin empresa'}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Badge stage={contact.stage} />
                <span className="text-xs text-slate-500 whitespace-nowrap">
                  {contact.created_at
                    ? formatDistanceToNow(new Date(contact.created_at), { addSuffix: true, locale: es })
                    : '—'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
