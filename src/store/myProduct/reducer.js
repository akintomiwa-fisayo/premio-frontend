import { actionTypes } from './action';

export const initialState = {
  allProducts: null,
  viewProduct: {
    file: '',
    title: '',
    description: '',
    price: '',
    commision: '',
  },
  error: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_VIEW_PRODUCT:
      return {
        ...state,
        ...{ allProducts: action.data },
      };

    default:
      return state;
  }
}

export default reducer;
