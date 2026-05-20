import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { ConsumptionData } from '../../types'
import { api } from '../../services/api'

export function ConsumptionChart() {
  const [data, setData] = useState<ConsumptionData[]>([])

  useEffect(() => {
    api.getConsumptionBySector().then(setData)
  }, [])

  return (
    <div className="bg-white rounded-xl border border-surface-200 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Consumo por Sector (Planificado vs Real)</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13px' }}
          />
          <Legend wrapperStyle={{ fontSize: '13px' }} />
          <Bar dataKey="planificado" name="Planificado" fill="#93c5fd" radius={[4, 4, 0, 0]} />
          <Bar dataKey="real" name="Real" fill="#1b5e20" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
