import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import type { AuditEntry, AuditFilters } from '../../types'

export function useAudit() {
  const [entries, setEntries] = useState<AuditEntry[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = async (filters?: AuditFilters) => {
    setLoading(true)
    const data = await api.getAuditLog(filters)
    setEntries(data)
    setLoading(false)
  }

  useEffect(() => { fetch() }, [])

  return { entries, loading, refetch: fetch }
}
