import { useCartStore } from '../store/cartStore';

export const CartButton = ({ onOpenCart }) => {
  const carrito = useCartStore((state) => state.carrito);
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  if (totalItems === 0) return null;

  return (
    <button 
      onClick={onOpenCart}
      className="fixed bottom-6 right-6 bg-[#75452E] hover:bg-[#59331F] text-white p-4 rounded-full shadow-xl transition-transform hover:scale-110 flex items-center justify-center z-50"
    >
      <i className='bx bx-cart text-3xl'></i>
      <span className="absolute -top-2 -right-2 bg-[#B97845] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#FFF8EF]">
        {totalItems}
      </span>
    </button>
  );
};
