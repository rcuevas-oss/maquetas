import { Plus } from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'
import BarberCard from '@/components/BarberCard'
import PrimaryButton from '@/components/PrimaryButton'
import { BARBERS } from '@/data/mockData'

export default function BarberosPage() {
  return (
    <AdminLayout
      title="Barberos"
      subtitle="Tu equipo y sus reservas del día"
      actions={
        <>
          <PrimaryButton leftIcon={<Plus className="h-4 w-4" />}>
            Nuevo barbero
          </PrimaryButton>
          <PrimaryButton variant="secondary">Ver agenda completa</PrimaryButton>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BARBERS.map((b, i) => (
          <BarberCard key={b.id} barber={b} showAdminActions index={i} />
        ))}
      </div>
    </AdminLayout>
  )
}
