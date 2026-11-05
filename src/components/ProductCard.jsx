import { useCartStore } from '../store/cartStore';

export const ProductCard = ({ producto }) => {
  const agregarAlCarrito = useCartStore((state) => state.agregarAlCarrito);

  return (
    <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-lg border border-gray-800 transition-transform transform hover:scale-105">
      <img 
        src={producto.imagen} 
        alt={producto.nombre} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-1">{producto.nombre}</h3>
        <p className="text-gray-400 text-sm mb-4 h-12">{producto.descripcion}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold text-[#a855f7]">
            ${producto.precio.toLocaleString('es-CO')}
          </span>
          <button 
            onClick={() => agregarAlCarrito(producto)}
            className="bg-[#a855f7] hover:bg-[#9333ea] text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
          >
            <i className='bx bx-cart-add text-xl'></i>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};
