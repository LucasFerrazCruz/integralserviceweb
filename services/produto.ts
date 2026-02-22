import { api } from './api'

export type Produto = {
  id: number
  nome: string
  codigo: string
  quantidadeAtual: number
  unidade: string
  categoriaId: number
}

export async function listarProdutosPorCategoria(categoriaId: number) {
  const { data } = await api.get(`/api/categorias/${categoriaId}/produtos`)
  return data
}

export async function criarProduto(dto: Produto) {
  const { data } = await api.post('/api/produtos', dto)
  return data
}
