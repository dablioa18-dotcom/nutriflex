import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import CategoryMenu from "./components/CategoryMenu";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import WhatsAppButton from "./components/WhatsAppButton";
import { products } from "./assets/data/products";
const ProductPage = lazy(() => import("./pages/ProductPage"));
import Footer from "./components/Footer";

function Home({ onQuickBuy, query, setQuery }) {
  const featured = useMemo(() => products.filter((p) => p.featured), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.category].some((field) => field.toLowerCase().includes(q))
    );
  }, [query]);

  const [selectedCat, setSelectedCat] = useState(null);
  const shown = useMemo(
    () => (selectedCat ? filtered.filter((p) => p.category === selectedCat) : filtered),
    [filtered, selectedCat]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
      <Banner />

      {/* Faixa de categorias estilo chips */}
      <div className="rounded-xl bg-white shadow-soft border border-neutral-200 px-4 py-3 text-black">
        <div className="flex flex-wrap items-center justify-center gap-2 text-black">
          {["Proteínas","Aminoácidos","Vitaminas","Pré-treinos","Emagrecimento","Veganos","Roupas"].map((c) => (
            <span key={c} className="inline-flex items-center rounded-full bg-brand-red/10 text-black px-3 py-1 text-xs sm:text-sm">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-[240px_1fr] gap-6">
        <CategoryMenu onSelect={setSelectedCat} />

        <div className="space-y-4">
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-neutral-900">Destaques</h2>
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {featured.map((p, i) => (
                <ProductCard key={`feat-${p.id}-${i}`} product={p} onQuickBuy={onQuickBuy} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-neutral-900">Todos os produtos</h2>
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {shown.map((p, i) => (
                <ProductCard key={`all-${p.id}-${i}`} product={p} onQuickBuy={onQuickBuy} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function AppShell() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("nutriflex_cart_items");
    return saved ? JSON.parse(saved) : [];
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("nutriflex_cart_items", JSON.stringify(items));
  }, [items]);

  const onQuickBuy = (p) => {
    setItems((prev) => [{ ...p }, ...prev]);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header query={query} setQuery={setQuery} onOpenCart={() => setOpen(true)} />
      <Suspense fallback={<div className="p-6">Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Home onQuickBuy={onQuickBuy} query={query} setQuery={setQuery} />} />
          <Route path="/product/:id" element={
            <ProductPage onQuickBuy={onQuickBuy} />
            } />
        </Routes>
      </Suspense>
      <CartDrawer open={open} onClose={() => setOpen(false)} items={items} setItems={setItems} />

      {/* Sticky cart button */}
      <button
        className="fixed bottom-4 left-4 rounded-full bg-brand-red text-white px-4 py-3"
        onClick={() => setOpen(true)}
      >
        Carrinho ({items.length})
      </button>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
