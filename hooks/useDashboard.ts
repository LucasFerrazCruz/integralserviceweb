import { useEffect, useState } from 'react'
import { api } from '@/services/api'

type DashboardResumo = {
  totalProdutos: number
  totalEstoque: number
  totalClientes: number
}

export function useDashboard() {
  const [data, setData] = useState<DashboardResumo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarDashboard() {
      try {
        const response = await api.get('/dashboard/resumo')
        setData(response.data)
      } catch (error) {
        console.error('Erro ao carregar dashboard', error)
      } finally {
        setLoading(false)
      }
    }

    carregarDashboard()
  }, [])

  return { data, loading }
}
