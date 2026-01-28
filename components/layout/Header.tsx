'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { usuario, loading, logout } = useAuth()

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-700">IntegralService</div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Buscar produto..."
          className="border rounded px-3 py-1 text-sm"
        />

        {!loading && usuario && <span className="text-sm text-gray-700">Olá, {usuario.nome}</span>}

        <button onClick={logout} className="text-sm text-red-500 hover:underline">
          Logout
        </button>
      </div>
    </header>
  )
}
