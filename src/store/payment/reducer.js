import { actionTypes } from './action';

export const initialState = {
  referer: false,
  paymentFor: '',
  summary: [
  // {productId, description, units, price}, {productId, description, units, price},...

  ],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PAYMENT_SET_INFO:
      return {
        ...state,
        ...action.props,
      };
    default:
      return state;
  }
}

export default reducer;
