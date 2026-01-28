import { DashboardCard } from '@/components/dashboardcard/DashboardCard'

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Produtos" value="--" href="/produtos" />

        <DashboardCard title="Estoque" value="--" href="/estoque" />

        <DashboardCard title="Clientes" value="--" href="/clientes" />
      </div>
    </div>
  )
}
