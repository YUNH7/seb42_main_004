import { createSlice } from '@reduxjs/toolkit';

function findIdx(mealboxes, totalId, targetId) {
  return mealboxes.findIndex((el) => String(el[totalId]) === String(targetId));
}

const initialState = { cart: { mealboxes: [] } };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },

    addCartItem: (state, action) => {
      const { cart } = state;
      const newItem = action.payload;
      const existingIdx =
        newItem.name !== 'custom'
          ? findIdx(cart.mealboxes, 'mealboxId', newItem.mealboxId)
          : -1;

      if (existingIdx === -1) {
        newItem.cartMealboxId = newItem.cartMealboxId || new Date().getTime();
        cart.mealboxes.push(newItem);
      } else {
        cart.mealboxes[existingIdx].quantity++;
      }
    },

    deleteCartItem: (state, action) => {
      const { cart } = state;
      const deleteIds = action.payload;
      cart.mealboxes = cart.mealboxes.filter(
        (box) => !deleteIds.includes(box.cartMealboxId)
      );
    },

    setQuantity: (state, action) => {
      const { cart } = state;
      const { id, amount } = action.payload;
      const idx = findIdx(cart.mealboxes, 'cartMealboxId', id);
      const item = cart.mealboxes[idx];
      item.quantity += amount;
      cart.totalPrice += item.price * amount;
    },

    initializeCart: () => initialState,
  },
});

export const {
  setCart,
  addCartItem,
  deleteCartItem,
  setQuantity,
  initializeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
