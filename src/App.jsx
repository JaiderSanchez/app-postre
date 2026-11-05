import { useState } from 'react';
import { productos } from './data/productos';
import { ProductCard } from './components/ProductCard';
import { CartButton } from './components/CartButton';

function App() {
  const flanes = productos.filter(p => p.categoria === 'flanes');
  const postres = productos.filter(p => p.categoria === 'postres');

  // Estado local para controlar si el modal del carrito está abierto
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto font-sans relative pb-24">
      <header className="mb-8 text-center md:text-left mt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Yummy Postres
        </h1>
        <p className="text-gray-400 mt-2 text-lg">Haz tu pedido para este fin de semana 🍮</p>
      </header>

      <main className="space-y-12">
        {/* Sección de Flanes */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2 flex items-center gap-2">
            <i className='bx bxs-pie-chart-alt-2 text-[#a855f7]'></i> Flanes Especiales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flanes.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        </section>

        {/* Sección de Postres */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2 flex items-center gap-2">
            <i className='bx bxs-cake text-[#a855f7]'></i> Postres Caseros
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {postres.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        </section>
      </main>

      {/* Botón flotante del carrito */}
      <CartButton onOpenCart={() => setIsCartOpen(true)} />

      {/* Aquí irá el Modal del carrito en el siguiente paso */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-gray-800 text-center">
            <h2 className="text-2xl text-white mb-4">Modal del Carrito</h2>
            <p className="text-gray-400 mb-6">Próximamente agregaremos los detalles aquí.</p>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-xl"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
