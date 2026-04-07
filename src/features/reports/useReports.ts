import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import type { ConsumptionData, EfficiencyData } from '../../types'

export function useReports() {
  const [consumptionByProduct, setByProduct] = useState<ConsumptionData[]>([])
  const [consumptionBySector, setBySector] = useState<ConsumptionData[]>([])
  const [efficiency, setEfficiency] = useState<EfficiencyData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getConsumptionByProduct(),
      api.getConsumptionBySector(),
      api.getEfficiencyData(),
    ]).then(([bp, bs, ef]) => {
      setByProduct(bp)
      setBySector(bs)
      setEfficiency(ef)
      setLoading(false)
    })
  }, [])

  return { consumptionByProduct, consumptionBySector, efficiency, loading }
}
