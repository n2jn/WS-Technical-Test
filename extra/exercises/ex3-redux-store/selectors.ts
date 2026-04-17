import { createSelector } from '@reduxjs/toolkit';
import { CartState } from './cartSlice';

type StateWithCart = { cart: CartState };

const selectCartItems = (state: StateWithCart) => state.cart.items;

export const selectCartTotal = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectCartCount = createSelector(
  selectCartItems,
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);

export const selectCartItemById = (id: string) =>
  createSelector(
    selectCartItems,
    (items) => items.find(item => item.id === id) ?? null
  );

export const selectIsCartEmpty = createSelector(
  selectCartItems,
  (items) => items.length === 0
);