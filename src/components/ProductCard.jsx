import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onQuickBuy }) {
  return (
    <motion.div
      className="group rounded-xl border border-neutral-200 bg-white p-3 shadow-soft transition-shadow ring-1 ring-transparent hover:ring-brand-red/20"
      whileHover={{ y: -4 }}
    >
      <div className="relative">
        <img
          src={product.images?.[0] ?? product.image}
          alt={product.name}
          className="h-40 w-full rounded-lg object-cover"
          loading="lazy"
        />
        {product.featured && (
          <span className="absolute left-2 top-2 rounded bg-brand-red text-black px-2 py-0.5 text-xs shadow-sm">Promoção</span>
        )}
        <span className="absolute right-2 top-2 rounded bg-green-600 text-black px-2 py-0.5 text-xs shadow-sm">Em estoque</span>
      </div>
      <div className="mt-3">
        <h3 className="text-sm sm:text-base font-semibold text-black">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-black text-xs">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
          <span className="ml-1 text-black">(24)</span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          {product.realPrice && product.realPrice > product.price ? (
            <>
              <span className="text-sm line-through text-neutral-500">R$ {product.realPrice.toFixed(2)}</span>
              <span className="font-bold text-brand-red">R$ {product.price.toFixed(2)}</span>
              {(() => {
                const pct = Math.round(100 - (product.price / product.realPrice) * 100);
                return pct > 0 ? (
                  <span className="ml-1 inline-flex items-center rounded bg-green-600 text-white px-2 py-0.5 text-xs">-{pct}%</span>
                ) : null;
              })()}
            </>
          ) : (
            <span className="font-bold text-brand-red">R$ {product.price.toFixed(2)}</span>
          )}
        </div>
        
        <div className="mt-3 flex gap-2">
          <Link to={`/product/${product.id}`} className="text-xs sm:text-sm underline">Detalhes</Link>
          
          <button
            className="ml-auto inline-flex items-center gap-2 rounded-md bg-green-600 hover:bg-green-700 px-3 py-1.5 text-xs sm:text-sm text-white"
            onClick={() => onQuickBuy(product)}
          >
            Adicionar
          </button>
        </div>
        <p className="mt-2 text-[11px] text-neutral-700">Frete grátis acima de R$ 199</p>
      </div>
    </motion.div>
  );
}