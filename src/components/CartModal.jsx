import { useState } from 'react';
import { useCartStore } from '../store/cartStore';

export const CartModal = ({ onClose }) => {
  const { carrito, agregarAlCarrito, disminuirCantidad, eliminarDelCarrito } = useCartStore();
  
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [notas, setNotas] = useState('');
  const [metodoPago, setMetodoPago] = useState('efectivo');

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  const enviarPedidoWhatsApp = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !direccion.trim()) {
      alert("Por favor, ingresa tu nombre y dirección para el domicilio.");
      return;
    }

    // Reemplazar con el número real de tus amigos
    const numeroAmigos = "573145898201"; 
    
    // Construimos los detalles sin saltos de línea codificados, usando \n
    const detallesFormateados = carrito.map(item => 
      `- ${item.cantidad}x ${item.nombre} ($${(item.precio * item.cantidad).toLocaleString('es-CO')})`
    ).join('\n');

    // Construimos el mensaje completo usando \n para los saltos de línea
    // ELIMINAMOS los asteriscos (*) de los títulos para evitar que WhatsApp 
    // corrompa el texto intentando formatear negritas.
    const textoBase = `¡Hola! Quiero hacer un pedido:\n\nCliente: ${nombre}\nDirección: ${direccion}\nNotas: ${notas || 'Ninguna'}\n\nDetalles del pedido:\n${detallesFormateados}\n\nTotal a pagar: $${total.toLocaleString('es-CO')}\nMétodo de pago: ${metodoPago.toUpperCase()}`;
    
    // Codificamos todo el string.
    const textoCodificado = encodeURIComponent(textoBase);
    
    window.open(`https://wa.me/${numeroAmigos}?text=${textoCodificado}`, '_blank');
  };

  if (carrito.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-[#1e1e1e] p-8 rounded-2xl border border-gray-800 text-center w-full max-w-md">
          <i className='bx bx-cart text-6xl text-gray-500 mb-4'></i>
          <h2 className="text-2xl text-white mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-400 mb-6">Agrega algunos postres deliciosos para continuar.</p>
          <button onClick={onClose} className="bg-[#a855f7] hover:bg-[#9333ea] text-white px-6 py-2 rounded-xl w-full">
            Volver al menú
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e1e1e] rounded-2xl border border-gray-800 w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Cabecera */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Tu Pedido</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
            <i className='bx bx-x'></i>
          </button>
        </div>

        {/* Cuerpo Scrolleable */}
        <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
          {/* Lista de productos */}
          <div className="space-y-4 mb-6">
            {carrito.map(item => (
              <div key={item.id} className="flex gap-3 bg-[#121212] p-3 rounded-xl border border-gray-800 items-center">
                <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="text-white text-sm font-semibold">{item.nombre}</h4>
                  <p className="text-[#a855f7] text-sm">${(item.precio * item.cantidad).toLocaleString('es-CO')}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button onClick={() => eliminarDelCarrito(item.id)} className="text-red-400 hover:text-red-300">
                    <i className='bx bx-trash text-lg'></i>
                  </button>
                  <div className="flex items-center gap-2 bg-[#1e1e1e] rounded-lg px-2 py-1">
                    <button onClick={() => disminuirCantidad(item.id)} className="text-gray-400 hover:text-white"><i className='bx bx-minus'></i></button>
                    <span className="text-white text-sm">{item.cantidad}</span>
                    <button onClick={() => agregarAlCarrito(item)} className="text-gray-400 hover:text-white"><i className='bx bx-plus'></i></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formulario del cliente */}
          <form id="order-form" onSubmit={enviarPedidoWhatsApp} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Nombre completo *</label>
              <input type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-[#121212] border border-gray-800 text-white rounded-xl px-4 py-2 focus:outline-none focus:border-[#a855f7]" placeholder="Ej: Juan Pérez" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Dirección / Barrio *</label>
              <input type="text" required value={direccion} onChange={(e) => setDireccion(e.target.value)} className="w-full bg-[#121212] border border-gray-800 text-white rounded-xl px-4 py-2 focus:outline-none focus:border-[#a855f7]" placeholder="Ej: Calle 12 #34-56, Barrio Centro, Yopal" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Notas (Opcional)</label>
              <textarea value={notas} onChange={(e) => setNotas(e.target.value)} className="w-full bg-[#121212] border border-gray-800 text-white rounded-xl px-4 py-2 focus:outline-none focus:border-[#a855f7] resize-none h-20" placeholder="Ej: Timbre dañado, llamar al llegar."></textarea>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm mb-2">Método de Pago *</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input type="radio" value="efectivo" checked={metodoPago === 'efectivo'} onChange={(e) => setMetodoPago(e.target.value)} className="accent-[#a855f7]" /> Efectivo
                </label>
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input type="radio" value="transferencia" checked={metodoPago === 'transferencia'} onChange={(e) => setMetodoPago(e.target.value)} className="accent-[#a855f7]" /> Transferencia
                </label>
              </div>
            </div>

            {metodoPago === 'transferencia' && (
              <div className="bg-[#121212] p-4 rounded-xl border border-pink-600/50 mt-2">
                <h4 className="text-pink-400 font-semibold mb-2 flex items-center gap-2">
                  <i className='bx bx-mobile-alt'></i> Datos para Transferencia
                </h4>
                <p className="text-gray-300 text-sm"><strong>Nequi:</strong> 320 000 0000</p>
                <p className="text-gray-300 text-sm"><strong>Llave Bre-b:</strong> @llavebre-be</p>
                <p className="text-gray-500 text-xs mt-2">* Por favor, ten el comprobante listo para enviarlo por WhatsApp.</p>
              </div>
            )}
          </form>
        </div>

        {/* Footer de confirmación */}
        <div className="p-4 border-t border-gray-800 bg-[#1e1e1e]">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 font-medium">Total a pagar:</span>
            <span className="text-2xl font-bold text-white">${total.toLocaleString('es-CO')}</span>
          </div>
          <button form="order-form" type="submit" className="w-full bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-transform transform hover:scale-105">
            <i className='bx bxl-whatsapp text-2xl'></i>
            Confirmar y Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
