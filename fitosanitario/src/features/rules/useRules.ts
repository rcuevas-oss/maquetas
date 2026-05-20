import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import type { Rule } from '../../types'

export function useRules() {
  const [rules, setRules] = useState<Rule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getRules().then(r => { setRules(r); setLoading(false) })
  }, [])

  const toggle = async (id: string) => {
    const updated = await api.toggleRule(id)
    setRules(prev => prev.map(r => r.id === id ? updated : r))
  }

  return { rules, loading, toggle }
}
