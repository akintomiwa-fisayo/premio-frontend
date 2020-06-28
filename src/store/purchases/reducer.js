import { actionTypes } from './action';

export const initState = {
  products: [],
  loading: true,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.PURCHASES_SET_INFO:
      return {
        ...state,
        ...action.props,
      };
    default:
      return state;
  }
}

export default reducer;
