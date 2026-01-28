import { api } from './api'

export type Produto = {
  id: number
  nome: string
  codigo: string
  quantidadeAtual: number
  unidade: string
}

export async function listarProdutosPorCategoria(categoriaId: number) {
  const { data } = await api.get<Produto[]>('/api/produtos', {
    params: { categoriaId },
  })

  return data
}
