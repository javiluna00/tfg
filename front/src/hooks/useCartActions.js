import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartState } from '../store/cartStore';

export function useCartActions() {
    const [cart, setCart] = useRecoilState(cartState);

    const addToCart = (newItem) => {
        setCart((cart) => {
        const index = cart.findIndex(item => item.id === newItem.id && item.licencia === newItem.licencia);
        if (index === -1) {
            // Si el elemento no existe en el carrito, lo agrega
            return [...cart, newItem];
        } else {
            // Si el elemento ya existe, no hace nada (ya que solo puede haber uno de cada tipo)
            return cart;
        }
        });
    };

    const totalPrice = (cart) => {
        return cart.reduce((acc, item) => acc + item.price, 0);
    }   

    const removeItem = (itemId) => {
        setCart((cart) => cart.filter(item => item.id !== itemId));
    }

    const clearCart = () => {
        setCart([]);
    }


    return { addToCart, totalPrice, removeItem, cart, clearCart };
}