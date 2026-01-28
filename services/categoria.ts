import { api } from '@/services/api'

export type Categoria = {
  id: number
  nome: string
}

//export async function listarCategorias() {
//  const { data } = await api.get<Categoria[]>('/api/categorias')
//  return data
//}

export async function buscarCategoria(id: number) {
  const { data } = await api.get(`/categorias/${id}`)
  return data
}
