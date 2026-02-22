'use client'

import { useEffect, useState } from 'react'
import { listarCategorias, criarCategoria } from '@/services/categoria'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

type Categoria = {
  id: number
  nome: string
}

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [novaCategoria, setNovaCategoria] = useState('')
  const { user } = useAuth()

  const isAdmin = user?.tipo === 'ADMIN'

  useEffect(() => {
    carregarCategorias()
  }, [])

  async function carregarCategorias() {
    const data = await listarCategorias()
    setCategorias(data)
  }

  async function handleCriarCategoria() {
    if (!novaCategoria) return

    await criarCategoria(novaCategoria)
    setNovaCategoria('')
    carregarCategorias()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Categorias</h1>

        {isAdmin && (
          <div className="flex gap-2">
            <input
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              placeholder="Nova categoria"
              className="border p-2 rounded"
            />
            <button
              onClick={handleCriarCategoria}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Criar
            </button>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {categorias.map((cat) => (
          <Link
            key={cat.id}
            href={`/categorias/${cat.id}`}
            className="block border p-4 rounded hover:bg-neutral-50"
          >
            {cat.nome}
          </Link>
        ))}
      </div>
    </div>
  )
}
