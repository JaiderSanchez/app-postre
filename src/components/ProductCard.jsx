import { motion } from 'framer-motion';
import { useCartStore } from '../store/cartStore';

export const ProductCard = ({ producto, index = 0 }) => {
  const agregarAlCarrito = useCartStore((state) => state.agregarAlCarrito);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-[#FFFFFF] rounded-2xl overflow-hidden shadow-md border border-[#39251E]/10"
    >
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
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => agregarAlCarrito(producto)}
            className="bg-[#75452E] hover:bg-[#59331F] text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
          >
            <i className='bx bx-cart-add text-xl'></i>
            Agregar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
