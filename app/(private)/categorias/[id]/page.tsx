'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { listarProdutosPorCategoria, Produto } from '@/services/produto'
import { buscarCategoria } from '@/services/categoria'

export default function ProdutosPorCategoriaPage() {
  const { id } = useParams()
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [nomeCategoria, setNomeCategoria] = useState('')

  useEffect(() => {
    buscarCategoria(Number(id)).then((c) => setNomeCategoria(c.nome))
  })

  useEffect(() => {
    listarProdutosPorCategoria(Number(id)).then(setProdutos)
  }, [id])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">{nomeCategoria}</h1>

      {produtos.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {produtos.map((produto) => (
            <div key={produto.id} className="bg-white p-4 rounded shadow">
              <h2 className="font-medium">{produto.nome}</h2>
              <p>Código: {produto.codigo}</p>
              <p>
                Quantidade: {produto.quantidadeAtual} {produto.unidade}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
