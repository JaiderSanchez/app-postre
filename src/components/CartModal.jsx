import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';

export const CartModal = ({ onClose }) => {
  const { carrito, agregarAlCarrito, disminuirCantidad, eliminarDelCarrito } = useCartStore();
  
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [notas, setNotas] = useState('');
  const [metodoPago, setMetodoPago] = useState('efectivo');

  const transferenciaRef = useRef(null);

  useEffect(() => {
    if (metodoPago === 'transferencia' && transferenciaRef.current) {
      setTimeout(() => {
        transferenciaRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest' 
        });
      }, 150);
    }
  }, [metodoPago]);

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  const enviarPedidoWhatsApp = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !direccion.trim()) {
      alert("Por favor, ingresa tu nombre y dirección para el domicilio.");
      return;
    }

    const numeroAmigos = "573000000000"; // Reemplazar con el número real
    
    const detallesFormateados = carrito.map(item => 
      `- ${item.cantidad}x ${item.nombre} ($${(item.precio * item.cantidad).toLocaleString('es-CO')})`
    ).join('\n');

    const textoBase = `¡Hola! Quiero hacer un pedido:\n\nCliente: ${nombre}\nDirección: ${direccion}\nNotas: ${notas || 'Ninguna'}\n\nDetalles del pedido:\n${detallesFormateados}\n\nTotal a pagar: $${total.toLocaleString('es-CO')}\nMétodo de pago: ${metodoPago.toUpperCase()}`;
    
    const textoCodificado = encodeURIComponent(textoBase);
    window.open(`https://wa.me/${numeroAmigos}?text=${textoCodificado}`, '_blank');
  };

  if (carrito.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#39251E]/15 text-center w-full max-w-md shadow-xl"
        >
          <i className='bx bx-cart text-6xl text-[#B97845] mb-4'></i>
          <h2 className="text-2xl font-bold text-[#39251E] mb-2">Tu carrito está vacío</h2>
          <p className="text-[#39251E]/70 mb-6">Agrega algunos postres deliciosos para continuar.</p>
          <motion.button 
            whileTap={{ scale: 0.94 }}
            onClick={onClose} 
            className="bg-[#75452E] hover:bg-[#59331F] text-white px-6 py-2.5 rounded-xl w-full font-medium transition-colors"
          >
            Volver al menú
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="bg-[#FFFFFF] rounded-2xl border border-[#39251E]/15 w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Cabecera */}
        <div className="flex justify-between items-center p-4 border-b border-[#39251E]/10">
          <h2 className="text-xl font-bold text-[#39251E]">Tu Pedido</h2>
          <motion.button 
            whileTap={{ scale: 0.85 }}
            onClick={onClose} 
            className="text-[#39251E]/60 hover:text-[#39251E] text-2xl"
          >
            <i className='bx bx-x'></i>
          </motion.button>
        </div>

        {/* Cuerpo Scrolleable */}
        <div className="p-4 overflow-y-auto flex-1">
          <div className="space-y-3 mb-6">
            <AnimatePresence initial={false}>
              {carrito.map(item => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                  className="flex gap-3 bg-[#FFF8EF] p-3 rounded-xl border border-[#39251E]/10 items-center"
                >
                  <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="text-[#39251E] text-sm font-bold">{item.nombre}</h4>
                    <p className="text-[#B97845] font-semibold text-sm">${(item.precio * item.cantidad).toLocaleString('es-CO')}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <motion.button 
                      whileTap={{ scale: 0.8 }}
                      onClick={() => eliminarDelCarrito(item.id)} 
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className='bx bx-trash text-lg'></i>
                    </motion.button>
                    <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#39251E]/15 rounded-lg px-2 py-1">
                      <motion.button 
                        whileTap={{ scale: 0.75 }}
                        onClick={() => disminuirCantidad(item.id)} 
                        className="text-[#75452E] hover:text-[#59331F]"
                      >
                        <i className='bx bx-minus'></i>
                      </motion.button>
                      <span className="text-[#39251E] font-semibold text-sm min-w-[1rem] text-center">{item.cantidad}</span>
                      <motion.button 
                        whileTap={{ scale: 0.75 }}
                        onClick={() => agregarAlCarrito(item)} 
                        className="text-[#75452E] hover:text-[#59331F]"
                      >
                        <i className='bx bx-plus'></i>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Formulario del cliente */}
          <form id="order-form" onSubmit={enviarPedidoWhatsApp} className="space-y-4">
            <div>
              <label className="block text-[#39251E] font-medium text-sm mb-1">Nombre completo *</label>
              <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-[#FFF8EF] border border-[#39251E]/20 text-[#39251E] rounded-xl px-4 py-2 focus:outline-none focus:border-[#75452E]" placeholder="Ej: Juan Pérez" />
            </div>
            <div>
              <label className="block text-[#39251E] font-medium text-sm mb-1">Dirección / Barrio *</label>
              <input type="text" required value={direccion} onChange={(e) => setDireccion(e.target.value)} className="w-full bg-[#FFF8EF] border border-[#39251E]/20 text-[#39251E] rounded-xl px-4 py-2 focus:outline-none focus:border-[#75452E]" placeholder="Ej: Calle 12 #34-56, Barrio Centro" />
            </div>
            <div>
              <label className="block text-[#39251E] font-medium text-sm mb-1">Notas (Opcional)</label>
              <textarea value={notas} onChange={(e) => setNotas(e.target.value)} className="w-full bg-[#FFF8EF] border border-[#39251E]/20 text-[#39251E] rounded-xl px-4 py-2 focus:outline-none focus:border-[#75452E] resize-none h-20" placeholder="Ej: Timbre dañado, llamar al llegar."></textarea>
            </div>
            
            <div>
              <label className="block text-[#39251E] font-medium text-sm mb-2">Método de Pago *</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-[#39251E] cursor-pointer">
                  <input type="radio" value="efectivo" checked={metodoPago === 'efectivo'} onChange={(e) => setMetodoPago(e.target.value)} className="accent-[#75452E]" /> Efectivo
                </label>
                <label className="flex items-center gap-2 text-[#39251E] cursor-pointer">
                  <input type="radio" value="transferencia" checked={metodoPago === 'transferencia'} onChange={(e) => setMetodoPago(e.target.value)} className="accent-[#75452E]" /> Transferencia
                </label>
              </div>
            </div>

            <AnimatePresence>
              {metodoPago === 'transferencia' && (
                <motion.div 
                  ref={transferenciaRef}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#FFF8EF] p-4 rounded-xl border border-[#B97845]/40 mt-2"
                >
                  <h4 className="text-[#75452E] font-bold mb-2 flex items-center gap-2">
                    <i className='bx bx-mobile-alt'></i> Datos para Transferencia
                  </h4>
                  <p className="text-[#39251E] text-sm"><strong>Nequi:</strong> 320 000 0000</p>
                  <p className="text-[#39251E] text-sm"><strong>Llave Bre-b:</strong> @llavebre-be</p>
                  <p className="text-[#39251E]/70 text-xs mt-2">* Por favor, ten el comprobante listo para enviarlo por WhatsApp.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Footer de confirmación */}
        <div className="p-4 border-t border-[#39251E]/10 bg-[#FFFFFF]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#39251E]/80 font-medium">Total a pagar:</span>
            <span className="text-2xl font-extrabold text-[#B97845]">${total.toLocaleString('es-CO')}</span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            form="order-form" 
            type="submit" 
            className="w-full bg-[#75452E] hover:bg-[#59331F] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <i className='bx bxl-whatsapp text-2xl'></i>
            Confirmar y Enviar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};