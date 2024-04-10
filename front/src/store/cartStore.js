import { atom } from 'recoil';

// Definición del estado inicial del carrito
export const cartAtom = atom({
  key: 'cart', // identificador único
  default: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [], // estado inicial, un array vacío
});



