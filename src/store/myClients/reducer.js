import { actionTypes } from './action';

export const initState = {
  users: [],
  loading: true,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.My_CLIENTS_SET_INFO:
      return {
        ...state,
        ...action.props,
      };
    default:
      return state;
  }
}

export default reducer;
