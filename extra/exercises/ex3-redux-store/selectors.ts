import { createSelector } from '@reduxjs/toolkit';
import { CartState } from './cartSlice';

// Type flexible pour les selectors (permet de tester sans persist)
type StateWithCart = { cart: CartState };

// selector de base
const selectCartItems = (state: StateWithCart) => state.cart.items;

// total mémoïsé — ne recalcule que si items change
export const selectCartTotal = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

// nombre total d'articles mémoïsé
export const selectCartCount = createSelector(
  selectCartItems,
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);

// selector pour un article spécifique
export const selectCartItemById = (id: string) =>
  createSelector(
    selectCartItems,
    (items) => items.find(item => item.id === id) ?? null
  );

// selector pour savoir si le panier est vide
export const selectIsCartEmpty = createSelector(
  selectCartItems,
  (items) => items.length === 0
);