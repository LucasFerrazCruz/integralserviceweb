import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow min-h-[calc(100vh-64px)]">
      <nav className="p-4 space-y-2">
        <Link href="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-100">
          Dashboard
        </Link>

        <Link href="/produtos" className="block px-3 py-2 rounded hover:bg-gray-100">
          Produtos
        </Link>

        <Link href="/estoque" className="block px-3 py-2 rounded hover:bg-gray-100">
          Estoque
        </Link>

        <Link href="/movimentacoes" className="block px-3 py-2 rounded hover:bg-gray-100">
          Movimentações
        </Link>
      </nav>
    </aside>
  )
}
