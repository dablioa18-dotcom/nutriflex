export default function Footer() {
  return (
    <footer className="mt-12 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 grid sm:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <img src="/images/logo-arturia.svg" alt="Arturia Suplementos" className="h-10" />
          </div>
          <p className="mt-2 opacity-80">Suplementos de alta performance para treinos e saúde.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Institucional</h4>
          <ul className="space-y-1 opacity-80">
            {[
              "Sobre nós",
              "Trocas e Devoluções",
              "Política de Privacidade",
              "Pagamento e Frete",
              "Contato",
            ].map((i) => (
              <li key={i}><a href="#" className="hover:underline">{i}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Atendimento</h4>
          <p className="opacity-80">WhatsApp: (00) 00000-0000</p>
          <p className="opacity-80">Email: contato@arturia.com</p>
          <div className="mt-3 flex gap-2">
            <span className="inline-flex items-center rounded bg-brand-red/10 text-black px-2 py-1">Entrega rápida</span>
            <span className="inline-flex items-center rounded bg-neutral-100 text-black px-2 py-1">Retirada na loja</span>
          </div>
        </div>
      </div>
      <div className="text-center text-xs opacity-70 py-4">© {new Date().getFullYear()} Arturia Suplementos</div>
    </footer>
  );
}