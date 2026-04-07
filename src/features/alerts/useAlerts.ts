import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import type { Alert } from '../../types'

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getAlerts().then(a => { setAlerts(a); setLoading(false) })
  }, [])

  return { alerts, loading }
}
