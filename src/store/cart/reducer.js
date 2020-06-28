import { actionTypes } from './action';

export const initCart = {
  cartProducts: [],
  loading: false,
};

function reducer(state = initCart, action) {
  switch (action.type) {
    case actionTypes.CART_SET_PRODUCTS:
      return {
        ...state,
        cartProducts: action.cartProducts,
      };
    case actionTypes.CART_ADD_PRODUCT:
      return {
        ...state,
        cartProducts: [
          action.product,
          ...state.cartProducts,
        ],
      };
    case actionTypes.CART_REMOVE_PRODUCT: {
      const cartProducts = [];
      state.cartProducts.forEach((cartProduct) => {
        if (cartProduct.id !== action.productId) {
          cartProducts.push(cartProduct);
        }
      });

      return {
        ...state,
        cartProducts,
      };
    }
    default:
      return state;
  }
}

export default reducer;
