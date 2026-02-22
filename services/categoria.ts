import { api } from '@/services/api'

export type Categoria = {
  id: number
  nome: string
}

export async function listarCategorias() {
  const { data } = await api.get<Categoria[]>('/api/categorias')
  return data
}

export async function buscarCategoria(id: number) {
  const { data } = await api.get(`/api/categorias/${id}`)
  return data
}

export async function criarCategoria(nome: string) {
  const { data } = await api.post('/api/categorias', { nome })
  return data
}
