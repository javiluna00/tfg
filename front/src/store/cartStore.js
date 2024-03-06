import { atom, selector } from 'recoil';

// Definición del estado inicial del carrito
export const cartState = atom({
  key: 'cartState', // identificador único
  default: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [], // estado inicial, un array vacío
});



