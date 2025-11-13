import { categories } from "../assets/data/products";

export default function CategoryMenu({ onSelect }) {
  return (
    <aside className="sm:w-64 w-full sm:sticky sm:top-4">
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm p-3">
        <h3 className="font-semibold mb-2 text-black">Categorias</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-sm">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className="w-full text-left rounded-md px-3 py-2 bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50"
                onClick={() => onSelect(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      
    </aside>
  );
}