import { create } from 'zustand';

export const useCartStore = create((set) => ({
  carrito: [],
  
  agregarAlCarrito: (producto) => set((state) => {
    const existe = state.carrito.find(item => item.id === producto.id);
    if (existe) {
      return {
        carrito: state.carrito.map(item => 
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      };
    }
    return { carrito: [...state.carrito, { ...producto, cantidad: 1 }] };
  }),

  eliminarDelCarrito: (id) => set((state) => ({
    carrito: state.carrito.filter(item => item.id !== id)
  })),

  vaciarCarrito: () => set({ carrito: [] }),

  // Selector para obtener el total de items (útil para la burbuja del carrito)
  getTotalItems: (state) => state.carrito.reduce((total, item) => total + item.cantidad, 0),
}));
