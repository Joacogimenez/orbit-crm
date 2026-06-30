import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const BANDS = [
  { label: 'Alto', color: '#10B981' },
  { label: 'Medio', color: '#F59E0B' },
  { label: 'Bajo', color: '#EF4444' },
  { label: 'Sin calcular', color: '#64748B' },
]

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

export default function ScoreBandChart({ contacts }) {
  const data = [
    {
      label: 'Alto',
      count: contacts.filter((c) => c.score !== null && c.score >= 70).length,
      color: '#10B981',
    },
    {
      label: 'Medio',
      count: contacts.filter((c) => c.score !== null && c.score >= 40 && c.score < 70).length,
      color: '#F59E0B',
    },
    {
      label: 'Bajo',
      count: contacts.filter((c) => c.score !== null && c.score < 40).length,
      color: '#EF4444',
    },
    {
      label: 'Sin calcular',
      count: contacts.filter((c) => c.score === null || c.score === undefined).length,
      color: '#64748B',
    },
  ]

  return (
    <div className="card p-5">
      <h3 className="text-sm font-semibold text-slate-300 mb-4">Distribución de Score</h3>
      <div className="h-48 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={32} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#94A3B8', fontSize: 11 }}
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
                <Cell key={entry.label} fill={entry.color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
