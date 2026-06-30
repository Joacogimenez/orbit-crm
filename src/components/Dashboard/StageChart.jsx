import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { STAGE_HEX } from '../UI/Badge'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 shadow-lg">
        <p className="text-slate-300 text-sm font-medium">{label}</p>
        <p className="text-slate-100 text-lg font-mono font-semibold">{payload[0].value}</p>
        <p className="text-slate-500 text-xs">contactos</p>
      </div>
    )
  }
  return null
}

export default function StageChart({ contacts }) {
  const STAGES = ['Lead', 'Contactado', 'Propuesta', 'Cerrado', 'Perdido']
  const data = STAGES.map((stage) => ({
    stage,
    count: contacts.filter((c) => c.stage === stage).length,
    color: STAGE_HEX[stage],
  }))

  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-slate-300 mb-4">Contactos por Stage</h3>
      <div className="h-48 sm:h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={32} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis
            dataKey="stage"
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#334155', radius: 4 }} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.stage} fill={entry.color} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  )
}
