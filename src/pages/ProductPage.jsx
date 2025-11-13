import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { products } from "../assets/data/products";

export default function ProductPage({ onQuickBuy }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) return <div className="p-6">Produto não encontrado.</div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Galeria de imagens */}
        <Gallery product={product} />

        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          {product.brand && <p className="mt-1 text-sm opacity-80">Marca: {product.brand}</p>}
          {product.isKit && <span className="mt-2 inline-block rounded bg-neutral-900 text-white px-2 py-1 text-xs">Kit</span>}
          <p className="mt-2">Categoria: {product.category}</p>
          <div className="mt-4 flex items-center gap-3">
            {product.realPrice && product.realPrice > product.price ? (
              <>
                <span className="text-lg line-through text-neutral-500">R$ {product.realPrice.toFixed(2)}</span>
                <span className="text-2xl font-bold text-brand-red">R$ {product.price.toFixed(2)}</span>
                {(() => {
                  const pct = Math.round(100 - (product.price / product.realPrice) * 100);
                  return pct > 0 ? (
                    <span className="inline-flex items-center rounded bg-green-600 text-white px-2 py-0.5 text-xs">-{pct}%</span>
                  ) : null;
                })()}
              </>
            ) : (
              <span className="text-2xl font-bold text-brand-red">R$ {product.price.toFixed(2)}</span>
            )}
          </div>

          {/* Seleção de variações (sabores) */}
          {product.variants?.length ? (
            <VariantsSelector product={product} />
          ) : null}

          <p className="mt-4 text-sm opacity-80">
            Descrição: suplemento de alta qualidade para performance e saúde. Ideal para
            quem busca resultados e praticidade.
          </p>
          <button
            className="mt-6 rounded-md bg-brand-red px-4 py-2 text-white"
            onClick={() => onQuickBuy(product)}
          >
            Compra rápida
          </button>
        </div>
      </div>
    </div>
  );
}

function Gallery({ product }) {
  const images = useMemo(() => (product.images?.length ? product.images : [product.image]), [product]);
  const [activeIndex, setActiveIndex] = useState(0);
  const main = images[activeIndex];

  return (
    <div>
      <img src={main} alt={product.name} className="rounded-xl object-cover w-full h-72" />
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              className={`rounded-lg overflow-hidden border ${i === activeIndex ? "border-neutral-900" : "border-neutral-300"}`}
              onClick={() => setActiveIndex(i)}
            >
              <img src={src} alt={`${product.name} ${i + 1}`} className="h-16 w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function VariantsSelector({ product }) {
  const [selected, setSelected] = useState(product.variants?.[0]?.id ?? null);
  return (
    <div className="mt-4">
      <p className="text-sm font-medium">Sabores</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {product.variants.map((v) => (
          <button
            key={v.id}
            onClick={() => setSelected(v.id)}
            className={`px-3 py-1.5 rounded-md text-sm border ${selected === v.id ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-900 border-neutral-300"}`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}