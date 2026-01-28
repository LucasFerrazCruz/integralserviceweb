'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { usuario, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return // ⛔ ainda verificando sessão

    if (!usuario) {
      router.push('/login')
    }
  }, [loading, usuario, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span>Carregando...</span>
      </div>
    )
  }

  return <>{children}</>
}
