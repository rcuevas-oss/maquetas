import { PageHeader } from '../../components/PageHeader'
import { Badge } from '../../components/Badge'
import { useRules } from './useRules'
import { CRITICALITY_COLORS } from '../../lib/constants'
import { cn } from '../../lib/cn'

export default function RulesPage() {
  const { rules, toggle } = useRules()

  const categories = [...new Set(rules.map(r => r.categoryLabel))]

  return (
    <div>
      <PageHeader
        title="Reglas y Protocolos"
        description="Estandarización de la operación fitosanitaria"
      />

      {categories.map(cat => (
        <div key={cat} className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{cat}</h3>
          <div className="space-y-2">
            {rules.filter(r => r.categoryLabel === cat).map(rule => (
              <div
                key={rule.id}
                className={cn(
                  'bg-white rounded-xl border border-surface-200 p-4 flex items-center justify-between hover:shadow-sm transition-shadow',
                  !rule.active && 'opacity-60'
                )}
              >
                <div className="flex-1 mr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900 text-sm">{rule.name}</p>
                    <Badge label={rule.criticality} colorClass={CRITICALITY_COLORS[rule.criticality]} />
                  </div>
                  <p className="text-xs text-gray-500">{rule.description}</p>
                  <p className="text-xs text-gray-400 mt-1">Valor: <span className="font-medium text-gray-600">{rule.value}</span></p>
                </div>

                {/* Toggle */}
                <button
                  onClick={() => toggle(rule.id)}
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0',
                    rule.active ? 'bg-primary-600' : 'bg-surface-300'
                  )}
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm',
                      rule.active ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
