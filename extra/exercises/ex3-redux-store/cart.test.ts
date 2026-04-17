import { configureStore } from '@reduxjs/toolkit';
import { cartReducer, addItem, removeItem, updateQuantity, clearCart, CartItem } from './cartSlice';
import { selectCartTotal, selectCartCount, selectCartItemById, selectIsCartEmpty } from './selectors';

const makeStore = () => configureStore({
  reducer: { cart: cartReducer }
});

const mockItem: CartItem = {
  id: '1',
  name: 'T-shirt',
  price: 29.99,
  quantity: 1,
};

const mockItem2: CartItem = {
  id: '2',
  name: 'Pantalon',
  price: 49.99,
  quantity: 2,
};

describe('cartSlice', () => {

  describe('addItem', () => {
    it('ajoute un article au panier', () => {
      const store = makeStore();
      store.dispatch(addItem(mockItem));

      expect(store.getState().cart.items).toHaveLength(1);
      expect(store.getState().cart.items[0]).toEqual(mockItem);
    });

    it('incrémente la quantité si l\'article existe déjà', () => {
      const store = makeStore();
      store.dispatch(addItem(mockItem));
      store.dispatch(addItem(mockItem));

      expect(store.getState().cart.items).toHaveLength(1);
      expect(store.getState().cart.items[0].quantity).toBe(2);
    });

    it('ajoute plusieurs articles différents', () => {
      const store = makeStore();
      store.dispatch(addItem(mockItem));
      store.dispatch(addItem(mockItem2));

      expect(store.getState().cart.items).toHaveLength(2);
    });
  });

  describe('removeItem', () => {
    it('supprime un article du panier', () => {
      const store = makeStore();
      store.dispatch(addItem(mockItem));
      store.dispatch(removeItem('1'));

      expect(store.getState().cart.items).toHaveLength(0);
    });

    it('ne fait rien si l\'article n\'existe pas', () => {
      const store = makeStore();
      store.dispatch(addItem(mockItem));
      store.dispatch(removeItem('999'));

      expect(store.getState().cart.items).toHaveLength(1);
    });
  });

  describe('updateQuantity', () => {
    it('met à jour la quantité d\'un article', () => {
      const store = makeStore();
      store.dispatch(addItem(mockItem));
      store.dispatch(updateQuantity({ id: '1', quantity: 5 }));

      expect(store.getState().cart.items[0].quantity).toBe(5);
    });

    it('supprime l\'article si quantité = 0', () => {
      const store = makeStore();
      store.dispatch(addItem(mockItem));
      store.dispatch(updateQuantity({ id: '1', quantity: 0 }));

      expect(store.getState().cart.items).toHaveLength(0);
    });

    it('supprime l\'article si quantité négative', () => {
      const store = makeStore();
      store.dispatch(addItem(mockItem));
      store.dispatch(updateQuantity({ id: '1', quantity: -1 }));

      expect(store.getState().cart.items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('vide le panier', () => {
      const store = makeStore();
      store.dispatch(addItem(mockItem));
      store.dispatch(addItem(mockItem2));
      store.dispatch(clearCart());

      expect(store.getState().cart.items).toHaveLength(0);
    });
  });

});

describe('selectors', () => {

  describe('selectCartTotal', () => {
    it('calcule le total correctement', () => {
      const store = makeStore();
      store.dispatch(addItem(mockItem));   // 29.99 * 1
      store.dispatch(addItem(mockItem2));  // 49.99 * 2

      const total = selectCartTotal(store.getState());
      expect(total).toBeCloseTo(129.97);
    });

    it('retourne 0 si le panier est vide', () => {
      const store = makeStore();
      expect(selectCartTotal(store.getState())).toBe(0);
    });
  });

  describe('selectCartCount', () => {
    it('retourne le nombre total d\'articles', () => {
      const store = makeStore();
      store.dispatch(addItem(mockItem));   // quantité 1
      store.dispatch(addItem(mockItem2));  // quantité 2

      expect(selectCartCount(store.getState())).toBe(3);
    });
  });

  describe('selectCartItemById', () => {
    it('retourne l\'article correspondant à l\'id', () => {
      const store = makeStore();
      store.dispatch(addItem(mockItem));

      expect(selectCartItemById('1')(store.getState())).toEqual(mockItem);
    });

    it('retourne null si l\'article n\'existe pas', () => {
      const store = makeStore();
      expect(selectCartItemById('999')(store.getState())).toBeNull();
    });
  });

  describe('selectIsCartEmpty', () => {
    it('retourne true si le panier est vide', () => {
      const store = makeStore();
      expect(selectIsCartEmpty(store.getState())).toBe(true);
    });

    it('retourne false si le panier contient des articles', () => {
      const store = makeStore();
      store.dispatch(addItem(mockItem));
      expect(selectIsCartEmpty(store.getState())).toBe(false);
    });
  });

});