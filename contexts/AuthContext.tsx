'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api } from '@/services/api'
import { LoginRequest } from '@/types/auth'

type Usuario = {
  id: number
  nome: string
  email: string
  tipo: 'ADMIN' | 'CLIENTE'
}

type AuthContextType = {
  usuario: Usuario | null
  loading: boolean
  login: (data: LoginRequest) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  const carregarUsuario = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const { data } = await api.get('/auth/me')
      setUsuario(data)
    } catch {
      setUsuario(null)
      localStorage.removeItem('token')
      delete api.defaults.headers.common.Authorization
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      carregarUsuario()
    } else {
      setLoading(false)
    }
  }, [carregarUsuario])

  async function login({ email, senha }: LoginRequest) {
    const { data } = await api.post('/auth/login', { email, senha })

    const token = data.token

    localStorage.setItem('token', token)
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    await carregarUsuario()
  }

  function logout() {
    localStorage.removeItem('token')
    delete api.defaults.headers.common.Authorization
    setUsuario(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ usuario, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
