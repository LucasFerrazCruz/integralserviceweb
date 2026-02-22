'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { listarProdutosPorCategoria, criarProduto } from '@/services/produto'
import { buscarCategoria } from '@/services/categoria'
import { useAuth } from '@/hooks/useAuth'

type Produto = {
  id: number
  nome: string
  codigo: string
  quantidadeAtual: number
  unidade: string
}

type NovoProduto = {
  nome: string
  codigo: string
  quantidadeAtual: number | ''
  unidade: string
}

export default function ProdutosPorCategoriaPage() {
  const params = useParams()
  const categoriaId = Number(params.id)

  const [produtos, setProdutos] = useState<Produto[]>([])
  const [nomeCategoria, setNomeCategoria] = useState('')
  const [loading, setLoading] = useState(true)

  const [novoProduto, setNovoProduto] = useState<NovoProduto>({
    nome: '',
    codigo: '',
    quantidadeAtual: '',
    unidade: '',
  })

  const { user } = useAuth()
  const isAdmin = user?.tipo === 'ADMIN'

  // 🔥 Carregamento inicial organizado
  useEffect(() => {
    if (!categoriaId) return

    async function carregarDados() {
      try {
        setLoading(true)

        const categoria = await buscarCategoria(categoriaId)
        setNomeCategoria(categoria.nome)

        const response = await listarProdutosPorCategoria(categoriaId)
        setProdutos(response.content)
      } catch (error) {
        console.error('Erro ao carregar categoria:', error)
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [categoriaId])

  async function handleCriarProduto() {
    if (!novoProduto.nome || !novoProduto.codigo || !novoProduto.unidade) {
      alert('Preencha todos os campos')
      return
    }

    try {
      await criarProduto({
        ...novoProduto,
        quantidadeAtual:
          novoProduto.quantidadeAtual === '' ? 0 : Number(novoProduto.quantidadeAtual),
        categoriaId,
      })

      // limpa formulário
      setNovoProduto({
        nome: '',
        codigo: '',
        quantidadeAtual: '',
        unidade: '',
      })

      // recarrega lista
      const produtosAtualizados = await listarProdutosPorCategoria(categoriaId)
      setProdutos(produtosAtualizados)
    } catch (error) {
      console.error('Erro ao criar produto:', error)
    }
  }

  if (loading) {
    return <div className="p-6">Carregando...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">{nomeCategoria}</h1>

      {isAdmin && (
        <div className="mb-6 space-y-2 border p-4 rounded">
          <h2 className="font-medium">Novo Produto</h2>

          <input
            placeholder="Nome"
            value={novoProduto.nome}
            onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
            className="border p-2 rounded w-full"
          />

          <input
            placeholder="Código"
            value={novoProduto.codigo}
            onChange={(e) => setNovoProduto({ ...novoProduto, codigo: e.target.value })}
            className="border p-2 rounded w-full"
          />

          <input
            type="number"
            placeholder="Quantidade"
            value={novoProduto.quantidadeAtual}
            onChange={(e) =>
              setNovoProduto({
                ...novoProduto,
                quantidadeAtual: e.target.value === '' ? '' : Number(e.target.value),
              })
            }
            className="border p-2 rounded w-full"
          />

          <input
            placeholder="Unidade"
            value={novoProduto.unidade}
            onChange={(e) => setNovoProduto({ ...novoProduto, unidade: e.target.value })}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={handleCriarProduto}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Criar Produto
          </button>
        </div>
      )}

      {produtos.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <div className="grid gap-4">
          {produtos.map((produto) => (
            <div key={produto.id} className="border p-4 rounded">
              <h2>{produto.nome}</h2>
              <p>Código: {produto.codigo}</p>
              <p>
                {produto.quantidadeAtual} {produto.unidade}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
