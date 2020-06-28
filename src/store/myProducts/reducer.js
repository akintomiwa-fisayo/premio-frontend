import { actionTypes } from './action';

export const initialState = {
  viewProduct: false, /* {
    file: '',
    title: '',
    description: '',
    price: '',
    commision: '',
  }, */
  products: [],
  loading: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MY_PRODUCTS_SET_INFO:
      return {
        ...state,
        ...action.props,
      };
    case actionTypes.MY_PRODUCTS_SET_VIEW_PRODUCT:
      return {
        ...state,
        viewProduct: action.props,
      };
    case actionTypes.MY_PRODUCTS_UPDATE_A_PRODUCT: {
      const products = state.products.map((product) => {
        if (product.id === action.id) {
          return {
            ...product,
            ...action.props,
          };
        }
        return product;
      });

      return {
        ...state,
        products,
      };
    }
    case actionTypes.MY_PRODUCTS_ADD_A_PRODUCT: {
      return {
        ...state,
        products: [
          action.product,
          ...state.products,
        ],
      };
    }
    case actionTypes.MY_PRODUCTS_REMOVE_A_PRODUCT: {
      const products = [];
      state.products.forEach((product) => {
        if (product.id !== action.id) {
          products.push(product);
        }
      });

      return {
        ...state,
        products,
      };
    }
    default:
      return state;
  }
}

export default reducer;
