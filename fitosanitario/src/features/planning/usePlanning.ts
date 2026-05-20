import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import type { Application } from '../../types'

export function usePlanning() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getApplications().then(apps => {
      setApplications(apps)
      setLoading(false)
    })
  }, [])

  return { applications, loading }
}
