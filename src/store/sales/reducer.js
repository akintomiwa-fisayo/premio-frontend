import { actionTypes } from './action';

export const initState = {
  report: [],
  loading: true,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SALES_SET_INFO:
      return {
        ...state,
        ...action.props,
      };
    default:
      return state;
  }
}

export default reducer;
