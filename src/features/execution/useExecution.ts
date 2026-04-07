import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import type { Execution } from '../../types'

export function useExecution() {
  const [executions, setExecutions] = useState<Execution[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getExecutions().then(exs => {
      setExecutions(exs)
      setLoading(false)
    })
  }, [])

  return { executions, loading }
}
