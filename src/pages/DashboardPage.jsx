import KPICard from '../components/Dashboard/KPICard'
import StageChart from '../components/Dashboard/StageChart'
import RecentActivity from '../components/Dashboard/RecentActivity'
import { SkeletonCard } from '../components/UI/Skeleton'

const Icons = {
  users: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  currency: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  check: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  trend: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
}

export default function DashboardPage({ contacts, loading }) {
  const total = contacts.length
  const pipelineContacts = contacts.filter((c) => c.stage !== 'Cerrado' && c.stage !== 'Perdido')
  const pipelineValue = pipelineContacts.reduce((sum, c) => sum + (c.value || 0), 0)
  const closed = contacts.filter((c) => c.stage === 'Cerrado').length
  const conversionRate = total > 0 ? Math.round((closed / total) * 100) : 0

  const formatCurrency = (n) =>
    n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Resumen de tu pipeline de ventas</p>
      </div>

      {/* KPIs */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <KPICard
            icon={Icons.users}
            label="Total Contactos"
            value={total}
            subValue={`${pipelineContacts.length} en pipeline activo`}
          />
          <KPICard
            icon={Icons.currency}
            label="Valor Pipeline"
            value={formatCurrency(pipelineValue)}
            subValue="Oportunidades abiertas"
            accent
          />
          <KPICard
            icon={Icons.check}
            label="Cerrados"
            value={closed}
            subValue={`${contacts.filter(c => c.stage === 'Perdido').length} perdidos`}
          />
          <KPICard
            icon={Icons.trend}
            label="Tasa Conversión"
            value={`${conversionRate}%`}
            subValue="Cerrados / Total"
          />
        </div>
      )}

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-3">
          <StageChart contacts={contacts} />
        </div>
        <div className="xl:col-span-2">
          <RecentActivity contacts={contacts} />
        </div>
      </div>
    </div>
  )
}
