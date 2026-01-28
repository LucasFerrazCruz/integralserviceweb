import { api } from '@/services/api'

export type Categoria = {
  id: number
  nome: string
}

export async function listarCategorias() {
  const { data } = await api.get<Categoria[]>('/categorias')
  return data
}
