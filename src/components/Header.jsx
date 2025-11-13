// Removido toggle de tema: vamos manter tema único com alto contraste
import { Link } from "react-router-dom";

export default function Header({ query, setQuery, onOpenCart }) {
  return (
    <header className="sticky top-0 z-40 text-white">
      {/* Faixa superior escura com logo, busca e ações */}
      <div className="bg-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo-arturia.svg" alt="Arturia Suplementos" className="h-9 w-auto" />
          </Link>

          {/* Busca grande centralizada */}
          <div className="flex-1 flex items-center">
            <div className="relative w-100px max-w-2xl">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busque por..."
                className="w-full rounded-sm bg-white text-neutral-900 pl-10 pr-10 py-2 text-sm placeholder:text-neutral-500 focus:outline-none"
              />
              {/* ícone de busca */}
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              {/* botão submit decorativo */}
              <button className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 rounded-sm bg-neutral-200 text-neutral-800 text-xs hover:bg-neutral-300">Q</button>
            </div>
          </div>

          {/* Ações à direita */}
          <div className="hidden sm:flex items-center gap-3 text-xs">
            <a href="#" className="hover:underline text-neutral-300">Rastreio</a>
            <a href="#" className="hover:underline text-neutral-300">Minha conta</a>
            <button
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-neutral-800"
              aria-label="Abrir carrinho"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                <circle cx="7" cy="21" r="1" />
                <circle cx="17" cy="21" r="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Faixa de navegação abaixo (menu de categorias) */}
      <nav className="bg-white border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-4 overflow-x-auto text-[11px] text-black sm:text-xs uppercase tracking-wide">
          {["Produtos",
          "Lançamentos",
          "Creatina",
          "Whey Protein",
         ].map((c) => (
            c === "Promoções" ? (
              <span key={c} className="bg-brand-red text-black px-3 py-1 rounded-sm whitespace-nowrap">{c}</span>
            ) : (
              <span key={c} className="text-black whitespace-nowrap">{c}</span>
            )
          ))}
        </div>
      </nav>
    </header>
  );
}