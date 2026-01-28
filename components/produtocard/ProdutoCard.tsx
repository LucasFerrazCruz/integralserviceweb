;<div
  key={produto.id}
  className="
    border rounded-lg p-6
    bg-white dark:bg-zinc-900
    hover:shadow-md transition
  "
>
  <h2 className="text-lg font-semibold">{produto.nome}</h2>

  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Código: {produto.codigo}</p>

  <p className="mt-3 font-medium">
    Estoque:
    <span className={`ml-2 ${produto.quantidadeAtual === 0 ? 'text-red-500' : 'text-green-600'}`}>
      {produto.quantidadeAtual} {produto.unidade}
    </span>
  </p>
</div>
