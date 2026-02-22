'use client'

import { api } from '@/services/api'
import { useEffect, useState } from 'react'

type Categoria = {
  id: number
  nome: string
}

type Produto = {
  id: number
  nome: string
  codigo: string
  unidade: string
  quantidadeAtual: number
}

export default function EstoquePage() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null)
  const [produtos, setProdutos] = useState<Produto[]>([])

  useEffect(() => {
    api.get('/api/categorias').then((res) => setCategorias(res.data))
  }, [])

  useEffect(() => {
    if (categoriaSelecionada) {
      api
        .get(`/api/categorias/${categoriaSelecionada}/produtos`)
        .then((res) => setProdutos(res.data.content))
    }
  }, [categoriaSelecionada])

  function movimentar(produtoId: number, tipo: 'ENTRADA' | 'SAIDA') {
    const quantidade = Number(prompt('Quantidade:'))
    if (!quantidade || quantidade <= 0) return

    api
      .post('/api/estoque/movimentacoes', {
        produtoId,
        tipo,
        quantidade,
        observacao: 'Movimentação manual',
      })
      .then(() => {
        // Recarrega produtos
        api
          .get(`/api/categorias/${categoriaSelecionada}/produtos`)
          .then((res) => setProdutos(res.data.content))
      })
  }

  return (
    <div>
      <h1>Estoque</h1>

      {/* DROPDOWN */}
      <select onChange={(e) => setCategoriaSelecionada(Number(e.target.value))} defaultValue="">
        <option value="" disabled>
          Selecione uma categoria
        </option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nome}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Saldo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.nome}</td>
              <td>{prod.quantidadeAtual}</td>
              <td>
                <button onClick={() => movimentar(prod.id, 'ENTRADA')}>+</button>
                <button onClick={() => movimentar(prod.id, 'SAIDA')}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
