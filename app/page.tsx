'use client'

import { useEffect, useState } from 'react'
import { listarCategorias, Categoria } from '@/services/categoria'
import { CategoriaCard } from '@/components/categoriacard/CategoriaCard'

export default function HomePage() {
  const [categorias, setCategorias] = useState<Categoria[]>([])

  useEffect(() => {
    listarCategorias().then(setCategorias)
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Categorias de Produtos</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categorias.map((categoria) => (
          <CategoriaCard key={categoria.id} id={categoria.id} nome={categoria.nome} />
        ))}
      </div>
    </div>
  )
}
