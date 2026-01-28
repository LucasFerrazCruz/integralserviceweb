'use client'

import { api } from '@/services/api'
import { useEffect, useState } from 'react'

type Produto = {
  id: number
  nome: string
  descricao: string
}

export default function ProdutosCategoria({ params }: { params: { id: string } }) {
  const [produtos, setProdutos] = useState<Produto[]>([])

  useEffect(() => {
    api.get(`/categorias/${params.id}/produtos`).then((res) => setProdutos(res.data))
  }, [params.id])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Produtos</h1>

      <div className="space-y-4">
        {produtos.map((prod) => (
          <div key={prod.id} className="border rounded p-4">
            <h2 className="font-medium">{prod.nome}</h2>
            <p className="text-sm text-neutral-400">{prod.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
