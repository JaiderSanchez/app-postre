import { useCartStore } from '../store/cartStore';

export const ProductCard = ({ producto }) => {
  const agregarAlCarrito = useCartStore((state) => state.agregarAlCarrito);

  return (
    <div className="bg-[#FFFFFF] rounded-2xl overflow-hidden shadow-md border border-[#39251E]/10 transition-transform transform hover:scale-105">
      <img 
        src={producto.imagen} 
        alt={producto.nombre} 
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-[#39251E] mb-1">{producto.nombre}</h3>
        <p className="text-[#39251E]/75 text-sm mb-4 h-12">{producto.descripcion}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-[#B97845]">
            ${producto.precio.toLocaleString('es-CO')}
          </span>
          <button 
            onClick={() => agregarAlCarrito(producto)}
            className="bg-[#75452E] hover:bg-[#59331F] text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
          >
            <i className='bx bx-cart-add text-xl'></i>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};
