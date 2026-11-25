import { useState } from 'react';
import { productos } from './data/productos';
import { ProductCard } from './components/ProductCard';
import { CartButton } from './components/CartButton';
import { CartModal } from './components/CartModal';

function App() {
  const flanes = productos.filter(p => p.categoria === 'flanes');
  const postres = productos.filter(p => p.categoria === 'postres');
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto font-sans relative pb-24">
      <header className="mb-8 text-center md:text-left mt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#39251E]">
          Yummy Postres
        </h1>
        <p className="text-[#75452E] mt-2 text-lg font-medium">
          Haz tu pedido artesanal para este fin de semana 🍮
        </p>
      </header>

      <main className="space-y-12">
        {/* Sección de Flanes */}
        <section>
          <h2 className="text-2xl font-bold text-[#39251E] mb-6 border-b border-[#39251E]/15 pb-2 flex items-center gap-2">
            <i className='bx bxs-pie-chart-alt-2 text-[#B97845]'></i> Flanes Especiales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flanes.map((producto, index) => (
              <ProductCard key={producto.id} producto={producto} index={index}/>
            ))}
          </div>
        </section>

        {/* Sección de Postres */}
        <section>
          <h2 className="text-2xl font-bold text-[#39251E] mb-6 border-b border-[#39251E]/15 pb-2 flex items-center gap-2">
            <i className='bx bxs-cake text-[#B97845]'></i> Postres Caseros
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {postres.map((producto, index) => (
              <ProductCard key={producto.id} producto={producto} index={index} />
            ))}
          </div>
        </section>
        
      </main>

      <CartButton onOpenCart={() => setIsCartOpen(true)} />

      {isCartOpen && (
        <CartModal onClose={() => setIsCartOpen(false)} />
      )}
    </div>
  );
}

export default App;
