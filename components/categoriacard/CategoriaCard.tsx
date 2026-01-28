import Link from 'next/link'

type Props = {
  id: number
  nome: string
}

export function CategoriaCard({ id, nome }: Props) {
  return (
    <Link href={`/categorias/${id}`} className="border rounded-lg p-6 hover:shadow transition">
      <h2 className="text-lg font-semibold">{nome}</h2>
      <p className="text-sm text-gray-500 mt-2">Ver produtos</p>
    </Link>
  )
}
